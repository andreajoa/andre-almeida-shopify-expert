import { after, NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { marketingRpc, safeMarketingLocale, vercelDataToken } from "@/lib/marketing/neon-data-api"
import { scheduleNurtureSequence } from "@/lib/marketing/email-automation"
import type { MarketingLocale } from "@/lib/marketing/email-sequences"

function decodeHeader(value: string | null) {
  if (!value) return ""
  try { return decodeURIComponent(value) } catch { return value }
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254
}

function esc(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;")
}

async function preserveLeadFallback(input: { name:string; email:string; locale:MarketingLocale; source:string; path:string; city:string }) {
  const key = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  if (!key || !to) return false
  try {
    const resend = new Resend(key)
    const from = process.env.CONTACT_FROM_EMAIL || "Andre Almeida <onboarding@resend.dev>"
    const { error } = await resend.emails.send({
      from,
      to:[to],
      replyTo:input.email,
      subject:`Lead do popup aguardando sincronização: ${input.name || input.email}`,
      html:`<div style="font-family:Arial,sans-serif"><h2>Novo lead capturado pelo popup</h2><p><strong>Nome:</strong> ${esc(input.name || "—")}</p><p><strong>E-mail:</strong> ${esc(input.email)}</p><p><strong>Idioma:</strong> ${esc(input.locale)}</p><p><strong>Cidade:</strong> ${esc(input.city || "—")}</p><p><strong>Origem:</strong> ${esc(input.source || "direct")}</p><p><strong>Página:</strong> ${esc(input.path || "/")}</p><p>O CRM externo estava temporariamente indisponível. Este aviso preserva o lead para recuperação.</p></div>`,
      text:`Novo lead capturado pelo popup\nNome: ${input.name || "—"}\nE-mail: ${input.email}\nIdioma: ${input.locale}\nCidade: ${input.city || "—"}\nOrigem: ${input.source || "direct"}\nPágina: ${input.path || "/"}\nCRM temporariamente indisponível.`,
    })
    return !error
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  let fallbackInput: { name:string; email:string; locale:MarketingLocale; source:string; path:string; city:string } | null = null
  try {
    const data = await req.json()
    const email = String(data.email || "").trim().toLowerCase()
    const name = String(data.name || "").slice(0,160)
    const consent = data.consent === true
    if (!validEmail(email)) return NextResponse.json({ error: "invalid email" }, { status: 400 })
    if (!consent) return NextResponse.json({ error: "email consent required" }, { status: 400 })

    const country = req.headers.get("x-vercel-ip-country") || String(data.country || "")
    const region = decodeHeader(req.headers.get("x-vercel-ip-country-region")) || String(data.region || "")
    const city = decodeHeader(req.headers.get("x-vercel-ip-city")) || String(data.city || "")
    const acceptLanguage = req.headers.get("accept-language") || ""
    const locale: MarketingLocale = country.toUpperCase() === "BR" || /^pt\b/i.test(acceptLanguage)
      ? "pt-BR"
      : safeMarketingLocale(String(data.locale || ""))
    const source = String(data.source || "direct").slice(0,200) || "direct"
    const path = String(data.path || "/").slice(0,500) || "/"
    fallbackInput = { name, email, locale, source, path, city }
    const dataToken = vercelDataToken(req.headers)

    const rawSessionId = String(data.sessionId || "").slice(0, 120)
    let sessionId: string | null = rawSessionId.length >= 10 ? rawSessionId : null

    if (sessionId) {
      try {
        await marketingRpc("track_visitor_event", {
          p_session_id: sessionId,
          p_event_type: "email_capture",
          p_path: path,
          p_element: "lead_capture",
          p_href: null,
          p_duration_seconds: 0,
          p_locale: locale,
          p_country: country || null,
          p_region: region || null,
          p_city: city || null,
          p_referrer: String(data.referrer || "") || null,
          p_source: source,
          p_medium: String(data.medium || "") || null,
          p_campaign: String(data.campaign || "") || null,
          p_user_agent: req.headers.get("user-agent") || null,
          p_metadata: { stage: "capture" },
        }, dataToken)
      } catch (error) {
        console.warn("Marketing analytics session unavailable during capture", error)
        sessionId = null
      }
    }

    const captured = await marketingRpc<{
      ok: boolean
      lead_id: string
      lead_secret: string
      unsubscribe_token: string
      locale: MarketingLocale
      should_schedule: boolean
    }>("capture_marketing_lead", {
      p_session_id: sessionId,
      p_email: email,
      p_name: name || null,
      p_phone: String(data.phone || "").slice(0, 80) || null,
      p_company: String(data.company || "").slice(0, 200) || null,
      p_locale: locale,
      p_country: country.slice(0, 8) || null,
      p_region: region.slice(0, 120) || null,
      p_city: city.slice(0, 160) || null,
      p_source: source,
      p_first_path: path,
      p_consent: true,
    }, dataToken)

    if (!captured.ok || !captured.lead_id) throw new Error("lead capture did not return a valid lead")

    if (captured.should_schedule) {
      after(async () => {
        try {
          await scheduleNurtureSequence({
            leadId: captured.lead_id,
            leadSecret: captured.lead_secret,
            email,
            name: name || null,
            locale: captured.locale || locale,
            unsubscribeToken: captured.unsubscribe_token,
          }, dataToken)
        } catch (error) {
          console.error("Marketing nurture scheduling failed after capture", error)
        }
      })
    }

    return NextResponse.json({ ok: true, leadId: captured.lead_id, sequenceQueued: captured.should_schedule })
  } catch (error) {
    console.error("Marketing subscribe primary path error", error)
    if (fallbackInput && await preserveLeadFallback(fallbackInput)) {
      return NextResponse.json({ ok:true, preserved:true, sequenceQueued:false })
    }
    return NextResponse.json({ error: "subscribe failed" }, { status: 503 })
  }
}

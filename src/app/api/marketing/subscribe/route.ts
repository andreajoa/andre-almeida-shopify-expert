import { NextRequest, NextResponse } from "next/server"
import { marketingRpc, safeMarketingLocale } from "@/lib/marketing/neon-data-api"
import { scheduleNurtureSequence } from "@/lib/marketing/email-automation"
import type { MarketingLocale } from "@/lib/marketing/email-sequences"

function decodeHeader(value: string | null) {
  if (!value) return ""
  try { return decodeURIComponent(value) } catch { return value }
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const email = String(data.email || "").trim().toLowerCase()
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

    const captured = await marketingRpc<{
      ok: boolean
      lead_id: string
      lead_secret: string
      unsubscribe_token: string
      locale: MarketingLocale
      should_schedule: boolean
    }>("capture_marketing_lead", {
      p_session_id: String(data.sessionId || "").slice(0, 120) || null,
      p_email: email,
      p_name: String(data.name || "").slice(0, 160) || null,
      p_phone: String(data.phone || "").slice(0, 80) || null,
      p_company: String(data.company || "").slice(0, 200) || null,
      p_locale: locale,
      p_country: country.slice(0, 8) || null,
      p_region: region.slice(0, 120) || null,
      p_city: city.slice(0, 160) || null,
      p_source: String(data.source || "").slice(0, 200) || null,
      p_first_path: String(data.path || "").slice(0, 500) || null,
      p_consent: true,
    })

    let automation = { scheduled: 0, errors: [] as string[] }
    if (captured.should_schedule) {
      automation = await scheduleNurtureSequence({
        leadId: captured.lead_id,
        leadSecret: captured.lead_secret,
        email,
        name: String(data.name || "") || null,
        locale: captured.locale || locale,
        unsubscribeToken: captured.unsubscribe_token,
      })
    }

    const sessionId = String(data.sessionId || "")
    if (sessionId.length >= 10) {
      await marketingRpc("track_visitor_event", {
        p_session_id: sessionId,
        p_event_type: "email_capture",
        p_path: String(data.path || "") || null,
        p_element: "lead_capture",
        p_href: null,
        p_duration_seconds: 0,
        p_locale: locale,
        p_country: country || null,
        p_region: region || null,
        p_city: city || null,
        p_referrer: String(data.referrer || "") || null,
        p_source: String(data.source || "") || null,
        p_medium: String(data.medium || "") || null,
        p_campaign: String(data.campaign || "") || null,
        p_user_agent: req.headers.get("user-agent") || null,
        p_metadata: { scheduled: automation.scheduled },
      })
    }

    return NextResponse.json({ ok: true, leadId: captured.lead_id, scheduled: automation.scheduled, automationWarnings: automation.errors.length })
  } catch (error) {
    console.error("Marketing subscribe error", error)
    return NextResponse.json({ error: "subscribe failed" }, { status: 500 })
  }
}

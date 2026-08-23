import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { marketingRpc, safeMarketingLocale } from "@/lib/marketing/neon-data-api"
import { scheduleNurtureSequence } from "@/lib/marketing/email-automation"
import type { MarketingLocale } from "@/lib/marketing/email-sequences"

type ContactMessage = {
  id: string
  name: string
  email: string
  phone: string
  company: string
  serviceType: string
  budget: string
  message: string
  locale: MarketingLocale
  date: string
  time: string
  type: string
  createdAt: string
  city: string
  source: string
  marketingConsent: boolean
}

type CapturedLead = {
  ok:boolean
  lead_id:string
  lead_secret:string
  unsubscribe_token:string
  locale:MarketingLocale
  should_schedule:boolean
}

function escapeHtml(value: string) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function decodeHeader(value: string | null) {
  if (!value) return ""
  try { return decodeURIComponent(value) } catch { return value }
}

function formatLeadHtml(msg: ContactMessage) {
  const cleanPhone = msg.phone.replace(/\D/g, "")
  const whatsappReply = cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Olá ${msg.name}, recebi sua mensagem pelo meu site sobre ${msg.serviceType || "meus serviços"}.`)}` : ""
  const rows = [
    ["Tipo", msg.type], ["Nome", msg.name], ["Email", msg.email], ["Telefone", msg.phone],
    ["Empresa", msg.company], ["Serviço", msg.serviceType], ["Orçamento", msg.budget],
    ["Data da call", msg.date], ["Horário da call", msg.time], ["Idioma", msg.locale],
    ["Cidade", msg.city], ["Origem", msg.source], ["Marketing opt-in", msg.marketingConsent ? "Sim" : "Não"],
    ["Criado em", msg.createdAt],
  ]
  return `<div style="font-family:Arial,sans-serif;background:#f2efe8;padding:24px"><div style="max-width:720px;margin:0 auto;background:#fffdf8;border:1px solid #d4cec2"><div style="background:#11110f;color:#fff;padding:26px"><h1 style="margin:0;font-size:24px">Novo lead pelo site</h1><p style="margin:8px 0 0;color:#c7b18d">André Almeida · Digital Systems</p></div><div style="padding:26px"><table style="width:100%;border-collapse:collapse">${rows.filter(([,v])=>v).map(([label,value])=>`<tr><td style="padding:11px 0;color:#77736b;width:160px;border-bottom:1px solid #e1dbd0">${escapeHtml(label)}</td><td style="padding:11px 0;color:#11110f;font-weight:600;border-bottom:1px solid #e1dbd0">${escapeHtml(value)}</td></tr>`).join("")}</table><h2 style="font-size:18px;margin:26px 0 10px">Mensagem</h2><div style="white-space:pre-wrap;background:#f2efe8;padding:18px;color:#11110f;line-height:1.6">${escapeHtml(msg.message)}</div><div style="margin-top:26px">${whatsappReply ? `<a href="${whatsappReply}" style="display:inline-block;background:#11110f;color:white;text-decoration:none;padding:13px 18px;border-radius:999px;font-weight:bold;margin-right:10px">Responder no WhatsApp</a>` : ""}<a href="mailto:${escapeHtml(msg.email)}" style="display:inline-block;border:1px solid #11110f;color:#11110f;text-decoration:none;padding:13px 18px;border-radius:999px;font-weight:bold">Responder por e-mail</a></div></div></div></div>`
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const name = String(data.name || "").trim().slice(0,160)
    const email = String(data.email || "").trim().toLowerCase().slice(0,254)
    const message = String(data.message || "").trim().slice(0,8000)
    if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status:400 })
    }

    const country = req.headers.get("x-vercel-ip-country") || String(data.country || "")
    const region = decodeHeader(req.headers.get("x-vercel-ip-country-region")) || String(data.region || "")
    const city = decodeHeader(req.headers.get("x-vercel-ip-city")) || String(data.city || "")
    const acceptLanguage = req.headers.get("accept-language") || ""
    const locale: MarketingLocale = country.toUpperCase() === "BR" || /^pt\b/i.test(acceptLanguage)
      ? "pt-BR"
      : safeMarketingLocale(String(data.locale || ""))
    const sessionId = String(data.sessionId || "").slice(0,120)
    const marketingConsent = data.marketingConsent === true
    const source = String(data.source || "direct").slice(0,200)

    let captured: CapturedLead | null = null
    let scheduled = 0
    const warnings: string[] = []

    try {
      captured = await marketingRpc<CapturedLead>("capture_marketing_lead", {
        p_session_id: sessionId || null,
        p_email: email,
        p_name: name,
        p_phone: String(data.phone || "").slice(0,80) || null,
        p_company: String(data.company || "").slice(0,200) || null,
        p_locale: locale,
        p_country: country.slice(0,8) || null,
        p_region: region.slice(0,120) || null,
        p_city: city.slice(0,160) || null,
        p_source: source,
        p_first_path: String(data.path || "/contact").slice(0,500),
        p_consent: marketingConsent,
      })

      await marketingRpc("mark_lead_conversion", { p_lead_id:captured.lead_id, p_lead_secret:captured.lead_secret, p_kind:"form_submit" })

      if (sessionId.length >= 10) {
        await marketingRpc("track_visitor_event", {
          p_session_id:sessionId, p_event_type:"form_submit", p_path:String(data.path || "/contact").slice(0,500),
          p_element:String(data.type || "contact"), p_href:null, p_duration_seconds:0, p_locale:locale,
          p_country:country || null, p_region:region || null, p_city:city || null,
          p_referrer:String(data.referrer || "").slice(0,1000) || null, p_source:source,
          p_medium:String(data.medium || "").slice(0,200) || null, p_campaign:String(data.campaign || "").slice(0,300) || null,
          p_user_agent:req.headers.get("user-agent")?.slice(0,1000) || null,
          p_metadata:{ serviceType:String(data.serviceType || ""), budget:String(data.budget || ""), marketingConsent },
        })
      }

      if (marketingConsent && captured.should_schedule) {
        const automation = await scheduleNurtureSequence({
          leadId:captured.lead_id, leadSecret:captured.lead_secret, email, name,
          locale:captured.locale || locale, unsubscribeToken:captured.unsubscribe_token,
        })
        scheduled = automation.scheduled
        if (automation.errors.length) warnings.push("Alguns e-mails de nutrição não puderam ser agendados.")
      }
    } catch (crmError) {
      console.error("Contact CRM persistence warning", crmError)
      warnings.push("Contato recebido, mas o CRM ficou temporariamente indisponível.")
    }

    const msg: ContactMessage = {
      id:captured ? `lead_${captured.lead_id}` : `contact_${Date.now()}`,
      name, email,
      phone:String(data.phone || "").slice(0,80), company:String(data.company || "").slice(0,200),
      serviceType:String(data.serviceType || "").slice(0,240), budget:String(data.budget || "").slice(0,120), message,
      locale, date:String(data.selectedDate || "").slice(0,40), time:String(data.selectedTime || "").slice(0,40),
      type:String(data.type || "contact").slice(0,80), createdAt:new Date().toISOString(), city, source, marketingConsent,
    }

    const resendApiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.CONTACT_TO_EMAIL
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Andre Almeida <onboarding@resend.dev>"
    if (resendApiKey && toEmail) {
      try {
        const resend = new Resend(resendApiKey)
        const subject = msg.type === "scheduled-call" ? `Nova call solicitada: ${msg.name}` : `Novo lead pelo site: ${msg.name}`
        const { error } = await resend.emails.send({
          from:fromEmail, to:[toEmail], replyTo:msg.email, subject,
          html:formatLeadHtml(msg),
          text:`Novo lead pelo site\n\nNome: ${msg.name}\nEmail: ${msg.email}\nTelefone: ${msg.phone}\nEmpresa: ${msg.company}\nServiço: ${msg.serviceType}\nOrçamento: ${msg.budget}\nCidade: ${msg.city}\nOrigem: ${msg.source}\nMarketing opt-in: ${msg.marketingConsent ? "Sim" : "Não"}\n\nMensagem:\n${msg.message}`,
        })
        if (error) warnings.push("O aviso administrativo por e-mail falhou.")
      } catch (emailError) {
        console.error("Contact notification warning", emailError)
        warnings.push("O aviso administrativo por e-mail ficou temporariamente indisponível.")
      }
    } else {
      warnings.push("E-mail administrativo não configurado neste ambiente.")
    }

    return NextResponse.json({
      success:true,
      id:captured?.lead_id || msg.id,
      scheduled,
      warning:warnings.length ? warnings.join(" ") : undefined,
    })
  } catch (error) {
    console.error("Contact error", error)
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}

export async function GET() {
  return NextResponse.json({ error:"Use the private /dashboard." }, { status:410 })
}

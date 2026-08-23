import "server-only"
import { Resend } from "resend"
import { SITE_CONFIG } from "@/lib/constants"
import { EMAIL_BANNER_COUNT } from "@/lib/marketing/email-banners"
import { EMAIL_SEQUENCES, MarketingLocale, renderSequenceCopy } from "@/lib/marketing/email-sequences"
import { marketingRpc } from "@/lib/marketing/neon-data-api"
import { ensureResendWebhook } from "@/lib/marketing/resend-webhook"

export type NurtureLead = {
  leadId: string
  leadSecret: string
  email: string
  name?: string | null
  locale: MarketingLocale
  unsubscribeToken: string
}

export type ScheduledNurtureEmail = {
  sequenceIndex: number
  resendEmailId: string
  scheduledAt: string
}

function esc(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;")
}

function configuredSenderAddress(value?: string) {
  const raw = value?.trim()
  if (!raw) return "onboarding@resend.dev"
  const bracketed = raw.match(/<([^>]+)>/)
  return (bracketed?.[1] || raw).trim()
}

function senderName() {
  const configuredFrom = process.env.MARKETING_FROM_EMAIL || process.env.CONTACT_FROM_EMAIL
  return `Seu Negocio <${configuredSenderAddress(configuredFrom)}>`
}

function unsubscribeApiUrl(lead: Pick<NurtureLead, "unsubscribeToken">) {
  return `https://andre-almeida.online/api/marketing/unsubscribe?token=${encodeURIComponent(lead.unsubscribeToken)}`
}

function emailHtml(lead: Pick<NurtureLead, "email" | "name" | "locale" | "unsubscribeToken">, entry: (typeof EMAIL_SEQUENCES)[MarketingLocale][number]) {
  const { paragraphs } = renderSequenceCopy(lead.locale, entry, lead.name)
  const unsubscribeUrl = `https://andre-almeida.online/unsubscribe?token=${encodeURIComponent(lead.unsubscribeToken)}&lang=${lead.locale === "pt-BR" ? "pt" : "en"}`
  const isPt = lead.locale === "pt-BR"
  const [hello, preheader, angle, insight, close] = paragraphs
  const bannerNumber = ((entry.index - 1) % EMAIL_BANNER_COUNT) + 1
  const bannerUrl = `${SITE_CONFIG.url}/api/marketing/banner/${bannerNumber}`
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(isPt ? "Olá André, recebi seu e-mail e quero conversar sobre meu negócio." : "Hi Andre, I received your email and want to talk about my business.")}`
  const websiteUrl = SITE_CONFIG.url
  const footerPermission = isPt
    ? "Você recebe esta sequência porque autorizou comunicações sobre websites, e-commerce, CRM, automação e presença digital."
    : "You receive this sequence because you opted in to communications about websites, ecommerce, CRM, automation and digital presence."
  const contactTitle = isPt ? "Quer conversar sobre seu projeto?" : "Want to talk about your project?"
  const contactCopy = isPt
    ? "Fale diretamente comigo pelo WhatsApp ou responda este e-mail."
    : "Talk to me directly on WhatsApp or simply reply to this email."
  const whatsappLabel = isPt ? "Falar no WhatsApp" : "Talk on WhatsApp"
  const unsubscribeLabel = isPt ? "Cancelar estes e-mails" : "Unsubscribe from these emails"

  return `<!doctype html>
<html lang="${isPt ? "pt-BR" : "en"}">
<head><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head>
<body style="margin:0;padding:0;background:#f2efe8;color:#11110f;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(entry.preheader)}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f2efe8;margin:0;padding:0">
<tr><td align="center" style="padding:28px 12px">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:640px;background:#fffdf8;border:1px solid #d8d0c2;border-collapse:separate">
<tr><td style="padding:0;line-height:0"><a href="${entry.ctaUrl}" style="display:block;text-decoration:none" target="_blank"><img src="${bannerUrl}" alt="${esc(entry.subject)}" width="640" style="display:block;width:100%;max-width:640px;height:auto;border:0;outline:none;text-decoration:none"></a></td></tr>
<tr><td style="padding:27px 34px 8px;color:#8b7547;font-size:11px;font-weight:700;letter-spacing:2.4px;text-transform:uppercase">SEU NEGÓCIO <span style="color:#a7a198;font-weight:400">· por André Almeida</span></td></tr>
<tr><td style="padding:8px 34px 2px;font-family:Georgia,'Times New Roman',serif;font-size:35px;line-height:1.12;letter-spacing:-.6px;color:#171714">${esc(entry.subject)}</td></tr>
<tr><td style="padding:12px 34px 4px;font-size:14px;line-height:1.6;color:#8b7547;font-weight:700">${esc(preheader)}</td></tr>
<tr><td style="padding:12px 34px 2px;font-size:16px;line-height:1.75;color:#57544e"><p style="margin:0 0 18px;color:#171714;font-weight:700">${esc(hello)}</p><p style="margin:0 0 20px">${esc(angle)}</p><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:4px 0 24px;background:#f2efe8;border-left:3px solid #a38b59"><tr><td style="padding:18px 20px;font-family:Georgia,'Times New Roman',serif;font-size:17px;line-height:1.6;color:#27251f">${esc(insight)}</td></tr></table><p style="margin:0 0 24px">${esc(close)}</p><table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:8px 0 28px"><tr><td bgcolor="#3f432f" style="border-radius:999px"><a href="${entry.ctaUrl}" target="_blank" style="display:inline-block;padding:15px 24px;color:#fffdf8;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:.5px">${esc(entry.ctaLabel)} &nbsp;→</a></td></tr></table></td></tr>
<tr><td style="padding:0 34px 30px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#eee7da;border:1px solid #ddd3c1"><tr><td style="padding:20px 22px"><div style="font-family:Georgia,'Times New Roman',serif;font-size:20px;line-height:1.3;color:#171714">${contactTitle}</div><div style="margin-top:7px;font-size:13px;line-height:1.6;color:#69645c">${contactCopy}</div><div style="margin-top:15px"><a href="${whatsappUrl}" target="_blank" style="color:#3f432f;font-weight:700;text-decoration:none">${whatsappLabel}</a><span style="color:#b4ab9d"> &nbsp;·&nbsp; </span><a href="mailto:${SITE_CONFIG.email}" style="color:#3f432f;font-weight:700;text-decoration:none">${SITE_CONFIG.email}</a></div></td></tr></table></td></tr>
<tr><td style="background:#171714;padding:27px 34px;color:#d9d3c9"><div style="font-family:Georgia,'Times New Roman',serif;font-size:21px;line-height:1.2;color:#fffdf8">Seu Negócio</div><div style="margin-top:6px;font-size:11px;letter-spacing:1.2px;color:#b6ad9f;text-transform:uppercase">Websites · E-commerce · CRM · Automação · Analytics</div><div style="margin-top:17px;font-size:12px;line-height:1.8;color:#d9d3c9"><a href="${whatsappUrl}" target="_blank" style="color:#d9d3c9;text-decoration:none">WhatsApp: +55 11 99259-8585</a><br><a href="mailto:${SITE_CONFIG.email}" style="color:#d9d3c9;text-decoration:none">E-mail: ${SITE_CONFIG.email}</a><br><a href="${websiteUrl}" target="_blank" style="color:#d9d3c9;text-decoration:none">andre-almeida.online</a></div><div style="margin-top:17px;padding-top:16px;border-top:1px solid #3b3934;font-size:10px;line-height:1.65;color:#8f8980">${footerPermission}<br><a href="${unsubscribeUrl}" style="color:#b9af9e;text-decoration:underline">${unsubscribeLabel}</a></div></td></tr>
</table></td></tr></table></body></html>`
}

function nurtureText(lead: Pick<NurtureLead, "name" | "locale" | "unsubscribeToken">, entry: (typeof EMAIL_SEQUENCES)[MarketingLocale][number]) {
  const copy = renderSequenceCopy(lead.locale, entry, lead.name)
  return `${copy.text}\n\n${entry.ctaLabel}: ${entry.ctaUrl}\n\nWhatsApp: +55 11 99259-8585\nE-mail: ${SITE_CONFIG.email}\nSite: ${SITE_CONFIG.url}\n\nUnsubscribe: ${unsubscribeApiUrl(lead)}`
}

export async function scheduleNurtureSequence(lead: NurtureLead, dataToken?: string | null) {
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) return { scheduled:0, errors:["RESEND_API_KEY missing"] }

  const webhook = await ensureResendWebhook()
  const resend = new Resend(resendKey)
  const sequence = EMAIL_SEQUENCES[lead.locale]
  const unsubscribeUrl = unsubscribeApiUrl(lead)
  let scheduled = 0
  const errors: string[] = webhook.ok ? [] : [`webhook: ${"reason" in webhook ? webhook.reason : "not ready"}`]

  for (const entry of sequence) {
    const when = new Date(Date.now() + (entry.index === 1 ? 5 * 60_000 : (entry.index - 1) * 24 * 60 * 60_000)).toISOString()
    try {
      const { data, error } = await resend.emails.send({
        from:senderName(), to:[lead.email], replyTo:SITE_CONFIG.email, subject:entry.subject,
        html:emailHtml(lead, entry), text:nurtureText(lead, entry), scheduledAt:when,
        headers:{"List-Unsubscribe":`<${unsubscribeUrl}>`,"List-Unsubscribe-Post":"List-Unsubscribe=One-Click","X-AA-Sequence":String(entry.index),"X-AA-Locale":lead.locale},
      })
      if (error || !data?.id) { errors.push(`#${entry.index}: ${error?.message || "missing Resend id"}`); continue }
      await marketingRpc("register_marketing_send", {p_lead_id:lead.leadId,p_lead_secret:lead.leadSecret,p_sequence_index:entry.index,p_locale:lead.locale,p_resend_email_id:data.id,p_scheduled_at:when,p_status:"scheduled"}, dataToken)
      scheduled += 1
    } catch (error) { errors.push(`#${entry.index}: ${error instanceof Error ? error.message : "unknown error"}`) }
  }

  return { scheduled, errors }
}

export async function replaceScheduledNurtureSequence(
  lead: Pick<NurtureLead, "email" | "name" | "locale" | "unsubscribeToken">,
  existing: ScheduledNurtureEmail[],
) {
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) return { cancelled:0, scheduled:[], errors:["RESEND_API_KEY missing"] }

  const resend = new Resend(resendKey)
  const sequence = EMAIL_SEQUENCES[lead.locale]
  const errors: string[] = []
  let cancelled = 0

  const future = existing
    .filter(item=>item.resendEmailId && item.sequenceIndex >= 1 && item.sequenceIndex <= sequence.length && new Date(item.scheduledAt).getTime() > Date.now())
    .sort((a,b)=>a.sequenceIndex-b.sequenceIndex)

  for (const item of future) {
    try {
      const { error } = await resend.emails.cancel(item.resendEmailId)
      if (error) { errors.push(`cancel #${item.sequenceIndex}: ${error.message}`); continue }
      cancelled += 1
    } catch (error) {
      errors.push(`cancel #${item.sequenceIndex}: ${error instanceof Error ? error.message : "unknown error"}`)
    }
  }

  if (errors.length) return { cancelled, scheduled:[], errors }

  const scheduled: { sequenceIndex:number; resendEmailId:string; scheduledAt:string }[] = []
  const unsubscribeUrl = unsubscribeApiUrl(lead)
  for (const item of future) {
    const entry = sequence[item.sequenceIndex - 1]
    try {
      const { data, error } = await resend.emails.send({
        from:senderName(), to:[lead.email], replyTo:SITE_CONFIG.email, subject:entry.subject,
        html:emailHtml(lead, entry), text:nurtureText(lead, entry), scheduledAt:item.scheduledAt,
        headers:{"List-Unsubscribe":`<${unsubscribeUrl}>`,"List-Unsubscribe-Post":"List-Unsubscribe=One-Click","X-AA-Sequence":String(entry.index),"X-AA-Locale":lead.locale},
      })
      if (error || !data?.id) { errors.push(`schedule #${entry.index}: ${error?.message || "missing Resend id"}`); continue }
      scheduled.push({ sequenceIndex:entry.index, resendEmailId:data.id, scheduledAt:item.scheduledAt })
    } catch (error) {
      errors.push(`schedule #${entry.index}: ${error instanceof Error ? error.message : "unknown error"}`)
    }
  }

  return { cancelled, scheduled, errors }
}

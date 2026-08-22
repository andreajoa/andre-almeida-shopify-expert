import "server-only"
import { Resend } from "resend"
import { EMAIL_SEQUENCES, MarketingLocale, renderSequenceCopy } from "@/lib/marketing/email-sequences"
import { marketingRpc } from "@/lib/marketing/neon-data-api"

export type NurtureLead = {
  leadId: string
  leadSecret: string
  email: string
  name?: string | null
  locale: MarketingLocale
  unsubscribeToken: string
}

function esc(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;")
}

function emailHtml(lead: NurtureLead, entry: (typeof EMAIL_SEQUENCES)[MarketingLocale][number]) {
  const { paragraphs } = renderSequenceCopy(lead.locale, entry, lead.name)
  const unsubscribeUrl = `https://andre-almeida.online/unsubscribe?token=${encodeURIComponent(lead.unsubscribeToken)}&lang=${lead.locale === "pt-BR" ? "pt" : "en"}`
  const isPt = lead.locale === "pt-BR"
  return `<!doctype html><html><body style="margin:0;background:#f2efe8;color:#11110f;font-family:Arial,Helvetica,sans-serif"><div style="display:none;max-height:0;overflow:hidden">${esc(entry.preheader)}</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f2efe8"><tr><td align="center" style="padding:28px 14px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#fffdf8;border:1px solid #d4cec2"><tr><td style="padding:30px 30px 12px;font-size:11px;letter-spacing:2px;color:#77736b">ANDRÉ ALMEIDA · DIGITAL SYSTEMS</td></tr><tr><td style="padding:12px 30px 8px;font-family:Georgia,Times,serif;font-size:34px;line-height:1.05">${esc(entry.subject)}</td></tr><tr><td style="padding:10px 30px 28px;font-size:16px;line-height:1.75;color:#5c5952">${paragraphs.map(p=>`<p style="margin:0 0 18px">${esc(p)}</p>`).join("")}<p style="margin:30px 0"><a href="${entry.ctaUrl}" style="display:inline-block;background:#11110f;color:#fff;text-decoration:none;padding:15px 22px;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:.7px">${esc(entry.ctaLabel)}</a></p></td></tr><tr><td style="border-top:1px solid #d4cec2;padding:20px 30px;font-size:11px;line-height:1.6;color:#77736b">${isPt ? "Você recebe esta sequência porque autorizou comunicações sobre websites, automação e autoridade digital." : "You receive this sequence because you opted in to communications about websites, automation and digital authority."}<br><a href="${unsubscribeUrl}" style="color:#77736b">${isPt ? "Cancelar estes e-mails" : "Unsubscribe from these emails"}</a></td></tr></table></td></tr></table></body></html>`
}

export async function scheduleNurtureSequence(lead: NurtureLead) {
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) return { scheduled: 0, errors: ["RESEND_API_KEY missing"] }

  const resend = new Resend(resendKey)
  const from = process.env.MARKETING_FROM_EMAIL || process.env.CONTACT_FROM_EMAIL || "Andre Almeida <onboarding@resend.dev>"
  const sequence = EMAIL_SEQUENCES[lead.locale]
  const unsubscribeUrl = `https://andre-almeida.online/api/marketing/unsubscribe?token=${encodeURIComponent(lead.unsubscribeToken)}`
  let scheduled = 0
  const errors: string[] = []

  for (const entry of sequence) {
    const when = new Date(Date.now() + (entry.index === 1 ? 5 * 60_000 : (entry.index - 1) * 24 * 60 * 60_000)).toISOString()
    const copy = renderSequenceCopy(lead.locale, entry, lead.name)
    try {
      const { data, error } = await resend.emails.send({
        from,
        to: [lead.email],
        subject: entry.subject,
        html: emailHtml(lead, entry),
        text: `${copy.text}\n\n${entry.ctaLabel}: ${entry.ctaUrl}\n\nUnsubscribe: ${unsubscribeUrl}`,
        scheduledAt: when,
        headers: {
          "List-Unsubscribe": `<${unsubscribeUrl}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
          "X-AA-Sequence": String(entry.index),
          "X-AA-Locale": lead.locale,
        },
      })
      if (error || !data?.id) {
        errors.push(`#${entry.index}: ${error?.message || "missing Resend id"}`)
        continue
      }
      await marketingRpc("register_marketing_send", {
        p_lead_id: lead.leadId,
        p_lead_secret: lead.leadSecret,
        p_sequence_index: entry.index,
        p_locale: lead.locale,
        p_resend_email_id: data.id,
        p_scheduled_at: when,
        p_status: "scheduled",
      })
      scheduled += 1
    } catch (error) {
      errors.push(`#${entry.index}: ${error instanceof Error ? error.message : "unknown error"}`)
    }
  }

  return { scheduled, errors }
}

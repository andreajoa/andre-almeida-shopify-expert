import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

type ContactMessage = {
  id: string
  name: string
  email: string
  phone: string
  company: string
  serviceType: string
  budget: string
  message: string
  locale: string
  date: string
  time: string
  type: string
  createdAt: string
}

const messages: ContactMessage[] = []

function escapeHtml(value: string) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function formatLeadHtml(msg: ContactMessage) {
  const cleanPhone = msg.phone.replace(/\D/g, "")
  const whatsappReply = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Olá ${msg.name}, recebi sua mensagem pelo meu site sobre ${msg.serviceType || "meus serviços"}.`)}`
    : ""

  const rows = [
    ["Tipo", msg.type], ["Nome", msg.name], ["Email", msg.email], ["Telefone", msg.phone],
    ["Empresa", msg.company], ["Serviço", msg.serviceType], ["Orçamento", msg.budget],
    ["Data da call", msg.date], ["Horário da call", msg.time], ["Idioma", msg.locale], ["Criado em", msg.createdAt],
  ]

  return `
    <div style="font-family:Arial,sans-serif;background:#f2efe8;padding:24px;color:#11110f">
      <div style="max-width:720px;margin:0 auto;background:#fff;border:1px solid #d8d2c7">
        <div style="background:#11110f;color:#fff;padding:28px">
          <div style="font-size:11px;letter-spacing:2px;color:#c7b18d;margin-bottom:10px">ANDRÉ ALMEIDA</div>
          <h1 style="margin:0;font-size:26px">Novo contato pelo site</h1>
        </div>
        <div style="padding:28px">
          <table style="width:100%;border-collapse:collapse">
            ${rows.filter(([, value]) => value).map(([label, value]) => `
              <tr>
                <td style="padding:11px 0;color:#77736b;width:160px;border-bottom:1px solid #e7e2d8">${escapeHtml(label)}</td>
                <td style="padding:11px 0;color:#11110f;font-weight:600;border-bottom:1px solid #e7e2d8">${escapeHtml(value)}</td>
              </tr>`).join("")}
          </table>
          <h2 style="font-size:18px;margin:28px 0 10px">Mensagem</h2>
          <div style="white-space:pre-wrap;background:#f2efe8;padding:18px;line-height:1.6">${escapeHtml(msg.message)}</div>
          <div style="margin-top:26px">
            ${whatsappReply ? `<a href="${whatsappReply}" style="display:inline-block;background:#11110f;color:#fff;text-decoration:none;padding:13px 18px;margin-right:10px">Responder no WhatsApp</a>` : ""}
            <a href="mailto:${escapeHtml(msg.email)}" style="display:inline-block;background:#b49970;color:#11110f;text-decoration:none;padding:13px 18px;font-weight:bold">Responder por e-mail</a>
          </div>
        </div>
      </div>
    </div>`
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const msg: ContactMessage = {
      id: `msg_${Date.now()}`,
      name: String(data.name).trim(),
      email: String(data.email).trim(),
      phone: String(data.phone || "").trim(),
      company: String(data.company || "").trim(),
      serviceType: String(data.serviceType || "").trim(),
      budget: String(data.budget || "").trim(),
      message: String(data.message).trim(),
      locale: data.locale === "en" ? "en" : "pt-BR",
      date: String(data.selectedDate || ""),
      time: String(data.selectedTime || ""),
      type: String(data.type || "contact"),
      createdAt: new Date().toISOString(),
    }

    messages.unshift(msg)
    console.log("CONTACT_RECEIVED", JSON.stringify({ id: msg.id, type: msg.type, createdAt: msg.createdAt }))

    const resendApiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.CONTACT_TO_EMAIL
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Andre Almeida <onboarding@resend.dev>"

    if (!resendApiKey || !toEmail) {
      console.error("CONTACT_EMAIL_CONFIG_MISSING")
      return NextResponse.json({ success: false, error: "Contact email is not configured" }, { status: 503 })
    }

    const resend = new Resend(resendApiKey)
    const subject = msg.type === "scheduled-call" ? `Nova conversa agendada: ${msg.name}` : `Novo lead pelo site: ${msg.name}`
    const { data: sent, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: msg.email,
      subject,
      html: formatLeadHtml(msg),
      text: [
        "Novo contato pelo site", "", `Tipo: ${msg.type}`, `Nome: ${msg.name}`, `Email: ${msg.email}`,
        `Telefone: ${msg.phone}`, `Empresa: ${msg.company}`, `Serviço: ${msg.serviceType}`, `Orçamento: ${msg.budget}`,
        `Data da call: ${msg.date}`, `Horário da call: ${msg.time}`, `Idioma: ${msg.locale}`, "", "Mensagem:", msg.message,
      ].join("\n"),
    })

    if (error || !sent?.id) {
      console.error("CONTACT_EMAIL_SEND_FAILED", error)
      return NextResponse.json({ success: false, error: "Email delivery failed" }, { status: 502 })
    }

    console.log("CONTACT_EMAIL_SENT", JSON.stringify({ leadId: msg.id, resendId: sent.id }))
    return NextResponse.json({ success: true, id: msg.id, emailId: sent.id })
  } catch (error) {
    console.error("CONTACT_SERVER_ERROR", error)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const authKey = req.headers.get("x-auth-key")
  const urlKey = req.nextUrl.searchParams.get("key")
  const expectedKey = process.env.CONTACT_ADMIN_KEY

  if (!expectedKey) return NextResponse.json({ error: "CONTACT_ADMIN_KEY is not configured" }, { status: 500 })
  if (authKey !== expectedKey && urlKey !== expectedKey) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  return NextResponse.json({ total: messages.length, messages })
}

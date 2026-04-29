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
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
        `Olá ${msg.name}, recebi sua mensagem pelo meu site sobre ${msg.serviceType || "meus serviços"}.`
      )}`
    : ""

  const rows = [
    ["Tipo", msg.type],
    ["Nome", msg.name],
    ["Email", msg.email],
    ["Telefone", msg.phone],
    ["Empresa", msg.company],
    ["Serviço", msg.serviceType],
    ["Orçamento", msg.budget],
    ["Data da call", msg.date],
    ["Horário da call", msg.time],
    ["Idioma", msg.locale],
    ["Criado em", msg.createdAt],
  ]

  return `
    <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:24px;">
      <div style="max-width:720px; margin:0 auto; background:white; border-radius:18px; overflow:hidden; border:1px solid #e2e8f0;">
        <div style="background:#0f172a; color:white; padding:26px;">
          <h1 style="margin:0; font-size:24px;">Novo lead pelo site</h1>
          <p style="margin:8px 0 0; color:#cbd5e1;">Andre Almeida Shopify Expert</p>
        </div>

        <div style="padding:26px;">
          <table style="width:100%; border-collapse:collapse;">
            ${rows
              .filter(([, value]) => value)
              .map(
                ([label, value]) => `
                  <tr>
                    <td style="padding:11px 0; color:#64748b; width:160px; border-bottom:1px solid #e2e8f0;">${escapeHtml(label)}</td>
                    <td style="padding:11px 0; color:#0f172a; font-weight:600; border-bottom:1px solid #e2e8f0;">${escapeHtml(value)}</td>
                  </tr>
                `
              )
              .join("")}
          </table>

          <h2 style="font-size:18px; margin:26px 0 10px; color:#0f172a;">Mensagem</h2>
          <div style="white-space:pre-wrap; background:#f1f5f9; padding:18px; border-radius:14px; color:#0f172a; line-height:1.5;">
            ${escapeHtml(msg.message)}
          </div>

          <div style="margin-top:26px;">
            ${
              whatsappReply
                ? `<a href="${whatsappReply}" style="display:inline-block; background:#22c55e; color:#052e16; text-decoration:none; padding:13px 18px; border-radius:12px; font-weight:bold; margin-right:10px;">Responder no WhatsApp</a>`
                : ""
            }
            <a href="mailto:${escapeHtml(msg.email)}" style="display:inline-block; background:#4f46e5; color:white; text-decoration:none; padding:13px 18px; border-radius:12px; font-weight:bold;">Responder por Email</a>
          </div>
        </div>
      </div>
    </div>
  `
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const msg: ContactMessage = {
      id: `msg_${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      company: data.company || "",
      serviceType: data.serviceType || "",
      budget: data.budget || "",
      message: data.message,
      locale: data.locale || "en",
      date: data.selectedDate || "",
      time: data.selectedTime || "",
      type: data.type || "contact",
      createdAt: new Date().toISOString(),
    }

    messages.unshift(msg)
    console.log("📩 NEW CONTACT MESSAGE:", JSON.stringify(msg, null, 2))

    const resendApiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.CONTACT_TO_EMAIL
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Andre Almeida <onboarding@resend.dev>"

    if (!resendApiKey || !toEmail) {
      console.warn("Email not sent: RESEND_API_KEY or CONTACT_TO_EMAIL is missing")
      return NextResponse.json({
        success: true,
        id: msg.id,
        warning: "Lead received, but email is not configured.",
      })
    }

    const resend = new Resend(resendApiKey)

    const subject =
      msg.type === "scheduled-call"
        ? `Nova call agendada: ${msg.name}`
        : `Novo lead pelo site: ${msg.name}`

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: msg.email,
      subject,
      html: formatLeadHtml(msg),
      text: `
Novo lead pelo site

Tipo: ${msg.type}
Nome: ${msg.name}
Email: ${msg.email}
Telefone: ${msg.phone}
Empresa: ${msg.company}
Serviço: ${msg.serviceType}
Orçamento: ${msg.budget}
Data da call: ${msg.date}
Horário da call: ${msg.time}
Idioma: ${msg.locale}
Criado em: ${msg.createdAt}

Mensagem:
${msg.message}
      `.trim(),
    })

    if (error) {
      console.error("Resend email error:", error)
      return NextResponse.json({
        success: true,
        id: msg.id,
        warning: "Lead received, but email failed.",
      })
    }

    return NextResponse.json({ success: true, id: msg.id })
  } catch (error) {
    console.error("Contact error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const authKey = req.headers.get("x-auth-key")
  const urlKey = req.nextUrl.searchParams.get("key")
  const expectedKey = process.env.CONTACT_ADMIN_KEY

  if (!expectedKey) {
    return NextResponse.json({ error: "CONTACT_ADMIN_KEY is not configured" }, { status: 500 })
  }

  if (authKey !== expectedKey && urlKey !== expectedKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({
    total: messages.length,
    messages,
  })
}

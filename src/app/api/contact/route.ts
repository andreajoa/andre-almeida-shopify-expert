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
  const heading =
    msg.type === "scheduled-call" ? "Nova call agendada" : "Novo lead pelo site"
  const receivedAt = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(msg.createdAt))
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
    ["Criado em", receivedAt],
  ]

  return `
    <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:24px;">
      <div style="max-width:720px; margin:0 auto; background:white; border-radius:18px; overflow:hidden; border:1px solid #e2e8f0;">
        <!--
          Cabecalho sem imagem de proposito: nenhum asset externo e nenhum
          data URI. Clientes de email bloqueiam imagem por padrao e descartam
          data URI, entao o topo e montado so com tabela, cor solida e texto -
          renderiza igual no Gmail, Outlook e Apple Mail, sem nenhuma requisicao.
        -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0f172a" style="background-color:#0f172a;">
          <tr>
            <td style="padding:30px 26px 26px 26px; font-family:Arial,Helvetica,sans-serif;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="44" height="44" align="center" valign="middle" bgcolor="#4f46e5" style="background-color:#4f46e5; width:44px; height:44px; border-radius:10px; color:#ffffff; font-family:Arial,Helvetica,sans-serif; font-size:17px; font-weight:bold; line-height:44px; letter-spacing:1px;">AA</td>
                  <td style="padding-left:12px; font-family:Arial,Helvetica,sans-serif;">
                    <div style="color:#ffffff; font-size:15px; font-weight:bold; letter-spacing:0.3px;">Andre Almeida</div>
                    <div style="color:#94a3b8; font-size:11px; letter-spacing:1.6px; text-transform:uppercase;">Shopify Expert</div>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:22px;">
                <tr>
                  <td width="52" height="3" bgcolor="#4f46e5" style="background-color:#4f46e5; width:52px; height:3px; line-height:3px; font-size:0;">&nbsp;</td>
                </tr>
              </table>

              <h1 style="margin:14px 0 0; color:#ffffff; font-family:Arial,Helvetica,sans-serif; font-size:24px; line-height:1.25; font-weight:bold;">${escapeHtml(heading)}</h1>
              <p style="margin:7px 0 0; color:#cbd5e1; font-family:Arial,Helvetica,sans-serif; font-size:13px;">${escapeHtml(receivedAt)}</p>
            </td>
          </tr>
        </table>

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

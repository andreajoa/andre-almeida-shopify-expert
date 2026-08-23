import { randomBytes } from "node:crypto"
import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { replaceScheduledNurtureSequence, ScheduledNurtureEmail } from "@/lib/marketing/email-automation"
import { marketingRpc, vercelDataToken } from "@/lib/marketing/neon-data-api"

const COOKIE = "aa_dashboard_session"

type NurtureRefreshPayload = {
  lead?: {
    leadId?: string
    email?: string
    name?: string | null
    locale?: "pt-BR" | "en-US"
    unsubscribeToken?: string
  }
  existing?: Array<{
    sequenceIndex?: number
    resendEmailId?: string
    scheduledAt?: string
  }>
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE)?.value || ""
  if (!token) return NextResponse.json({ error:"unauthorized" }, { status:401 })
  const days = Math.max(1,Math.min(Number(req.nextUrl.searchParams.get("days") || 30),365))
  try {
    const snapshot = await marketingRpc("dashboard_snapshot", { p_token:token, p_days:days }, vercelDataToken(req.headers))
    return NextResponse.json(snapshot, { headers:{"Cache-Control":"private, no-store"} })
  } catch {
    const response = NextResponse.json({ error:"unauthorized" }, { status:401 })
    response.cookies.delete(COOKIE)
    return response
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json().catch(()=>({}))
  const action = String(data.action || "login")
  const dataToken = vercelDataToken(req.headers)

  if (action === "request_reset") {
    const resendKey = process.env.RESEND_API_KEY
    const adminEmail = process.env.CONTACT_TO_EMAIL
    if (!resendKey || !adminEmail || !dataToken) return NextResponse.json({ error:"reset service unavailable" }, { status:503 })
    try {
      const resetToken = randomBytes(32).toString("hex")
      const result = await marketingRpc<{ok:boolean}>("dashboard_issue_password_reset", { p_token:resetToken }, dataToken)
      if (!result.ok) throw new Error("reset token rejected")
      const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://andre-almeida.online").replace(/\/$/,"")
      const resetUrl = `${base}/dashboard/reset?token=${encodeURIComponent(resetToken)}`
      const resend = new Resend(resendKey)
      const from = process.env.CONTACT_FROM_EMAIL || "Andre Almeida <onboarding@resend.dev>"
      const { error } = await resend.emails.send({
        from,
        to:[adminEmail],
        subject:"Redefinir senha do dashboard · André Almeida",
        html:`<div style="font-family:Arial,sans-serif;background:#f2efe8;padding:30px"><div style="max-width:620px;margin:auto;background:#fffdf8;border:1px solid #d4cec2;padding:32px"><p style="font-size:11px;letter-spacing:2px;color:#77736b">ANDRÉ ALMEIDA · PRIVATE COMMAND CENTER</p><h1 style="font-family:Georgia,serif;font-size:38px;font-weight:400">Redefinição de senha</h1><p style="line-height:1.7;color:#5f5b54">Use o botão abaixo para definir uma nova senha. O link expira em 20 minutos e só pode ser utilizado uma vez.</p><p style="margin:28px 0"><a href="${resetUrl}" style="display:inline-block;background:#11110f;color:white;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:bold">Redefinir senha</a></p><p style="font-size:12px;color:#77736b">Se você não solicitou isso, ignore esta mensagem.</p></div></div>`,
        text:`Redefina a senha do dashboard: ${resetUrl}\n\nO link expira em 20 minutos e só pode ser usado uma vez.`,
      })
      if (error) throw new Error(error.message)
      return NextResponse.json({ ok:true })
    } catch (error) {
      console.error("Dashboard reset request error", error)
      return NextResponse.json({ error:"reset service unavailable" }, { status:503 })
    }
  }

  if (action === "reset_password") {
    const resetToken = String(data.token || "")
    const next = String(data.password || "")
    if (resetToken.length < 32 || next.length < 12) return NextResponse.json({ error:"invalid reset request" }, { status:400 })
    try {
      const result = await marketingRpc<{ok:boolean;reason?:string}>("dashboard_reset_password", { p_token:resetToken, p_new_password:next }, dataToken)
      const response = NextResponse.json(result, { status:result.ok?200:400 })
      if (result.ok) response.cookies.delete(COOKIE)
      return response
    } catch (error) {
      console.error("Dashboard password reset error", error)
      return NextResponse.json({ error:"reset service unavailable" }, { status:503 })
    }
  }

  if (action === "login") {
    try {
      const result = await marketingRpc<{ok:boolean;token?:string;expires_at?:string}>("dashboard_login", { p_password:String(data.password || "") }, dataToken)
      if (!result.ok || !result.token) return NextResponse.json({ error:"invalid credentials" }, { status:401 })
      const response = NextResponse.json({ ok:true })
      response.cookies.set(COOKIE,result.token,{ httpOnly:true, secure:process.env.NODE_ENV==="production", sameSite:"strict", path:"/", maxAge:12*60*60 })
      return response
    } catch (error) {
      console.error("Dashboard login service error", error)
      return NextResponse.json({ error:"dashboard temporarily unavailable" }, { status:503 })
    }
  }

  const token = req.cookies.get(COOKIE)?.value || ""
  if (!token) return NextResponse.json({ error:"unauthorized" }, { status:401 })

  if (action === "replace_scheduled_nurture") {
    try {
      let payload: NurtureRefreshPayload = {}
      const leadId = String(data.leadId || "").trim()

      if (leadId) {
        payload = await marketingRpc<NurtureRefreshPayload>("dashboard_nurture_refresh_payload", { p_token:token, p_lead_id:leadId }, dataToken)
      } else {
        payload = {
          lead: data.lead && typeof data.lead === "object" ? data.lead : undefined,
          existing: Array.isArray(data.existing) ? data.existing : undefined,
        }
      }

      const rawLead = payload.lead && typeof payload.lead === "object" ? payload.lead : {}
      const rawExisting = Array.isArray(payload.existing) ? payload.existing : []
      const email = String(rawLead.email || "").trim()
      const unsubscribeToken = String(rawLead.unsubscribeToken || "").trim()
      const locale = rawLead.locale === "en-US" ? "en-US" : "pt-BR"
      const name = typeof rawLead.name === "string" ? rawLead.name : null
      if (!email.includes("@") || unsubscribeToken.length < 16 || rawExisting.length === 0) {
        return NextResponse.json({ error:"invalid nurture replacement payload" }, { status:400 })
      }

      const existing: ScheduledNurtureEmail[] = rawExisting.map((item:Record<string,unknown>)=>({
        sequenceIndex:Number(item.sequenceIndex),
        resendEmailId:String(item.resendEmailId || ""),
        scheduledAt:String(item.scheduledAt || ""),
      })).filter((item:ScheduledNurtureEmail)=>Number.isInteger(item.sequenceIndex) && item.sequenceIndex > 0 && item.resendEmailId.length > 5 && !Number.isNaN(new Date(item.scheduledAt).getTime()))
      if (!existing.length) return NextResponse.json({ error:"no valid scheduled emails" }, { status:400 })

      const result = await replaceScheduledNurtureSequence({ email, name, locale, unsubscribeToken }, existing)
      const reconciliationErrors: string[] = []

      for (const replacement of result.scheduled) {
        const previous = existing.find(item=>item.sequenceIndex===replacement.sequenceIndex)
        if (!previous) {
          reconciliationErrors.push(`db #${replacement.sequenceIndex}: previous send not found`)
          continue
        }
        try {
          const updated = await marketingRpc<{ok:boolean;updated:number}>("dashboard_replace_scheduled_send", {
            p_token:token,
            p_old_resend_id:previous.resendEmailId,
            p_new_resend_id:replacement.resendEmailId,
            p_scheduled_at:replacement.scheduledAt,
          }, dataToken)
          if (!updated.ok || updated.updated !== 1) reconciliationErrors.push(`db #${replacement.sequenceIndex}: send row not updated`)
        } catch (error) {
          reconciliationErrors.push(`db #${replacement.sequenceIndex}: ${error instanceof Error ? error.message : "unknown error"}`)
        }
      }

      const errors = [...result.errors, ...reconciliationErrors]
      return NextResponse.json({ ...result, errors }, { status:errors.length ? 502 : 200 })
    } catch (error) {
      console.error("Dashboard nurture replacement error", error)
      return NextResponse.json({ error:"nurture replacement unavailable" }, { status:503 })
    }
  }

  if (action === "logout") {
    await marketingRpc("dashboard_logout", { p_token:token }, dataToken).catch(()=>{})
    const response = NextResponse.json({ ok:true })
    response.cookies.delete(COOKIE)
    return response
  }

  if (action === "change_password") {
    const next = String(data.password || "")
    if (next.length < 12) return NextResponse.json({ error:"minimum 12 characters" }, { status:400 })
    try {
      const result = await marketingRpc<{ok:boolean}>("dashboard_change_password", { p_token:token, p_new_password:next }, dataToken)
      const response = NextResponse.json(result, { status:result.ok?200:400 })
      if (result.ok) response.cookies.delete(COOKIE)
      return response
    } catch {
      return NextResponse.json({ error:"dashboard temporarily unavailable" }, { status:503 })
    }
  }

  return NextResponse.json({ error:"invalid action" }, { status:400 })
}

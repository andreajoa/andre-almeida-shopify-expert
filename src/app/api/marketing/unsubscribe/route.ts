import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { marketingRpc } from "@/lib/marketing/neon-data-api"

async function unsubscribe(token: string) {
  if (!token || token.length < 20) throw new Error("invalid token")
  const pending = await marketingRpc<{ ok: boolean; sends: Array<{ resend_email_id: string }> }>("get_pending_sends_for_unsubscribe", { p_token: token })
  await marketingRpc("marketing_unsubscribe", { p_token: token })

  const resendKey = process.env.RESEND_API_KEY
  let cancelled = 0
  if (resendKey && pending.ok && Array.isArray(pending.sends)) {
    const resend = new Resend(resendKey)
    for (const item of pending.sends) {
      if (!item.resend_email_id) continue
      try {
        const { error } = await resend.emails.cancel(item.resend_email_id)
        if (!error) {
          cancelled += 1
          await marketingRpc("mark_marketing_send_cancelled", { p_token: token, p_resend_email_id: item.resend_email_id })
        }
      } catch { /* already sent or cancellation window closed */ }
    }
  }
  return { ok: true, cancelled }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token") || String((await req.json().catch(()=>({}))).token || "")
    return NextResponse.json(await unsubscribe(token))
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token") || ""
    return NextResponse.json(await unsubscribe(token))
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}

import { NextRequest, NextResponse } from "next/server"
import { marketingRpc, vercelDataToken } from "@/lib/marketing/neon-data-api"
import { verifyResendWebhook } from "@/lib/marketing/resend-webhook"

type ResendEvent = {
  type?: string
  created_at?: string
  data?: { email_id?: string }
}

export async function POST(req: NextRequest) {
  const payload = await req.text()
  const id = req.headers.get("svix-id") || ""
  const timestamp = req.headers.get("svix-timestamp") || ""
  const signature = req.headers.get("svix-signature") || ""
  if (!id || !timestamp || !signature) return new NextResponse("Missing signature", { status:400 })

  try {
    const verified = await verifyResendWebhook(payload, { id, timestamp, signature }) as unknown as ResendEvent
    const emailId = String(verified.data?.email_id || "")
    const eventType = String(verified.type || "")
    if (emailId && eventType) {
      const occurredAt = verified.created_at && !Number.isNaN(Date.parse(verified.created_at)) ? verified.created_at : new Date().toISOString()
      await marketingRpc("record_resend_email_event", {
        p_resend_email_id:emailId,
        p_event_type:eventType,
        p_payload:JSON.parse(payload) as Record<string,unknown>,
        p_occurred_at:occurredAt,
      }, vercelDataToken(req.headers))
    }
    return NextResponse.json({ ok:true })
  } catch (error) {
    console.error("Resend webhook verification failed", error)
    return new NextResponse("Invalid webhook", { status:400 })
  }
}

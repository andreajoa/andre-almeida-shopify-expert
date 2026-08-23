import { NextRequest, NextResponse } from "next/server"
import { replaceScheduledNurtureSequence, ScheduledNurtureEmail } from "@/lib/marketing/email-automation"
import { marketingRpc, vercelDataToken } from "@/lib/marketing/neon-data-api"

type RefreshPayload = {
  lead?: {
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
  const token = req.nextUrl.searchParams.get("token") || ""
  const leadId = req.nextUrl.searchParams.get("leadId") || ""
  const dataToken = vercelDataToken(req.headers)

  if (token.length < 32 || !leadId) {
    return NextResponse.json({ ok:false, error:"invalid request" }, { status:400 })
  }

  try {
    const payload = await marketingRpc<RefreshPayload>("dashboard_nurture_refresh_payload", {
      p_token:token,
      p_lead_id:leadId,
    }, dataToken)

    const lead = payload.lead || {}
    const email = String(lead.email || "").trim()
    const unsubscribeToken = String(lead.unsubscribeToken || "").trim()
    const locale = lead.locale === "en-US" ? "en-US" : "pt-BR"
    const name = typeof lead.name === "string" ? lead.name : null
    const rawExisting = Array.isArray(payload.existing) ? payload.existing : []

    const existing: ScheduledNurtureEmail[] = rawExisting.map(item=>({
      sequenceIndex:Number(item.sequenceIndex),
      resendEmailId:String(item.resendEmailId || ""),
      scheduledAt:String(item.scheduledAt || ""),
    })).filter(item=>Number.isInteger(item.sequenceIndex) && item.sequenceIndex > 0 && item.resendEmailId.length > 5 && !Number.isNaN(new Date(item.scheduledAt).getTime()))

    if (!email.includes("@") || unsubscribeToken.length < 16 || !existing.length) {
      return NextResponse.json({ ok:false, error:"nothing to refresh" }, { status:400 })
    }

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
    if (!errors.length) {
      await marketingRpc("dashboard_logout", { p_token:token }, dataToken).catch(()=>{})
    }

    return NextResponse.json({ ok:errors.length===0, cancelled:result.cancelled, scheduled:result.scheduled.length, errors }, {
      status:errors.length ? 502 : 200,
      headers:{"Cache-Control":"no-store"},
    })
  } catch (error) {
    console.error("One-time nurture refresh error", error)
    return NextResponse.json({ ok:false, error:"refresh unavailable" }, { status:503, headers:{"Cache-Control":"no-store"} })
  }
}

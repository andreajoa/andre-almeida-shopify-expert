import { NextRequest, NextResponse } from "next/server"
import { marketingRpc, vercelDataToken } from "@/lib/marketing/neon-data-api"

function decodeHeader(value: string | null) {
  if (!value) return ""
  try { return decodeURIComponent(value) } catch { return value }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const sessionId = String(data.sessionId || "")
    const eventType = String(data.eventType || "")
    if (sessionId.length < 10 || sessionId.length > 120 || !/^[a-zA-Z0-9_-]+$/.test(sessionId)) {
      return NextResponse.json({ error: "invalid session" }, { status: 400 })
    }
    if (!/^(pageview|click|heartbeat|whatsapp|form_submit|email_capture)$/.test(eventType)) {
      return NextResponse.json({ error: "invalid event" }, { status: 400 })
    }

    const country = req.headers.get("x-vercel-ip-country") || String(data.country || "")
    const region = decodeHeader(req.headers.get("x-vercel-ip-country-region")) || String(data.region || "")
    const city = decodeHeader(req.headers.get("x-vercel-ip-city")) || String(data.city || "")

    await marketingRpc("track_visitor_event", {
      p_session_id: sessionId,
      p_event_type: eventType,
      p_path: String(data.path || "").slice(0, 500) || null,
      p_element: String(data.element || "").slice(0, 500) || null,
      p_href: String(data.href || "").slice(0, 1000) || null,
      p_duration_seconds: Math.max(0, Math.min(Number(data.durationSeconds || 0), 86400)),
      p_locale: String(data.locale || "").slice(0, 20) || null,
      p_country: country.slice(0, 8) || null,
      p_region: region.slice(0, 120) || null,
      p_city: city.slice(0, 160) || null,
      p_referrer: String(data.referrer || "").slice(0, 1000) || null,
      p_source: String(data.source || "").slice(0, 200) || null,
      p_medium: String(data.medium || "").slice(0, 200) || null,
      p_campaign: String(data.campaign || "").slice(0, 300) || null,
      p_user_agent: req.headers.get("user-agent")?.slice(0, 1000) || null,
      p_metadata: typeof data.metadata === "object" && data.metadata ? data.metadata : {},
    }, vercelDataToken(req.headers))

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Track error", error)
    return NextResponse.json({ ok: false }, { status: 202 })
  }
}

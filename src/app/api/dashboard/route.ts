import { NextRequest, NextResponse } from "next/server"
import { marketingRpc, vercelDataToken } from "@/lib/marketing/neon-data-api"

const COOKIE = "aa_dashboard_session"

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

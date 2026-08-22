import { NextRequest, NextResponse } from "next/server"

function decodeHeader(value: string | null) {
  if (!value) return ""
  try { return decodeURIComponent(value) } catch { return value }
}

export async function GET(req: NextRequest) {
  const country = req.headers.get("x-vercel-ip-country") || ""
  const region = decodeHeader(req.headers.get("x-vercel-ip-country-region"))
  const city = decodeHeader(req.headers.get("x-vercel-ip-city"))
  const acceptLanguage = req.headers.get("accept-language") || ""
  const browserPrefersPt = /^pt\b/i.test(acceptLanguage) || /(^|,)\s*pt[-;]/i.test(acceptLanguage)
  const locale = country.toUpperCase() === "BR" || browserPrefersPt ? "pt-BR" : "en-US"

  return NextResponse.json({ country, region, city, locale }, {
    headers: { "Cache-Control": "private, no-store, max-age=0" },
  })
}

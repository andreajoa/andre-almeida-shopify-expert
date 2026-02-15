import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"
import { NextRequest } from "next/server"

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value
  if (cookieLocale && routing.locales.includes(cookieLocale as any)) {
    return intlMiddleware(request)
  }

  const country = request.geo?.country || ""
  const acceptLang = request.headers.get("accept-language") || ""

  let detectedLocale = "en"
  if (country === "BR" || acceptLang.includes("pt")) {
    detectedLocale = "pt-BR"
  } else if (
    ["ES", "MX", "AR", "CO", "CL", "PE", "VE", "EC", "UY", "PY", "BO", "CR", "PA", "DO", "GT", "HN", "SV", "NI", "CU"].includes(country) ||
    acceptLang.includes("es")
  ) {
    detectedLocale = "es"
  }

  const response = intlMiddleware(request)
  response.cookies.set("NEXT_LOCALE", detectedLocale)
  return response
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}

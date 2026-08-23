import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

export default createMiddleware(routing)

export const config = {
  // /viral-intel is reserved for the Cloudflare-hosted Viral Intel application.
  // Keeping it out of next-intl prevents locale redirects if a request reaches
  // the Next.js origin instead of being intercepted by the Cloudflare route.
  matcher: ["/((?!api|viral-intel|_next|_vercel|.*\\..*).*)"],
}

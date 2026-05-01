"use client"
import dynamic from "next/dynamic"
const CookieConsent = dynamic(() => import("@/components/widgets/CookieConsent").then(m => ({ default: m.CookieConsent })), { ssr: false })
export function CookieConsentLazy() {
  return <CookieConsent />
}

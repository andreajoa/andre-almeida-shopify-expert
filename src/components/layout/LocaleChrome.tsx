"use client"

import { usePathname } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppButton } from "@/components/widgets/WhatsAppButton"
import { CookieConsentLazy } from "@/components/widgets/CookieConsentLazy"

export function LocaleChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isBioPage = pathname.includes("/conteudo")

  if (isBioPage) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppButton />
      <CookieConsentLazy />
    </>
  )
}

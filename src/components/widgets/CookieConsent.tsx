"use client"

import { useEffect, useRef, useState } from "react"
import { useLocale } from "next-intl"
import Link from "next/link"

export function CookieConsent() {
  const [show, setShow] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const locale = useLocale()
  const isPt = locale !== "en"
  const lang = isPt ? "pt-BR" : "en"

  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) {
      const timer = window.setTimeout(() => setShow(true), 1600)
      return () => window.clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (show) {
      el.style.display = "block"
      requestAnimationFrame(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)" })
    } else {
      el.style.opacity = "0"
      el.style.transform = "translateY(16px)"
      const timer = window.setTimeout(() => { if (el) el.style.display = "none" }, 220)
      return () => window.clearTimeout(timer)
    }
  }, [show])

  const decide = (value: "all" | "essential") => { localStorage.setItem("cookie_consent", value); setShow(false) }

  return <div ref={ref} className="fixed bottom-0 left-0 right-0 z-[9997] p-4 md:p-6" style={{display:"none",opacity:0,transform:"translateY(16px)",transition:"opacity 220ms ease, transform 220ms ease"}}>
    <div className="mx-auto max-w-4xl border border-black/10 bg-[#f2efe8] p-5 text-[#11110f] shadow-[0_20px_60px_rgba(0,0,0,.2)] sm:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <div className="flex-1"><p className="text-[9px] font-semibold uppercase tracking-[.16em] text-[#a08967]">{isPt?"PRIVACIDADE & COOKIES":"PRIVACY & COOKIES"}</p><p className="mt-3 text-sm leading-6 text-[#625e56]">{isPt?"Usamos cookies essenciais e, conforme sua escolha, recursos de análise para entender o uso do site.":"We use essential cookies and, depending on your choice, analytics to understand website usage."} <Link href={`/${lang}/cookie-policy`} className="border-b border-[#77736b] text-[#11110f]">{isPt?"Ver política":"View policy"}</Link>.</p></div>
        <div className="flex gap-2"><button type="button" onClick={()=>decide("essential")} className="min-h-11 border border-[#cfc8bc] px-5 text-[9px] font-semibold uppercase tracking-[.12em]">{isPt?"Somente essenciais":"Essential only"}</button><button type="button" onClick={()=>decide("all")} className="min-h-11 bg-[#11110f] px-5 text-[9px] font-semibold uppercase tracking-[.12em] text-white">{isPt?"Aceitar":"Accept"}</button></div>
      </div>
    </div>
  </div>
}

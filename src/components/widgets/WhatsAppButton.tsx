"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, MessageCircle, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { Analytics } from "@/lib/analytics"
import { SITE_CONFIG } from "@/lib/constants"

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const t = useTranslations("whatsapp")
  const message = encodeURIComponent(t("defaultMessage"))
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${message}`

  useEffect(() => {
    const el = popupRef.current
    if (!el) return

    if (isOpen) {
      el.style.display = "block"
      requestAnimationFrame(() => {
        el.style.opacity = "1"
        el.style.transform = "translateY(0)"
      })
    } else {
      el.style.opacity = "0"
      el.style.transform = "translateY(12px)"
      const timeout = window.setTimeout(() => {
        if (el) el.style.display = "none"
      }, 220)
      return () => window.clearTimeout(timeout)
    }
  }, [isOpen])

  return (
    <div className="fixed bottom-4 right-4 z-[9999] sm:bottom-6 sm:right-6">
      <div
        ref={popupRef}
        className="absolute bottom-[68px] right-0 mb-2 hidden w-[min(320px,calc(100vw-2rem))] overflow-hidden border border-black/10 bg-[#f2efe8] text-[#11110f] shadow-[0_24px_70px_rgba(0,0,0,0.22)]"
        style={{ opacity: 0, transform: "translateY(12px)", transition: "opacity 220ms ease, transform 220ms ease" }}
      >
        <div className="border-b border-black/10 p-5">
          <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#77736b]">Direct contact</p>
          <div className="mt-3 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#11110f] text-[9px] font-semibold tracking-[0.08em] text-white">AA</span>
            <div>
              <p className="text-sm font-semibold">Andre Almeida</p>
              <p className="mt-0.5 text-xs text-[#6d6a63]">{t("status")}</p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <p className="font-editorial text-2xl leading-tight">{t("greeting")}</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => Analytics.whatsappClick("premium_popup_button")}
            className="mt-5 flex min-h-12 items-center justify-between rounded-full bg-[#11110f] px-5 text-[9px] font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-[#2a2925]"
          >
            {t("startChat")}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <button
        type="button"
        aria-label="Abrir chat WhatsApp"
        aria-expanded={isOpen}
        onClick={() => {
          if (!isOpen) Analytics.whatsappClick("premium_floating_button")
          setIsOpen((value) => !value)
        }}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-[#11110f] text-white shadow-[0_12px_35px_rgba(0,0,0,0.22)] transition hover:scale-[1.04] hover:border-[#c7b18d] hover:text-[#c7b18d] active:scale-95"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </div>
  )
}

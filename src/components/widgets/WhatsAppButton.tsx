"use client"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { SITE_CONFIG } from "@/lib/constants"
import { Analytics } from "@/lib/analytics"

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
        el.style.transform = "scale(1) translateY(0)"
      })
    } else {
      el.style.opacity = "0"
      el.style.transform = "scale(0.8) translateY(20px)"
      setTimeout(() => { if (el) el.style.display = "none" }, 250)
    }
  }, [isOpen])

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <div
        ref={popupRef}
        className="absolute bottom-[72px] right-0 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden mb-2"
        style={{ display: "none", opacity: 0, transform: "scale(0.8) translateY(20px)", transition: "opacity 250ms ease, transform 250ms ease" }}
      >
        <div className="bg-[#075E54] p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">AA</div>
            <div>
              <p className="font-semibold">Andre Almeida</p>
              <p className="text-xs text-white/80">{t("status")}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-[#ECE5DD]">
          <div className="bg-white rounded-lg p-3 shadow-sm max-w-[85%]">
            <p className="text-sm text-gray-800">{t("greeting")}</p>
          </div>
        </div>
        <div className="p-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => Analytics.whatsappClick("popup_button")}
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-lg font-semibold transition-colors"
          ><MessageCircle className="w-5 h-5" />{t("startChat")}</a>
        </div>
      </div>

      <button
        onClick={() => {
          if (!isOpen) Analytics.whatsappClick("floating_button")
          setIsOpen(!isOpen)
        }}
        className="relative w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        {isOpen ? <X className="w-6 h-6 relative z-10" /> : <MessageCircle className="w-6 h-6 relative z-10" />}
      </button>
    </div>
  )
}

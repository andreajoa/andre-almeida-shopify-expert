"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { SITE_CONFIG } from "@/lib/constants"

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations("whatsapp")
  const message = encodeURIComponent(t("defaultMessage"))
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${message}`

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-[72px] right-0 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden mb-2"
          >
            <div className="bg-[#075E54] p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                  AA
                </div>
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
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-lg font-semibold transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                {t("startChat")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 flex items-center justify-center hover:shadow-xl transition-shadow"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

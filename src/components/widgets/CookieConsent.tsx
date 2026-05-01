"use client"

import { useState, useEffect, useRef } from "react"
import { Cookie } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"

export function CookieConsent() {
  const [show, setShow] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const t = useTranslations("cookies")

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent")
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (show) {
      el.style.display = "block"
      requestAnimationFrame(() => {
        el.style.opacity = "1"
        el.style.transform = "translateY(0)"
      })
    } else {
      el.style.opacity = "0"
      el.style.transform = "translateY(100%)"
      setTimeout(() => { if (el) el.style.display = "none" }, 300)
    }
  }, [show])

  const accept = () => {
    localStorage.setItem("cookie_consent", "all")
    setShow(false)
  }

  const reject = () => {
    localStorage.setItem("cookie_consent", "essential")
    setShow(false)
  }

  return (
    <div
      ref={ref}
      className="fixed bottom-0 left-0 right-0 z-[9997] p-4 md:p-6"
      style={{ display: "none", opacity: 0, transform: "translateY(100%)", transition: "opacity 300ms ease, transform 300ms ease" }}
    >
      <div className="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <Cookie className="w-8 h-8 text-indigo-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-white font-medium mb-1">🍪 {t("title")}</p>
            <p className="text-slate-400 text-sm">
              {t("description")}{" "}
              <Link href="/cookie-policy" className="text-indigo-400 hover:underline" aria-label="Read our cookie policy">
                {t("learnMore")} - Cookie Policy
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button onClick={reject} className="flex-1 md:flex-none px-5 py-2.5 rounded-lg text-sm font-medium text-slate-300 border border-white/10 hover:bg-white/5 transition-colors">
              {t("reject")}
            </button>
            <button onClick={accept} className="flex-1 md:flex-none px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-colors">
              {t("accept")}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

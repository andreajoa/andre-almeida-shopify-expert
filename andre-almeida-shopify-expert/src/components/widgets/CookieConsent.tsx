"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"

export function CookieConsent() {
  const [show, setShow] = useState(false)
  const t = useTranslations("cookie")
  const locale = useLocale()

  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) {
      setTimeout(() => setShow(true), 2000)
    }
  }, [])

  const accept = () => { localStorage.setItem("cookie_consent","all"); setShow(false) }
  const reject = () => { localStorage.setItem("cookie_consent","essential"); setShow(false) }

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{y:100,opacity:0}} animate={{y:0,opacity:1}} exit={{y:100,opacity:0}}
          className="fixed bottom-0 left-0 right-0 z-[9997] p-4 md:p-6">
          <div className="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-1">
                <p className="text-white font-medium mb-1">🍪 {t("title")}</p>
                <p className="text-slate-400 text-sm">{t("description")} <a href={`/${locale}/cookie-policy`} className="text-indigo-400 hover:underline">{t("learn")}</a></p>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button onClick={reject} className="flex-1 md:flex-none px-5 py-2.5 rounded-lg text-sm font-medium text-slate-300 border border-white/10 hover:bg-white/5 transition-colors cursor-pointer">{t("reject")}</button>
                <button onClick={accept} className="flex-1 md:flex-none px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-colors cursor-pointer">{t("accept")}</button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

"use client"
import { Heart, ArrowUp } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"

export function Footer() {
  const t = useTranslations("footer")
  const locale = useLocale()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-slate-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <a href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">AA</div>
              <div><span className="text-white font-bold">Andre Almeida</span><span className="block text-[10px] text-slate-500 -mt-1 tracking-wider uppercase">Shopify Expert</span></div>
            </a>
            <p className="text-slate-500 text-sm leading-relaxed">{t("description")}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{t("services")}</h4>
            <ul className="space-y-2">
              {["Shopify Development","Headless Hydrogen","Store Migration","Facebook & TikTok Ads","Email Marketing","Landing Pages"].map(s => (
                <li key={s}><a href={`/${locale}/services`} className="text-slate-500 hover:text-indigo-400 text-sm transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{t("company")}</h4>
            <ul className="space-y-2">
              {[{l:"Portfolio",h:"/portfolio"},{l:"About",h:"/about"},{l:"Blog",h:"/blog"},{l:"Contact",h:"/contact"}].map(i => (
                <li key={i.h}><a href={`/${locale}${i.h}`} className="text-slate-500 hover:text-indigo-400 text-sm transition-colors">{i.l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{t("legal")}</h4>
            <ul className="space-y-2">
              {[{l:t("privacy"),h:"/privacy-policy"},{l:t("terms"),h:"/terms-of-service"},{l:t("cookies"),h:"/cookie-policy"}].map(i => (
                <li key={i.h}><a href={`/${locale}${i.h}`} className="text-slate-500 hover:text-indigo-400 text-sm transition-colors">{i.l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">© {year} Andre Almeida. {t("rights")}</p>
          <div className="flex items-center gap-2 text-slate-600 text-sm">{t("madeWith")} <Heart className="w-4 h-4 text-red-500 fill-red-500" /> São Paulo, Brazil</div>
          <button onClick={() => window.scrollTo({top:0,behavior:"smooth"})} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"><ArrowUp className="w-5 h-5" /></button>
        </div>
      </div>
    </footer>
  )
}

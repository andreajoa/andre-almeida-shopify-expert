"use client"
import { motion } from "framer-motion"
import { ArrowRight, MessageCircle } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { Button } from "@/components/ui/Button"
import { SITE_CONFIG } from "@/lib/constants"

export function HeroSection() {
  const t = useTranslations()
  const locale = useLocale()
  const whatsMsg = encodeURIComponent(t("whatsapp.msg"))

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/50 to-slate-900">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse [animation-delay:2s]" />
          <div className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] bg-emerald-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse [animation-delay:4s]" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-24">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
          <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"/><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"/></span>
          <span className="text-sm text-slate-300">{t("hero.badge")}</span>
        </motion.div>

        <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.2}}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
          <span className="block">{t("hero.h1")}</span>
          <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">{t("hero.h2")}</span>
          <span className="block bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">{t("hero.h3")}</span>
        </motion.h1>

        <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.4}}
          className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">{t("hero.sub")}</motion.p>

        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.6}}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={`/${locale}/contact`}><Button variant="primary" size="lg">{t("hero.cta1")} <ArrowRight className="w-5 h-5" /></Button></a>
          <a href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsMsg}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg"><MessageCircle className="w-5 h-5" /> {t("hero.cta2")}</Button>
          </a>
        </motion.div>

        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:1}}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[{v:"6+",k:"years"},{v:"100+",k:"stores"},{v:"15+",k:"countries"},{v:"⭐",k:"certified"}].map((s,i) => (
            <motion.div key={i} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:1.2+i*0.1}} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">{s.v}</div>
              <div className="text-sm text-slate-500">{t(`stats.${s.k}`)}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2}} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{y:[0,8,0]}} transition={{duration:2,repeat:Infinity,ease:"easeInOut"}} className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

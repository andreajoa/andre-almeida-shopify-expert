"use client"

import { ArrowRight, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/Button"
import { SITE_CONFIG } from "@/lib/constants"
import { Analytics } from "@/lib/analytics"

export function HeroSection() {
  const t = useTranslations()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950/50 to-slate-900">
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-24">

        <div className="hero-item inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8" style={{ animationDelay: "0.1s" }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-sm text-slate-300">{t("hero.badge")}</span>
        </div>

        <h1 className="hero-item text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6" style={{ animationDelay: "0.2s" }}>
          <span className="block">{t("hero.headline1")}</span>
          <span className="block mt-2">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              {t("hero.headline2")}
            </span>
          </span>
          <span className="block bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
            {t("hero.headline3")}
          </span>
        </h1>

        <p className="hero-item text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed" style={{ animationDelay: "0.4s" }}>
          {t("hero.subheadline")}
        </p>

        <div className="hero-item flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: "0.6s" }}>
          <Link href="/contact" onClick={() => Analytics.ctaClick("hero_primary_cta")}>
            <Button variant="primary" size="lg">
              {t("hero.cta.primary")}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer" onClick={() => Analytics.whatsappClick("hero_section")}>
            <Button variant="outline" size="lg">
              <MessageCircle className="w-5 h-5" />
              {t("hero.cta.secondary")}
            </Button>
          </a>
        </div>

        <div className="hero-item mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto" style={{ animationDelay: "1s" }}>
          {[
            { value: "6+", label: t("stats.years") },
            { value: "100+", label: t("stats.stores") },
            { value: "15+", label: t("stats.countries") },
            { value: "⭐", label: t("stats.certified") },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-item absolute bottom-8 left-1/2 -translate-x-1/2" style={{ animationDelay: "2s" }}>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2 animate-[scrollBounce_2s_ease-in-out_infinite]">
          <div className="w-1 h-3 bg-white/40 rounded-full" />
        </div>
      </div>

      <style jsx>{`
        .hero-item {
          opacity: 0;
          transform: translateY(24px);
          animation: heroFadeUp 0.8s ease-out forwards;
        }
        @keyframes heroFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>
    </section>
  )
}

"use client"
import { ShoppingBag, TrendingUp, Palette, ArrowRight } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { Card } from "@/components/ui/Card"
import { AnimatedSection } from "@/components/shared/AnimatedSection"

const cardsData = [
  { 
    key: "dev", 
    Icon: ShoppingBag, 
    color: "text-indigo-400", 
    bg: "bg-indigo-500/10 border-indigo-500/20",
    features: {
      en: ["Custom Store Setup", "Headless Hydrogen", "Theme Customization", "App Development"],
      "pt-BR": ["Loja Customizada", "Headless Hydrogen", "Personalização de Tema", "Apps Customizados"],
      es: ["Tienda Personalizada", "Headless Hydrogen", "Personalización de Tema", "Apps Personalizadas"],
    }
  },
  { 
    key: "growth", 
    Icon: TrendingUp, 
    color: "text-emerald-400", 
    bg: "bg-emerald-500/10 border-emerald-500/20",
    features: {
      en: ["Facebook & TikTok Ads", "Conversion Optimization", "Email Automation", "Funnel Strategy"],
      "pt-BR": ["Facebook & TikTok Ads", "Otimização de Conversão", "Automação de Email", "Estratégia de Funil"],
      es: ["Facebook & TikTok Ads", "Optimización de Conversión", "Automatización de Email", "Estrategia de Funnel"],
    }
  },
  { 
    key: "design", 
    Icon: Palette, 
    color: "text-purple-400", 
    bg: "bg-purple-500/10 border-purple-500/20",
    features: {
      en: ["Landing Pages", "UX/UI Redesign", "Brand Identity", "Ad Creatives"],
      "pt-BR": ["Landing Pages", "Redesign UX/UI", "Identidade de Marca", "Criativos para Ads"],
      es: ["Landing Pages", "Rediseño UX/UI", "Identidad de Marca", "Creativos para Ads"],
    }
  },
]

export function ServicesOverview() {
  const t = useTranslations("services")
  const locale = useLocale() as "en" | "pt-BR" | "es"

  return (
    <section className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{t("title")}</h2>
          <p className="text-lg text-slate-400">{t("subtitle")}</p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {cardsData.map(({ key, Icon, color, bg, features }, i) => (
            <AnimatedSection key={key} delay={i * 0.15}>
              <Card variant="gradient" className="h-full group">
                <div className={`w-14 h-14 rounded-xl ${bg} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 ${color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t(`${key}.t`)}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">{t(`${key}.d`)}</p>
                <ul className="space-y-2">
                  {(features[locale] || features.en).map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-300">
                      <span className="text-emerald-400">✓</span>{f}
                    </li>
                  ))}
                </ul>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5} className="text-center mt-12">
          <a href={`/${locale}/services`} className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors group">
            {t("viewAll")} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}

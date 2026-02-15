"use client"
import { useTranslations, useLocale } from "next-intl"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { allServices } from "@/data/services"
import { PRICES, formatPrice, getCurrencyForLocale } from "@/lib/constants"

export default function ServicesPage() {
  const t = useTranslations("services")
  const locale = useLocale() as "en" | "pt-BR" | "es"
  const currency = getCurrencyForLocale(locale)

  const categories = [
    { id: "shopify", label: locale === "pt-BR" ? "💎 Core Shopify" : "💎 Core Shopify" },
    { id: "growth", label: locale === "pt-BR" ? "📈 Growth & Marketing" : "📈 Growth & Marketing" },
    { id: "design", label: locale === "pt-BR" ? "🎨 Design & Criativo" : "🎨 Design & Creative" },
    { id: "automation", label: locale === "pt-BR" ? "🤖 Automação & IA" : "🤖 Automation & AI" },
    { id: "digital", label: locale === "pt-BR" ? "📱 Digital & Infoprodutos" : "📱 Digital & Infoproducts" },
  ]

  return (
    <div className="pt-24">
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <Badge variant="indigo" className="mb-4">
              {locale === "pt-BR" ? "20+ Serviços Profissionais" : "20+ Professional Services"}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{t("title")}</h1>
            <p className="text-lg text-slate-400">{t("subtitle")}</p>
          </AnimatedSection>

          {categories.map(cat => {
            const services = allServices.filter(s => s.cat === cat.id)
            if (services.length === 0) return null
            return (
              <div key={cat.id} className="mb-20">
                <AnimatedSection>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{cat.label}</h2>
                  <div className="w-20 h-1 bg-indigo-500 rounded-full mb-12" />
                </AnimatedSection>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.map((svc, i) => {
                    const localized = svc[locale] || svc.en
                    const price = PRICES[svc.priceKey]?.[currency]
                    const isFixed = price && price.min === price.max
                    return (
                      <AnimatedSection key={svc.id} delay={i * 0.1}>
                        <Card variant="gradient" className="h-full flex flex-col">
                          <div className="text-3xl mb-4">{svc.icon}</div>
                          <h3 className="text-lg font-bold text-white mb-2">{localized.t}</h3>
                          <p className="text-slate-400 text-sm mb-4 leading-relaxed">{localized.d}</p>
                          <ul className="space-y-1.5 mb-6 flex-1">
                            {localized.features.slice(0,5).map((f: string, j: number) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-slate-300"><span className="text-emerald-400 mt-0.5">✓</span>{f}</li>
                            ))}
                          </ul>
                          <div className="pt-4 border-t border-white/5">
                            {price && (
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-slate-500">
                                  {isFixed ? (locale === "pt-BR" ? "Investimento" : "Investment") : t("from")}
                                </span>
                                <span className="text-lg font-bold text-white">
                                  {isFixed ? formatPrice(price.min, currency) : formatPrice(price.min, currency)}
                                </span>
                              </div>
                            )}
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-sm text-slate-500">{t("timeline")}</span>
                              <span className="text-sm text-slate-300">{svc.timeline}</span>
                            </div>
                            <a href={`/${locale}/contact`}><Button variant="primary" size="sm" className="w-full">{localized.cta}</Button></a>
                          </div>
                        </Card>
                      </AnimatedSection>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

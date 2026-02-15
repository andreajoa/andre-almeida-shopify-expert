"use client"

import { ShoppingBag, TrendingUp, Palette, ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { Card } from "@/components/ui/Card"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"

const serviceIcons = [ShoppingBag, TrendingUp, Palette]
const serviceKeys = ["development", "growth", "design"] as const
const serviceColors = ["indigo", "emerald", "purple"] as const

export function ServicesOverview() {
  const t = useTranslations()

  return (
    <section className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <SectionHeader
            title={t("servicesSection.title")}
            subtitle={t("servicesSection.subtitle")}
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {serviceKeys.map((key, i) => {
            const Icon = serviceIcons[i]
            const color = serviceColors[i]

            return (
              <AnimatedSection key={key} delay={i * 0.15}>
                <Card variant="gradient" className="h-full group">
                  <div
                    className={`w-14 h-14 rounded-xl bg-${color}-500/10 border border-${color}-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-7 h-7 text-${color}-400`} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {t(`serviceCards.${key}.title`)}
                  </h3>

                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {t(`serviceCards.${key}.description`)}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {(t.raw(`serviceCards.${key}.features`) as string[]).map(
                      (feature: string, j: number) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-slate-300">
                          <div className={`w-1.5 h-1.5 rounded-full bg-${color}-400`} />
                          {feature}
                        </li>
                      )
                    )}
                  </ul>
                </Card>
              </AnimatedSection>
            )
          })}
        </div>

        <AnimatedSection delay={0.5} className="text-center mt-12">
          <Link href="/services">
            <span className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors group">
              {t("servicesSection.viewAll")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}

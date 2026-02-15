"use client"

import { useTranslations } from "next-intl"
import { ShoppingBag, Zap, ArrowRightLeft, Code, Gauge, Search, Megaphone, TrendingUp, Mail, Layout, Paintbrush, Sparkles, Workflow, Brain } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { services } from "@/data/services"
import { useCurrency } from "@/hooks/useCurrency"
import Link from "next/link"

const iconMap: Record<string, any> = {
  ShoppingBag, Zap, ArrowRightLeft, Code, Gauge, Search,
  Megaphone, TrendingUp, Mail, Layout, Paintbrush, Sparkles,
  Workflow, Brain,
}

const categoryColors: Record<string, string> = {
  shopify: "indigo",
  growth: "emerald",
  design: "purple",
  automation: "orange",
  specialized: "rose",
}

export default function ServicesPage() {
  const t = useTranslations()
  const { format } = useCurrency()

  const categories = [
    { id: "shopify", title: "Core Shopify Services", emoji: "💎" },
    { id: "growth", title: "Growth & Marketing", emoji: "📈" },
    { id: "design", title: "Design & Creative", emoji: "🎨" },
    { id: "automation", title: "Advanced & Automation", emoji: "🤖" },
  ]

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <AnimatedSection>
            <Badge variant="indigo" className="mb-4">20+ Professional Services</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("servicesSection.title")}
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              {t("servicesSection.subtitle")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services by Category */}
      {categories.map((category) => {
        const categoryServices = services.filter((s) => s.category === category.id)
        const color = categoryColors[category.id]

        return (
          <section key={category.id} className="py-16 md:py-24" id={category.id}>
            <div className="max-w-7xl mx-auto px-6">
              <AnimatedSection>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {category.emoji} {category.title}
                </h2>
                <div className={`w-20 h-1 bg-${color}-500 rounded-full mb-12`} />
              </AnimatedSection>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryServices.map((service, i) => {
                  const Icon = iconMap[service.icon] || ShoppingBag
                  return (
                    <AnimatedSection key={service.id} delay={i * 0.1}>
                      <Card variant="gradient" className="h-full flex flex-col">
                        <div className={`w-12 h-12 rounded-xl bg-${color}-500/10 border border-${color}-500/20 flex items-center justify-center mb-4`}>
                          <Icon className={`w-6 h-6 text-${color}-400`} />
                        </div>

                        <h3 className="text-lg font-bold text-white mb-2">
                          {service.titleKey}
                        </h3>

                        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                          {service.descriptionKey}
                        </p>

                        <ul className="space-y-1.5 mb-6 flex-1">
                          {service.features.slice(0, 5).map((feature, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                              <span className="text-emerald-400 mt-0.5">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <div className="pt-4 border-t border-white/5">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-slate-500">From</span>
                            <span className="text-lg font-bold text-white">
                              {format(service.priceRange.min)}
                              {service.priceRange.period && (
                                <span className="text-sm text-slate-500">{service.priceRange.period}</span>
                              )}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-slate-500">Timeline</span>
                            <span className="text-sm text-slate-300">{service.timeline}</span>
                          </div>
                          <Link href="/contact">
                            <Button variant="primary" size="sm" className="w-full">
                              {service.ctaKey}
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    </AnimatedSection>
                  )
                })}
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}

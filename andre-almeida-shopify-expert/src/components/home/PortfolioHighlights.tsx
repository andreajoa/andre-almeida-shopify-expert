"use client"
import { ArrowRight } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { projects } from "@/data/portfolio"

export function PortfolioHighlights() {
  const t = useTranslations("portfolio")
  const locale = useLocale()
  const featured = projects.slice(0, 6)

  return (
    <section className="py-24 md:py-32 relative bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{t("title")}</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">{t("subtitle")}</p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((p, i) => (
            <AnimatedSection key={p.id} delay={i * 0.1}>
              <Card variant="gradient" className="group overflow-hidden">
                <div className="relative h-48 rounded-xl mb-6 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                </div>
                <Badge variant="indigo" className="mb-3">{p.nicheKey}</Badge>
                <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{p.challenge}</p>
                <div className="flex flex-wrap gap-2">
                  {p.technologies.slice(0,3).map(tech => <Badge key={tech}>{tech}</Badge>)}
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5} className="text-center mt-12">
          <a href={`/${locale}/portfolio`} className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors group">
            {t("viewAll")} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}

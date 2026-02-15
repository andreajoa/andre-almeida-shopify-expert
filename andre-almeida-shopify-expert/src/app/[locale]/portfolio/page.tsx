"use client"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { projects } from "@/data/portfolio"

export default function PortfolioPage() {
  const t = useTranslations("portfolio")
  const [filter, setFilter] = useState("all")
  const filters = ["all","fashion","beauty","electronics","supplements","luxury","petshop","jewelry","homeDecor"]
  const filtered = filter === "all" ? projects : projects.filter(p => p.niche === filter)

  return (
    <div className="pt-24">
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{t("title")}</h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">{t("subtitle")}</p>
          </AnimatedSection>
          <AnimatedSection className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${filter === f ? "bg-indigo-600 text-white" : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"}`}>
                {t(f)}
              </button>
            ))}
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p, i) => (
              <AnimatedSection key={p.id} delay={i * 0.1}>
                <Card variant="gradient" className="group overflow-hidden">
                  <div className="relative h-48 rounded-xl mb-6 overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  </div>
                  <Badge variant="indigo" className="mb-3">{p.nicheKey}</Badge>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{p.challenge}</p>
                  {p.results.slice(0,2).map((r,j) => <p key={j} className="text-sm text-emerald-400">✓ {r}</p>)}
                  <div className="flex flex-wrap gap-2 mt-4">{p.technologies.slice(0,3).map(tech => <Badge key={tech}>{tech}</Badge>)}</div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

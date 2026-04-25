"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { projects } from "@/data/portfolio"

export default function PortfolioPage() {
  const t = useTranslations()
  const [activeFilter, setActiveFilter] = useState("all")

  const filters = ["all", "fashion", "beauty", "electronics", "supplements", "luxury", "petshop", "jewelry", "homeDecor"]
  const filtered = activeFilter === "all" ? projects : projects.filter((p) => p.niche === activeFilter)

  return (
    <div className="pt-24">
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("portfolio.title")}
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              {t("portfolio.subtitle")}
            </p>
          </AnimatedSection>

          {/* Filters */}
          <AnimatedSection className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? "bg-indigo-600 text-white"
                    : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {t(`portfolio.filters.${filter}`)}
              </button>
            ))}
          </AnimatedSection>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 0.1}>
                <Card variant="gradient" className="group overflow-hidden">
                  <div className="relative h-48 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-xl mb-6 overflow-hidden flex items-center justify-center">
                    <span className="text-4xl opacity-30">🛍️</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                      <span className="text-white text-sm font-medium flex items-center gap-1">
                        {t("portfolio.viewDetails")} <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  <Badge variant="indigo" className="mb-3">{project.nicheKey}</Badge>
                  <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{project.challenge}</p>

                  {project.results.length > 0 && (
                    <div className="space-y-1 mb-4">
                      {project.results.slice(0, 2).map((result, j) => (
                        <p key={j} className="text-sm text-emerald-400">✓ {result}</p>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

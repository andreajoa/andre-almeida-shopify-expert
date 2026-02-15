"use client"

import { ArrowRight, ExternalLink } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { projects } from "@/data/portfolio"

export function PortfolioHighlights() {
  const t = useTranslations()
  const featured = projects.filter((p) => p.featured).slice(0, 6)

  return (
    <section className="py-24 md:py-32 relative bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <SectionHeader
            title={t("portfolio.title")}
            subtitle={t("portfolio.subtitle")}
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 0.1}>
              <Card variant="gradient" className="group overflow-hidden">
                {/* Image placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-xl mb-6 overflow-hidden flex items-center justify-center">
                  <span className="text-4xl opacity-30">🛍️</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <span className="text-white text-sm font-medium flex items-center gap-1">
                      {t("portfolio.viewDetails")} <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                <Badge variant="indigo" className="mb-3">
                  {project.nicheKey}
                </Badge>

                <h3 className="text-lg font-bold text-white mb-2">
                  {project.title}
                </h3>

                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {project.challenge}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="default">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5} className="text-center mt-12">
          <Link href="/portfolio">
            <span className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors group">
              {t("portfolio.viewAll")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}

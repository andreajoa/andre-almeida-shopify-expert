"use client"

import { useTranslations } from "next-intl"
import { Code, Palette, TrendingUp, Brain, Users, Eye, Target, BookOpen } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { Button } from "@/components/ui/Button"
import Link from "next/link"

export default function AboutPage() {
  const t = useTranslations()

  const timeline = [
    { year: "2019", event: t("about.timeline.2019") },
    { year: "2020", event: t("about.timeline.2020") },
    { year: "2021", event: t("about.timeline.2021") },
    { year: "2022", event: t("about.timeline.2022") },
    { year: "2023", event: t("about.timeline.2023") },
    { year: "2024", event: t("about.timeline.2024") },
    { year: "2025", event: t("about.timeline.2025") },
  ]

  const philosophy = [
    { icon: Eye, ...getPhilosophy(t, "transparency") },
    { icon: Target, ...getPhilosophy(t, "results") },
    { icon: Users, ...getPhilosophy(t, "partnership") },
    { icon: BookOpen, ...getPhilosophy(t, "learning") },
  ]

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
              AA
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("about.headline")}
            </h1>
            <p className="text-xl text-indigo-400">{t("about.role")}</p>
          </AnimatedSection>

          {/* Bio */}
          <AnimatedSection>
            <div className="prose prose-lg prose-invert mx-auto space-y-6">
              <p className="text-slate-300 leading-relaxed">{t("about.bio1")}</p>
              <p className="text-slate-300 leading-relaxed">{t("about.bio2")}</p>
              <p className="text-slate-300 leading-relaxed">{t("about.bio3")}</p>
              <p className="text-slate-300 leading-relaxed">{t("about.bio4")}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 md:py-24 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {t("about.philosophy.title")}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {philosophy.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <Card variant="glass" className="text-center h-full">
                  <div className="w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-indigo-400" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {t("about.timeline.title")}
            </h2>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-indigo-500/20" />
            {timeline.map((item, i) => (
              <AnimatedSection key={item.year} delay={i * 0.1}>
                <div className={`relative flex items-center gap-6 mb-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-indigo-500 -translate-x-1/2 ring-4 ring-slate-950" />
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="text-indigo-400 font-bold text-lg">{item.year}</span>
                    <p className="text-slate-300">{item.event}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-950 to-slate-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t("cta.title")}
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact"><Button variant="primary" size="lg">{t("cta.primary")}</Button></Link>
              <Link href="/portfolio"><Button variant="outline" size="lg">{t("portfolio.viewAll")}</Button></Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

function getPhilosophy(t: any, key: string) {
  return {
    title: t(`about.philosophy.${key}.title`),
    description: t(`about.philosophy.${key}.description`),
  }
}

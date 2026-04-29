"use client"

import { useTranslations } from "next-intl"
import { Users, Eye, Target, BookOpen } from "lucide-react"
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
    <div>
      {/* Hero - Cinematic Full Bleed */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-slate-950">
        {/* Foto de fundo */}
        <div className="absolute inset-0">
          <img
            src="/images/andre.jpg"
            alt="Andre Almeida"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-32 w-full">
          <AnimatedSection className="max-w-2xl">
            <div className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-5 border-l-2 border-indigo-400 pl-3">
              Shopify Expert
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
              {t("about.headline")}
            </h1>
            <p className="text-xl text-indigo-300 mb-6">{t("about.role")}</p>
            <p className="text-slate-300 leading-relaxed max-w-xl mb-10">{t("about.bio1")}</p>
          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection>
            <div className="flex gap-10 border-t border-white/10 pt-8">
              <div>
                <div className="text-3xl font-bold text-indigo-400">100+</div>
                <div className="text-sm text-slate-400 mt-1">Projetos</div>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <div className="text-3xl font-bold text-indigo-400">15+</div>
                <div className="text-sm text-slate-400 mt-1">Países</div>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <div className="text-3xl font-bold text-indigo-400">6+</div>
                <div className="text-sm text-slate-400 mt-1">Anos</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Bio */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <div className="prose prose-lg prose-invert mx-auto space-y-6">
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

"use client"
import { useTranslations, useLocale } from "next-intl"
import { Eye, Target, Users, BookOpen } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { AnimatedSection } from "@/components/shared/AnimatedSection"

export default function AboutPage() {
  const t = useTranslations("about")
  const locale = useLocale()

  const philosophy = [
    { icon: Eye, t: t("transparency"), d: t("transparencyD") },
    { icon: Target, t: t("results"), d: t("resultsD") },
    { icon: Users, t: t("partnership"), d: t("partnershipD") },
    { icon: BookOpen, t: t("learning"), d: t("learningD") },
  ]

  const timeline = ["2019","2020","2021","2022","2023","2024","2025"].map(y => ({
    year: y, event: t(`y${y}`)
  }))

  return (
    <div className="pt-24">
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">AA</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("headline")}</h1>
            <p className="text-xl text-indigo-400">{t("role")}</p>
          </AnimatedSection>
          <AnimatedSection>
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>{t("bio1")}</p><p>{t("bio2")}</p><p>{t("bio3")}</p><p>{t("bio4")}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
      <section className="py-16 md:py-24 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-white">{t("philosophy")}</h2></AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {philosophy.map((p, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <Card variant="glass" className="text-center h-full">
                  <div className="w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                    <p.icon className="w-7 h-7 text-indigo-400" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{p.t}</h3>
                  <p className="text-slate-400 text-sm">{p.d}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-white">{t("journey")}</h2></AnimatedSection>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-indigo-500/20" />
            {timeline.map((item, i) => (
              <AnimatedSection key={item.year} delay={i * 0.1}>
                <div className="relative flex items-center gap-6 mb-8">
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-indigo-500 -translate-x-1/2 ring-4 ring-slate-950" />
                  <div className="ml-12 md:ml-0 md:w-1/2" style={{marginLeft: i%2===0 ? undefined : "50%", paddingLeft: i%2===0 ? undefined : "2rem", textAlign: i%2===0 ? "right" : "left", paddingRight: i%2===0 ? "2rem" : undefined}}>
                    <span className="text-indigo-400 font-bold text-lg">{item.year}</span>
                    <p className="text-slate-300">{item.event}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

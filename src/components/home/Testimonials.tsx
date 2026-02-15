"use client"
import { Star, Quote } from "lucide-react"
import { useTranslations } from "next-intl"
import { Card } from "@/components/ui/Card"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { testimonials } from "@/data/testimonials"

export function Testimonials() {
  const t = useTranslations("testimonials")

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{t("title")}</h2>
          <p className="text-lg text-slate-400">{t("subtitle")}</p>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((test, i) => (
            <AnimatedSection key={test.id} delay={i * 0.1}>
              <Card variant="glass" className="h-full relative">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-indigo-500/20" />
                <div className="flex gap-1 mb-4">{Array.from({length:test.rating}).map((_,j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
                <p className="text-slate-300 leading-relaxed mb-6 italic">&ldquo;{test.content}&rdquo;</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {test.name.split(" ").map(n=>n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{test.name}</p>
                    <p className="text-slate-500 text-xs">{test.role}, {test.company}</p>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

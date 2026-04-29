"use client"

import { ClipboardCheck, Code2, LineChart, MessageCircle } from "lucide-react"
import { useLocale } from "next-intl"
import { AnimatedSection } from "@/components/shared/AnimatedSection"

export function ProcessSection() {
  const locale = useLocale() as "en" | "pt-BR" | "es"
  const isPt = locale === "pt-BR"

  const steps = [
    {
      Icon: MessageCircle,
      title: isPt ? "1. Conversa inicial" : "1. Initial conversation",
      text: isPt ? "Você me explica seu negócio, produto, objetivo e momento atual." : "You explain your business, product, goals and current stage.",
    },
    {
      Icon: ClipboardCheck,
      title: isPt ? "2. Diagnóstico" : "2. Diagnosis",
      text: isPt ? "Eu avalio loja, oferta, tecnologia, tráfego, SEO, UX e oportunidades." : "I review store, offer, tech, traffic, SEO, UX and opportunities.",
    },
    {
      Icon: Code2,
      title: isPt ? "3. Execução" : "3. Execution",
      text: isPt ? "Crio, ajusto ou otimizo sua estrutura para vender com mais confiança." : "I build, adjust or optimize your structure to sell with more confidence.",
    },
    {
      Icon: LineChart,
      title: isPt ? "4. Crescimento" : "4. Growth",
      text: isPt ? "Acompanhamos performance, conversão, automações e próximos passos." : "We track performance, conversion, automations and next steps.",
    },
  ]

  return (
    <section className="bg-slate-950 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
            {isPt ? "Como funciona o trabalho" : "How the work happens"}
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            {isPt
              ? "Nada de solução confusa. Primeiro entendemos o cenário, depois criamos um plano e executamos com foco em vendas."
              : "No confusing process. We understand the scenario, build a plan and execute with sales in mind."}
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map(({ Icon, title, text }, i) => (
            <AnimatedSection key={title} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 border border-emerald-400/20">
                  <Icon className="w-6 h-6 text-emerald-300" />
                </div>
                <h3 className="font-bold text-white mb-3">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

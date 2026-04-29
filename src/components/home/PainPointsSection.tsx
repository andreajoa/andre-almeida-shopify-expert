"use client"

import { AlertTriangle, Clock, MousePointerClick, SearchX } from "lucide-react"
import { useLocale } from "next-intl"
import { AnimatedSection } from "@/components/shared/AnimatedSection"

export function PainPointsSection() {
  const locale = useLocale() as "en" | "pt-BR" | "es"
  const isPt = locale === "pt-BR"

  const pains = [
    {
      Icon: SearchX,
      title: isPt ? "Seu negócio não aparece no Google" : "Your business does not appear on Google",
      text: isPt ? "As pessoas procuram soluções, mas encontram seus concorrentes primeiro." : "People search for solutions but find your competitors first.",
    },
    {
      Icon: MousePointerClick,
      title: isPt ? "A loja recebe visitas, mas não vende" : "The store gets visits but does not sell",
      text: isPt ? "O problema pode estar no layout, oferta, checkout, velocidade ou confiança." : "The issue may be layout, offer, checkout, speed or trust.",
    },
    {
      Icon: Clock,
      title: isPt ? "Você perde tempo fazendo tudo manual" : "You waste time doing everything manually",
      text: isPt ? "Atendimento, pedidos, recuperação de clientes e gestão podem ser automatizados." : "Support, orders, recovery and management can be automated.",
    },
    {
      Icon: AlertTriangle,
      title: isPt ? "Você sabe que precisa vender online, mas não sabe por onde começar" : "You know you need to sell online but do not know where to start",
      text: isPt ? "Eu organizo estratégia, tecnologia, canais e execução em um plano claro." : "I organize strategy, technology, channels and execution into a clear plan.",
    },
  ]

  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="mb-12 max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
            {isPt ? "Antes de investir mais" : "Before investing more"}
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white">
            {isPt ? "Sua loja ou negócio pode estar perdendo vendas todos os dias" : "Your store or business may be losing sales every day"}
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pains.map(({ Icon, title, text }, i) => (
            <AnimatedSection key={title} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <Icon className="w-8 h-8 text-rose-300 mb-5" />
                <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

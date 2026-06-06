"use client"

import { AlertTriangle, Clock, MousePointerClick, SearchX } from "lucide-react"
import { useLocale } from "next-intl"
import { AnimatedSection } from "@/components/shared/AnimatedSection"

type Locale = "en" | "pt-BR" | "es"
function t(locale: Locale, pt: string, es: string, en: string) {
  if (locale === "pt-BR") return pt
  if (locale === "es") return es
  return en
}

export function PainPointsSection() {
  const locale = useLocale() as Locale

  const pains = [
    {
      Icon: SearchX,
      title: t(locale, "Seu negócio não aparece no Google", "Tu negocio no aparece en Google", "Your business does not appear on Google"),
      text: t(locale, "As pessoas procuram soluções, mas encontram seus concorrentes primeiro.", "Las personas buscan soluciones pero encuentran a tus competidores primero.", "People search for solutions but find your competitors first."),
    },
    {
      Icon: MousePointerClick,
      title: t(locale, "A loja recebe visitas, mas não vende", "La tienda recibe visitas pero no vende", "The store gets visits but does not sell"),
      text: t(locale, "O problema pode estar no layout, oferta, checkout, velocidade ou confiança.", "El problema puede estar en el diseño, oferta, checkout, velocidad o confianza.", "The issue may be layout, offer, checkout, speed or trust."),
    },
    {
      Icon: Clock,
      title: t(locale, "Você perde tempo fazendo tudo manual", "Pierdes tiempo haciendo todo manual", "You waste time doing everything manually"),
      text: t(locale, "Atendimento, pedidos, recuperação de clientes e gestão podem ser automatizados.", "Atención, pedidos, recuperación de clientes y gestión pueden automatizarse.", "Support, orders, recovery and management can be automated."),
    },
    {
      Icon: AlertTriangle,
      title: t(locale, "Você sabe que precisa vender online, mas não sabe por onde começar", "Sabes que necesitas vender online pero no sabes por dónde empezar", "You know you need to sell online but do not know where to start"),
      text: t(locale, "Eu organizo estratégia, tecnologia, canais e execução em um plano claro.", "Organizo estrategia, tecnología, canales y ejecución en un plan claro.", "I organize strategy, technology, channels and execution into a clear plan."),
    },
  ]

  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="mb-12 max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.24em] text-insta-accent">
            {t(locale, "Antes de investir mais", "Antes de invertir más", "Before investing more")}
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white">
            {t(locale, "Sua loja ou negócio pode estar perdendo vendas todos os dias", "Tu tienda o negocio puede estar perdiendo ventas todos los días", "Your store or business may be losing sales every day")}
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

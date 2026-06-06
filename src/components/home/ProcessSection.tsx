"use client"

import { ClipboardCheck, Code2, LineChart, MessageCircle } from "lucide-react"
import { useLocale } from "next-intl"
import { AnimatedSection } from "@/components/shared/AnimatedSection"

type Locale = "en" | "pt-BR" | "es"
function t(locale: Locale, pt: string, es: string, en: string) {
  if (locale === "pt-BR") return pt
  if (locale === "es") return es
  return en
}

export function ProcessSection() {
  const locale = useLocale() as Locale

  const steps = [
    {
      Icon: MessageCircle,
      title: t(locale, "1. Conversa inicial", "1. Conversación inicial", "1. Initial conversation"),
      text: t(locale, "Você me explica seu negócio, produto, objetivo e momento atual.", "Me explicas tu negocio, producto, objetivo y situación actual.", "You explain your business, product, goals and current stage."),
    },
    {
      Icon: ClipboardCheck,
      title: t(locale, "2. Diagnóstico", "2. Diagnóstico", "2. Diagnosis"),
      text: t(locale, "Eu avalio loja, oferta, tecnologia, tráfego, SEO, UX e oportunidades.", "Evalúo tienda, oferta, tecnología, tráfico, SEO, UX y oportunidades.", "I review store, offer, tech, traffic, SEO, UX and opportunities."),
    },
    {
      Icon: Code2,
      title: t(locale, "3. Execução", "3. Ejecución", "3. Execution"),
      text: t(locale, "Crio, ajusto ou otimizo sua estrutura para vender com mais confiança.", "Creo, ajusto u optimizo tu estructura para vender con más confianza.", "I build, adjust or optimize your structure to sell with more confidence."),
    },
    {
      Icon: LineChart,
      title: t(locale, "4. Crescimento", "4. Crecimiento", "4. Growth"),
      text: t(locale, "Acompanhamos performance, conversão, automações e próximos passos.", "Seguimos rendimiento, conversión, automatizaciones y próximos pasos.", "We track performance, conversion, automations and next steps."),
    },
  ]

  return (
    <section className="bg-slate-950 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
            {t(locale, "Como funciona o trabalho", "Cómo funciona el proceso", "How the work happens")}
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            {t(locale,
              "Nada de solução confusa. Primeiro entendemos o cenário, depois criamos um plano e executamos com foco em vendas.",
              "Sin procesos confusos. Primero entendemos el escenario, luego creamos un plan y ejecutamos con foco en ventas.",
              "No confusing process. We understand the scenario, build a plan and execute with sales in mind."
            )}
          </p>
        </AnimatedSection>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map(({ Icon, title, text }, i) => (
            <AnimatedSection key={title} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-insta-purple/10 border border-insta-violet/20">
                  <Icon className="w-6 h-6 text-insta-accent" />
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

"use client"

import { HelpCircle } from "lucide-react"
import { useLocale } from "next-intl"
import { AnimatedSection } from "@/components/shared/AnimatedSection"

type Locale = "en" | "pt-BR" | "es"
function t(locale: Locale, pt: string, es: string, en: string) {
  if (locale === "pt-BR") return pt
  if (locale === "es") return es
  return en
}

export function FAQSection() {
  const locale = useLocale() as Locale

  const faqs = [
    {
      q: t(locale, "Você atende quem ainda não tem loja online?", "¿Trabajas con personas que aún no tienen tienda online?", "Do you work with people who do not have an online store yet?"),
      a: t(locale, "Sim. Eu ajudo desde a ideia inicial até a loja publicada, com estrutura para vender e receber pedidos.", "Sí. Ayudo desde la idea inicial hasta la tienda publicada, con estructura para vender y recibir pedidos.", "Yes. I help from the initial idea to the published store."),
    },
    {
      q: t(locale, "Você trabalha apenas com Shopify?", "¿Solo trabajas con Shopify?", "Do you only work with Shopify?"),
      a: t(locale, "Shopify é minha principal especialidade, mas também ajudo com estratégia, tráfego, SEO, automação e estrutura digital.", "Shopify es mi principal especialidad, pero también ayudo con estrategia, tráfico, SEO y automatización.", "Shopify is my main specialty, but I also help with strategy, traffic, SEO and automation."),
    },
    {
      q: t(locale, "Serve para mercado, confeitaria ou loja física?", "¿Funciona para tiendas físicas o delivery?", "Does it work for local stores or delivery?"),
      a: t(locale, "Sim. Posso criar estrutura de pedidos online, catálogo, delivery, WhatsApp e campanhas para negócios locais.", "Sí. Puedo crear estructura de pedidos online, catálogo, delivery, WhatsApp y campañas para negocios locales.", "Yes. I can create online ordering, catalog, delivery, WhatsApp and campaigns for local businesses."),
    },
    {
      q: t(locale, "A conversa inicial tem custo?", "¿La primera conversación tiene costo?", "Is the first conversation paid?"),
      a: t(locale, "Não. A conversa inicial serve para entender seu cenário e indicar o melhor caminho.", "No. La conversación inicial sirve para entender tu situación y sugerir el mejor camino.", "No. The initial conversation is to understand your scenario and suggest the best path."),
    },
  ]

  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection className="text-center mb-12">
          <HelpCircle className="mx-auto mb-5 h-10 w-10 text-indigo-300" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
            {t(locale, "Dúvidas antes de me chamar", "Preguntas antes de contactarme", "Questions before messaging me")}
          </h2>
        </AnimatedSection>
        <div className="space-y-4">
          {faqs.map(({ q, a }, i) => (
            <AnimatedSection key={q} delay={i * 0.06}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-lg font-bold text-white mb-2">{q}</h3>
                <p className="text-slate-400 leading-relaxed">{a}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

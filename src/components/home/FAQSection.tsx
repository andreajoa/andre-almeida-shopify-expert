"use client"

import { HelpCircle } from "lucide-react"
import { useLocale } from "next-intl"
import { AnimatedSection } from "@/components/shared/AnimatedSection"

export function FAQSection() {
  const locale = useLocale() as "en" | "pt-BR" | "es"
  const isPt = locale === "pt-BR"

  const faqs = [
    {
      q: isPt ? "Você atende quem ainda não tem loja online?" : "Do you work with people who do not have an online store yet?",
      a: isPt ? "Sim. Eu ajudo desde a ideia inicial até a loja publicada, com estrutura para vender e receber pedidos." : "Yes. I help from the initial idea to the published store.",
    },
    {
      q: isPt ? "Você trabalha apenas com Shopify?" : "Do you only work with Shopify?",
      a: isPt ? "Shopify é minha principal especialidade, mas também ajudo com estratégia, tráfego, SEO, automação e estrutura digital." : "Shopify is my main specialty, but I also help with strategy, traffic, SEO and automation.",
    },
    {
      q: isPt ? "Serve para mercado, confeitaria ou loja física?" : "Does it work for local stores or delivery?",
      a: isPt ? "Sim. Posso criar estrutura de pedidos online, catálogo, delivery, WhatsApp e campanhas para negócios locais." : "Yes. I can create online ordering, catalog, delivery, WhatsApp and campaigns for local businesses.",
    },
    {
      q: isPt ? "A conversa inicial tem custo?" : "Is the first conversation paid?",
      a: isPt ? "Não. A conversa inicial serve para entender seu cenário e indicar o melhor caminho." : "No. The initial conversation is to understand your scenario and suggest the best path.",
    },
  ]

  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection className="text-center mb-12">
          <HelpCircle className="mx-auto mb-5 h-10 w-10 text-indigo-300" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
            {isPt ? "Dúvidas antes de me chamar" : "Questions before messaging me"}
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

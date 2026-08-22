"use client"

import Image from "next/image"
import Link from "next/link"
import { useLocale } from "next-intl"
import { ArrowUpRight, BarChart3, Bot, Code2, Database, Megaphone, ShoppingBag, Store } from "lucide-react"
import { Analytics } from "@/lib/analytics"
import { SITE_CONFIG } from "@/lib/constants"

const copy = {
  "pt-BR": {
    eyebrow: "SERVIÇOS",
    title: "Tecnologia só faz sentido quando o negócio funciona melhor.",
    lead: "Eu não trato site, tráfego, CRM e automação como serviços isolados. A estrutura é pensada como um sistema: percepção, captação, venda, dados e relacionamento precisam conversar.",
    cta: "Falar comigo",
    featured: "SOLUÇÃO EM DESTAQUE",
    featuredTitle: "Websites e e-commerce com estrutura própria.",
    featuredText: "Para estabelecimentos e operações de venda que querem presença profissional, dados, CRM, e-mail, automações e mais controle sobre a infraestrutura.",
    featuredCta: "Conhecer essa solução",
    servicesEyebrow: "01 / FRENTES DE ATUAÇÃO",
    servicesTitle: "Você pode começar por uma necessidade. A arquitetura continua pensando no todo.",
    services: [
      ["Websites para negócios", "Sites institucionais e comerciais com posicionamento, SEO, WhatsApp, formulários, analytics e estrutura para captar clientes."],
      ["E-commerce próprio", "Lojas desenhadas para catálogo, conversão, CRM, mailing, recuperação e ofertas sem dependência obrigatória de uma plataforma única."],
      ["Shopify & Commerce", "Desenvolvimento, migração, customização, performance, headless e melhoria de operações já construídas em Shopify."],
      ["Growth & Performance", "Aquisição, CRO, mídia, SEO, análise de funil e decisões orientadas por comportamento e receita."],
      ["CRM & E-mail", "Captação, segmentação, campanhas, automações, jornadas e visão organizada de leads e clientes."],
      ["Automação & IA", "Integrações, agentes, fluxos, processos e aplicações de IA para reduzir trabalho manual e ampliar capacidade."],
    ],
    methodEyebrow: "02 / COMO ESCOLHER",
    methodTitle: "Não começa pela ferramenta. Começa pelo gargalo.",
    methodText: "Se você ainda não sabe exatamente qual solução precisa, isso faz parte do diagnóstico. Eu avalio onde o negócio perde percepção, dados, tempo ou venda e desenho a intervenção a partir daí.",
    finalTitle: "Seu projeto não precisa caber em um pacote genérico.",
    finalText: "Explique o cenário atual. Eu te digo onde existe alavancagem real e o que não vale a pena construir agora.",
    finalCta: "Conversar sobre meu cenário",
  },
  en: {
    eyebrow: "SERVICES",
    title: "Technology only matters when the business works better.",
    lead: "I do not treat websites, traffic, CRM and automation as isolated services. The structure works as a system: perception, acquisition, sales, data and relationships should communicate.",
    cta: "Talk to me",
    featured: "FEATURED SOLUTION",
    featuredTitle: "Websites and ecommerce with owned infrastructure.",
    featuredText: "For businesses that want professional presence, data, CRM, email, automation and more control over their infrastructure.",
    featuredCta: "Explore this solution",
    servicesEyebrow: "01 / CAPABILITIES",
    servicesTitle: "You can start with one need. The architecture still considers the whole system.",
    services: [
      ["Business websites", "Institutional and commercial websites with positioning, SEO, WhatsApp, forms, analytics and lead capture."],
      ["Owned ecommerce", "Stores designed for catalog, conversion, CRM, mailing, recovery and offers without mandatory dependence on one platform."],
      ["Shopify & Commerce", "Development, migration, customization, performance, headless and optimization for existing Shopify operations."],
      ["Growth & Performance", "Acquisition, CRO, media, SEO, funnel analysis and decisions driven by behavior and revenue."],
      ["CRM & Email", "Capture, segmentation, campaigns, automations, journeys and an organized view of leads and customers."],
      ["Automation & AI", "Integrations, agents, workflows and AI applications that reduce manual work and increase capacity."],
    ],
    methodEyebrow: "02 / HOW TO CHOOSE",
    methodTitle: "Do not start with the tool. Start with the bottleneck.",
    methodText: "If you do not know exactly what solution you need yet, that is part of the diagnosis. I identify where the business loses perception, data, time or revenue and design the intervention from there.",
    finalTitle: "Your project does not need to fit a generic package.",
    finalText: "Explain the current scenario. I will tell you where real leverage exists and what is not worth building yet.",
    finalCta: "Discuss my scenario",
  },
} as const

const icons = [Store, ShoppingBag, Code2, Megaphone, Database, Bot]

export function PremiumServicesPage() {
  const locale = useLocale() as "pt-BR" | "en"
  const lang = locale === "en" ? "en" : "pt-BR"
  const c = copy[lang]
  const whatsappText = encodeURIComponent(lang === "pt-BR" ? "Olá André, quero entender qual solução faz mais sentido para o meu negócio." : "Hi Andre, I want to understand which solution makes the most sense for my business.")
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappText}`

  return (
    <div className="bg-[#f2efe8] pt-20 text-[#11110f]">
      <section className="border-b border-[#d4cec2] py-20 md:py-28 lg:py-36">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-[#8a7658]">{c.eyebrow}</p>
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.7fr_0.3fr] lg:items-end"><h1 className="max-w-5xl font-editorial text-[clamp(3.6rem,7vw,7.2rem)] leading-[0.88] tracking-[-0.055em]">{c.title}</h1><div><p className="text-base leading-8 text-[#625e56]">{c.lead}</p><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => Analytics.whatsappClick("services_hero")} className="mt-7 inline-flex items-center gap-3 border-b border-[#11110f] pb-2 text-[10px] font-semibold uppercase tracking-[0.14em]">{c.cta}<ArrowUpRight className="h-4 w-4" /></a></div></div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-[1600px] gap-8 px-5 sm:px-8 lg:grid-cols-[0.48fr_0.52fr] lg:px-10 xl:px-14">
          <div className="relative min-h-[480px] overflow-hidden bg-[#11110f] sm:min-h-[620px]"><Image src="/images/premium/commerce-system.webp" alt={c.featuredTitle} fill className="object-cover" sizes="(max-width:1024px) 100vw, 48vw" /><div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" /></div>
          <div className="flex flex-col justify-center bg-[#11110f] p-8 text-white sm:p-12 lg:p-14"><p className="text-[9px] font-semibold tracking-[0.2em] text-[#c7b18d]">{c.featured}</p><h2 className="mt-7 font-editorial text-4xl leading-[0.95] tracking-[-0.04em] sm:text-6xl">{c.featuredTitle}</h2><p className="mt-6 max-w-xl text-sm leading-7 text-white/55">{c.featuredText}</p><Link href={`/${locale}/websites-ecommerce`} className="mt-9 inline-flex w-fit items-center gap-3 border-b border-[#c7b18d] pb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#e6dccb]">{c.featuredCta}<ArrowUpRight className="h-4 w-4" /></Link></div>
        </div>
      </section>

      <section className="border-t border-[#d4cec2] py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14"><div className="grid gap-8 lg:grid-cols-[0.35fr_0.65fr]"><p className="text-[10px] font-semibold tracking-[0.2em] text-[#807a70]">{c.servicesEyebrow}</p><h2 className="max-w-5xl font-editorial text-[clamp(2.8rem,5.8vw,5.8rem)] leading-[0.94] tracking-[-0.045em]">{c.servicesTitle}</h2></div><div className="mt-16 grid border-t border-[#cec7ba] md:grid-cols-2 lg:mt-24 lg:grid-cols-3">{c.services.map(([title,text], index) => { const Icon = icons[index]; return <div key={title} className="border-b border-[#cec7ba] p-7 md:border-r lg:p-9"><Icon className="h-5 w-5 text-[#a88c61]" /><h3 className="mt-8 font-editorial text-3xl tracking-[-0.035em]">{title}</h3><p className="mt-4 text-sm leading-7 text-[#68635b]">{text}</p></div>})}</div></div>
      </section>

      <section className="border-y border-[#d4cec2] bg-[#e7e2d8] py-24 md:py-32"><div className="mx-auto grid max-w-[1600px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.35fr_0.65fr] lg:px-10 xl:px-14"><p className="text-[10px] font-semibold tracking-[0.2em] text-[#807a70]">{c.methodEyebrow}</p><div><h2 className="font-editorial text-[clamp(3rem,5.8vw,6rem)] leading-[0.92] tracking-[-0.05em]">{c.methodTitle}</h2><p className="mt-7 max-w-2xl text-base leading-8 text-[#615d55]">{c.methodText}</p></div></div></section>

      <section className="py-24 md:py-32"><div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-10 px-5 sm:px-8 lg:flex-row lg:items-end lg:px-10 xl:px-14"><div><h2 className="max-w-4xl font-editorial text-[clamp(3rem,5.5vw,5.8rem)] leading-[0.92] tracking-[-0.05em]">{c.finalTitle}</h2><p className="mt-6 max-w-xl text-sm leading-7 text-[#666159]">{c.finalText}</p></div><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => Analytics.whatsappClick("services_final")} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#11110f] px-7 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">{c.finalCta}<ArrowUpRight className="h-4 w-4" /></a></div></section>
    </div>
  )
}

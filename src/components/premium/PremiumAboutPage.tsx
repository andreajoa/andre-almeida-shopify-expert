"use client"

import Image from "next/image"
import Link from "next/link"
import { useLocale } from "next-intl"
import { ArrowUpRight, Check } from "lucide-react"
import { Analytics } from "@/lib/analytics"
import { SITE_CONFIG } from "@/lib/constants"

const copy = {
  "pt-BR": {
    eyebrow: "SOBRE ANDRÉ ALMEIDA",
    titleA: "Eu construo a parte digital do negócio para que ela pareça",
    titleB: "tão séria quanto a ambição por trás dele.",
    intro: "Minha atuação combina desenvolvimento, e-commerce, estratégia, growth, dados, automação e IA. O ponto de encontro de tudo isso é simples: fazer a tecnologia aumentar a capacidade comercial do negócio.",
    cta: "Falar comigo",
    work: "Ver projetos",
    stats: [["6+", "anos de experiência"], ["100+", "projetos digitais"], ["15+", "países atendidos"]],
    storyEyebrow: "01 / TRAJETÓRIA",
    storyTitle: "Não me interessa entregar apenas uma interface bonita.",
    paragraphs: [
      "O trabalho começou muito ligado a Shopify e desenvolvimento de e-commerce. Com o tempo, ficou evidente que uma loja rápida e bonita resolve apenas uma parte do problema.",
      "Conversão depende da oferta. Crescimento depende de aquisição. Retenção depende de relacionamento. Escala depende de processo. E todos esses pontos dependem de dados que realmente ajudem a decidir.",
      "Por isso minha atuação se expandiu para uma visão mais completa: website, e-commerce, CRM, e-mail, analytics, automação, IA e growth como partes de um mesmo sistema comercial.",
    ],
    beliefEyebrow: "02 / PRINCÍPIOS",
    beliefTitle: "Simples por fora. Muito bem resolvido por dentro.",
    beliefs: [
      ["Design é percepção", "Antes de ler uma proposta, o cliente já decidiu se o negócio parece confiável, atual e profissional."],
      ["Dados precisam levar a decisões", "Dashboard bonito não basta. A informação precisa mostrar onde existe perda, intenção e oportunidade."],
      ["Automação deve liberar capacidade", "Automatizar não é acumular fluxos. É remover trabalho repetitivo sem perder qualidade na experiência."],
      ["Tecnologia não pode aprisionar", "A arquitetura precisa respeitar domínio, dados, portabilidade e a liberdade de evoluir a operação."],
    ],
    finalTitle: "O objetivo não é parecer tecnológico. É parecer preparado.",
    finalText: "Se você precisa reorganizar, reposicionar ou reconstruir a presença digital do seu negócio, podemos começar por uma conversa objetiva sobre o cenário atual.",
    finalCta: "Conversar sobre meu negócio",
  },
  en: {
    eyebrow: "ABOUT ANDRE ALMEIDA",
    titleA: "I build the digital side of a business so it feels",
    titleB: "as serious as the ambition behind it.",
    intro: "My work combines development, ecommerce, strategy, growth, data, automation and AI. The common point is simple: technology should increase the business's commercial capacity.",
    cta: "Talk to me",
    work: "View work",
    stats: [["6+", "years of experience"], ["100+", "digital projects"], ["15+", "countries served"]],
    storyEyebrow: "01 / JOURNEY",
    storyTitle: "I am not interested in delivering only a beautiful interface.",
    paragraphs: [
      "My work started very close to Shopify and ecommerce development. Over time, it became clear that a fast, beautiful store solves only one part of the problem.",
      "Conversion depends on the offer. Growth depends on acquisition. Retention depends on relationships. Scale depends on process. And all of it depends on useful data.",
      "That is why my work expanded into a broader system: websites, ecommerce, CRM, email, analytics, automation, AI and growth as parts of one commercial operation.",
    ],
    beliefEyebrow: "02 / PRINCIPLES",
    beliefTitle: "Simple on the outside. Thoroughly resolved underneath.",
    beliefs: [
      ["Design is perception", "Before reading a proposal, customers already decide whether a business feels trustworthy, current and professional."],
      ["Data should lead to decisions", "A beautiful dashboard is not enough. Information should reveal loss, intent and opportunity."],
      ["Automation should create capacity", "Automation is not about accumulating workflows. It should remove repetition without lowering the quality of the experience."],
      ["Technology should not create lock-in", "Architecture should respect domain ownership, data, portability and the freedom to evolve."],
    ],
    finalTitle: "The goal is not to look technological. It is to look prepared.",
    finalText: "If you need to reorganize, reposition or rebuild the digital side of your business, we can start with an objective conversation about the current scenario.",
    finalCta: "Discuss my business",
  },
} as const

export function PremiumAboutPage() {
  const locale = useLocale() as "pt-BR" | "en"
  const lang = locale === "en" ? "en" : "pt-BR"
  const c = copy[lang]
  const whatsappText = encodeURIComponent(lang === "pt-BR" ? "Olá André, li sobre seu trabalho e quero conversar sobre meu negócio." : "Hi Andre, I read about your work and want to discuss my business.")
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappText}`

  return (
    <div className="bg-[#f2efe8] pt-20 text-[#11110f]">
      <section className="border-b border-[#d4cec2]">
        <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-[1600px] gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[0.54fr_0.46fr] lg:items-center lg:px-10 xl:px-14">
          <div className="py-10"><p className="text-[10px] font-semibold tracking-[0.2em] text-[#8a7658]">{c.eyebrow}</p><h1 className="mt-8 max-w-4xl font-editorial text-[clamp(3.4rem,6.7vw,6.8rem)] leading-[0.88] tracking-[-0.055em]">{c.titleA} <span className="italic text-[#5f6559]">{c.titleB}</span></h1><p className="mt-8 max-w-xl text-base leading-8 text-[#615d55]">{c.intro}</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => Analytics.whatsappClick("about_hero")} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#11110f] px-7 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">{c.cta}<ArrowUpRight className="h-4 w-4" /></a><Link href={`/${locale}/portfolio`} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#11110f]/25 px-7 text-[10px] font-semibold uppercase tracking-[0.14em]">{c.work}<ArrowUpRight className="h-4 w-4" /></Link></div><div className="mt-12 grid grid-cols-3 border-y border-[#d4cec2] py-5">{c.stats.map(([value,label], index) => <div key={label} className={`px-3 first:pl-0 ${index > 0 ? "border-l border-[#d4cec2]" : ""}`}><p className="font-editorial text-3xl">{value}</p><p className="mt-2 text-[8px] uppercase tracking-[0.12em] text-[#77736b]">{label}</p></div>)}</div></div>
          <div className="relative min-h-[70svh] overflow-hidden bg-[#11110f] lg:min-h-[calc(100svh-9rem)]"><Image src="/images/premium/andre-portrait.webp" alt="André Almeida" fill priority className="object-cover object-top" sizes="(max-width:1024px) 100vw, 46vw" /><div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" /><div className="absolute bottom-0 left-0 right-0 p-7 text-white"><p className="text-[9px] uppercase tracking-[0.2em] text-[#c7b18d]">ANDRÉ ALMEIDA</p><p className="mt-3 font-editorial text-3xl">Strategy · AI · E-commerce</p></div></div>
        </div>
      </section>

      <section className="py-24 md:py-32 lg:py-40"><div className="mx-auto grid max-w-[1600px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.35fr_0.65fr] lg:px-10 xl:px-14"><p className="text-[10px] font-semibold tracking-[0.2em] text-[#807a70]">{c.storyEyebrow}</p><div><h2 className="max-w-4xl font-editorial text-[clamp(3rem,5.8vw,6rem)] leading-[0.92] tracking-[-0.05em]">{c.storyTitle}</h2><div className="mt-10 max-w-3xl space-y-6 text-base leading-8 text-[#625e56]">{c.paragraphs.map(p => <p key={p}>{p}</p>)}</div></div></div></section>

      <section className="bg-[#11110f] py-24 text-white md:py-32 lg:py-40"><div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14"><div className="grid gap-8 lg:grid-cols-[0.35fr_0.65fr]"><p className="text-[10px] font-semibold tracking-[0.2em] text-[#c7b18d]">{c.beliefEyebrow}</p><h2 className="max-w-5xl font-editorial text-[clamp(3rem,5.8vw,6rem)] leading-[0.92] tracking-[-0.05em]">{c.beliefTitle}</h2></div><div className="mt-16 grid gap-px bg-white/10 md:grid-cols-2 lg:mt-24">{c.beliefs.map(([title,text]) => <div key={title} className="bg-[#11110f] p-7 sm:p-10"><Check className="h-4 w-4 text-[#c7b18d]" /><h3 className="mt-7 font-editorial text-3xl">{title}</h3><p className="mt-4 max-w-xl text-sm leading-7 text-white/50">{text}</p></div>)}</div></div></section>

      <section className="py-24 md:py-32"><div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-10 px-5 sm:px-8 lg:flex-row lg:items-end lg:px-10 xl:px-14"><div><h2 className="max-w-4xl font-editorial text-[clamp(3rem,5.5vw,5.8rem)] leading-[0.92] tracking-[-0.05em]">{c.finalTitle}</h2><p className="mt-6 max-w-xl text-sm leading-7 text-[#666159]">{c.finalText}</p></div><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => Analytics.whatsappClick("about_final")} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#11110f] px-7 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">{c.finalCta}<ArrowUpRight className="h-4 w-4" /></a></div></section>
    </div>
  )
}

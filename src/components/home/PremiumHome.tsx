"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowUpRight, Check } from "lucide-react"
import { useLocale } from "next-intl"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { CommercialInfrastructureSection } from "@/components/home/CommercialInfrastructureSection"
import { Analytics } from "@/lib/analytics"
import { SITE_CONFIG } from "@/lib/constants"

type LocaleKey = "pt-BR" | "en"
type Project = { title: string; category: string; description: string; image: string; href: string; index: string; featured?: boolean }

const projects: Record<LocaleKey, Project[]> = {
  "pt-BR": [
    { title: "NOVA AI Studio", category: "IA · SAAS · PRODUTO", description: "Uma plataforma de criação com IA transformada em produto digital com identidade, clareza e experiência de uso.", image: "/brand/nova-ai.webp", href: "https://www.novvideos.online/", index: "01", featured: true },
    { title: "CAA Neuro", category: "APP · ACESSIBILIDADE · IA", description: "Tecnologia assistiva com comunicação alternativa, voz, tradução e recursos terapêuticos em uma experiência acessível.", image: "/brand/caa-neuro.webp", href: "https://www.caaneuro.online/", index: "02" },
    { title: "AMB Boutique", category: "E-COMMERCE · MODA", description: "E-commerce de moda feminina com direção editorial, experiência internacional, merchandising e jornada de compra pensada para conversão.", image: "/brand/amb-boutique.jpg", href: "https://www.ambboutique.online/", index: "03" },
    { title: "Brinqueteando", category: "E-COMMERCE · EDUCAÇÃO", description: "Loja de brinquedos terapêuticos com jornada digital pensada para confiança, clareza e conversão.", image: "/brand/brinqueteando.webp", href: "https://www.brinqueteando.online/", index: "04" },
  ],
  en: [
    { title: "NOVA AI Studio", category: "AI · SAAS · PRODUCT", description: "An AI creation platform shaped into a digital product with clear identity, positioning and user experience.", image: "/brand/nova-ai.webp", href: "https://www.novvideos.online/", index: "01", featured: true },
    { title: "CAA Neuro", category: "APP · ACCESSIBILITY · AI", description: "Assistive technology combining alternative communication, voice, translation and therapeutic resources.", image: "/brand/caa-neuro.webp", href: "https://www.caaneuro.online/", index: "02" },
    { title: "AMB Boutique", category: "ECOMMERCE · FASHION", description: "A women’s fashion ecommerce experience combining editorial direction, international merchandising and a conversion-focused customer journey.", image: "/brand/amb-boutique.jpg", href: "https://www.ambboutique.online/", index: "03" },
    { title: "Brinqueteando", category: "ECOMMERCE · EDUCATION", description: "A therapeutic toy store with a digital journey built around trust, clarity and conversion.", image: "/brand/brinqueteando.webp", href: "https://www.brinqueteando.online/", index: "04" },
  ],
}

const copy = {
  "pt-BR": {
    eyebrow: "WEBSITES · E-COMMERCE · AUTOMAÇÃO · IA",
    heroA: "Negócios digitais",
    heroB: "feitos para parecer",
    heroItalic: "inevitáveis.",
    lead: "Estratégia, website, e-commerce, automação, aquisição e dados reunidos em uma execução única — para marcas que não querem apenas estar online, mas ocupar uma posição.",
    projectsCta: "Ver projetos selecionados",
    talkCta: "Falar no WhatsApp",
    availability: "Atendimento em todo o Brasil e internacionalmente.",
    heroImageLabel: "ESTRATÉGIA · TECNOLOGIA · EXECUÇÃO",
    heroImageTitle: "Presença digital com peso de marca.",
    heroImageCopy: "Menos ruído. Mais direção, detalhe, controle e percepção de valor.",
    projectsEyebrow: "01 / PROJETOS SELECIONADOS",
    projectsTitle: "Menos portfólio de vitrine. Mais prova de repertório.",
    projectsIntro: "Cada projeto é tratado como sistema: posicionamento, experiência, tecnologia, dados e crescimento precisam contar a mesma história.",
    viewProject: "Ver projeto",
    allProjects: "Explorar todos os projetos",
    expertiseEyebrow: "02 / EXPERTISE",
    expertiseTitle: "Você não precisa de dez fornecedores. Precisa de uma direção coerente.",
    pillars: [
      { number: "01 — BUILD", title: "Websites & Commerce", text: "Sites institucionais, e-commerce próprio, Shopify, headless, landing pages e experiências de compra arquitetadas para conversão." },
      { number: "02 — GROW", title: "Growth & Authority", text: "SEO, GEO, conteúdo, mídia paga, CRO e autoridade online para transformar atenção em demanda e venda." },
      { number: "03 — SYSTEMIZE", title: "Automation & AI", text: "CRM, e-mail marketing, analytics, agentes, integrações e automações que reduzem trabalho manual e aumentam capacidade." },
    ],
    manifestoEyebrow: "04 / O PADRÃO",
    manifestoA: "Um negócio premium não precisa",
    manifestoItalic: "gritar.",
    manifestoB: "Precisa parecer seguro do que entrega.",
    manifestoQuote: "Clareza, repertório e execução. O resto é decoração.",
    manifestoCopy: "A presença digital precisa sustentar a posição que você quer ocupar antes mesmo da primeira conversa. Design, tecnologia, dados e conversão deixam de competir e passam a funcionar como uma única decisão.",
    processEyebrow: "05 / COMO EU TRABALHO",
    processTitle: "Poucas etapas. Decisões muito bem feitas.",
    process: [
      ["01", "Diagnóstico", "Entendo produto, marca, público, operação e onde o negócio perde força."],
      ["02", "Direção", "Defino arquitetura, linguagem visual, tecnologia, dados e prioridade de crescimento."],
      ["03", "Execução", "Construo, integro e lapido até a experiência parecer simples — porque a complexidade foi resolvida."],
      ["04", "Evolução", "Métricas, conversão e automação orientam o próximo ciclo sem reconstruções desnecessárias."],
    ],
    finalEyebrow: "NOVOS PROJETOS",
    finalTitle: "Se a sua marca cresceu, talvez o site precise alcançar o mesmo nível.",
    finalCopy: "Vamos entender o que precisa mudar — e construir uma estrutura que continue sendo sua.",
    finalCta: "Conversar sobre meu projeto",
    stats: [["6+", "anos de experiência"], ["100+", "projetos digitais"], ["15+", "países atendidos"]],
  },
  en: {
    eyebrow: "WEBSITES · ECOMMERCE · AUTOMATION · AI",
    heroA: "Digital businesses",
    heroB: "built to feel",
    heroItalic: "inevitable.",
    lead: "Strategy, websites, ecommerce, automation, acquisition and data brought together in one execution — for brands that want more than an online presence. They want a position.",
    projectsCta: "View selected work",
    talkCta: "Talk on WhatsApp",
    availability: "Working with brands in Brazil and worldwide.",
    heroImageLabel: "STRATEGY · TECHNOLOGY · EXECUTION",
    heroImageTitle: "A digital presence with brand weight.",
    heroImageCopy: "Less noise. More direction, detail, control and perceived value.",
    projectsEyebrow: "01 / SELECTED WORK",
    projectsTitle: "Less portfolio theater. More proof of range.",
    projectsIntro: "Every project is treated as a system: positioning, experience, technology, data and growth should tell the same story.",
    viewProject: "View project",
    allProjects: "Explore all projects",
    expertiseEyebrow: "02 / EXPERTISE",
    expertiseTitle: "You do not need ten vendors. You need one coherent direction.",
    pillars: [
      { number: "01 — BUILD", title: "Websites & Commerce", text: "Business websites, owned ecommerce, Shopify, headless, landing pages and buying experiences architected for conversion." },
      { number: "02 — GROW", title: "Growth & Authority", text: "SEO, GEO, content, paid media, CRO and online authority designed to turn attention into demand and sales." },
      { number: "03 — SYSTEMIZE", title: "Automation & AI", text: "CRM, email marketing, analytics, agents, integrations and automations that reduce manual work and increase capacity." },
    ],
    manifestoEyebrow: "04 / THE STANDARD",
    manifestoA: "A premium business does not need to",
    manifestoItalic: "shout.",
    manifestoB: "It needs to look certain of what it delivers.",
    manifestoQuote: "Clarity, range and execution. Everything else is decoration.",
    manifestoCopy: "Your digital presence should support the position you want to occupy before the first conversation. Design, technology, data and conversion stop competing and become one decision.",
    processEyebrow: "05 / HOW I WORK",
    processTitle: "Fewer steps. Better decisions.",
    process: [
      ["01", "Diagnosis", "I map the product, brand, audience, operation and where the business loses strength."],
      ["02", "Direction", "I define architecture, visual language, technology, data and growth priorities."],
      ["03", "Execution", "I build, integrate and refine until the experience feels simple — because the complexity was resolved."],
      ["04", "Evolution", "Metrics, conversion and automation guide the next cycle without unnecessary rebuilds."],
    ],
    finalEyebrow: "NEW PROJECTS",
    finalTitle: "If your brand has grown, your website may need to catch up.",
    finalCopy: "Let us identify what needs to change — and build infrastructure you continue to control.",
    finalCta: "Talk about my project",
    stats: [["6+", "years of experience"], ["100+", "digital projects"], ["15+", "countries served"]],
  },
} as const

export function PremiumHome() {
  const locale = useLocale() as LocaleKey
  const lang: LocaleKey = locale === "en" ? "en" : "pt-BR"
  const c = copy[lang]
  const selectedProjects = projects[lang]
  const whatsappText = encodeURIComponent(lang === "pt-BR" ? "Olá André, vi seu site e quero conversar sobre um projeto digital." : "Hi Andre, I saw your website and want to talk about a digital project.")
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappText}`

  return (
    <div className="overflow-hidden bg-[#f2efe8] text-[#11110f]">
      <section className="relative min-h-[100svh] pt-24 md:pt-28 lg:pt-32">
        <div className="mx-auto grid min-h-[calc(100svh-6rem)] max-w-[1600px] grid-cols-1 gap-10 px-5 pb-8 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-5 lg:px-10 xl:px-14">
          <div className="flex flex-col justify-center py-8 lg:py-12">
            <p className="mb-8 text-[10px] font-semibold tracking-[0.22em] text-[#5f6559] sm:text-xs">— {c.eyebrow}</p>
            <h1 className="max-w-[780px] font-editorial text-[clamp(3.3rem,8vw,7.7rem)] leading-[0.86] tracking-[-0.05em]">
              <span className="block">{c.heroA}</span><span className="block">{c.heroB}</span><span className="block italic text-[#5f6559]">{c.heroItalic}</span>
            </h1>
            <p className="mt-9 max-w-2xl text-base leading-7 text-[#5c5952] sm:text-lg sm:leading-8 lg:max-w-xl">{c.lead}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#selected-work" onClick={() => Analytics.ctaClick("premium_hero_projects")} className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#11110f] px-7 text-[11px] font-semibold tracking-[0.12em] text-white transition hover:bg-[#2a2925] sm:min-h-14">{c.projectsCta.toUpperCase()}<ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" /></a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => Analytics.whatsappClick("premium_hero_direct")} className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#2b2a27]/30 px-7 text-[11px] font-semibold tracking-[0.12em] transition hover:bg-white/50 sm:min-h-14">{c.talkCta.toUpperCase()}<ArrowUpRight className="h-4 w-4" /></a>
            </div>
            <p className="mt-5 text-[9px] font-medium uppercase tracking-[0.18em] text-[#77736b]">{c.availability}</p>
            <div className="mt-12 grid max-w-2xl grid-cols-3 border-y border-[#d4cec2] py-5 sm:py-6">
              {c.stats.map(([value, label], index) => <div key={label} className={`px-3 first:pl-0 sm:px-6 ${index > 0 ? "border-l border-[#d4cec2]" : ""}`}><p className="font-editorial text-2xl leading-none sm:text-4xl">{value}</p><p className="mt-2 text-[8px] uppercase tracking-[0.12em] text-[#77736b] sm:text-[9px]">{label}</p></div>)}
            </div>
          </div>
          <div className="relative min-h-[68svh] overflow-hidden bg-[#11110f] lg:min-h-[calc(100svh-9rem)]">
            <Image src="/brand/andre-premium.webp" alt="André Almeida, especialista em websites, e-commerce e automação" fill priority className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 56vw" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,15,0.02)_0%,rgba(17,17,15,0.08)_55%,rgba(17,17,15,0.82)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8 lg:p-10"><p className="text-[9px] font-semibold tracking-[0.2em] text-white/55">{c.heroImageLabel}</p><div className="mt-3 border-t border-white/20 pt-5"><h2 className="max-w-lg font-editorial text-3xl leading-none tracking-[-0.03em] sm:text-5xl">{c.heroImageTitle}</h2><p className="mt-3 max-w-md text-sm leading-6 text-white/65">{c.heroImageCopy}</p></div></div>
          </div>
        </div>
      </section>

      <section id="selected-work" className="border-t border-[#d4cec2] py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
          <div className="grid gap-8 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16"><p className="text-[10px] font-semibold tracking-[0.2em] text-[#77736b]">{c.projectsEyebrow}</p><div><h2 className="max-w-5xl font-editorial text-[clamp(2.8rem,6vw,6rem)] leading-[0.94] tracking-[-0.045em]">{c.projectsTitle}</h2><p className="mt-7 max-w-2xl text-base leading-7 text-[#666259] sm:text-lg sm:leading-8">{c.projectsIntro}</p></div></div>
          <div className="mt-16 grid gap-5 lg:mt-24 lg:grid-cols-12">
            {selectedProjects.map((project, index) => <AnimatedSection key={project.title} delay={index * 0.04} className={project.featured ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-6"}><a href={project.href} target="_blank" rel="noopener noreferrer" onClick={() => Analytics.ctaClick(`premium_project_${project.title}`)} className="group block h-full border-t border-[#cfc8bc] pt-4"><div className={`relative overflow-hidden bg-[#dad4c9] ${project.featured ? "aspect-[1.16/1]" : "aspect-[1.1/1]"}`}><Image src={project.image} alt={`Projeto ${project.title}`} fill className="object-cover transition duration-700 ease-out group-hover:scale-[1.025]" sizes={project.featured ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 42vw"}/><div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" /></div><div className="grid grid-cols-[1fr_auto] gap-5 py-5 sm:py-6"><div><p className="text-[9px] font-semibold tracking-[0.16em] text-[#807b71]">{project.category}</p><h3 className="mt-3 font-editorial text-3xl leading-none tracking-[-0.03em] sm:text-4xl">{project.title}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-[#6c675e]">{project.description}</p></div><div className="text-right"><span className="text-[10px] font-semibold tracking-[0.15em] text-[#807b71]">{project.index}</span><span className="mt-8 hidden items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] sm:flex">{c.viewProject}<ArrowUpRight className="h-3.5 w-3.5" /></span></div></div></a></AnimatedSection>)}
          </div>
          <div className="mt-12 flex justify-end"><Link href={`/${lang}/portfolio`} onClick={() => Analytics.ctaClick("premium_all_projects")} className="group inline-flex items-center gap-3 border-b border-[#11110f] pb-2 text-[10px] font-semibold uppercase tracking-[0.14em]">{c.allProjects}<ArrowUpRight className="h-4 w-4" /></Link></div>
        </div>
      </section>

      <section className="border-t border-[#d4cec2] py-24 md:py-32 lg:py-40"><div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14"><div className="grid gap-8 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16"><p className="text-[10px] font-semibold tracking-[0.2em] text-[#77736b]">{c.expertiseEyebrow}</p><h2 className="max-w-5xl font-editorial text-[clamp(2.8rem,5vw,5.6rem)] leading-[0.95] tracking-[-0.045em]">{c.expertiseTitle}</h2></div><div className="mt-16 grid border-y border-[#d4cec2] md:grid-cols-3 lg:mt-24">{c.pillars.map((pillar,index)=><AnimatedSection key={pillar.number} delay={index*.06} className={index>0?"md:border-l md:border-[#d4cec2]":""}><div className={`h-full py-9 md:min-h-[330px] md:px-8 md:py-10 ${index>0?"border-t border-[#d4cec2] md:border-t-0":""}`}><p className="text-[9px] font-semibold tracking-[0.15em] text-[#a08967]">{pillar.number}</p><h3 className="mt-12 font-editorial text-3xl tracking-[-0.03em] sm:text-4xl">{pillar.title}</h3><p className="mt-5 max-w-md text-sm leading-7 text-[#6a665e]">{pillar.text}</p><div className="mt-10 flex gap-2 text-[#5f6559]"><Check className="h-4 w-4"/><span className="text-[9px] font-semibold uppercase tracking-[0.14em]">Strategy to execution</span></div></div></AnimatedSection>)}</div></div></section>

      <CommercialInfrastructureSection />

      <section className="bg-[#11110f] py-24 text-white md:py-32 lg:py-40"><div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14"><p className="text-[10px] font-semibold tracking-[0.2em] text-[#c7b18d]">{c.manifestoEyebrow}</p><div className="mt-10 grid gap-12 lg:grid-cols-[0.7fr_0.3fr] lg:gap-20"><div><h2 className="max-w-5xl font-editorial text-[clamp(3rem,7vw,7rem)] leading-[0.9] tracking-[-0.05em]">{c.manifestoA} <span className="italic text-[#c7b18d]">{c.manifestoItalic}</span> {c.manifestoB}</h2></div><div className="flex flex-col justify-end"><p className="font-editorial text-2xl italic text-white/90">“{c.manifestoQuote}”</p><p className="mt-7 text-sm leading-7 text-white/55">{c.manifestoCopy}</p></div></div></div></section>

      <section className="border-t border-[#d4cec2] py-24 md:py-32 lg:py-40"><div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14"><div className="grid gap-8 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16"><p className="text-[10px] font-semibold tracking-[0.2em] text-[#77736b]">{c.processEyebrow}</p><h2 className="max-w-4xl font-editorial text-[clamp(2.8rem,5vw,5.6rem)] leading-[0.95] tracking-[-0.045em]">{c.processTitle}</h2></div><div className="mt-16 divide-y divide-[#d4cec2] border-y border-[#d4cec2] lg:mt-24">{c.process.map(([number,title,text])=><div key={number} className="grid gap-5 py-8 md:grid-cols-[0.12fr_0.3fr_0.58fr] md:items-start md:py-10"><span className="text-[9px] font-semibold tracking-[0.16em] text-[#a08967]">{number}</span><h3 className="font-editorial text-3xl tracking-[-0.03em]">{title}</h3><p className="max-w-2xl text-sm leading-7 text-[#6a665e]">{text}</p></div>)}</div></div></section>

      <section className="border-t border-[#d4cec2] bg-[#e7e2d8] py-24 md:py-32"><div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14"><p className="text-[10px] font-semibold tracking-[0.2em] text-[#77736b]">{c.finalEyebrow}</p><h2 className="mt-8 max-w-5xl font-editorial text-[clamp(3rem,7vw,7rem)] leading-[0.9] tracking-[-0.05em]">{c.finalTitle}</h2><div className="mt-10 flex flex-col items-start justify-between gap-8 border-t border-[#cfc8bc] pt-8 md:flex-row md:items-center"><p className="max-w-2xl text-base leading-7 text-[#666259]">{c.finalCopy}</p><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={()=>Analytics.whatsappClick("premium_final")} className="inline-flex min-h-14 items-center gap-3 rounded-full bg-[#11110f] px-7 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">{c.finalCta}<ArrowUpRight className="h-4 w-4"/></a></div></div></section>
    </div>
  )
}
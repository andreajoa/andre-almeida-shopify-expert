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

type Project = {
  title: string
  category: string
  description: string
  image: string
  href: string
  index: string
  featured?: boolean
}

const projects: Record<LocaleKey, Project[]> = {
  "pt-BR": [
    { title: "NOVA AI Studio", category: "IA · SAAS · PRODUTO", description: "Uma plataforma criativa de IA apresentada como produto digital de alto valor, com tecnologia e experiência trabalhando juntas.", image: "/images/premium/nova-ai.webp", href: "https://www.novvideos.online/", index: "01", featured: true },
    { title: "CAA Neuro", category: "TECNOLOGIA · ACESSIBILIDADE", description: "Comunicação alternativa e tecnologia assistiva transformadas em uma experiência clara, humana e acessível.", image: "/images/premium/caa-neuro.webp", href: "https://www.adhdautism.online/", index: "02" },
    { title: "Vastara", category: "E-COMMERCE · LUXURY", description: "Uma experiência de compra criada para elevar percepção, desejo e confiança em uma marca premium de relógios.", image: "/images/premium/vastara.webp", href: "https://vastara.online/", index: "03" },
    { title: "Brinqueteando", category: "E-COMMERCE · EDUCAÇÃO", description: "Uma loja digital pensada para transformar descoberta em confiança e confiança em compra.", image: "/images/premium/brinqueteando.webp", href: "https://brinqueteando.online/", index: "04" },
  ],
  en: [
    { title: "NOVA AI Studio", category: "AI · SAAS · PRODUCT", description: "A creative AI platform presented as a high-value digital product, with technology and experience working as one.", image: "/images/premium/nova-ai.webp", href: "https://www.novvideos.online/", index: "01", featured: true },
    { title: "CAA Neuro", category: "TECH · ACCESSIBILITY", description: "Alternative communication and assistive technology shaped into a clear, human and accessible experience.", image: "/images/premium/caa-neuro.webp", href: "https://www.adhdautism.online/", index: "02" },
    { title: "Vastara", category: "E-COMMERCE · LUXURY", description: "A buying experience designed to raise perception, desire and trust for a premium watch brand.", image: "/images/premium/vastara.webp", href: "https://vastara.online/", index: "03" },
    { title: "Brinqueteando", category: "E-COMMERCE · EDUCATION", description: "A digital store built to turn discovery into trust and trust into purchase.", image: "/images/premium/brinqueteando.webp", href: "https://brinqueteando.online/", index: "04" },
  ],
}

const copy = {
  "pt-BR": {
    eyebrow: "ESTRATÉGIA · E-COMMERCE · IA · GROWTH",
    heroA: "Negócios digitais",
    heroB: "feitos para parecer",
    heroItalic: "inevitáveis.",
    lead: "Eu conecto estratégia, design, tecnologia, aquisição e automação para construir presenças digitais que parecem maiores, mais maduras e prontas para crescer.",
    projectsCta: "Ver projetos selecionados",
    talkCta: "Falar comigo",
    availability: "Projetos no Brasil e internacionalmente.",
    heroImageLabel: "STRATEGY · SYSTEMS · EXECUTION",
    heroImageTitle: "Presença digital com peso de marca.",
    heroImageCopy: "Menos ruído. Mais direção, detalhe, controle e percepção de valor.",
    projectsEyebrow: "01 / PROJETOS SELECIONADOS",
    projectsTitle: "O trabalho precisa provar o repertório antes da primeira reunião.",
    projectsIntro: "Cada projeto combina posicionamento, experiência, tecnologia e crescimento. O objetivo não é apenas ficar bonito — é fazer o negócio parecer mais sólido e funcionar melhor.",
    viewProject: "Ver projeto",
    allProjects: "Explorar todos os projetos",
    expertiseEyebrow: "02 / O QUE EU CONSTRUO",
    expertiseTitle: "Uma direção. Várias competências trabalhando juntas.",
    pillars: [
      { number: "01 — BUILD", title: "Websites & E-commerce", text: "Sites para estabelecimentos, lojas próprias, Shopify, headless e jornadas de compra desenhadas para converter." },
      { number: "02 — GROW", title: "Growth & Conversion", text: "CRO, tráfego, SEO, ofertas e funis que transformam atenção em oportunidade e oportunidade em receita." },
      { number: "03 — SYSTEMIZE", title: "CRM, Automação & IA", text: "Dados, e-mail marketing, CRM, integrações e agentes que reduzem trabalho manual e aumentam capacidade." },
    ],
    manifestoEyebrow: "03 / O PADRÃO",
    manifestoA: "Um negócio premium não precisa",
    manifestoItalic: "gritar.",
    manifestoB: "Precisa transmitir controle.",
    manifestoQuote: "Clareza, repertório e execução. O resto é decoração.",
    manifestoCopy: "Seu site é parte da percepção do seu negócio. Se ele parece improvisado, lento ou genérico, a marca inteira perde valor antes mesmo do cliente falar com você.",
    processEyebrow: "04 / COMO EU TRABALHO",
    processTitle: "Poucas etapas. Decisões muito bem feitas.",
    process: [
      ["01", "Diagnóstico", "Entendo negócio, público, operação, objetivos e onde a experiência perde força."],
      ["02", "Direção", "Defino arquitetura, linguagem, funcionalidades e prioridade comercial."],
      ["03", "Execução", "Construo, integro e lapido até a complexidade desaparecer da experiência."],
      ["04", "Evolução", "Dados, conversão e automação orientam os próximos ciclos de crescimento."],
    ],
    finalEyebrow: "NOVOS PROJETOS",
    finalTitle: "Se o seu negócio cresceu, a presença digital precisa acompanhar.",
    finalCopy: "Vamos entender o que precisa mudar e construir uma estrutura à altura da posição que você quer ocupar.",
    finalCta: "Conversar sobre meu projeto",
    stats: [["6+", "anos de experiência"], ["100+", "projetos digitais"], ["15+", "países atendidos"]],
  },
  en: {
    eyebrow: "STRATEGY · E-COMMERCE · AI · GROWTH",
    heroA: "Digital businesses",
    heroB: "built to feel",
    heroItalic: "inevitable.",
    lead: "I connect strategy, design, technology, acquisition and automation to build digital presences that feel larger, more mature and ready to grow.",
    projectsCta: "View selected work",
    talkCta: "Talk to me",
    availability: "Projects in Brazil and worldwide.",
    heroImageLabel: "STRATEGY · SYSTEMS · EXECUTION",
    heroImageTitle: "A digital presence with brand weight.",
    heroImageCopy: "Less noise. More direction, detail, control and perceived value.",
    projectsEyebrow: "01 / SELECTED WORK",
    projectsTitle: "The work should prove the range before the first meeting.",
    projectsIntro: "Every project combines positioning, experience, technology and growth. The goal is not just to look good — it is to make the business feel stronger and work better.",
    viewProject: "View project",
    allProjects: "Explore all projects",
    expertiseEyebrow: "02 / WHAT I BUILD",
    expertiseTitle: "One direction. Multiple capabilities working together.",
    pillars: [
      { number: "01 — BUILD", title: "Websites & E-commerce", text: "Business websites, owned stores, Shopify, headless and buying journeys designed to convert." },
      { number: "02 — GROW", title: "Growth & Conversion", text: "CRO, paid media, SEO, offers and funnels that turn attention into opportunity and revenue." },
      { number: "03 — SYSTEMIZE", title: "CRM, Automation & AI", text: "Data, email marketing, CRM, integrations and agents that reduce manual work and increase capacity." },
    ],
    manifestoEyebrow: "03 / THE STANDARD",
    manifestoA: "A premium business does not need to",
    manifestoItalic: "shout.",
    manifestoB: "It needs to communicate control.",
    manifestoQuote: "Clarity, range and execution. Everything else is decoration.",
    manifestoCopy: "Your website is part of how the market judges your business. If it feels improvised, slow or generic, the whole brand loses value before the first conversation.",
    processEyebrow: "04 / HOW I WORK",
    processTitle: "Fewer steps. Better decisions.",
    process: [
      ["01", "Diagnosis", "I map the business, audience, operation, objectives and where the experience loses strength."],
      ["02", "Direction", "I define architecture, language, functionality and commercial priorities."],
      ["03", "Execution", "I build, integrate and refine until the complexity disappears from the experience."],
      ["04", "Evolution", "Data, conversion and automation guide the next growth cycles."],
    ],
    finalEyebrow: "NEW PROJECTS",
    finalTitle: "If your business has grown, your digital presence should catch up.",
    finalCopy: "Let us identify what needs to change and build a structure worthy of the position you want to occupy.",
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
      <section className="relative min-h-[100svh] pt-20">
        <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-[1600px] grid-cols-1 gap-10 px-5 pb-8 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-5 lg:px-10 xl:px-14">
          <div className="flex flex-col justify-center py-10 lg:py-12">
            <p className="mb-8 text-[10px] font-semibold tracking-[0.22em] text-[#5f6559] sm:text-xs">— {c.eyebrow}</p>
            <h1 className="max-w-[760px] font-editorial text-[clamp(3.3rem,8vw,7.7rem)] leading-[0.86] tracking-[-0.05em]">
              <span className="block">{c.heroA}</span><span className="block">{c.heroB}</span><span className="block italic text-[#5f6559]">{c.heroItalic}</span>
            </h1>
            <p className="mt-9 max-w-xl text-base leading-7 text-[#5c5952] sm:text-lg sm:leading-8">{c.lead}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#selected-work" onClick={() => Analytics.ctaClick("premium_hero_projects")} className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#11110f] px-7 text-[10px] font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-[#2a2925] sm:min-h-14">{c.projectsCta}<ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" /></a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => Analytics.whatsappClick("premium_hero_direct")} className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#2b2a27]/30 px-7 text-[10px] font-semibold uppercase tracking-[0.13em] transition hover:bg-white/50 sm:min-h-14">{c.talkCta}<ArrowUpRight className="h-4 w-4" /></a>
            </div>
            <p className="mt-5 text-[9px] font-medium uppercase tracking-[0.18em] text-[#77736b]">{c.availability}</p>
            <div className="mt-12 grid max-w-2xl grid-cols-3 border-y border-[#d4cec2] py-5 sm:py-6">
              {c.stats.map(([value, label], index) => <div key={label} className={`px-3 first:pl-0 sm:px-6 ${index > 0 ? "border-l border-[#d4cec2]" : ""}`}><p className="font-editorial text-2xl leading-none sm:text-4xl">{value}</p><p className="mt-2 text-[8px] uppercase tracking-[0.12em] text-[#77736b] sm:text-[9px]">{label}</p></div>)}
            </div>
          </div>

          <div className="relative min-h-[68svh] overflow-hidden bg-[#11110f] lg:min-h-[calc(100svh-8rem)]">
            <Image src="/images/premium/andre-portrait.webp" alt="André Almeida" fill priority className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 56vw" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,15,0.02)_0%,rgba(17,17,15,0.08)_55%,rgba(17,17,15,0.88)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8 lg:p-10">
              <p className="text-[9px] font-semibold tracking-[0.2em] text-white/55">{c.heroImageLabel}</p>
              <div className="mt-3 flex items-end justify-between gap-6 border-t border-white/20 pt-5">
                <div><h2 className="max-w-lg font-editorial text-3xl leading-none tracking-[-0.03em] sm:text-5xl">{c.heroImageTitle}</h2><p className="mt-3 max-w-md text-sm leading-6 text-white/65">{c.heroImageCopy}</p></div>
                <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/30 sm:flex"><ArrowDown className="h-4 w-4" /></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="selected-work" className="border-t border-[#d4cec2] py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
          <div className="grid gap-8 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16"><p className="text-[10px] font-semibold tracking-[0.2em] text-[#77736b]">{c.projectsEyebrow}</p><div><h2 className="max-w-5xl font-editorial text-[clamp(2.8rem,6vw,6rem)] leading-[0.94] tracking-[-0.045em]">{c.projectsTitle}</h2><p className="mt-7 max-w-2xl text-base leading-7 text-[#666259] sm:text-lg sm:leading-8">{c.projectsIntro}</p></div></div>
          <div className="mt-16 grid gap-5 lg:mt-24 lg:grid-cols-12">
            {selectedProjects.map((project, index) => (
              <AnimatedSection key={project.title} delay={index * 0.04} className={project.featured ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-6"}>
                <a href={project.href} target="_blank" rel="noopener noreferrer" onClick={() => Analytics.ctaClick(`premium_project_${project.title}`)} className="group block h-full border-t border-[#cfc8bc] pt-4">
                  <div className={`relative overflow-hidden bg-[#dad4c9] ${project.featured ? "aspect-[1.16/1]" : "aspect-[1.1/1]"}`}><Image src={project.image} alt={project.title} fill className="object-cover transition duration-700 ease-out group-hover:scale-[1.025]" sizes={project.featured ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 42vw"} /><div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" /></div>
                  <div className="grid grid-cols-[1fr_auto] gap-5 py-5 sm:py-6"><div><p className="text-[9px] font-semibold tracking-[0.16em] text-[#807b71]">{project.category}</p><h3 className="mt-3 font-editorial text-3xl leading-none tracking-[-0.03em] sm:text-4xl">{project.title}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-[#6c675e]">{project.description}</p></div><div className="text-right"><span className="text-[10px] font-semibold tracking-[0.15em] text-[#807b71]">{project.index}</span><span className="mt-8 hidden items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] sm:flex">{c.viewProject}<ArrowUpRight className="h-3.5 w-3.5" /></span></div></div>
                </a>
              </AnimatedSection>
            ))}
          </div>
          <div className="mt-12 flex justify-end"><Link href={`/${locale}/portfolio`} onClick={() => Analytics.ctaClick("premium_all_projects")} className="inline-flex items-center gap-3 border-b border-[#11110f] pb-2 text-[10px] font-semibold uppercase tracking-[0.14em]">{c.allProjects}<ArrowUpRight className="h-4 w-4" /></Link></div>
        </div>
      </section>

      <section className="border-t border-[#d4cec2] py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
          <div className="grid gap-8 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16"><p className="text-[10px] font-semibold tracking-[0.2em] text-[#77736b]">{c.expertiseEyebrow}</p><h2 className="max-w-5xl font-editorial text-[clamp(2.8rem,6vw,6rem)] leading-[0.94] tracking-[-0.045em]">{c.expertiseTitle}</h2></div>
          <div className="mt-16 grid border-t border-[#cfc8bc] md:grid-cols-3 lg:mt-24">
            {c.pillars.map((pillar, index) => <AnimatedSection key={pillar.title} delay={index * 0.05} className="border-b border-[#cfc8bc] p-7 first:pl-0 md:border-b-0 md:border-r md:last:border-r-0 lg:p-10"><p className="text-[9px] font-semibold tracking-[0.18em] text-[#8a8479]">{pillar.number}</p><h3 className="mt-8 font-editorial text-3xl tracking-[-0.035em] lg:text-4xl">{pillar.title}</h3><p className="mt-5 text-sm leading-7 text-[#68635b]">{pillar.text}</p><Check className="mt-8 h-4 w-4 text-[#b49970]" /></AnimatedSection>)}
          </div>
        </div>
      </section>

      <section className="bg-[#11110f] py-24 text-white md:py-32 lg:py-40">
        <div className="mx-auto grid max-w-[1600px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.58fr_0.42fr] lg:px-10 xl:px-14">
          <div><p className="text-[10px] font-semibold tracking-[0.2em] text-[#c7b18d]">{c.manifestoEyebrow}</p><h2 className="mt-8 max-w-4xl font-editorial text-[clamp(3rem,6vw,6.5rem)] leading-[0.9] tracking-[-0.05em]">{c.manifestoA} <span className="italic text-[#c7b18d]">{c.manifestoItalic}</span><br />{c.manifestoB}</h2></div>
          <div className="flex flex-col justify-end border-t border-white/15 pt-8 lg:border-l lg:border-t-0 lg:pl-12"><p className="font-editorial text-2xl italic leading-tight text-[#e5ddcf] sm:text-3xl">“{c.manifestoQuote}”</p><p className="mt-7 max-w-lg text-sm leading-7 text-white/55">{c.manifestoCopy}</p></div>
        </div>
      </section>

      <CommercialInfrastructureSection />

      <section className="border-t border-[#d4cec2] py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
          <div className="grid gap-8 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16"><p className="text-[10px] font-semibold tracking-[0.2em] text-[#77736b]">{c.processEyebrow}</p><h2 className="max-w-4xl font-editorial text-[clamp(2.8rem,5.5vw,5.7rem)] leading-[0.94] tracking-[-0.045em]">{c.processTitle}</h2></div>
          <div className="mt-16 divide-y divide-[#cec7ba] border-y border-[#cec7ba] lg:mt-24">{c.process.map(([number, title, text]) => <div key={number} className="grid gap-4 py-7 sm:grid-cols-[0.15fr_0.3fr_0.55fr] sm:items-start lg:py-9"><span className="text-[9px] font-semibold tracking-[0.16em] text-[#8a8479]">{number}</span><h3 className="font-editorial text-2xl tracking-[-0.03em] sm:text-3xl">{title}</h3><p className="max-w-2xl text-sm leading-7 text-[#666159]">{text}</p></div>)}</div>
        </div>
      </section>

      <section className="border-t border-[#d4cec2] bg-[#e7e2d8] py-20 md:py-28">
        <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-10 px-5 sm:px-8 lg:flex-row lg:items-end lg:px-10 xl:px-14"><div><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#7c766d]">{c.finalEyebrow}</p><h2 className="mt-6 max-w-4xl font-editorial text-[clamp(2.8rem,5vw,5.5rem)] leading-[0.94] tracking-[-0.045em]">{c.finalTitle}</h2><p className="mt-6 max-w-xl text-sm leading-7 text-[#666159]">{c.finalCopy}</p></div><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => Analytics.whatsappClick("premium_final_cta")} className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#11110f] px-7 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#2a2925] lg:min-w-[270px]">{c.finalCta}<ArrowUpRight className="h-4 w-4" /></a></div>
      </section>
    </div>
  )
}

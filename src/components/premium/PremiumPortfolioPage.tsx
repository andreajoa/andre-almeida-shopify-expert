"use client"

import Image from "next/image"
import { useLocale } from "next-intl"
import { ArrowUpRight } from "lucide-react"
import { Analytics } from "@/lib/analytics"
import { SITE_CONFIG } from "@/lib/constants"

const projects = {
  "pt-BR": [
    { title: "NOVA AI Studio", type: "IA · SAAS · PRODUTO", text: "Produto digital de criação com IA: posicionamento, interface e uma experiência construída para comunicar tecnologia sem perder clareza.", image: "/images/premium/nova-ai.webp", href: "https://www.novvideos.online/" },
    { title: "CAA Neuro", type: "TECNOLOGIA · ACESSIBILIDADE", text: "Uma experiência de comunicação assistiva que precisa equilibrar funcionalidade, acolhimento, acessibilidade e simplicidade de uso.", image: "/images/premium/caa-neuro.webp", href: "https://www.adhdautism.online/" },
    { title: "Vastara", type: "E-COMMERCE · LUXURY", text: "E-commerce de relógios com foco em percepção premium, apresentação de produto, desejo e uma jornada de compra mais sofisticada.", image: "/images/premium/vastara.webp", href: "https://vastara.online/" },
    { title: "Brinqueteando", type: "E-COMMERCE · EDUCAÇÃO", text: "Loja digital de brinquedos e recursos educativos com uma comunicação mais humana e estrutura pensada para confiança e conversão.", image: "/images/premium/brinqueteando.webp", href: "https://brinqueteando.online/" },
  ],
  en: [
    { title: "NOVA AI Studio", type: "AI · SAAS · PRODUCT", text: "An AI creation product combining positioning, interface and an experience that communicates technology without losing clarity.", image: "/images/premium/nova-ai.webp", href: "https://www.novvideos.online/" },
    { title: "CAA Neuro", type: "TECH · ACCESSIBILITY", text: "An assistive communication experience balancing functionality, care, accessibility and ease of use.", image: "/images/premium/caa-neuro.webp", href: "https://www.adhdautism.online/" },
    { title: "Vastara", type: "E-COMMERCE · LUXURY", text: "A watch ecommerce experience focused on premium perception, product presentation, desire and a more sophisticated buying journey.", image: "/images/premium/vastara.webp", href: "https://vastara.online/" },
    { title: "Brinqueteando", type: "E-COMMERCE · EDUCATION", text: "A digital store for educational products with a warmer communication system and a structure designed for trust and conversion.", image: "/images/premium/brinqueteando.webp", href: "https://brinqueteando.online/" },
  ],
} as const

const copy = {
  "pt-BR": { eyebrow: "PROJETOS", title: "O portfólio não é uma parede de screenshots. É uma amostra de raciocínio.", lead: "Negócios diferentes pedem decisões diferentes. O que permanece é o padrão: clareza de posicionamento, experiência coerente, tecnologia bem resolvida e intenção comercial.", view: "Abrir projeto", final: "Seu projeto pode ser o próximo case que realmente valha mostrar.", cta: "Conversar sobre meu projeto" },
  en: { eyebrow: "WORK", title: "A portfolio is not a wall of screenshots. It is evidence of thinking.", lead: "Different businesses require different decisions. What remains is the standard: clear positioning, coherent experience, resolved technology and commercial intent.", view: "Open project", final: "Your project can be the next case actually worth showing.", cta: "Talk about my project" },
} as const

export function PremiumPortfolioPage() {
  const locale = useLocale() as "pt-BR" | "en"
  const lang = locale === "en" ? "en" : "pt-BR"
  const c = copy[lang]
  const whatsappText = encodeURIComponent(lang === "pt-BR" ? "Olá André, vi seus projetos e quero conversar sobre o meu." : "Hi Andre, I saw your work and want to discuss my project.")
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappText}`

  return (
    <div className="bg-[#f2efe8] pt-20 text-[#11110f]">
      <section className="border-b border-[#d4cec2] py-20 md:py-28 lg:py-36"><div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14"><p className="text-[10px] font-semibold tracking-[0.2em] text-[#8a7658]">{c.eyebrow}</p><div className="mt-8 grid gap-8 lg:grid-cols-[0.72fr_0.28fr] lg:items-end"><h1 className="max-w-6xl font-editorial text-[clamp(3.5rem,7vw,7.2rem)] leading-[0.88] tracking-[-0.055em]">{c.title}</h1><p className="text-base leading-8 text-[#625e56]">{c.lead}</p></div></div></section>

      <section className="py-16 md:py-24 lg:py-32"><div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14"><div className="grid gap-x-6 gap-y-16 lg:grid-cols-12">{projects[lang].map((project, index) => <article key={project.title} className={index % 3 === 0 ? "lg:col-span-7" : index % 3 === 1 ? "lg:col-span-5" : "lg:col-span-6"}><a href={project.href} target="_blank" rel="noopener noreferrer" onClick={() => Analytics.ctaClick(`portfolio_${project.title}`)} className="group block border-t border-[#cfc8bc] pt-4"><div className={`relative overflow-hidden bg-[#dad4c9] ${index === 0 ? "aspect-[1.15/1]" : "aspect-[1.08/1]"}`}><Image src={project.image} alt={project.title} fill className="object-cover transition duration-700 group-hover:scale-[1.025]" sizes="(max-width:1024px) 100vw, 55vw" /></div><div className="grid grid-cols-[1fr_auto] gap-4 py-5"><div><p className="text-[9px] font-semibold tracking-[0.16em] text-[#807b71]">0{index + 1} · {project.type}</p><h2 className="mt-3 font-editorial text-4xl tracking-[-0.04em] sm:text-5xl">{project.title}</h2><p className="mt-4 max-w-xl text-sm leading-7 text-[#68635b]">{project.text}</p></div><ArrowUpRight className="mt-2 h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div><span className="inline-block border-b border-[#11110f] pb-1 text-[9px] font-semibold uppercase tracking-[0.13em]">{c.view}</span></a></article>)}</div></div></section>

      <section className="border-t border-[#d4cec2] bg-[#11110f] py-24 text-white md:py-32"><div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-10 px-5 sm:px-8 lg:flex-row lg:items-end lg:px-10 xl:px-14"><h2 className="max-w-5xl font-editorial text-[clamp(3.2rem,6vw,6.2rem)] leading-[0.92] tracking-[-0.05em]">{c.final}</h2><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => Analytics.whatsappClick("portfolio_final")} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#f2efe8] px-7 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#11110f]">{c.cta}<ArrowUpRight className="h-4 w-4" /></a></div></section>
    </div>
  )
}

"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUp, ArrowUpRight } from "lucide-react"
import { useLocale } from "next-intl"
import { SITE_CONFIG } from "@/lib/constants"

export function Footer() {
  const locale = useLocale()
  const isPt = locale !== "en"
  const lang = isPt ? "pt-BR" : "en"
  const currentYear = new Date().getFullYear()

  const labels = {
    work: isPt ? "Projetos" : "Work",
    websites: isPt ? "Sites & E-commerce" : "Websites & Ecommerce",
    services: isPt ? "Serviços" : "Services",
    about: isPt ? "Sobre" : "About",
    blog: "Insights",
    free: isPt ? "Material gratuito" : "Free material",
    privacy: isPt ? "Privacidade" : "Privacy",
    terms: isPt ? "Termos" : "Terms",
    cookies: "Cookies",
    contact: isPt ? "Contato" : "Contact",
    nav: isPt ? "Navegação" : "Navigation",
    legal: "Legal",
    statement: isPt
      ? "Websites, e-commerce, automação e autoridade digital para negócios que querem crescer com controle e direção."
      : "Websites, ecommerce, automation and digital authority for businesses that want to grow with control and direction.",
  }

  const primary = [
    [labels.websites, `/${lang}/websites-ecommerce`],
    [labels.work, `/${lang}/portfolio`],
    [labels.services, `/${lang}/services`],
    [labels.about, `/${lang}/about`],
    [labels.blog, `/${lang}/blog`],
    [labels.free, `/${lang}/material-gratuito`],
    [labels.contact, `/${lang}/contact`],
  ]
  const legal = [[labels.privacy, `/${lang}/privacy-policy`], [labels.terms, `/${lang}/terms-of-service`], [labels.cookies, `/${lang}/cookie-policy`]]

  return <footer className="border-t border-white/10 bg-[#11110f] text-white">
    <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 xl:px-14">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:gap-16">
        <div>
          <Link href={`/${lang}`} className="inline-flex items-center gap-3"><Image src="/favicon.svg" alt="Monograma André Almeida" width={36} height={36} className="h-9 w-9 rounded-full object-cover"/><span><span className="block text-[12px] font-semibold tracking-[0.06em]">ANDRÉ ALMEIDA</span><span className="mt-1 block text-[7px] font-medium tracking-[0.2em] text-white/35">DIGITAL STRATEGY · COMMERCE · AI</span></span></Link>
          <p className="mt-8 max-w-xl font-editorial text-3xl leading-[1.04] tracking-[-0.03em] text-white/92 sm:text-4xl">{labels.statement}</p>
          <a href={`mailto:${SITE_CONFIG.email}`} className="mt-8 inline-flex items-center gap-2 border-b border-white/25 pb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/60 transition hover:border-[#c7b18d] hover:text-[#c7b18d]">{SITE_CONFIG.email}<ArrowUpRight className="h-3.5 w-3.5"/></a>
        </div>
        <div><p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/30">{labels.nav}</p><ul className="mt-6 space-y-3">{primary.map(([label,href])=><li key={href}><Link href={href} className="text-sm text-white/60 transition hover:text-white">{label}</Link></li>)}</ul></div>
        <div><p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/30">{labels.legal}</p><ul className="mt-6 space-y-3">{legal.map(([label,href])=><li key={href}><Link href={href} className="text-sm text-white/60 transition hover:text-white">{label}</Link></li>)}</ul></div>
      </div>
      <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-7 text-[8px] font-medium uppercase tracking-[0.14em] text-white/32 sm:flex-row sm:items-center sm:justify-between"><p>© {currentYear} {SITE_CONFIG.name}. {isPt ? "Todos os direitos reservados." : "All rights reserved."}</p><div className="flex items-center gap-6"><span>{isPt ? "Brasil · atendimento nacional e internacional" : "Brazil · worldwide service"}</span><button type="button" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/55 transition hover:border-[#c7b18d] hover:text-[#c7b18d]" aria-label={isPt?"Voltar ao topo":"Back to top"}><ArrowUp className="h-3.5 w-3.5"/></button></div></div>
    </div>
  </footer>
}

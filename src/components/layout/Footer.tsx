"use client"

import Link from "next/link"
import { ArrowUp, ArrowUpRight } from "lucide-react"
import { useLocale } from "next-intl"
import { SITE_CONFIG } from "@/lib/constants"

export function Footer() {
  const locale = useLocale()
  const isPt = locale === "pt-BR"
  const isEs = locale === "es"
  const currentYear = new Date().getFullYear()

  const labels = {
    work: isPt ? "Projetos" : isEs ? "Proyectos" : "Work",
    services: isPt ? "Serviços" : isEs ? "Servicios" : "Services",
    about: isPt ? "Sobre" : isEs ? "Sobre mí" : "About",
    blog: "Insights",
    free: isPt ? "Material gratuito" : isEs ? "Material gratuito" : "Free material",
    privacy: isPt ? "Privacidade" : isEs ? "Privacidad" : "Privacy",
    terms: isPt ? "Termos" : isEs ? "Términos" : "Terms",
    cookies: "Cookies",
    contact: isPt ? "Contato" : isEs ? "Contacto" : "Contact",
    statement: isPt
      ? "Estratégia, commerce e sistemas digitais para marcas que querem crescer com direção."
      : isEs
        ? "Estrategia, commerce y sistemas digitales para marcas que quieren crecer con dirección."
        : "Strategy, commerce and digital systems for brands that want to grow with direction.",
  }

  const primary = [
    [labels.work, `/${locale}/portfolio`],
    [labels.services, `/${locale}/services`],
    [labels.about, `/${locale}/about`],
    [labels.blog, `/${locale}/blog`],
    [labels.free, `/${locale}/material-gratuito`],
    [labels.contact, `/${locale}/contact`],
  ]

  const legal = [
    [labels.privacy, `/${locale}/privacy-policy`],
    [labels.terms, `/${locale}/terms-of-service`],
    [labels.cookies, `/${locale}/cookie-policy`],
  ]

  return (
    <footer className="border-t border-white/10 bg-[#11110f] text-white">
      <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 xl:px-14">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:gap-16">
          <div>
            <Link href={`/${locale}`} className="inline-flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-[9px] font-semibold tracking-[0.08em]">AA</span>
              <span>
                <span className="block text-[12px] font-semibold tracking-[0.06em]">ANDRÉ ALMEIDA</span>
                <span className="mt-1 block text-[7px] font-medium tracking-[0.2em] text-white/35">DIGITAL COMMERCE</span>
              </span>
            </Link>

            <p className="mt-8 max-w-xl font-editorial text-3xl leading-[1.04] tracking-[-0.03em] text-white/92 sm:text-4xl">{labels.statement}</p>

            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="mt-8 inline-flex items-center gap-2 border-b border-white/25 pb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/60 transition hover:border-[#c7b18d] hover:text-[#c7b18d]"
            >
              {SITE_CONFIG.email}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/30">Navigation</p>
            <ul className="mt-6 space-y-3">
              {primary.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/58 transition hover:text-white">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/30">Legal</p>
            <ul className="mt-6 space-y-3">
              {legal.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/58 transition hover:text-white">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-7 text-[8px] font-medium uppercase tracking-[0.14em] text-white/32 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} {SITE_CONFIG.name}. {isPt ? "Todos os direitos reservados." : isEs ? "Todos los derechos reservados." : "All rights reserved."}</p>
          <div className="flex items-center gap-6">
            <span>São Paulo · Brazil</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/55 transition hover:border-[#c7b18d] hover:text-[#c7b18d]"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, Globe2, Menu, X } from "lucide-react"
import Link from "next/link"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { Analytics } from "@/lib/analytics"
import { SITE_CONFIG } from "@/lib/constants"

export function Header() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isPt = locale === "pt-BR"

  const nav = [
    { label: isPt ? "Projetos" : "Work", href: `/${locale}/portfolio` },
    { label: isPt ? "Sites & E-commerce" : "Websites & Ecommerce", href: `/${locale}/websites-ecommerce` },
    { label: isPt ? "Serviços" : "Services", href: `/${locale}/services` },
    { label: isPt ? "Sobre" : "About", href: `/${locale}/about` },
    { label: isPt ? "Contato" : "Contact", href: `/${locale}/contact` },
  ]

  const whatsappText = encodeURIComponent(
    isPt
      ? "Olá André, vi seu site e quero conversar sobre um projeto digital."
      : "Hi Andre, I saw your website and want to talk about a digital project."
  )
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappText}`

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const switchLocale = () => {
    const nextLocale = isPt ? "en" : "pt-BR"
    const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), "") || ""
    document.cookie = `NEXT_LOCALE=${nextLocale};path=/;max-age=${60 * 60 * 24 * 365}`
    router.push(`/${nextLocale}${pathWithoutLocale}`)
    setMobileOpen(false)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-20 border-b border-white/10 bg-[#11110f] text-white">
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-10 xl:px-14">
          <Link href={`/${locale}`} className="group flex items-center gap-3" aria-label="André Almeida — Home">
            <img src="/brand/icon.png" alt="" className="h-9 w-9 rounded-full object-cover" />
            <span className="leading-none">
              <span className="block text-[12px] font-semibold tracking-[0.06em]">ANDRÉ ALMEIDA</span>
              <span className="mt-1 block text-[7px] font-medium tracking-[0.2em] text-white/40">STRATEGY · IA · E-COMMERCE</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 xl:flex" aria-label="Main navigation">
            {nav.map((item) => {
              const active = pathname === item.href
              return (
                <Link key={item.href} href={item.href} className={`relative py-2 text-[9px] font-medium uppercase tracking-[0.14em] transition ${active ? "text-white" : "text-white/55 hover:text-white"}`}>
                  {item.label}
                  {active ? <span className="absolute inset-x-0 -bottom-1 h-px bg-[#c7b18d]" /> : null}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button type="button" onClick={switchLocale} className="inline-flex min-h-10 items-center gap-2 px-3 text-[9px] font-medium uppercase tracking-[0.12em] text-white/55 transition hover:text-white" aria-label={isPt ? "Translate website to English" : "Traduzir site para português"}>
              <Globe2 className="h-3.5 w-3.5" />
              {isPt ? "EN" : "PT"}
            </button>

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => Analytics.whatsappClick("premium_header")} className="hidden min-h-11 items-center gap-2 rounded-full bg-[#f2efe8] px-5 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#11110f] transition hover:bg-[#e4ddcf] sm:inline-flex">
              {isPt ? "Falar comigo" : "Talk to me"}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <button type="button" onClick={() => setMobileOpen((value) => !value)} className="flex h-11 w-11 items-center justify-center text-white xl:hidden" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-[#11110f] px-5 pb-8 pt-28 text-white sm:px-8 xl:hidden">
          <nav className="mx-auto max-w-xl" aria-label="Mobile navigation">
            <div className="divide-y divide-white/10 border-y border-white/10">
              {nav.map((item, index) => (
                <Link key={item.href} href={item.href} className="group flex items-center justify-between py-5">
                  <span className="font-editorial text-3xl tracking-[-0.03em] sm:text-4xl">{item.label}</span>
                  <span className="flex items-center gap-3 text-[9px] font-semibold tracking-[0.15em] text-white/40">0{index + 1}<ArrowUpRight className="h-4 w-4" /></span>
                </Link>
              ))}
            </div>
            <button type="button" onClick={switchLocale} className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/65">
              <Globe2 className="h-4 w-4" /> {isPt ? "View in English" : "Ver em português"}
            </button>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => Analytics.whatsappClick("premium_mobile_menu")} className="mt-8 flex min-h-14 w-full items-center justify-between rounded-full bg-[#f2efe8] px-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#11110f]">
              {isPt ? "Conversar sobre meu projeto" : "Talk about my project"}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      ) : null}
    </>
  )
}

"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, ChevronDown, Globe2, Menu, X } from "lucide-react"
import Link from "next/link"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { Analytics } from "@/lib/analytics"
import { SITE_CONFIG } from "@/lib/constants"

const localeNames: Record<string, string> = {
  en: "English",
  "pt-BR": "Português",
  es: "Español",
}

export function Header() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  const isPt = locale === "pt-BR"
  const isEs = locale === "es"

  const nav = [
    { label: isPt ? "Projetos" : isEs ? "Proyectos" : "Work", href: `/${locale}/portfolio` },
    { label: "Expertise", href: `/${locale}/services` },
    { label: isPt ? "Sobre" : isEs ? "Sobre mí" : "About", href: `/${locale}/about` },
    { label: "Insights", href: `/${locale}/blog` },
  ]

  const whatsappText = encodeURIComponent(
    isPt
      ? "Olá André, vi seu site e quero conversar sobre um projeto digital."
      : isEs
        ? "Hola André, vi tu sitio y quiero hablar sobre un proyecto digital."
        : "Hi Andre, I saw your website and want to talk about a digital project."
  )
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappText}`

  useEffect(() => {
    setMobileOpen(false)
    setLangOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const switchLocale = (nextLocale: string) => {
    const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), "") || ""
    document.cookie = `NEXT_LOCALE=${nextLocale};path=/;max-age=${60 * 60 * 24 * 365}`
    router.push(`/${nextLocale}${pathWithoutLocale}`)
    setLangOpen(false)
    setMobileOpen(false)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-20 border-b border-white/10 bg-[#11110f] text-white">
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-10 xl:px-14">
          <Link href={`/${locale}`} className="group flex items-center gap-3" aria-label="Andre Almeida — Home">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 text-[9px] font-semibold tracking-[0.08em] transition group-hover:border-[#c7b18d] group-hover:text-[#c7b18d]">
              AA
            </span>
            <span className="leading-none">
              <span className="block text-[12px] font-semibold tracking-[0.06em]">ANDRÉ ALMEIDA</span>
              <span className="mt-1 block text-[7px] font-medium tracking-[0.2em] text-white/40">DIGITAL COMMERCE</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {nav.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-2 text-[10px] font-medium uppercase tracking-[0.15em] transition ${active ? "text-white" : "text-white/55 hover:text-white"}`}
                >
                  {item.label}
                  {active ? <span className="absolute inset-x-0 -bottom-1 h-px bg-[#c7b18d]" /> : null}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setLangOpen((value) => !value)}
                className="inline-flex min-h-10 items-center gap-2 px-3 text-[9px] font-medium uppercase tracking-[0.12em] text-white/55 transition hover:text-white"
                aria-expanded={langOpen}
                aria-label="Change language"
              >
                <Globe2 className="h-3.5 w-3.5" />
                {locale === "pt-BR" ? "PT" : locale.toUpperCase()}
                <ChevronDown className={`h-3 w-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>

              {langOpen ? (
                <div className="absolute right-0 top-full mt-2 min-w-40 border border-white/10 bg-[#191917] p-1 shadow-2xl">
                  {Object.entries(localeNames).map(([code, name]) => (
                    <button
                      type="button"
                      key={code}
                      onClick={() => switchLocale(code)}
                      className={`block w-full px-4 py-3 text-left text-[10px] uppercase tracking-[0.12em] transition ${locale === code ? "bg-white/8 text-[#c7b18d]" : "text-white/55 hover:bg-white/5 hover:text-white"}`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => Analytics.whatsappClick("premium_header")}
              className="hidden min-h-11 items-center gap-2 rounded-full bg-[#f2efe8] px-5 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#11110f] transition hover:bg-[#dfe4dc] sm:inline-flex"
            >
              {isPt ? "Iniciar projeto" : isEs ? "Iniciar proyecto" : "Start a project"}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              className="flex h-11 w-11 items-center justify-center text-white lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-[#11110f] px-5 pb-8 pt-28 text-white sm:px-8 lg:hidden">
          <nav className="mx-auto max-w-xl" aria-label="Mobile navigation">
            <div className="divide-y divide-white/10 border-y border-white/10">
              {nav.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between py-6"
                >
                  <span className="font-editorial text-4xl tracking-[-0.03em] sm:text-5xl">{item.label}</span>
                  <span className="flex items-center gap-3 text-[9px] font-semibold tracking-[0.15em] text-white/40">
                    0{index + 1}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-10">
              <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/35">Language</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {Object.entries(localeNames).map(([code, name]) => (
                  <button
                    type="button"
                    key={code}
                    onClick={() => switchLocale(code)}
                    className={`min-h-11 rounded-full border px-4 text-[9px] font-semibold uppercase tracking-[0.12em] ${locale === code ? "border-[#c7b18d] text-[#c7b18d]" : "border-white/15 text-white/50"}`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => Analytics.whatsappClick("premium_mobile_menu")}
              className="mt-10 flex min-h-14 w-full items-center justify-between rounded-full bg-[#f2efe8] px-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#11110f]"
            >
              {isPt ? "Conversar sobre meu projeto" : isEs ? "Hablar sobre mi proyecto" : "Talk about my project"}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      ) : null}
    </>
  )
}

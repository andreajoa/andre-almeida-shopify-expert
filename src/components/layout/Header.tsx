"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Globe, ChevronDown } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"

const navItems = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/about", key: "about" },
  { href: "/blog", key: "blog" },
  { href: "/contact", key: "contact" },
]

const localeNames: Record<string, string> = { en: "English", "pt-BR": "Português", es: "Español" }
const localeFlags: Record<string, string> = { en: "🇺🇸", "pt-BR": "🇧🇷", es: "🇪🇸" }

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const t = useTranslations("nav")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const switchLocale = (newLocale: string) => {
    const path = pathname.replace(`/${locale}`, "").replace(/^\//, "")
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=${60 * 60 * 24 * 365}`
    router.push(`/${newLocale}/${path}`)
    setLangOpen(false)
  }

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "bg-slate-900/80 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent py-5"
      )}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href={`/${locale}`} className="flex items-center gap-3 group">
            <img
              src="/images/branding/logo1.png"
              alt="Andre Almeida - Shopify Expert"
              className="h-10 w-10 rounded-xl object-contain group-hover:scale-110 transition-transform"
            />
            <div className="hidden sm:block">
              <span className="text-white font-bold text-lg">Andre Almeida</span>
              <span className="block text-[10px] text-slate-500 -mt-1 tracking-wider uppercase">Shopify Expert</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a key={item.key} href={`/${locale}${item.href === "/" ? "" : item.href}`}
                className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  pathname === `/${locale}${item.href === "/" ? "" : item.href}` || (item.href === "/" && pathname === `/${locale}`)
                    ? "text-white bg-white/10" : "text-slate-400 hover:text-white hover:bg-white/5"
                )}>{t(item.key)}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
                <Globe className="w-4 h-4" />
                <span>{localeFlags[locale]} {locale === "pt-BR" ? "PT" : locale.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 bg-slate-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden min-w-[160px]">
                    {Object.entries(localeNames).map(([loc, name]) => (
                      <button key={loc} onClick={() => switchLocale(loc)}
                        className={cn("w-full px-4 py-3 text-sm text-left flex items-center gap-2 transition-colors cursor-pointer",
                          locale === loc ? "bg-indigo-600/20 text-indigo-400" : "text-slate-300 hover:bg-white/5"
                        )}>
                        <span>{localeFlags[loc]}</span>{name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href={`/${locale}/contact`} className="hidden md:block">
              <Button variant="primary" size="sm">{t("scheduleCall")}</Button>
            </a>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-slate-400 hover:text-white cursor-pointer">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-900/98 backdrop-blur-xl pt-24 px-6 lg:hidden overflow-y-auto">
            <nav className="flex flex-col gap-2">
              {navItems.map((item, i) => (
                <motion.a key={item.key} href={`/${locale}${item.href === "/" ? "" : item.href}`}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className="block px-4 py-3 rounded-xl text-lg font-medium text-slate-400 hover:text-white hover:bg-white/5">
                  {t(item.key)}
                </motion.a>
              ))}
              <div className="flex gap-2 mt-6">
                {Object.entries(localeFlags).map(([loc, flag]) => (
                  <button key={loc} onClick={() => switchLocale(loc)}
                    className={cn("flex-1 py-3 rounded-xl text-center font-medium cursor-pointer",
                      locale === loc ? "bg-indigo-600 text-white" : "bg-white/5 text-slate-400"
                    )}>{flag} {loc === "pt-BR" ? "PT" : loc.toUpperCase()}</button>
                ))}
              </div>
              <a href={`/${locale}/contact`} className="mt-4">
                <Button variant="primary" size="lg" className="w-full">{t("scheduleCall")}</Button>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

"use client"

import { Heart, ArrowUp } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { SITE_CONFIG } from "@/lib/constants"

export function Footer() {
  const t = useTranslations()
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-slate-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img
                src="/images/branding/logo1.png"
                alt="Andre Almeida - Shopify Expert"
                className="h-10 w-10 rounded-xl object-contain"
              />
              <div>
                <span className="text-white font-bold">Andre Almeida</span>
                <span className="block text-[10px] text-slate-500 -mt-1 tracking-wider uppercase">
                  Shopify Expert
                </span>
              </div>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t("footer.services")}</h4>
            <ul className="space-y-2">
              {[
                "Shopify Development",
                "Headless Hydrogen",
                "Store Migration",
                "Facebook & TikTok Ads",
                "Conversion Optimization",
                "Email Marketing",
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-slate-500 hover:text-indigo-400 text-sm transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t("footer.company")}</h4>
            <ul className="space-y-2">
              {[
                { label: t("nav.about"), href: "/about" },
                { label: t("nav.portfolio"), href: "/portfolio" },
                { label: t("nav.blog"), href: "/blog" },
                { label: t("nav.contact"), href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-500 hover:text-indigo-400 text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t("footer.legal")}</h4>
            <ul className="space-y-2">
              {[
                { label: t("footer.privacyPolicy"), href: "/privacy-policy" },
                { label: t("footer.termsOfService"), href: "/terms-of-service" },
                { label: t("footer.cookiePolicy"), href: "/cookie-policy" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-500 hover:text-indigo-400 text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">
            © {currentYear} {SITE_CONFIG.name}. {t("footer.rights")}
          </p>

          <div className="flex items-center gap-2 text-slate-600 text-sm">
            {t("footer.madeWith")}
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            in São Paulo, Brazil
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  )
}

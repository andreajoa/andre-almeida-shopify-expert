"use client"

import { ArrowRight, MessageCircle } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SITE_CONFIG } from "@/lib/constants"
import { Analytics } from "@/lib/analytics"

export function CTASection() {
  const t = useTranslations()
  const locale = useLocale()
  const whatsappText = encodeURIComponent(
    locale === "pt-BR"
      ? "Olá André, quero receber um diagnóstico inicial para minha loja online."
      : "Hi Andre, I want an initial diagnosis for my online store."
  )
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappText}`

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500 rounded-full filter blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            {t("cta.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => Analytics.whatsappClick("home_final_cta")}
            >
              <Button variant="primary" size="lg">
                <MessageCircle className="w-5 h-5" />
                {locale === "pt-BR" ? "Falar no WhatsApp" : "Talk on WhatsApp"}
              </Button>
            </a>

            <Link href={`/${locale}/services`}>
              <Button variant="outline" size="lg">
                {locale === "pt-BR" ? "Ver Serviços" : "View Services"}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

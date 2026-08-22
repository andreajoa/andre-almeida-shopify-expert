import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import type { Metadata } from "next"
import { LocaleChrome } from "@/components/layout/LocaleChrome"

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> }

const metaByLocale: Record<string, { title: string; description: string; ogLocale: string }> = {
  "pt-BR": {
    title: "André Almeida | Websites, E-commerce, Automação & Growth",
    description: "Websites para empresas, e-commerce, Shopify, CRM, analytics, e-mail marketing, automação, IA e growth em uma estrutura digital pensada para vender e crescer.",
    ogLocale: "pt_BR",
  },
  en: {
    title: "Andre Almeida | Websites, E-commerce, Automation & Growth",
    description: "Business websites, ecommerce, Shopify, CRM, analytics, email marketing, automation, AI and growth in one commercial digital system.",
    ogLocale: "en_US",
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const meta = metaByLocale[locale] ?? metaByLocale["pt-BR"]

  return {
    title: meta.title,
    description: meta.description,
    keywords: ["website para empresas", "ecommerce", "shopify expert", "crm", "email marketing", "automação", "inteligência artificial", "growth", "conversion optimization"],
    authors: [{ name: "Andre Almeida" }],
    alternates: {
      canonical: `https://andre-almeida.online/${locale}`,
      languages: {
        "x-default": "https://andre-almeida.online/pt-BR",
        "pt-BR": "https://andre-almeida.online/pt-BR",
        en: "https://andre-almeida.online/en",
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: meta.ogLocale,
      url: `https://andre-almeida.online/${locale}`,
      siteName: "Andre Almeida — Strategy · AI · E-commerce",
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
    robots: { index: true, follow: true },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as any)) notFound()
  const messages = await getMessages()
  return <NextIntlClientProvider messages={messages}><LocaleChrome>{children}</LocaleChrome></NextIntlClientProvider>
}

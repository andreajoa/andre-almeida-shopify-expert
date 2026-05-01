import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppButton } from "@/components/widgets/WhatsAppButton"
import { CookieConsentLazy } from "@/components/widgets/CookieConsentLazy"
import type { Metadata } from "next"

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

const metaByLocale: Record<string, { title: string; description: string; ogLocale: string }> = {
  en: {
    title: "Andre Almeida | Shopify Expert Developer",
    description: "Shopify Expert with 6+ years building high-performance stores. Headless Hydrogen, migrations, Facebook & TikTok Ads, and conversion optimization.",
    ogLocale: "en_US",
  },
  "pt-BR": {
    title: "Andre Almeida | Shopify Expert Developer",
    description: "Especialista Shopify com 6+ anos construindo lojas de alta performance. Headless Hydrogen, migrações, Facebook & TikTok Ads e otimização de conversão.",
    ogLocale: "pt_BR",
  },
  es: {
    title: "Andre Almeida | Shopify Expert Developer",
    description: "Experto Shopify con 6+ años construyendo tiendas de alto rendimiento. Headless Hydrogen, migraciones, Facebook & TikTok Ads y optimización de conversión.",
    ogLocale: "es_ES",
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const meta = metaByLocale[locale] ?? metaByLocale["en"]

  return {
    title: meta.title,
    description: meta.description,
    keywords: ["shopify expert", "shopify developer", "headless commerce", "hydrogen", "ecommerce", "shopify brasil"],
    authors: [{ name: "Andre Almeida" }],
    alternates: {
      canonical: `https://andre-almeida.online/${locale}`,
      languages: {
        "x-default": "https://andre-almeida.online/pt-BR",
        "en": "https://andre-almeida.online/en",
        "pt-BR": "https://andre-almeida.online/pt-BR",
        "es": "https://andre-almeida.online/es",
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: meta.ogLocale,
      url: `https://andre-almeida.online/${locale}`,
      siteName: "Andre Almeida - Shopify Expert",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppButton />
      <CookieConsentLazy />
    </NextIntlClientProvider>
  )
}

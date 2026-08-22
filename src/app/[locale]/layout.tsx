import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import type { Metadata } from "next"
import { LocaleChrome } from "@/components/layout/LocaleChrome"

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> }

const metaByLocale = {
  "pt-BR": {
    title: "André Almeida | Websites, E-commerce, Automação e Autoridade Online",
    description: "Criação de websites, e-commerce, Shopify, CRM, e-mail marketing, automação, SEO/GEO e autoridade online para empresas, profissionais e autores em todo o Brasil.",
    keywords: ["criação de sites", "site para empresas", "website profissional", "e-commerce próprio", "loja virtual", "Shopify Expert Brasil", "CRM", "email marketing", "automação", "SEO", "GEO", "autoridade online", "vender livros online"],
    ogLocale: "pt_BR",
  },
  en: {
    title: "Andre Almeida | Websites, Ecommerce, Automation & Online Authority",
    description: "Websites, ecommerce, Shopify, CRM, email marketing, automation, SEO/GEO and digital authority for businesses, professionals and authors in Brazil and worldwide.",
    keywords: ["website development Brazil", "ecommerce developer", "Shopify expert", "owned ecommerce", "CRM integration", "email marketing", "automation", "SEO", "GEO", "online authority", "sell books online"],
    ogLocale: "en_US",
  },
} as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const lang = locale === "en" ? "en" : "pt-BR"
  const meta = metaByLocale[lang]
  return {
    title: meta.title,
    description: meta.description,
    keywords: [...meta.keywords],
    authors: [{ name: "Andre Almeida", url: `https://andre-almeida.online/${lang}/about` }],
    alternates: { canonical: `https://andre-almeida.online/${lang}`, languages: { "x-default": "https://andre-almeida.online/pt-BR", "pt-BR": "https://andre-almeida.online/pt-BR", en: "https://andre-almeida.online/en" } },
    openGraph: { title: meta.title, description: meta.description, type: "website", locale: meta.ogLocale, url: `https://andre-almeida.online/${lang}`, siteName: "Andre Almeida — Digital Strategy", images: [{ url: "https://andre-almeida.online/brand/andre-premium.webp", width: 900, height: 1125, alt: "Andre Almeida" }] },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: ["https://andre-almeida.online/brand/andre-premium.webp"] },
    robots: { index: true, follow: true },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as "pt-BR" | "en")) notFound()
  const lang = locale === "en" ? "en" : "pt-BR"
  const messages = await getMessages()
  const entityGraph = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Person", "@id": "https://andre-almeida.online/#andre", name: "Andre Almeida", url: "https://andre-almeida.online", image: "https://andre-almeida.online/brand/andre-premium.webp", jobTitle: lang === "pt-BR" ? "Especialista em Websites, E-commerce e Automação" : "Websites, Ecommerce & Automation Specialist", knowsAbout: ["Website development", "Ecommerce", "Shopify", "CRM", "Email marketing", "Automation", "SEO", "GEO", "Conversion optimization", "Online authority"] },
      { "@type": "ProfessionalService", "@id": "https://andre-almeida.online/#business", name: "Andre Almeida Digital Strategy", url: "https://andre-almeida.online", founder: { "@id": "https://andre-almeida.online/#andre" }, areaServed: [{ "@type": "Country", name: "Brazil" }, { "@type": "AdministrativeArea", name: "Worldwide" }], serviceType: ["Website development", "Ecommerce development", "Shopify", "CRM integration", "Email marketing", "Automation", "SEO and GEO", "Online authority", "Book sales websites"] },
      { "@type": "WebSite", "@id": "https://andre-almeida.online/#website", url: "https://andre-almeida.online", name: "Andre Almeida", inLanguage: ["pt-BR", "en"], publisher: { "@id": "https://andre-almeida.online/#business" } },
      { "@type": "OfferCatalog", "@id": "https://andre-almeida.online/#services", name: lang === "pt-BR" ? "Serviços digitais" : "Digital services", itemListElement: ["Websites para empresas", "E-commerce próprio", "Shopify", "CRM e e-mail marketing", "Automação e IA", "SEO e GEO", "Autoridade online", "Estrutura para vender livros online"].map(name => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })) },
    ],
  }

  return <NextIntlClientProvider messages={messages}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(entityGraph) }} /><LocaleChrome>{children}</LocaleChrome></NextIntlClientProvider>
}

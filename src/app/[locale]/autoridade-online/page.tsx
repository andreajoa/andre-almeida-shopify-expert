import type { Metadata } from "next"
import { IntentLandingPage } from "@/components/seo/IntentLandingPage"
import { intentPages } from "@/data/intentPages"

type Props = { params: Promise<{ locale: string }> }
const slug = "autoridade-online" as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const lang = locale === "en" ? "en" : "pt-BR"
  const entry = intentPages[slug][lang]
  return {
    title: entry.metaTitle,
    description: entry.metaDescription,
    alternates: {
      canonical: `https://andre-almeida.online/${lang}/${slug}`,
      languages: {
        "pt-BR": `https://andre-almeida.online/pt-BR/${slug}`,
        en: `https://andre-almeida.online/en/${slug}`,
        "x-default": `https://andre-almeida.online/pt-BR/${slug}`,
      },
    },
  }
}

export default async function AutoridadeOnlinePage({ params }: Props) {
  const { locale } = await params
  const lang = locale === "en" ? "en" : "pt-BR"
  return <IntentLandingPage locale={lang} content={intentPages[slug][lang].content} />
}

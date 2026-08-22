import type { Metadata } from "next"
import { WebsitesEcommercePage } from "@/components/premium/WebsitesEcommercePage"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isPt = locale !== "en"

  return {
    title: isPt
      ? "Websites e E-commerce com Estrutura Própria | André Almeida"
      : "Owned Websites & E-commerce Systems | Andre Almeida",
    description: isPt
      ? "Websites para estabelecimentos e e-commerces com CRM, analytics, e-mail marketing, automação, recuperação de carrinho e estrutura sob seu controle."
      : "Business websites and ecommerce systems with CRM, analytics, email marketing, automation, cart recovery and an owned operating structure.",
    alternates: {
      canonical: `https://andre-almeida.online/${locale}/websites-ecommerce`,
      languages: {
        "x-default": "https://andre-almeida.online/pt-BR/websites-ecommerce",
        "pt-BR": "https://andre-almeida.online/pt-BR/websites-ecommerce",
        en: "https://andre-almeida.online/en/websites-ecommerce",
      },
    },
  }
}

export default function Page() {
  return <WebsitesEcommercePage />
}

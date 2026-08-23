import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import "./globals.css"
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const editorial = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-editorial", weight: ["400", "500", "600"], style: ["normal", "italic"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://andre-almeida.online"),
  title: { default: "André Almeida | Websites, E-commerce, Automação e Autoridade Online", template: "%s | André Almeida" },
  description: "Criação de websites, e-commerce, Shopify, automação, CRM, e-mail marketing, SEO/GEO, autoridade online e estruturas para vender produtos e livros pela internet em todo o Brasil.",
  keywords: ["criação de sites", "criação de website", "ecommerce", "e-commerce", "loja virtual", "Shopify Expert", "automação", "CRM", "email marketing", "SEO", "GEO", "autoridade online", "vender livros online", "site para empresas", "site para comércio"],
  authors: [{ name: "Andre Almeida", url: "https://andre-almeida.online/pt-BR/about" }],
  creator: "Andre Almeida",
  publisher: "Andre Almeida",
  icons: { icon: "/icon.png", shortcut: "/icon.png", apple: "/icon.png" },
  alternates: { canonical: "/pt-BR", languages: { "pt-BR": "/pt-BR", en: "/en", "x-default": "/pt-BR" } },
  openGraph: { title: "André Almeida | Estratégia e Infraestrutura Digital", description: "Websites, e-commerce, automação, dados, CRM e autoridade online para negócios que querem crescer com controle.", type: "website", url: "https://andre-almeida.online/pt-BR", locale: "pt_BR", siteName: "André Almeida — Estratégia Digital", images: [{ url: "/brand/andre-premium.webp", width: 900, height: 1125, alt: "André Almeida" }] },
  twitter: { card: "summary_large_image", title: "André Almeida | Websites, E-commerce e Automação", description: "Estratégia e infraestrutura digital para empresas, e-commerce, autores e profissionais.", images: ["/brand/andre-premium.webp"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  category: "technology",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR" className={`${inter.variable} ${editorial.variable}`}><body className={inter.className}><GoogleAnalytics />{children}</body></html>
}

import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import "./globals.css"
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const editorial = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-editorial", weight: ["400", "500", "600"], style: ["normal", "italic"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://andre-almeida.online"),
  title: "André Almeida | Websites, E-commerce, Automação & Growth",
  description: "Websites para empresas, e-commerce, Shopify, CRM, analytics, automação, IA e growth em uma estrutura digital pensada para vender e crescer.",
  keywords: ["website para empresas", "ecommerce", "shopify expert", "crm", "automação", "inteligência artificial", "growth"],
  authors: [{ name: "Andre Almeida" }],
  alternates: {
    canonical: "/pt-BR",
    languages: { "pt-BR": "/pt-BR", en: "/en", "x-default": "/pt-BR" },
  },
  openGraph: {
    title: "André Almeida | Websites, E-commerce, Automação & Growth",
    description: "Estratégia, e-commerce, CRM, automação, IA e growth em uma operação digital coerente.",
    type: "website",
    url: "https://andre-almeida.online/pt-BR",
    siteName: "Andre Almeida — Strategy · AI · E-commerce",
  },
  twitter: { card: "summary_large_image", title: "André Almeida | Websites, E-commerce, Automação & Growth", description: "Estratégia, e-commerce, CRM, automação, IA e growth." },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR" className={`${inter.variable} ${editorial.variable}`}><body className={inter.className}><GoogleAnalytics />{children}</body></html>
}

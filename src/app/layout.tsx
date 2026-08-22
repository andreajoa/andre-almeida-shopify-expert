import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import "./globals.css"
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const editorial = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-editorial",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://andre-almeida.online"),
  title: "Andre Almeida | Shopify Expert Developer",
  description: "Shopify Expert with 6+ years building high-performance stores. Headless Hydrogen, migrations, Facebook Ads, and conversion optimization.",
  keywords: ["shopify expert", "shopify developer", "headless commerce", "hydrogen", "ecommerce"],
  authors: [{ name: "Andre Almeida" }],
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      "pt-BR": "/pt-BR",
      es: "/es",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Andre Almeida | Shopify Expert Developer",
    description: "Shopify Expert with 6+ years building high-performance stores.",
    type: "website",
    url: "https://andre-almeida.online",
    siteName: "Andre Almeida | Shopify Expert Developer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andre Almeida | Shopify Expert Developer",
    description: "Shopify Expert with 6+ years building high-performance stores.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${editorial.variable}`}>
      <body className={inter.className}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}

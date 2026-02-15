import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://andre-almeida.online"),
  title: { default: "Andre Almeida | Shopify Expert Developer", template: "%s | Andre Almeida" },
  description: "Shopify Expert with 6+ years. Headless, migrations, Facebook Ads, CRO. São Paulo, Brazil & worldwide.",
  keywords: ["shopify expert","shopify developer","headless commerce","shopify são paulo","desenvolvedor shopify","shopify brasil","ecommerce developer"],
  authors: [{ name: "Andre Almeida" }],
  openGraph: { title: "Andre Almeida | Shopify Expert", description: "6+ years building high-performance Shopify stores worldwide.", type: "website", url: "https://andre-almeida.online", siteName: "Andre Almeida Shopify Expert" },
  twitter: { card: "summary_large_image", title: "Andre Almeida | Shopify Expert" },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://andre-almeida.online", languages: { "en": "https://andre-almeida.online/en", "pt-BR": "https://andre-almeida.online/pt-BR", "es": "https://andre-almeida.online/es" } },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

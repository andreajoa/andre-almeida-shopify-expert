import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Andre Almeida | Shopify Expert Developer",
  description: "Shopify Expert with 6+ years building high-performance stores. Headless Hydrogen, migrations, Facebook Ads, and conversion optimization.",
  keywords: ["shopify expert", "shopify developer", "headless commerce", "hydrogen", "ecommerce"],
  authors: [{ name: "Andre Almeida" }],
  openGraph: {
    title: "Andre Almeida | Shopify Expert Developer",
    description: "Shopify Expert with 6+ years building high-performance stores.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

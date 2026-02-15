import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Andre Almeida | Shopify Expert Developer",
  description: "Shopify Expert with 6+ years building high-performance stores. Headless Hydrogen, migrations, Facebook Ads, and conversion optimization.",
  keywords: ["shopify expert", "shopify developer", "headless commerce", "hydrogen", "ecommerce"],
  authors: [{ name: "Andre Almeida" }],
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180" },
    ],
    shortcut: "/favicon.png",
  },
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
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

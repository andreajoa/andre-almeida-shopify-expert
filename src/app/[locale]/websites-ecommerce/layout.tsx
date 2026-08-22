export default async function WebsitesEcommerceLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const lang = locale === "en" ? "en" : "pt-BR"
  const url = `https://andre-almeida.online/${lang}/websites-ecommerce`
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lang === "pt-BR" ? "Início" : "Home", item: `https://andre-almeida.online/${lang}` },
      { "@type": "ListItem", position: 2, name: lang === "pt-BR" ? "Serviços" : "Services", item: `https://andre-almeida.online/${lang}/services` },
      { "@type": "ListItem", position: 3, name: lang === "pt-BR" ? "Websites e E-commerce" : "Websites & Ecommerce", item: url },
    ],
  }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />{children}</>
}

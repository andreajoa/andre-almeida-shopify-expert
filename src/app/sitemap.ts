import { MetadataRoute } from "next"

const baseUrl = "https://andre-almeida.online"
const lastModified = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/websites-ecommerce", priority: 1, changeFrequency: "monthly" as const },
    { path: "/website-para-empresas", priority: .95, changeFrequency: "monthly" as const },
    { path: "/ecommerce-proprio", priority: .95, changeFrequency: "monthly" as const },
    { path: "/vender-livros-online", priority: .9, changeFrequency: "monthly" as const },
    { path: "/autoridade-online", priority: .9, changeFrequency: "monthly" as const },
    { path: "/services", priority: .95, changeFrequency: "monthly" as const },
    { path: "/contact", priority: .95, changeFrequency: "monthly" as const },
    { path: "/portfolio", priority: .85, changeFrequency: "monthly" as const },
    { path: "/about", priority: .8, changeFrequency: "monthly" as const },
    { path: "/blog", priority: .8, changeFrequency: "weekly" as const },
    { path: "/material-gratuito", priority: .6, changeFrequency: "monthly" as const },
    { path: "/cookie-policy", priority: .2, changeFrequency: "yearly" as const },
    { path: "/privacy-policy", priority: .2, changeFrequency: "yearly" as const },
    { path: "/terms-of-service", priority: .2, changeFrequency: "yearly" as const },
  ]
  const locales = ["pt-BR", "en"]
  return routes.flatMap(({ path, priority, changeFrequency }) => locales.map(locale => ({ url: `${baseUrl}/${locale}${path}`, lastModified, changeFrequency, priority, alternates: { languages: { "pt-BR": `${baseUrl}/pt-BR${path}`, en: `${baseUrl}/en${path}` } } })))
}

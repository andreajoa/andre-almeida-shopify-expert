import { MetadataRoute } from "next"

const baseUrl = "https://andre-almeida.online"
const lastModified = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.95, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.95, changeFrequency: "monthly" as const },
    { path: "/portfolio", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.80, changeFrequency: "daily" as const },
    { path: "/cookie-policy", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/terms-of-service", priority: 0.2, changeFrequency: "yearly" as const },
  ]

  const locales = ["pt-BR", "en", "es"]

  return routes.flatMap(({ path, priority, changeFrequency }) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority,
    }))
  )
}

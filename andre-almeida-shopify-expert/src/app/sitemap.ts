import { MetadataRoute } from "next"
import { blogPosts } from "@/data/blog"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://andre-almeida.online"
  const locales = ["en", "pt-BR", "es"]
  const pages = ["", "/services", "/portfolio", "/about", "/contact", "/blog", "/privacy-policy", "/terms-of-service", "/cookie-policy"]

  const staticPages = locales.flatMap(locale =>
    pages.map(page => ({
      url: `${base}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === "/blog" ? "weekly" as const : "monthly" as const,
      priority: page === "" ? 1 : page === "/services" ? 0.9 : page === "/contact" ? 0.8 : 0.7,
    }))
  )

  const blogPages = locales.flatMap(locale => {
    const posts = blogPosts[locale as keyof typeof blogPosts] || blogPosts.en
    return posts.map(post => ({
      url: `${base}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  })

  return [...staticPages, ...blogPages]
}

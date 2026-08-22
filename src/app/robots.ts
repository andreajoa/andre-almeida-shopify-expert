import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: ["Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "Google-Extended"], allow: "/", disallow: ["/api/"] },
    ],
    sitemap: "https://andre-almeida.online/sitemap.xml",
    host: "https://andre-almeida.online",
  }
}

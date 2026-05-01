import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://andre-almeida.online/sitemap.xml",
    host: "https://andre-almeida.online",
  }
}

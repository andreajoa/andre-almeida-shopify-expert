import type { Metadata } from "next"
import { blogPosts } from "@/data/blog"
import BlogPostClient from "./BlogPostClient"

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const posts = blogPosts[locale] || blogPosts["en"]
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return { title: "Article not found" }
  }

  const siteUrl = "https://andre-almeida.online"
  const canonical = `${siteUrl}/${locale}/blog/${slug}`

  // Use direct Unsplash URL for OG image — never /_next/image.
  // Email clients and social previews need JPEG, not AVIF/WebP.
  const ogImage = post.image.replace(/&q=\d+/, "&q=75").replace(/&w=\d+/, "&w=1200")

  return {
    title: `${post.title} | Andre Almeida`,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: canonical,
      siteName: "Andre Almeida - Shopify Expert",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
          type: "image/jpeg",
        },
      ],
      publishedTime: post.date,
      authors: ["Andre Almeida"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  }
}

export default function BlogPostPage() {
  return <BlogPostClient />
}

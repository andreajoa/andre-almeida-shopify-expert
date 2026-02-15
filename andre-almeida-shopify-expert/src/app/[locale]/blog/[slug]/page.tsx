"use client"
import { use } from "react"
import { useTranslations, useLocale } from "next-intl"
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { blogPosts } from "@/data/blog"

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const t = useTranslations("blog")
  const locale = useLocale() as "en" | "pt-BR" | "es"
  const posts = blogPosts[locale] || blogPosts.en
  const post = posts.find(p => p.slug === slug)

  if (!post) return <div className="pt-32 text-center text-white">Post not found</div>

  return (
    <div className="pt-24">
      <article className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <a href={`/${locale}/blog`} className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t("backToBlog")}
          </a>

          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
          </div>

          <Badge variant="indigo" className="mb-4">{post.category}</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">{post.title}</h1>

          <div className="flex items-center gap-6 text-sm text-slate-500 mb-12 pb-8 border-b border-white/5">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(post.date).toLocaleDateString(locale)}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime} {t("readTime")}</span>
          </div>

          {/* Article Content - rendered from markdown-like string */}
          <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
            {post.content.split("\n").map((line, i) => {
              const trimmed = line.trim()
              if (!trimmed) return null
              if (trimmed.startsWith("## ")) return <h2 key={i} className="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">{trimmed.replace("## ", "")}</h2>
              if (trimmed.startsWith("### ")) return <h3 key={i} className="text-xl md:text-2xl font-semibold text-white mt-8 mb-3">{trimmed.replace("### ", "")}</h3>
              if (trimmed.startsWith("#### ")) return <h4 key={i} className="text-lg font-semibold text-white mt-6 mb-2">{trimmed.replace("#### ", "")}</h4>
              if (trimmed.startsWith("- **")) return <li key={i} className="ml-6 list-disc"><strong className="text-white">{trimmed.match(/\*\*(.*?)\*\*/)?.[1]}</strong> {trimmed.replace(/- \*\*.*?\*\*/, "").replace(/—/, "—")}</li>
              if (trimmed.startsWith("- ")) return <li key={i} className="ml-6 list-disc">{trimmed.replace("- ", "")}</li>
              if (trimmed.startsWith("1. ") || trimmed.startsWith("2. ") || trimmed.startsWith("3. ") || trimmed.startsWith("4. ") || trimmed.startsWith("5. ") || trimmed.startsWith("6. ") || trimmed.startsWith("7. "))
                return <li key={i} className="ml-6 list-decimal"><strong className="text-white">{trimmed.match(/\*\*(.*?)\*\*/)?.[1]}</strong> {trimmed.replace(/^\d+\.\s/, "").replace(/\*\*.*?\*\*\s*/, "").replace(/—/, "—")}</li>
              if (trimmed.startsWith("|")) return null // skip tables for simplicity
              if (trimmed.startsWith("```")) return null
              if (trimmed.startsWith("[")) {
                const match = trimmed.match(/\[(.*?)\]\((.*?)\)/)
                if (match) return <a key={i} href={match[2]} className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors">{match[1]} <ArrowRight className="w-4 h-4" /></a>
              }
              return <p key={i}>{trimmed.replace(/\*\*(.*?)\*\*/g, "$1")}</p>
            })}
          </div>

          {/* Related Service CTA */}
          <Card variant="gradient" className="mt-16">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <p className="text-sm text-indigo-400 font-medium mb-1">{t("relatedService")}</p>
                <h3 className="text-xl font-bold text-white mb-2">{post.relatedService}</h3>
              </div>
              <a href={`/${locale}${post.relatedServiceLink}`}>
                <Button variant="primary">{t("readMore")} <ArrowRight className="w-4 h-4" /></Button>
              </a>
            </div>
          </Card>
        </div>
      </article>
    </div>
  )
}

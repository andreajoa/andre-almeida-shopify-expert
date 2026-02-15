"use client"
import { useTranslations, useLocale } from "next-intl"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { blogPosts } from "@/data/blog"

export default function BlogPage() {
  const t = useTranslations("blog")
  const locale = useLocale() as "en" | "pt-BR" | "es"
  const posts = blogPosts[locale] || blogPosts.en

  return (
    <div className="pt-24">
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("title")}</h1>
            <p className="text-lg text-slate-400">{t("subtitle")}</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.1}>
                <a href={`/${locale}/blog/${post.slug}`}>
                  <Card variant="gradient" className="group overflow-hidden cursor-pointer">
                    <div className="relative h-48 rounded-xl mb-4 overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    </div>
                    <Badge variant="indigo" className="mb-3">{post.category}</Badge>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{post.title}</h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <span>{new Date(post.date).toLocaleDateString(locale)}</span>
                      <span>·</span>
                      <span>{post.readTime} {t("readTime")}</span>
                    </div>
                  </Card>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

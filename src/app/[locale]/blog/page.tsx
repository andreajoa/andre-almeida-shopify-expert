"use client"

import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { Clock, Calendar, ArrowRight, Search } from "lucide-react"
import Link from "next/link"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { blogPosts } from "@/data/blog"

export default function BlogPage() {
  const t = useTranslations()
  const locale = useLocale()
  const [activeCategory, setActiveCategory] = useState("all")

  const posts = blogPosts[locale] || blogPosts["en"]

  const categories = [
    { id: "all", label: locale === "pt-BR" ? "Todos" : "All" },
    { id: "Shopify", label: "Shopify" },
    { id: "Performance", label: "Performance" },
    { id: "Marketing", label: "Marketing" },
    { id: locale === "pt-BR" ? "Desenvolvimento" : "Development", label: locale === "pt-BR" ? "Desenvolvimento" : "Development" },
    { id: "SEO", label: "SEO" },
  ]

  const filtered = activeCategory === "all"
    ? posts
    : posts.filter((p) => p.category === activeCategory)

  const categoryColors: Record<string, "indigo" | "emerald" | "purple" | "orange" | "rose"> = {
    "Shopify": "indigo",
    "Performance": "emerald",
    "Development": "purple",
    "Desenvolvimento": "purple",
    "Desarrollo": "purple",
    "Marketing": "orange",
    "SEO": "rose",
  }

  const featured = posts[0]
  const rest = filtered.length > 0 && activeCategory === "all" ? filtered.slice(1) : filtered

  return (
    <div className="pt-24">
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <AnimatedSection className="text-center mb-16">
            <Badge variant="indigo" className="mb-4">
              {locale === "pt-BR" ? "Insights & Dicas" : "Insights & Tips"}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {locale === "pt-BR" ? "Blog" : "Blog"}
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              {locale === "pt-BR"
                ? "Artigos sobre desenvolvimento Shopify, estratégias de e-commerce, marketing digital e otimização de conversão."
                : "Expert articles on Shopify development, ecommerce strategy, digital marketing, and conversion optimization."}
            </p>
          </AnimatedSection>

          {/* Category Filters */}
          <AnimatedSection className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                    : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </AnimatedSection>

          {/* Featured Post */}
          {activeCategory === "all" && featured && (
            <AnimatedSection className="mb-16">
              <Link href={`/${locale}/blog/${featured.slug}`}>
                <div className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-indigo-500/30 transition-all duration-500">
                  <div className="grid md:grid-cols-2">
                    <div className="relative h-64 md:h-[400px] overflow-hidden">
                      <img
                        src={featured.image}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950/50 md:block hidden" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent md:hidden" />
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-slate-900/90 to-slate-950/90">
                      <Badge variant="orange" className="mb-4 w-fit">
                        {locale === "pt-BR" ? "✨ Destaque" : "✨ Featured"}
                      </Badge>
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{featured.date}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{featured.readTime} {locale === "pt-BR" ? "de leitura" : "read"}</span>
                      </div>
                      <Badge variant={categoryColors[featured.category] || "indigo"} className="mb-4 w-fit">
                        {featured.category}
                      </Badge>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors leading-tight">
                        {featured.title}
                      </h2>
                      <p className="text-slate-400 leading-relaxed mb-6 line-clamp-3">
                        {featured.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-2 text-indigo-400 font-medium group-hover:gap-3 transition-all">
                        {locale === "pt-BR" ? "Ler Artigo" : "Read Article"}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          )}

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.1}>
                <Link href={`/${locale}/blog/${post.slug}`}>
                  <Card variant="gradient" className="group cursor-pointer h-full flex flex-col">
                    <div className="relative h-48 rounded-xl mb-5 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <Badge variant={categoryColors[post.category] || "indigo"}>
                          {post.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors leading-snug flex-1">
                      {post.title}
                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-2 text-sm text-indigo-400 font-medium group-hover:gap-3 transition-all mt-auto">
                      {locale === "pt-BR" ? "Ler mais" : "Read more"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Card>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">
                {locale === "pt-BR" ? "Nenhum artigo encontrado nesta categoria." : "No articles found in this category."}
              </p>
            </div>
          )}

          {/* CTA */}
          <AnimatedSection className="mt-20">
            <div className="text-center p-10 md:p-16 rounded-2xl bg-gradient-to-br from-indigo-950/80 to-purple-950/80 border border-indigo-500/20">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {locale === "pt-BR"
                  ? "Quer implementar essas estratégias na sua loja?"
                  : "Want to implement these strategies in your store?"}
              </h2>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                {locale === "pt-BR"
                  ? "Agende uma consulta gratuita e descubra como podemos escalar seu e-commerce."
                  : "Schedule a free consultation and discover how we can scale your ecommerce."}
              </p>
              <Link href={`/${locale}/contact`}>
                <Button variant="primary" size="lg">
                  {locale === "pt-BR" ? "Agendar Consulta Gratuita" : "Schedule Free Consultation"}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

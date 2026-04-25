"use client"

import { useParams } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight, MessageCircle } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { blogPosts } from "@/data/blog"
import { SITE_CONFIG } from "@/lib/constants"

export default function BlogPostPage() {
  const params = useParams()
  const locale = useLocale()
  const t = useTranslations()
  const slug = params.slug as string

  const posts = blogPosts[locale] || blogPosts["en"]
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <p className="text-slate-400 mb-8">
            {locale === "pt-BR" ? "Artigo não encontrado" : "Article not found"}
          </p>
          <Link href={`/${locale}/blog`}>
            <Button variant="primary">
              <ArrowLeft className="w-4 h-4" />
              {locale === "pt-BR" ? "Voltar ao Blog" : "Back to Blog"}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const relatedPosts = posts.filter((p) => p.slug !== slug).slice(0, 3)

  const renderContent = (content: string) => {
    const lines = content.split("\n")
    const elements: React.ReactNode[] = []
    let listItems: string[] = []
    let listKey = 0

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${listKey++}`} className="space-y-3 my-6 ml-2">
            {listItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300 leading-relaxed">
                <span className="text-emerald-400 mt-1.5 flex-shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )
        listItems = []
      }
    }

    lines.forEach((line, idx) => {
      const trimmed = line.trim()
      if (!trimmed) {
        flushList()
        return
      }

      if (trimmed.startsWith("## ")) {
        flushList()
        elements.push(
          <h2 key={idx} className="text-2xl md:text-3xl font-bold text-white mt-12 mb-6 leading-tight">
            {trimmed.replace("## ", "")}
          </h2>
        )
      } else if (trimmed.startsWith("### ")) {
        flushList()
        elements.push(
          <h3 key={idx} className="text-xl md:text-2xl font-semibold text-white mt-10 mb-4 leading-tight">
            {trimmed.replace("### ", "")}
          </h3>
        )
      } else if (trimmed.startsWith("#### ")) {
        flushList()
        elements.push(
          <h4 key={idx} className="text-lg font-semibold text-indigo-300 mt-8 mb-3">
            {trimmed.replace("#### ", "")}
          </h4>
        )
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        listItems.push(trimmed.replace(/^[-*]\s/, ""))
      } else if (trimmed.startsWith("[") && trimmed.includes("](")) {
        flushList()
        const match = trimmed.match(/\[([^\]]+)\]\(([^)]+)\)/)
        if (match) {
          elements.push(
            <div key={idx} className="my-8 p-6 rounded-2xl bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border border-indigo-500/20">
              <Link href={`/${locale}${match[2]}`}>
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  {match[1]}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          )
        }
      } else if (trimmed.startsWith("![")) {
        flushList()
        const match = trimmed.match(/!\[([^\]]*)\]\(([^)]+)\)/)
        if (match) {
          elements.push(
            <figure key={idx} className="my-8 rounded-2xl overflow-hidden border border-white/10">
              <img src={match[2]} alt={match[1]} className="w-full h-auto object-cover" loading="lazy" />
              {match[1] && (
                <figcaption className="text-center text-sm text-slate-500 py-3 bg-slate-900/50">{match[1]}</figcaption>
              )}
            </figure>
          )
        }
      } else {
        flushList()
        const processedLine = trimmed
          .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
          .replace(/`([^`]+)`/g, '<code class="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 text-sm font-mono">$1</code>')
        elements.push(
          <p key={idx} className="text-slate-300 leading-[1.85] mb-4 text-[17px]" dangerouslySetInnerHTML={{ __html: processedLine }} />
        )
      }
    })
    flushList()
    return elements
  }

  const categoryColors: Record<string, "indigo" | "emerald" | "purple" | "orange" | "rose"> = {
    "Shopify": "indigo",
    "Performance": "emerald",
    "Development": "purple",
    "Desenvolvimento": "purple",
    "Desarrollo": "purple",
    "Marketing": "orange",
    "SEO": "rose",
    "CRO": "emerald",
  }

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/90 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <Link href={`/${locale}/blog`} className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {locale === "pt-BR" ? "Voltar ao Blog" : "Back to Blog"}
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge variant={categoryColors[post.category] || "indigo"}>{post.category}</Badge>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime} {locale === "pt-BR" ? "de leitura" : "read"}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {post.title}
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Image */}
      <section className="max-w-5xl mx-auto px-6 -mt-4 mb-12">
        <AnimatedSection>
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-500/5">
            <img src={post.image} alt={post.title} className="w-full h-[300px] md:h-[450px] object-cover" />
          </div>
        </AnimatedSection>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <AnimatedSection>
          <div className="grid lg:grid-cols-[1fr_280px] gap-12">
            {/* Article */}
            <article className="min-w-0">
              {renderContent(post.content)}

              {/* Author Box */}
              <div className="mt-16 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    AA
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Andre Almeida</h4>
                    <p className="text-indigo-400 text-sm mb-2">Shopify Expert Developer</p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {locale === "pt-BR"
                        ? "6+ anos de experiência construindo lojas Shopify de alta performance. Especialista em Headless Commerce, Growth Marketing e soluções de e-commerce escaláveis."
                        : "6+ years building high-performance Shopify stores. Expert in Headless Commerce, Growth Marketing, and scalable ecommerce solutions."}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-indigo-950/80 to-purple-950/80 border border-indigo-500/20 text-center">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {locale === "pt-BR" ? "Precisa de ajuda com isso?" : "Need help with this?"}
                </h3>
                <p className="text-slate-400 mb-6 max-w-lg mx-auto">
                  {locale === "pt-BR"
                    ? "Vamos discutir como podemos implementar essas estratégias na sua loja."
                    : "Let's discuss how we can implement these strategies for your store."}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link href={`/${locale}/contact`}>
                    <Button variant="primary" size="lg">
                      {locale === "pt-BR" ? "Fale Conosco" : "Get in Touch"}
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg">
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block space-y-6">
              {/* Related Service */}
              <div className="sticky top-28 space-y-6">
                <Card variant="glass" className="!p-5">
                  <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">
                    {locale === "pt-BR" ? "Serviço Relacionado" : "Related Service"}
                  </h4>
                  <p className="text-indigo-400 font-medium mb-2">{post.relatedService}</p>
                  <Link href={`/${locale}/services`}>
                    <Button variant="primary" size="sm" className="w-full mt-2">
                      {locale === "pt-BR" ? "Ver Serviço" : "View Service"}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </Card>

                <Card variant="glass" className="!p-5">
                  <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
                    {locale === "pt-BR" ? "Outros Artigos" : "More Articles"}
                  </h4>
                  <div className="space-y-4">
                    {relatedPosts.map((rp) => (
                      <Link key={rp.slug} href={`/${locale}/blog/${rp.slug}`} className="block group">
                        <div className="flex gap-3">
                          <img src={rp.image} alt={rp.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-white text-sm font-medium line-clamp-2 group-hover:text-indigo-400 transition-colors">{rp.title}</p>
                            <p className="text-slate-500 text-xs mt-1">{rp.readTime}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Card>

                <Card variant="glass" className="!p-5">
                  <h4 className="text-white font-bold mb-2 text-sm uppercase tracking-wider">
                    {locale === "pt-BR" ? "Precisa de ajuda?" : "Need help?"}
                  </h4>
                  <p className="text-slate-400 text-sm mb-3">
                    {locale === "pt-BR" ? "Agende uma consulta gratuita" : "Schedule a free consultation"}
                  </p>
                  <Link href={`/${locale}/contact`}>
                    <Button variant="outline" size="sm" className="w-full">
                      {locale === "pt-BR" ? "Agendar Call" : "Schedule Call"}
                    </Button>
                  </Link>
                </Card>
              </div>
            </aside>
          </div>
        </AnimatedSection>
      </section>

      {/* Related Posts - Mobile */}
      <section className="lg:hidden max-w-4xl mx-auto px-6 pb-16">
        <h3 className="text-2xl font-bold text-white mb-8">
          {locale === "pt-BR" ? "Outros Artigos" : "More Articles"}
        </h3>
        <div className="grid sm:grid-cols-2 gap-6">
          {relatedPosts.slice(0, 2).map((rp) => (
            <Link key={rp.slug} href={`/${locale}/blog/${rp.slug}`}>
              <Card variant="gradient" className="group">
                <img src={rp.image} alt={rp.title} className="w-full h-40 object-cover rounded-xl mb-4" />
                <Badge variant={categoryColors[rp.category] || "indigo"} className="mb-2">{rp.category}</Badge>
                <h4 className="text-white font-bold group-hover:text-indigo-400 transition-colors">{rp.title}</h4>
                <p className="text-slate-500 text-sm mt-2">{rp.readTime} {locale === "pt-BR" ? "de leitura" : "read"}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

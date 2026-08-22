"use client"

import { useState } from "react"
import Link from "next/link"
import { useLocale } from "next-intl"
import { ArrowUpRight, Search } from "lucide-react"
import { blogPosts } from "@/data/blog"
import { Analytics } from "@/lib/analytics"
import { SITE_CONFIG } from "@/lib/constants"

export default function BlogPage() {
  const locale = useLocale() as "pt-BR" | "en"
  const lang = locale === "en" ? "en" : "pt-BR"
  const posts = blogPosts[lang] || blogPosts.en
  const [activeCategory, setActiveCategory] = useState("all")
  const categories = ["all", ...Array.from(new Set(posts.map(post => post.category)))]
  const filtered = activeCategory === "all" ? posts : posts.filter(post => post.category === activeCategory)
  const whatsappText = encodeURIComponent(lang === "pt-BR" ? "Olá André, li seus conteúdos e quero conversar sobre meu negócio." : "Hi Andre, I read your insights and want to discuss my business.")
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappText}`
  const c = lang === "pt-BR" ? {
    eyebrow: "INSIGHTS",
    title: "Ideias para quem precisa tomar decisões digitais melhores.",
    lead: "Conteúdo sobre e-commerce, desenvolvimento, performance, marketing, automação e crescimento — escrito para sair da superfície e chegar à decisão.",
    all: "Todos",
    read: "Ler artigo",
    empty: "Nenhum artigo nesta categoria.",
    final: "Informação é útil. Execução é o que muda o negócio.",
    finalText: "Se algum desses temas descreve um problema que você está vivendo agora, podemos conversar sobre a aplicação no seu cenário.",
    cta: "Falar comigo",
  } : {
    eyebrow: "INSIGHTS",
    title: "Ideas for people who need to make better digital decisions.",
    lead: "Content about ecommerce, development, performance, marketing, automation and growth — written to move from surface-level information to decisions.",
    all: "All",
    read: "Read article",
    empty: "No articles in this category.",
    final: "Information is useful. Execution is what changes the business.",
    finalText: "If one of these topics describes a problem you are facing right now, we can discuss how it applies to your scenario.",
    cta: "Talk to me",
  }

  return (
    <div className="min-h-screen bg-[#f2efe8] pt-20 text-[#11110f]">
      <section className="border-b border-[#d4cec2] py-20 md:py-28 lg:py-36">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a7658]">{c.eyebrow}</p>
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.72fr_0.28fr] lg:items-end"><h1 className="max-w-6xl font-editorial text-[clamp(3.6rem,7vw,7.2rem)] leading-[0.88] tracking-[-0.055em]">{c.title}</h1><p className="text-base leading-8 text-[#625e56]">{c.lead}</p></div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
          <div className="flex flex-wrap gap-x-6 gap-y-3 border-b border-[#cec7ba] pb-5">{categories.map(category => <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`text-[9px] font-semibold uppercase tracking-[0.14em] transition ${activeCategory === category ? "text-[#11110f]" : "text-[#918a80] hover:text-[#11110f]"}`}>{category === "all" ? c.all : category}</button>)}</div>

          {filtered.length > 0 ? (
            <div className="divide-y divide-[#cec7ba] border-b border-[#cec7ba]">
              {filtered.map((post, index) => (
                <Link key={post.slug} href={`/${locale}/blog/${post.slug}`} className="group grid gap-5 py-8 sm:grid-cols-[0.12fr_0.22fr_0.56fr_0.1fr] sm:items-start md:py-10">
                  <span className="text-[9px] font-semibold tracking-[0.16em] text-[#a88c61]">{String(index + 1).padStart(2, "0")}</span>
                  <div><p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[#807a70]">{post.category}</p><p className="mt-2 text-xs text-[#918a80]">{post.date} · {post.readTime}</p></div>
                  <div><h2 className="max-w-3xl font-editorial text-3xl leading-[1.02] tracking-[-0.035em] transition group-hover:text-[#7b6748] sm:text-4xl">{post.title}</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-[#68635b]">{post.excerpt}</p><span className="mt-5 inline-block border-b border-[#11110f] pb-1 text-[9px] font-semibold uppercase tracking-[0.13em]">{c.read}</span></div>
                  <ArrowUpRight className="h-5 w-5 justify-self-end transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          ) : <div className="py-24 text-center"><Search className="mx-auto h-7 w-7 text-[#9a948a]" /><p className="mt-5 text-sm text-[#68635b]">{c.empty}</p></div>}
        </div>
      </section>

      <section className="mt-8 bg-[#11110f] py-24 text-white md:py-32"><div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-10 px-5 sm:px-8 lg:flex-row lg:items-end lg:px-10 xl:px-14"><div><h2 className="max-w-4xl font-editorial text-[clamp(3rem,5.6vw,5.8rem)] leading-[0.92] tracking-[-0.05em]">{c.final}</h2><p className="mt-6 max-w-xl text-sm leading-7 text-white/50">{c.finalText}</p></div><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => Analytics.whatsappClick("blog_final")} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#f2efe8] px-7 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#11110f]">{c.cta}<ArrowUpRight className="h-4 w-4" /></a></div></section>
    </div>
  )
}

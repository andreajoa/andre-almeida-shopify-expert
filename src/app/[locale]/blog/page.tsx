"use client"

import { useState } from "react"
import { useLocale } from "next-intl"
import Link from "next/link"
import { ArrowUpRight, Clock, Search } from "lucide-react"
import { blogPosts } from "@/data/blog"

export default function BlogPage() {
  const locale = useLocale()
  const isPt = locale !== "en"
  const lang = isPt ? "pt-BR" : "en"
  const posts = blogPosts[lang] || blogPosts.en
  const categories = ["all", ...Array.from(new Set(posts.map(post => post.category)))]
  const [active, setActive] = useState("all")
  const [query, setQuery] = useState("")
  const filtered = posts.filter(post => (active === "all" || post.category === active) && `${post.title} ${post.excerpt}`.toLowerCase().includes(query.toLowerCase()))

  return <main className="bg-[#f2efe8] text-[#11110f]">
    <section className="border-b border-[#d4cec2] px-5 pb-20 pt-36 sm:px-8 md:pb-28 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1500px]"><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#77736b]">INSIGHTS · COMMERCE · TECHNOLOGY</p><div className="mt-8 grid gap-10 lg:grid-cols-[.7fr_.3fr] lg:items-end"><h1 className="font-editorial text-[clamp(3.5rem,7vw,7.5rem)] leading-[.88] tracking-[-.05em]">{isPt ? "Conteúdo para entender melhor" : "Ideas to better understand"} <span className="italic text-[#5f6559]">{isPt ? "o que realmente move o digital." : "what actually moves digital business."}</span></h1><p className="text-base leading-8 text-[#625e56]">{isPt ? "Artigos sobre e-commerce, tecnologia, performance, marketing, SEO e decisões que afetam crescimento e conversão." : "Articles about ecommerce, technology, performance, marketing, SEO and the decisions that affect growth and conversion."}</p></div></div></section>

    <section className="px-5 py-16 sm:px-8 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1500px]"><div className="flex flex-col gap-6 border-b border-[#d4cec2] pb-8 lg:flex-row lg:items-center lg:justify-between"><div className="flex flex-wrap gap-2">{categories.map(cat=><button key={cat} type="button" onClick={()=>setActive(cat)} className={`min-h-10 rounded-full border px-4 text-[9px] font-semibold uppercase tracking-[.12em] ${active===cat?"border-[#11110f] bg-[#11110f] text-white":"border-[#cfc8bc] text-[#666259]"}`}>{cat === "all" ? (isPt?"Todos":"All") : cat}</button>)}</div><label className="flex min-h-11 items-center gap-3 border-b border-[#cfc8bc] px-1"><Search className="h-4 w-4 text-[#77736b]"/><input value={query} onChange={e=>setQuery(e.target.value)} className="w-64 bg-transparent text-sm outline-none placeholder:text-[#99938a]" placeholder={isPt?"Buscar artigos":"Search articles"}/></label></div>

      <div className="divide-y divide-[#d4cec2] border-b border-[#d4cec2]">{filtered.map((post,index)=><Link key={post.slug} href={`/${lang}/blog/${post.slug}`} className="group grid gap-6 py-9 md:grid-cols-[.08fr_.22fr_.55fr_.15fr] md:items-start"><span className="font-editorial text-2xl text-[#a08967]">{String(index+1).padStart(2,"0")}</span><div><span className="text-[9px] font-semibold uppercase tracking-[.14em] text-[#77736b]">{post.category}</span><p className="mt-2 flex items-center gap-2 text-xs text-[#8b857b]"><Clock className="h-3.5 w-3.5"/>{post.readTime}</p></div><div><h2 className="font-editorial text-3xl leading-[1] tracking-[-.03em] transition group-hover:text-[#5f6559] sm:text-4xl">{post.title}</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-[#666259]">{post.excerpt}</p></div><div className="flex justify-end"><span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#cfc8bc] transition group-hover:border-[#11110f] group-hover:bg-[#11110f] group-hover:text-white"><ArrowUpRight className="h-4 w-4"/></span></div></Link>)}</div>
      {filtered.length===0?<p className="py-16 text-center font-editorial text-3xl text-[#77736b]">{isPt?"Nenhum artigo encontrado.":"No articles found."}</p>:null}
    </div></section>
  </main>
}

"use client"

import { useParams } from "next/navigation"
import { useLocale } from "next-intl"
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react"
import Link from "next/link"
import { blogPosts } from "@/data/blog"
import { SITE_CONFIG } from "@/lib/constants"
import { Analytics } from "@/lib/analytics"

export default function BlogPostPage() {
  const params = useParams()
  const locale = useLocale() as "pt-BR" | "en"
  const lang = locale === "en" ? "en" : "pt-BR"
  const slug = params.slug as string
  const posts = blogPosts[lang] || blogPosts.en
  const post = posts.find(item => item.slug === slug)

  if (!post) {
    return <div className="flex min-h-screen items-center justify-center bg-[#f2efe8] px-5 pt-20 text-[#11110f]"><div className="text-center"><p className="font-editorial text-8xl">404</p><p className="mt-4 text-sm text-[#68635b]">{lang === "pt-BR" ? "Artigo não encontrado." : "Article not found."}</p><Link href={`/${locale}/blog`} className="mt-8 inline-flex items-center gap-3 border-b border-[#11110f] pb-2 text-[10px] font-semibold uppercase tracking-[0.14em]"><ArrowLeft className="h-4 w-4" />{lang === "pt-BR" ? "Voltar aos insights" : "Back to insights"}</Link></div></div>
  }

  const related = posts.filter(item => item.slug !== slug).slice(0, 3)
  const whatsappText = encodeURIComponent(lang === "pt-BR" ? `Olá André, li seu artigo “${post.title}” e quero conversar sobre meu negócio.` : `Hi Andre, I read “${post.title}” and want to discuss my business.`)
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappText}`

  function renderContent(content: string) {
    const lines = content.split("\n")
    const nodes: React.ReactNode[] = []
    let list: string[] = []
    let listIndex = 0

    const flush = () => {
      if (!list.length) return
      nodes.push(<ul key={`list-${listIndex++}`} className="my-8 space-y-3 border-y border-[#d4cec2] py-6">{list.map((item, index) => <li key={index} className="flex items-start gap-3 text-[15px] leading-7 text-[#56524b]"><Check className="mt-1.5 h-3.5 w-3.5 shrink-0 text-[#a88c61]" /><span>{item}</span></li>)}</ul>)
      list = []
    }

    lines.forEach((line, index) => {
      const value = line.trim()
      if (!value) { flush(); return }
      if (value.startsWith("![")) { flush(); return }
      if (value.startsWith("## ")) { flush(); nodes.push(<h2 key={index} className="mt-14 font-editorial text-4xl leading-[1.02] tracking-[-0.04em] sm:text-5xl">{value.slice(3)}</h2>); return }
      if (value.startsWith("### ")) { flush(); nodes.push(<h3 key={index} className="mt-11 font-editorial text-3xl tracking-[-0.035em]">{value.slice(4)}</h3>); return }
      if (value.startsWith("#### ")) { flush(); nodes.push(<h4 key={index} className="mt-9 text-xs font-semibold uppercase tracking-[0.14em] text-[#8a7658]">{value.slice(5)}</h4>); return }
      if (value.startsWith("- ") || value.startsWith("* ")) { list.push(value.replace(/^[-*]\s/, "")); return }
      const linkMatch = value.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (linkMatch) { flush(); const href = linkMatch[2].startsWith("http") ? linkMatch[2] : `/${locale}${linkMatch[2]}`; nodes.push(<a key={index} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="my-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#11110f] px-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">{linkMatch[1]}<ArrowUpRight className="h-4 w-4" /></a>); return }
      flush()
      const processed = value.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-[#11110f]">$1</strong>').replace(/`([^`]+)`/g, '<code class="bg-[#e7e2d8] px-1.5 py-0.5 text-[0.9em]">$1</code>')
      nodes.push(<p key={index} className="mt-5 text-[16px] leading-[1.9] text-[#56524b]" dangerouslySetInnerHTML={{ __html: processed }} />)
    })
    flush()
    return nodes
  }

  return (
    <article className="min-h-screen bg-[#f2efe8] pt-20 text-[#11110f]">
      <header className="border-b border-[#d4cec2] py-16 md:py-24 lg:py-28"><div className="mx-auto max-w-5xl px-5 sm:px-8"><Link href={`/${locale}/blog`} className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#817b71]"><ArrowLeft className="h-3.5 w-3.5" />{lang === "pt-BR" ? "Insights" : "Insights"}</Link><p className="mt-12 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#a88c61]">{post.category} · {post.date} · {post.readTime}</p><h1 className="mt-6 font-editorial text-[clamp(3.2rem,6.7vw,6.8rem)] leading-[0.9] tracking-[-0.055em]">{post.title}</h1><p className="mt-8 max-w-3xl text-lg leading-8 text-[#68635b]">{post.excerpt}</p></div></header>

      <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.72fr_0.28fr] lg:py-24">
        <div className="max-w-3xl">{renderContent(post.content)}</div>
        <aside><div className="sticky top-28 border-l border-[#d4cec2] pl-7"><p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8a7658]">{lang === "pt-BR" ? "APLICAR NO SEU NEGÓCIO" : "APPLY TO YOUR BUSINESS"}</p><p className="mt-5 font-editorial text-3xl leading-[1.02]">{lang === "pt-BR" ? "Conteúdo ajuda a entender. A execução resolve." : "Content helps you understand. Execution solves it."}</p><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => Analytics.whatsappClick("blog_article")} className="mt-7 inline-flex items-center gap-3 border-b border-[#11110f] pb-2 text-[9px] font-semibold uppercase tracking-[0.13em]">{lang === "pt-BR" ? "Falar comigo" : "Talk to me"}<ArrowUpRight className="h-4 w-4" /></a></div></aside>
      </div>

      <section className="border-t border-[#d4cec2] py-20 md:py-24"><div className="mx-auto max-w-[1180px] px-5 sm:px-8"><p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#817b71]">{lang === "pt-BR" ? "CONTINUE LENDO" : "KEEP READING"}</p><div className="mt-8 divide-y divide-[#d4cec2] border-y border-[#d4cec2]">{related.map((item, index) => <Link key={item.slug} href={`/${locale}/blog/${item.slug}`} className="group grid gap-4 py-7 sm:grid-cols-[0.08fr_0.82fr_0.1fr]"><span className="text-[9px] text-[#a88c61]">0{index + 1}</span><div><p className="text-[9px] uppercase tracking-[0.13em] text-[#817b71]">{item.category}</p><h2 className="mt-2 font-editorial text-3xl tracking-[-0.035em]">{item.title}</h2></div><ArrowUpRight className="h-4 w-4 justify-self-end transition group-hover:-translate-y-1 group-hover:translate-x-1" /></Link>)}</div></div></section>
    </article>
  )
}

"use client"

import { useParams } from "next/navigation"
import { useLocale } from "next-intl"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Calendar, Check, Clock } from "lucide-react"
import { blogPosts } from "@/data/blog"
import { SITE_CONFIG } from "@/lib/constants"

export default function BlogPostPage() {
  const params = useParams()
  const locale = useLocale()
  const isPt = locale !== "en"
  const lang = isPt ? "pt-BR" : "en"
  const slug = params.slug as string
  const posts = blogPosts[lang] || blogPosts.en
  const post = posts.find(item => item.slug === slug)

  if (!post) return <main className="flex min-h-screen items-center justify-center bg-[#f2efe8] px-5 text-[#11110f]"><div className="text-center"><p className="font-editorial text-7xl">404</p><p className="mt-4 text-sm text-[#666259]">{isPt?"Artigo não encontrado":"Article not found"}</p><Link href={`/${lang}/blog`} className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#11110f] px-6 text-[10px] font-semibold uppercase tracking-[.14em] text-white"><ArrowLeft className="h-4 w-4"/>{isPt?"Voltar ao blog":"Back to blog"}</Link></div></main>

  const whatsapp = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(isPt ? `Olá André, li o artigo “${post.title}” e quero conversar sobre meu projeto.` : `Hi Andre, I read “${post.title}” and want to discuss my project.`)}`
  const related = posts.filter(item => item.slug !== slug).slice(0, 3)

  const renderContent = (content: string) => {
    const elements: React.ReactNode[] = []
    let list: string[] = []
    let listId = 0
    const flush = () => {
      if (!list.length) return
      elements.push(<ul key={`list-${listId++}`} className="my-8 space-y-3">{list.map((item,i)=><li key={i} className="flex items-start gap-3 text-[16px] leading-8 text-[#555149]"><Check className="mt-2 h-4 w-4 shrink-0 text-[#a08967]"/><span>{item}</span></li>)}</ul>)
      list = []
    }

    content.split("\n").forEach((line,index) => {
      const text = line.trim()
      if (!text) { flush(); return }
      if (text.startsWith("![")) return
      if (text.startsWith("## ")) { flush(); elements.push(<h2 key={index} className="mb-6 mt-16 font-editorial text-4xl leading-[1] tracking-[-.035em] sm:text-5xl">{text.slice(3)}</h2>); return }
      if (text.startsWith("### ")) { flush(); elements.push(<h3 key={index} className="mb-4 mt-12 font-editorial text-3xl leading-[1] tracking-[-.03em]">{text.slice(4)}</h3>); return }
      if (text.startsWith("#### ")) { flush(); elements.push(<h4 key={index} className="mb-3 mt-10 text-sm font-semibold uppercase tracking-[.12em] text-[#a08967]">{text.slice(5)}</h4>); return }
      if (text.startsWith("- ") || text.startsWith("* ")) { list.push(text.replace(/^[-*]\s/, "")); return }
      if (text.startsWith("[") && text.includes("](")) { flush(); const match=text.match(/\[([^\]]+)\]\(([^)]+)\)/); if(match) elements.push(<Link key={index} href={`/${lang}${match[2]}`} className="my-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#11110f] px-6 text-[10px] font-semibold uppercase tracking-[.14em] text-white">{match[1]}<ArrowUpRight className="h-4 w-4"/></Link>); return }
      flush()
      const html = text.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-[#11110f]">$1</strong>').replace(/`([^`]+)`/g, '<code class="bg-[#e5dfd3] px-1.5 py-0.5 text-sm">$1</code>')
      elements.push(<p key={index} className="mb-5 text-[16px] leading-8 text-[#555149] sm:text-[17px]" dangerouslySetInnerHTML={{__html:html}}/>)
    })
    flush()
    return elements
  }

  return <main className="bg-[#f2efe8] text-[#11110f]">
    <article>
      <header className="border-b border-[#d4cec2] px-5 pb-20 pt-36 sm:px-8 md:pb-28 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1100px]"><Link href={`/${lang}/blog`} className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[.13em] text-[#77736b]"><ArrowLeft className="h-4 w-4"/>{isPt?"Voltar aos insights":"Back to insights"}</Link><p className="mt-12 text-[9px] font-semibold uppercase tracking-[.15em] text-[#a08967]">{post.category}</p><h1 className="mt-6 font-editorial text-[clamp(3.2rem,6vw,6rem)] leading-[.92] tracking-[-.045em]">{post.title}</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-[#625e56]">{post.excerpt}</p><div className="mt-8 flex flex-wrap gap-6 text-xs text-[#817c72]"><span className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5"/>{post.date}</span><span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5"/>{post.readTime}</span></div></div></header>

      <div className="px-5 py-16 sm:px-8 md:py-24"><div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[.72fr_.28fr]"><div className="max-w-[780px]">{renderContent(post.content)}</div><aside className="lg:sticky lg:top-28 lg:self-start"><div className="border-t border-[#d4cec2] pt-6"><p className="text-[9px] font-semibold uppercase tracking-[.15em] text-[#77736b]">{isPt?"PRECISA RESOLVER ISSO NO SEU NEGÓCIO?":"NEED TO SOLVE THIS IN YOUR BUSINESS?"}</p><p className="mt-5 font-editorial text-3xl leading-[1]">{isPt?"Transforme a leitura em uma decisão prática.":"Turn the insight into a practical decision."}</p><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#11110f] px-6 text-[10px] font-semibold uppercase tracking-[.14em] text-white">{isPt?"Falar comigo":"Talk to me"}<ArrowUpRight className="h-4 w-4"/></a></div></aside></div></div>
    </article>

    <section className="border-t border-[#d4cec2] px-5 py-20 sm:px-8 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1400px]"><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#77736b]">{isPt?"CONTINUE LENDO":"KEEP READING"}</p><div className="mt-8 divide-y divide-[#d4cec2] border-y border-[#d4cec2]">{related.map((item,index)=><Link key={item.slug} href={`/${lang}/blog/${item.slug}`} className="group grid gap-5 py-7 md:grid-cols-[.08fr_.72fr_.2fr] md:items-center"><span className="font-editorial text-2xl text-[#a08967]">0{index+1}</span><div><span className="text-[9px] font-semibold uppercase tracking-[.13em] text-[#77736b]">{item.category}</span><h2 className="mt-2 font-editorial text-2xl sm:text-3xl">{item.title}</h2></div><div className="flex justify-end"><ArrowUpRight className="h-5 w-5 text-[#817c72] transition group-hover:text-[#11110f]"/></div></Link>)}</div></div></section>
  </main>
}

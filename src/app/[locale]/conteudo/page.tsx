import Image from "next/image"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ArrowUpRight, BookOpen, Bot, BriefcaseBusiness, Globe2, MessageCircle, ShoppingBag, Sparkles } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

type Props = { params: Promise<{ locale: string }> }
type ContentLink = readonly [string, string, string, LucideIcon]

export default async function ConteudoPage({ params }: Props) {
  const { locale } = await params
  const isPt = locale !== "en"
  const lang = isPt ? "pt-BR" : "en"
  const whatsapp = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(isPt ? "Olá André, vim pelo seu conteúdo e quero saber mais sobre seus serviços." : "Hi Andre, I came through your content hub and want to know more about your services.")}`
  const links: readonly ContentLink[] = isPt ? [
    ["Sites & E-commerce", "Estrutura digital completa para empresas e lojas", `/${lang}/websites-ecommerce`, ShoppingBag],
    ["Website para empresas", "Presença, captação, SEO e dados", `/${lang}/website-para-empresas`, Globe2],
    ["E-commerce próprio", "Venda online com maior controle da infraestrutura", `/${lang}/ecommerce-proprio`, ShoppingBag],
    ["Vender livros online", "Estrutura para autores, obras e audiência própria", `/${lang}/vender-livros-online`, BookOpen],
    ["Autoridade online", "Posicionamento, prova, SEO/GEO e entidade digital", `/${lang}/autoridade-online`, Sparkles],
    ["Portfólio", "Projetos selecionados", `/${lang}/portfolio`, BriefcaseBusiness],
    ["NOVA AI", "Produto de IA para criação de vídeos", "https://www.novvideos.online/", Bot],
    ["Falar comigo", "Contato direto pelo WhatsApp", whatsapp, MessageCircle],
  ] : [
    ["Websites & Ecommerce", "Complete digital infrastructure for businesses and stores", `/${lang}/websites-ecommerce`, ShoppingBag],
    ["Business websites", "Presence, capture, SEO and data", `/${lang}/website-para-empresas`, Globe2],
    ["Owned ecommerce", "Online sales with greater infrastructure control", `/${lang}/ecommerce-proprio`, ShoppingBag],
    ["Sell books online", "Infrastructure for authors, books and owned audiences", `/${lang}/vender-livros-online`, BookOpen],
    ["Online authority", "Positioning, proof, SEO/GEO and digital entity", `/${lang}/autoridade-online`, Sparkles],
    ["Portfolio", "Selected projects", `/${lang}/portfolio`, BriefcaseBusiness],
    ["NOVA AI", "AI product for video creation", "https://www.novvideos.online/", Bot],
    ["Talk to me", "Direct contact through WhatsApp", whatsapp, MessageCircle],
  ]

  return <main className="min-h-screen bg-[#f2efe8] px-5 py-10 text-[#11110f] sm:px-8">
    <div className="mx-auto max-w-2xl">
      <header className="text-center"><div className="mx-auto h-24 w-24 overflow-hidden rounded-full border border-[#cfc8bc] bg-[#11110f]"><Image src="/images/andre3-small.jpg" alt="André Almeida" width={160} height={200} quality={80} className="h-full w-full object-cover object-[center_18%]" priority/></div><p className="mt-6 text-[9px] font-semibold uppercase tracking-[.18em] text-[#a08967]">ANDRÉ ALMEIDA</p><h1 className="mt-3 font-editorial text-4xl leading-[.95] tracking-[-.04em] sm:text-5xl">{isPt?"Estratégia, commerce e sistemas digitais.":"Strategy, commerce and digital systems."}</h1><p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#666259]">{isPt?"Websites · E-commerce · Automação · IA · SEO/GEO · Autoridade":"Websites · Ecommerce · Automation · AI · SEO/GEO · Authority"}</p><div className="mt-5 flex justify-center gap-2"><Link href="/pt-BR/conteudo" className={`rounded-full border px-4 py-2 text-[9px] font-semibold tracking-[.12em] ${isPt?"border-[#11110f] bg-[#11110f] text-white":"border-[#cfc8bc]"}`}>PT</Link><Link href="/en/conteudo" className={`rounded-full border px-4 py-2 text-[9px] font-semibold tracking-[.12em] ${!isPt?"border-[#11110f] bg-[#11110f] text-white":"border-[#cfc8bc]"}`}>EN</Link></div></header>

      <div className="mt-10 divide-y divide-[#d4cec2] border-y border-[#d4cec2]">{links.map(([title,desc,href,Icon],index)=>{const external=href.startsWith("http");const cls="group flex items-center gap-4 py-5";const body=<><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#cfc8bc]"><Icon className="h-4 w-4 text-[#5f6559]"/></span><span className="min-w-0 flex-1"><span className="block font-editorial text-2xl leading-none">{title}</span><span className="mt-1.5 block text-xs leading-5 text-[#77736b]">{desc}</span></span><span className="text-[9px] text-[#a08967]">0{index+1}</span><ArrowUpRight className="h-4 w-4 text-[#817c72]"/></>;return external?<a key={title} href={href} target="_blank" rel="noopener noreferrer" className={cls}>{body}</a>:<Link key={title} href={href} className={cls}>{body}</Link>})}</div>
      <footer className="mt-8 text-center"><Link href={`/${lang}`} className="text-[9px] font-semibold uppercase tracking-[.14em] text-[#77736b]">andre-almeida.online</Link></footer>
    </div>
  </main>
}

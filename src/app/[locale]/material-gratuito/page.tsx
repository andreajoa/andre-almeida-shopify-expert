import Link from "next/link"
import { ArrowUpRight, Check, Download, Sparkles } from "lucide-react"

type Props = { params: Promise<{ locale: string }> }

export default async function MaterialGratuitoPage({ params }: Props) {
  const { locale } = await params
  const isPt = locale !== "en"
  const lang = isPt ? "pt-BR" : "en"
  const resources = isPt ? [
    { title: "Checklist de Presença Digital", text: "Uma auditoria rápida para identificar se site, oferta, prova, CTA, SEO, dados e captação estão trabalhando juntos.", status: "Disponível em breve" },
    { title: "Mapa de Conversão para Websites", text: "Os pontos que precisam existir entre a primeira visita e o contato comercial para reduzir perda de intenção.", status: "Disponível em breve" },
    { title: "Guia de Autoridade Online", text: "Como organizar uma fonte oficial com posicionamento, prova, conteúdo e sinais que pessoas e sistemas de busca conseguem entender.", status: "Disponível em breve" },
  ] : [
    { title: "Digital Presence Checklist", text: "A quick audit to see whether website, offer, proof, CTA, SEO, data and capture work together.", status: "Coming soon" },
    { title: "Website Conversion Map", text: "The points that should exist between a first visit and a commercial conversation to reduce lost intent.", status: "Coming soon" },
    { title: "Online Authority Guide", text: "How to organize an official source with positioning, proof, content and signals people and search systems can understand.", status: "Coming soon" },
  ]

  return <main className="bg-[#f2efe8] text-[#11110f]">
    <section className="border-b border-[#d4cec2] px-5 pb-24 pt-36 sm:px-8 md:pb-32 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1500px]"><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#77736b]">{isPt?"MATERIAL GRATUITO · RECURSOS":"FREE RESOURCES · GUIDES"}</p><div className="mt-8 grid gap-12 lg:grid-cols-[.68fr_.32fr] lg:items-end"><h1 className="font-editorial text-[clamp(3.5rem,7vw,7.5rem)] leading-[.88] tracking-[-.05em]">{isPt?"Material para transformar informação em":"Resources designed to turn information into"} <span className="italic text-[#5f6559]">{isPt?"decisão prática.":"practical decisions."}</span></h1><p className="text-base leading-8 text-[#625e56]">{isPt?"Checklists e guias sobre presença digital, conversão, e-commerce, autoridade e automação — sem transformar cada tema em uma coleção de jargões.":"Checklists and guides about digital presence, conversion, ecommerce, authority and automation — without turning every topic into a collection of buzzwords."}</p></div></div></section>

    <section className="px-5 py-24 sm:px-8 md:py-32 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1500px]"><div className="grid border-y border-[#d4cec2] lg:grid-cols-3">{resources.map((item,index)=><article key={item.title} className={`flex min-h-[380px] flex-col p-7 sm:p-9 ${index>0?"border-t border-[#d4cec2] lg:border-l lg:border-t-0":""}`}><div className="flex items-center justify-between"><span className="font-editorial text-2xl text-[#a08967]">0{index+1}</span><Download className="h-5 w-5 text-[#5f6559]"/></div><h2 className="mt-12 font-editorial text-4xl leading-[.98] tracking-[-.035em]">{item.title}</h2><p className="mt-5 text-sm leading-7 text-[#666259]">{item.text}</p><div className="mt-auto pt-10"><span className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[.13em] text-[#817c72]"><Check className="h-4 w-4 text-[#a08967]"/>{item.status}</span></div></article>)}</div></div></section>

    <section className="bg-[#11110f] px-5 py-24 text-white sm:px-8 md:py-32 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1400px]"><Sparkles className="h-6 w-6 text-[#c7b18d]"/><h2 className="mt-8 max-w-5xl font-editorial text-[clamp(3rem,6vw,6rem)] leading-[.92] tracking-[-.045em]">{isPt?"Enquanto os materiais chegam, você pode começar pelo diagnóstico do seu próprio negócio.":"While these resources are being prepared, start with the diagnosis of your own business."}</h2><Link href={`/${lang}/contact`} className="mt-10 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#f2efe8] px-7 text-[10px] font-semibold uppercase tracking-[.14em] text-[#11110f]">{isPt?"Conversar sobre meu projeto":"Discuss my project"}<ArrowUpRight className="h-4 w-4"/></Link></div></section>
  </main>
}

import Link from "next/link"
import { ArrowUpRight, Sparkles } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

export type IntentPageContent = {
  eyebrow: string
  title: string
  italic: string
  lead: string
  painsTitle: string
  pains: string[]
  outcomesTitle: string
  outcomes: { title: string; text: string }[]
  faqTitle: string
  faqs: [string, string][]
  finalTitle: string
  finalText: string
  whatsappText: string
  primary: string
  secondary: string
}

export function IntentLandingPage({ locale, slug, content }: { locale: "pt-BR" | "en"; slug: string; content: IntentPageContent }) {
  const whatsapp = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(content.whatsappText)}`
  const currentUrl = `https://andre-almeida.online/${locale}/${slug}`
  const pageName = `${content.title} ${content.italic}`
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: content.faqs.map(([q,a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${currentUrl}#service`,
    name: pageName,
    url: currentUrl,
    provider: { "@id": "https://andre-almeida.online/#business" },
    areaServed: locale === "pt-BR" ? { "@type": "Country", name: "Brazil" } : [{ "@type": "Country", name: "Brazil" }, { "@type": "AdministrativeArea", name: "Worldwide" }],
    description: content.lead,
  }
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "pt-BR" ? "Início" : "Home", item: `https://andre-almeida.online/${locale}` },
      { "@type": "ListItem", position: 2, name: locale === "pt-BR" ? "Serviços" : "Services", item: `https://andre-almeida.online/${locale}/services` },
      { "@type": "ListItem", position: 3, name: pageName, item: currentUrl },
    ],
  }

  return <main className="bg-[#f2efe8] text-[#11110f]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <section className="border-b border-[#d4cec2] px-5 pb-24 pt-36 sm:px-8 md:pb-32 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1500px]"><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#77736b]">{content.eyebrow}</p><h1 className="mt-8 max-w-6xl font-editorial text-[clamp(3.4rem,7vw,7.5rem)] leading-[.89] tracking-[-.05em]">{content.title} <span className="italic text-[#5f6559]">{content.italic}</span></h1><div className="mt-10 grid gap-8 border-t border-[#d4cec2] pt-8 lg:grid-cols-[.65fr_.35fr]"><p className="max-w-3xl text-base leading-8 text-[#625e56] sm:text-lg">{content.lead}</p><div className="flex flex-col gap-3"><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-between rounded-full bg-[#11110f] px-6 text-[10px] font-semibold uppercase tracking-[.14em] text-white">{content.primary}<ArrowUpRight className="h-4 w-4"/></a><Link href={`/${locale}/contact`} className="inline-flex min-h-14 items-center justify-between rounded-full border border-[#11110f]/25 px-6 text-[10px] font-semibold uppercase tracking-[.14em]">{content.secondary}<ArrowUpRight className="h-4 w-4"/></Link></div></div></div></section>
    <section className="px-5 py-24 sm:px-8 md:py-32 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1500px]"><h2 className="max-w-5xl font-editorial text-[clamp(2.8rem,5.5vw,5.7rem)] leading-[.93] tracking-[-.045em]">{content.painsTitle}</h2><div className="mt-14 grid border-y border-[#d4cec2] md:grid-cols-2">{content.pains.map((pain,i)=><div key={pain} className={`flex min-h-28 items-start gap-4 py-7 md:px-7 ${i%2===1?"md:border-l md:border-[#d4cec2]":""} ${i>1?"border-t border-[#d4cec2]":""}`}><span className="font-editorial text-2xl text-[#a08967]">0{i+1}</span><p className="max-w-xl text-sm leading-7 text-[#625e56]">{pain}</p></div>)}</div></div></section>
    <section className="bg-[#11110f] px-5 py-24 text-white sm:px-8 md:py-32 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1500px]"><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#c7b18d]">STRATEGY → EXECUTION</p><h2 className="mt-8 max-w-5xl font-editorial text-[clamp(2.8rem,5.5vw,5.7rem)] leading-[.93] tracking-[-.045em]">{content.outcomesTitle}</h2><div className="mt-14 grid border border-white/10 md:grid-cols-2 lg:grid-cols-4">{content.outcomes.map((item,i)=><div key={item.title} className="min-h-72 border-b border-white/10 p-7 md:border-r"><span className="text-[9px] font-semibold tracking-[.15em] text-[#c7b18d]">0{i+1}</span><h3 className="mt-10 font-editorial text-3xl">{item.title}</h3><p className="mt-4 text-sm leading-7 text-white/55">{item.text}</p></div>)}</div></div></section>
    <section className="px-5 py-24 sm:px-8 md:py-32 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1100px]"><h2 className="font-editorial text-[clamp(2.8rem,5vw,5rem)] leading-[.95] tracking-[-.04em]">{content.faqTitle}</h2><div className="mt-12 divide-y divide-[#d4cec2] border-y border-[#d4cec2]">{content.faqs.map(([q,a])=><div key={q} className="grid gap-4 py-8 md:grid-cols-[.4fr_.6fr]"><h3 className="font-editorial text-2xl">{q}</h3><p className="text-sm leading-7 text-[#625e56]">{a}</p></div>)}</div></div></section>
    <section className="border-t border-[#d4cec2] bg-[#e7e2d8] px-5 py-24 sm:px-8 md:py-32 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1400px]"><Sparkles className="h-6 w-6 text-[#a08967]"/><h2 className="mt-8 max-w-5xl font-editorial text-[clamp(3rem,6vw,6rem)] leading-[.92] tracking-[-.045em]">{content.finalTitle}</h2><div className="mt-10 flex flex-col gap-8 border-t border-[#cfc8bc] pt-8 md:flex-row md:items-center md:justify-between"><p className="max-w-2xl text-base leading-7 text-[#625e56]">{content.finalText}</p><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center gap-3 rounded-full bg-[#11110f] px-6 text-[10px] font-semibold uppercase tracking-[.14em] text-white">{content.primary}<ArrowUpRight className="h-4 w-4"/></a></div></div></section>
  </main>
}

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function LegalPage({ locale, eyebrow, title, updated, sections }: { locale: "pt-BR" | "en"; eyebrow: string; title: string; updated: string; sections: { title: string; paragraphs: string[] }[] }) {
  const isPt = locale === "pt-BR"
  return <main className="bg-[#f2efe8] text-[#11110f]">
    <header className="border-b border-[#d4cec2] px-5 pb-16 pt-36 sm:px-8 md:pb-20 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1100px]"><Link href={`/${locale}`} className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[.13em] text-[#77736b]"><ArrowLeft className="h-4 w-4"/>{isPt?"Voltar ao início":"Back home"}</Link><p className="mt-12 text-[10px] font-semibold uppercase tracking-[.2em] text-[#a08967]">{eyebrow}</p><h1 className="mt-6 font-editorial text-[clamp(3.5rem,7vw,6.7rem)] leading-[.9] tracking-[-.045em]">{title}</h1><p className="mt-6 text-xs uppercase tracking-[.12em] text-[#817c72]">{updated}</p></div></header>
    <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1100px] divide-y divide-[#d4cec2] border-y border-[#d4cec2]">{sections.map((section,index)=><article key={section.title} className="grid gap-5 py-9 md:grid-cols-[.08fr_.32fr_.6fr]"><span className="font-editorial text-2xl text-[#a08967]">{String(index+1).padStart(2,"0")}</span><h2 className="font-editorial text-2xl leading-[1.05] sm:text-3xl">{section.title}</h2><div className="space-y-4">{section.paragraphs.map((p,i)=><p key={i} className="text-sm leading-7 text-[#625e56]">{p}</p>)}</div></article>)}</div></section>
  </main>
}

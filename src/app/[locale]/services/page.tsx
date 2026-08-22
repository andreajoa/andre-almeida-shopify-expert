import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Bot, ChartNoAxesCombined, Code2, Database, Mail, Search, ShoppingBag, Sparkles, Target, Workflow } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

type Props = { params: Promise<{ locale: string }> }

const copy = {
  "pt-BR": {
    title: "Serviços digitais que funcionam como",
    italic: "partes do mesmo negócio.",
    lead: "Website, e-commerce, aquisição, dados, CRM e automação não deveriam disputar atenção entre fornecedores. Eu estruturo a estratégia para que cada camada sustente a próxima.",
    eyebrow: "SERVIÇOS · ESTRATÉGIA → EXECUÇÃO",
    primary: "Falar sobre meu projeto",
    categories: [
      { n: "01", icon: Code2, title: "Websites & Produto Digital", text: "Sites para empresas, landing pages, portais, produtos digitais e experiências que unem posicionamento, performance e conversão.", items: ["Website institucional", "Landing pages", "Sites para estabelecimentos", "Produtos digitais", "Redesign UX/UI"] },
      { n: "02", icon: ShoppingBag, title: "E-commerce & Shopify", text: "Lojas virtuais próprias ou Shopify, escolhidas de acordo com operação, catálogo, integrações e necessidade de escala.", items: ["E-commerce próprio", "Shopify", "Headless commerce", "Migração de loja", "Checkout & pagamentos"] },
      { n: "03", icon: Target, title: "Conversão & Growth", text: "Arquitetura de páginas, CRO, mídia, ofertas e jornadas para reduzir atrito entre atenção, confiança, carrinho e compra.", items: ["CRO", "Mídia paga", "Funil de vendas", "Upsell & cross-sell", "Abandono de carrinho"] },
      { n: "04", icon: Search, title: "SEO, GEO & Autoridade", text: "Estrutura técnica e editorial para ampliar descoberta em buscadores e tornar sua marca mais clara e citável para sistemas de resposta por IA.", items: ["SEO técnico", "GEO / AI discovery", "Arquitetura temática", "Schema", "Autoridade online"] },
      { n: "05", icon: Database, title: "CRM, Dados & Analytics", text: "Transforme tráfego em informação comercial: origem, cidade aproximada, páginas, cliques, retornos, leads, carrinho e checkout.", items: ["CRM", "Analytics", "Eventos de conversão", "Dashboards", "Segmentação"] },
      { n: "06", icon: Mail, title: "E-mail & Relacionamento", text: "Captação, mailing, newsletters e automações para continuar a conversa depois que a pessoa sai do site.", items: ["Pop-ups", "Formulários", "E-mail marketing", "Fluxos automáticos", "Recuperação"] },
      { n: "07", icon: Bot, title: "Automação & IA", text: "Integrações, agentes e workflows que conectam ferramentas e reduzem tarefas repetitivas na operação.", items: ["n8n", "Agentes de IA", "Integrações API", "WhatsApp", "Automação operacional"] },
      { n: "08", icon: Workflow, title: "Estratégia Digital", text: "Diagnóstico de presença, arquitetura, tecnologia e crescimento para negócios que precisam organizar o próximo ciclo.", items: ["Diagnóstico", "Roadmap", "Arquitetura de solução", "Auditoria", "Otimização contínua"] },
    ],
    pathsTitle: "Algumas necessidades merecem uma página própria.",
    paths: [["Sites para empresas", "/website-para-empresas"], ["E-commerce próprio", "/ecommerce-proprio"], ["Venda de livros online", "/vender-livros-online"], ["Autoridade online", "/autoridade-online"], ["Estrutura completa de sites & e-commerce", "/websites-ecommerce"]],
    finalTitle: "A melhor tecnologia é a que resolve o seu problema sem criar outro.",
    finalText: "O projeto começa entendendo produto, público, operação e objetivo. A partir daí eu defino o que realmente precisa entrar na estrutura.",
  },
  en: {
    title: "Digital services that work as",
    italic: "parts of the same business.",
    lead: "Website, ecommerce, acquisition, data, CRM and automation should not compete across disconnected vendors. I structure them so each layer supports the next.",
    eyebrow: "SERVICES · STRATEGY → EXECUTION",
    primary: "Talk about my project",
    categories: [
      { n: "01", icon: Code2, title: "Websites & Digital Products", text: "Business websites, landing pages, portals and digital products combining positioning, performance and conversion.", items: ["Business websites", "Landing pages", "Local business sites", "Digital products", "UX/UI redesign"] },
      { n: "02", icon: ShoppingBag, title: "Ecommerce & Shopify", text: "Owned ecommerce or Shopify, selected around operations, catalog, integrations and scale requirements.", items: ["Owned ecommerce", "Shopify", "Headless commerce", "Store migration", "Checkout & payments"] },
      { n: "03", icon: Target, title: "Conversion & Growth", text: "Pages, CRO, paid acquisition, offers and journeys that reduce friction between attention, trust, cart and purchase.", items: ["CRO", "Paid media", "Sales funnels", "Upsell & cross-sell", "Abandonment recovery"] },
      { n: "04", icon: Search, title: "SEO, GEO & Authority", text: "Technical and editorial structure for search discovery and clearer, more citable brand signals for AI answer systems.", items: ["Technical SEO", "GEO / AI discovery", "Topical architecture", "Schema", "Online authority"] },
      { n: "05", icon: Database, title: "CRM, Data & Analytics", text: "Turn traffic into commercial intelligence: sources, approximate city, pages, clicks, returns, leads, cart and checkout.", items: ["CRM", "Analytics", "Conversion events", "Dashboards", "Segmentation"] },
      { n: "06", icon: Mail, title: "Email & Retention", text: "Capture, mailing lists, newsletters and automation that continue the relationship after a visitor leaves.", items: ["Popups", "Forms", "Email marketing", "Automated flows", "Recovery"] },
      { n: "07", icon: Bot, title: "Automation & AI", text: "Integrations, agents and workflows connecting tools and reducing repetitive operational work.", items: ["n8n", "AI agents", "API integrations", "WhatsApp", "Operational automation"] },
      { n: "08", icon: Workflow, title: "Digital Strategy", text: "Presence, architecture, technology and growth diagnosis for businesses planning their next cycle.", items: ["Diagnosis", "Roadmap", "Solution architecture", "Audit", "Continuous optimization"] },
    ],
    pathsTitle: "Some needs deserve a dedicated page.",
    paths: [["Business websites", "/website-para-empresas"], ["Owned ecommerce", "/ecommerce-proprio"], ["Direct book sales", "/vender-livros-online"], ["Online authority", "/autoridade-online"], ["Complete websites & ecommerce infrastructure", "/websites-ecommerce"]],
    finalTitle: "The best technology solves your problem without creating another one.",
    finalText: "Every project starts by understanding the product, audience, operation and goal. Then I define what genuinely belongs in the solution.",
  },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const lang = locale === "en" ? "en" : "pt-BR"
  return lang === "pt-BR"
    ? { title: "Serviços | Websites, E-commerce, SEO, CRM e Automação", description: "Serviços de websites, e-commerce, Shopify, SEO/GEO, CRM, analytics, e-mail marketing, conversão, automação e IA para empresas em todo o Brasil." }
    : { title: "Services | Websites, Ecommerce, SEO, CRM & Automation", description: "Website, ecommerce, Shopify, SEO/GEO, CRM, analytics, email marketing, conversion, automation and AI services for businesses in Brazil and worldwide." }
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  const lang = locale === "en" ? "en" : "pt-BR"
  const c = copy[lang]
  const whatsapp = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(lang === "pt-BR" ? "Olá André, quero entender qual solução faz mais sentido para o meu negócio." : "Hi Andre, I want to understand which solution best fits my business.")}`

  return <main className="bg-[#f2efe8] text-[#11110f]">
    <section className="border-b border-[#d4cec2] px-5 pb-24 pt-36 sm:px-8 md:pb-32 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1600px]"><p className="text-[10px] font-semibold tracking-[.2em] text-[#77736b]">{c.eyebrow}</p><div className="mt-8 grid gap-12 lg:grid-cols-[.7fr_.3fr] lg:items-end"><h1 className="font-editorial text-[clamp(3.5rem,7vw,7.6rem)] leading-[.88] tracking-[-.05em]">{c.title} <span className="italic text-[#5f6559]">{c.italic}</span></h1><div><p className="text-base leading-8 text-[#625e56] sm:text-lg">{c.lead}</p><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#11110f] px-7 text-[10px] font-semibold uppercase tracking-[.14em] text-white">{c.primary}<ArrowUpRight className="h-4 w-4"/></a></div></div></div></section>

    <section className="px-5 py-24 sm:px-8 md:py-32 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1600px]"><div className="grid border-y border-[#d4cec2] md:grid-cols-2 lg:grid-cols-4">{c.categories.map((service,index)=>{const Icon=service.icon;return <article key={service.n} className={`min-h-[410px] p-7 md:p-8 ${index%4!==0?"lg:border-l lg:border-[#d4cec2]":""} ${index>=4?"border-t border-[#d4cec2]":""} ${index%2===1?"md:border-l md:border-[#d4cec2]":""}`}><div className="flex items-center justify-between"><span className="text-[9px] font-semibold tracking-[.15em] text-[#a08967]">{service.n}</span><Icon className="h-5 w-5 text-[#5f6559]"/></div><h2 className="mt-12 font-editorial text-3xl leading-none tracking-[-.03em] sm:text-4xl">{service.title}</h2><p className="mt-5 text-sm leading-7 text-[#69645c]">{service.text}</p><ul className="mt-7 space-y-2">{service.items.map(item=><li key={item} className="text-[9px] font-semibold uppercase tracking-[.12em] text-[#817c72]">— {item}</li>)}</ul></article>})}</div></div></section>

    <section className="bg-[#11110f] px-5 py-24 text-white sm:px-8 md:py-32 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1500px]"><Sparkles className="h-6 w-6 text-[#c7b18d]"/><h2 className="mt-8 max-w-5xl font-editorial text-[clamp(2.8rem,5.5vw,5.8rem)] leading-[.93] tracking-[-.045em]">{c.pathsTitle}</h2><div className="mt-14 divide-y divide-white/10 border-y border-white/10">{c.paths.map(([label,path],index)=><Link key={path} href={`/${lang}${path}`} className="group flex items-center justify-between py-6"><div className="flex items-center gap-5"><span className="text-[9px] text-[#c7b18d]">0{index+1}</span><span className="font-editorial text-2xl sm:text-3xl">{label}</span></div><ArrowUpRight className="h-5 w-5 text-white/40 transition group-hover:text-[#c7b18d]"/></Link>)}</div></div></section>

    <section className="px-5 py-24 sm:px-8 md:py-32 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1400px]"><ChartNoAxesCombined className="h-6 w-6 text-[#a08967]"/><h2 className="mt-8 max-w-5xl font-editorial text-[clamp(3rem,6vw,6rem)] leading-[.92] tracking-[-.045em]">{c.finalTitle}</h2><div className="mt-10 flex flex-col gap-8 border-t border-[#d4cec2] pt-8 md:flex-row md:items-center md:justify-between"><p className="max-w-2xl text-base leading-7 text-[#625e56]">{c.finalText}</p><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center gap-3 rounded-full bg-[#11110f] px-7 text-[10px] font-semibold uppercase tracking-[.14em] text-white">{c.primary}<ArrowUpRight className="h-4 w-4"/></a></div></div></section>
  </main>
}

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, BarChart3, Check, Database, Globe2, Mail, MapPin, MousePointer2, Repeat2, ShoppingCart, Sparkles, Users } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

type Props = { params: Promise<{ locale: string }> }

const content = {
  "pt-BR": {
    metaTitle: "Criação de Websites e E-commerce Próprio | André Almeida",
    metaDescription: "Websites e e-commerce para empresas em todo o Brasil com CRM, analytics, e-mail marketing, automação, funil de vendas e infraestrutura sob seu controle.",
    eyebrow: "WEBSITES & E-COMMERCE · INFRAESTRUTURA PRÓPRIA",
    title: "Seu site pode ser muito mais do que uma vitrine.",
    italic: "Pode ser a infraestrutura comercial do seu negócio.",
    lead: "Eu desenvolvo websites para estabelecimentos comerciais e e-commerces completos, estruturados para captar, acompanhar, nutrir e converter clientes — com muito mais controle sobre tecnologia, dados e operação.",
    primary: "Falar sobre meu projeto",
    secondary: "Enviar detalhes pelo formulário",
    note: "Sem ficar preso a uma mensalidade obrigatória de plataforma para a loja simplesmente existir. Domínio, hospedagem, e-mail e serviços de terceiros podem ter custos próprios conforme a estrutura escolhida.",
    painEyebrow: "01 / O PROBLEMA",
    painTitle: "Muitos negócios têm um site. Poucos sabem o que acontece dentro dele.",
    pains: [
      ["Dependência", "A plataforma aumenta preço, muda regra ou limita um recurso e o negócio precisa se adaptar."],
      ["Dados espalhados", "Tráfego em um lugar, leads em outro, pedidos em outro e nenhuma visão clara da jornada."],
      ["Leads perdidos", "A pessoa visita, demonstra interesse e vai embora sem entrar em um fluxo de relacionamento."],
      ["Venda incompleta", "Carrinho e checkout existem, mas abandono, ofertas e recompra não são tratados como sistema."],
    ],
    systemEyebrow: "02 / O QUE EU CONSTRUO",
    systemTitle: "Uma operação digital pensada de ponta a ponta.",
    systemIntro: "A arquitetura é definida pelo que o seu negócio realmente precisa. O objetivo não é empilhar ferramentas; é fazer cada parte conversar com a próxima.",
    features: [
      ["Website profissional", "Institucional, catálogo, landing pages, agendamento, orçamento, WhatsApp e páginas específicas para cada intenção de busca.", "globe"],
      ["E-commerce", "Produtos, variantes, estoque, carrinho, checkout, pagamento, cupons, ofertas e gestão de pedidos.", "cart"],
      ["CRM profissional", "Leads e clientes organizados por origem, estágio, interesse e histórico para facilitar acompanhamento comercial.", "users"],
      ["Analytics comercial", "Veja origem do tráfego, cidade aproximada, páginas acessadas, cliques, retornos e eventos importantes da jornada.", "chart"],
      ["Captação de leads", "Pop-ups, formulários, materiais, cupons e CTAs para transformar tráfego anônimo em contatos identificáveis.", "pointer"],
      ["E-mail marketing", "Mailing estruturado, segmentação, automações, newsletters e acompanhamento de entrega e abertura quando o provedor permite.", "mail"],
      ["Automação", "Conecte site, CRM, e-mail, WhatsApp, pagamentos e rotinas internas para reduzir tarefas repetitivas.", "repeat"],
      ["Dados sob controle", "A estrutura é documentada para que você saiba onde estão domínio, código, integrações, dados e acessos do projeto.", "database"],
    ],
    intelligenceEyebrow: "03 / VISIBILIDADE COMERCIAL",
    intelligenceTitle: "Você deixa de olhar apenas visitas e começa a enxergar comportamento.",
    intelligence: ["De onde o visitante veio", "Cidade/região aproximada", "Onde clicou", "Se voltou ao site", "Quem entrou no mailing", "Quem recebeu e abriu e-mails", "Quem comprou", "Quem adicionou ao carrinho", "Quem iniciou checkout e não concluiu", "Produtos e páginas que mais despertam interesse"],
    conversionEyebrow: "04 / CONVERSÃO",
    conversionTitle: "A loja não termina no botão comprar.",
    conversion: [
      ["Upsell", "Apresente uma versão superior ou complemento de maior valor quando fizer sentido."],
      ["Downsell", "Recupere parte da intenção com uma alternativa de menor barreira."],
      ["Order bump", "Adicione uma oferta complementar simples no momento da compra."],
      ["Cross-sell", "Sugira produtos relacionados com base no item ou interesse do cliente."],
      ["Abandono", "Crie fluxos para carrinho, checkout e leads que demonstraram intenção e não concluíram."],
      ["Recompra", "Use CRM e e-mail para voltar a falar com quem já conhece e confia na marca."],
    ],
    audienceEyebrow: "05 / PARA QUEM FAZ SENTIDO",
    audienceTitle: "Do estabelecimento local à operação nacional.",
    audiences: ["Restaurantes, clínicas, escritórios e prestadores de serviço", "Lojas físicas que precisam gerar demanda e pedidos online", "Marcas que querem migrar ou reduzir dependência de plataformas", "Autores e editoras que querem vender livros diretamente", "Profissionais que precisam construir autoridade online", "E-commerces que precisam integrar marketing, CRM, dados e automação"],
    ownershipEyebrow: "06 / AUTONOMIA",
    ownershipTitle: "Você precisa entender e dominar os ativos que sustentam o seu negócio.",
    ownershipText: "Cada projeto é desenhado para evitar uma operação opaca. Você recebe uma estrutura organizada, com domínio, código, acessos, integrações e responsabilidades documentadas conforme o escopo contratado.",
    faqEyebrow: "07 / PERGUNTAS FREQUENTES",
    faqs: [
      ["É realmente sem mensalidade?", "Eu não condiciono a existência da loja a uma mensalidade obrigatória como modelo de plataforma. Ainda podem existir custos de domínio, hospedagem, e-mail, meios de pagamento e serviços externos escolhidos para o projeto."],
      ["Você também trabalha com Shopify?", "Sim. Shopify continua sendo uma excelente solução para muitos cenários. A diferença é que eu avalio a necessidade do negócio antes de decidir a tecnologia."],
      ["Consigo saber quem visitou meu site?", "É possível acompanhar sessões, origem, cidade aproximada, páginas, cliques e retornos. A identificação nominal depende de o visitante se cadastrar, comprar ou consentir com mecanismos permitidos pela legislação e pelas ferramentas utilizadas."],
      ["O site pode ter CRM e e-mail marketing?", "Sim. A estrutura pode integrar captação, CRM, segmentação, automações e campanhas de e-mail."],
      ["Você atende empresas fora de São Paulo?", "Sim. O atendimento é remoto para todo o Brasil e também para projetos internacionais."],
    ],
    finalTitle: "O objetivo não é entregar um site. É entregar uma estrutura que trabalhe com o seu negócio.",
    finalText: "Conte o que você vende, como atende hoje e onde sente que a operação digital está perdendo oportunidades.",
  },
  en: {
    metaTitle: "Business Websites & Owned Ecommerce | Andre Almeida",
    metaDescription: "Websites and ecommerce for businesses with CRM, analytics, email marketing, automation, sales funnels and infrastructure designed for control and growth.",
    eyebrow: "WEBSITES & ECOMMERCE · OWNED INFRASTRUCTURE",
    title: "Your website can be much more than a showcase.",
    italic: "It can become your commercial infrastructure.",
    lead: "I build business websites and complete ecommerce systems designed to capture, understand, nurture and convert customers — with greater control over technology, data and operations.",
    primary: "Talk about my project",
    secondary: "Send details through the form",
    note: "Without forcing your store to depend on a mandatory platform subscription just to exist. Domain, hosting, email and third-party services may have their own costs depending on the chosen architecture.",
    painEyebrow: "01 / THE PROBLEM",
    painTitle: "Many businesses have a website. Few know what happens inside it.",
    pains: [["Dependency", "A platform changes pricing, rules or limits and the business is forced to adapt."], ["Fragmented data", "Traffic in one tool, leads in another, orders elsewhere and no clear customer journey."], ["Lost leads", "Someone visits, shows intent and leaves without entering a relationship flow."], ["Incomplete sales system", "Cart and checkout exist, but abandonment, offers and repeat purchases are not treated as a system."]],
    systemEyebrow: "02 / WHAT I BUILD",
    systemTitle: "An end-to-end digital operation.",
    systemIntro: "Architecture is defined by what the business actually needs. The goal is not to stack tools; it is to make every component work together.",
    features: [["Professional website", "Corporate pages, catalogs, landing pages, bookings, quotes, WhatsApp and intent-specific pages.", "globe"], ["Ecommerce", "Products, variants, inventory, cart, checkout, payments, coupons, offers and order management.", "cart"], ["Professional CRM", "Leads and customers organized by source, stage, interest and history.", "users"], ["Commercial analytics", "Understand traffic source, approximate city, pages, clicks, returns and key journey events.", "chart"], ["Lead capture", "Popups, forms, resources, coupons and CTAs that turn anonymous traffic into identifiable contacts.", "pointer"], ["Email marketing", "Structured mailing lists, segmentation, automation, newsletters and delivery/open tracking where supported.", "mail"], ["Automation", "Connect website, CRM, email, WhatsApp, payments and internal workflows.", "repeat"], ["Controlled assets", "A documented structure so you understand where your domain, code, integrations, data and access live.", "database"]],
    intelligenceEyebrow: "03 / COMMERCIAL VISIBILITY",
    intelligenceTitle: "Move beyond pageviews and understand behavior.",
    intelligence: ["Where visitors came from", "Approximate city/region", "Where they clicked", "Whether they returned", "Who joined the mailing list", "Who received and opened emails", "Who purchased", "Who added to cart", "Who started checkout and did not finish", "Which products and pages attract intent"],
    conversionEyebrow: "04 / CONVERSION",
    conversionTitle: "The store does not end at the buy button.",
    conversion: [["Upsell", "Present a higher-value version or complement when relevant."], ["Downsell", "Recover intent with a lower-barrier alternative."], ["Order bump", "Add a simple complementary offer at purchase."], ["Cross-sell", "Recommend related products based on the item or customer interest."], ["Abandonment", "Create flows for carts, checkouts and leads that showed intent without completing."], ["Repeat purchase", "Use CRM and email to reconnect with people who already know the brand."]],
    audienceEyebrow: "05 / WHO IT IS FOR",
    audienceTitle: "From local businesses to national operations.",
    audiences: ["Restaurants, clinics, offices and service businesses", "Physical stores that need online demand and orders", "Brands that want to migrate or reduce platform dependency", "Authors and publishers selling books directly", "Professionals building online authority", "Ecommerce brands integrating marketing, CRM, data and automation"],
    ownershipEyebrow: "06 / CONTROL",
    ownershipTitle: "You should understand and control the assets that support your business.",
    ownershipText: "Every project is designed to avoid an opaque operation. Domain, code, access, integrations and responsibilities are organized and documented according to the contracted scope.",
    faqEyebrow: "07 / FAQ",
    faqs: [["Is it really subscription-free?", "I do not make the store's existence depend on a mandatory platform subscription. Domain, hosting, email, payment providers and external services may still have their own costs."], ["Do you also work with Shopify?", "Yes. Shopify is an excellent solution for many scenarios. I evaluate the business before choosing the technology."], ["Can I know who visited my site?", "You can track sessions, source, approximate city, pages, clicks and returns. Identifying a person by name depends on registration, purchase or lawful consent mechanisms."], ["Can the website include CRM and email marketing?", "Yes. The architecture can integrate lead capture, CRM, segmentation, automation and email campaigns."], ["Do you work internationally?", "Yes. Projects can be delivered remotely in Brazil and internationally."]],
    finalTitle: "The goal is not to deliver a website. It is to deliver infrastructure that works with your business.",
    finalText: "Tell me what you sell, how you operate today and where your digital operation is losing opportunities.",
  },
} as const

const icons = { globe: Globe2, cart: ShoppingCart, users: Users, chart: BarChart3, pointer: MousePointer2, mail: Mail, repeat: Repeat2, database: Database }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const c = locale === "en" ? content.en : content["pt-BR"]
  return { title: c.metaTitle, description: c.metaDescription, alternates: { canonical: `https://andre-almeida.online/${locale === "en" ? "en" : "pt-BR"}/websites-ecommerce`, languages: { "pt-BR": "https://andre-almeida.online/pt-BR/websites-ecommerce", en: "https://andre-almeida.online/en/websites-ecommerce", "x-default": "https://andre-almeida.online/pt-BR/websites-ecommerce" } } }
}

export default async function WebsitesEcommercePage({ params }: Props) {
  const { locale } = await params
  const lang = locale === "en" ? "en" : "pt-BR"
  const c = content[lang]
  const whatsappText = encodeURIComponent(lang === "pt-BR" ? "Olá André, quero entender a estrutura de website/e-commerce próprio para o meu negócio." : "Hi Andre, I want to discuss an owned website/ecommerce structure for my business.")
  const whatsapp = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappText}`
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: c.faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }
  const serviceSchema = { "@context": "https://schema.org", "@type": "Service", name: c.metaTitle, provider: { "@type": "Person", name: "Andre Almeida", url: "https://andre-almeida.online" }, areaServed: lang === "pt-BR" ? { "@type": "Country", name: "Brazil" } : "Worldwide", serviceType: ["Website development", "Ecommerce development", "CRM integration", "Email marketing", "Analytics", "Automation"] }

  return <main className="bg-[#f2efe8] text-[#11110f]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

    <section className="border-b border-[#d4cec2] px-5 pb-24 pt-36 sm:px-8 md:pb-32 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1600px]"><p className="text-[10px] font-semibold tracking-[0.2em] text-[#77736b]">{c.eyebrow}</p><div className="mt-8 grid gap-12 lg:grid-cols-[0.68fr_0.32fr] lg:items-end"><h1 className="max-w-6xl font-editorial text-[clamp(3.4rem,7vw,7.6rem)] leading-[0.88] tracking-[-0.05em]">{c.title} <span className="italic text-[#5f6559]">{c.italic}</span></h1><div><p className="text-base leading-7 text-[#625e56] sm:text-lg sm:leading-8">{c.lead}</p><div className="mt-8 flex flex-col gap-3"><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-between rounded-full bg-[#11110f] px-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">{c.primary}<ArrowUpRight className="h-4 w-4" /></a><Link href={`/${lang}/contact`} className="inline-flex min-h-14 items-center justify-between rounded-full border border-[#11110f]/25 px-6 text-[10px] font-semibold uppercase tracking-[0.14em]">{c.secondary}<ArrowUpRight className="h-4 w-4" /></Link></div></div></div><p className="mt-10 max-w-4xl border-l border-[#b49970] pl-5 text-xs leading-6 text-[#77736b]">{c.note}</p></div></section>

    <section className="px-5 py-24 sm:px-8 md:py-32 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1600px]"><p className="text-[10px] font-semibold tracking-[0.2em] text-[#77736b]">{c.painEyebrow}</p><h2 className="mt-8 max-w-5xl font-editorial text-[clamp(2.8rem,6vw,6rem)] leading-[.93] tracking-[-.045em]">{c.painTitle}</h2><div className="mt-16 grid border-y border-[#d4cec2] md:grid-cols-2 lg:grid-cols-4">{c.pains.map(([title,text],i)=><div key={title} className={`min-h-64 py-8 md:px-7 ${i>0?"border-t border-[#d4cec2] md:border-l md:border-t-0":""}`}><span className="text-[9px] font-semibold tracking-[.15em] text-[#a08967]">0{i+1}</span><h3 className="mt-10 font-editorial text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-[#69645c]">{text}</p></div>)}</div></div></section>

    <section className="bg-[#11110f] px-5 py-24 text-white sm:px-8 md:py-32 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1600px]"><p className="text-[10px] font-semibold tracking-[0.2em] text-[#c7b18d]">{c.systemEyebrow}</p><div className="mt-8 grid gap-10 lg:grid-cols-[.65fr_.35fr]"><h2 className="font-editorial text-[clamp(2.8rem,6vw,6rem)] leading-[.93] tracking-[-.045em]">{c.systemTitle}</h2><p className="text-base leading-8 text-white/55">{c.systemIntro}</p></div><div className="mt-16 grid border border-white/10 md:grid-cols-2 lg:grid-cols-4">{c.features.map(([title,text,icon],i)=>{const Icon=icons[icon as keyof typeof icons];return <div key={title} className="min-h-72 border-b border-white/10 p-7 md:border-r lg:[&:nth-child(4n)]:border-r-0"><Icon className="h-5 w-5 text-[#c7b18d]"/><h3 className="mt-10 font-editorial text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-white/55">{text}</p></div>})}</div></div></section>

    <section className="px-5 py-24 sm:px-8 md:py-32 lg:px-10 xl:px-14"><div className="mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-[.46fr_.54fr]"><div><p className="text-[10px] font-semibold tracking-[0.2em] text-[#77736b]">{c.intelligenceEyebrow}</p><h2 className="mt-8 font-editorial text-[clamp(2.8rem,5.5vw,5.6rem)] leading-[.93] tracking-[-.045em]">{c.intelligenceTitle}</h2></div><div className="grid grid-cols-1 border-y border-[#d4cec2] sm:grid-cols-2">{c.intelligence.map((item,i)=><div key={item} className="flex min-h-20 items-center gap-3 border-b border-[#d4cec2] py-5 sm:px-5"><Check className="h-4 w-4 shrink-0 text-[#a08967]"/><span className="text-sm text-[#5f5b54]">{item}</span></div>)}</div></div></section>

    <section className="border-y border-[#d4cec2] bg-[#e7e2d8] px-5 py-24 sm:px-8 md:py-32 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1600px]"><p className="text-[10px] font-semibold tracking-[0.2em] text-[#77736b]">{c.conversionEyebrow}</p><h2 className="mt-8 max-w-5xl font-editorial text-[clamp(2.8rem,5.5vw,5.6rem)] leading-[.93] tracking-[-.045em]">{c.conversionTitle}</h2><div className="mt-14 grid gap-px bg-[#cfc8bc] md:grid-cols-2 lg:grid-cols-3">{c.conversion.map(([title,text])=><div key={title} className="bg-[#f2efe8] p-7"><h3 className="font-editorial text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-[#67635b]">{text}</p></div>)}</div></div></section>

    <section className="px-5 py-24 sm:px-8 md:py-32 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1600px]"><div className="grid gap-12 lg:grid-cols-2"><div><p className="text-[10px] font-semibold tracking-[0.2em] text-[#77736b]">{c.audienceEyebrow}</p><h2 className="mt-8 font-editorial text-[clamp(2.8rem,5vw,5.2rem)] leading-[.94] tracking-[-.045em]">{c.audienceTitle}</h2><ul className="mt-10 space-y-4">{c.audiences.map(x=><li key={x} className="flex gap-3 text-sm leading-7 text-[#625e56]"><Check className="mt-1 h-4 w-4 shrink-0 text-[#a08967]"/>{x}</li>)}</ul></div><div className="bg-[#11110f] p-8 text-white sm:p-12"><p className="text-[10px] font-semibold tracking-[0.2em] text-[#c7b18d]">{c.ownershipEyebrow}</p><h2 className="mt-8 font-editorial text-4xl leading-[.95] tracking-[-.04em] sm:text-5xl">{c.ownershipTitle}</h2><p className="mt-8 text-sm leading-7 text-white/60">{c.ownershipText}</p><Database className="mt-14 h-8 w-8 text-[#c7b18d]"/></div></div></div></section>

    <section className="border-t border-[#d4cec2] px-5 py-24 sm:px-8 md:py-32 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1200px]"><p className="text-[10px] font-semibold tracking-[0.2em] text-[#77736b]">{c.faqEyebrow}</p><div className="mt-10 divide-y divide-[#d4cec2] border-y border-[#d4cec2]">{c.faqs.map(([q,a])=><div key={q} className="grid gap-4 py-8 md:grid-cols-[.4fr_.6fr]"><h3 className="font-editorial text-2xl">{q}</h3><p className="text-sm leading-7 text-[#666259]">{a}</p></div>)}</div></div></section>

    <section className="bg-[#11110f] px-5 py-24 text-white sm:px-8 md:py-32 lg:px-10 xl:px-14"><div className="mx-auto max-w-[1400px]"><Sparkles className="h-6 w-6 text-[#c7b18d]"/><h2 className="mt-8 max-w-5xl font-editorial text-[clamp(3rem,6vw,6rem)] leading-[.92] tracking-[-.045em]">{c.finalTitle}</h2><div className="mt-10 flex flex-col gap-8 border-t border-white/15 pt-8 md:flex-row md:items-center md:justify-between"><p className="max-w-2xl text-base leading-7 text-white/55">{c.finalText}</p><div className="flex flex-col gap-3 sm:flex-row"><Link href={`/${lang}/contact`} className="inline-flex min-h-14 items-center gap-3 rounded-full border border-white/25 px-6 text-[10px] font-semibold uppercase tracking-[.14em]">{c.secondary}<ArrowUpRight className="h-4 w-4"/></Link><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center gap-3 rounded-full bg-[#f2efe8] px-6 text-[10px] font-semibold uppercase tracking-[.14em] text-[#11110f]">{c.primary}<ArrowUpRight className="h-4 w-4"/></a></div></div></div></section>
  </main>
}

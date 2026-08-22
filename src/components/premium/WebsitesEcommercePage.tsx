"use client"

import Image from "next/image"
import Link from "next/link"
import { useLocale } from "next-intl"
import { ArrowUpRight, BarChart3, Check, Eye, Mail, MapPin, MousePointer2, Repeat2, ShoppingBag, ShoppingCart, Users } from "lucide-react"
import { Analytics } from "@/lib/analytics"
import { SITE_CONFIG } from "@/lib/constants"

const copy = {
  "pt-BR": {
    eyebrow: "WEBSITES · E-COMMERCE · INFRAESTRUTURA PRÓPRIA",
    title: "Seu negócio não precisa alugar sua presença digital para sempre.",
    lead: "Eu construo websites para estabelecimentos comerciais e e-commerces com estrutura pensada para vender, captar, acompanhar e se relacionar com clientes — sem depender de uma mensalidade obrigatória de plataforma para a operação simplesmente existir.",
    primary: "Quero conversar sobre meu projeto",
    secondary: "Prefiro enviar pelo formulário",
    note: "Domínio, hospedagem, serviços de e-mail ou integrações de terceiros podem ter custos próprios. A diferença é não ficar preso a uma plataforma única para manter sua loja no ar.",
    painsEyebrow: "01 / O PROBLEMA",
    painsTitle: "Muitos negócios têm um site. Poucos têm uma estrutura comercial digital.",
    pains: [
      ["Mensalidade sem fim", "A operação cresce e você continua pagando apenas para a plataforma permitir que a loja exista."],
      ["Ferramentas desconectadas", "Site em um lugar, e-mail em outro, CRM separado, dados incompletos e nenhuma visão única do cliente."],
      ["Cliente entra e desaparece", "Você recebe visitas, mas não sabe o que aconteceu entre a primeira página e o abandono."],
      ["Base que não é trabalhada", "Leads e clientes ficam espalhados, sem segmentação, automação ou relacionamento consistente."],
      ["Venda perdida no checkout", "Carrinho e checkout abandonados viram receita perdida quando não existe uma estratégia de recuperação."],
      ["Oferta genérica", "Sem upsell, downsell, order bump e cross-sell, cada pedido deixa oportunidades de receita na mesa."],
    ],
    systemEyebrow: "02 / A ESTRUTURA",
    systemTitle: "Não é só um site. É uma central comercial do seu negócio.",
    systemLead: "A arquitetura é definida de acordo com o que você realmente precisa. O objetivo é dar clareza à operação, reduzir dependências e transformar comportamento em decisão comercial.",
    features: [
      ["CRM profissional", "Organize contatos, leads, oportunidades e clientes em uma visão estruturada."],
      ["Painel de comportamento", "Acompanhe visitas, origem do tráfego, páginas, cliques e retornos dentro do que a tecnologia e o consentimento permitem."],
      ["Localização aproximada", "Entenda regiões e cidades aproximadas dos acessos para orientar campanhas e atuação local."],
      ["Mailing integrado", "Veja quem se cadastrou e mantenha a base pronta para segmentação e relacionamento."],
      ["E-mail marketing", "Estruture campanhas e automações com métricas de entrega, abertura e interação quando suportadas pelo provedor."],
      ["Jornada de compra", "Meça eventos como produto visualizado, carrinho, início de checkout e compra concluída."],
      ["Recuperação", "Crie fluxos para recuperar oportunidades que ficaram no carrinho ou chegaram ao checkout sem finalizar."],
      ["Ofertas inteligentes", "Upsell, downsell, order bump, cross-sell, cupons, kits e campanhas de acordo com o modelo de negócio."],
    ],
    twoEyebrow: "03 / DOIS CENÁRIOS",
    twoTitle: "A tecnologia muda. O princípio é o mesmo: controle.",
    businessTitle: "Para estabelecimentos comerciais",
    businessText: "Um website profissional pode transformar busca e indicação em contato mensurável. Ideal para clínicas, escritórios, restaurantes, lojas físicas, prestadores de serviço e negócios locais que precisam parecer maiores e captar melhor.",
    businessItems: ["SEO e estrutura local", "WhatsApp e formulários", "Captação de leads", "Páginas de serviços e ofertas", "Analytics e eventos", "CRM e follow-up"],
    ecommerceTitle: "Para e-commerce",
    ecommerceText: "Uma loja construída em torno da operação e do funil, com liberdade para integrar pagamento, catálogo, CRM, comunicação, dados e automações sem o negócio depender de uma assinatura de plataforma específica.",
    ecommerceItems: ["Catálogo e checkout", "Carrinho e recuperação", "CRM e mailing", "E-mail e automações", "Upsell e cross-sell", "Painel comercial"],
    ownershipEyebrow: "04 / PROPRIEDADE E LIBERDADE",
    ownershipTitle: "Você precisa dominar o negócio, não decorar o painel de uma plataforma.",
    ownershipText: "A estrutura técnica é documentada e montada para que seus dados, domínio e ativos essenciais estejam sob seu controle. Quando algum serviço externo fizer sentido, ele entra como componente — não como dono da operação.",
    finalTitle: "Seu próximo site pode ser o começo de uma operação mais inteligente.",
    finalText: "Me conte como seu negócio funciona hoje. Eu avalio a estrutura, os gargalos e o que realmente precisa ser construído.",
    finalPrimary: "Falar comigo no WhatsApp",
    finalSecondary: "Abrir formulário de contato",
  },
  en: {
    eyebrow: "WEBSITES · E-COMMERCE · OWNED INFRASTRUCTURE",
    title: "Your business should not have to rent its digital presence forever.",
    lead: "I build business websites and ecommerce systems designed to sell, capture, track and nurture customers — without making the operation depend on a mandatory platform subscription just to stay online.",
    primary: "Talk about my project",
    secondary: "Send the contact form",
    note: "Domains, hosting, email services or third-party integrations may have their own costs. The difference is not being locked into one platform just to keep the store running.",
    painsEyebrow: "01 / THE PROBLEM",
    painsTitle: "Many businesses have a website. Few have a digital commercial system.",
    pains: [
      ["Endless platform fees", "As the operation grows, you keep paying just for the platform to let the store exist."],
      ["Disconnected tools", "Website, email, CRM and analytics live in separate places without one customer view."],
      ["Visitors disappear", "Traffic arrives, but you do not understand what happened between landing and abandonment."],
      ["Unused customer base", "Leads and customers stay scattered without segmentation, automation or consistent follow-up."],
      ["Lost checkout revenue", "Cart and checkout abandonment becomes lost revenue without recovery flows."],
      ["Generic offers", "Without upsells, downsells, order bumps and cross-sells, each order leaves revenue opportunities unused."],
    ],
    systemEyebrow: "02 / THE SYSTEM",
    systemTitle: "Not just a website. A commercial operating layer.",
    systemLead: "The architecture is defined around what the business actually needs. The goal is clarity, less dependency and better commercial decisions from customer behavior.",
    features: [
      ["Professional CRM", "Organize contacts, leads, opportunities and customers in a structured view."],
      ["Behavior dashboard", "Track visits, traffic sources, pages, clicks and returns within technical and consent limitations."],
      ["Approximate location", "Understand regions and approximate cities to guide campaigns and local strategy."],
      ["Integrated mailing list", "See who opted in and keep the customer base ready for segmentation."],
      ["Email marketing", "Build campaigns and automations with delivery, open and interaction metrics when supported by the provider."],
      ["Purchase journey", "Measure product views, cart events, checkout starts and completed purchases."],
      ["Recovery flows", "Recover opportunities that abandoned cart or reached checkout without completing."],
      ["Smart offers", "Upsells, downsells, order bumps, cross-sells, coupons and bundles based on the business model."],
    ],
    twoEyebrow: "03 / TWO SCENARIOS",
    twoTitle: "The technology changes. The principle is the same: control.",
    businessTitle: "For local and service businesses",
    businessText: "A professional website can turn search and referrals into measurable contact. Ideal for clinics, offices, restaurants, local stores, professionals and businesses that need stronger perception and better lead capture.",
    businessItems: ["Local SEO structure", "WhatsApp and forms", "Lead capture", "Service and offer pages", "Analytics and events", "CRM and follow-up"],
    ecommerceTitle: "For ecommerce",
    ecommerceText: "A store built around the operation and funnel, with freedom to integrate payment, catalog, CRM, communication, data and automation without depending on one platform subscription.",
    ecommerceItems: ["Catalog and checkout", "Cart and recovery", "CRM and mailing", "Email and automation", "Upsell and cross-sell", "Commercial dashboard"],
    ownershipEyebrow: "04 / OWNERSHIP AND FREEDOM",
    ownershipTitle: "You should control the business, not memorize a platform dashboard.",
    ownershipText: "The technical structure is documented and designed so the domain, data and essential assets remain under your control. External services can be components when useful — not owners of the operation.",
    finalTitle: "Your next website can be the start of a smarter operation.",
    finalText: "Tell me how the business works today. I will assess the structure, bottlenecks and what actually needs to be built.",
    finalPrimary: "Talk to me on WhatsApp",
    finalSecondary: "Open contact form",
  },
} as const

const featureIcons = [Users, Eye, MapPin, Mail, Mail, ShoppingCart, Repeat2, ShoppingBag]

export function WebsitesEcommercePage() {
  const locale = useLocale() as "pt-BR" | "en"
  const lang = locale === "en" ? "en" : "pt-BR"
  const c = copy[lang]
  const whatsappText = encodeURIComponent(lang === "pt-BR" ? "Olá André, quero entender a estrutura de website/e-commerce próprio para o meu negócio." : "Hi Andre, I want to discuss an owned website/ecommerce system for my business.")
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappText}`

  return (
    <div className="bg-[#f2efe8] pt-20 text-[#11110f]">
      <section className="border-b border-[#d4cec2]">
        <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-[1600px] gap-12 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-[0.54fr_0.46fr] lg:items-center lg:px-10 xl:px-14">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a7658]">{c.eyebrow}</p>
            <h1 className="mt-8 max-w-5xl font-editorial text-[clamp(3.4rem,7vw,7rem)] leading-[0.88] tracking-[-0.055em]">{c.title}</h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-[#615d55] sm:text-lg">{c.lead}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => Analytics.whatsappClick("owned_commerce_hero")} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#11110f] px-7 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#2b2a27]">{c.primary}<ArrowUpRight className="h-4 w-4" /></a>
              <Link href={`/${locale}/contact`} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#11110f]/25 px-7 text-[10px] font-semibold uppercase tracking-[0.14em]">{c.secondary}<ArrowUpRight className="h-4 w-4" /></Link>
            </div>
            <p className="mt-6 max-w-2xl text-[10px] leading-5 text-[#807a70]">{c.note}</p>
          </div>
          <div className="relative min-h-[560px] overflow-hidden bg-[#11110f] sm:min-h-[680px] lg:min-h-[72vh]">
            <Image src="/images/premium/commerce-system.webp" alt={lang === "pt-BR" ? "Estrutura de website e e-commerce com painel comercial" : "Website and ecommerce commercial system"} fill priority className="object-cover" sizes="(max-width:1024px) 100vw, 46vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/5" />
            <div className="absolute bottom-0 left-0 right-0 border-t border-white/15 p-6 text-white sm:p-8"><p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#d7c09a]">OWNED COMMERCE SYSTEM</p><p className="mt-3 max-w-md font-editorial text-3xl leading-none sm:text-4xl">CRM · Analytics · Automação · Conversão</p></div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
          <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]"><p className="text-[10px] font-semibold tracking-[0.2em] text-[#807a70]">{c.painsEyebrow}</p><h2 className="max-w-5xl font-editorial text-[clamp(2.8rem,5.8vw,5.8rem)] leading-[0.94] tracking-[-0.045em]">{c.painsTitle}</h2></div>
          <div className="mt-16 grid border-t border-[#cec7ba] sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
            {c.pains.map(([title, text], index) => <div key={title} className="border-b border-[#cec7ba] p-7 sm:border-r lg:p-9"><span className="text-[9px] font-semibold tracking-[0.16em] text-[#b49970]">0{index + 1}</span><h3 className="mt-8 font-editorial text-3xl tracking-[-0.03em]">{title}</h3><p className="mt-4 text-sm leading-7 text-[#68635b]">{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-[#11110f] py-24 text-white md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
          <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr]"><div><p className="text-[10px] font-semibold tracking-[0.2em] text-[#c7b18d]">{c.systemEyebrow}</p><h2 className="mt-8 font-editorial text-[clamp(3rem,5.5vw,5.8rem)] leading-[0.92] tracking-[-0.05em]">{c.systemTitle}</h2><p className="mt-7 max-w-xl text-sm leading-7 text-white/55 sm:text-base">{c.systemLead}</p></div><div className="grid gap-px bg-white/10 sm:grid-cols-2">{c.features.map(([title, text], index) => { const Icon = featureIcons[index]; return <div key={title} className="bg-[#11110f] p-6 sm:p-8"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c7b18d]/25"><Icon className="h-4 w-4 text-[#c7b18d]" /></span><h3 className="mt-6 font-editorial text-2xl">{title}</h3><p className="mt-3 text-sm leading-6 text-white/50">{text}</p></div>})}</div></div>
        </div>
      </section>

      <section className="py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-[#807a70]">{c.twoEyebrow}</p><h2 className="mt-8 max-w-5xl font-editorial text-[clamp(2.8rem,5.8vw,5.8rem)] leading-[0.94] tracking-[-0.045em]">{c.twoTitle}</h2>
          <div className="mt-16 grid gap-px bg-[#cec7ba] lg:mt-24 lg:grid-cols-2">
            {[[c.businessTitle,c.businessText,c.businessItems],[c.ecommerceTitle,c.ecommerceText,c.ecommerceItems]].map(([title,text,items]) => <div key={title as string} className="bg-[#f2efe8] p-7 sm:p-10 lg:p-14"><h3 className="font-editorial text-4xl tracking-[-0.04em] sm:text-5xl">{title}</h3><p className="mt-6 max-w-xl text-sm leading-7 text-[#666159]">{text}</p><div className="mt-8 space-y-3">{(items as readonly string[]).map(item => <div key={item} className="flex items-center gap-3 border-t border-[#d4cec2] pt-3 text-xs uppercase tracking-[0.08em]"><Check className="h-4 w-4 text-[#b49970]" />{item}</div>)}</div></div>)}
          </div>
        </div>
      </section>

      <section className="border-y border-[#d4cec2] bg-[#e7e2d8] py-24 md:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.36fr_0.64fr] lg:px-10 xl:px-14"><p className="text-[10px] font-semibold tracking-[0.2em] text-[#807a70]">{c.ownershipEyebrow}</p><div><h2 className="max-w-5xl font-editorial text-[clamp(3rem,5.8vw,6rem)] leading-[0.92] tracking-[-0.05em]">{c.ownershipTitle}</h2><p className="mt-7 max-w-2xl text-base leading-8 text-[#615d55]">{c.ownershipText}</p></div></div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-10 px-5 sm:px-8 lg:flex-row lg:items-end lg:px-10 xl:px-14"><div><h2 className="max-w-4xl font-editorial text-[clamp(3rem,5.5vw,5.8rem)] leading-[0.92] tracking-[-0.05em]">{c.finalTitle}</h2><p className="mt-6 max-w-xl text-sm leading-7 text-[#666159]">{c.finalText}</p></div><div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => Analytics.whatsappClick("owned_commerce_final")} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#11110f] px-7 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">{c.finalPrimary}<ArrowUpRight className="h-4 w-4" /></a><Link href={`/${locale}/contact`} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#11110f]/25 px-7 text-[10px] font-semibold uppercase tracking-[0.14em]">{c.finalSecondary}<ArrowUpRight className="h-4 w-4" /></Link></div></div>
      </section>
    </div>
  )
}

"use client"

import Link from "next/link"
import { useLocale } from "next-intl"
import {
  ArrowRight,
  BarChart3,
  Bot,
  Cake,
  CheckCircle2,
  ChevronRight,
  Globe,
  Megaphone,
  MessageCircle,
  Search,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Store,
  Truck,
  Zap,
} from "lucide-react"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { Button } from "@/components/ui/Button"
import { allServices } from "@/data/services"
import { PRICES, formatPrice, getCurrencyForLocale, SITE_CONFIG } from "@/lib/constants"
import { Analytics } from "@/lib/analytics"

export default function ServicesPage() {
  const locale = useLocale() as "en" | "pt-BR" | "es"
  const isPt = locale === "pt-BR"
  const currency = getCurrencyForLocale(locale)

  const whatsappText = encodeURIComponent(
    isPt
      ? "Olá André, vi sua página de serviços e quero entender qual solução faz mais sentido para meu negócio."
      : "Hi Andre, I saw your services page and want to understand which solution makes sense for my business."
  )

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappText}`

  const moments = [
    {
      Icon: ShoppingBag,
      title: isPt ? "Quero começar do zero" : "I want to start from zero",
      text: isPt ? "Preciso de uma loja profissional e pronta para vender." : "I need a professional store ready to sell.",
      cta: isPt ? "Começar agora" : "Start now",
    },
    {
      Icon: BarChart3,
      title: isPt ? "Já tenho loja e quero vender mais" : "I already have a store and want more sales",
      text: isPt ? "Quero melhorar minha loja, tráfego e conversão." : "I want better store performance and conversion.",
      cta: isPt ? "Aumentar vendas" : "Increase sales",
    },
    {
      Icon: Truck,
      title: isPt ? "Negócio local ou delivery" : "Local business or delivery",
      text: isPt ? "Quero vender online na minha região com entregas." : "I want to sell online locally with delivery.",
      cta: isPt ? "Ver soluções" : "See solutions",
    },
    {
      Icon: Bot,
      title: isPt ? "Automação e escala" : "Automation and scale",
      text: isPt ? "Quero automatizar processos e escalar meu negócio." : "I want to automate and scale my business.",
      cta: isPt ? "Automatizar" : "Automate",
    },
  ]

  const categories = [
    {
      id: "shopify",
      title: isPt ? "Shopify & Loja Virtual" : "Shopify & Online Store",
      icon: ShoppingBag,
    },
    {
      id: "growth",
      title: isPt ? "Growth & Marketing" : "Growth & Marketing",
      icon: Megaphone,
    },
    {
      id: "design",
      title: isPt ? "Design & Criativo" : "Design & Creative",
      icon: Sparkles,
    },
    {
      id: "automation",
      title: isPt ? "Automação & IA" : "Automation & AI",
      icon: Bot,
    },
    {
      id: "digital",
      title: isPt ? "Digital & Infoprodutos" : "Digital & Infoproducts",
      icon: Globe,
    },
  ]

  const featuredServiceIds = [
    "shopify-development",
    "facebook-tiktok-ads",
    "store-migration",
    "seo-migration",
    "email-marketing",
    "conversion-optimization",
  ]

  const featuredServices = allServices.filter((service: any) =>
    featuredServiceIds.includes(service.id)
  )

  const fallbackServices = featuredServices.length
    ? featuredServices
    : allServices.slice(0, 6)

  const faqs = [
    {
      q: isPt ? "Você atende quem ainda não tem loja online?" : "Do you help people who do not have an online store yet?",
      a: isPt
        ? "Sim. Eu ajudo desde a estratégia inicial até a loja publicada, com estrutura para vender e receber pedidos."
        : "Yes. I help from strategy to launch, with a structure ready to sell.",
    },
    {
      q: isPt ? "Você trabalha apenas com Shopify?" : "Do you only work with Shopify?",
      a: isPt
        ? "Shopify é minha principal especialidade, mas também trabalho com estratégia, SEO, tráfego, automação, UX e gestão de ecommerce."
        : "Shopify is my main specialty, but I also work with strategy, SEO, traffic, automation, UX and ecommerce management.",
    },
    {
      q: isPt ? "Você atende mercado, confeitaria e delivery?" : "Do you work with markets, bakeries and delivery businesses?",
      a: isPt
        ? "Sim. Posso criar loja virtual, catálogo, pedidos online, integração com WhatsApp e estrutura para entrega local."
        : "Yes. I can create online stores, catalogs, online orders, WhatsApp integration and local delivery structure.",
    },
    {
      q: isPt ? "Quanto tempo leva para criar uma loja?" : "How long does it take to create a store?",
      a: isPt
        ? "Depende do escopo. Projetos simples podem começar em poucas semanas; projetos maiores exigem planejamento, design, conteúdo e integrações."
        : "It depends on the scope. Simple projects can start in a few weeks; larger projects need planning, design, content and integrations.",
    },
  ]

  return (
    <div className="bg-white text-slate-950 pt-24">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.18),transparent_30%),radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_34%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-[1.03fr_0.97fr] gap-12 items-center">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-400/20 px-4 py-2 text-sm font-medium text-emerald-300 mb-6">
                <Sparkles className="w-4 h-4" />
                {isPt ? "20+ serviços para vender online" : "20+ services to sell online"}
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
                {isPt ? (
                  <>
                    Tudo que você precisa para{" "}
                    <span className="text-emerald-300">vender mais</span> na internet.
                  </>
                ) : (
                  <>
                    Everything you need to{" "}
                    <span className="text-emerald-300">sell more</span> online.
                  </>
                )}
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
                {isPt
                  ? "Serviços completos para Shopify, lojas virtuais, delivery, marketing, SEO, automação e gestão de ecommerce. Do planejamento à execução."
                  : "Complete services for Shopify, online stores, delivery, marketing, SEO, automation and ecommerce management."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => Analytics.whatsappClick("services_clean_hero")}
                >
                  <Button variant="primary" size="lg" className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950">
                    <MessageCircle className="w-5 h-5" />
                    {isPt ? "Falar no WhatsApp" : "Talk on WhatsApp"}
                  </Button>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => Analytics.whatsappClick("services_clean_diagnosis")}
                >
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
                    <Search className="w-5 h-5" />
                    {isPt ? "Solicitar Diagnóstico" : "Request diagnosis"}
                  </Button>
                </a>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-300" />
                  {isPt ? "Atendimento para todo o Brasil" : "Remote service"}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  {isPt ? "Projetos personalizados" : "Custom projects"}
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-emerald-300" />
                  {isPt ? "Foco em resultado" : "Results focused"}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.08}>
              <div className="relative">
                <div className="absolute -inset-6 rounded-[2rem] bg-emerald-400/20 blur-3xl" />
                <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
                  <div className="grid sm:grid-cols-[1fr_0.8fr] gap-5 items-end">
                    <div className="rounded-[1.5rem] overflow-hidden bg-white">
                      <img
                        src="/images/andre1.png"
                        alt="Andre Almeida, Shopify Expert"
                        className="w-full h-[380px] object-cover object-top"
                        onError={(event) => {
                          event.currentTarget.src = "/images/andre1.png"
                        }}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-2xl bg-white text-slate-950 p-5 shadow-xl">
                        <p className="text-sm text-slate-500 mb-1">{isPt ? "Perfil" : "Profile"}</p>
                        <h2 className="font-bold text-lg">Andre Almeida</h2>
                        <p className="text-sm text-slate-500">Shopify Expert</p>
                      </div>

                      <div className="rounded-2xl bg-white text-slate-950 p-5 shadow-xl">
                        <p className="text-sm text-slate-500 mb-2">{isPt ? "Projetos entregues" : "Projects delivered"}</p>
                        <p className="text-3xl font-bold">100+</p>
                      </div>

                      <div className="rounded-2xl bg-white text-slate-950 p-5 shadow-xl">
                        <p className="text-sm text-slate-500 mb-2">{isPt ? "Experiência" : "Experience"}</p>
                        <p className="text-3xl font-bold">6+ anos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-5">
            {moments.map(({ Icon, title, text, cta }, index) => (
              <AnimatedSection key={title} delay={index * 0.06}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => Analytics.whatsappClick("services_moment")}
                  className="block h-full rounded-3xl bg-white border border-slate-200 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:border-emerald-200"
                >
                  <Icon className="w-9 h-9 text-emerald-500 mb-5" />
                  <h3 className="font-bold text-lg text-slate-950 mb-2">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">{text}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600">
                    {cta}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-emerald-600">
              {isPt ? "Todos os serviços" : "All services"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-950 mt-3 mb-4">
              {isPt ? "Nossas categorias" : "Our categories"}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              {isPt
                ? "Escolha por onde começar. Eu posso cuidar da estrutura, crescimento, automação e gestão do seu ecommerce."
                : "Choose where to start. I can help with structure, growth, automation and management."}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map(({ icon: Icon, title }, index) => (
              <AnimatedSection key={title} delay={index * 0.05}>
                <div className="rounded-3xl bg-white border border-slate-200 p-6 text-center shadow-sm h-full">
                  <Icon className="mx-auto w-8 h-8 text-emerald-500 mb-4" />
                  <h3 className="font-bold text-slate-950">{title}</h3>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-emerald-600">
              {isPt ? "Serviços em destaque" : "Featured services"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-950 mt-3 mb-4">
              {isPt ? "Soluções que geram resultados" : "Solutions that generate results"}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fallbackServices.map((svc: any, index: number) => {
              const localized = svc[locale] || svc.en
              const price = PRICES[svc.priceKey]?.[currency]

              return (
                <AnimatedSection key={svc.id} delay={index * 0.06}>
                  <div className="h-full rounded-3xl bg-white border border-slate-200 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="text-4xl mb-5">{svc.icon}</div>
                    <h3 className="text-xl font-bold text-slate-950 mb-3">{localized.t}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-5">{localized.d}</p>

                    <ul className="space-y-2 mb-7">
                      {localized.features.slice(0, 4).map((feature: string) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-end justify-between border-t border-slate-100 pt-5">
                      <div>
                        <p className="text-xs text-slate-400 mb-1">
                          {isPt ? "A partir de" : "Starting at"}
                        </p>
                        <p className="text-xl font-bold text-slate-950">
                          {price ? formatPrice(price.min, currency) : isPt ? "Sob consulta" : "On request"}
                        </p>
                      </div>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => Analytics.whatsappClick(`service_clean_${svc.id}`)}
                        className="inline-flex items-center gap-1 text-sm font-bold text-emerald-600 hover:text-emerald-700"
                      >
                        {isPt ? "Ver detalhes" : "Details"}
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="rounded-[2rem] bg-emerald-50 border border-emerald-100 p-8 md:p-10 overflow-hidden">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-950 mb-4">
                  {isPt ? "Vamos conversar sobre o seu negócio?" : "Let's talk about your business?"}
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-7">
                  {isPt
                    ? "Receba um diagnóstico inicial e descubra como podemos fazer sua operação vender mais."
                    : "Get an initial diagnosis and discover how we can make your operation sell more."}
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => Analytics.whatsappClick("services_green_cta")}
                >
                  <Button variant="primary" size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950">
                    <MessageCircle className="w-5 h-5" />
                    {isPt ? "Falar no WhatsApp" : "Talk on WhatsApp"}
                  </Button>
                </a>
              </div>

              <div className="grid sm:grid-cols-[0.8fr_1fr] gap-5 items-end">
                <img
                  src="/images/andre1.png"
                  alt="Andre Almeida"
                  className="rounded-[2rem] w-full h-[320px] object-cover object-top bg-white"
                  onError={(event) => {
                    event.currentTarget.src = "/images/andre1.png"
                  }}
                />

                <div className="rounded-[2rem] bg-white p-6 shadow-sm">
                  <h3 className="font-bold text-slate-950 text-xl">Andre Almeida</h3>
                  <p className="text-slate-500 mb-5">Shopify Expert</p>

                  {[
                    isPt ? "+100 projetos entregues" : "+100 projects delivered",
                    isPt ? "6+ anos de experiência" : "6+ years of experience",
                    isPt ? "Atendimento para todo o Brasil" : "Remote service",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-emerald-600">
              {isPt ? "Dúvidas frequentes" : "FAQ"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-950 mt-3">
              {isPt ? "Perguntas comuns" : "Common questions"}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-4">
            {faqs.map((faq, index) => (
              <AnimatedSection key={faq.q} delay={index * 0.05}>
                <div className="rounded-3xl border border-slate-200 p-6 bg-white shadow-sm h-full">
                  <h3 className="font-bold text-slate-950 mb-2">{faq.q}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-10 flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                {isPt ? "Pronto para vender online com mais estrutura?" : "Ready to sell online with more structure?"}
              </h2>
              <p className="text-slate-300">
                {isPt
                  ? "Me chame agora e eu te ajudo a entender o melhor caminho."
                  : "Message me now and I will help you understand the best path."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => Analytics.whatsappClick("services_final_clean_cta")}
              >
                <Button variant="primary" size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950">
                  <MessageCircle className="w-5 h-5" />
                  {isPt ? "Falar no WhatsApp" : "Talk on WhatsApp"}
                </Button>
              </a>

              <Link href={`/${locale}/contact`}>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  {isPt ? "Ir para contato" : "Go to contact"}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

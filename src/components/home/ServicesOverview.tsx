"use client"

import {
  ArrowRight,
  Bot,
  Cake,
  Megaphone,
  Search,
  ShoppingBag,
  ShoppingCart,
  Store,
  Truck,
} from "lucide-react"
import { useLocale } from "next-intl"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SITE_CONFIG } from "@/lib/constants"
import { Analytics } from "@/lib/analytics"

export function ServicesOverview() {
  const locale = useLocale() as "en" | "pt-BR" | "es"
  const isPt = locale === "pt-BR"

  const whatsappText = encodeURIComponent(
    isPt
      ? "Olá André, quero entender qual solução faz mais sentido para meu negócio."
      : "Hi Andre, I want to understand which solution makes sense for my business."
  )

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappText}`

  const services = [
    {
      Icon: ShoppingBag,
      title: isPt ? "Criação de loja Shopify" : "Shopify store development",
      text: isPt ? "Loja profissional, rápida e preparada para vender no Brasil ou fora." : "Professional, fast and conversion-focused Shopify stores.",
    },
    {
      Icon: Store,
      title: isPt ? "Loja virtual para negócios locais" : "Online store for local businesses",
      text: isPt ? "Para quem vende bolo, doce, roupa, cosmético, café, produtos físicos ou serviços." : "For products, services, food, fashion, beauty and local commerce.",
    },
    {
      Icon: Truck,
      title: isPt ? "Delivery online para mercado" : "Online delivery setup",
      text: isPt ? "Estrutura para mercado, mercearia, confeitaria e loja física venderem com entrega local." : "Delivery structure for local stores and markets.",
    },
    {
      Icon: Megaphone,
      title: isPt ? "Tráfego pago para ecommerce" : "Paid traffic for ecommerce",
      text: isPt ? "Campanhas, criativos, funil e estratégia para transformar visitantes em compradores." : "Campaigns, creatives and funnels to turn visitors into buyers.",
    },
    {
      Icon: Search,
      title: isPt ? "SEO para Google e IA" : "SEO for Google and AI",
      text: isPt ? "Conteúdo e estrutura para seu negócio ser encontrado no Google, ChatGPT e buscadores." : "Content and structure to be found on Google, ChatGPT and search engines.",
    },
    {
      Icon: Bot,
      title: isPt ? "Automação e IA para vendas" : "AI automation for sales",
      text: isPt ? "WhatsApp, recuperação de carrinho, atendimento automático e processos mais inteligentes." : "WhatsApp, cart recovery, automated support and smarter workflows.",
    },
  ]

  return (
    <section className="relative bg-slate-950 py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_45%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300 mb-5">
            {isPt ? "Soluções para vender online" : "Solutions to sell online"}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
            {isPt ? "Eu ajudo você a vender pela internet, mesmo que esteja começando do zero" : "I help you sell online, even if you are starting from zero"}
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            {isPt
              ? "Do pequeno negócio local até a loja Shopify avançada: eu crio a estrutura, melhoro a experiência, configuro a estratégia e preparo sua operação para crescer."
              : "From local businesses to advanced Shopify stores: I build the structure, improve the experience and prepare your operation to grow."}
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ Icon, title, text }, i) => (
            <AnimatedSection key={title} delay={i * 0.08}>
              <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-white/[0.07]">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-400/10">
                  <Icon className="h-7 w-7 text-indigo-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-slate-400 leading-relaxed mb-6">{text}</p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => Analytics.whatsappClick("services_overview_card")}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition group-hover:text-emerald-200"
                >
                  {isPt ? "Conversar sobre isso" : "Talk about this"}
                  <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4} className="mt-14 rounded-[2rem] border border-white/10 bg-gradient-to-r from-indigo-500/15 via-purple-500/10 to-emerald-500/15 p-8 md:p-10 text-center">
          <Cake className="mx-auto mb-5 h-10 w-10 text-emerald-300" />
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {isPt ? "Você não precisa saber tecnologia. Precisa saber o que quer vender." : "You do not need to understand tech. You need to know what you want to sell."}
          </h3>
          <p className="text-slate-300 max-w-3xl mx-auto mb-7">
            {isPt
              ? "Se você tem um mercado, confeitaria, loja física, marca própria ou quer começar um ecommerce, eu posso montar o caminho para sua operação vender online."
              : "If you have a local business, product brand or want to start ecommerce, I can build the path for your online operation."}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => Analytics.whatsappClick("services_overview_cta")}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-7 py-4 font-bold text-slate-950 transition hover:bg-emerald-400"
          >
            <ShoppingCart className="w-5 h-5" />
            {isPt ? "Quero vender online" : "I want to sell online"}
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}

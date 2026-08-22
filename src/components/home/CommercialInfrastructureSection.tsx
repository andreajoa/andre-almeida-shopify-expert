"use client"

import Link from "next/link"
import { useLocale } from "next-intl"
import { ArrowUpRight, BarChart3, Check, Mail, MapPin, MousePointer2, ShoppingCart, Users } from "lucide-react"
import { Analytics } from "@/lib/analytics"

const copy = {
  "pt-BR": {
    eyebrow: "05 / INFRAESTRUTURA DIGITAL PRÓPRIA",
    titleA: "Seu site não deveria ser só uma vitrine.",
    titleB: "Deveria trabalhar pelo seu negócio.",
    text: "Crio websites para estabelecimentos comerciais e e-commerces com estrutura própria de captação, CRM, dados, automações e vendas — sem depender de uma mensalidade obrigatória de plataforma para a sua operação existir.",
    cta: "Conhecer a estrutura completa",
    micro: "Sites institucionais · E-commerce · CRM · Analytics · E-mail marketing · Automação",
    metrics: [
      ["Visitantes", "28.548"],
      ["Leads", "1.284"],
      ["Pedidos", "842"],
      ["Conversão", "3,29%"],
    ],
    events: [
      ["Origem do tráfego", "Google · Instagram · Direto", "chart"],
      ["Cidade aproximada", "São Paulo · Santos · Campinas", "map"],
      ["Jornada de compra", "Produto → Carrinho → Checkout", "cart"],
      ["Mailing & CRM", "Novos leads e clientes identificados", "users"],
    ],
  },
  en: {
    eyebrow: "05 / OWNED DIGITAL INFRASTRUCTURE",
    titleA: "Your website should not be just a showcase.",
    titleB: "It should work for your business.",
    text: "I build websites for local businesses and ecommerce brands with lead capture, CRM, analytics, automations and sales infrastructure — without making your operation depend on a mandatory platform subscription.",
    cta: "Explore the complete structure",
    micro: "Business websites · Ecommerce · CRM · Analytics · Email marketing · Automation",
    metrics: [["Visitors", "28,548"], ["Leads", "1,284"], ["Orders", "842"], ["Conversion", "3.29%"]],
    events: [
      ["Traffic source", "Google · Instagram · Direct", "chart"],
      ["Approximate city", "São Paulo · Santos · Campinas", "map"],
      ["Purchase journey", "Product → Cart → Checkout", "cart"],
      ["Mailing & CRM", "New leads and identified customers", "users"],
    ],
  },
  es: {
    eyebrow: "05 / INFRAESTRUCTURA DIGITAL PROPIA",
    titleA: "Tu sitio no debería ser solo una vitrina.",
    titleB: "Debería trabajar para tu negocio.",
    text: "Creo sitios para comercios y e-commerces con captación, CRM, datos, automatizaciones y ventas — sin hacer que tu operación dependa de una mensualidad obligatoria de plataforma.",
    cta: "Conocer la estructura completa",
    micro: "Sitios comerciales · Ecommerce · CRM · Analytics · Email marketing · Automatización",
    metrics: [["Visitantes", "28.548"], ["Leads", "1.284"], ["Pedidos", "842"], ["Conversión", "3,29%"]],
    events: [
      ["Origen del tráfico", "Google · Instagram · Directo", "chart"],
      ["Ciudad aproximada", "São Paulo · Santos · Campinas", "map"],
      ["Jornada de compra", "Producto → Carrito → Checkout", "cart"],
      ["Mailing & CRM", "Nuevos leads y clientes identificados", "users"],
    ],
  },
} as const

const iconMap = {
  chart: BarChart3,
  map: MapPin,
  cart: ShoppingCart,
  users: Users,
}

export function CommercialInfrastructureSection() {
  const locale = useLocale() as keyof typeof copy
  const c = copy[locale] ?? copy.en

  return (
    <section className="border-t border-[#d4cec2] bg-[#f2efe8] py-24 text-[#11110f] md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
        <div className="grid gap-12 lg:grid-cols-[0.43fr_0.57fr] lg:gap-20">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-[#77736b]">{c.eyebrow}</p>
              <h2 className="mt-8 max-w-3xl font-editorial text-[clamp(2.9rem,6vw,6.5rem)] leading-[0.92] tracking-[-0.05em]">
                {c.titleA}{" "}
                <span className="italic text-[#5f6559]">{c.titleB}</span>
              </h2>
              <p className="mt-8 max-w-2xl text-base leading-7 text-[#666259] sm:text-lg sm:leading-8">{c.text}</p>
            </div>

            <div className="mt-10">
              <Link
                href={`/${locale}/websites-ecommerce`}
                onClick={() => Analytics.ctaClick("owned_commerce_home")}
                className="group inline-flex min-h-14 items-center gap-3 rounded-full bg-[#11110f] px-7 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#2a2925]"
              >
                {c.cta}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <p className="mt-5 max-w-xl text-[9px] font-medium uppercase leading-5 tracking-[0.14em] text-[#817c72]">{c.micro}</p>
            </div>
          </div>

          <div className="border border-[#d0c8bb] bg-[#e7e2d8] p-3 sm:p-5">
            <div className="bg-[#11110f] p-5 text-white sm:p-7">
              <div className="flex items-center justify-between gap-5 border-b border-white/10 pb-5">
                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/40">BUSINESS INTELLIGENCE</p>
                  <p className="mt-2 font-editorial text-2xl tracking-[-0.02em] sm:text-3xl">Painel comercial</p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15">
                  <BarChart3 className="h-4 w-4 text-[#c7b18d]" />
                </span>
              </div>

              <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
                {c.metrics.map(([label, value]) => (
                  <div key={label} className="bg-[#11110f] px-3 py-5 sm:px-4">
                    <p className="text-[8px] uppercase tracking-[0.14em] text-white/35">{label}</p>
                    <p className="mt-2 text-xl font-semibold tracking-[-0.04em] sm:text-2xl">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {c.events.map(([label, value, icon]) => {
                  const Icon = iconMap[icon as keyof typeof iconMap]
                  return (
                    <div key={label} className="border border-white/10 bg-white/[0.035] p-4 sm:p-5">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c7b18d]/10">
                          <Icon className="h-3.5 w-3.5 text-[#c7b18d]" />
                        </span>
                        <div>
                          <p className="text-[8px] font-semibold uppercase tracking-[0.13em] text-white/38">{label}</p>
                          <p className="mt-2 text-xs leading-5 text-white/78 sm:text-sm">{value}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-5 text-[8px] uppercase tracking-[0.13em] text-white/45">
                <span className="flex items-center gap-1.5"><Check className="h-3 w-3 text-[#c7b18d]" /> CRM</span>
                <span className="flex items-center gap-1.5"><Mail className="h-3 w-3 text-[#c7b18d]" /> E-mail</span>
                <span className="flex items-center gap-1.5"><MousePointer2 className="h-3 w-3 text-[#c7b18d]" /> Eventos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

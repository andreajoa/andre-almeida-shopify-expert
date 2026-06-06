"use client"

import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Rocket,
  ShoppingCart,
  TrendingUp,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { useLocale } from "next-intl"
import { SITE_CONFIG } from "@/lib/constants"
import { Analytics } from "@/lib/analytics"

export function HeroSection() {
  const locale = useLocale() as "en" | "pt-BR" | "es"
  const isPt = locale === "pt-BR"
  const isEs = locale === "es"

  const whatsappText = encodeURIComponent(
    isPt
      ? "Olá André, vi seu site e quero conversar sobre minha loja online."
      : isEs
      ? "Hola André, vi tu sitio web y quiero hablar sobre mi tienda online."
      : "Hi Andre, I saw your website and want to talk about my online store."
  )

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappText}`

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 pt-28 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.28),transparent_35%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_30%),linear-gradient(135deg,#020617_0%,#0f172a_55%,#020617_100%)]" />
      <div className="absolute inset-0 opacity-[0.035]" style={{
        backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
        backgroundSize: "42px 42px",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.04fr_0.96fr] gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm mb-7">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              {isPt
                ? "Especialista em Shopify, loja virtual, delivery online e crescimento digital"
                : isEs ? "Especialista en Shopify, tienda online, delivery y crecimiento digital"
                : "Shopify, online store, delivery and ecommerce growth specialist"}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.04] mb-7">
              {isPt ? (
                <>
                  Transformo sua ideia em uma{" "}
                  <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-insta-accent bg-clip-text text-transparent">
                    loja online pronta para vender
                  </span>
                </>
              ) : isEs ? (
                <>
                  Convierto tu idea en una{" "}
                  <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-insta-accent bg-clip-text text-transparent">
                    tienda online lista para vender
                  </span>
                </>
              ) : (
                <>
                  I turn your idea into an{" "}
                  <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-insta-accent bg-clip-text text-transparent">
                    online store built to sell
                  </span>
                </>
              )}
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mb-8">
              {isPt
                ? "Criação de lojas Shopify, e-commerce, delivery online, automações, tráfego pago e gestão para quem quer vender produtos, bolos, doces, roupas, cosméticos, café, mercados e serviços pela internet."
                : isEs ? "Tiendas Shopify, ecommerce, delivery online, automatizaciones, tráfico pago y gestión para quienes quieren vender productos, ropa, cosméticos y servicios por internet." : "Shopify stores, ecommerce, online delivery, automation, paid traffic and store management for brands and businesses that want to sell online."}
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-9 max-w-2xl">
              {[
                isPt ? "Para quem quer abrir uma loja virtual do zero" : isEs ? "Para quienes quieren abrir una tienda online desde cero" : "For new online stores",
                isPt ? "Para quem já vende, mas quer vender mais" : isEs ? "Para quienes ya venden pero quieren vender más" : "For stores that want more sales",
                isPt ? "Para mercados, confeitarias e negócios locais" : isEs ? "Para mercados, confiterías y negocios locales" : "For local businesses and delivery",
                isPt ? "Para Shopify, tráfego, SEO e automação" : isEs ? "Para Shopify, tráfico, SEO y automatización" : "For Shopify, traffic, SEO and automation",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-insta-neon shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => Analytics.whatsappClick("hero_primary")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-insta-violet px-7 py-4 font-bold text-slate-950 shadow-[0_0_40px_rgba(124,58,237,0.35)] transition hover:-translate-y-0.5 hover:bg-insta-purple"
              >
                <MessageCircle className="w-5 h-5" />
                {isPt ? "Chamar no WhatsApp" : isEs ? "Escribir por WhatsApp" : "Message me on WhatsApp"}
              </a>

              <Link
                href={`/${locale}/services`}
                onClick={() => Analytics.ctaClick("hero_services")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                {isPt ? "Ver soluções" : isEs ? "Ver soluciones" : "View services"}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <p className="text-sm text-slate-400">
              {isPt
                ? "Diagnóstico inicial sem compromisso • Atendimento para todo o Brasil"
                : isEs ? "Diagnóstico inicial sin compromiso • Atención en todo el mundo" : "Free initial diagnosis • Remote service worldwide"}
            </p>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "6+", label: isPt ? "anos de experiência" : isEs ? "años de experiencia" : "years of experience" },
                { value: "100+", label: isPt ? "lojas e projetos" : isEs ? "tiendas y proyectos" : "stores and projects" },
                { value: "15+", label: isPt ? "países atendidos" : isEs ? "países atendidos" : "countries served" },
                { value: "Shopify", label: isPt ? "especialista" : isEs ? "especialista" : "specialist" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-insta-purple/20 blur-3xl" />

            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-2xl backdrop-blur">
              <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-5">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-sm text-slate-400">{isPt ? "Diagnóstico da loja" : isEs ? "Diagnóstico de la tienda" : "Store diagnosis"}</p>
                    <h2 className="text-xl font-bold text-white">{isPt ? "Plano de crescimento" : isEs ? "Plan de crecimiento" : "Growth plan"}</h2>
                  </div>
                  <span className="rounded-full bg-insta-violet/15 px-3 py-1 text-xs font-semibold text-insta-accent">
                    Online
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  {[
                    { icon: ShoppingCart, label: isPt ? "Loja virtual" : isEs ? "Tienda online" : "Online store", value: "Shopify" },
                    { icon: TrendingUp, label: isPt ? "Conversão" : isEs ? "Conversión" : "Conversion", value: "+ ventas" },
                    { icon: Zap, label: "Performance", value: "SEO + speed" },
                    { icon: Rocket, label: isPt ? "Escala" : isEs ? "Escala" : "Scale", value: "Ads + IA" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <Icon className="w-5 h-5 text-indigo-300 mb-3" />
                      <p className="text-xs text-slate-400">{label}</p>
                      <p className="font-bold text-white">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl bg-gradient-to-r from-indigo-500/15 to-insta-purple/15 border border-white/10 p-5 mb-5">
                  <p className="text-sm text-slate-300 mb-3">
                    {isPt ? "O que eu identifico no diagnóstico:" : isEs ? "Lo que identifico en el diagnóstico:" : "What I check in the diagnosis:"}
                  </p>
                  <div className="space-y-3">
                    {[
                      isPt ? "Onde sua loja perde vendas" : isEs ? "Dónde tu tienda pierde ventas" : "Where your store loses sales",
                      isPt ? "O que precisa melhorar no layout" : isEs ? "Qué necesita mejorar en el diseño" : "What needs to improve in the layout",
                      isPt ? "Como atrair clientes pelo Google, IA e tráfego pago" : isEs ? "Cómo atraer clientes por Google, IA y tráfico pago" : "How to attract customers from search, AI and ads",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-insta-neon" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => Analytics.whatsappClick("hero_dashboard")}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-white text-slate-950 px-5 py-4 font-bold transition hover:bg-slate-200"
                >
                  {isPt ? "Quero meu diagnóstico" : isEs ? "Quiero mi diagnóstico" : "I want my diagnosis"}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

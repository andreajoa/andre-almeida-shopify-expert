"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  CheckCircle2,
  Code2,
  Globe2,
  LineChart,
  MessageCircle,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Target,
  Users,
  Zap,
} from "lucide-react"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { Button } from "@/components/ui/Button"
import { SITE_CONFIG } from "@/lib/constants"
import { Analytics } from "@/lib/analytics"

export default function AboutPage() {
  const t = useTranslations()
  const locale = useLocale() as "en" | "pt-BR" | "es"
  const isPt = locale === "pt-BR"

  const whatsappText = encodeURIComponent(
    isPt
      ? "Olá André, vi sua página Sobre e quero conversar sobre minha loja online."
      : "Hi Andre, I saw your About page and want to talk about my online store."
  )

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappText}`

  const stats = [
    { icon: ShoppingBag, value: "100+", label: isPt ? "Projetos entregues" : "Projects delivered" },
    { icon: Star, value: "6+", label: isPt ? "Anos de experiência" : "Years of experience" },
    { icon: Globe2, value: "15+", label: isPt ? "Países atendidos" : "Countries served" },
    { icon: ShieldCheck, value: "Shopify Expert", label: isPt ? "Reconhecido oficialmente" : "Recognized specialist" },
  ]

  const delivery = [
    isPt ? "Lojas Shopify de alta performance, rápidas e escaláveis" : "High-performance, fast and scalable Shopify stores",
    isPt ? "Experiências personalizadas focadas em conversão e retenção" : "Custom experiences focused on conversion and retention",
    isPt ? "Estratégias de growth orientadas por dados e CRO" : "Data-driven growth and CRO strategies",
    isPt ? "Acompanhamento próximo e transparência em cada etapa" : "Close support and transparency at every step",
    isPt ? "Tecnologia de ponta aliada a criatividade e estratégia" : "Modern technology combined with creativity and strategy",
  ]

  const expertise = [
    {
      icon: Code2,
      title: "Shopify Development",
      text: isPt
        ? "Lojas personalizadas, temas exclusivos e integrações avançadas."
        : "Custom stores, exclusive themes and advanced integrations.",
    },
    {
      icon: Zap,
      title: "Headless & Hydrogen",
      text: isPt
        ? "Experiências headless ultrarrápidas com React e Hydrogen."
        : "Ultra-fast headless experiences with React and Hydrogen.",
    },
    {
      icon: BarChart3,
      title: "CRO & Performance",
      text: isPt
        ? "Otimização de conversão, testes A/B e performance de alto nível."
        : "Conversion optimization, A/B testing and high-level performance.",
    },
    {
      icon: LineChart,
      title: "Growth & Marketing",
      text: isPt
        ? "Estratégias de aquisição, retenção e crescimento sustentável."
        : "Acquisition, retention and sustainable growth strategies.",
    },
    {
      icon: Bot,
      title: isPt ? "Automação & IA" : "Automation & AI",
      text: isPt
        ? "Automação de processos, integrações e IA para escalar resultados."
        : "Process automation, integrations and AI to scale results.",
    },
  ]

  const timeline = [
    { year: "2019", event: t("about.timeline.2019") },
    { year: "2020", event: t("about.timeline.2020") },
    { year: "2021", event: t("about.timeline.2021") },
    { year: "2022", event: t("about.timeline.2022") },
    { year: "2023", event: t("about.timeline.2023") },
    { year: "2024", event: t("about.timeline.2024") },
    { year: "2025", event: t("about.timeline.2025") },
  ]

  return (
    <div className="bg-slate-950 text-white pt-24 overflow-hidden">
      <section className="relative min-h-[calc(100vh-6rem)] flex items-center py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.38),transparent_34%),radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_32%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-purple-900/20 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
            <AnimatedSection>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-purple-300 mb-6">
                {isPt ? "Sobre Andre Almeida" : "About Andre Almeida"}
              </p>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.04] tracking-tight mb-6">
                {isPt ? (
                  <>
                    Construindo experiências Shopify que geram{" "}
                    <span className="bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                      crescimento real.
                    </span>
                  </>
                ) : (
                  <>
                    Building Shopify experiences that create{" "}
                    <span className="bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                      real growth.
                    </span>
                  </>
                )}
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
                {isPt
                  ? "Sou desenvolvedor Shopify Expert e especialista em Growth para E-commerce. Transformo ideias em lojas escaláveis, otimizadas para performance e pensadas para crescer."
                  : "I am a Shopify Expert developer and ecommerce growth specialist. I turn ideas into scalable stores optimized for performance and built to grow."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => Analytics.whatsappClick("about_hero")}
                >
                  <Button variant="primary" size="lg">
                    <MessageCircle className="w-5 h-5" />
                    {isPt ? "Agendar Consulta Gratuita" : "Book a Free Consultation"}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </a>

                <Link href={`/${locale}/portfolio`}>
                  <Button variant="outline" size="lg">
                    {isPt ? "Ver Projetos" : "View Projects"}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.08}>
              <div className="relative h-[460px] sm:h-[540px] lg:h-[680px] overflow-hidden">
                <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_65%_35%,rgba(124,58,237,0.35),transparent_42%),linear-gradient(180deg,rgba(15,23,42,0)_0%,rgba(2,6,23,0.12)_100%)]" />
                <div className="absolute right-[-8%] top-[2%] h-[540px] w-[540px] lg:h-[740px] lg:w-[740px] rounded-full border border-purple-400/20" />
                <div className="absolute right-[4%] top-[10%] h-[430px] w-[430px] lg:h-[590px] lg:w-[590px] rounded-full border border-indigo-300/12" />

                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent z-10" />

                <div className="absolute right-[-4%] bottom-0 z-20 h-full w-[86%] sm:w-[78%] lg:w-[82%]">
                  <img
                    src="/images/andre4.png"
                    alt="Andre Almeida"
                    className="absolute bottom-0 right-0 h-[112%] lg:h-[118%] w-auto max-w-none object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.45)]"
                    onError={(event) => {
                      event.currentTarget.src = "/images/andre3-small.jpg"
                    }}
                  />
                </div>

                <div className="absolute right-2 top-10 z-30 hidden lg:block text-purple-200/90 font-serif italic text-4xl">
                  Andre Almeida
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.15}>
            <div className="relative z-20 -mt-4 grid md:grid-cols-4 gap-4 rounded-[2rem] border border-white/10 bg-white/[0.08] p-5 shadow-2xl backdrop-blur-xl">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={value} className="flex items-center gap-4 rounded-2xl p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/15 border border-purple-400/20">
                    <Icon className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{value}</p>
                    <p className="text-sm text-slate-400">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14">
            <AnimatedSection>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-purple-300 mb-4">
                {isPt ? "Minha história" : "My story"}
              </p>
              <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-6">
                {isPt
                  ? "De uma paixão por tecnologia a resultados que transformam."
                  : "From a passion for technology to results that transform."}
              </h2>

              <div className="space-y-5 text-slate-300 leading-relaxed">
                <p>{t("about.bio2")}</p>
                <p>{t("about.bio3")}</p>
                <p>{t("about.bio4")}</p>
              </div>

              <p className="mt-8 text-3xl font-serif italic text-purple-300">Andre Almeida</p>
            </AnimatedSection>

            <AnimatedSection delay={0.08}>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-purple-300 mb-4">
                {isPt ? "O que eu entrego" : "What I deliver"}
              </p>
              <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-8">
                {isPt
                  ? "Soluções completas para e-commerces que querem escalar."
                  : "Complete solutions for ecommerce brands that want to scale."}
              </h2>

              <div className="divide-y divide-white/10 rounded-[2rem] border border-white/10 bg-white/[0.04]">
                {delivery.map((item, index) => (
                  <div key={item} className="flex items-start gap-4 p-5">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 border border-purple-400/20">
                      <CheckCircle2 className="w-5 h-5 text-purple-300" />
                    </div>
                    <p className="text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-purple-300 mb-4">
              Expertise
            </p>
            <h2 className="text-3xl md:text-5xl font-serif">
              {isPt ? "Como posso impulsionar seu e-commerce" : "How I can accelerate your ecommerce"}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
            {expertise.map(({ icon: Icon, title, text }, index) => (
              <AnimatedSection key={title} delay={index * 0.06}>
                <div className="group h-full rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:bg-white/[0.07]">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/15 border border-purple-400/20">
                    <Icon className="w-6 h-6 text-purple-300" />
                  </div>
                  <h3 className="font-bold text-white mb-3">{title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{text}</p>
                  <ArrowRight className="mt-5 w-5 h-5 text-slate-500 transition group-hover:translate-x-1 group-hover:text-purple-300" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-purple-300 mb-4">
              {isPt ? "Jornada" : "Journey"}
            </p>
            <h2 className="text-3xl md:text-5xl font-serif">
              {isPt ? "Marcos que moldaram minha trajetória" : "Milestones that shaped my journey"}
            </h2>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-0 right-0 top-5 hidden h-px bg-purple-400/40 md:block" />
            <div className="grid md:grid-cols-7 gap-4">
              {timeline.map((item, index) => (
                <AnimatedSection key={item.year} delay={index * 0.05}>
                  <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center h-full">
                    <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 border-4 border-slate-950 text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-purple-300 font-bold mb-2">{item.year}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.event}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 md:p-8">
              <div className="grid md:grid-cols-5 gap-5 items-center">
                <div className="md:col-span-2 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15">
                    <ShoppingBag className="w-9 h-9 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Shopify Expert</h3>
                    <p className="text-sm text-slate-400">
                      {isPt ? "Parceiro oficial Shopify com certificações avançadas." : "Official Shopify partner with advanced certifications."}
                    </p>
                  </div>
                </div>

                {[
                  { value: "100+", label: isPt ? "Projetos entregues" : "Projects delivered" },
                  { value: "15+", label: isPt ? "Países atendidos" : "Countries served" },
                  { value: "6+", label: isPt ? "Anos de experiência" : "Years experience" },
                ].map((item) => (
                  <div key={item.value} className="text-center md:border-l md:border-white/10">
                    <p className="text-3xl font-bold">{item.value}</p>
                    <p className="text-sm text-slate-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.32),transparent_34%)]" />
        <div className="relative max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="grid lg:grid-cols-[1fr_0.9fr] gap-8 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-5">
                  {isPt ? "Pronto para transformar seu e-commerce?" : "Ready to transform your ecommerce?"}
                </h2>
                <p className="text-slate-300 max-w-2xl">
                  {isPt
                    ? "Vamos conversar sobre seu projeto e criar uma estratégia personalizada para gerar crescimento real."
                    : "Let's talk about your project and create a custom strategy to generate real growth."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => Analytics.whatsappClick("about_final_cta")}
                >
                  <Button variant="primary" size="lg">
                    <MessageCircle className="w-5 h-5" />
                    {isPt ? "Agendar Consulta Gratuita" : "Book a Free Consultation"}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </a>

                <Link href={`/${locale}/portfolio`}>
                  <Button variant="outline" size="lg">
                    {isPt ? "Ver Todos os Projetos" : "View All Projects"}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

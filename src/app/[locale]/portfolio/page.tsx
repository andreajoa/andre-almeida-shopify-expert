"use client"

import { useState } from "react"
import { useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe2,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from "lucide-react"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { projects } from "@/data/portfolio"
import { SITE_CONFIG } from "@/lib/constants"
import { Analytics } from "@/lib/analytics"

const filters = [
  { id: "all", pt: "Todos", en: "All" },
  { id: "fashion", pt: "Moda", en: "Fashion" },
  { id: "beauty", pt: "Beleza", en: "Beauty" },
  { id: "electronics", pt: "Eletrônicos", en: "Electronics" },
  { id: "supplements", pt: "Suplementos", en: "Supplements" },
  { id: "luxury", pt: "Luxo", en: "Luxury" },
  { id: "petshop", pt: "Pet Shop", en: "Pet Shop" },
  { id: "jewelry", pt: "Joias", en: "Jewelry" },
  { id: "homeDecor", pt: "Casa & Decoração", en: "Home Decor" },
]

export default function PortfolioPage() {
  const locale = useLocale() as "en" | "pt-BR" | "es"
  const isPt = locale === "pt-BR"
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.niche === activeFilter)

  const heroProjects = [
    projects.find((project) => project.id === "fashion-5"),
    projects.find((project) => project.id === "fashion-2"),
  ].filter(Boolean) as typeof projects

  const gridProjects = filteredProjects.filter(
    (project) => !heroProjects.some((heroProject) => heroProject.id === project.id)
  )

  const whatsappText = encodeURIComponent(
    isPt
      ? "Olá André, vi seu portfólio e quero conversar sobre minha loja online."
      : "Hi Andre, I saw your portfolio and want to talk about my online store."
  )

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappText}`

  return (
    <div className="bg-slate-950 text-white pt-24">
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.24),transparent_32%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_28%)]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-sm font-semibold text-indigo-200 mb-6">
              <Sparkles className="w-4 h-4" />
              {isPt ? "Portfólio" : "Portfolio"}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
              {isPt ? "Portfólio de Projetos" : "Project Portfolio"}
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-10">
              {isPt
                ? "Lojas Shopify que geram experiências incríveis, ecommerce de alta conversão e resultados reais para diferentes nichos."
                : "Shopify stores that create strong experiences, high-converting ecommerce and real results across different niches."}
            </p>

            <div className="grid md:grid-cols-3 gap-4 max-w-5xl">
              {[
                {
                  icon: Zap,
                  title: isPt ? "Foco em performance" : "Performance focused",
                  text: isPt ? "Velocidade e UX que vendem" : "Speed and UX that sell",
                },
                {
                  icon: ShieldCheck,
                  title: isPt ? "Design estratégico" : "Strategic design",
                  text: isPt ? "Marcas memoráveis e escaláveis" : "Memorable and scalable brands",
                },
                {
                  icon: BarChart3,
                  title: isPt ? "Resultados comprovados" : "Proven results",
                  text: isPt ? "Dados reais, crescimento real" : "Real data, real growth",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <Icon className="w-7 h-7 text-indigo-300 mb-4" />
                  <h3 className="font-bold text-white mb-1">{title}</h3>
                  <p className="text-sm text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] font-bold text-indigo-300 mb-3">
                {isPt ? "Estudos de caso em destaque" : "Featured case studies"}
              </p>
              <h2 className="text-2xl md:text-4xl font-bold">
                {isPt ? "Projetos com foco em conversão" : "Projects focused on conversion"}
              </h2>
            </div>

            <a
              href="#todos-os-projetos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 hover:text-indigo-200"
            >
              {isPt ? "Ver todos os projetos" : "View all projects"}
              <ArrowRight className="w-4 h-4" />
            </a>
          </AnimatedSection>

          <div className="space-y-6">
            {heroProjects.map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 0.08}>
                <FeaturedProjectCard project={project} reversed={index % 2 === 1} isPt={isPt} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="todos-os-projetos" className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-8 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 text-center">
            <p className="text-sm text-slate-300 max-w-4xl mx-auto leading-relaxed">
              {isPt
                ? "Por confidencialidade, alguns projetos não exibem links públicos. Durante a conversa, posso apresentar exemplos reais, contexto dos projetos e referências disponíveis."
                : "For confidentiality, some projects do not display public links. During our conversation, I can share real examples, project context and available references."}
            </p>
          </AnimatedSection>

          <AnimatedSection className="flex flex-wrap justify-center gap-2 mb-10">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeFilter === filter.id
                    ? "bg-indigo-600 text-white shadow-[0_0_24px_rgba(79,70,229,0.35)]"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {isPt ? filter.pt : filter.en}
              </button>
            ))}
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {gridProjects.map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 0.04}>
                <ProjectMiniCard project={project} isPt={isPt} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="grid md:grid-cols-4 gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
              {[
                {
                  icon: Rocket,
                  value: "100+",
                  label: isPt ? "Projetos entregues com sucesso" : "Successful projects delivered",
                },
                {
                  icon: ShieldCheck,
                  value: "6+",
                  label: isPt ? "Anos de experiência com Shopify" : "Years of Shopify experience",
                },
                {
                  icon: Globe2,
                  value: "15+",
                  label: isPt ? "Países atendidos no mundo todo" : "Countries served worldwide",
                },
                {
                  icon: Star,
                  value: "5.0★",
                  label: isPt ? "Avaliação média dos clientes" : "Average client rating",
                },
              ].map(({ icon: Icon, value, label }) => (
                <div key={value} className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 border border-indigo-400/20">
                    <Icon className="w-7 h-7 text-indigo-300" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">{value}</p>
                    <p className="text-sm text-slate-400 leading-tight">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-10 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-indigo-500/15 via-purple-500/10 to-insta-purple/15 p-8 md:p-10">
              <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] font-bold text-indigo-300 mb-4">
                    {isPt ? "Vamos criar algo incrível?" : "Shall we build something great?"}
                  </p>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    {isPt
                      ? "Pronto para transformar sua loja em uma máquina de resultados?"
                      : "Ready to turn your store into a results machine?"}
                  </h2>
                  <p className="text-slate-300 max-w-2xl leading-relaxed">
                    {isPt
                      ? "Fale comigo no WhatsApp e receba uma análise inicial do seu ecommerce, ideia ou projeto Shopify."
                      : "Message me on WhatsApp and get an initial review of your ecommerce, idea or Shopify project."}
                  </p>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => Analytics.whatsappClick("portfolio_final_cta")}
                  className="group rounded-[2rem] border border-white/10 bg-slate-950/70 p-7 transition hover:bg-slate-950"
                >
                  <div className="flex items-center gap-5">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-insta-violet/15 border border-insta-violet/20">
                      <MessageCircle className="w-10 h-10 text-insta-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {isPt ? "Falar no WhatsApp" : "Talk on WhatsApp"}
                      </h3>
                      <p className="text-slate-400">
                        {isPt ? "Resposta rápida e atendimento direto" : "Fast reply and direct support"}
                      </p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-white transition group-hover:translate-x-1" />
                  </div>
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

function FeaturedProjectCard({
  project,
  reversed,
  isPt,
}: {
  project: (typeof projects)[number]
  reversed?: boolean
  isPt: boolean
}) {
  const metrics = normalizeMetrics(project.results)

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white text-slate-950 shadow-2xl">
      <div className={`grid lg:grid-cols-2 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div className="p-7 md:p-10 flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-indigo-600 mb-4">
            {project.nicheKey}
          </p>

          <h3 className="text-3xl md:text-5xl font-bold mb-4">{project.title}</h3>

          <p className="text-slate-600 leading-relaxed mb-7">{project.challenge}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-7">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xl font-bold text-insta-accent">{metric.value}</p>
                <p className="text-xs text-slate-500">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-7">
            {project.technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {tech}
              </span>
            ))}
          </div>

          <span className="inline-flex items-center gap-2 font-bold text-indigo-600">
            {isPt ? "Solicitar detalhes no WhatsApp" : "Request details on WhatsApp"}
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>

        <div className="relative min-h-[320px] lg:min-h-[460px] bg-slate-100">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-contain object-center p-4"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 to-transparent" />
        </div>
      </div>
    </div>
  )
}

function ProjectMiniCard({
  project,
  isPt,
}: {
  project: (typeof projects)[number]
  isPt: boolean
}) {
  return (
    <div className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-white text-slate-950 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="grid grid-cols-[104px_1fr] gap-4 p-3">
        <div className="relative h-24 overflow-hidden rounded-xl bg-slate-100">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="104px"
          />
        </div>

        <div className="min-w-0 py-1 pr-1">
          <p className="text-[10px] uppercase tracking-wide font-bold text-indigo-600 mb-1">
            {project.nicheKey}
          </p>
          <h3 className="font-bold text-slate-950 truncate">{project.title}</h3>

          <div className="mt-2 space-y-1">
            {project.results.slice(0, 2).map((result) => (
              <p key={result} className="flex items-center gap-1 text-xs text-insta-accent">
                <CheckCircle2 className="w-3 h-3 shrink-0" />
                <span className="truncate">{result}</span>
              </p>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">
              {isPt ? "Projeto" : "Project"}
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition group-hover:bg-indigo-600 group-hover:text-white">
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function normalizeMetrics(results: string[]) {
  const defaults = [
    { value: "+82%", label: "Conversão" },
    { value: "+65%", label: "AOV" },
    { value: "98/100", label: "PageSpeed" },
    { value: "+130%", label: "Receita" },
  ]

  const mapped = results.slice(0, 4).map((result) => {
    const valueMatch = result.match(/([+\-]?\d+[%x]?|\d+\.\d+x|\d+\/100|ROAS\s?\d+\.?\d*x?)/i)
    const value = valueMatch ? valueMatch[0] : result.split(" ").slice(0, 2).join(" ")
    const label = result.replace(value, "").replace(/^[\s\-+]+/, "").trim() || "Resultado"
    return { value, label }
  })

  return [...mapped, ...defaults].slice(0, 4)
}

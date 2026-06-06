"use client"

import Image from "next/image"
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { Analytics } from "@/lib/analytics"

const projects = [
  {
    title: "NOVA AI Studio",
    category: "IA & Tecnologia",
    description: "Plataforma para geração de vídeos, imagens e criativos com múltiplos modelos de IA.",
    image: "/portfolio-real/nova.webp",
    link: "https://www.novvideos.online/",
    tags: ["IA", "SaaS", "Vídeo"],
    featured: true,
  },
  {
    title: "CAA Neuro",
    category: "Saúde & Acessibilidade",
    description: "App de comunicação alternativa com pranchas, voz, tradução, IA e recursos terapêuticos.",
    image: "/portfolio-real/caa-neuro.webp",
    link: "https://www.adhdautism.online/",
    tags: ["App", "Acessibilidade", "IA"],
    featured: true,
  },
  {
    title: "Gilberto Souza",
    category: "Livros & Educação",
    description: "Website de venda de livro físico, eBook e audiobook com checkout e experiência multilíngue.",
    image: "/portfolio-real/gilberto-souza.webp",
    link: "https://www.gilberto-souza.com/",
    tags: ["Livro", "Checkout", "Digital"],
  },
  {
    title: "Projeto GK",
    category: "Livros & Educação",
    description: "Landing page de livro com narrativa emocional, oferta estruturada e foco em conversão.",
    image: "/portfolio-real/projeto-gk.webp",
    link: "https://projetogk.com/pt",
    tags: ["Landing Page", "Livro", "Conversão"],
  },
  {
    title: "Vastara",
    category: "E-commerce",
    description: "Loja online premium de relógios com vitrine visual, produtos e identidade elegante.",
    image: "/portfolio-real/vastara.webp",
    link: "https://vastara.online/",
    tags: ["Ecommerce", "Relógios", "Produto"],
  },
  {
    title: "Brinqueteando",
    category: "E-commerce & Educação",
    description: "Loja de brinquedos terapêuticos para crianças neurodivergentes com foco em confiança.",
    image: "/portfolio-real/brinqueteando.webp",
    link: "https://brinqueteando.online/",
    tags: ["Shopify", "Educação", "Terapêutico"],
  },
  {
    title: "Express Solution",
    category: "Finanças & Educação",
    description: "Página de venda para guia de impostos nos EUA com oferta, conteúdo e checkout.",
    image: "/portfolio-real/express-solution.webp",
    link: "https://www.express-solution.com/",
    tags: ["Ebook", "Finanças", "Checkout"],
  },
  {
    title: "Margareth eBook",
    category: "Produto Digital",
    description: "Landing page acolhedora para venda de eBook com narrativa emocional e CTA direto.",
    image: "/portfolio-real/margareth-ebook.webp",
    link: "https://margarethebook.vercel.app/",
    tags: ["Ebook", "Landing Page", "Família"],
  },
]

export function LatestRealProjects() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.12),transparent_32%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-insta-violet/20 bg-insta-purple/10 px-4 py-2 text-sm font-semibold text-insta-accent mb-5">
            <Sparkles className="w-4 h-4" />
            Veja o que acontece quando estratégia encontra execução
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-5">
            Negócios reais transformados em experiências que vendem todos os dias
          </h2>

          <p className="text-lg text-slate-400 leading-relaxed">
            Ecommerce, plataformas, apps e experiências digitais desenvolvidas para gerar crescimento, confiança e conversão.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7 mt-14">
          {projects.map((project, index) => (
            <AnimatedSection key={project.title} delay={index * 0.04}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => Analytics.ctaClick(`latest_project_${project.title}`)}
                className={`group block h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition-all duration-500 hover:-translate-y-1 hover:border-insta-violet/40 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-emerald-500/10 ${
                  project.featured ? "lg:col-span-2" : ""
                }`}
              >
                <div className={`relative overflow-hidden bg-slate-900 ${project.featured ? "h-[380px]" : "h-[280px]"}`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                    sizes={project.featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                    <ExternalLink className="h-5 w-5 text-white" />
                  </div>
                </div>

                <div className="p-6">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-insta-accent">
                    {project.category}
                  </p>

                  <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-white">
                    {project.title}
                  </h3>

                  <p className="mb-5 text-sm leading-relaxed text-slate-400">
                    {project.description}
                  </p>

                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-insta-accent">
                    Ver projeto ao vivo
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>
      
        <AnimatedSection delay={0.6} className="mt-16">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 to-indigo-950 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-insta-accent font-semibold mb-2">
                PRONTO PARA TER ALGO ASSIM?
              </p>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Seu projeto pode ser o próximo case de sucesso.
              </h3>

              <p className="text-slate-400">
                Vamos transformar sua ideia em um produto digital profissional.
              </p>
            </div>

            <a
              href="https://wa.me/"
              target="_blank"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:scale-105 transition-all"
            >
              Quero meu projeto →
            </a>
          </div>
        </AnimatedSection>

</div>
</section>
  )
}

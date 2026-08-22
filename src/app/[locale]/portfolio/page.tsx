import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Sparkles } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

type Props = { params: Promise<{ locale: string }> }
type Case = {
  title: string
  image: string
  href: string
  pt: string
  en: string
  ptDesc: string
  enDesc: string
  commerce?: boolean
}

const cases: Case[] = [
  {
    title: "NOVA AI Studio",
    image: "/brand/nova-ai.webp",
    href: "https://www.novvideos.online/",
    pt: "Produto digital · IA · SaaS",
    en: "Digital product · AI · SaaS",
    ptDesc: "Plataforma de criação com IA tratada como produto: identidade, interface, fluxo e percepção de tecnologia.",
    enDesc: "An AI creation platform treated as a product: identity, interface, flow and technology perception.",
  },
  {
    title: "CAA Neuro",
    image: "/brand/caa-neuro.webp",
    href: "https://www.caaneuro.online/",
    pt: "Acessibilidade · App · IA",
    en: "Accessibility · App · AI",
    ptDesc: "Tecnologia assistiva transformando recursos complexos em uma experiência acessível para comunicação e apoio.",
    enDesc: "Assistive technology turning complex capabilities into an accessible communication and support experience.",
  },
  {
    title: "AMB Boutique",
    image: "/brand/amb-boutique.jpg",
    href: "https://www.ambboutique.online/",
    pt: "E-commerce · Moda feminina",
    en: "Ecommerce · Women’s fashion",
    ptDesc: "Boutique de moda feminina com direção editorial, experiência internacional e jornada de compra construída para percepção de marca e conversão.",
    enDesc: "A women’s fashion boutique combining editorial direction, international merchandising and a conversion-focused customer journey.",
    commerce: true,
  },
  {
    title: "Brinqueteando",
    image: "/brand/brinqueteando-showcase-v2.webp",
    href: "https://www.brinqueteando.online/",
    pt: "E-commerce · Educação",
    en: "Ecommerce · Education",
    ptDesc: "Loja de brinquedos terapêuticos com linguagem clara, acolhedora e orientada à decisão de compra.",
    enDesc: "A therapeutic toy store with clear, reassuring language designed to support purchase decisions.",
    commerce: true,
  },
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return locale === "en"
    ? {
        title: "Portfolio | Websites, Ecommerce & Digital Products",
        description: "Selected websites, ecommerce stores, AI products and digital systems created by Andre Almeida.",
      }
    : {
        title: "Portfólio | Websites, E-commerce e Produtos Digitais",
        description: "Projetos selecionados de websites, e-commerce, produtos com IA e sistemas digitais desenvolvidos por André Almeida.",
      }
}

function BrowserShowcase({ project }: { project: Case }) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-[#cfc8bc] bg-[#f7f4ed] shadow-[0_18px_55px_rgba(17,17,15,0.08)] transition duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_24px_70px_rgba(17,17,15,0.12)] sm:rounded-[18px]">
      <div className="flex h-8 items-center gap-1.5 border-b border-[#d8d2c7] bg-[#f2efe8] px-3 sm:h-9 sm:px-4" aria-hidden="true">
        <span className="h-1.5 w-1.5 rounded-full bg-[#9b9589]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#b8b1a4]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#c9c2b5]" />
      </div>
      <div className="bg-[#f7f4ed] p-1.5 sm:p-3">
        <div className="relative aspect-[1.62/1] w-full overflow-hidden bg-[#f7f4ed] sm:aspect-[2.15/1]">
          <Image
            src={project.image}
            alt={`Projeto ${project.title}`}
            fill
            unoptimized
            loading="eager"
            className="object-contain object-center transition duration-700 ease-out group-hover:scale-[1.008]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  )
}

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params
  const isPt = locale !== "en"
  const lang = isPt ? "pt-BR" : "en"
  const whatsapp = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
    isPt ? "Olá André, vi seu portfólio e quero conversar sobre um projeto." : "Hi Andre, I saw your portfolio and want to discuss a project."
  )}`

  return (
    <main className="bg-[#f2efe8] text-[#11110f]">
      <section className="border-b border-[#d4cec2] px-5 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-36 md:pb-32 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-[1600px]">
          <p className="text-[10px] font-semibold tracking-[.2em] text-[#77736b]">
            {isPt ? "PROJETOS SELECIONADOS · PROVA DE REPERTÓRIO" : "SELECTED WORK · PROOF OF RANGE"}
          </p>
          <div className="mt-8 grid gap-10 lg:grid-cols-[.72fr_.28fr] lg:items-end">
            <h1 className="font-editorial text-[clamp(3.2rem,7vw,7.7rem)] leading-[.88] tracking-[-.05em]">
              {isPt ? "Projetos diferentes. Uma mesma exigência:" : "Different projects. The same standard:"}{" "}
              <span className="italic text-[#5f6559]">{isPt ? "clareza na execução." : "clarity in execution."}</span>
            </h1>
            <p className="text-base leading-8 text-[#625e56] sm:text-lg">
              {isPt
                ? "O portfólio não é organizado por estética. É organizado pela capacidade de transformar problemas diferentes em experiências coerentes, funcionais e comercialmente úteis."
                : "The portfolio is not organized around one aesthetic. It shows the ability to turn different problems into coherent, functional and commercially useful experiences."}
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 md:py-32 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-12">
            {cases.map((project, index) => (
              <article
                key={project.title}
                className={index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-6"}
              >
                <a href={project.href} target="_blank" rel="noopener noreferrer" className="group block h-full border-t border-[#cfc8bc] pt-4">
                  {project.commerce ? (
                    <BrowserShowcase project={project} />
                  ) : (
                    <div className={`relative overflow-hidden bg-[#d9d2c6] ${index === 0 ? "aspect-[1.18/1]" : "aspect-[1.08/1]"}`}>
                      <Image
                        src={project.image}
                        alt={`Projeto ${project.title}`}
                        fill
                        unoptimized
                        loading="eager"
                        className="object-cover transition duration-700 group-hover:scale-[1.025]"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f2efe8]/95 opacity-0 transition group-hover:opacity-100 sm:right-5 sm:top-5 sm:h-12 sm:w-12">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 py-5 sm:gap-6 sm:py-6">
                    <div className="min-w-0">
                      <p className="text-[9px] font-semibold uppercase tracking-[.15em] text-[#a08967]">{isPt ? project.pt : project.en}</p>
                      <h2 className="mt-3 break-words font-editorial text-3xl tracking-[-.035em] sm:text-4xl">{project.title}</h2>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-[#666259]">{isPt ? project.ptDesc : project.enDesc}</p>
                    </div>
                    <span className="text-[10px] font-semibold tracking-[.15em] text-[#817c72]">0{index + 1}</span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#11110f] px-5 py-20 text-white sm:px-8 sm:py-24 md:py-32 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-[1500px]">
          <Sparkles className="h-6 w-6 text-[#c7b18d]" />
          <div className="mt-8 grid gap-12 lg:grid-cols-[.7fr_.3fr] lg:items-end">
            <h2 className="font-editorial text-[clamp(3rem,6vw,6.2rem)] leading-[.92] tracking-[-.045em]">
              {isPt ? "Seu projeto não precisa parecer com nenhum desses." : "Your project does not need to look like any of these."}{" "}
              <span className="italic text-[#c7b18d]">{isPt ? "Precisa parecer certo para o seu negócio." : "It needs to feel right for your business."}</span>
            </h2>
            <div>
              <p className="text-sm leading-7 text-white/55">
                {isPt
                  ? "A direção nasce da marca, do público, da operação e do objetivo — não de um template repetido."
                  : "Direction comes from the brand, audience, operation and goal — not a repeated template."}
              </p>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#f2efe8] px-7 text-[10px] font-semibold uppercase tracking-[.14em] text-[#11110f]">
                {isPt ? "Conversar sobre meu projeto" : "Discuss my project"}<ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10 xl:px-14">
        <div className="mx-auto flex max-w-[1600px] flex-wrap gap-4">
          <Link href={`/${lang}/websites-ecommerce`} className="rounded-full border border-[#11110f]/25 px-5 py-3 text-[9px] font-semibold uppercase tracking-[.13em]">
            {isPt ? "Sites & E-commerce" : "Websites & Ecommerce"}
          </Link>
          <Link href={`/${lang}/services`} className="rounded-full border border-[#11110f]/25 px-5 py-3 text-[9px] font-semibold uppercase tracking-[.13em]">
            {isPt ? "Ver serviços" : "View services"}
          </Link>
          <Link href={`/${lang}/contact`} className="rounded-full bg-[#11110f] px-5 py-3 text-[9px] font-semibold uppercase tracking-[.13em] text-white">
            {isPt ? "Contato" : "Contact"}
          </Link>
        </div>
      </section>
    </main>
  )
}

import {
  ArrowRight,
  Bot,
  Brain,
  BriefcaseBusiness,
  FileText,
  Globe2,
  Instagram,
  Landmark,
  LayoutTemplate,
  MessageCircle,
  Rocket,
  ShoppingBag,
  Store,
  TrendingUp,
} from "lucide-react"

const whatsapp =
  "https://wa.me/5511992598585?text=Ol%C3%A1%2C%20Andr%C3%A9.%20Vim%20pelo%20Instagram%20e%20quero%20saber%20mais%20sobre%20seus%20servi%C3%A7os."

const links = [
  {
    title: "Criação de Loja Online",
    desc: "Loja profissional pronta para vender",
    href: "/pt-BR/services",
    icon: ShoppingBag,
    featured: true,
  },
  {
    title: "Google Negócios Locais",
    desc: "Apareça para clientes da sua região",
    href: whatsapp,
    icon: Landmark,
  },
  {
    title: "Amazon KDP",
    desc: "Publique seu livro e venda online",
    href: whatsapp,
    icon: FileText,
  },
  {
    title: "Landing Pages",
    desc: "Páginas criadas para converter",
    href: "/pt-BR/services",
    icon: LayoutTemplate,
  },
  {
    title: "Shopify",
    desc: "Lojas escaláveis e profissionais",
    href: "/pt-BR/services",
    icon: Store,
  },
  {
    title: "Tráfego Pago",
    desc: "Anúncios para vender mais",
    href: whatsapp,
    icon: TrendingUp,
  },
  {
    title: "Portfólio",
    desc: "Veja projetos desenvolvidos",
    href: "/pt-BR/portfolio",
    icon: BriefcaseBusiness,
  },
  {
    title: "Cases Reais",
    desc: "Projetos e resultados",
    href: "/pt-BR/portfolio",
    icon: Rocket,
  },
]

const tools = [
  {
    title: "NOVA AI",
    desc: "IA para criação de vídeos",
    href: "https://www.novvideos.online/",
    icon: Bot,
  },
  {
    title: "CAA Neuro",
    desc: "Comunicação aumentativa com IA",
    href: "https://www.adhdautism.online/",
    icon: Brain,
  },
]

const projects = [
  {
    title: "Gilberto Souza",
    desc: "Livro, site e venda digital",
    href: "https://www.gilberto-souza.com/",
  },
  {
    title: "Vastara",
    desc: "E-commerce de relógios",
    href: "https://vastara.online/",
  },
  {
    title: "BrinqueTEAndo",
    desc: "Loja infantil online",
    href: "https://brinqueteando.online/",
  },
]

export const metadata = {
  title: "André Almeida | Links Oficiais",
  description:
    "Acesse serviços, portfólio, ferramentas e WhatsApp oficial de André Almeida.",
}

function LinkCard({ item }: any) {
  const Icon = item.icon

  return (
    <a
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-[0_20px_70px_rgba(0,0,0,.22)] transition duration-300 hover:-translate-y-1 hover:border-purple-400/50 hover:bg-white/[0.08] ${
        item.featured ? "md:col-span-2" : ""
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-fuchsia-500/5 opacity-0 transition group-hover:opacity-100" />

      <div className="relative flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-300 ring-1 ring-purple-400/20">
          <Icon className="h-7 w-7" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-white">{item.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-zinc-400">{item.desc}</p>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition group-hover:border-purple-400/40 group-hover:text-white">
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </a>
  )
}

export default function ConteudoPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0b0b14] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-20%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-purple-600/25 blur-[130px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full bg-fuchsia-600/15 blur-[120px]" />
        <div className="absolute right-[-10%] top-[20%] h-[420px] w-[420px] rounded-full bg-indigo-600/15 blur-[120px]" />
      </div>

      <section className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col px-5 py-8 sm:px-8 lg:py-12">
        <header className="mb-10 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-blue-500 text-xl font-black shadow-lg shadow-purple-500/25">
              P
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em]">Por Trás</p>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-zinc-300">
                do Digital
              </p>
            </div>
          </a>

          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/portras_do_digital/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-zinc-200 transition hover:border-purple-400/50 hover:text-white"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.andre-almeida.online"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-zinc-200 transition hover:border-purple-400/50 hover:text-white"
              aria-label="Website"
            >
              <Globe2 className="h-5 w-5" />
            </a>
          </div>
        </header>

        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-purple-200">
            <Rocket className="h-4 w-4" />
            Estratégia Digital • E-commerce • IA
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
            André Almeida
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
            Transformo ideias em negócios digitais que vendem todos os dias.
            Escolha abaixo o que você precisa e fale comigo.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-violet-500 px-7 py-4 text-base font-bold text-white shadow-[0_18px_50px_rgba(124,58,237,.35)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(124,58,237,.45)]"
            >
              <MessageCircle className="h-5 w-5" />
              Falar no WhatsApp
            </a>

            <a
              href="/pt-BR/portfolio"
              className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 text-base font-bold text-white transition hover:-translate-y-0.5 hover:border-purple-400/50 hover:bg-white/[0.07]"
            >
              Ver Portfólio
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mb-10">
          <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.28em] text-purple-200/80">
            Acesso rápido
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {links.map((item) => (
              <LinkCard key={item.title} item={item} />
            ))}
          </div>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.26em] text-purple-200/80">
              Ferramentas
            </p>
            <div className="grid gap-4">
              {tools.map((item) => (
                <LinkCard key={item.title} item={item} />
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.26em] text-purple-200/80">
              Projetos em destaque
            </p>
            <div className="grid gap-3">
              {projects.map((project) => (
                <a
                  key={project.title}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-[#121225]/70 p-4 transition hover:border-purple-400/50 hover:bg-white/[0.07]"
                >
                  <div>
                    <h3 className="font-bold text-white">{project.title}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{project.desc}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-zinc-400 transition group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <a
            href="https://www.instagram.com/portras_do_digital/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-purple-400/50 hover:bg-white/[0.07]"
          >
            <Instagram className="mb-4 h-7 w-7 text-fuchsia-300" />
            <h3 className="font-bold">Instagram</h3>
            <p className="mt-1 text-sm text-zinc-400">@portras_do_digital</p>
          </a>

          <a
            href="/pt-BR"
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-purple-400/50 hover:bg-white/[0.07]"
          >
            <Globe2 className="mb-4 h-7 w-7 text-purple-300" />
            <h3 className="font-bold">Website</h3>
            <p className="mt-1 text-sm text-zinc-400">Página principal</p>
          </a>

          <a
            href="/pt-BR/blog"
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-purple-400/50 hover:bg-white/[0.07]"
          >
            <FileText className="mb-4 h-7 w-7 text-violet-300" />
            <h3 className="font-bold">Blog</h3>
            <p className="mt-1 text-sm text-zinc-400">Artigos e conteúdos</p>
          </a>
        </div>

        <div className="mb-8 rounded-[2rem] border border-purple-400/20 bg-gradient-to-r from-purple-600/25 via-violet-500/15 to-fuchsia-500/20 p-6 text-center shadow-[0_25px_90px_rgba(124,58,237,.18)] sm:p-8">
          <h2 className="text-2xl font-black">Pronto para tirar sua ideia do papel?</h2>
          <p className="mx-auto mt-2 max-w-xl text-zinc-300">
            Me chame no WhatsApp e vamos conversar sobre o melhor caminho para o seu projeto.
          </p>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 font-black text-[#11111c] transition hover:-translate-y-0.5"
          >
            <MessageCircle className="h-5 w-5" />
            Conversar agora
          </a>
        </div>

        <footer className="pb-2 text-center text-xs text-zinc-500">
          © 2026 Por Trás do Digital • André Almeida
        </footer>
      </section>
    </main>
  )
}

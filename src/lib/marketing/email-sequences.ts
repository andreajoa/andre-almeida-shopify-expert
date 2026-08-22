export type MarketingLocale = "pt-BR" | "en-US"

export type EmailSequenceEntry = {
  index: number
  theme: string
  subject: string
  preheader: string
  angle: string
  ctaLabel: string
  ctaUrl: string
}

const ptBase = "https://andre-almeida.online/pt-BR/contact?utm_source=email&utm_medium=nurture&utm_campaign=authority_system"
const enBase = "https://andre-almeida.online/en/contact?utm_source=email&utm_medium=nurture&utm_campaign=authority_system"

const pt: Omit<EmailSequenceEntry, "index" | "ctaUrl">[] = [
  { theme:"website", subject:"Seu site deveria trabalhar mesmo quando você não está", preheader:"Um bom site continua qualificando, respondendo e conduzindo pessoas depois que você fecha o notebook.", angle:"Se o visitante depende de você para entender valor, tirar dúvidas e descobrir o próximo passo, parte do trabalho comercial ainda está fora da estrutura.", ctaLabel:"Quero ver onde estou perdendo oportunidades" },
  { theme:"authority", subject:"O custo invisível de parecer menor do que você é", preheader:"A percepção digital pode reduzir o valor de uma empresa antes da primeira conversa.", angle:"Empresas competentes perdem margem quando site, prova e posicionamento transmitem menos maturidade do que a operação real.", ctaLabel:"Quero fortalecer minha autoridade" },
  { theme:"cro", subject:"Você não precisa de mais tráfego. Talvez precise converter melhor.", preheader:"Antes de comprar mais atenção, vale descobrir o que acontece com a atenção que você já recebe.", angle:"Levar mais pessoas para uma jornada confusa apenas aumenta o custo do mesmo vazamento.", ctaLabel:"Quero analisar minha conversão" },
  { theme:"automation", subject:"Automação não é sobre robôs. É sobre não perder oportunidades.", preheader:"Automação boa remove esquecimentos sem remover a parte humana da venda.", angle:"Orçamentos esquecidos, formulários abandonados e leads sem follow-up quase nunca aparecem em um relatório — só somem.", ctaLabel:"Quero automatizar meu processo" },
  { theme:"email", subject:"A diferença entre ter uma lista e ter um ativo", preheader:"Uma lista parada é um arquivo. Uma lista nutrida pode se tornar receita.", angle:"Captar e-mail é só o início; o valor nasce quando cada mensagem educa, reduz objeção ou aproxima a próxima conversa.", ctaLabel:"Quero estruturar meu e-mail marketing" },
  { theme:"crm", subject:"Seu CRM deveria dizer quem merece atenção agora", preheader:"Nem todo lead está no mesmo momento — e o seu processo deveria saber disso.", angle:"Quem voltou ao site, clicou em serviço e interagiu com seus e-mails deveria ter prioridade diferente de quem acabou de chegar.", ctaLabel:"Quero um CRM que ajude a vender" },
  { theme:"ecommerce", subject:"Seu e-commerce pode ser seu — de verdade", preheader:"A loja deve servir ao negócio, não transformar o negócio em refém da plataforma.", angle:"Plataforma é meio. A decisão correta depende de controle, dados, experiência, integrações, custo e velocidade de evolução.", ctaLabel:"Quero avaliar uma estrutura própria" },
  { theme:"ecommerce", subject:"O checkout abandonado ainda é uma conversa aberta", preheader:"Abandono não é necessariamente rejeição. Muitas vezes é fricção, dúvida ou timing.", angle:"Quem chegou ao checkout já tomou várias microdecisões; deixar esse sinal desaparecer é desperdiçar intenção real.", ctaLabel:"Quero recuperar mais vendas" },
  { theme:"geo", subject:"Seu negócio aparece quando alguém pergunta para uma IA?", preheader:"Busca está mudando: cada vez mais decisões começam em respostas geradas por IA.", angle:"ChatGPT, Gemini, Claude e Perplexity precisam conseguir entender claramente quem você é, o que faz, para quem faz e por que confiar.", ctaLabel:"Quero preparar minha presença para IA" },
  { theme:"copy", subject:"A página que vende não começa pelo design", preheader:"O layout precisa sustentar uma mensagem que já sabe o que quer fazer.", angle:"Antes de admirar o visual, o visitante precisa responder rapidamente: isso é para mim, por que é diferente, por que acreditar e o que faço agora?", ctaLabel:"Quero melhorar minha oferta no site" },
  { theme:"analytics", subject:"Você está medindo visitas ou entendendo comportamento?", preheader:"Pageviews são números. Decisões exigem contexto.", angle:"Cidade, origem, páginas vistas, cliques, tempo e retorno contam uma história que o número bruto de visitas não conta.", ctaLabel:"Quero enxergar melhor meus visitantes" },
  { theme:"mobile", subject:"O mobile não pode ser uma versão espremida do desktop", preheader:"A experiência precisa funcionar com um polegar, pouco tempo e uma tela pequena.", angle:"Responsividade de verdade repensa hierarquia, toque, velocidade, ordem de conteúdo e CTA — não apenas reduz o layout.", ctaLabel:"Quero revisar minha experiência mobile" },
  { theme:"performance", subject:"Velocidade também é percepção de marca", preheader:"Antes de ler sua proposta, o visitante já sentiu se a experiência parece leve ou pesada.", angle:"Atraso, layout pulando e imagem carregando mal comunicam descuido antes de qualquer argumento de venda.", ctaLabel:"Quero deixar meu site mais rápido" },
  { theme:"proof", subject:"Prova vende o que promessa não consegue", preheader:"Quanto maior a promessa, mais o mercado procura evidência.", angle:"Case, processo, métrica, screenshot e demonstração tornam competência visível sem depender de adjetivos.", ctaLabel:"Quero transformar cases em prova" },
  { theme:"system", subject:"O problema de contratar dez fornecedores", preheader:"Quando cada peça tem uma direção diferente, o cliente sente a fragmentação.", angle:"Site, mídia, CRM, e-mail e automação podem funcionar isoladamente e ainda assim falhar nos espaços entre eles.", ctaLabel:"Quero integrar minha operação digital" },
  { theme:"authority", subject:"Autoridade não nasce de postar todo dia", preheader:"Frequência sem posicionamento produz volume, não necessariamente confiança.", angle:"Autoridade cresce quando conteúdo, prova, SEO, site e oferta repetem uma posição clara por tempo suficiente.", ctaLabel:"Quero construir autoridade com método" },
  { theme:"authority", subject:"Se você vende conhecimento, seu site precisa vender confiança", preheader:"Serviços intelectuais são comprados antes de serem experimentados. A confiança precisa chegar primeiro.", angle:"Método, profundidade, biografia, prova e experiência visual transformam conhecimento invisível em sinais concretos de competência.", ctaLabel:"Quero posicionar meu conhecimento" },
  { theme:"books", subject:"Livro online não precisa depender só da página da Amazon", preheader:"Marketplace pode fechar a venda. Seu ecossistema deve construir o leitor.", angle:"Uma página própria permite contar a história, captar audiência, testar campanhas e manter relacionamento entre um lançamento e outro.", ctaLabel:"Quero estruturar a venda do meu livro" },
  { theme:"local", subject:"Seu estabelecimento comercial merece ser encontrado antes da concorrência", preheader:"Para negócios locais, uma visita ao site muitas vezes começa com uma necessidade imediata.", angle:"Localização, prova, WhatsApp, horários, fotos, perguntas frequentes e SEO local reduzem o caminho entre necessidade e contato.", ctaLabel:"Quero gerar mais contatos locais" },
  { theme:"nurture", subject:"O lead que não responde ainda pode estar decidindo", preheader:"Silêncio não significa necessariamente desinteresse.", angle:"Em B2B, orçamento, sócio, prioridade e timing interrompem decisões; uma boa nutrição mantém sua empresa presente sem pressão repetitiva.", ctaLabel:"Quero criar uma nutrição inteligente" },
  { theme:"personalization", subject:"Seu funil deveria lembrar o que cada pessoa fez", preheader:"Relevância cresce quando a próxima mensagem respeita a etapa anterior.", angle:"Quem visitou e-commerce, quem estudou automação e quem clicou no WhatsApp demonstram intenções diferentes e merecem próximos passos diferentes.", ctaLabel:"Quero personalizar sem ser invasivo" },
  { theme:"offer", subject:"Por que algumas ofertas parecem óbvias e outras parecem caras?", preheader:"Preço é comparado com a clareza do resultado, do risco e do esforço percebido.", angle:"Quando processo, resultado, prova e próximos passos são vagos, o cliente preenche as lacunas com risco.", ctaLabel:"Quero tornar minha oferta mais clara" },
  { theme:"case", subject:"AMB Boutique: quando e-commerce também precisa parecer marca", preheader:"Uma loja converte melhor quando produto, experiência e percepção caminham juntos.", angle:"Moda feminina não podia parecer catálogo genérico: direção editorial, merchandising e jornada de compra precisavam sustentar o valor da marca.", ctaLabel:"Quero elevar meu e-commerce" },
  { theme:"case", subject:"Brinqueteando: clareza também converte", preheader:"Em algumas compras, orientar bem vale mais do que pressionar.", angle:"Quando o produto envolve desenvolvimento infantil, explicar para quem serve, o que observar e como escolher reduz ansiedade e aumenta confiança.", ctaLabel:"Quero melhorar a clareza da minha loja" },
  { theme:"case", subject:"CAA Neuro e NOVA AI: tecnologia precisa parecer simples", preheader:"Complexidade por trás da tela não é desculpa para uma experiência confusa.", angle:"Produtos digitais fortes escondem complexidade operacional e tornam benefício, prioridade e próximo passo fáceis de entender.", ctaLabel:"Quero transformar tecnologia em produto" },
  { theme:"growth", subject:"O melhor momento para consertar seu funil é antes de escalar", preheader:"Escala amplifica eficiência — e também amplifica vazamentos.", angle:"Mais tráfego sobre uma oferta ou jornada desalinhada só torna cada gargalo mais caro.", ctaLabel:"Quero revisar meu funil antes de escalar" },
  { theme:"audit", subject:"Você provavelmente não precisa reconstruir tudo", preheader:"Nem todo problema digital exige jogar fora o que já funciona.", angle:"Às vezes o gargalo está em mensagem, mobile, prova, formulário, tracking ou automação — e preservar o que funciona é parte de uma boa decisão.", ctaLabel:"Quero uma leitura da minha estrutura" },
  { theme:"objection", subject:"Quanto custa continuar com a estrutura atual?", preheader:"O investimento mais fácil de enxergar é o projeto. O custo da inércia costuma ficar escondido.", angle:"Lead sem follow-up, venda abandonada e horas manuais têm custo real mesmo quando não aparecem como uma linha na fatura.", ctaLabel:"Quero mapear o custo dos gargalos" },
  { theme:"automation", subject:"Uma pergunta simples: o que você gostaria que seu site fizesse sozinho?", preheader:"A resposta costuma revelar as melhores automações.", angle:"Qualificar leads, registrar origem, avisar intenção, nutrir contatos e recuperar oportunidades são resultados; a ferramenta vem depois.", ctaLabel:"Quero identificar minhas melhores automações" },
  { theme:"cta", subject:"Se fizer sentido, eu olho sua estrutura com você", preheader:"Sem apresentação longa: podemos começar olhando o que já existe.", angle:"Você não precisa de briefing perfeito. Mostre o site, a operação ou o gargalo e começamos separando prioridade de ruído.", ctaLabel:"Quero conversar com André" },
]

const en: Omit<EmailSequenceEntry, "index" | "ctaUrl">[] = [
  { theme:"website", subject:"Your website should keep working when you are not", preheader:"A strong website keeps qualifying, answering and guiding prospects after you close your laptop.", angle:"If visitors still need you to explain the value, answer every question and define the next step, part of the sales job is still outside the system.", ctaLabel:"Show me where I am losing opportunities" },
  { theme:"authority", subject:"The invisible cost of looking smaller than you are", preheader:"Your digital presence can lower perceived value before the first conversation.", angle:"Strong companies lose margin when their site, proof and positioning communicate less maturity than the actual operation.", ctaLabel:"Strengthen my authority" },
  { theme:"cro", subject:"You may not need more traffic. You may need better conversion.", preheader:"Before buying more attention, find out what happens to the attention you already have.", angle:"Sending more people into a confusing journey simply makes the same leak more expensive.", ctaLabel:"Review my conversion" },
  { theme:"automation", subject:"Automation is not about robots. It is about not losing opportunities.", preheader:"Good automation removes forgotten tasks without removing the human part of selling.", angle:"Forgotten quotes, abandoned forms and leads with no follow-up rarely appear as a warning — they simply disappear.", ctaLabel:"Automate my process" },
  { theme:"email", subject:"The difference between owning a list and owning an asset", preheader:"A dormant list is a file. A nurtured list can become revenue.", angle:"Capturing an email is the beginning; value appears when every message educates, handles an objection or moves the relationship closer to a conversation.", ctaLabel:"Build my email system" },
  { theme:"crm", subject:"Your CRM should tell you who deserves attention now", preheader:"Not every lead is at the same stage — your process should know that.", angle:"Someone who returned, viewed services and engaged with email should have a different priority than a first-time visitor.", ctaLabel:"Build a CRM that helps me sell" },
  { theme:"ecommerce", subject:"Your ecommerce operation can actually belong to you", preheader:"The store should serve the business, not make the business a hostage to the platform.", angle:"Platform is a means, not the strategy. Control, data, experience, integrations, cost and speed of change should drive the architecture.", ctaLabel:"Explore an owned ecommerce stack" },
  { theme:"ecommerce", subject:"An abandoned checkout is still an open conversation", preheader:"Abandonment is not always rejection. Often it is friction, uncertainty or timing.", angle:"Someone who reached checkout has already made several small decisions; letting that signal vanish wastes meaningful purchase intent.", ctaLabel:"Recover more sales" },
  { theme:"geo", subject:"Does your business show up when someone asks an AI?", preheader:"Discovery is changing: more decisions begin inside AI-generated answers.", angle:"ChatGPT, Gemini, Claude and Perplexity need to clearly understand who you are, what you do, who you serve and why you are credible.", ctaLabel:"Prepare my presence for AI search" },
  { theme:"copy", subject:"A page that sells does not start with design", preheader:"The layout should support a message that already knows what it needs to accomplish.", angle:"Before admiring the visual, a visitor needs fast answers: is this for me, why is it different, why believe it and what do I do next?", ctaLabel:"Improve my offer and page" },
  { theme:"analytics", subject:"Are you measuring visits or understanding behavior?", preheader:"Pageviews are numbers. Decisions require context.", angle:"City, acquisition source, pages viewed, clicks, time and return visits tell a story raw traffic totals cannot.", ctaLabel:"Understand my visitors" },
  { theme:"mobile", subject:"Mobile cannot be a squeezed-down desktop", preheader:"The experience needs to work with one thumb, limited time and a small screen.", angle:"Real responsive design rethinks hierarchy, touch, speed, content order and calls to action instead of merely shrinking the layout.", ctaLabel:"Review my mobile experience" },
  { theme:"performance", subject:"Speed is also brand perception", preheader:"Before visitors read your pitch, they already feel whether the experience is light or heavy.", angle:"Delay, layout shifts and broken image loading communicate neglect before any sales argument gets a chance.", ctaLabel:"Make my site faster" },
  { theme:"proof", subject:"Proof sells what promises cannot", preheader:"The bigger the promise, the more the market looks for evidence.", angle:"Cases, process, metrics, screenshots and demonstrations make competence visible without relying on adjectives.", ctaLabel:"Turn my work into proof" },
  { theme:"system", subject:"The problem with hiring ten different vendors", preheader:"When every piece has a different direction, the customer feels the fragmentation.", angle:"Site, media, CRM, email and automation can all work independently while the customer journey fails in the gaps between them.", ctaLabel:"Connect my digital operation" },
  { theme:"authority", subject:"Authority does not come from posting every day", preheader:"Frequency without positioning creates volume, not necessarily trust.", angle:"Authority grows when content, proof, SEO, website and offer reinforce one clear market position over time.", ctaLabel:"Build authority systematically" },
  { theme:"authority", subject:"If you sell expertise, your website needs to sell trust", preheader:"Knowledge-based services are bought before they can be experienced. Trust has to arrive first.", angle:"Method, depth, biography, proof and visual experience turn invisible expertise into visible signals of competence.", ctaLabel:"Position my expertise" },
  { theme:"books", subject:"Selling a book online should not depend on one Amazon page", preheader:"A marketplace can close a sale. Your ecosystem should build the reader relationship.", angle:"An owned page lets you tell the story, capture audience, test campaigns and stay connected between launches.", ctaLabel:"Build my book sales ecosystem" },
  { theme:"local", subject:"Your local business should be found before the competitor", preheader:"For local businesses, a website visit often begins with an immediate need.", angle:"Location, proof, WhatsApp, hours, photos, FAQs and local SEO shorten the path between need and contact.", ctaLabel:"Generate more local inquiries" },
  { theme:"nurture", subject:"A lead who goes quiet may still be deciding", preheader:"Silence does not automatically mean disinterest.", angle:"In B2B, budgets, partners, priorities and timing interrupt decisions; good nurturing keeps you present without repetitive pressure.", ctaLabel:"Build an intelligent nurture flow" },
  { theme:"personalization", subject:"Your funnel should remember what each person did", preheader:"Relevance improves when the next message respects the previous step.", angle:"A visitor researching ecommerce, a visitor studying automation and a person repeatedly clicking WhatsApp are showing different levels and types of intent.", ctaLabel:"Personalize without being creepy" },
  { theme:"offer", subject:"Why do some offers feel obvious while others feel expensive?", preheader:"Price is judged against the clarity of the result, risk and effort.", angle:"When process, outcome, proof and next steps are vague, buyers fill those gaps with risk.", ctaLabel:"Clarify my offer" },
  { theme:"case", subject:"AMB Boutique: when ecommerce also needs to feel like a brand", preheader:"A store performs better when product, experience and perception move together.", angle:"Women’s fashion could not feel like a generic catalog: editorial direction, merchandising and purchase flow had to support brand value.", ctaLabel:"Elevate my ecommerce brand" },
  { theme:"case", subject:"Brinqueteando: clarity can convert too", preheader:"In some purchases, helping people choose is more persuasive than pushing them.", angle:"When a product supports child development, explaining who it is for, what to observe and how to choose reduces anxiety and builds trust.", ctaLabel:"Improve clarity in my store" },
  { theme:"case", subject:"CAA Neuro and NOVA AI: technology should feel simple", preheader:"Complexity behind the screen is not an excuse for a confusing experience.", angle:"Strong digital products hide operational complexity and make benefits, priorities and the next action easy to understand.", ctaLabel:"Turn technology into a product" },
  { theme:"growth", subject:"The best time to fix your funnel is before you scale", preheader:"Scale amplifies efficiency — and it amplifies leaks.", angle:"More traffic on top of a misaligned offer or journey only makes every bottleneck more expensive.", ctaLabel:"Review my funnel before scaling" },
  { theme:"audit", subject:"You probably do not need to rebuild everything", preheader:"Not every digital problem requires throwing away what already works.", angle:"Sometimes the bottleneck is message, mobile, proof, forms, tracking or automation — and preserving what works is part of a smart decision.", ctaLabel:"Review my current setup" },
  { theme:"objection", subject:"What is your current setup already costing you?", preheader:"The project price is visible. The cost of doing nothing is usually hidden.", angle:"A lead with no follow-up, an abandoned sale and hours of manual work have real cost even when they never appear as a line item.", ctaLabel:"Map the cost of my bottlenecks" },
  { theme:"automation", subject:"One simple question: what would you like your website to do by itself?", preheader:"The answer usually reveals the most valuable automations.", angle:"Qualifying leads, recording source, alerting intent, nurturing contacts and recovering opportunities are outcomes; tools come second.", ctaLabel:"Find my best automations" },
  { theme:"cta", subject:"If it makes sense, I can look at your setup with you", preheader:"No long presentation required — we can start with what already exists.", angle:"You do not need a perfect brief. Show me the site, operation or bottleneck and we can separate real priorities from noise.", ctaLabel:"Talk with Andre" },
]

const insightPT: Record<string,string> = {
  website:"Quando páginas, formulário, CRM e mensagens seguem a mesma lógica, o visitante entende valor e avança sem depender de uma explicação manual.",
  authority:"Autoridade online reduz a distância entre o valor que você entrega e o valor que o mercado consegue perceber antes de falar com você.",
  cro:"Conversão melhora quando comportamento vira hipótese: onde a pessoa hesita, o que procura e qual prova reduz a incerteza.",
  automation:"Automação bem desenhada preserva timing, contexto e consistência. Ela deve avisar você quando a parte humana realmente importa.",
  email:"Cada e-mail precisa cumprir uma função na jornada: educar, quebrar objeção, apresentar prova, gerar resposta ou criar o próximo passo.",
  crm:"CRM útil é memória operacional: contexto suficiente para priorizar intenção em vez de tratar todos os contatos do mesmo jeito.",
  ecommerce:"Uma boa operação conecta experiência, checkout, dados, recuperação, e-mail e regras comerciais como um único sistema.",
  geo:"SEO e GEO trabalham juntos: conteúdo claro, entidades consistentes, dados estruturados, páginas específicas e autoridade tornam sua empresa compreensível para busca e IA.",
  copy:"Design aumenta percepção; mensagem reduz risco. A combinação certa faz a página funcionar como conversa comercial, não como folder.",
  analytics:"Mensuração própria permite enxergar origem, cidade aproximada, páginas, cliques, tempo e conversões sem tentar identificar anonimamente quem a pessoa é.",
  mobile:"O objetivo é preservar intenção e clareza em qualquer largura, com alvos de toque, texto e hierarquia adequados ao dispositivo.",
  performance:"Performance técnica vira percepção de qualidade: menos espera, menos instabilidade e mais confiança no primeiro contato.",
  proof:"Prova específica diminui risco. Mostrar como você pensa e o que já construiu costuma ser mais persuasivo do que prometer mais.",
  system:"Uma direção integrada evita que tecnologia, mensagem, dados e aquisição otimizem objetivos diferentes.",
  books:"A página própria complementa marketplaces e transforma audiência, conteúdo e dados em ativos que continuam seus.",
  local:"Para negócios locais, confiança rápida e próximo passo claro importam tanto quanto aparecer no momento certo da busca.",
  nurture:"Nutrição eficiente acrescenta contexto ao longo do tempo e respeita o ritmo de decisão, em vez de repetir cobrança de resposta.",
  personalization:"Personalização boa usa contexto consentido para ser mais útil sem ultrapassar a fronteira entre atenção e vigilância.",
  offer:"Uma oferta forte torna resultado, prova, processo e próximos passos difíceis de interpretar errado.",
  case:"Um bom case demonstra decisões e repertório em contexto real, transformando portfólio em evidência.",
  growth:"Crescimento sustentável começa reduzindo vazamentos antes de aumentar o volume que passa pelo funil.",
  audit:"Auditoria separa problema estrutural de ajuste localizado e evita reconstrução maior do que o necessário.",
  objection:"O custo da inércia aparece em oportunidades perdidas, horas manuais, dependência e menor percepção de valor.",
  cta:"A melhor conversa começa pelo problema real, não por uma apresentação genérica de serviços.",
}

const insightEN: Record<string,string> = {
  website:"When pages, forms, CRM and messaging follow the same logic, visitors can understand value and move forward without a manual explanation.",
  authority:"Online authority closes the gap between the value you deliver and the value the market can perceive before speaking with you.",
  cro:"Conversion improves when behavior becomes a hypothesis: where people hesitate, what they seek and which proof reduces uncertainty.",
  automation:"Well-designed automation preserves timing, context and consistency, then alerts you when the human part actually matters.",
  email:"Every email needs a job in the journey: educate, handle an objection, show proof, generate a reply or create the next step.",
  crm:"A useful CRM is operational memory: enough context to prioritize intent instead of treating every contact the same.",
  ecommerce:"A strong commerce operation connects experience, checkout, data, recovery, email and commercial rules as one system.",
  geo:"SEO and GEO work together: clear content, consistent entities, structured data, specific pages and authority make your company understandable to search and AI.",
  copy:"Design increases perceived value; messaging reduces risk. Together they make a page behave like a sales conversation instead of a brochure.",
  analytics:"First-party measurement can show source, approximate city, pages, clicks, time and conversions without pretending to identify anonymous visitors personally.",
  mobile:"The goal is to preserve intent and clarity at every width with touch targets, type and hierarchy appropriate to the device.",
  performance:"Technical performance becomes perceived quality: less waiting, less instability and more confidence at first contact.",
  proof:"Specific proof lowers risk. Showing how you think and what you have built is often more persuasive than making a bigger promise.",
  system:"Integrated direction prevents technology, messaging, data and acquisition from optimizing for different outcomes.",
  books:"An owned page complements marketplaces and turns audience, content and data into assets you continue to control.",
  local:"For local businesses, fast trust and a clear next step matter as much as showing up at the right search moment.",
  nurture:"Effective nurturing adds context over time and respects the buying cycle instead of repeatedly asking for an answer.",
  personalization:"Good personalization uses consented context to be more useful without crossing the line from attention into surveillance.",
  offer:"A strong offer makes the outcome, proof, process and next steps hard to misunderstand.",
  case:"A strong case study demonstrates decisions and range in a real context, turning portfolio into evidence.",
  growth:"Sustainable growth starts by reducing leaks before increasing the volume moving through the funnel.",
  audit:"An audit separates structural problems from localized fixes and prevents a rebuild larger than necessary.",
  objection:"The cost of inaction appears as lost opportunities, manual hours, tool dependence and weaker perceived value.",
  cta:"The best conversation starts with the real problem, not a generic services presentation.",
}

export const EMAIL_SEQUENCES: Record<MarketingLocale, EmailSequenceEntry[]> = {
  "pt-BR": pt.map((item,index)=>({ ...item, index:index+1, ctaUrl:index===29 ? `https://wa.me/5511992598585?text=${encodeURIComponent("Olá André, acompanhei seus e-mails e quero conversar sobre meu projeto.")}` : `${ptBase}&utm_content=${String(index+1).padStart(2,"0")}` })),
  "en-US": en.map((item,index)=>({ ...item, index:index+1, ctaUrl:index===29 ? `https://wa.me/5511992598585?text=${encodeURIComponent("Hi Andre, I followed your emails and want to talk about my project.")}` : `${enBase}&utm_content=${String(index+1).padStart(2,"0")}` })),
}

export function renderSequenceCopy(locale: MarketingLocale, entry: EmailSequenceEntry, name?: string | null) {
  const isPt = locale === "pt-BR"
  const firstName = name?.trim().split(/\s+/)[0]
  const hello = firstName ? (isPt ? `Olá, ${firstName}.` : `Hi ${firstName},`) : (isPt ? "Olá." : "Hi,")
  const insight = (isPt ? insightPT : insightEN)[entry.theme] || (isPt ? insightPT.website : insightEN.website)
  const close = isPt
    ? "Se isso conversa com o momento do seu negócio, o botão abaixo abre uma conversa direta. Sem compromisso e sem apresentação genérica."
    : "If this matches what your business is dealing with, the button below opens a direct conversation. No generic pitch required."
  return {
    paragraphs: [hello, entry.preheader, entry.angle, insight, close],
    text: [hello, entry.preheader, entry.angle, insight, close].join("\n\n"),
  }
}

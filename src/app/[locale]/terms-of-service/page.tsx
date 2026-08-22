import { LegalPage } from "@/components/legal/LegalPage"
import { SITE_CONFIG } from "@/lib/constants"

type Props = { params: Promise<{ locale: string }> }

export default async function TermsPage({ params }: Props) {
  const { locale } = await params
  const lang = locale === "en" ? "en" : "pt-BR"
  const isPt = lang === "pt-BR"
  const sections = isPt ? [
    { title: "Uso do website", paragraphs: ["Ao acessar este website, você concorda em utilizá-lo de forma lícita e compatível com estes termos. O conteúdo possui finalidade informativa e comercial sobre os serviços apresentados."] },
    { title: "Serviços e propostas", paragraphs: ["Escopo, prazo, investimento, entregáveis, responsabilidades e condições de cada projeto são definidos em proposta, contrato ou instrumento específico.", "Informações gerais do website não substituem os termos particulares acordados para um projeto."] },
    { title: "Tecnologia e terceiros", paragraphs: ["Projetos podem depender de serviços de terceiros, como domínio, hospedagem, plataformas, meios de pagamento, provedores de e-mail e APIs. Custos, disponibilidade e regras desses serviços são definidos por seus respectivos fornecedores."] },
    { title: "Propriedade intelectual", paragraphs: ["Conteúdo, identidade e materiais deste website pertencem a André Almeida ou são utilizados sob autorização aplicável e não devem ser reproduzidos indevidamente.", "A titularidade e licença dos entregáveis de clientes são definidas no instrumento específico de cada projeto."] },
    { title: "Resultados e limitações", paragraphs: ["Não há garantia de posição específica em mecanismos de busca, recomendação por sistemas de IA, volume de tráfego ou resultado financeiro. Resultados dependem de mercado, oferta, concorrência, execução, orçamento, histórico, fatores técnicos e variáveis externas."] },
    { title: "Contato", paragraphs: [`Dúvidas sobre estes termos podem ser enviadas para ${SITE_CONFIG.email}.`] },
  ] : [
    { title: "Website use", paragraphs: ["By accessing this website, you agree to use it lawfully and consistently with these terms. Content is informational and commercial in nature and describes available services."] },
    { title: "Services and proposals", paragraphs: ["Scope, schedule, investment, deliverables, responsibilities and project conditions are defined in a specific proposal, contract or agreement.", "General website information does not replace the terms agreed for an individual project."] },
    { title: "Technology and third parties", paragraphs: ["Projects may depend on third-party services such as domains, hosting, platforms, payment providers, email providers and APIs. Their costs, availability and rules are controlled by the relevant provider."] },
    { title: "Intellectual property", paragraphs: ["Website content, identity and materials belong to Andre Almeida or are used under applicable permission and should not be reproduced improperly.", "Ownership and licensing of client deliverables are defined in each project's agreement."] },
    { title: "Results and limitations", paragraphs: ["No specific search ranking, AI recommendation, traffic volume or financial outcome is guaranteed. Results depend on market, offer, competition, execution, budget, history, technical factors and external variables."] },
    { title: "Contact", paragraphs: [`Questions about these terms can be sent to ${SITE_CONFIG.email}.`] },
  ]
  return <LegalPage locale={lang} eyebrow={isPt?"TERMOS · CONDIÇÕES":"TERMS · CONDITIONS"} title={isPt?"Termos de Serviço":"Terms of Service"} updated={isPt?"Atualizados em agosto de 2026":"Updated August 2026"} sections={sections}/>
}

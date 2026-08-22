import { LegalPage } from "@/components/legal/LegalPage"
import { SITE_CONFIG } from "@/lib/constants"

type Props = { params: Promise<{ locale: string }> }

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params
  const lang = locale === "en" ? "en" : "pt-BR"
  const isPt = lang === "pt-BR"
  const sections = isPt ? [
    { title: "Informações coletadas", paragraphs: ["Coletamos dados que você fornece voluntariamente em formulários e solicitações, como nome, e-mail, telefone, empresa e informações sobre o projeto.", "Também podemos coletar dados técnicos e de navegação por ferramentas de analytics, conforme consentimento e configuração aplicável."] },
    { title: "Como utilizamos os dados", paragraphs: ["Usamos as informações para responder contatos, avaliar projetos, prestar serviços, melhorar a experiência do website, medir desempenho e manter comunicações solicitadas ou autorizadas."] },
    { title: "Analytics, cookies e integrações", paragraphs: ["O website pode utilizar cookies essenciais e, quando permitido, ferramentas de analytics para compreender origem de tráfego, páginas acessadas, eventos e comportamento agregado.", "Integrações de terceiros possuem suas próprias políticas e condições."] },
    { title: "LGPD e seus direitos", paragraphs: ["Nos termos da Lei Geral de Proteção de Dados (LGPD), você pode solicitar informações, correção ou exclusão de dados pessoais, observadas as hipóteses legais de retenção."] },
    { title: "Segurança e retenção", paragraphs: ["Adotamos medidas razoáveis para proteger os dados processados. Nenhum sistema conectado à internet pode ser considerado absolutamente imune a riscos.", "Os dados são mantidos apenas pelo período necessário às finalidades legítimas, contratuais ou legais aplicáveis."] },
    { title: "Contato", paragraphs: [`Para dúvidas ou solicitações relacionadas a privacidade, escreva para ${SITE_CONFIG.email}.`] },
  ] : [
    { title: "Information we collect", paragraphs: ["We collect information you voluntarily submit through forms and project inquiries, such as name, email, phone, company and project details.", "Technical and browsing data may also be collected through analytics tools depending on consent and configuration."] },
    { title: "How information is used", paragraphs: ["Information is used to respond to inquiries, evaluate projects, deliver services, improve website experience, measure performance and maintain communications you request or authorize."] },
    { title: "Analytics, cookies and integrations", paragraphs: ["The website may use essential cookies and, where permitted, analytics tools to understand traffic sources, pages, events and aggregated behavior.", "Third-party integrations have their own terms and privacy policies."] },
    { title: "Your data rights", paragraphs: ["Depending on applicable law, you may request access, correction or deletion of personal information, subject to legitimate legal or contractual retention requirements."] },
    { title: "Security and retention", paragraphs: ["Reasonable measures are used to protect processed information. No internet-connected system can be considered completely risk-free.", "Information is retained only as long as reasonably necessary for legitimate, contractual or legal purposes."] },
    { title: "Contact", paragraphs: [`For privacy questions or requests, contact ${SITE_CONFIG.email}.`] },
  ]
  return <LegalPage locale={lang} eyebrow={isPt?"PRIVACIDADE · LGPD":"PRIVACY · DATA"} title={isPt?"Política de Privacidade":"Privacy Policy"} updated={isPt?"Atualizada em agosto de 2026":"Updated August 2026"} sections={sections}/>
}

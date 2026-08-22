import { LegalPage } from "@/components/legal/LegalPage"
import { SITE_CONFIG } from "@/lib/constants"

type Props = { params: Promise<{ locale: string }> }

export default async function CookiePolicyPage({ params }: Props) {
  const { locale } = await params
  const lang = locale === "en" ? "en" : "pt-BR"
  const isPt = lang === "pt-BR"
  const sections = isPt ? [
    { title: "O que são cookies", paragraphs: ["Cookies são pequenos arquivos ou identificadores usados pelo navegador para manter preferências, permitir funcionalidades e, quando autorizado, ajudar a compreender o uso do website."] },
    { title: "Cookies essenciais", paragraphs: ["Podem ser utilizados para recursos necessários ao funcionamento, como preferência de idioma, consentimento e segurança. Esses recursos são necessários para a experiência básica do website."] },
    { title: "Analytics", paragraphs: ["Quando a configuração e o consentimento aplicável permitirem, ferramentas como Google Analytics podem ser utilizadas para medir visitas, origem, páginas, eventos e comportamento agregado."] },
    { title: "Gerenciamento", paragraphs: ["Você pode controlar cookies pelas configurações do navegador e, quando disponível, pelo banner de consentimento do website. A desativação de determinados recursos pode afetar funcionalidades."] },
    { title: "Contato", paragraphs: [`Dúvidas sobre cookies e privacidade podem ser enviadas para ${SITE_CONFIG.email}.`] },
  ] : [
    { title: "What cookies are", paragraphs: ["Cookies are small files or browser identifiers used to maintain preferences, enable functionality and, where authorized, help understand website usage."] },
    { title: "Essential cookies", paragraphs: ["They may be used for functionality required by the website, including language preferences, consent and security. These features support the basic website experience."] },
    { title: "Analytics", paragraphs: ["Where configuration and applicable consent allow, tools such as Google Analytics may be used to measure visits, sources, pages, events and aggregated behavior."] },
    { title: "Managing cookies", paragraphs: ["You can control cookies through browser settings and, where available, the website consent banner. Disabling certain features may affect functionality."] },
    { title: "Contact", paragraphs: [`Questions about cookies and privacy can be sent to ${SITE_CONFIG.email}.`] },
  ]
  return <LegalPage locale={lang} eyebrow={isPt?"COOKIES · PREFERÊNCIAS":"COOKIES · PREFERENCES"} title={isPt?"Política de Cookies":"Cookie Policy"} updated={isPt?"Atualizada em agosto de 2026":"Updated August 2026"} sections={sections}/>
}

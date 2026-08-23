# Projeto André Almeida — Checklist Final

## Status geral

**100% do escopo técnico de implementação e QA concluído no branch `preview/final-redesign`.**

- Commit validado: `b0d9ddf39b1be90b686ab02fd4e31c0ddf214709`
- Quality Check: **PASS** — run `32607433402`
- Preview Live QA: **PASS** — run `32607433396`
- Evidência visual: artifact `preview-live-qa-screenshots` (`9484544375`)
- Digest do artifact: `sha256:17ade6f789b4085461ac8d6dcd681709ca57d526ff67f315cd8c56c0eb8a989b`
- Framework validado: **Next.js 16.3.2**

> Limite de release: o PR #1 continua propositalmente como preview e contém a regra **“Não fazer merge automaticamente”**. Portanto, este checklist encerra em 100% a implementação e a validação técnica do branch. A promoção para `main`/produção é uma ação de release separada e não foi executada automaticamente.

## 1. Identidade visual e design system — 100%
- [x] Direção quiet luxury consolidada
- [x] Paleta creme / near-black / champagne / oliva
- [x] Tipografia editorial implementada
- [x] Header desktop e mobile redesenhados
- [x] Footer redesenhado
- [x] WhatsApp redesenhado
- [x] Botões, cards, inputs, badges e headings padronizados
- [x] `prefers-reduced-motion` preservado
- [x] Contraste e foco base revisados

## 2. Home e páginas comerciais — 100%
- [x] Home premium completa
- [x] Hero editorial e posicionamento
- [x] Cases e prova de repertório
- [x] Oferta de websites para estabelecimentos
- [x] Oferta de e-commerce próprio
- [x] CRM / analytics / automação explicados
- [x] Carrinho, checkout, abandono e recuperação explicados
- [x] Upsell, downsell, order bump e cross-sell explicados
- [x] CTA de WhatsApp e formulário preservados
- [x] Página `/websites-ecommerce`
- [x] Página `/website-para-empresas`
- [x] Página `/ecommerce-proprio`
- [x] Página `/vender-livros-online`
- [x] Página `/autoridade-online`

## 3. Branding, imagens e favicon — 100%
- [x] Assets premium integrados
- [x] Hero atualizado
- [x] Cases atualizados
- [x] Assets otimizados em WebP/JPG quando aplicável
- [x] Brinqueteando validado com source correto
- [x] Favicon AA creme/dourado instalado em App Router
- [x] `/favicon.svg` validado como SVG válido
- [x] Apple icon preservado
- [x] QA verifica imagens quebradas em browser real

## 4. Contato, WhatsApp e CRM — 100%
- [x] `/api/contact` validado
- [x] Formulário localizado PT/EN
- [x] Persistência no CRM Neon
- [x] Fallback resiliente quando CRM/e-mail externo estiver indisponível
- [x] Consentimento de privacidade preservado
- [x] Consentimento de marketing separado
- [x] Origem, cidade/região aproximada e sessão associados ao lead
- [x] Conversão por formulário registrada
- [x] Conversão por WhatsApp para lead identificado
- [x] Links de WhatsApp validados pelo QA

## 5. Analytics first-party e dashboard — 100%
- [x] Sessões first-party
- [x] Pageviews
- [x] Cliques e WhatsApp
- [x] Tempo de sessão
- [x] Origem / medium / campaign
- [x] Cidade / região / país aproximados
- [x] Timeline de visitante
- [x] CRM com lead score
- [x] Classificação frio / morno / quente
- [x] Dashboard privado em `/dashboard`
- [x] Cookie de sessão HTTP-only
- [x] API retorna `401` sem sessão válida
- [x] Dashboard excluído do roteamento de locale
- [x] Login do dashboard validado em todas as 9 larguras de QA
- [x] Dashboard marcado `noindex`

## 6. E-mail marketing — 100%
- [x] 30 e-mails PT-BR
- [x] 30 e-mails EN-US
- [x] Seleção de idioma por contexto de locale/GEO
- [x] Agendamento pelo Resend
- [x] Opt-in explícito obrigatório
- [x] Unsubscribe implementado
- [x] Cancelamento de sequência futura
- [x] Webhook Resend com verificação de assinatura
- [x] Eventos: scheduled / sent / delivered / opened / clicked
- [x] Eventos: delayed / bounced / complained / failed / suppressed
- [x] Lead score atualizado por comportamento de e-mail
- [x] Complaint/suppression interrompem marketing
- [x] Métricas de abertura tratadas como sinal indicativo; clique/conversão priorizados

## 7. Idiomas — 100%
- [x] `pt-BR` como padrão
- [x] Inglês completo nas áreas principais
- [x] Seletor PT/EN
- [x] Espanhol residual removido das áreas principais
- [x] `hreflang` e `x-default`
- [x] QA valida troca PT → EN em browser real

## 8. SEO + GEO + AEO — 100%
- [x] Titles/descriptions principais PT/EN
- [x] Canonicals
- [x] Hreflang
- [x] Schema Person
- [x] Schema ProfessionalService
- [x] Schema WebSite
- [x] Schema Service
- [x] OfferCatalog
- [x] BreadcrumbList
- [x] FAQPage
- [x] Sitemap PT/EN
- [x] Robots revisado
- [x] Crawlers relevantes contemplados
- [x] `/api` não exposta para indexação
- [x] `llms.txt`
- [x] QA HTTP valida robots, sitemap e llms.txt
- [x] 404 real validado

## 9. Responsividade e browser QA — 100%
- [x] 320 × 780
- [x] 360 × 800
- [x] 375 × 812
- [x] 390 × 844
- [x] 414 × 896
- [x] 430 × 932
- [x] 768 × 1024
- [x] 1024 × 900
- [x] 1440 × 1000
- [x] Sem overflow horizontal nas páginas testadas
- [x] Imagens principais carregadas e com dimensões válidas
- [x] Console errors inesperados bloqueiam o QA
- [x] Request failures inesperados bloqueiam o QA
- [x] 73 screenshots gerados na execução anterior completa e novo ciclo final aprovado

## 10. Segurança e qualidade de código — 100%
- [x] `npm ci`
- [x] ESLint
- [x] TypeScript via build
- [x] Build de produção Next.js
- [x] Audit de dependências de **produção** em severidade alta
- [x] Next.js atualizado de 16.1.6 para **16.3.2** após advisories do audit
- [x] Lockfile regenerado
- [x] Gate permanente `npm audit --omit=dev --audit-level=high`
- [x] Nenhum check final com falha

## 11. Evidência final — 100%
- [x] Quality Check `32607433402`: PASS
- [x] Preview Live QA `32607433396`: PASS
- [x] HTTP / SEO / assets / routes / API: PASS
- [x] Browser responsive QA: PASS
- [x] Screenshots armazenados como artifact de CI
- [x] Checklist atualizado

## Resultado

**IMPLEMENTAÇÃO + QA DO PREVIEW: 100% CONCLUÍDOS.**

O branch `preview/final-redesign` está pronto para promoção manual. O merge/deploy de produção permanece deliberadamente fora desta etapa porque o próprio PR exige que ele não seja feito automaticamente.

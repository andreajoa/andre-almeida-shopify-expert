# Projeto André Almeida — Checklist Final

## Status geral

**Implementação e QA do branch `preview/final-redesign` concluídos. Validação final de produção ainda pendente.**

- Branch validado: `preview/final-redesign`
- Quality Check: **PASS**
- Preview Live QA: **PASS**
- Framework validado: **Next.js 16.3.2**
- Vercel: bloqueio diário de deployments deixou de ser o impedimento anterior; o bot do Vercel registrou deployment **Ready** em 23/08/2026.
- Release final: **não considerar 100% até a produção ser auditada ponta a ponta.**

## 1. Identidade visual e design system
- [x] Direção visual consolidada
- [x] Paleta e tipografia implementadas
- [x] Header desktop e mobile revisados
- [x] Footer revisado
- [x] WhatsApp revisado
- [x] Componentes principais padronizados
- [x] `prefers-reduced-motion` preservado
- [x] Contraste e foco base revisados

## 2. Home e páginas comerciais no branch final
- [x] Home final implementada
- [x] Hero e posicionamento
- [x] Cases e prova de repertório
- [x] Oferta de websites para estabelecimentos
- [x] Oferta de e-commerce próprio
- [x] CRM / analytics / automação explicados
- [x] Carrinho, checkout, abandono e recuperação explicados
- [x] Upsell, downsell, order bump e cross-sell explicados
- [x] Página `/websites-ecommerce`
- [x] Página `/website-para-empresas`
- [x] Página `/ecommerce-proprio`
- [x] Página `/vender-livros-online`
- [x] Página `/autoridade-online`

## 3. Branding, imagens e favicon no branch final
- [x] Assets premium integrados
- [x] Hero atualizado
- [x] Cases atualizados
- [x] Assets otimizados quando aplicável
- [x] Brinqueteando com source correto no QA
- [x] Favicon instalado no App Router
- [x] `/favicon.svg` validado no QA
- [x] Apple icon preservado
- [x] QA de preview sem imagens quebradas

## 4. Contato, WhatsApp e CRM no branch final
- [x] `/api/contact` validado no QA de preview
- [x] Formulário localizado PT/EN
- [x] Persistência no CRM Neon implementada
- [x] Consentimento de privacidade preservado
- [x] Consentimento de marketing separado
- [x] Origem e sessão associadas ao lead
- [x] Conversão por formulário registrada
- [x] Links de WhatsApp validados no QA de preview

## 5. Analytics e dashboard no branch final
- [x] Sessões first-party
- [x] Pageviews
- [x] Cliques e WhatsApp
- [x] Tempo de sessão
- [x] Origem / medium / campaign
- [x] Cidade / região / país aproximados
- [x] Timeline de visitante
- [x] CRM com lead score
- [x] Dashboard privado em `/dashboard`
- [x] Cookie de sessão HTTP-only
- [x] API retorna `401` sem sessão válida
- [x] Dashboard `noindex`

## 6. E-mail marketing no branch final
- [x] Sequências PT-BR
- [x] Sequências EN-US
- [x] Opt-in explícito
- [x] Unsubscribe
- [x] Webhook Resend implementado
- [x] Eventos de entrega e engajamento implementados
- [x] Lead score atualizado por comportamento
- [x] Complaint/suppression interrompem marketing

## 7. Idiomas no branch final
- [x] `pt-BR` como padrão
- [x] Inglês nas áreas principais
- [x] Seletor PT/EN
- [x] Espanhol residual removido das áreas principais
- [x] `hreflang` e `x-default`
- [x] Troca PT → EN validada no QA de preview

## 8. SEO + GEO + AEO no branch final
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
- [x] Sitemap PT/EN implementado
- [x] Robots revisado
- [x] `llms.txt` implementado
- [x] 404 real validado no QA de preview

## 9. Responsividade e browser QA do preview
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
- [x] Imagens principais carregadas no QA
- [x] Console errors inesperados tratados como falha de QA
- [x] Request failures inesperados tratados como falha de QA

## 10. Segurança e qualidade de código
- [x] `npm ci`
- [x] ESLint
- [x] TypeScript via build
- [x] Build de produção Next.js no CI
- [x] Audit de dependências de produção em severidade alta
- [x] Next.js atualizado para **16.3.2**
- [x] Lockfile regenerado
- [x] Gate `npm audit --omit=dev --audit-level=high`

## 11. Produção — validação obrigatória antes de concluir
- [x] Bloqueio diário de deployment do Vercel não é mais o bloqueio anterior; deployment `Ready` registrado pelo bot do Vercel em 23/08/2026
- [ ] Confirmar que o commit final desejado foi efetivamente promovido para produção
- [x] Confirmar home em produção
- [ ] Confirmar todas as páginas internas em produção
- [ ] Confirmar imagens e favicon em produção
- [ ] Confirmar PT/EN em produção
- [ ] Testar formulário de contato real em produção
- [x] Testar links de WhatsApp em produção
- [ ] Validar `robots.txt` em produção
- [ ] Validar `sitemap.xml` em produção
- [ ] Validar `llms.txt` em produção
- [ ] Validar SEO técnico no HTML de produção
- [ ] Validar 404 real em produção
- [ ] Validar ausência de erros de runtime no Vercel
- [ ] Validar ausência de 4xx/5xx inesperados nas rotas públicas

## Resultado

**Preview tecnicamente aprovado. Produção ainda não pode ser declarada concluída.**

O projeto só deve ser marcado como **100% concluído** depois que todos os itens da seção de produção acima estiverem comprovados no ambiente publicado.

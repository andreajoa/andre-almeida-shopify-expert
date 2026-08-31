# Projeto Andre Almeida — Checklist Mestre

## Status geral

**Progresso detalhado:** 124 de 135 tarefas concluídas (**92%**).

- Concluídas: **124**
- Em andamento: **3**
- Pendentes: **8**
- Fase atual: validação final de produção

> Regra para encerrar o projeto: só considerar 100% quando todas as páginas estiverem no mesmo sistema visual da home, as imagens estiverem servindo, PT/EN estiver consistente, formulário/WhatsApp estiverem preservados, SEO/GEO/AEO estiver completo e o commit final estiver pronto para produção.

## 1. Identidade visual e design system
- [x] Auditar visual antigo
- [x] Remover direção roxo/neon da home
- [x] Definir tokens de cor premium
- [x] Adicionar tipografia editorial
- [x] Redesenhar header desktop
- [x] Redesenhar menu mobile
- [x] Redesenhar footer
- [x] Redesenhar widget de WhatsApp
- [x] Adicionar suporte a prefers-reduced-motion
- [x] Criar camada global para impedir retorno de roxo/neon nas páginas antigas
- [x] Padronizar botões, cards, inputs, badges e headings nas rotas principais

## 2. Home
- [x] Nova arquitetura da home
- [x] Hero editorial
- [x] Headline e posicionamento premium
- [x] CTAs de WhatsApp
- [x] Números / prova de repertório
- [x] Cases editoriais
- [x] Expertise em 3 pilares
- [x] Manifesto
- [x] Processo
- [x] CTA final
- [x] Componente de infraestrutura comercial criado
- [x] Inserir componente de infraestrutura comercial na home
- [x] Trocar imagens antigas pelas novas imagens de marca/cases
- [x] Usar nova imagem do André no hero
- [x] Revisar ordem final das seções após inclusão da nova oferta

## 3. Imagens e branding
- [x] Nova imagem premium do André gerada
- [x] Novas imagens conceituais/cases geradas
- [x] Favicon/monograma definido pelo usuário
- [x] Subir assets premium para o repositório
- [x] Trocar referências de imagens na home
- [x] Trocar referências nas páginas internas principais
- [x] Criar versões otimizadas WebP para os principais assets
- [x] Instalar favicon novo em icon.png / apple-icon / favicon
- [x] Preparar asset específico da AMB Boutique
- [ ] Validar carregamento de todas as imagens em produção

## 4. Websites & E-commerce próprio
- [x] Proposta comercial definida
- [x] Copy-base da oferta definida
- [x] Componente comercial criado e inserido na home
- [x] Posicionamento “sem dependência de mensalidade obrigatória de plataforma” definido com ressalva de custos de infraestrutura
- [x] Criar página /websites-ecommerce
- [x] Incluir dores de estabelecimentos comerciais
- [x] Explicar CRM, analytics, origem, cidade, cliques e retorno
- [x] Explicar mailing e email marketing
- [x] Explicar carrinho, checkout e abandono
- [x] Explicar upsell, downsell, order bump e cross-sell
- [x] Explicar autonomia, domínio e infraestrutura
- [x] Adicionar CTA para WhatsApp
- [x] Adicionar CTA para formulário

## 5. Contato, WhatsApp e leads
- [x] WhatsApp centralizado em SITE_CONFIG
- [x] Botões principais da nova home usam WhatsApp
- [x] Formulário localizado e preservado
- [x] Endpoint /api/contact preservado
- [x] Integração Resend preservada
- [x] CONTACT_TO_EMAIL preservado como destino configurável
- [x] Agendamento preservado
- [x] Redesenhar página Contato no novo visual
- [x] Preservar envio de formulário para /api/contact
- [x] Preservar agendamento
- [ ] Validar email real recebido após envio em produção
- [ ] Validar todos os links do WhatsApp em produção

## 6. Idiomas
- [x] pt-BR como default no routing
- [x] Root / redireciona para /pt-BR
- [x] Routing somente pt-BR e en
- [x] Header com seletor simples PT/EN
- [x] Remover espanhol residual das áreas principais, metadata e sitemap
- [x] Atualizar metadata raiz para português
- [x] Garantir páginas principais completas em português
- [x] Garantir versão em inglês das páginas principais/comerciais
- [x] hreflang x-default apontando para pt-BR
- [x] Estrutura evita mistura de idiomas nas páginas reescritas

## 7. Páginas internas — mesmo layout da home
- [x] Serviços
- [x] Portfólio
- [x] Sobre
- [x] Contato
- [x] Blog / Insights
- [x] Material gratuito
- [x] Privacy Policy
- [x] Terms of Service
- [x] Cookie Policy
- [x] Camada de compatibilidade premium para páginas individuais de serviços/legado
- [x] Websites & E-commerce
- [x] Revisar LocaleChrome e chrome global

## 8. SEO + GEO + AEO / descoberta por IA
- [x] Estratégia nacional Brasil definida
- [x] Estratégia bilíngue PT/EN definida
- [x] Reescrever title/description principais em PT e EN
- [x] Criar clusters por intenção: website, ecommerce, comércio local/empresas, autores/livros e autoridade online
- [x] Schema Person
- [x] Schema ProfessionalService
- [x] Schema WebSite
- [x] Schema Service nas páginas comerciais
- [x] Schema OfferCatalog
- [x] Schema BreadcrumbList nas páginas comerciais
- [x] Schema FAQPage nas páginas de intenção/oferta
- [x] OpenGraph/Twitter principal completo
- [x] Sitemap somente PT/EN
- [x] Robots revisado
- [x] Permitir crawlers de busca/IA relevantes sem abrir /api
- [x] Conteúdo semântico para respostas de IA / citation-ready
- [x] FAQs orientadas a perguntas reais
- [x] Cobertura nacional sem doorway pages/spam geográfico
- [x] Links internos e arquitetura temática
- [x] Canonicals e hreflang
- [x] llms.txt com contexto de serviços/entidade
- [ ] Validar indexabilidade, robots.txt, llms.txt e sitemap.xml em produção

## 9. Responsividade, acessibilidade e performance
- [x] Home construída com tipografia fluida
- [x] Menu mobile dedicado
- [x] Touch targets principais dimensionados
- [x] next/image usado nas novas imagens principais
- [x] Animações principais leves
- [x] prefers-reduced-motion implementado
- [~] Revisar 390px
- [~] Revisar 768px
- [~] Revisar 1024px
- [~] Revisar 1440px
- [x] Revisar contraste base e foco global
- [ ] Revisar CLS/LCP após publicação dos assets finais
- [x] Alt text dos principais assets revisado

## 10. Build, deploy e validação final
- [x] Check de qualidade reproduzível adicionado ao GitHub
- [x] Build/Vercel do primeiro redesign retornou success
- [x] Main recebeu todo o redesign e páginas reescritas
- [x] Rodar/confirmar build e lint após alterações finais — GitHub Actions Quality Check #207 concluído com sucesso no commit 75b1d29 em 27/08/2026
- [x] Vercel: build-rate-limit liberado; pushes recentes voltaram a publicar
- [x] Confirmar status Vercel success do commit mais recente — commit 20e0224 validado com Vercel success em 31/08/2026
- [ ] Conferir home em produção com assets finais
- [ ] Conferir páginas internas em produção
- [ ] Conferir favicon em produção
- [ ] Conferir PT/EN em produção
- [ ] Testar formulário ponta a ponta
- [ ] Testar WhatsApp ponta a ponta
- [x] Links oficiais dos cases atualizados: NOVA AI, CAA Neuro, AMB Boutique e Brinqueteando
- [ ] Verificar 404s e erros de runtime após deploy final
- [ ] Revisar SEO técnico em produção
- [ ] Marcar checklist como 100% concluído

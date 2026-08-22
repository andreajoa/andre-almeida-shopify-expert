# Projeto Andre Almeida — Checklist Mestre

## Status geral

**Progresso detalhado:** 47 de 135 tarefas concluídas (**35%**).

- Concluídas: **47**
- Em andamento: **2**
- Pendentes: **86**
- Fase atual: correção de imagens + unificação visual das páginas + nova oferta Websites & E-commerce + SEO/GEO/AEO PT/EN

> Regra para encerrar o projeto: só considerar 100% quando todas as páginas estiverem no mesmo sistema visual da home, as novas imagens estiverem servindo em produção, PT/EN estiver consistente, formulário/WhatsApp estiverem testados ponta a ponta e o commit final estiver com build/deploy aprovado.

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
- [ ] Criar camada global para impedir retorno de roxo/neon nas páginas antigas
- [ ] Padronizar botões, cards, inputs, badges e headings em todas as rotas

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
- [ ] Inserir componente de infraestrutura comercial na home
- [ ] Trocar todas as imagens antigas pelas novas
- [ ] Usar nova imagem do André no hero
- [ ] Revisar ordem final das seções após inclusão da nova oferta

## 3. Imagens e branding
- [x] Nova imagem premium do André gerada
- [x] Novas imagens conceituais/cases geradas
- [x] Favicon/monograma definido pelo usuário
- [ ] Subir assets novos para o repositório
- [ ] Trocar referências de imagens na home
- [ ] Trocar referências nas páginas internas
- [ ] Criar versões otimizadas WebP/AVIF quando necessário
- [ ] Instalar favicon novo em icon.png / apple-icon / favicon
- [ ] Validar carregamento de todas as imagens em produção

## 4. Websites & E-commerce próprio
- [x] Proposta comercial definida
- [x] Copy-base da oferta definida
- [x] Componente comercial inicial criado
- [x] Posicionamento “sem dependência de mensalidade obrigatória de plataforma” definido
- [ ] Criar página /websites-ecommerce
- [ ] Incluir dores de estabelecimentos comerciais
- [ ] Explicar CRM, analytics, origem, cidade, cliques e retorno
- [ ] Explicar mailing e email marketing
- [ ] Explicar carrinho, checkout e abandono
- [ ] Explicar upsell, downsell, order bump e cross-sell
- [ ] Explicar autonomia, domínio e infraestrutura
- [ ] Adicionar CTA para WhatsApp
- [ ] Adicionar CTA para formulário

## 5. Contato, WhatsApp e leads
- [x] WhatsApp centralizado em SITE_CONFIG
- [x] Botões principais da nova home usam WhatsApp
- [x] Formulário antigo localizado
- [x] Endpoint /api/contact localizado
- [x] Integração Resend localizada
- [x] CONTACT_TO_EMAIL identificado como destino configurável
- [x] Agendamento existente identificado
- [ ] Redesenhar página Contato no novo visual
- [ ] Preservar envio de formulário para /api/contact
- [ ] Preservar agendamento
- [ ] Validar email real recebido após envio
- [ ] Validar todos os links do WhatsApp em produção

## 6. Idiomas
- [x] pt-BR já era default no routing
- [x] Root / redireciona para /pt-BR
- [x] Routing alterado para somente pt-BR e en
- [x] Header alterado para botão simples PT/EN
- [ ] Remover espanhol residual de metadata, sitemap e páginas
- [ ] Atualizar metadata raiz para português
- [ ] Garantir páginas completas em português
- [ ] Garantir tradução completa das mesmas páginas em inglês
- [ ] Revisar hreflang x-default -> pt-BR
- [ ] Garantir que nenhuma página misture idiomas

## 7. Páginas internas — mesmo layout da home
- [ ] Serviços
- [ ] Portfólio
- [ ] Sobre
- [ ] Contato
- [ ] Blog / Insights
- [ ] Material gratuito
- [ ] Privacy Policy
- [ ] Terms of Service
- [ ] Cookie Policy
- [ ] Páginas individuais de serviços
- [ ] Websites & E-commerce
- [ ] Revisar páginas especiais que usam LocaleChrome

## 8. SEO + GEO + AEO / descoberta por IA
- [~] Estratégia nacional Brasil definida
- [~] Estratégia bilíngue PT/EN definida
- [ ] Reescrever title/description principais em PT e EN
- [ ] Criar clusters por intenção: website, ecommerce, comércio local, autores/livros, autoridade online, automação
- [ ] Schema Person
- [ ] Schema ProfessionalService
- [ ] Schema WebSite
- [ ] Schema Service
- [ ] Schema OfferCatalog
- [ ] Schema BreadcrumbList
- [ ] Schema FAQPage onde aplicável
- [ ] OpenGraph/Twitter completo
- [ ] Sitemap somente PT/EN
- [ ] Robots revisado
- [ ] Permitir crawlers de busca relevantes sem abrir áreas privadas
- [ ] Conteúdo semântico para respostas de IA / citation-ready
- [ ] FAQs orientadas a perguntas reais
- [ ] Páginas geográficas nacionais sem doorway/spam
- [ ] Links internos e arquitetura temática
- [ ] Canonicals e hreflang
- [ ] Revisar indexabilidade
- [ ] Validar robots.txt e sitemap.xml em produção

## 9. Responsividade, acessibilidade e performance
- [x] Home construída com tipografia fluida
- [x] Menu mobile dedicado
- [x] Touch targets principais dimensionados
- [x] next/image usado na home atual
- [x] Animações principais leves
- [x] prefers-reduced-motion implementado
- [ ] Revisar 390px
- [ ] Revisar 768px
- [ ] Revisar 1024px
- [ ] Revisar 1440px
- [ ] Revisar contraste global
- [ ] Revisar foco de teclado
- [ ] Revisar CLS/LCP após novas imagens
- [ ] Revisar alt text das novas imagens

## 10. Build, deploy e validação final
- [x] Check de qualidade reproduzível adicionado ao GitHub
- [x] Build/Vercel do primeiro redesign retornou success
- [x] Main recebeu o redesign inicial
- [ ] Rodar build/lint após TODAS as alterações finais
- [ ] Confirmar status Vercel success do commit final
- [ ] Conferir home em produção
- [ ] Conferir páginas internas em produção
- [ ] Conferir imagens em produção
- [ ] Conferir favicon em produção
- [ ] Conferir PT/EN em produção
- [ ] Testar formulário ponta a ponta
- [ ] Testar WhatsApp ponta a ponta
- [ ] Verificar links de projetos
- [ ] Verificar 404s
- [ ] Verificar erros de console/runtime
- [ ] Revisar SEO técnico em produção
- [ ] Marcar checklist como 100% concluído

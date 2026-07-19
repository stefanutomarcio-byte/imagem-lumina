# Site Clínica Lumina — pacote pronto para publicar

Site estático (HTML + CSS já compilado + Alpine.js). Não precisa de build. É só publicar a pasta.

> **Passo a passo completo para colocar no ar em um domínio .com.br:** veja **TUTORIAL-PUBLICAR.md**.
> **Produção:** o site NÃO usa mais o Tailwind via CDN (aquele aviso do console sumiu). Agora o estilo vem de `assets/css/lumina.css`, um CSS próprio já compilado, só com as classes usadas — mais rápido e pronto para produção.

## Estrutura
```
index.html                 Home
exames.html                Catálogo de exames (busca + filtro por área)
exames/*.html              Uma página por exame (o que é, para que serve, preparo) — 21 páginas, boas para Google
programa.html              Programa de Acompanhamento (fidelidade)
tecnologia.html            Tecnologia (equipamento por função)
ciencia.html               Conteúdo educativo (não agendável)
contato.html               Formulário + endereço
laudos.html                Portal do paciente (a integrar)
politica-de-privacidade.html
termos-de-uso.html
robots.txt · sitemap.xml · manifest.json
assets/css/lumina.css      CSS compilado (produção, sem CDN)
assets/img/                Fotos editadas (webp)
assets/video/              Vídeos da sala e da fachada (mp4 + webm)
assets/js/lumina.js        Dados dos exames, tema, WhatsApp, agendamento, formulário
```

## Como publicar (3 opções fáceis)
- **Netlify / Cloudflare Pages / Vercel:** arraste a pasta inteira para o painel. Pronto.
- **Hospedagem própria (cPanel/FTP):** suba todos os arquivos para a pasta pública (public_html).
- Domínio sugerido: `imagemlumina.com.br` (ajuste sitemap.xml e robots.txt com o domínio final).

## O QUE PREENCHER ANTES DE PUBLICAR
1. **WhatsApp** — já configurado com o número (16) 98170-3277 em `assets/js/lumina.js` (`wa:'5514998066466'`). Quando migrar para um número business, basta trocar essa linha.
2. **Identificação legal (obrigatório — CFM 2.336/2023)** — no rodapé de todas as páginas: CRM do estabelecimento + Diretor Técnico Médico (CRM + RQE). Está em cada `.html` (bloco `<footer>`).
3. **Endereço, CEP e horários** — em `contato.html`, `index.html` (JSON-LD) e rodapés.
4. **Agendamento online (Calendly)** — em `assets/js/lumina.js`, linha `calendlyUrl:''` → cole a URL do seu evento Calendly. Veja a seção "Agendamento online" abaixo.
5. **CRM / planilha de leads** — em `assets/js/lumina.js`, linha `crmWebhookUrl:''` → veja TUTORIAL-PLANILHA.md. O site não tem mais preços fixos: valores e convênio são combinados diretamente com a equipe.
6. **Convênios** — ajustar o texto (FAQ e contato) conforme o que a clínica aceita.
7. **Política de Privacidade / Termos** — preencher [colchetes] (CNPJ, DPO, e-mail, data) e revisar com o jurídico.

## Agendamento online (Calendly)
O botão "Agendar" (menu, hero, cards de exame e páginas de exame) já está preparado:
- Se `calendlyUrl` estiver **vazio**, o botão abre o WhatsApp (comportamento atual).
- Se você colar a URL do seu evento Calendly (ex.: `https://calendly.com/clinica-lumina/exame`), o botão passa a abrir automaticamente o **widget de agendamento do Calendly** (popup), sem precisar trocar nada no HTML.

Passo a passo:
1. Crie uma conta em calendly.com (tem plano gratuito) e cadastre um "tipo de evento" (ex.: "Ultrassom — 20 min"), com os horários que a clínica atende.
2. Copie o link público do evento.
3. Cole em `calendlyUrl` no `lumina.js` e publique o site de novo.
4. Cada agendamento cai automaticamente na sua agenda/Google Calendar conectada ao Calendly, com lembretes por e-mail/SMS para o paciente.

Se no futuro quiser trocar o Calendly por um sistema de agenda próprio de clínica (iClinic, Doctoralia, Feegow etc.), me avise — normalmente é só trocar essa URL ou o conteúdo da função `openAgendar` no `lumina.js`.

## Integração com CRM
O formulário de contato e (em breve) o agendamento já enviam os dados do lead (nome, telefone, exame, tipo de atendimento, origem) para `crmWebhookUrl` assim que ela for preenchida — hoje aponta para o Google Apps Script (ver TUTORIAL-PLANILHA.md), mas pode ser qualquer endpoint que receba POST com JSON:
- **Zapier / Make**: crie um "webhook" de entrada, cole a URL em `crmWebhookUrl` e monte automações para levar o lead a qualquer CRM (RD Station, HubSpot, Pipedrive etc.).
- **CRM com webhook nativo**: muitos CRMs de clínica aceitam webhook direto — cole a URL deles.
- Sem decidir ainda? Deixe como está (planilha do Google) — é só trocar a URL depois, sem mexer no site.

## Formulário de contato
Hoje o formulário abre o WhatsApp já preenchido (não perde lead). Para também salvar em planilha/CRM:
- Crie um endpoint (Google Apps Script, Formspree, ou webhook do seu BSP de WhatsApp) e faça um `fetch` POST em `enviar()` no `lumina.js`, mantendo o fallback do WhatsApp.

## WhatsApp Business (plataforma)
Quando tiver o número business, recomendo conectar a uma plataforma com API oficial (BSP) para ter chatbot, agenda e lembretes que reduzem falta. O site já está pronto: todos os botões usam a variável `wa`.

## Vídeos
`assets/video/` traz os vídeos da sala e da fachada (mp4 + webm). Já estão usados como fundo na home e na página de tecnologia, e servem também para Instagram/anúncios.

## Conformidade (revisar com o CRM antes de publicar)
- Sem promessa de resultado; equipamento descrito por função, sem marca e sem superlativo.
- Sem venda casada/brinde/sorteio. Programa de Acompanhamento marcado como "não é plano de saúde".
- Seção "Ciência" é educativa e não oferece procedimentos (injetáveis/punções) — não agendável.
- Depoimentos: publicar apenas relatos reais, com consentimento, de forma sóbria.

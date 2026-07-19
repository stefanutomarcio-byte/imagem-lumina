# Conectar o formulário do site a uma Planilha Google

Ao final, todo contato enviado pelo site cai automaticamente numa planilha sua (na sua conta Google), organizada por **Nome, Idade, Sexo e Gênero** — além de WhatsApp, exame, tipo de atendimento, consentimento LGPD, data/hora e origem. É gratuito e os dados ficam só com você.

> **LGPD:** são dados de pacientes. Mantenha a planilha **privada** (não compartilhe o link com ninguém). O passo "Qualquer pessoa" no deploy libera apenas o *envio* de dados para o script — **não** deixa sua planilha pública nem visível para estranhos.

---

## Passo a passo (uma vez só, ~10 min)

### 1. Crie a planilha
1. Acesse **sheets.google.com** e crie uma planilha em branco.
2. Dê um nome, ex.: **Lumina — Agendamentos**.

### 2. Abra o editor de script
1. No menu, clique em **Extensões → Apps Script**.
2. Vai abrir uma aba com um arquivo `Código.gs` (ou `Code.gs`) com um `function myFunction(){}`.
3. **Apague tudo** que estiver lá.
4. Abra o arquivo **planilha/Code.gs** (que veio no zip do site), copie **todo** o conteúdo e cole no editor.
5. Clique no ícone de **salvar** (disquete).

### 3. Publique como aplicativo web
1. No canto superior direito, clique em **Implantar → Nova implantação**.
2. Em "Selecionar tipo" (engrenagem), escolha **App da Web**.
3. Configure:
   - **Descrição:** Lumina formulário
   - **Executar como:** **Eu** (seu e-mail)
   - **Quem pode acessar:** **Qualquer pessoa**
4. Clique em **Implantar**.
5. O Google vai pedir para **autorizar** — escolha sua conta, clique em "Avançado" → "Acessar (não seguro)" se aparecer (é seu próprio script), e permita.
6. Ele mostra uma **URL do app da Web** terminada em `/exec`. **Copie essa URL.**

> Teste rápido: cole essa URL no navegador. Deve aparecer **"Lumina OK"**. Se aparecer, está funcionando.

### 4. Ligue o site à planilha
1. Abra o arquivo **assets/js/lumina.js** (bloco de notas serve).
2. Logo no começo, encontre a linha:
   ```
   crmWebhookUrl:'',
   ```
3. Cole a URL entre as aspas:
   ```
   crmWebhookUrl:'https://script.google.com/macros/s/AKfy.../exec',
   ```
4. Salve o arquivo e **suba o site de novo** (no Netlify/Cloudflare, arraste a pasta; no cPanel/FTP, substitua o `lumina.js`).

### 5. Teste de ponta a ponta
1. Abra o site publicado, vá em **Contato**, preencha e envie.
2. Volte na planilha: a linha deve aparecer em segundos, já organizada por Nome.
3. O site também abre o WhatsApp com a mensagem — os dois funcionam juntos.

---

## Dicas
- **Mudar a ordenação:** no `Code.gs`, a linha `var COLUNA_ORDENACAO = 2;` ordena por Nome. Troque para `3` (Idade), `4` (Sexo) ou `5` (Gênero). Salve e faça **Implantar → Gerenciar implantações → editar (lápis) → Nova versão**.
- **Filtrar/ordenar na hora:** na própria planilha, selecione a linha 1 e use **Dados → Criar um filtro** para ordenar por qualquer coluna com um clique.
- **Alterou o Code.gs depois?** Sempre publique como **Nova versão** em "Gerenciar implantações" (a URL continua a mesma).
- **Não chegou nada?** Confira se a URL termina em `/exec`, se "Quem pode acessar" está como "Qualquer pessoa" e se você subiu o `lumina.js` já com a URL colada.

## Colunas gravadas
Data/Hora · Nome · Idade · Sexo · Gênero · WhatsApp · Exame · Atendimento (Particular/Convênio) · Consentimento LGPD · Origem (página de onde veio).

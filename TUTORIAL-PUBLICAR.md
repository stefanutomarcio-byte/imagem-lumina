# Como publicar o site da Lumina em um domínio .com.br

Guia direto, do zero até o ar. O site é estático (não precisa de servidor nem de "build"): é só subir a pasta.

---

## Visão geral (2 coisas)
1. **Domínio** — o endereço, ex.: `imagemlumina.com.br` (registrado no **Registro.br**).
2. **Hospedagem** — onde os arquivos ficam. Recomendo uma que aceita "arrastar a pasta" e já dá HTTPS de graça (Netlify, Cloudflare Pages ou Vercel).

Você faz os dois e liga um no outro. Tempo total: ~30–60 min (fora a propagação do domínio).

---

## Parte 1 — Registrar o domínio .com.br

1. Acesse **registro.br** e pesquise o nome desejado (ex.: `clinicalumina`).
2. Se estiver livre, faça o cadastro. Para empresa, use o **CNPJ da clínica** (recomendado); também dá para pessoa física com CPF.
3. Pague a anuidade (o valor é cobrado por ano — confira o preço atual no site).
4. Pronto: o domínio é seu. Guarde o login do Registro.br — você vai voltar nele na Parte 3.

> Dica: registre também sua conta de e-mail profissional depois (ex.: contato@imagemlumina.com.br) — pode ser via Google Workspace ou Zoho. Não é obrigatório para o site funcionar.

---

## Parte 2 — Subir o site (escolha UMA opção)

### Opção A — Netlify (mais fácil, arrastar e soltar)
1. Descompacte o arquivo **lumina-site.zip** no computador (vai virar uma pasta com `index.html`, `assets/`, etc.).
2. Crie uma conta grátis em **netlify.com**.
3. No painel, procure **"Add new site" → "Deploy manually"** (ou a área "Sites" com "Drag and drop your site folder here").
4. **Arraste a pasta inteira** para lá. Em segundos o site fica no ar num endereço temporário tipo `algum-nome.netlify.app`.
5. Teste esse endereço no celular. Funcionando? Siga para a Parte 3.

### Opção B — Cloudflare Pages
1. Conta grátis em **pages.cloudflare.com** → "Create application" → "Pages" → "Upload assets".
2. Envie a pasta do site. Fica no ar em `algum-nome.pages.dev`.

### Opção C — Hospedagem tradicional (cPanel / FTP)
Se você já tem hospedagem com a agência/host:
1. Acesse o **Gerenciador de Arquivos** (cPanel) ou um programa de **FTP** (ex.: FileZilla).
2. Entre na pasta pública (geralmente **public_html**).
3. Suba **todos os arquivos de dentro** da pasta do site (não a pasta, e sim o conteúdo: `index.html`, `assets/`, etc.).

---

## Parte 3 — Ligar o domínio .com.br ao site

### Se usou Netlify (Opção A)
1. No Netlify: **Site settings → Domain management → Add a domain** → digite `imagemlumina.com.br`.
2. O Netlify vai mostrar **servidores de nomes (nameservers)**, algo como `dns1.p0X.nsone.net` (4 endereços).
3. Vá ao **Registro.br → seu domínio → "Alterar servidores DNS"** e cole esses nameservers no lugar dos padrões. Salve.
4. Espere a propagação (de minutos até algumas horas). O Netlify ativa o **HTTPS (cadeado)** automaticamente.

### Se usou Cloudflare Pages (Opção B)
1. Em Pages → seu projeto → **Custom domains → Set up a domain** → `imagemlumina.com.br`.
2. A Cloudflare também te dá **nameservers** próprios. Coloque-os no **Registro.br** (mesmo passo 3 acima).

### Se usou hospedagem tradicional (Opção C)
1. Pegue o **endereço IP** do servidor com seu host.
2. No Registro.br, use o **DNS do próprio Registro.br** e crie um registro **A** apontando `@` para esse IP (e `www` também). Seu host costuma ter um passo a passo — peça a eles se travar.

> **Como saber se propagou:** abra `https://imagemlumina.com.br` numa aba anônima do celular. Se aparecer o site com cadeado, está no ar.

---

## Parte 4 — Antes de divulgar (checklist rápido)
Edite estes pontos (todos estão no arquivo **README.md** com a localização exata):
- [ ] **WhatsApp** real em `assets/js/lumina.js` (campo `wa`).
- [ ] **CRM da clínica + Diretor Técnico (CRM/RQE)** no rodapé (exigência do CFM).
- [ ] **Equipe** (nomes, CRM, RQE) em `equipe.html`.
- [ ] **Preços** em `assets/js/lumina.js` (campo `preco`).
- [ ] **Convênios** (texto na FAQ e no contato).
- [ ] **Política de Privacidade / Termos** — preencher [colchetes] e revisar com o jurídico.
- [ ] Conferir o endereço: **Avenida das Nações, 300 — Jaú/SP** (já preenchido).

Depois de editar, é só **subir os arquivos de novo** (no Netlify/Cloudflare, arraste a pasta atualizada; no cPanel/FTP, substitua os arquivos).

---

## Como testar no seu computador antes de tudo
- **Rápido:** dê um duplo-clique em `index.html` (abre no navegador). Precisa de internet, pois alguns recursos carregam da web.
- **Do jeito certo (recomendado):** abra o terminal na pasta do site e rode:
  ```
  python3 -m http.server 8080
  ```
  Depois acesse `http://localhost:8080` no navegador. Isso simula um servidor real.

---

## Perguntas comuns
- **Preciso saber programar para atualizar textos?** Não. Textos dos exames, preços e telefone ficam em `assets/js/lumina.js` — dá para editar no bloco de notas. Ao salvar, suba o arquivo de novo.
- **O site tem custo mensal?** O domínio .com.br é anual (Registro.br). Netlify/Cloudflare Pages têm plano grátis que atende bem um site institucional.
- **E aquele aviso do Tailwind que aparecia no console?** Resolvido — o site agora usa um CSS próprio já compilado (`assets/css/lumina.css`), sem depender de CDN de desenvolvimento.

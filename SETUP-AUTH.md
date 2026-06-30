# Login + Sincronização na nuvem — guia de configuração

Este app agora tem **login por e-mail + senha** (liberado pela compra), **progresso salvo na
nuvem** (Supabase) e um **keep-alive** para o projeto free não pausar. A maior parte já está
pronta e configurada. Abaixo está o que **você precisa fazer manualmente** para entrar no ar.

---

## ✅ O que já foi feito (automático)

- **Banco no Supabase** (projeto `dlrfbbamenogcpoofdpg`): tabelas `entitlements` (compradores
  liberados), `user_progress` (progresso de cada aluno) e `keepalive`, com segurança (RLS) ligada.
- **`.env.local`** preenchido com a URL e as chaves do Supabase + um `CRON_SECRET` gerado.
- **Telas e lógica**: página `/login` (Entrar / Primeiro acesso), bloqueio das telas para quem não
  está logado, sincronização do progresso na nuvem, botão "Sair", webhook e cron.

## 🧠 Como funciona

1. A pessoa compra na plataforma → a plataforma chama nosso **webhook** → gravamos o e-mail dela
   como "liberado" na tabela `entitlements`.
2. No app, em **"Primeiro acesso"**, ela informa **o mesmo e-mail da compra** e cria uma senha.
   Só conseguimos criar a conta se o e-mail estiver liberado (senão: "Compra não encontrada").
3. Depois é só **Entrar** com e-mail e senha. O progresso (checklists, streak, água, quiz de
   arquétipos) é salvo no Supabase e volta em qualquer aparelho.

> Não precisamos de servidor de e-mail (SMTP): a conta é criada já confirmada.

---

## 🔧 O que VOCÊ precisa fazer

### 1) Configurar o Webhook na plataforma de venda (Kiwify/Cakto/etc.)

No painel onde você estava criando o webhook:

- **URL do Webhook:**
  ```
  https://SEU-DOMINIO.vercel.app/api/webhook/kiwify
  ```
  (troque `SEU-DOMINIO` pelo domínio que a Vercel te der no deploy.)
- **Evento:** marque **"Compra aprovada"**.
  - (Opcional) marque também **Reembolso**, **Chargeback** e **Assinatura cancelada** para
    **revogar** o acesso automaticamente nesses casos.
- **Token:** copie o **Token** que o painel mostra (no seu print era algo como `geo2xbhoejh`).
  Esse mesmo valor vai na variável `KIWIFY_WEBHOOK_TOKEN` (passo 2).

> O webhook aceita os formatos mais comuns de payload e valida pelo token, então funciona mesmo
> que a plataforma não seja exatamente a Kiwify.

### 2) Configurar as variáveis de ambiente na Vercel

Em **Vercel → seu projeto → Settings → Environment Variables**, adicione (ambiente *Production*
e *Preview*). Os valores estão no seu arquivo `.env.local` — copie de lá:

| Variável | De onde vem |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | já está no `.env.local` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | já está no `.env.local` |
| `SUPABASE_SERVICE_ROLE_KEY` | já está no `.env.local` (⚠️ secreta — nunca expor) |
| `KIWIFY_WEBHOOK_TOKEN` | o **Token** do painel da plataforma (passo 1) |
| `CRON_SECRET` | já está no `.env.local` (gerado) |
| `NEXT_PUBLIC_WHATSAPP` | seu número de suporte |

Depois de adicionar, **faça um novo deploy** para a Vercel aplicar as variáveis.

> No `.env.local`, `KIWIFY_WEBHOOK_TOKEN` está como `COLE_AQUI_O_TOKEN_DO_PAINEL`. Quando tiver o
> token do painel, substitua lá também (para testar local) **e** na Vercel.

### 3) Deploy na Vercel

- Faça o deploy normalmente (importando o projeto / `git push`).
- O **keep-alive** já está agendado em `vercel.json` (`/api/cron/keepalive`, a cada 3 dias). A
  Vercel registra o cron sozinha no deploy. Ele grava um "ping" no Supabase para o projeto free
  não pausar por inatividade.

### 4) Testar (recomendado)

Para testar sem esperar uma venda real, libere um e-mail manualmente:

- No **Supabase → SQL Editor**, rode (troque pelo seu e-mail):
  ```sql
  insert into public.entitlements (email, status)
  values ('seu-email@exemplo.com', 'active')
  on conflict (email) do update set status = 'active';
  ```
- Abra o app → **Primeiro acesso** → use esse e-mail e crie uma senha → deve entrar.
- Depois teste o webhook de verdade pelo botão **"Testar Webhook"** do painel (com a `KIWIFY_WEBHOOK_TOKEN`
  já configurada na Vercel) e confira se o e-mail aparece em `entitlements`.

---

## 🔒 Segurança — importante

- O **token de gerenciamento** do Supabase (`sbp_...`) e a **service_role key** são segredos.
  Como o token `sbp_...` foi compartilhado no chat, o ideal é **revogá-lo e gerar um novo** em
  *Supabase → Account → Access Tokens*.
- A `SUPABASE_SERVICE_ROLE_KEY` só vive no `.env.local` (que está no `.gitignore`) e nas variáveis
  da Vercel. **Nunca** use o prefixo `NEXT_PUBLIC_` nela e nunca a coloque no código do navegador.
- Recuperação de senha por e-mail (caso queira no futuro) exige configurar um **SMTP** próprio
  (ex.: Resend/Brevo) no Supabase — não é necessário para o login atual.

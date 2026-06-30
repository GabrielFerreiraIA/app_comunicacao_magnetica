# Comunicação Magnética

PWA premium, mobile-first, da **Hélia Gonçalves** — um "guia de bolso" de 5 minutos para
comunicação magnética: voz, arquétipos, imagem, liderança e carisma.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
shadcn/ui (Base UI) · Lucide · PWA. Pronto para deploy na **Vercel**.

## Como rodar

```bash
npm install
npm run dev      # desenvolvimento (http://localhost:3000)
npm run build    # build de produção
npm run start    # serve o build de produção
```

> Abra em uma viewport mobile (DevTools) para a experiência app-like. Layout limitado a `max-w-md`,
> com header compacto e bottom navigation.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

| Variável | Descrição |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP` | Número do WhatsApp da mentoria/suporte (só dígitos, ex. `5511999999999`). Usado nos CTAs de upsell. |

## Estrutura

```
app/                  Rotas (App Router)
  page.tsx            Início (dashboard + barra de progresso)
  pilares/            Hub + 5 pilares (voz, arquetipos, imagem, lideranca, carisma)
  kit-ia/             Biblioteca de prompts de IA (copia-e-cola)
  perfil/             Selo do aluno + suporte + mentoria
  manifest.ts         Web App Manifest (PWA)
  apple-icon.tsx      Ícone iOS gerado (ImageResponse)
components/           Componentes da UI (bottom-nav, header, checklist, cards, dialogs…)
  ui/                 Componentes shadcn/ui
lib/
  content/            Conteúdo da Hélia tipado em TS (fonte da verdade do app)
  checklist-store.ts  Estado dos checklists (localStorage + sincronização)
  config.ts           Marca e links (WhatsApp)
public/               icon.svg, icon-maskable.svg, sw.js
design-refs/          Repos mobile de referência (NÃO fazem parte do build — gitignored)
Conteúdos do app/     Material original (.md) da Hélia
```

## Conteúdo

Todo o conteúdo vive em `lib/content/*.ts` (derivado de `Conteúdos do app/`). Para editar textos,
altere esses arquivos — a UI se atualiza automaticamente. **Não renomeie os `id` dos checklists**
(`lib/content/checklists.ts`): eles são a chave do progresso salvo no dispositivo do usuário.

## Deploy na Vercel

1. Importe o repositório na Vercel (framework Next.js é detectado automaticamente).
2. Defina `NEXT_PUBLIC_WHATSAPP` nas Environment Variables.
3. Deploy. O PWA é instalável (manifest + ícones + service worker) sobre HTTPS.

## Pendências (com a Hélia)

- **Número de WhatsApp** real da mentoria.
- **Revisão dos prompts** do Kit IA (`lib/content/prompts.ts`) — versão inicial autorada.
- **Logo/crista oficial** para os ícones do PWA (atualmente uma crista dourada provisória em `public/`).

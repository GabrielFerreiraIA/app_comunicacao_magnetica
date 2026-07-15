import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";

// ============================================================
// E-mail de boas-vindas via Resend (resend.com).
// Disparado apenas em compras aprovadas (status = "active").
// Se RESEND_API_KEY não estiver configurada, o envio é ignorado
// silenciosamente — o webhook não falha por causa disso.
// ============================================================

const APP_URL = "https://app-comunicacao-magnetica.vercel.app";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "noreply@resend.dev";
const FROM_NAME = process.env.RESEND_FROM_NAME ?? "Hélia Gonçalves";

function buildWelcomeEmail(toName: string | null, toEmail: string): string {
  const firstName = toName ? toName.split(" ")[0] : "aluna";
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Seu acesso ao app</title>
</head>
<body style="margin:0;padding:0;background:#0B0612;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0B0612;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:520px;background:#1a0f2e;border-radius:16px;border:1px solid #4A154B;overflow:hidden;">

          <!-- Header roxo -->
          <tr>
            <td style="background:linear-gradient(135deg,#4A154B,#2d0a2e);padding:32px 32px 24px;text-align:center;">
              <p style="margin:0;font-size:13px;color:#C9A227;letter-spacing:3px;text-transform:uppercase;font-weight:600;">Comunicação Magnética</p>
              <h1 style="margin:12px 0 0;font-size:22px;color:#ffffff;font-weight:700;line-height:1.3;">
                Seu acesso está liberado ✨
              </h1>
            </td>
          </tr>

          <!-- Corpo -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;color:#d4b8e0;font-size:15px;line-height:1.6;">
                Olá, <strong style="color:#ffffff;">${firstName}</strong>!
              </p>
              <p style="margin:0 0 16px;color:#d4b8e0;font-size:15px;line-height:1.6;">
                Sua compra foi confirmada e seu acesso ao app <strong style="color:#C9A227;">Comunicação Magnética</strong> já está liberado.
              </p>
              <p style="margin:0 0 8px;color:#d4b8e0;font-size:15px;line-height:1.6;">
                Para criar sua conta, clique no botão abaixo e escolha <strong style="color:#ffffff;">"Primeiro acesso"</strong>. Use exatamente este e-mail:
              </p>
              <!-- chip do e-mail -->
              <p style="margin:0 0 24px;text-align:center;">
                <span style="display:inline-block;background:#2d1a4a;border:1px solid #C9A227;border-radius:8px;padding:8px 20px;color:#C9A227;font-size:14px;font-weight:600;letter-spacing:0.5px;">${toEmail}</span>
              </p>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:28px;">
                    <a href="${APP_URL}/login" style="display:inline-block;background:linear-gradient(135deg,#C9A227,#a07d1a);color:#0B0612;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:10px;letter-spacing:0.5px;">
                      Acessar o app →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px;color:#8a7a9a;font-size:13px;line-height:1.6;">
                Depois de criar sua senha, basta entrar com e-mail e senha sempre que quiser. Seu progresso fica salvo na nuvem automaticamente. 🎙️
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;border-top:1px solid #2d1a4a;text-align:center;">
              <p style="margin:0;color:#5a4a6a;font-size:12px;line-height:1.5;">
                Se você não realizou esta compra, pode ignorar este e-mail.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function sendWelcomeEmail(toEmail: string, toName: string | null): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return; // sem chave configurada, ignora silenciosamente

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: toEmail,
        subject: "Seu acesso ao app Comunicação Magnética está liberado ✨",
        html: buildWelcomeEmail(toName, toEmail),
      }),
    });
  } catch {
    // erro de rede — não propaga para não derrubar o webhook
  }
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ============================================================
// Webhook da plataforma de venda (Kiwify / compatível).
// Recebe "compra aprovada" e libera o e-mail do comprador na tabela `entitlements`.
// Eventos de reembolso/chargeback/cancelamento marcam o acesso como revogado.
//
// Verificação: a plataforma manda um token (painel) usado para assinar o corpo.
// Aceitamos, de forma tolerante:
//   - ?signature= como HMAC-SHA1 ou HMAC-SHA256 do corpo cru (Kiwify)
//   - ?token= igual ao token configurado
//   - campo "token"/"secret" no corpo igual ao token configurado
// O token fica em KIWIFY_WEBHOOK_TOKEN.
// ============================================================

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

function verify(rawBody: string, url: URL, body: Record<string, unknown>): boolean {
  const secret = process.env.KIWIFY_WEBHOOK_TOKEN;
  if (!secret) return false; // sem token configurado, recusa tudo

  const signature = url.searchParams.get("signature");
  if (signature) {
    const sha1 = crypto.createHmac("sha1", secret).update(rawBody).digest("hex");
    const sha256 = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
    if (safeEqual(signature, sha1) || safeEqual(signature, sha256)) return true;
  }

  const queryToken = url.searchParams.get("token");
  if (queryToken && safeEqual(queryToken, secret)) return true;

  const bodyToken = (body?.token ?? body?.secret ?? "") as string;
  if (typeof bodyToken === "string" && bodyToken && safeEqual(bodyToken, secret)) {
    return true;
  }

  return false;
}

// Procura o e-mail do comprador nos formatos mais comuns.
function pick(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function firstString(body: unknown, paths: string[]): string | null {
  for (const p of paths) {
    const v = pick(body, p);
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return null;
}

const APPROVED = [
  "order_approved",
  "compra_aprovada",
  "purchase_approved",
  "paid",
  "approved",
  "aprovada",
  "subscription_renewed",
];
const REVOKED: Record<string, "refunded" | "chargeback" | "canceled"> = {
  order_refunded: "refunded",
  refunded: "refunded",
  refund: "refunded",
  reembolso: "refunded",
  chargeback: "chargeback",
  chargedback: "chargeback",
  order_chargedback: "chargeback",
  subscription_canceled: "canceled",
  subscription_cancelled: "canceled",
  canceled: "canceled",
  cancelada: "canceled",
};

function classify(body: Record<string, unknown>): "active" | "refunded" | "chargeback" | "canceled" | null {
  const signals = [
    firstString(body, ["webhook_event_type"]),
    firstString(body, ["event"]),
    firstString(body, ["order_status"]),
    firstString(body, ["status"]),
    firstString(body, ["data.status"]),
  ]
    .filter(Boolean)
    .map((s) => (s as string).toLowerCase());

  for (const s of signals) {
    if (REVOKED[s]) return REVOKED[s];
  }
  for (const s of signals) {
    if (APPROVED.includes(s)) return "active";
  }
  return null;
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const url = new URL(request.url);

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Corpo inválido." }, { status: 400 });
  }

  if (!verify(rawBody, url, body)) {
    return NextResponse.json({ error: "Assinatura inválida." }, { status: 401 });
  }

  const email = firstString(body, [
    "Customer.email",
    "customer.email",
    "data.customer.email",
    "data.buyer.email",
    "buyer.email",
    "data.email",
    "email",
  ]);

  if (!email) {
    // Sem e-mail não há o que liberar; responde 200 para a plataforma não reenviar.
    return NextResponse.json({ ok: true, ignored: "sem e-mail" }, { status: 200 });
  }

  const status = classify(body);
  if (!status) {
    // Evento que não concede nem revoga acesso (boleto/pix gerado, carrinho, etc.).
    return NextResponse.json({ ok: true, ignored: "evento não relevante" }, { status: 200 });
  }

  const name = firstString(body, [
    "Customer.full_name",
    "customer.name",
    "data.customer.name",
    "data.buyer.name",
    "buyer.name",
    "name",
  ]);
  const product = firstString(body, [
    "Product.product_name",
    "product.name",
    "data.product.name",
    "product_name",
  ]);
  const orderRef = firstString(body, [
    "order_ref",
    "order_id",
    "data.id",
    "id",
    "transaction_id",
  ]);

  const admin = createAdminClient();
  const { error } = await admin.from("entitlements").upsert(
    {
      email: email.toLowerCase(),
      status,
      name: name ?? undefined,
      product: product ?? undefined,
      order_ref: orderRef ?? undefined,
      raw: body,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "email" },
  );

  if (error) {
    return NextResponse.json({ error: "Falha ao gravar." }, { status: 500 });
  }

  // Envia e-mail de boas-vindas apenas em compras aprovadas.
  if (status === "active") {
    await sendWelcomeEmail(email.toLowerCase(), name);
  }

  return NextResponse.json({ ok: true, email: email.toLowerCase(), status }, { status: 200 });
}

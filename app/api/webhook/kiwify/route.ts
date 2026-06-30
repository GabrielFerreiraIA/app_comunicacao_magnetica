import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";

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

  return NextResponse.json({ ok: true, email: email.toLowerCase(), status }, { status: 200 });
}

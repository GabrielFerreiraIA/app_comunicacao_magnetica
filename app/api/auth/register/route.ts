import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Primeiro acesso: o aluno informa o e-mail da compra + uma senha.
// 1) Confere se o e-mail está liberado na tabela `entitlements` (preenchida pelo webhook).
// 2) Cria o usuário no Supabase Auth JÁ CONFIRMADO (sem precisar de e-mail/SMTP).
// O login em si é feito no cliente com signInWithPassword.
export async function POST(request: Request) {
  let email = "";
  let password = "";
  try {
    const body = await request.json();
    email = String(body?.email ?? "").trim().toLowerCase();
    password = String(body?.password ?? "");
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json(
      { error: "A senha precisa ter ao menos 6 caracteres." },
      { status: 400 },
    );
  }

  const admin = createAdminClient();

  // 1) Verifica a liberação (compra).
  const { data: ent, error: entError } = await admin
    .from("entitlements")
    .select("status")
    .eq("email", email)
    .maybeSingle();

  if (entError) {
    return NextResponse.json(
      { error: "Erro ao validar sua compra. Tente novamente em instantes." },
      { status: 500 },
    );
  }
  if (!ent || ent.status !== "active") {
    return NextResponse.json(
      { error: "Compra não encontrada para este e-mail." },
      { status: 403 },
    );
  }

  // 2) Cria o usuário já confirmado.
  const { error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    app_metadata: { entitled: true, source: "self-signup" },
  });

  if (createError) {
    const code = (createError as { code?: string }).code;
    const msg = (createError.message || "").toLowerCase();
    const alreadyExists =
      code === "email_exists" ||
      code === "user_already_exists" ||
      msg.includes("already registered") ||
      msg.includes("already been registered") ||
      msg.includes("already exists");
    if (alreadyExists) {
      return NextResponse.json(
        { error: "Conta já existe. Faça login." },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: "Não foi possível criar seu acesso. Tente novamente." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

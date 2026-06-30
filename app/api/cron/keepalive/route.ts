import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Keep-alive: o Vercel Cron chama esta rota a cada poucos dias.
// Ela escreve um heartbeat no Supabase para que o projeto free não seja pausado
// por inatividade (o free pausa após ~7 dias sem atividade no banco).
//
// Protegida pelo header que o Vercel envia automaticamente quando a env
// CRON_SECRET está definida: Authorization: Bearer <CRON_SECRET>.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }
  }

  try {
    const admin = createAdminClient();
    const { error } = await admin
      .from("keepalive")
      .upsert(
        { id: 1, pinged_at: new Date().toISOString(), note: "vercel-cron" },
        { onConflict: "id" },
      );
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, pinged_at: new Date().toISOString() });
  } catch (err) {
    const message = err instanceof Error ? err.message : "erro";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

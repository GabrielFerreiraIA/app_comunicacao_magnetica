import "server-only";
import { createClient } from "@supabase/supabase-js";

// Cliente com a SERVICE ROLE — ignora RLS. NUNCA importar em código de cliente.
// Usado pelo webhook (liberar comprador), pelo cadastro (criar usuário já confirmado)
// e pelo cron de keep-alive.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      "Faltam variáveis de ambiente: NEXT_PUBLIC_SUPABASE_URL e/ou SUPABASE_SERVICE_ROLE_KEY.",
    );
  }
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

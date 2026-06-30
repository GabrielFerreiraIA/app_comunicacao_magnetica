import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Next 16 renomeou "middleware" para "proxy" (mesma função: roda antes das rotas).
// Aqui renovamos a sessão do Supabase e protegemos as páginas (redireciona p/ /login).
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Roda nas páginas para renovar a sessão e proteger as rotas. EXCETO:
     * - api (webhook/cron/cadastro fazem a própria verificação — não usam cookie)
     * - _next/static, _next/image (assets do build)
     * - arquivos públicos do PWA (manifest, service worker, ícones, imagens)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.webmanifest|sw.js|icon.svg|apple-icon|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};

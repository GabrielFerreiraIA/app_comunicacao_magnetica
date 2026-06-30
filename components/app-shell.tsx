"use client";

import { usePathname } from "next/navigation";
import { MobileHeader } from "@/components/mobile-header";
import { BottomNav } from "@/components/bottom-nav";
import { SyncProvider } from "@/components/sync-provider";

// Rotas que renderizam em tela cheia, sem o cromo do app (header + nav inferior).
const BARE_ROUTES = ["/login"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (BARE_ROUTES.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <SyncProvider>
      <MobileHeader />
      <main className="flex-1 overflow-y-auto px-5 pt-3 pb-28 no-scrollbar">
        {children}
      </main>
      <BottomNav />
    </SyncProvider>
  );
}

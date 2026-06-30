"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronLeft, Flame, Menu, RotateCcw, Sparkles, MessageCircle, Home, Award, Lock, LogOut } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { getPillar } from "@/lib/content/pillars";
import { getArchetype } from "@/lib/content/archetypes";
import { siteConfig } from "@/lib/config";
import { getStreak, useChecklistState, resetProgress } from "@/lib/checklist-store";
import { useSync } from "@/components/sync-provider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { whatsappLink, suporteMessage } from "@/lib/config";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { MentoriaDialogContent } from "@/components/mentoria-cta";

// Header compacto mobile. Em subpáginas mostra voltar + título; na raiz, a marca.
function titleFor(pathname: string): string {
  if (pathname === "/") return siteConfig.name;
  if (pathname === "/pilares") return "Os 5 Pilares";
  if (pathname === "/kit-ia") return "Kit IA";
  if (pathname === "/perfil") return "Perfil";
  if (pathname.startsWith("/pilares/")) {
    const parts = pathname.split("/").filter(Boolean);
    const slug = parts[1];
    const sub = parts[2];
    if (slug === "arquetipos" && sub) {
      if (sub === "diagnostico") return "Diagnóstico de Arquétipo";
      if (sub === "galeria") return "Galeria de Arquétipos";
      const archetype = getArchetype(sub);
      if (archetype) return archetype.name;
    }
    return getPillar(slug)?.title ?? "Pilar";
  }
  return siteConfig.name;
}

export function MobileHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const isRoot = pathname === "/";
  const isSub = pathname.split("/").filter(Boolean).length > 1;
  const title = titleFor(pathname);

  // Força reatividade ao alterar os checklists
  useChecklistState();
  const streak = getStreak();
  const { email, signOut } = useSync();

  // Controle do estado do menu lateral e modal da mentoria
  const [menuOpen, setMenuOpen] = useState(false);
  const [mentoriaOpen, setMentoriaOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl">
      <div className="absolute inset-0 -z-10 bg-background/80 border-b border-border" />
      <div className="flex h-14 items-center justify-between gap-2 px-5">
        <div className="flex items-center gap-2 min-w-0">
          {isSub ? (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Voltar"
              className="-ml-2 flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground active:scale-95"
            >
              <ChevronLeft className="size-5" />
            </button>
          ) : (
            <Link href="/" aria-label="Início" className="text-gold shrink-0">
              <BrandMark size={24} />
            </Link>
          )}

          <span
            className={
              isRoot
                ? "font-display text-lg font-semibold italic text-foreground truncate"
                : "truncate text-[15px] font-medium text-foreground"
            }
          >
            {title}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {isRoot && streak.count > 0 && (
            <div className="flex items-center gap-1 rounded-full border border-gold-champagne/30 bg-gold-gradient px-3 py-1 text-xs font-extrabold text-primary-foreground shadow-md shadow-gold/20 animate-pulse-glow shrink-0">
              <Flame className="size-3.5 fill-current text-gold-champagne" />
              <span>{streak.count} {streak.count === 1 ? "dia" : "dias"}</span>
            </div>
          )}

          {/* Botão de Menu com Gaveta Lateral */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              aria-label="Menu"
              className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground active:scale-95 border border-border cursor-pointer"
            >
              <Menu className="size-4.5" />
            </SheetTrigger>
            <SheetContent side="right" className="p-0 border-l border-purple-950/40 bg-[#12071f]/97 backdrop-blur-2xl text-white shadow-2xl">
              <SheetHeader className="p-5.5 border-b border-purple-900/20 bg-gradient-to-b from-purple-950/30 to-transparent">
                <div className="flex items-center gap-3.5">
                  <span className="flex size-10 items-center justify-center rounded-2xl bg-gold-gradient text-primary-foreground shadow-md shadow-gold/10">
                    <BrandMark size={20} />
                  </span>
                  <div className="text-left">
                    <SheetTitle className="font-display text-base font-extrabold text-gold-champagne tracking-wide leading-tight">
                      {siteConfig.name}
                    </SheetTitle>
                    <SheetDescription className="text-[10px] text-purple-200/50 mt-0.5 uppercase tracking-widest font-semibold">
                      Guia de Bolso Premium
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="flex flex-col gap-5 p-5 overflow-y-auto no-scrollbar pb-24">
                {/* Seção 1: Navegação Principal */}
                <div className="space-y-2">
                  <p className="eyebrow !text-gold-champagne/45 !text-[8.5px] px-1 tracking-[0.25em] font-extrabold uppercase">Menu Principal</p>
                  <div className="grid gap-2">
                    <Link
                      href="/"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] p-3.5 text-[13px] font-semibold text-white/90 transition-all hover:bg-white/[0.06] hover:border-gold/30 hover:-translate-y-0.5 active:scale-[0.99] shadow-xs group"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-purple-950/40 border border-purple-800/30 text-gold-bright group-hover:scale-105 transition-transform">
                        <Home className="size-4" />
                      </span>
                      <span>Início / Dashboard</span>
                    </Link>

                    <Link
                      href="/pilares"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] p-3.5 text-[13px] font-semibold text-white/90 transition-all hover:bg-white/[0.06] hover:border-gold/30 hover:-translate-y-0.5 active:scale-[0.99] shadow-xs group"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-purple-950/40 border border-purple-800/30 text-gold-bright group-hover:scale-105 transition-transform">
                        <Award className="size-4" />
                      </span>
                      <span>Os 5 Pilares</span>
                    </Link>

                    <Link
                      href="/kit-ia"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] p-3.5 text-[13px] font-semibold text-white/90 transition-all hover:bg-white/[0.06] hover:border-gold/30 hover:-translate-y-0.5 active:scale-[0.99] shadow-xs group"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-purple-950/40 border border-purple-800/30 text-gold-bright group-hover:scale-105 transition-transform">
                        <Sparkles className="size-4 animate-pulse-glow" />
                      </span>
                      <span>Biblioteca de Prompts IA</span>
                    </Link>
                  </div>
                </div>

                {/* Seção 2: Contato & Mentoria VIP */}
                <div className="space-y-2">
                  <p className="eyebrow !text-gold-champagne/45 !text-[8.5px] px-1 tracking-[0.25em] font-extrabold uppercase">VIP & Suporte</p>
                  <div className="grid gap-2">
                    <Dialog open={mentoriaOpen} onOpenChange={setMentoriaOpen}>
                      <DialogTrigger
                        render={
                          <button
                            type="button"
                            className="w-full flex items-center gap-3.5 rounded-2xl bg-gradient-to-br from-gold/5 via-white/[0.01] to-transparent border border-white/[0.04] p-3.5 text-[13px] font-semibold text-white/90 text-left transition-all hover:bg-white/[0.06] hover:border-gold/30 hover:-translate-y-0.5 active:scale-[0.99] shadow-xs group cursor-pointer"
                          />
                        }
                      >
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-purple-950/40 border border-purple-800/30 text-gold-bright group-hover:scale-105 transition-transform relative">
                          <Lock className="size-4 text-gold/80" />
                          <span className="absolute -top-0.5 -right-0.5 flex size-1.5">
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold animate-pulse"></span>
                          </span>
                        </span>
                        <div className="text-left">
                          <span className="block font-semibold text-white/90">Mentoria Hélia Gonçalves</span>
                          <span className="block text-[9.5px] text-[#7d6995] font-medium mt-0.5">🔒 Acesso VIP · Requer aplicação</span>
                        </div>
                      </DialogTrigger>
                      <MentoriaDialogContent onClose={() => {
                        setMentoriaOpen(false);
                        setMenuOpen(false);
                      }} />
                    </Dialog>

                    <a
                      href={whatsappLink(suporteMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] p-3.5 text-[13px] font-semibold text-white/90 transition-all hover:bg-white/[0.06] hover:border-gold/30 hover:-translate-y-0.5 active:scale-[0.99] shadow-xs group"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-purple-950/40 border border-purple-800/30 text-gold-bright group-hover:scale-105 transition-transform">
                        <MessageCircle className="size-4" />
                      </span>
                      <div className="text-left">
                        <span className="block font-semibold">Suporte via WhatsApp</span>
                        <span className="block text-[9.5px] text-[#7d6995] font-medium mt-0.5">Dúvidas, acessos ou suporte técnico</span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Seção 3: Conta / Avançado */}
                <div className="pt-2.5 border-t border-purple-950/60 space-y-2">
                  <p className="eyebrow !text-gold-champagne/45 !text-[8.5px] px-1 tracking-[0.25em] font-extrabold uppercase">Sua Conta</p>

                  {email && (
                    <div className="rounded-2xl bg-white/[0.02] border border-white/[0.04] p-3.5">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-purple-200/40">Conectada como</p>
                      <p className="mt-0.5 truncate text-[12.5px] font-semibold text-white/90">{email}</p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      void signOut();
                    }}
                    className="flex w-full items-center gap-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] p-3.5 text-[13px] font-semibold text-white/90 transition-all hover:bg-white/[0.06] hover:border-gold/30 active:scale-[0.99] cursor-pointer"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-purple-950/40 border border-purple-800/30 text-gold-bright">
                      <LogOut className="size-4" />
                    </span>
                    <span>Sair da conta</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      resetProgress();
                      setMenuOpen(false);
                      toast.success("Todo o seu progresso foi zerado! ✨", {
                        description: "Seu streak e práticas foram reiniciados.",
                      });
                    }}
                    className="flex w-full items-center gap-3.5 rounded-2xl bg-rose-500/[0.03] border border-rose-500/10 p-3.5 text-[13px] font-semibold text-rose-300 transition-all hover:bg-rose-500/10 hover:border-rose-500/30 active:scale-[0.99] cursor-pointer"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-rose-950/30 border border-rose-800/20 text-rose-400">
                      <RotateCcw className="size-4" />
                    </span>
                    <span>Zerar Todo o Progresso</span>
                  </button>
                </div>
              </div>

              <div className="absolute bottom-5 left-0 right-0 px-5 text-center text-[9px] text-purple-200/30">
                <p>{siteConfig.name} · por Hélia Gonçalves</p>
                <p className="mt-0.5">Sua presença, comunicada com intenção.</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

"use client";

import { BadgeCheck, LifeBuoy, ChevronRight, Sparkles, LogOut } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { MentoriaCta } from "@/components/mentoria-cta";
import { whatsappLink, suporteMessage, siteConfig } from "@/lib/config";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useSync } from "@/components/sync-provider";

export default function PerfilPage() {
  const { email, signOut } = useSync();
  return (
    <div className="space-y-7 pt-2">
      {/* Card do Usuário (Glassmorphism) */}
      <ScrollReveal>
        <section className="flex items-center gap-4 rounded-[24px] border border-purple-200/25 bg-card/65 backdrop-blur-md p-5 shadow-sm">
          <span className="flex size-15 shrink-0 items-center justify-center rounded-2xl bg-gold-gradient text-primary-foreground shadow-md">
            <BrandMark size={28} />
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-bold text-[#1c0d2b]">
              {email ?? "Aluno(a) Magnetismo"}
            </p>
            <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-0.5 text-[8.5px] font-extrabold text-gold-bright uppercase tracking-wider shadow-xs animate-pulse-glow">
              <BadgeCheck className="size-3.5" />
              Acesso liberado
            </span>
          </div>
        </section>
      </ScrollReveal>

      {/* Mentoria Hélia Gonçalves CTA Card */}
      <ScrollReveal delay={0.06}>
        <MentoriaCta />
      </ScrollReveal>

      {/* Links de Suporte e Utilitários */}
      <ScrollReveal delay={0.12}>
        <section className="space-y-4">
          <span className="bg-[#5c2d91] text-white text-[9px] font-extrabold tracking-[0.2em] uppercase px-3 py-1 rounded-md border-l-4 border-gold shadow-sm">
            Suporte & Recursos
          </span>
          
          <div className="overflow-hidden rounded-[24px] border border-purple-200/25 bg-card/65 backdrop-blur-md mt-3 shadow-sm">
            <a
              href={whatsappLink(suporteMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-4.5 transition-colors hover:bg-secondary/40"
            >
              <LifeBuoy className="size-5 text-gold-bright" />
              <span className="flex-1 text-[14px] font-medium text-foreground">Falar com o suporte</span>
              <ChevronRight className="size-4.5 text-muted-foreground" />
            </a>
            <a
              href="/kit-ia"
              className="flex items-center gap-3.5 border-t border-purple-200/20 p-4.5 transition-colors hover:bg-secondary/40"
            >
              <Sparkles className="size-5 text-gold-bright animate-pulse-glow" />
              <span className="flex-1 text-[14px] font-medium text-foreground">Biblioteca de Prompts IA</span>
              <ChevronRight className="size-4.5 text-muted-foreground" />
            </a>
          </div>
        </section>
      </ScrollReveal>

      {/* Sair da conta */}
      <ScrollReveal delay={0.18}>
        <button
          type="button"
          onClick={() => void signOut()}
          className="flex w-full items-center justify-center gap-2.5 rounded-[20px] border border-purple-200/30 bg-card/55 backdrop-blur-md py-3.5 text-[13px] font-bold text-muted-foreground transition-colors hover:text-foreground hover:border-gold/30 active:scale-[0.99]"
        >
          <LogOut className="size-4.5 text-gold-bright" />
          Sair da conta
        </button>
      </ScrollReveal>

      <p className="pt-2 text-center text-[10px] font-bold text-muted-foreground tracking-wider uppercase">
        {siteConfig.name} · por {siteConfig.author}
      </p>
    </div>
  );
}

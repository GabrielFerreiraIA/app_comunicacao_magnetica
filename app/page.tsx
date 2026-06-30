"use client";

import Link from "next/link";
import { Sparkles, ChevronRight } from "lucide-react";
import { LevelProgress } from "@/components/level-progress";
import { AchievementsPanel } from "@/components/achievements-panel";
import { DailyRitual } from "@/components/daily-ritual";
import { PillarGridCard } from "@/components/pillar-grid-card";
import { pillars } from "@/lib/content/pillars";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function HomePage() {
  const gridPillars = pillars.slice(0, 4);
  const featuredPillar = pillars[4];

  return (
    <div className="space-y-8 pb-8">
      {/* Seção de Introdução Editorial */}
      <ScrollReveal className="pt-2">
        <p className="eyebrow !text-[9.5px] tracking-[0.22em] text-[#8954c2] font-extrabold uppercase">
          Seja bem-vinda ao seu guia
        </p>
        <h1 className="mt-1 font-display text-[26px] font-extrabold leading-tight text-[#1c0d2b]">
          Sua jornada para a <span className="text-gold italic font-medium">presença magnética</span>
        </h1>
        <div className="rule-gold mt-4.5 opacity-55" />
      </ScrollReveal>

      {/* Status de Presença */}
      <ScrollReveal delay={0.06}>
        <LevelProgress />
      </ScrollReveal>

      {/* Ritual Diário */}
      <ScrollReveal delay={0.12}>
        <DailyRitual />
      </ScrollReveal>

      {/* Painel de Insígnias */}
      <ScrollReveal delay={0.18}>
        <AchievementsPanel />
      </ScrollReveal>

      {/* Grade de Acesso aos Conteúdos (Os 5 Pilares) */}
      <section className="space-y-4">
        <ScrollReveal className="flex items-end justify-between px-0.5">
          <div>
            {/* Tag Sólida de Identificação */}
            <span className="bg-[#5c2d91] text-white text-[9.5px] font-extrabold tracking-[0.2em] uppercase px-3 py-1 rounded-md border-l-4 border-gold shadow-sm">
              Os 5 Pilares
            </span>
          </div>
          <Link 
            href="/pilares" 
            className="text-xs font-bold text-[#8954c2] hover:opacity-85 transition-opacity underline decoration-gold/40 underline-offset-4"
          >
            Ver detalhes
          </Link>
        </ScrollReveal>
        
        {/* Grade Mobile 2x2 + 1 Destaque (Carisma) */}
        <div className="space-y-3.5 mt-3">
          <div className="grid grid-cols-2 gap-3.5">
            {gridPillars.map((p, idx) => (
              <ScrollReveal key={p.slug} delay={idx * 0.05}>
                <PillarGridCard pillar={p} />
              </ScrollReveal>
            ))}
          </div>
          {featuredPillar && (
            <ScrollReveal delay={0.15}>
              <PillarGridCard pillar={featuredPillar} featured={true} />
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Destaque VIP: Kit IA com Glassmorphism e Glow Dourado */}
      <ScrollReveal>
        <Link
          href="/kit-ia"
          className="group relative flex items-center gap-4 rounded-[24px] border border-gold/45 bg-card/65 p-5 shadow-md backdrop-blur-xl transition-all duration-300 active:scale-[0.98] overflow-hidden glass-card-glow"
        >
          {/* Efeito Shimmer de Brilho Dourado */}
          <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-gold-champagne/10 to-transparent opacity-65 transition-opacity group-hover:opacity-90 pointer-events-none" />
          <div className="absolute -inset-y-12 -left-24 w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-gold-champagne/20 to-transparent animate-shimmer pointer-events-none" />

          <span className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gold-gradient text-primary-foreground shadow-md shadow-gold/20">
            <Sparkles className="size-5.5 animate-pulse-glow" />
          </span>
          <span className="min-w-0 flex-1 relative z-10">
            <span className="eyebrow !text-gold-bright !text-[8.5px] font-extrabold tracking-widest">Acesso VIP</span>
            <span className="block font-display text-[15px] font-bold text-[#1c0d2b] mt-0.5">
              Biblioteca de Prompts IA
            </span>
            <span className="block text-[11px] text-muted-foreground leading-normal mt-0.5">
              Gere copys, fotos corporativas e análises de imagem exclusivas.
            </span>
          </span>
          <ChevronRight className="size-4 shrink-0 text-gold-bright relative z-10 transition-transform group-hover:translate-x-1" />
        </Link>
      </ScrollReveal>
    </div>
  );
}

"use client";

import * as React from "react";
import { countChecked, useChecklistState } from "@/lib/checklist-store";
import { allChecklistItemIds, totalChecklistItems } from "@/lib/content/checklists";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

function getMagnetismRank(pct: number): { title: string; desc: string; badge: string } {
  if (pct === 0) {
    return {
      title: "Presença Latente",
      desc: "Pronto para ser despertado nas práticas.",
      badge: "Iniciante",
    };
  }
  if (pct <= 25) {
    return {
      title: "Presença Desperta",
      desc: "Primeiros passos rumo ao seu magnetismo vocal e corporal.",
      badge: "Bronze",
    };
  }
  if (pct <= 50) {
    return {
      title: "Presença Influente",
      desc: "Sua voz e postura começam a moldar ambientes.",
      badge: "Prata",
    };
  }
  if (pct <= 75) {
    return {
      title: "Presença Magnética",
      desc: "Comunicação assertiva e conexão pessoal refinada.",
      badge: "Ouro",
    };
  }
  if (pct < 100) {
    return {
      title: "Presença Soberana",
      desc: "Presença refinada e domínio absoluto de palco.",
      badge: "Mestre",
    };
  }
  return {
    title: "Presença Suprema",
    desc: "Comunicação de elite. Ritual diário dominado.",
    badge: "Soberana",
  };
}

export function LevelProgress() {
  const checked = useChecklistState();
  const done = countChecked(checked, allChecklistItemIds);
  const pct = totalChecklistItems ? Math.round((done / totalChecklistItems) * 100) : 0;
  const rank = getMagnetismRank(pct);

  return (
    <div className="space-y-3 relative">
      {/* Tag Sólida de Identificação de Bloco / Categoria */}
      <div className="flex">
        <span className="bg-[#5c2d91] text-white text-[9.5px] font-extrabold tracking-[0.2em] uppercase px-3 py-1 rounded-md border-l-4 border-gold shadow-sm">
          Status de Presença
        </span>
      </div>

      {/* Card de Progresso (Glassmorphism Luxo) */}
      <div className="rounded-[24px] bg-card/90 p-5.5 shadow-premium backdrop-blur-xl relative overflow-hidden glass-card-glow">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="flex items-center justify-between gap-4 relative z-10">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="eyebrow !text-[8.5px] text-secondary-foreground font-bold tracking-widest">Nível Atual</span>
              <span className="inline-flex items-center gap-0.5 rounded-full bg-gold/10 border border-gold/30 px-2 py-0.5 text-[8px] font-extrabold text-gold-bright uppercase tracking-wider">
                {rank.badge}
              </span>
            </div>
            <h3 className="mt-1 font-display text-xl font-bold leading-tight text-foreground">
              {rank.title}
            </h3>
            <p className="text-[11.5px] text-muted-foreground leading-normal mt-0.5">
              Sua presença comunicativa está em <strong className="text-gold-bright font-bold">{pct}%</strong> de magnetismo.
            </p>
          </div>

          <div className="size-13 shrink-0 rounded-2xl bg-gold-gradient flex items-center justify-center shadow-md text-primary-foreground">
            <Trophy className="size-5.5 text-gold-champagne animate-pulse-glow" />
          </div>
        </div>

        {/* Trilha de Progresso Segmentada */}
        <div className="mt-5 space-y-1.5 relative z-10">
          <div className="grid grid-cols-4 gap-2">
            {[25, 50, 75, 100].map((step) => {
              const fillPct = pct >= step ? 100 : Math.max(0, Math.min(100, ((pct - (step - 25)) / 25) * 100));
              return (
                <div key={step} className="h-1.5 rounded-full bg-secondary border border-purple-100/10 overflow-hidden relative">
                  <div
                    className="h-full rounded-full bg-gold-gradient transition-all duration-1000 ease-out"
                    style={{ width: `${fillPct}%` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-[9px] text-muted-foreground font-bold tracking-widest uppercase px-0.5">
            <span>Latente</span>
            <span>Influente</span>
            <span>Magnética</span>
            <span>Suprema</span>
          </div>
        </div>
      </div>
    </div>
  );
}

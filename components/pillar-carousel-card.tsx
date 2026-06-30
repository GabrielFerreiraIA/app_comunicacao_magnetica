"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PillarIcon } from "@/components/pillar-icon";
import type { Pillar } from "@/lib/content/pillars";
import { checklistGroups } from "@/lib/content/checklists";
import { useChecklistState } from "@/lib/checklist-store";
import { cn } from "@/lib/utils";

export function PillarCarouselCard({ pillar }: { pillar: Pillar }) {
  const checked = useChecklistState();
  
  // Filtra os grupos de práticas referentes a este pilar específico
  const groups = checklistGroups.filter((g) => g.pillar === pillar.slug as any);
  const hasChecklist = groups.length > 0;
  
  let totalItems = 0;
  let doneItems = 0;
  let percent = 0;

  if (hasChecklist) {
    totalItems = groups.reduce((acc, g) => acc + g.items.length, 0);
    doneItems = groups.reduce(
      (acc, g) => acc + g.items.filter((item) => checked[item.id]).length,
      0
    );
    percent = totalItems ? Math.round((doneItems / totalItems) * 100) : 0;
  }

  const glowClasses: Record<string, string> = {
    voz: "pilar-glow-voz",
    arquetipos: "pilar-glow-arquetipos",
    imagem: "pilar-glow-imagem",
    lideranca: "pilar-glow-lideranca",
    carisma: "pilar-glow-carisma",
  };

  const badgeTexts: Record<string, string> = {
    arquetipos: "12 Perfis & Estilo",
    imagem: "Regra das Cores",
    carisma: "Scripts & Carisma",
  };

  const borderColors: Record<string, string> = {
    voz: "border-[#6b3fa0]/30 hover:border-[#6b3fa0]/60",
    arquetipos: "border-[#c7556b]/30 hover:border-[#c7556b]/60",
    imagem: "border-[#5bbf8a]/30 hover:border-[#5bbf8a]/60",
    lideranca: "border-[#c9a227]/30 hover:border-[#c9a227]/60",
    carisma: "border-[#f2e3a8]/30 hover:border-[#f2e3a8]/60",
  };

  const glow = glowClasses[pillar.slug] || "pilar-glow-voz";
  const border = borderColors[pillar.slug] || "border-border";

  return (
    <Link
      href={`/pilares/${pillar.slug}`}
      className={cn(
        "flex w-[240px] shrink-0 snap-center flex-col justify-between rounded-3xl border p-4.5 transition-all duration-300 active:scale-[0.97]",
        glow,
        border
      )}
    >
      <div className="flex items-start justify-between">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-black/40 text-gold-bright backdrop-blur-md border border-white/5">
          <PillarIcon name={pillar.icon} className="size-5.5" />
        </span>
        <span className="eyebrow !text-[9px] opacity-80">{pillar.eyebrow}</span>
      </div>

      <div className="mt-5 space-y-2">
        <div>
          <h3 className="line-clamp-1 font-display text-[15px] font-semibold leading-tight text-foreground">
            {pillar.title}
          </h3>
          {hasChecklist ? (
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {doneItems} de {totalItems} práticas feitas
            </p>
          ) : (
            <p className="text-[11px] text-gold-champagne font-medium mt-0.5">
              {badgeTexts[pillar.slug] || "Guia prático"}
            </p>
          )}
        </div>

        {hasChecklist ? (
          <div className="flex items-center gap-2 pt-1">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/35 border border-white/5">
              <div
                className="h-full rounded-full bg-gold-gradient transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-gold-bright">{percent}%</span>
          </div>
        ) : (
          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-muted-foreground">Ver ferramentas</span>
            <ChevronRight className="size-3.5 text-gold-champagne/70" />
          </div>
        )}
      </div>
    </Link>
  );
}

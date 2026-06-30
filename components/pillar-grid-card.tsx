"use client";

import Link from "next/link";
import { PillarIcon } from "@/components/pillar-icon";
import type { Pillar } from "@/lib/content/pillars";
import { checklistGroups } from "@/lib/content/checklists";
import { useChecklistState } from "@/lib/checklist-store";
import { cn } from "@/lib/utils";

export function PillarGridCard({ pillar, featured = false }: { pillar: Pillar; featured?: boolean }) {
  const checked = useChecklistState();

  // Filter checklist groups for this pillar
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
    voz: "Voz & Ritmo",
    arquetipos: "12 Perfis & Estilo",
    imagem: "Regra das Cores",
    lideranca: "Presença & Liderança",
    carisma: "Scripts & Carisma",
  };

  const borderColors: Record<string, string> = {
    voz: "border-purple-200/25 hover:border-[#5c2d91]/35",
    arquetipos: "border-purple-200/25 hover:border-[#c7556b]/35",
    imagem: "border-purple-200/25 hover:border-[#2e8b57]/35",
    lideranca: "border-purple-200/25 hover:border-gold/35",
    carisma: "border-gold/30 hover:border-gold/55",
  };

  const glow = glowClasses[pillar.slug] || "pilar-glow-voz";
  const border = borderColors[pillar.slug] || "border-purple-200/20";

  if (featured) {
    // Layout horizontal for featured pillar (Carisma)
    return (
      <Link
        href={`/pilares/${pillar.slug}`}
        className={cn(
          "flex w-full items-center justify-between rounded-[24px] border p-4.5 transition-all duration-300 active:scale-[0.98] shadow-sm backdrop-blur-md bg-card/65 relative overflow-hidden",
          glow,
          border
        )}
      >
        <div className="flex items-center gap-3.5 min-w-0 relative z-10">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-card border border-purple-200/10 shadow-xs text-gold-bright">
            <PillarIcon name={pillar.icon} className="size-5" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="eyebrow !text-[8.5px] text-[#8954c2] font-bold">{pillar.eyebrow}</span>
              {/* Custom micro pill (Inspirado no visual de referência) */}
              <span className="inline-flex items-center rounded-full bg-gold/10 border border-gold/35 px-1 py-0.2 text-[8px] font-extrabold text-gold-bright">
                VIP
              </span>
            </div>
            <h3 className="font-display text-[14.5px] font-bold leading-tight text-[#1c0d2b] truncate mt-0.5">
              {pillar.title}
            </h3>
            <p className="text-[10px] text-gold-bright font-bold mt-0.5">
              {badgeTexts[pillar.slug] || "Conteúdo Premium"}
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-secondary-foreground bg-secondary px-3 py-1.5 rounded-xl shrink-0 border border-purple-200/15 relative z-10">
          Ver pilar
        </span>
      </Link>
    );
  }

  // Standard vertical grid card
  return (
    <Link
      href={`/pilares/${pillar.slug}`}
      className={cn(
        "flex flex-col justify-between rounded-[24px] border p-4.5 transition-all duration-300 active:scale-[0.97] min-h-[135px] shadow-sm backdrop-blur-md bg-card/65",
        glow,
        border
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex size-9.5 shrink-0 items-center justify-center rounded-xl bg-card border border-purple-200/10 shadow-xs text-gold-bright">
          <PillarIcon name={pillar.icon} className="size-4.5" />
        </span>
        {/* Custom capsule status badge (Inspirado no visual de referência) */}
        <span className="bg-secondary text-[#8954c2] text-[8.5px] font-extrabold uppercase px-2 py-0.5 rounded-full border border-purple-200/10">
          {pillar.num}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="line-clamp-1 font-display text-[13.5px] font-bold leading-tight text-[#1c0d2b]">
          {pillar.title}
        </h3>
        
        {hasChecklist ? (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[9px] font-bold text-muted-foreground">
              <span>Progresso</span>
              <span className="text-gold-bright">{percent}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary border border-purple-200/10">
              <div
                className="h-full rounded-full bg-gold-gradient transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        ) : (
          <span className="text-[9.5px] text-muted-foreground font-semibold leading-none block">
            {badgeTexts[pillar.slug] || "Conteúdo"}
          </span>
        )}
      </div>
    </Link>
  );
}

"use client";

import Link from "next/link";
import { RotateCcw, Sparkles } from "lucide-react";
import { computeArchetypeResults, findCombinationRule } from "@/lib/content/archetypes";
import { resetArchetypeQuiz, useArchetypeQuiz } from "@/lib/archetype-quiz-store";
import { ArchetypeIcon } from "@/components/archetype-icon";
import { cn } from "@/lib/utils";

export function ArchetypeResultsPanel({ compact = false }: { compact?: boolean }) {
  const { scores } = useArchetypeQuiz();
  const results = computeArchetypeResults(scores);
  const hasAnyScore = results.some((r) => r.total > 0);
  const [primary, secondary] = results;

  if (!hasAnyScore) return null;

  const combination = secondary ? findCombinationRule(primary.archetype.id, secondary.archetype.id) : undefined;

  if (compact) {
    return (
      <Link
        href={`/pilares/arquetipos/${primary.archetype.id}`}
        className="flex items-center gap-3 rounded-[20px] border border-gold/30 bg-gold/5 p-4 transition-colors hover:bg-gold/10 active:scale-[0.99]"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-primary-foreground">
          <Sparkles className="size-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[10px] font-bold uppercase tracking-widest text-gold-bright">Seu arquétipo primário</span>
          <span className="block font-display text-[15px] font-bold text-[#1c0d2b]">{primary.archetype.name}</span>
        </span>
        <span className="shrink-0 text-[11px] font-bold text-gold-bright">{primary.percent}%</span>
      </Link>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Link
          href={`/pilares/arquetipos/${primary.archetype.id}`}
          className="rounded-[20px] border border-gold/35 bg-gold/5 p-4 transition-colors hover:bg-gold/10 active:scale-[0.98]"
        >
          <ArchetypeIcon archetype={primary.archetype} size="sm" />
          <p className="mt-2 text-[9px] font-extrabold uppercase tracking-widest text-gold-bright">Primário · {primary.percent}%</p>
          <p className="mt-1 font-display text-base font-bold text-[#1c0d2b]">{primary.archetype.name}</p>
          <p className="mt-0.5 text-[10.5px] text-muted-foreground leading-snug">{primary.archetype.alias}</p>
        </Link>
        {secondary && (
          <Link
            href={`/pilares/arquetipos/${secondary.archetype.id}`}
            className="rounded-[20px] border border-purple-200/25 bg-card/65 p-4 transition-colors hover:border-gold/30 active:scale-[0.98]"
          >
            <ArchetypeIcon archetype={secondary.archetype} size="sm" />
            <p className="mt-2 text-[9px] font-extrabold uppercase tracking-widest text-secondary-foreground">
              Secundário · {secondary.percent}%
            </p>
            <p className="mt-1 font-display text-base font-bold text-[#1c0d2b]">{secondary.archetype.name}</p>
            <p className="mt-0.5 text-[10.5px] text-muted-foreground leading-snug">{secondary.archetype.alias}</p>
          </Link>
        )}
      </div>

      {combination && (
        <div className="rounded-[24px] border border-gold/35 bg-card/65 backdrop-blur-md p-5 shadow-xs">
          <p className="eyebrow !text-gold-bright !text-[8.5px] font-bold tracking-widest">Combinação Detectada</p>
          <p className="mt-1 font-display text-[14px] font-bold text-[#1c0d2b]">{combination.title}</p>
          <p className="mt-2 text-[11.5px] leading-relaxed text-muted-foreground">{combination.action}</p>
          <div className="mt-3 space-y-2">
            <div className="rounded-xl border border-purple-200/15 bg-secondary/30 p-3">
              <p className="eyebrow !text-muted-foreground !text-[8px] font-bold tracking-widest">Look sugerido</p>
              <p className="mt-0.5 text-[11.5px] leading-relaxed text-foreground">{combination.look}</p>
            </div>
            <div className="rounded-xl border border-purple-200/15 bg-secondary/30 p-3">
              <p className="eyebrow !text-muted-foreground !text-[8px] font-bold tracking-widest">Voz</p>
              <p className="mt-0.5 text-[11.5px] leading-relaxed text-foreground">{combination.voiceTip}</p>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-[24px] border border-purple-200/25 bg-card/65 backdrop-blur-md p-5 shadow-xs">
        <p className="eyebrow !text-[8.5px] text-secondary-foreground font-bold tracking-widest">Ranking Completo</p>
        <div className="mt-3 space-y-2.5">
          {results.map((r, idx) => (
            <div key={r.archetype.id} className="space-y-1">
              <div className="flex items-center justify-between gap-2 text-[11.5px]">
                <span className={cn("font-semibold", idx < 2 ? "text-[#1c0d2b]" : "text-muted-foreground")}>
                  {r.archetype.name}
                </span>
                <span className="shrink-0 font-bold text-muted-foreground">{r.total}/12</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary border border-purple-200/10">
                <div
                  className={cn("h-full rounded-full transition-all duration-700", idx < 2 ? "bg-gold-gradient" : "bg-orchid/40")}
                  style={{ width: `${r.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={resetArchetypeQuiz}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-200/20 py-2.5 text-[11px] font-bold text-muted-foreground transition-colors hover:bg-secondary/40"
      >
        <RotateCcw className="size-3.5" />
        Refazer diagnóstico
      </button>
    </div>
  );
}

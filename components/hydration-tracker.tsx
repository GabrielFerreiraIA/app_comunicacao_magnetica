"use client";

import { GlassWater, Minus, Plus } from "lucide-react";
import { hydrationGlassMl, hydrationGoalGlasses } from "@/lib/content/vocal-care";
import { addGlass, useHydration } from "@/lib/voice-care-store";
import { cn } from "@/lib/utils";

export function HydrationTracker() {
  const { count } = useHydration();
  const liters = ((count * hydrationGlassMl) / 1000).toFixed(2).replace(/\.?0+$/, "");
  const metGoal = count >= hydrationGoalGlasses;

  return (
    <div className="rounded-[24px] bg-card/85 backdrop-blur-md p-5 shadow-premium">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-gold animate-pulse-gold shrink-0" />
            <p className="eyebrow !text-[8.5px] text-secondary-foreground font-bold tracking-widest">Hidratação Vocal</p>
          </div>
          <p className="mt-0.5 font-display text-lg font-bold text-[#1c0d2b]">
            {liters}L <span className="text-xs font-semibold text-muted-foreground">/ {(hydrationGoalGlasses * hydrationGlassMl) / 1000}L</span>
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => addGlass(-1)}
            disabled={count === 0}
            className="flex size-8 items-center justify-center rounded-full border border-purple-200/20 bg-card text-muted-foreground transition-colors disabled:opacity-30 active:scale-95"
            aria-label="Remover um copo"
          >
            <Minus className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => addGlass(1)}
            className="flex size-8 items-center justify-center rounded-full bg-gold-gradient text-primary-foreground shadow-sm active:scale-95"
            aria-label="Adicionar um copo"
          >
            <Plus className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-8 gap-1.5">
        {Array.from({ length: hydrationGoalGlasses }).map((_, i) => {
          const filled = i < count;
          return (
            <span
              key={i}
              className={cn(
                "flex aspect-square items-center justify-center rounded-lg border transition-all duration-300",
                filled ? "border-transparent bg-gold-gradient shadow-xs" : "border-purple-200/15 bg-secondary/40",
              )}
            >
              <GlassWater
                className={cn("size-3.5 transition-colors", filled ? "text-primary-foreground" : "text-purple-200/40")}
                strokeWidth={2.25}
              />
            </span>
          );
        })}
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
        {metGoal
          ? "Meta batida — sua voz agradece. Continue espaçando os copos ao longo do dia."
          : `Água em temperatura ambiente lubrifica as pregas vocais. Faltam ${hydrationGoalGlasses - count} copo${hydrationGoalGlasses - count === 1 ? "" : "s"} para a meta de hoje.`}
      </p>
    </div>
  );
}

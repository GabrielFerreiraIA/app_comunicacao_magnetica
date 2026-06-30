"use client";

import { Check, Stethoscope } from "lucide-react";
import { vocalRedFlagRecommendation, vocalRedFlagThreshold, vocalRedFlags } from "@/lib/content/vocal-care";
import { toggleItem, useChecklistState } from "@/lib/checklist-store";
import { cn } from "@/lib/utils";

export function VocalRedFlags() {
  const checked = useChecklistState();
  const anyChecked = vocalRedFlags.some((f) => checked[f.id]);

  return (
    <div className="rounded-[24px] border border-destructive/25 bg-card/65 backdrop-blur-md p-5 shadow-xs">
      <p className="eyebrow !text-[8.5px] !text-destructive font-bold tracking-widest">
        Triagem · Sinais de Alerta
      </p>
      <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
        Marque o que você vem sentindo há mais de {vocalRedFlagThreshold}:
      </p>

      <ul className="mt-3 space-y-2">
        {vocalRedFlags.map((flag) => {
          const isOn = !!checked[flag.id];
          return (
            <li key={flag.id}>
              <button
                type="button"
                onClick={() => toggleItem(flag.id)}
                aria-pressed={isOn}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-2xl border p-3 text-left transition-colors",
                  isOn ? "border-destructive/35 bg-destructive/5" : "border-purple-200/15 bg-secondary/25 hover:bg-secondary/40",
                )}
              >
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-full border transition-all",
                    isOn ? "border-transparent bg-destructive text-white" : "border-purple-200/25 text-transparent",
                  )}
                >
                  <Check className="size-3" strokeWidth={3} />
                </span>
                <span className="text-[13px] font-semibold text-[#1c0d2b]">{flag.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {anyChecked && (
        <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-destructive/25 bg-destructive/5 p-3">
          <Stethoscope className="mt-0.5 size-4 shrink-0 text-destructive" />
          <p className="text-[11.5px] leading-relaxed text-destructive">{vocalRedFlagRecommendation}</p>
        </div>
      )}
    </div>
  );
}

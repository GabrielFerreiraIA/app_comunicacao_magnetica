"use client";

import { useState } from "react";
import { Check, TriangleAlert } from "lucide-react";
import { preEventMealItems } from "@/lib/content/vocal-care";
import { cn } from "@/lib/utils";

// Estado é só da sessão (a pergunta é "o que você comeu nas últimas 2h", não algo a manter salvo).
export function PreEventMealCheck() {
  const [marked, setMarked] = useState<Record<string, boolean>>({});

  const hasAlert = preEventMealItems.some((i) => i.type === "alert" && marked[i.id]);

  return (
    <div className="rounded-[24px] border border-purple-200/25 bg-card/65 backdrop-blur-md p-5 shadow-xs">
      <p className="eyebrow !text-[8.5px] text-secondary-foreground font-bold tracking-widest">
        Antes de Falar
      </p>
      <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
        O que você consumiu nas últimas 2 horas?
      </p>

      <ul className="mt-3 space-y-2">
        {preEventMealItems.map((item) => {
          const isOn = !!marked[item.id];
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setMarked((m) => ({ ...m, [item.id]: !m[item.id] }))}
                aria-pressed={isOn}
                className={cn(
                  "flex w-full items-start gap-2.5 rounded-2xl border p-3 text-left transition-colors",
                  isOn
                    ? item.type === "alert"
                      ? "border-destructive/35 bg-destructive/5"
                      : "border-success/35 bg-success/5"
                    : "border-purple-200/15 bg-secondary/25 hover:bg-secondary/40",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-all",
                    isOn
                      ? item.type === "alert"
                        ? "border-transparent bg-destructive text-white"
                        : "border-transparent bg-success text-white"
                      : "border-purple-200/25 text-transparent",
                  )}
                >
                  <Check className="size-3" strokeWidth={3} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-semibold text-[#1c0d2b]">{item.label}</span>
                  {isOn && (
                    <span
                      className={cn(
                        "mt-1 inline-flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-wide",
                        item.type === "alert" ? "text-destructive" : "text-success",
                      )}
                    >
                      {item.type === "alert" ? <TriangleAlert className="size-3" /> : <Check className="size-3" />}
                      {item.type === "alert" ? "Evite" : "Recomendado"}
                    </span>
                  )}
                  {isOn && <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">{item.note}</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {hasAlert && (
        <p className="mt-3 rounded-xl border border-destructive/25 bg-destructive/5 p-3 text-[11px] leading-relaxed text-destructive">
          Algo no que você consumiu pode prejudicar sua performance vocal agora. Beba água em temperatura ambiente antes de falar.
        </p>
      )}
    </div>
  );
}

"use client";

import { Check } from "lucide-react";
import type { ChecklistGroup } from "@/lib/content/checklists";
import { toggleItem, useChecklistState } from "@/lib/checklist-store";
import { cn } from "@/lib/utils";

export function Checklist({ group }: { group: ChecklistGroup }) {
  const checked = useChecklistState();
  const done = group.items.filter((i) => checked[i.id]).length;

  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-foreground">{group.title}</h3>
        <span className="shrink-0 text-xs text-muted-foreground">
          {done}/{group.items.length}
        </span>
      </div>
      {group.intro && <p className="-mt-1 text-sm text-muted-foreground">{group.intro}</p>}

      <ul className="overflow-hidden rounded-2xl bg-card/85 backdrop-blur-md shadow-premium">
        {group.items.map((item, idx) => {
          const isOn = !!checked[item.id];
          return (
            <li key={item.id} className={idx > 0 ? "border-t border-border/70" : undefined}>
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                aria-pressed={isOn}
                className="flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-secondary/40 active:bg-secondary/60"
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border transition-all",
                    isOn
                      ? "border-transparent bg-gold-gradient text-primary-foreground"
                      : "border-border text-transparent",
                  )}
                >
                  <Check className="size-4" strokeWidth={3} />
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      "block text-[15px] font-medium transition-colors",
                      isOn ? "text-muted-foreground line-through" : "text-foreground",
                    )}
                  >
                    {item.title}
                  </span>
                  {item.detail && (
                    <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">
                      {item.detail}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

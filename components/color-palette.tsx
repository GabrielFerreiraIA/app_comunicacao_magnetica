"use client";

import { useState } from "react";
import { colorGroups, type ColorGroup, type StrategicColor } from "@/lib/content/colors";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function ColorPalette({ groups = colorGroups }: { groups?: ColorGroup[] }) {
  const [selected, setSelected] = useState<StrategicColor | null>(null);
  const open = selected !== null;

  return (
    <>
      <div className="space-y-8">
        {groups.map((group, idx) => (
          <ScrollReveal key={group.id} delay={idx * 0.05} className="space-y-4">
            <div>
              {/* Tag Sólida da Seção */}
              <div className="flex">
                <span className="bg-[#5c2d91] text-white text-[9px] font-extrabold tracking-[0.2em] uppercase px-3 py-1 rounded-md border-l-4 border-gold shadow-sm">
                  {group.title}
                </span>
              </div>
              <p className="text-[11.5px] text-muted-foreground mt-2.5 leading-relaxed px-0.5">
                {group.description}
              </p>
            </div>
            
            <div className="grid grid-cols-4 gap-3 relative z-10 mt-3">
              {group.colors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelected(c)}
                  className="flex flex-col items-center gap-1.5 active:scale-95 group cursor-pointer"
                >
                  <span
                    className="size-13 rounded-2xl border border-purple-200/10 shadow-md transition-transform duration-300 group-hover:scale-105 relative"
                    style={{ background: c.swatch }}
                    aria-hidden
                  />
                  <span className="text-[10px] text-muted-foreground font-semibold tracking-wide truncate max-w-full text-center">
                    {c.name}
                  </span>
                </button>
              ))}
            </div>
          </ScrollReveal>
        ))}
      </div>

      <Dialog open={open} onOpenChange={(o) => !o && setSelected(null)}>
        {selected && (
          <DialogContent className="max-w-[340px] rounded-[24px] border border-purple-200/25 bg-card/95 p-5 shadow-lg backdrop-blur-xl animate-fade-in-up">
            <span
              className="mx-auto size-16 rounded-2xl border border-purple-100/10 shadow-md"
              style={{ background: selected.swatch }}
              aria-hidden
            />
            <DialogHeader className="items-center text-center mt-3">
              <DialogTitle className="font-display text-xl font-bold text-[#1c0d2b]">
                {selected.name}
              </DialogTitle>
              <DialogDescription className="text-gold-bright font-extrabold text-[11px] tracking-wide uppercase">
                {selected.headline}
              </DialogDescription>
            </DialogHeader>

            <p className="text-center text-xs leading-relaxed text-muted-foreground mt-1">
              {selected.communication}
            </p>

            <div className="flex flex-wrap justify-center gap-1.5 mt-3">
              {selected.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-purple-200/15 bg-secondary px-2.5 py-0.5 text-[9.5px] font-semibold text-secondary-foreground"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="rounded-xl border border-purple-200/20 bg-secondary/35 p-3 mt-3">
              <p className="eyebrow !text-muted-foreground !text-[8px] font-bold tracking-widest uppercase">Quando usar</p>
              <p className="mt-0.5 text-xs text-foreground leading-relaxed">{selected.usage}</p>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}

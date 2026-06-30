"use client";

import { useState } from "react";
import { getColorById } from "@/lib/content/colors";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function ColorSwatchChip({ colorId }: { colorId: string }) {
  const [open, setOpen] = useState(false);
  const color = getColorById(colorId);
  if (!color) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex flex-col items-center gap-1.5 active:scale-95"
      >
        <span
          className="size-11 rounded-2xl border border-purple-200/10 shadow-md transition-transform duration-300 hover:scale-105"
          style={{ background: color.swatch }}
          aria-hidden
        />
        <span className="text-[10px] font-semibold tracking-wide text-muted-foreground">{color.name}</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[340px] rounded-[24px] border border-purple-200/25 bg-card/95 p-5 shadow-lg backdrop-blur-xl">
          <span
            className="mx-auto size-16 rounded-2xl border border-purple-100/10 shadow-md"
            style={{ background: color.swatch }}
            aria-hidden
          />
          <DialogHeader className="items-center text-center mt-3">
            <DialogTitle className="font-display text-xl font-bold text-[#1c0d2b]">{color.name}</DialogTitle>
            <DialogDescription className="text-gold-bright font-extrabold text-[11px] tracking-wide uppercase">
              {color.headline}
            </DialogDescription>
          </DialogHeader>
          <p className="text-center text-xs leading-relaxed text-muted-foreground mt-1">{color.communication}</p>
          <div className="rounded-xl border border-purple-200/20 bg-secondary/35 p-3 mt-3">
            <p className="eyebrow !text-muted-foreground !text-[8px] font-bold tracking-widest uppercase">Quando usar</p>
            <p className="mt-0.5 text-xs text-foreground leading-relaxed">{color.usage}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { Images } from "lucide-react";
import type { ArchetypePoses } from "@/lib/content/archetype-poses";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

function PoseThumb({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative aspect-[3/4] w-full overflow-hidden rounded-[16px] border border-purple-200/25 bg-secondary/20 shadow-xs transition-transform active:scale-[0.97]"
    >
      <Image src={src} alt={alt} fill sizes="45vw" className="object-cover object-top" />
    </button>
  );
}

function PoseGroup({
  label,
  images,
  archetypeName,
  onSelect,
}: {
  label: string;
  images: string[];
  archetypeName: string;
  onSelect: (src: string) => void;
}) {
  if (images.length === 0) return null;
  return (
    <div>
      <p className="eyebrow !text-[8px] !text-muted-foreground font-bold tracking-widest">{label}</p>
      <div className="mt-2 grid grid-cols-3 gap-2.5">
        {images.map((src, idx) => (
          <PoseThumb
            key={src}
            src={src}
            alt={`${archetypeName} — ${label} — pose ${idx + 1}`}
            onClick={() => onSelect(src)}
          />
        ))}
      </div>
    </div>
  );
}

export function ArchetypePosesGallery({
  poses,
  archetypeName,
}: {
  poses: ArchetypePoses | undefined;
  archetypeName: string;
}) {
  const [open, setOpen] = useState<string | null>(null);

  const hasFeminino = (poses?.feminino.length ?? 0) > 0;
  const hasMasculino = (poses?.masculino.length ?? 0) > 0;

  if (!poses || (!hasFeminino && !hasMasculino)) {
    return null;
  }

  return (
    <div className="space-y-4 rounded-[24px] border border-purple-200/25 bg-card/65 backdrop-blur-md p-5 shadow-xs">
      <div className="flex items-center gap-1.5">
        <Images className="size-3.5 text-muted-foreground" />
        <p className="eyebrow !text-[8.5px] !text-secondary-foreground font-bold tracking-widest">
          Poses de Referência
        </p>
      </div>
      <div
        className={cn(
          "space-y-4",
          hasFeminino && hasMasculino && "grid grid-cols-1 gap-4 space-y-0 sm:grid-cols-2",
        )}
      >
        <PoseGroup
          label="Versão Feminina"
          images={poses.feminino}
          archetypeName={archetypeName}
          onSelect={setOpen}
        />
        <PoseGroup
          label="Versão Masculina"
          images={poses.masculino}
          archetypeName={archetypeName}
          onSelect={setOpen}
        />
      </div>

      <Dialog open={open !== null} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent
          showCloseButton
          className="max-w-[calc(100%-2rem)] border-none bg-transparent p-0 shadow-none ring-0 sm:max-w-lg"
        >
          <DialogTitle className="sr-only">{archetypeName} — pose ampliada</DialogTitle>
          {open && (
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[20px] bg-black/5">
              <Image src={open} alt={archetypeName} fill sizes="90vw" className="object-contain" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

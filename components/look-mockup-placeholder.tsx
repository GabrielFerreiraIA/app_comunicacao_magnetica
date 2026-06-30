import { ImagePlus } from "lucide-react";

export function LookMockupPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex aspect-[3/4] w-full flex-col items-center justify-center gap-2 rounded-[20px] border-2 border-dashed border-purple-200/25 bg-secondary/20 p-4 text-center">
      <span className="flex size-9 items-center justify-center rounded-full bg-card border border-purple-200/15 text-muted-foreground">
        <ImagePlus className="size-4" />
      </span>
      <p className="text-[11px] font-semibold leading-snug text-muted-foreground">{label}</p>
      <p className="text-[9.5px] text-muted-foreground/70">Adicione sua foto aqui</p>
    </div>
  );
}

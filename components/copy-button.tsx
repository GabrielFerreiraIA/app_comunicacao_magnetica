"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function CopyButton({
  text,
  label = "Copiar",
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copiado com sucesso");
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Não foi possível copiar");
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-transform active:scale-95",
        className,
      )}
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      {copied ? "Copiado" : label}
    </button>
  );
}

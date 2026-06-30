import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/config";
import { cn } from "@/lib/utils";

export function WhatsappCta({
  message,
  title,
  description,
  cta = "Falar no WhatsApp",
  className,
}: {
  message: string;
  title: string;
  description?: string;
  cta?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-5",
        "bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(201,162,39,0.14),transparent_55%)]",
        className,
      )}
    >
      <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-5 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-transform active:scale-95"
      >
        <MessageCircle className="size-4" />
        {cta}
      </a>
    </div>
  );
}

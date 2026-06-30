"use client";

import { Info } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { aiPrompts, categoryLabels, type PromptCategory } from "@/lib/content/prompts";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const order: PromptCategory[] = ["imagem", "comunicacao", "voz"];

export default function KitIaPage() {
  return (
    <div className="space-y-7 pt-2">
      {/* Bloco Informativo de Vidro */}
      <ScrollReveal className="flex gap-3 rounded-[20px] border border-purple-200/25 bg-secondary/30 p-4">
        <Info className="mt-0.5 size-5 shrink-0 text-gold-bright animate-pulse-glow" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          Copie o prompt, cole no ChatGPT (versão 4/4o) e, quando indicado, anexe uma foto sua com a
          roupa que pretende usar.
        </p>
      </ScrollReveal>

      {order.map((cat) => {
        const prompts = aiPrompts.filter((p) => p.category === cat);
        if (prompts.length === 0) return null;
        return (
          <section key={cat} className="space-y-4">
            <ScrollReveal>
              <span className="bg-[#5c2d91] text-white text-[9px] font-extrabold tracking-[0.2em] uppercase px-3 py-1 rounded-md border-l-4 border-gold shadow-sm">
                {categoryLabels[cat]}
              </span>
            </ScrollReveal>
            
            <div className="space-y-4 mt-3">
              {prompts.map((p, idx) => (
                <ScrollReveal key={p.id} delay={idx * 0.06}>
                  <article className="rounded-[24px] border border-purple-200/25 bg-card/65 backdrop-blur-md p-5 shadow-sm hover:border-gold/30 transition-all duration-300 relative overflow-hidden glass-card-glow">
                    <h3 className="font-display text-[15.5px] font-bold text-[#1c0d2b]">{p.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{p.description}</p>

                    <pre className="mt-4.5 max-h-44 overflow-auto whitespace-pre-wrap rounded-xl border border-purple-200/10 bg-background/50 p-4 font-mono text-[11px] leading-relaxed text-foreground/90 no-scrollbar select-all">
                      {p.prompt}
                    </pre>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <p className="text-[10px] text-gold-bright font-bold uppercase tracking-wider">{p.instruction}</p>
                      <CopyButton
                        text={p.prompt}
                        label="Copiar prompt"
                        className="shrink-0 px-3.5 py-2.5 text-xs rounded-xl"
                      />
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

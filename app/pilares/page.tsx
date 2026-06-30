"use client";

import { PillarCard } from "@/components/pillar-card";
import { pillars } from "@/lib/content/pillars";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function PilaresPage() {
  return (
    <div className="space-y-6 pb-8 pt-2">
      {/* Eyebrow & Headline Editorial */}
      <ScrollReveal>
        <p className="eyebrow !text-[9.5px] tracking-[0.22em] text-[#8954c2] font-extrabold uppercase">
          Metodologia Exclusiva
        </p>
        <h1 className="font-display text-[26px] font-extrabold leading-tight text-[#1c0d2b]">
          Os 5 Pilares do <span className="text-gold italic font-medium">Magnetismo</span>
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed pt-1">
          Cinco frentes integradas para esculpir sua voz, postura, imagem e autoridade. Avance no seu ritmo — seu progresso fica salvo automaticamente.
        </p>
        <div className="rule-gold mt-4.5 opacity-55" />
      </ScrollReveal>

      {/* Lista de Cards com Spacing Generoso e Animação Stagger via Scroll */}
      <div className="space-y-4">
        {pillars.map((p, idx) => (
          <ScrollReveal key={p.slug} delay={idx * 0.05}>
            <PillarCard pillar={p} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

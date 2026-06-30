"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PillarIcon } from "@/components/pillar-icon";
import type { Pillar } from "@/lib/content/pillars";
import { checklistGroups } from "@/lib/content/checklists";
import { useChecklistState } from "@/lib/checklist-store";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const cardVariants = {
  initial: { scale: 1, y: 0 },
  hover: { scale: 1.015, y: -2, transition: { type: "spring" as const, stiffness: 300, damping: 20 } },
  tap: { scale: 0.985, y: 0 },
};

export function PillarCard({ pillar }: { pillar: Pillar }) {
  const checked = useChecklistState();

  // Filter checklist groups for progress calculations
  const groups = checklistGroups.filter((g) => g.pillar === pillar.slug as any);
  const hasChecklist = groups.length > 0;

  let totalItems = 0;
  let doneItems = 0;
  let percent = 0;

  if (hasChecklist) {
    totalItems = groups.reduce((acc, g) => acc + g.items.length, 0);
    doneItems = groups.reduce(
      (acc, g) => acc + g.items.filter((item) => checked[item.id]).length,
      0
    );
    percent = totalItems ? Math.round((doneItems / totalItems) * 100) : 0;
  }

  const gradientClasses: Record<string, string> = {
    voz: "from-[#fbf9ff] to-[#f5effd] border-purple-200/25 shadow-purple-100/10",
    arquetipos: "from-[#fffafb] to-[#fdeef1] border-[#c7556b]/15 shadow-red-100/10",
    imagem: "from-[#f8fdfa] to-[#eefcf4] border-[#2e8b57]/15 shadow-green-100/10",
    lideranca: "from-[#faf8f5] to-[#f8f2e5] border-gold/20 shadow-gold/5",
    carisma: "from-[#fdfcfb] to-[#fdf8eb] border-gold/30 shadow-gold/10",
  };

  const iconColors: Record<string, string> = {
    voz: "text-orchid",
    arquetipos: "text-[#c7556b]",
    imagem: "text-[#2e8b57]",
    lideranca: "text-gold-bright",
    carisma: "text-gold-bright animate-pulse-glow",
  };

  const highlights: Record<string, string> = {
    voz: "8 exercícios práticos de aquecimento e articulação",
    arquetipos: "Guia de estilo, tom de voz e sombra arquetípica",
    imagem: "Como harmonizar tons e criar impacto visual imediato",
    lideranca: "Dominando ambientes, vídeos e autocontrole emocional",
    carisma: "Tríade assertiva e scripts prontos para validação",
  };

  const badgeTexts: Record<string, string> = {
    voz: "Práticas Vocais",
    arquetipos: "12 Perfis & Estilo",
    imagem: "Regra das Cores",
    lideranca: "Práticas Executivas",
    carisma: "Scripts & Carisma",
  };

  const cardGradient = gradientClasses[pillar.slug] || "from-card to-card border-border";
  const iconColor = iconColors[pillar.slug] || "text-gold-bright";

  return (
    <Link href={`/pilares/${pillar.slug}`} className="block w-full">
      <motion.div
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className={cn(
          "rounded-[28px] border bg-gradient-to-br p-5 flex flex-col gap-4 shadow-sm backdrop-blur-xl transition-colors relative overflow-hidden",
          cardGradient
        )}
      >
        {/* Glow de Fundo Sutil */}
        <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_0%_0%,rgba(201,162,39,0.02),transparent_60%)] pointer-events-none" />

        {/* Linha Principal (Header do Card) */}
        <div className="flex items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-card border border-purple-100/10 shadow-xs">
              <PillarIcon name={pillar.icon} className={cn("size-5", iconColor)} />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                {/* Tag Sólida Interna (Inspirada no visual BLOCO 01) */}
                <span className="bg-[#5c2d91] text-white text-[8px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded shadow-xs">
                  {pillar.eyebrow}
                </span>
                
                {/* Badge Outline */}
                <span className="rounded-full bg-card/65 border border-purple-200/10 px-2 py-0.5 text-[8.5px] font-bold text-muted-foreground">
                  {badgeTexts[pillar.slug]}
                </span>
              </div>
              <h3 className="font-display text-[15.5px] font-extrabold leading-tight text-[#1c0d2b] mt-1">
                {pillar.title}
              </h3>
            </div>
          </div>
          
          <span className="flex size-7.5 shrink-0 items-center justify-center rounded-full bg-card border border-purple-100/10 text-muted-foreground shadow-xs">
            <ChevronRight className="size-4" />
          </span>
        </div>

        {/* Resumo do Conteúdo */}
        <p className="text-[11.5px] leading-relaxed text-muted-foreground relative z-10 px-0.5">
          {highlights[pillar.slug] || pillar.subtitle}
        </p>

        {/* Barra de Progresso ou Badge Especial */}
        <div className="relative z-10 px-0.5 pt-1">
          {hasChecklist ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[9px] font-bold tracking-wider uppercase text-muted-foreground">
                <span>Práticas Dominadas</span>
                <span className="text-gold-bright font-extrabold">{percent}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary border border-purple-200/10">
                <div
                  className="h-full rounded-full bg-gold-gradient transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center text-[9px] font-bold tracking-wider uppercase text-[#8954c2]">
              <span>Conteúdo do Guia</span>
              <span className="bg-gold/10 text-gold-bright border border-gold/30 px-2 py-0.5 rounded-full text-[8.5px] font-extrabold">
                Acesso Imediato
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}

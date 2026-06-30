"use client";

import { useState } from "react";
import { useChecklistState } from "@/lib/checklist-store";
import { checklistGroups } from "@/lib/content/checklists";
import { Award, Volume2, Crown, Brain, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type BadgeItem = {
  id: string;
  name: string;
  fullName: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  gradient: string;
  iconColor: string;
};

const badges: BadgeItem[] = [
  {
    id: "preparacao",
    name: "Ritual",
    fullName: "Ritual Iniciático",
    description: "Dominou as práticas de preparação imediata antes de falar.",
    icon: Award,
    gradient: "linear-gradient(135deg, #ecd37a 0%, #c9a227 50%, #8a6a1c 100%)",
    iconColor: "text-gold-bright",
  },
  {
    id: "voz-articulacao",
    name: "Voz",
    fullName: "Voz de Veludo",
    description: "Dominou a modulação, tom, ritmo e pausas de impacto.",
    icon: Volume2,
    gradient: "linear-gradient(135deg, #8954c2 0%, #5c2d91 50%, #4a2574 100%)",
    iconColor: "text-orchid",
  },
  {
    id: "corpo",
    name: "Corporal",
    fullName: "Expressão Corporal",
    description: "Dominou a comunicação não-verbal, gestos e contato visual.",
    icon: Sparkles,
    gradient: "linear-gradient(135deg, #ecd37a 0%, #b08a1c 50%, #6e5314 100%)",
    iconColor: "text-gold-champagne",
  },
  {
    id: "ambientes",
    name: "Palco",
    fullName: "Rainha do Palco",
    description: "Dominou o controle de reuniões, vídeos e conversas difíceis.",
    icon: Crown,
    gradient: "linear-gradient(135deg, #ecd37a 0%, #c9a227 50%, #8a6a1c 100%)",
    iconColor: "text-gold-bright",
  },
  {
    id: "emocional",
    name: "Blindagem",
    fullName: "Mente Blindada",
    description: "Dominou o autocontrole emocional e assertividade linguística.",
    icon: Brain,
    gradient: "linear-gradient(135deg, #c7556b 0%, #a83e52 50%, #7c2637 100%)",
    iconColor: "text-[#c7556b]",
  },
];

export function AchievementsPanel() {
  const checked = useChecklistState();
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem | null>(null);

  // Badge calculations
  const badgeStats = badges.map((badge) => {
    const group = checklistGroups.find((g) => g.id === badge.id);
    const total = group ? group.items.length : 0;
    const completed = group ? group.items.filter((item) => checked[item.id]).length : 0;
    const badgePct = total ? Math.round((completed / total) * 100) : 0;
    const isUnlocked = badgePct >= 50;

    return {
      ...badge,
      total,
      completed,
      pct: badgePct,
      isUnlocked,
    };
  });

  return (
    <div className="space-y-3">
      {/* Tag Sólida de Seção */}
      <div className="flex">
        <span className="bg-[#5c2d91] text-white text-[9.5px] font-extrabold tracking-[0.2em] uppercase px-3 py-1 rounded-md border-l-4 border-gold shadow-sm">
          Painel de Insígnias
        </span>
      </div>

      {/* Card Principal (Glassmorphism) */}
      <div className="rounded-[24px] bg-card/90 p-4.5 shadow-premium backdrop-blur-xl relative overflow-hidden">
        <h4 className="font-display text-[13px] font-bold text-foreground tracking-wide flex items-center gap-1.5 px-0.5">
          <Award className="size-4.5 text-gold-bright" />
          <span>Suas Conquistas</span>
        </h4>
        <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug px-0.5">
          Conclua 50% das práticas de uma área para acender e desbloquear sua insígnia de poder.
        </p>

        {/* Grid de Ícones de Insígnias */}
        <div className="grid grid-cols-5 gap-2 mt-4 relative z-10">
          {badgeStats.map((b) => {
            const BadgeIcon = b.icon;
            const active = selectedBadge?.id === b.id;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setSelectedBadge(active ? null : b)}
                className="flex flex-col items-center gap-1.5 focus:outline-none group relative cursor-pointer"
              >
                <div
                  className={cn(
                    "size-11 sm:size-12 rounded-full flex items-center justify-center transition-all duration-500 relative border",
                    b.isUnlocked
                      ? "shadow-md shadow-gold/15 border-gold/30 hover:scale-105 active:scale-95"
                      : "border-purple-200/10 bg-secondary/30 opacity-55 filter grayscale scale-95"
                  )}
                  style={{
                    background: b.isUnlocked ? b.gradient : "transparent",
                  }}
                >
                  <BadgeIcon
                    className={cn(
                      "size-5 transition-transform duration-300",
                      b.isUnlocked ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  
                  {/* Micro Porcentagem */}
                  <div className="absolute -bottom-1 -right-1 flex size-4.5 items-center justify-center rounded-full bg-card border border-purple-100/10 text-[8px] font-extrabold text-foreground shadow-xs">
                    {b.pct}%
                  </div>
                </div>
                <span className="text-[9.5px] font-bold text-muted-foreground group-hover:text-foreground transition-colors truncate max-w-full">
                  {b.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detalhe da Insígnia Selecionada */}
        <AnimatePresence>
          {selectedBadge && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden mt-3.5 relative z-10"
            >
              {(() => {
                const stat = badgeStats.find((s) => s.id === selectedBadge.id)!;
                return (
                  <div className="p-3.5 rounded-2xl bg-secondary/60 border border-purple-200/20 flex gap-3 items-start animate-fade-in-up">
                    <span className={cn(
                      "flex size-9.5 shrink-0 items-center justify-center rounded-xl bg-card border border-purple-200/10 shadow-xs",
                      stat.isUnlocked ? stat.iconColor : "text-muted-foreground"
                    )}>
                      <selectedBadge.icon className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h5 className="font-display text-xs font-bold text-foreground">
                          {selectedBadge.fullName}
                        </h5>
                        <span className={cn(
                          "text-[8.5px] font-extrabold uppercase tracking-widest",
                          stat.isUnlocked ? "text-gold-bright" : "text-muted-foreground"
                        )}>
                          {stat.isUnlocked ? "Desbloqueada" : "Bloqueada"}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                        {selectedBadge.description}
                      </p>
                      <div className="mt-2.5 flex items-center justify-between text-[10px]">
                        <span className="text-muted-foreground font-semibold">
                          Práticas concluídas: {stat.completed}/{stat.total}
                        </span>
                        <span className="font-extrabold text-foreground">{stat.pct}%</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

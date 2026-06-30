"use client";

import { useState } from "react";
import { useChecklistState, toggleItem } from "@/lib/checklist-store";
import { allChecklistItemIds, getChecklistItemById } from "@/lib/content/checklists";
import { Check, Sparkles, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

function getDailyChallengeId(ids: string[]): string {
  if (ids.length === 0) return "";
  const d = new Date();
  const dateStr = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = dateStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % ids.length;
  return ids[index];
}

export function DailyRitual() {
  const checked = useChecklistState();
  const [expanded, setExpanded] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const dailyId = getDailyChallengeId(allChecklistItemIds);
  const challenge = getChecklistItemById(dailyId);
  const isChallengeDone = !!checked[dailyId];

  const handleToggleChallenge = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newValue = !isChallengeDone;
    toggleItem(dailyId);
    
    if (newValue) {
      // Spawn particles
      const newParticles = Array.from({ length: 18 }).map((_, i) => ({
        id: Math.random(),
        x: Math.random() * 120 - 60,
        y: Math.random() * 100 - 80,
      }));
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 1300);

      toast.success("Excelente! Prática de ritual concluída. 🔥", {
        description: "Mais um degrau conquistado na sua trilha magnética!",
        duration: 3000,
      });
    }
  };

  if (!challenge) return null;

  return (
    <div className="space-y-3 relative">
      {/* Tag Sólida de Identificação de Bloco */}
      <div className="flex">
        <span className="bg-[#5c2d91] text-white text-[9.5px] font-extrabold tracking-[0.2em] uppercase px-3 py-1 rounded-md border-l-4 border-gold shadow-sm">
          Ritual Diário
        </span>
      </div>

      {/* Card Principal */}
      <div 
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "rounded-[24px] transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md relative",
          isChallengeDone 
            ? "border border-emerald-500/25 bg-emerald-500/[0.03] shadow-md shadow-emerald-500/5" 
            : "bg-gradient-to-br from-card/90 to-secondary/40 shadow-premium"
        )}
      >
        {/* Sparkles Particle Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-20">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute size-2 rounded-full bg-gold-gradient"
              initial={{ scale: 0.2, x: 0, y: 30, opacity: 1 }}
              animate={{
                x: p.x,
                y: p.y,
                scale: [0.2, 1.2, 0.4, 0],
                opacity: [1, 1, 0.8, 0]
              }}
              transition={{
                duration: 1.2,
                ease: [0.1, 0.8, 0.2, 1]
              }}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 p-4.5 select-none relative z-10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative">
              <span className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-xl shadow-xs transition-colors",
                isChallengeDone 
                  ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/25" 
                  : "bg-gold/10 text-gold-bright border border-gold/15"
              )}>
                <Sparkles className={cn("size-4.5", isChallengeDone ? "text-emerald-600" : "text-gold-bright animate-pulse-glow")} />
              </span>
              {!isChallengeDone && (
                <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-gold animate-pulse-gold" />
              )}
              {isChallengeDone && (
                <span className="absolute -top-1 -right-1 flex size-3.5 items-center justify-center rounded-full bg-emerald-500 text-white border border-card">
                  <Check className="size-2" strokeWidth={3} />
                </span>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="eyebrow !text-[8px] block tracking-wider text-secondary-foreground font-bold uppercase">Foco Diário</span>
                {/* Time Indicator Capsule (Inspirado no design de referência) */}
                <span className="inline-flex items-center gap-0.5 rounded-full bg-gold/10 border border-gold/30 px-1.5 py-0.2 text-[8px] font-bold text-gold-bright">
                  ⏱️ 60 Seg
                </span>
              </div>
              <h4 className="font-display text-[14px] font-bold text-foreground truncate leading-tight mt-0.5">
                {challenge.item.title}
              </h4>
            </div>
          </div>
          
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary/80 border border-purple-200/10 text-muted-foreground transition-colors hover:text-foreground">
            <ChevronDown 
              className={cn(
                "size-4 transition-transform duration-300",
                expanded && "rotate-180"
              )} 
            />
          </span>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden relative z-10"
            >
              <div className="border-t border-purple-200/20 bg-card/50 p-4.5 space-y-4">
                <p className="text-[12px] leading-relaxed text-muted-foreground">
                  {challenge.item.detail || "Pratique este pilar hoje para reforçar seu magnetismo vocal e expressão corporal."}
                </p>
                
                <div className="flex items-center justify-between gap-3 pt-1">
                  <span className="text-[9.5px] font-extrabold text-secondary-foreground bg-secondary px-3 py-1 rounded-full border border-purple-200/20 uppercase tracking-wide">
                    {challenge.group.pillar === "voz" ? "Pilar I · Voz" : "Pilar IV · Liderança"}
                  </span>
                  
                  <button
                    type="button"
                    onClick={handleToggleChallenge}
                    className={cn(
                      "flex items-center gap-1.5 rounded-xl py-2 px-3 text-[11px] font-extrabold transition-all duration-300 active:scale-[0.98] border shadow-xs cursor-pointer",
                      isChallengeDone
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600"
                        : "bg-gold-gradient text-primary-foreground border-gold-champagne/30 hover:shadow-md hover:shadow-gold/5"
                    )}
                  >
                    {isChallengeDone ? (
                      <>
                        <Check className="size-3.5" strokeWidth={3} />
                        <span>Concluído</span>
                      </>
                    ) : (
                      <span>Marcar como Praticado</span>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

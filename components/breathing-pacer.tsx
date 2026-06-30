"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { breathingPacer } from "@/lib/content/vocal-care";
import { X, Play, Square, RefreshCcw, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

const CYCLE = breathingPacer.inhaleSec + breathingPacer.holdSec + breathingPacer.exhaleSec;

export function BreathingPacer() {
  const [modalOpen, setModalOpen] = useState(false);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number | null>(null);
  const accumulatedRef = useRef<number>(0);

  // Sync Timer
  useEffect(() => {
    if (!running) {
      if (startRef.current) {
        accumulatedRef.current += (Date.now() - startRef.current) / 1000;
        startRef.current = null;
      }
      return;
    }
    
    startRef.current = Date.now();
    const id = setInterval(() => {
      if (startRef.current) {
        setElapsed(accumulatedRef.current + (Date.now() - startRef.current) / 1000);
      }
    }, 100);
    
    return () => clearInterval(id);
  }, [running]);

  const resetTimer = () => {
    running && setRunning(false);
    startRef.current = null;
    accumulatedRef.current = 0;
    setElapsed(0);
  };

  const handleCloseModal = () => {
    resetTimer();
    setModalOpen(false);
  };

  // Phase Calculation
  const phaseTime = elapsed % CYCLE;
  let phase: "Inspire" | "Segure" | "Solte" = "Inspire";
  let phaseSecondsLeft = breathingPacer.inhaleSec;
  let progressPct = 0;
  let fillHeight = 0; // percentage height for liquid fill (subia, segurava, descia)

  if (phaseTime < breathingPacer.inhaleSec) {
    phase = "Inspire";
    phaseSecondsLeft = Math.ceil(breathingPacer.inhaleSec - phaseTime);
    progressPct = (phaseTime / breathingPacer.inhaleSec) * 100;
    fillHeight = progressPct; // rises 0 to 100
  } else if (phaseTime < breathingPacer.inhaleSec + breathingPacer.holdSec) {
    phase = "Segure";
    const subTime = phaseTime - breathingPacer.inhaleSec;
    phaseSecondsLeft = Math.ceil(breathingPacer.holdSec - subTime);
    progressPct = (subTime / breathingPacer.holdSec) * 100;
    fillHeight = 100; // holds at 100
  } else {
    phase = "Solte";
    const subTime = phaseTime - (breathingPacer.inhaleSec + breathingPacer.holdSec);
    phaseSecondsLeft = Math.ceil(breathingPacer.exhaleSec - subTime);
    progressPct = (subTime / breathingPacer.exhaleSec) * 100;
    fillHeight = 100 - progressPct; // drains 100 to 0
  }

  const cycleCount = Math.floor(elapsed / CYCLE) + 1;
  const isTargetAchieved = cycleCount > 3;

  // Guidelines per phase
  const phaseGuidelines = {
    Inspire: "Inspire lentamente pelo nariz, preenchendo o diafragma e subindo o ar.",
    Segure: "Mantenha o ar nos pulmões, estabilizando e ancorando sua postura física.",
    Solte: "Solte o ar suavemente pela boca, sustentando o apoio vocal com firmeza.",
  };

  // Countdown timer circle
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPct / 100) * circumference;

  return (
    <>
      {/* Card da Home de Gatilho do Exercício */}
      <div 
        onClick={() => setModalOpen(true)}
        className="rounded-[24px] bg-card/85 backdrop-blur-md p-5.5 shadow-premium flex flex-col gap-4 active:scale-[0.99] transition-all duration-300 cursor-pointer"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-gold/10 border border-gold/20 text-gold-bright">
                <Wind className="size-5" />
              </span>
              <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-gold animate-pulse-gold" />
            </div>
            <div>
              <span className="bg-[#5c2d91] text-white text-[8px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded shadow-xs">
                Sopro Soberano
              </span>
              <h3 className="font-display text-[15.5px] font-extrabold leading-tight text-[#1c0d2b] mt-1">
                Ritual de Respiração 4-4-6
              </h3>
            </div>
          </div>
          <span className="text-[9.5px] font-extrabold text-primary-foreground bg-gold-gradient px-3 py-1.5 rounded-xl shrink-0 border border-gold-champagne/30 animate-pulse-glow shadow-xs shadow-gold/10">
            Toque para Iniciar
          </span>
        </div>
        <p className="text-[11.5px] leading-relaxed text-muted-foreground">
          Sustente o apoio respiratório e controle a ansiedade antes de se comunicar. 👉 Toque em qualquer lugar do card para abrir o pacer.
        </p>
      </div>

      {/* Janela Pop-up Exclusiva de Respiração (Fundo Roxo Luxuoso) */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-gradient-to-b from-[#180829] via-[#0d0319] to-[#06010c] p-6 text-white max-w-md mx-auto overflow-hidden shadow-2xl rounded-none sm:rounded-[36px]"
          >
            {/* Esferas de Brilho de Fundo Ambientais (Design Premium) */}
            <div className="absolute top-1/4 left-1/4 size-72 rounded-full bg-[#5c2d91]/15 blur-[80px] pointer-events-none animate-pulse-glow" />
            <div className="absolute bottom-1/4 right-1/4 size-80 rounded-full bg-gold/10 blur-[90px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

            {/* Header com Fechar */}
            <div className="flex items-center justify-between w-full relative z-10 pt-4">
              <div>
                <p className="eyebrow !text-gold-champagne tracking-[0.25em] font-extrabold text-[9px] uppercase">
                  Preparação de Apoio
                </p>
                <h2 className="font-display text-xl font-extrabold text-white mt-0.5">
                  Sopro Soberano
                </h2>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="flex size-9 items-center justify-center rounded-full border border-purple-200/15 bg-white/5 text-purple-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="size-4.5" />
              </button>
            </div>

            {/* Medidor Central de Respiração com Animação Líquida */}
            <div className="flex flex-col items-center justify-center my-auto py-8 relative z-10">
              <div className="relative flex size-52 items-center justify-center">
                
                {/* SVG do Anel Circular do Timer */}
                <svg className="absolute inset-0 size-full -rotate-90 z-20" viewBox="0 0 160 160">
                  <circle
                    className="stroke-purple-900/35"
                    strokeWidth="3.5"
                    fill="transparent"
                    r={radius}
                    cx="80"
                    cy="80"
                  />
                  {running && (
                    <circle
                      className="stroke-gold transition-[stroke-dashoffset] duration-100 ease-linear"
                      strokeWidth="5"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                      r={radius}
                      cx="80"
                      cy="80"
                    />
                  )}
                </svg>

                {/* Bulbo de Vidro Central (Animação Líquida - Sobe, Segura, Desce) */}
                <div className="absolute inset-4.5 rounded-full overflow-hidden border border-purple-200/15 bg-purple-950/45 backdrop-blur-md z-10 flex flex-col items-center justify-center shadow-xl">
                  {/* Fluido Líquido de Ouro (Animação Vertical Reativa) */}
                  <motion.div
                    className={cn(
                      "absolute bottom-0 inset-x-0 bg-gold-gradient transition-colors duration-700",
                      running && phase === "Segure" ? "opacity-35" : "opacity-25"
                    )}
                    animate={{ height: running ? `${fillHeight}%` : "0%" }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />

                  {/* Detalhes de Conteúdo Centrais */}
                  <div className="relative z-20 flex flex-col items-center justify-center">
                    <span className="eyebrow !text-gold-champagne font-extrabold tracking-[0.25em] text-[9px] uppercase">
                      {running ? phase : "Pronto"}
                    </span>
                    <h3 className="font-display text-4xl font-extrabold text-white mt-1">
                      {running ? `${phaseSecondsLeft}s` : "4-4-6"}
                    </h3>
                  </div>
                </div>

                {/* Efeito Halo Externo Pulsante */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-gold/15 pointer-events-none"
                  animate={{
                    scale: running ? (phase === "Inspire" ? [1, 1.2, 1.2, 1] : 1.1) : 1,
                    opacity: running ? (phase === "Segure" ? 0.8 : 0.3) : 0.1,
                  }}
                  transition={{
                    duration: CYCLE,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Bloco de Guideline Reativo */}
              <div className="mt-8 max-w-xs text-center min-h-[64px] px-4 flex items-center justify-center bg-white/[0.04] border border-purple-200/10 rounded-2xl p-4.5 shadow-sm">
                <p className="text-xs leading-relaxed text-purple-200">
                  {running ? phaseGuidelines[phase] : "Toque em iniciar para harmonizar sua respiração de apoio e dar estabilidade à sua fala."}
                </p>
              </div>
            </div>

            {/* Painel Inferior: Marcador de Ciclos e Botões */}
            <div className="w-full space-y-6 pb-6 relative z-10">
              {/* Marcador de Ciclos Concluídos */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((step) => {
                    const achieved = cycleCount > step;
                    const active = running && cycleCount === step;
                    return (
                      <div
                        key={step}
                        className={cn(
                          "size-3 rounded-full border transition-all duration-500",
                          achieved ? "bg-gold border-gold scale-110 shadow-sm" : 
                          active ? "bg-purple-600 border-gold/60 animate-pulse scale-105" : 
                          "border-purple-200/25 bg-purple-950"
                        )}
                      />
                    );
                  })}
                </div>
                
                <p className="text-[11.5px] font-bold text-gold-champagne tracking-wide">
                  {isTargetAchieved ? (
                    <span className="text-emerald-400">✨ Suporte diafragmático ativado! Meta concluída.</span>
                  ) : running ? (
                    `Ciclo ${cycleCount} de 3`
                  ) : (
                    "Recomendado: 3 ciclos de estabilização"
                  )}
                </p>
              </div>

              {/* Botões de Comando */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={resetTimer}
                  className="flex size-11.5 items-center justify-center rounded-2xl border border-purple-200/20 bg-white/5 text-purple-200 hover:text-white active:scale-95 transition-all cursor-pointer"
                  title="Reiniciar"
                >
                  <RefreshCcw className="size-4.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setRunning((r) => !r)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-extrabold tracking-widest uppercase active:scale-[0.98] transition-all cursor-pointer border shadow-sm",
                    running 
                      ? "bg-purple-900/35 border-purple-200/20 text-purple-200" 
                      : "bg-gold-gradient border-gold-champagne/30 text-primary-foreground shadow-gold/10"
                  )}
                >
                  {running ? (
                    <>
                      <Square className="size-3.5 fill-current" />
                      <span>Pausar</span>
                    </>
                  ) : (
                    <>
                      <Play className="size-3.5 fill-current" />
                      <span>Iniciar Ritual</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

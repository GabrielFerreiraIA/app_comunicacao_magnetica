"use client";

import { useState } from "react";
import { Lock, Unlock, Sparkles, CheckCircle2, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mentoriaWhatsappLink, mentoriaCustomMessage } from "@/lib/config";

export function MentoriaDialogContent({ onClose }: { onClose?: () => void }) {
  const handleApply = () => {
    window.open(mentoriaWhatsappLink(mentoriaCustomMessage), "_blank", "noopener,noreferrer");
    if (onClose) onClose();
  };

  return (
    <DialogContent className="max-w-md p-6 bg-card border border-gold/30 rounded-3xl shadow-2xl overflow-hidden relative">
      {/* Glow Effects inside Dialog */}
      <div className="absolute -top-24 -right-24 size-48 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 size-48 rounded-full bg-purple-900/15 blur-3xl pointer-events-none" />

      <DialogHeader className="text-center pb-2.5">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-gold-gradient text-primary-foreground shadow-md shadow-gold/20 mb-3.5">
          <Sparkles className="size-5.5 fill-current text-gold-champagne animate-pulse-glow" />
        </div>
        <DialogTitle className="font-display text-[22px] font-extrabold text-[#1c0d2b] leading-tight">
          Mentoria Individual Premium
        </DialogTitle>
        <DialogDescription className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto mt-1.5">
          Acelere seu posicionamento e domine sua comunicação magnética com o direcionamento estratégico direto da Hélia Gonçalves.
        </DialogDescription>
      </DialogHeader>

      {/* Benefits list */}
      <div className="space-y-3.5 py-4 border-t border-purple-200/15">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="size-5 text-gold-bright shrink-0 mt-0.5" />
          <div className="text-left">
            <p className="text-[13px] font-extrabold text-[#1c0d2b]">Acompanhamento Personalizado</p>
            <p className="text-[11.5px] text-muted-foreground leading-relaxed mt-0.5">
              3 meses de feedback cirúrgico direto da Hélia sobre sua postura, voz, arquétipos e imagem pessoal de negócios.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle2 className="size-5 text-gold-bright shrink-0 mt-0.5" />
          <div className="text-left">
            <p className="text-[13px] font-extrabold text-[#1c0d2b]">Aceleração de Resultados</p>
            <p className="text-[11.5px] text-muted-foreground leading-relaxed mt-0.5">
              Um plano de ação prático e sob medida desenhado especificamente para o seu mercado e seus objetivos profissionais de faturamento.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle2 className="size-5 text-gold-bright shrink-0 mt-0.5" />
          <div className="text-left">
            <p className="text-[13px] font-extrabold text-[#1c0d2b]">Análise Sem Filtro de Materiais</p>
            <p className="text-[11.5px] text-muted-foreground leading-relaxed mt-0.5">
              Feedback direto dos seus vídeos, palestras, reuniões importantes ou discursos de vendas antes de ir ao ar.
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-4 border-t border-purple-200/15 flex flex-col gap-3">
        <button
          type="button"
          onClick={handleApply}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gold-gradient py-3 text-sm font-bold text-primary-foreground shadow-md transition-all active:scale-[0.98] cursor-pointer hover:shadow-lg"
        >
          <MessageCircle className="size-4" />
          Aplicar para Mentoria
        </button>
        
        <p className="text-[10px] text-center text-muted-foreground leading-snug">
          Ao clicar, você será direcionado para o WhatsApp da Hélia para iniciar a sua entrevista de aplicação.
        </p>
      </div>
    </DialogContent>
  );
}

export function MentoriaCta({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            type="button"
            className="w-full text-left rounded-[28px] border border-gold/35 bg-gradient-to-br from-gold/5 via-card/75 to-purple-950/[0.02] backdrop-blur-xl p-5 shadow-md transition-all duration-300 hover:border-gold/60 hover:scale-[1.01] active:scale-[0.99] relative overflow-hidden group cursor-pointer"
          />
        }
      >
        {/* Background subtle shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />

        {/* Locked Badge at top */}
        <div className="flex items-center gap-1.5 bg-gold/10 border border-gold/30 text-gold-bright text-[8.5px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full w-fit">
          <Lock className="size-3" />
          <span>VIP · Conteúdo Bloqueado</span>
        </div>

        <div className="mt-4 flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-[18px] font-extrabold leading-tight text-[#1c0d2b]">
              Mentoria Hélia Gonçalves
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground pr-4">
              Destrave o seu acompanhamento personalizado de comunicação intencional. Acelere seus
              resultados profissionais guiado diretamente pela Hélia.
            </p>
          </div>
          
          {/* Big locked visual representation */}
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-secondary border border-purple-200/20 text-gold-bright shadow-inner relative">
            <Lock className="size-6 text-gold/80 group-hover:scale-95 transition-transform" />
            <span className="absolute -top-1 -right-1 flex size-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold/40 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
            </span>
          </span>
        </div>

        {/* Unlock call to action */}
        <div className="mt-4.5 border-t border-purple-200/10 pt-4 flex items-center justify-between gap-3">
          <span className="text-[10px] text-muted-foreground font-bold tracking-wider uppercase">
            Aplicação individual requerida
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-gradient px-4.5 py-2 text-xs font-bold text-primary-foreground shadow-md transition-transform group-hover:-translate-y-0.5 active:translate-y-0">
            <Unlock className="size-3.5" />
            Desbloquear Mentoria
          </span>
        </div>
      </DialogTrigger>

      <MentoriaDialogContent onClose={() => setOpen(false)} />
    </Dialog>
  );
}

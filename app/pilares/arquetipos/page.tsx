"use client";

import Link from "next/link";
import { ChevronRight, Compass, LayoutGrid, Shield, Handshake, Flame } from "lucide-react";
import { WhatsappCta } from "@/components/whatsapp-cta";
import { ArchetypeResultsPanel } from "@/components/archetype-results-panel";
import { archetypes, quadrants } from "@/lib/content/archetypes";
import { ArchetypeIcon } from "@/components/archetype-icon";
import { arquetipoMessage } from "@/lib/config";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const quadrantIcon: Record<string, typeof Compass> = {
  controle: Shield,
  comunidade: Handshake,
  independencia: Compass,
  risco: Flame,
};

export default function ArquetiposPage() {
  return (
    <div className="space-y-6 pt-2">
      {/* Intro Description */}
      <ScrollReveal>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Os 12 arquétipos da comunicação intencional. Escolha uma atividade abaixo: descubra o seu
          perfil no diagnóstico ou explore a galeria completa.
        </p>
      </ScrollReveal>

      {/* Resultado do diagnóstico, se já houver */}
      <ScrollReveal delay={0.04}>
        <ArchetypeResultsPanel compact />
      </ScrollReveal>

      {/* As 4 motivações humanas — atalho direto para a galeria já filtrada */}
      <ScrollReveal delay={0.06}>
        <p className="eyebrow !text-[8.5px] text-secondary-foreground font-bold tracking-widest px-0.5">
          As 4 Grandes Motivações Humanas
        </p>
        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          {quadrants.map((q) => {
            const Icon = quadrantIcon[q.id] ?? Compass;
            const members = archetypes.filter((a) => a.quadrant === q.title);
            return (
              <Link
                key={q.id}
                href={`/pilares/arquetipos/galeria?q=${q.id}`}
                className="flex flex-col gap-2 rounded-[20px] border border-purple-200/25 bg-card/65 backdrop-blur-md p-3.5 shadow-xs transition-all duration-300 hover:border-gold/35 active:scale-[0.98]"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-secondary text-orchid">
                  <Icon className="size-3.5" />
                </span>
                <span className="font-display text-[12.5px] font-bold leading-tight text-[#1c0d2b]">
                  {q.title}
                </span>
                <span className="text-[10px] text-muted-foreground leading-snug">{q.focus}</span>
                <span className="flex gap-1">
                  {members.map((m) => (
                    <ArchetypeIcon key={m.id} archetype={m} size="sm" />
                  ))}
                </span>
              </Link>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Atividade 1 — Diagnóstico */}
      <ScrollReveal delay={0.08}>
        <Link
          href="/pilares/arquetipos/diagnostico"
          className="group flex items-center gap-4 rounded-[28px] border border-gold/35 bg-card/65 backdrop-blur-xl p-5 shadow-sm transition-all duration-300 active:scale-[0.98] glass-card-glow"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gold-gradient text-primary-foreground shadow-md shadow-gold/20">
            <Compass className="size-5.5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="bg-[#5c2d91] text-white text-[8px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded shadow-xs">
              Atividade Exclusiva
            </span>
            <span className="block font-display text-[16px] font-extrabold leading-tight text-[#1c0d2b] mt-1">
              Diagnóstico de Arquétipos
            </span>
            <span className="block text-[11.5px] text-muted-foreground leading-relaxed mt-0.5">
              Responda a matriz de 12 arquétipos e descubra seu perfil primário e secundário.
            </span>
          </span>
          <ChevronRight className="size-4 shrink-0 text-gold-bright transition-transform group-hover:translate-x-1" />
        </Link>
      </ScrollReveal>

      {/* Atividade 2 — Galeria */}
      <ScrollReveal delay={0.12}>
        <Link
          href="/pilares/arquetipos/galeria"
          className="group flex items-center gap-4 rounded-[28px] border border-purple-200/25 bg-card/65 backdrop-blur-xl p-5 shadow-sm transition-all duration-300 hover:border-gold/30 active:scale-[0.98]"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-orchid shadow-xs">
            <LayoutGrid className="size-5.5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="bg-[#5c2d91] text-white text-[8px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded shadow-xs">
              Biblioteca de Perfis
            </span>
            <span className="block font-display text-[16px] font-extrabold leading-tight text-[#1c0d2b] mt-1">
              Galeria dos 12 Arquétipos
            </span>
            <span className="block text-[11.5px] text-muted-foreground leading-relaxed mt-0.5">
              Explore os perfis organizados pelas 4 motivações humanas — voz, negócios, estilo e inspirações.
            </span>
          </span>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </Link>
      </ScrollReveal>

      {/* Diagnosis Call to Action */}
      <ScrollReveal delay={0.16}>
        <WhatsappCta
          title="Quer um diagnóstico guiado pela Hélia?"
          description="Receba a leitura personalizada do seu resultado e o plano de aplicação na sua comunicação."
          message={arquetipoMessage}
          cta="Falar com a Hélia"
          className="rounded-[24px] border-gold/35"
        />
      </ScrollReveal>
    </div>
  );
}

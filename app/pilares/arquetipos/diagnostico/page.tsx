"use client";

import { ChevronRight } from "lucide-react";
import {
  archetypes,
  diagnosticPillars,
  diagnosticScale,
} from "@/lib/content/archetypes";
import { diagnosticStatements } from "@/lib/content/archetypes";
import { setArchetypeScore, setQuizStep, useArchetypeQuiz } from "@/lib/archetype-quiz-store";
import { ArchetypeResultsPanel } from "@/components/archetype-results-panel";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

function ScoreRow({
  pillarLabel,
  statement,
  value,
  onChange,
}: {
  pillarLabel: string;
  statement: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-[9.5px] font-extrabold uppercase tracking-widest text-secondary-foreground">{pillarLabel}</p>
      <p className="text-[12.5px] leading-relaxed text-foreground">{statement}</p>
      <div className="grid grid-cols-4 gap-1.5">
        {diagnosticScale.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "rounded-xl border py-2 text-center transition-colors",
              value === opt.value
                ? "border-transparent bg-gold-gradient text-primary-foreground shadow-sm"
                : "border-purple-200/15 bg-secondary/25 text-muted-foreground hover:bg-secondary/40",
            )}
          >
            <span className="block text-sm font-extrabold">{opt.value}</span>
          </button>
        ))}
      </div>
      <p className="text-[9.5px] text-muted-foreground">{diagnosticScale[value].label}</p>
    </div>
  );
}

export default function ArchetypeDiagnosticPage() {
  const { scores, step } = useArchetypeQuiz();
  const total = archetypes.length;
  const finished = step >= total;

  if (finished) {
    return (
      <div className="space-y-6 pt-2">
        <ScrollReveal>
          <p className="eyebrow !text-[9.5px] tracking-[0.22em] text-[#8954c2] font-extrabold uppercase">Resultado</p>
          <h1 className="font-display text-[22px] font-extrabold leading-tight text-[#1c0d2b]">
            Sua Composição <span className="text-gold italic font-medium">Arquetípica</span>
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed pt-1">
            Arquétipo primário (força dominante) e secundário, baseados nas suas respostas.
          </p>
        </ScrollReveal>
        <ArchetypeResultsPanel />
      </div>
    );
  }

  const archetype = archetypes[step];
  const statements = diagnosticStatements(archetype);
  const current = scores[archetype.id] ?? [0, 0, 0, 0];
  const progressPct = Math.round((step / total) * 100);

  return (
    <div className="space-y-6 pt-2">
      <ScrollReveal>
        <p className="eyebrow !text-[9.5px] tracking-[0.22em] text-[#8954c2] font-extrabold uppercase">
          Diagnóstico · {step + 1}/{total}
        </p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary border border-purple-200/10">
          <div
            className="h-full rounded-full bg-gold-gradient transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </ScrollReveal>

      <ScrollReveal className="space-y-5 rounded-[24px] border border-purple-200/25 bg-card/65 backdrop-blur-md p-5 shadow-xs">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold-bright">Arquétipo em avaliação</p>
          <h2 className="font-display text-lg font-bold text-[#1c0d2b]">{archetype.name}</h2>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            Avalie o quanto cada frase representa você — de 0 (não me identifico) a 3 (identificação absoluta).
          </p>
        </div>

        {statements.map((statement, i) => (
          <ScoreRow
            key={diagnosticPillars[i]}
            pillarLabel={diagnosticPillars[i]}
            statement={statement}
            value={current[i]}
            onChange={(v) => setArchetypeScore(archetype.id, i as 0 | 1 | 2 | 3, v)}
          />
        ))}
      </ScrollReveal>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setQuizStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="flex-1 rounded-xl border border-purple-200/20 py-3 text-xs font-bold text-muted-foreground disabled:opacity-30"
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={() => setQuizStep(step + 1)}
          className="flex flex-[2] items-center justify-center gap-1.5 rounded-xl bg-gold-gradient py-3 text-xs font-bold text-primary-foreground shadow-sm active:scale-[0.98]"
        >
          {step === total - 1 ? "Ver resultado" : "Próximo arquétipo"}
          <ChevronRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

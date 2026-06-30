"use client";

import { CopyButton } from "@/components/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { assertiveTriad, charismaTactics, conversationScripts, charismaScenarios } from "@/lib/content/assertiveness";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function CarismaPage() {
  return (
    <div className="space-y-6 pt-2">
      <Tabs defaultValue="triade">
        <TabsList className="w-full">
          <TabsTrigger value="triade" className="text-[10px]">Tríade</TabsTrigger>
          <TabsTrigger value="carisma" className="text-[10px]">Carisma</TabsTrigger>
          <TabsTrigger value="scripts" className="text-[10px]">Scripts</TabsTrigger>
          <TabsTrigger value="vocabulario" className="text-[10px]">Cenários</TabsTrigger>
        </TabsList>

        {/* Tríade da Comunicação */}
        <TabsContent value="triade" className="mt-4">
          <div className="grid gap-3.5">
            {assertiveTriad.map((t, idx) => (
              <ScrollReveal key={t.id} delay={idx * 0.05}>
                <div className="rounded-[24px] border border-purple-200/25 bg-card/65 backdrop-blur-md p-5 shadow-xs hover:border-gold/30 transition-all duration-300">
                  <h3 className="font-display text-[15px] font-bold text-gold-bright">{t.element}</h3>
                  <p className="mt-1 text-xs italic text-gold-deep font-semibold">“{t.question}”</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t.effect}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </TabsContent>

        {/* Carisma Imediato */}
        <TabsContent value="carisma" className="mt-4">
          <ul className="space-y-3.5">
            {charismaTactics.map((c, idx) => (
              <ScrollReveal key={c.id} delay={idx * 0.05}>
                <li className="rounded-[24px] border border-purple-200/25 bg-card/65 backdrop-blur-md p-5 shadow-xs">
                  <p className="text-[14.5px] font-bold text-[#1c0d2b]">{c.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{c.detail}</p>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </TabsContent>

        {/* Scripts de Validação */}
        <TabsContent value="scripts" className="mt-4 space-y-3.5">
          <p className="text-[11.5px] text-muted-foreground leading-relaxed px-0.5">
            Frases prontas para alinhar, validar e abrir conversas. Toque para copiar.
          </p>
          {conversationScripts.map((s, idx) => (
            <ScrollReveal key={s.id} delay={idx * 0.05}>
              <div className="rounded-[24px] border border-purple-200/25 bg-card/65 backdrop-blur-md p-5 shadow-sm hover:border-gold/30 transition-all duration-300 relative overflow-hidden glass-card-glow">
                <p className="eyebrow !text-secondary-foreground !text-[8.5px] font-bold tracking-widest uppercase">{s.scenario}</p>
                <p className="mt-2.5 font-display text-[14px] font-extrabold text-[#1c0d2b] italic">“{s.script}”</p>
                <div className="mt-3.5 flex items-center justify-between gap-3">
                  <p className="text-[10px] text-muted-foreground font-semibold">{s.goal}</p>
                  <CopyButton text={s.script} className="shrink-0 px-3 py-2 text-xs rounded-xl" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </TabsContent>

        {/* Âncoras de Vocabulário Redesenhadas em Cenários Práticos */}
        <TabsContent value="vocabulario" className="mt-4 space-y-5">
          <p className="text-[11.5px] text-muted-foreground leading-relaxed px-0.5">
            Compare os erros comuns de linguagem que minam sua autoridade de fala com as alternativas de alto magnetismo verbal adaptadas a cada situação:
          </p>

          <div className="space-y-4">
            {charismaScenarios.map((s, idx) => (
              <ScrollReveal key={s.id} delay={idx * 0.05}>
                <div className="rounded-[24px] bg-card/85 backdrop-blur-md p-5.5 shadow-premium border border-purple-200/10 space-y-4">
                  {/* Scope Badge & Title */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="bg-secondary text-secondary-foreground border border-purple-200/25 text-[8px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded shadow-xs">
                      {s.scope}
                    </span>
                    <h4 className="font-display text-[14.5px] font-extrabold text-[#1c0d2b]">
                      {s.title}
                    </h4>
                  </div>

                  {/* Red Warning Card (Avoid) */}
                  <div className="rounded-2xl border border-destructive/25 bg-destructive/[0.03] p-4 space-y-2">
                    <p className="text-[9.5px] font-extrabold text-destructive uppercase tracking-widest">❌ Evite falar (Erro Comum)</p>
                    <p className="text-[12.5px] font-semibold text-[#1c0d2b] italic">
                      “{s.commonMistake}”
                    </p>
                    <div className="border-t border-destructive/10 pt-2">
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        <strong className="font-bold text-destructive">Por que é um erro:</strong> {s.whyMistake}
                      </p>
                    </div>
                  </div>

                  {/* Green/Gold Premium Card (Do This) */}
                  <div className="rounded-2xl border border-gold/35 bg-gold/[0.03] p-4 space-y-3 relative overflow-hidden glass-card-glow">
                    <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent pointer-events-none" />
                    
                    <div className="flex items-start justify-between gap-3 relative z-10">
                      <div className="space-y-1">
                        <p className="text-[9.5px] font-extrabold text-gold-bright uppercase tracking-widest">✨ Fale em substituição</p>
                        <p className="font-display text-[14px] font-extrabold italic text-[#1c0d2b] leading-relaxed pr-6 mt-1">
                          “{s.alternative}”
                        </p>
                      </div>
                      <CopyButton text={s.alternative} className="shrink-0 size-8.5 p-0 rounded-xl bg-card border border-purple-200/10 shadow-xs hover:border-gold/30 transition-all flex items-center justify-center cursor-pointer active:scale-90" />
                    </div>

                    <div className="border-t border-gold/15 pt-2.5 relative z-10">
                      <p className="text-[11px] text-gold-deep leading-relaxed font-semibold">
                        💡 {s.benefit}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

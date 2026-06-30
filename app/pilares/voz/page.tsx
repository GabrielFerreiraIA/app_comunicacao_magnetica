"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checklist } from "@/components/checklist";
import { HydrationTracker } from "@/components/hydration-tracker";
import { BreathingPacer } from "@/components/breathing-pacer";
import { PreEventMealCheck } from "@/components/pre-event-meal-check";
import { VocalRestTimer } from "@/components/vocal-rest-timer";
import { VocalRedFlags } from "@/components/vocal-red-flags";
import { vocalSections, vocalPrinciple } from "@/lib/content/vocal-care";
import { groupsByPillar } from "@/lib/content/checklists";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function VozPage() {
  const groups = groupsByPillar("voz");

  return (
    <div className="space-y-6 pt-2">
      {/* Principle Quote Card */}
      <ScrollReveal>
        <p className="rounded-[24px] border border-purple-200/25 bg-secondary/30 p-5 text-center font-display text-base italic text-gold-bright leading-relaxed shadow-xs">
          “{vocalPrinciple}”
        </p>
      </ScrollReveal>

      <Tabs defaultValue="ritual">
        <TabsList className="w-full">
          <TabsTrigger value="ritual" className="text-[10px]">Ritual</TabsTrigger>
          <TabsTrigger value="falar" className="text-[10px]">Antes/Depois</TabsTrigger>
          <TabsTrigger value="guia" className="text-[10px]">Guia</TabsTrigger>
          <TabsTrigger value="alertas" className="text-[10px]">Alertas</TabsTrigger>
          <TabsTrigger value="pratica" className="text-[10px]">Prática</TabsTrigger>
        </TabsList>

        <TabsContent value="ritual" className="mt-4 space-y-4">
          <HydrationTracker />
          <BreathingPacer />
        </TabsContent>

        <TabsContent value="falar" className="mt-4 space-y-4">
          <PreEventMealCheck />
          <VocalRestTimer />
        </TabsContent>

        <TabsContent value="guia" className="mt-4">
          <Accordion className="rounded-[24px] border border-purple-200/25 bg-card/65 backdrop-blur-md px-5 shadow-sm">
            {vocalSections.map((s) => (
              <AccordionItem key={s.id} value={s.id} className="border-purple-200/10">
                <AccordionTrigger className="text-[14px] font-bold text-[#1c0d2b] py-4">
                  {s.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2.5 text-muted-foreground pb-4">
                    {s.points.map((p, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold-gradient" />
                        <span className="text-[12px] leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="alertas" className="mt-4">
          <VocalRedFlags />
        </TabsContent>

        <TabsContent value="pratica" className="mt-4 space-y-6">
          {groups.map((g) => (
            <Checklist key={g.id} group={g} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

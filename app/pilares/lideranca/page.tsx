"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checklist } from "@/components/checklist";
import { groupsByPillar } from "@/lib/content/checklists";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const shortLabel: Record<string, string> = {
  corpo: "Corpo",
  ambientes: "Ambientes",
  emocional: "Emocional",
};

export default function LiderancaPage() {
  const groups = groupsByPillar("lideranca");

  return (
    <div className="space-y-6 pt-2">
      {/* Intro Description */}
      <ScrollReveal>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Presença executiva é corpo, contexto e controle emocional. Marque cada prática conforme você
          a domina — seu progresso alimenta o nível de presença na Home.
        </p>
      </ScrollReveal>

      <Tabs defaultValue={groups[0]?.id}>
        <TabsList className="w-full">
          {groups.map((g) => (
            <TabsTrigger key={g.id} value={g.id} className="text-[11px]">
              {shortLabel[g.id] ?? g.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {groups.map((g) => (
          <TabsContent key={g.id} value={g.id} className="mt-4">
            <Checklist group={g} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

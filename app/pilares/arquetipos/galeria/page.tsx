"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { archetypes, quadrants } from "@/lib/content/archetypes";
import { ArchetypeIcon } from "@/components/archetype-icon";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const shortLabel: Record<string, string> = {
  "Controle e Estabilidade": "Controle",
  "Comunidade e Diversão": "Comunidade",
  "Independência e Realização": "Independência",
  "Risco e Excelência": "Risco",
};

function GaleriaTabs() {
  const searchParams = useSearchParams();
  const initialQuadrant = searchParams.get("q");
  const [activeTab, setActiveTab] = useState(
    quadrants.some((q) => q.id === initialQuadrant) ? (initialQuadrant as string) : quadrants[0].id,
  );

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="w-full">
        {quadrants.map((q) => (
          <TabsTrigger key={q.id} value={q.id} className="text-[10.5px]">
            {shortLabel[q.title] ?? q.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {quadrants.map((q) => {
        const members = archetypes.filter((a) => a.quadrant === q.title);
        return (
          <TabsContent key={q.id} value={q.id} className="mt-4 space-y-3.5">
            <p className="text-[11.5px] leading-relaxed text-muted-foreground px-0.5">{q.focus}</p>
            {members.map((a, idx) => (
              <ScrollReveal key={a.id} delay={idx * 0.05}>
                <Link
                  href={`/pilares/arquetipos/${a.id}`}
                  className="flex items-center gap-3.5 rounded-[24px] border border-purple-200/25 bg-card/65 backdrop-blur-md p-4.5 shadow-xs transition-all duration-300 hover:border-gold/35 active:scale-[0.98]"
                >
                  <ArchetypeIcon archetype={a} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[15px] font-bold text-[#1c0d2b]">{a.name}</span>
                    <span className="block text-[11px] text-muted-foreground leading-snug truncate">{a.alias}</span>
                  </span>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                </Link>
              </ScrollReveal>
            ))}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

export default function ArchetypeGaleriaPage() {
  return (
    <div className="space-y-6 pt-2">
      <ScrollReveal>
        <p className="eyebrow !text-[9.5px] tracking-[0.22em] text-[#8954c2] font-extrabold uppercase">
          12 Arquétipos
        </p>
        <h1 className="font-display text-[22px] font-extrabold leading-tight text-[#1c0d2b]">
          Galeria por <span className="text-gold italic font-medium">Motivação</span>
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed pt-1">
          Os 12 arquétipos organizados nas 4 grandes motivações humanas. Toque em um arquétipo para
          ver a página completa: voz, negócios, estilo, vínculos e inspirações.
        </p>
      </ScrollReveal>

      <Suspense fallback={null}>
        <GaleriaTabs />
      </Suspense>
    </div>
  );
}

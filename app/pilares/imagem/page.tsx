"use client";

import { ColorPalette } from "@/components/color-palette";
import { ColorWheelTool } from "@/components/color-wheel-tool";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { colorGroups, goldenRule, positioningRule } from "@/lib/content/colors";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const shortLabel: Record<string, string> = {
  roda: "Círculo",
  impacto: "Impacto",
  autoridade: "Autoridade",
  conexao: "Conexão",
  neutros: "Neutros",
};

export default function ImagemPage() {
  return (
    <div className="space-y-6 pt-2">
      {/* Regra de Ouro (Glassmorphism + Shimmer) */}
      <ScrollReveal>
        <div className="rounded-[24px] border border-gold/35 bg-card/65 backdrop-blur-md bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(201,162,39,0.14),transparent_55%)] p-6 text-center shadow-sm glass-card-glow">
          <p className="eyebrow !text-gold-bright tracking-widest font-extrabold text-[9px]">A Regra de Ouro</p>
          <p className="mt-2.5 font-display text-[17px] font-extrabold italic leading-relaxed text-[#1c0d2b]">
            “{goldenRule}”
          </p>
          <div className="rule-gold my-4 opacity-45" />
          <p className="text-[12px] leading-relaxed text-muted-foreground">{positioningRule}</p>
        </div>
      </ScrollReveal>

      {/* Roda de Cores e Paletas estratégicas, em abas */}
      <Tabs defaultValue="roda">
        <TabsList className="w-full">
          <TabsTrigger value="roda" className="text-[10px]">Círculo</TabsTrigger>
          {colorGroups.map((g) => (
            <TabsTrigger key={g.id} value={g.id} className="text-[10px]">
              {shortLabel[g.id] ?? g.title}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {/* Roda Cromática Interativa */}
        <TabsContent value="roda" className="mt-4">
          <ColorWheelTool />
        </TabsContent>

        {/* Paletas de Cores Estáticas */}
        {colorGroups.map((g) => (
          <TabsContent key={g.id} value={g.id} className="mt-4">
            <ColorPalette groups={[g]} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

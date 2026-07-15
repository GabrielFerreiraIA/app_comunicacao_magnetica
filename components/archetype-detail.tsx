"use client";

import Link from "next/link";
import { Check, X, TriangleAlert, Link2, Unlink, Quote } from "lucide-react";
import type { Archetype } from "@/lib/content/archetypes";
import { combinationRules, resolveRelations } from "@/lib/content/archetypes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorSwatchChip } from "@/components/color-swatch-chip";
import { LookMockupPlaceholder } from "@/components/look-mockup-placeholder";
import { ArchetypePosesGallery } from "@/components/archetype-poses-gallery";
import { ArchetypeIcon } from "@/components/archetype-icon";
import { getArchetypePoses } from "@/lib/content/archetype-poses";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="eyebrow !text-[8px] !text-muted-foreground font-bold tracking-widest">{label}</p>
      <p className="mt-0.5 text-[13px] leading-snug text-foreground">{value}</p>
    </div>
  );
}

function PhraseList({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "good" | "bad";
}) {
  const isGood = tone === "good";
  return (
    <div
      className={
        isGood
          ? "rounded-[20px] border border-gold/30 bg-gold/5 p-4"
          : "rounded-[20px] border border-destructive/25 bg-destructive/5 p-4"
      }
    >
      <p
        className={
          isGood
            ? "eyebrow !text-gold-bright !text-[8px] font-bold tracking-widest"
            : "eyebrow !text-destructive !text-[8px] font-bold tracking-widest"
        }
      >
        {title}
      </p>
      <ul className="mt-2.5 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            {isGood ? (
              <Check className="mt-0.5 size-3.5 shrink-0 text-gold-bright" />
            ) : (
              <X className="mt-0.5 size-3.5 shrink-0 text-destructive" />
            )}
            <span className="text-[12px] leading-relaxed text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProsConsList({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="space-y-3">
      <div className="rounded-[20px] border border-gold/30 bg-gold/5 p-4">
        <p className="eyebrow !text-gold-bright !text-[8px] font-bold tracking-widest">Vantagens de liderar com esse arquétipo</p>
        <ul className="mt-2.5 space-y-2">
          {pros.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check className="mt-0.5 size-3.5 shrink-0 text-gold-bright" />
              <span className="text-[12px] leading-relaxed text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-[20px] border border-destructive/25 bg-destructive/5 p-4">
        <p className="eyebrow !text-destructive !text-[8px] font-bold tracking-widest">Riscos e cuidados</p>
        <ul className="mt-2.5 space-y-2">
          {cons.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <X className="mt-0.5 size-3.5 shrink-0 text-destructive" />
              <span className="text-[12px] leading-relaxed text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function RelationCard({
  icon,
  title,
  tone,
  relations,
}: {
  icon: React.ReactNode;
  title: string;
  tone: "good" | "bad";
  relations: { archetype: Archetype; why: string }[];
}) {
  const isGood = tone === "good";
  return (
    <div
      className={
        isGood
          ? "rounded-[24px] border border-gold/30 bg-card/65 backdrop-blur-md p-5 shadow-xs"
          : "rounded-[24px] border border-destructive/25 bg-destructive/5 p-5 shadow-xs"
      }
    >
      <div className="flex items-center gap-1.5">
        {icon}
        <p
          className={
            isGood
              ? "eyebrow !text-gold-bright !text-[8.5px] font-bold tracking-widest"
              : "eyebrow !text-destructive !text-[8.5px] font-bold tracking-widest"
          }
        >
          {title}
        </p>
      </div>
      <div className="mt-3 space-y-2.5">
        {relations.map(({ archetype, why }) => (
          <Link
            key={archetype.id}
            href={`/pilares/arquetipos/${archetype.id}`}
            className="flex items-start gap-2.5 rounded-2xl border border-purple-200/15 bg-secondary/25 p-3 transition-colors hover:bg-secondary/45 active:scale-[0.99]"
          >
            <ArchetypeIcon archetype={archetype} size="sm" />
            <span className="min-w-0 flex-1">
              <span className="block text-[12.5px] font-bold text-[#1c0d2b]">{archetype.name}</span>
              <span className="block text-[11px] leading-relaxed text-muted-foreground mt-0.5">{why}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ArchetypeDetail({ archetype: a }: { archetype: Archetype }) {
  const affinities = resolveRelations(a.affinities);
  const tensions = resolveRelations(a.tensions);
  const combo = combinationRules.find((r) => r.archetypeIds.includes(a.id));
  const poses = getArchetypePoses(a.id);

  return (
    <div className="space-y-6 pt-2">
      <ScrollReveal>
        <div className="flex items-center gap-3.5">
          <ArchetypeIcon archetype={a} size="lg" />
          <div className="min-w-0 flex-1">
            <span className="bg-[#5c2d91] text-white text-[9px] font-extrabold tracking-[0.2em] uppercase px-3 py-1 rounded-md border-l-4 border-gold shadow-sm">
              {a.quadrant}
            </span>
            <h1 className="mt-1.5 font-display text-2xl font-extrabold leading-tight text-[#1c0d2b]">{a.name}</h1>
            <p className="mt-0.5 text-[12px] text-muted-foreground leading-relaxed">{a.alias}</p>
          </div>
        </div>
        <p className="mt-3 rounded-2xl border border-purple-200/25 bg-secondary/30 p-4 text-center font-display text-[15px] italic text-gold-bright leading-relaxed shadow-xs">
          “{a.innerPhrase}”
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <Tabs defaultValue="essencia">
          <TabsList className="w-full">
            <TabsTrigger value="essencia" className="text-[9px]">Essência</TabsTrigger>
            <TabsTrigger value="voz" className="text-[9px]">Voz</TabsTrigger>
            <TabsTrigger value="negocios" className="text-[9px]">Negócios</TabsTrigger>
            <TabsTrigger value="estilo" className="text-[9px]">Estilo</TabsTrigger>
            <TabsTrigger value="vinculos" className="text-[9px]">Vínculos</TabsTrigger>
            <TabsTrigger value="inspiracoes" className="text-[9px]">Inspira.</TabsTrigger>
          </TabsList>

          <TabsContent value="essencia" className="mt-4 space-y-4">
            <div className="space-y-3 rounded-[24px] border border-purple-200/25 bg-card/65 backdrop-blur-md p-5 shadow-xs">
              <Field label="Desejo Central" value={a.desire} />
              <Field label="Meta" value={a.goal} />
              <Field label="Medo" value={a.fear} />
              <Field label="Força / Dons" value={a.strength} />
            </div>
            <div className="flex items-start gap-2.5 rounded-[24px] border border-destructive/25 bg-destructive/5 p-4">
              <TriangleAlert className="mt-0.5 size-4 shrink-0 text-destructive" />
              <div>
                <p className="text-[9.5px] font-extrabold uppercase tracking-widest text-destructive">
                  Alerta de Sombra
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-destructive">{a.shadow}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="voz" className="mt-4 space-y-4">
            <div className="space-y-3 rounded-[24px] border border-purple-200/25 bg-card/65 backdrop-blur-md p-5 shadow-xs">
              <Field label="Voz" value={a.voice} />
              <Field label="Linguagem" value={a.language} />
              <Field label="Comunicação" value={a.communication} />
            </div>
            <div className="flex items-center gap-1.5 px-0.5">
              <Quote className="size-3.5 text-muted-foreground" />
              <p className="eyebrow !text-[8.5px] !text-secondary-foreground font-bold tracking-widest">
                Frases que combinam (e que destoam)
              </p>
            </div>
            <PhraseList title="Diga assim" items={a.matchingPhrases} tone="good" />
            <PhraseList title="Evite dizer" items={a.avoidPhrases} tone="bad" />
          </TabsContent>

          <TabsContent value="negocios" className="mt-4 space-y-4">
            <div className="space-y-3 rounded-[24px] border border-purple-200/25 bg-card/65 backdrop-blur-md p-5 shadow-xs">
              <Field label="Em Vendas" value={a.sales} />
              <Field label="Em Liderança" value={a.leadership} />
            </div>
            <div className="rounded-[24px] border border-purple-200/25 bg-card/65 backdrop-blur-md p-5 shadow-xs">
              <p className="eyebrow !text-[8.5px] text-secondary-foreground font-bold tracking-widest">Dicas de Posicionamento</p>
              <ul className="mt-2.5 space-y-2.5">
                {a.positioningTips.map((tip, idx) => (
                  <li key={tip} className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-[10px] font-extrabold text-primary-foreground">
                      {idx + 1}
                    </span>
                    <span className="text-[12px] leading-relaxed text-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ProsConsList pros={a.pros} cons={a.cons} />
          </TabsContent>

          <TabsContent value="estilo" className="mt-4 space-y-4">
            {poses ? (
              <ArchetypePosesGallery poses={poses} archetypeName={a.name} />
            ) : (
              <LookMockupPlaceholder label={`Look ${a.name}`} />
            )}
            <div className="space-y-3 rounded-[24px] border border-purple-200/25 bg-card/65 backdrop-blur-md p-5 shadow-xs">
              <Field label="Peças-Chave" value={a.wardrobe.pieces} />
              <Field label="Acessórios & Linhas" value={a.wardrobe.lines} />
            </div>
            <div className="rounded-[24px] border border-purple-200/25 bg-card/65 backdrop-blur-md p-5 shadow-xs">
              <p className="eyebrow !text-[8px] !text-muted-foreground font-bold tracking-widest">Cores Estratégicas</p>
              <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{a.wardrobe.colors}</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {a.paletteColorIds.map((id) => (
                  <ColorSwatchChip key={id} colorId={id} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vinculos" className="mt-4 space-y-3.5">
            <p className="text-[11.5px] leading-relaxed text-muted-foreground px-0.5">
              Como o {a.name} se comporta ao lado de outros arquétipos — use isso para compor
              combinações de marca, vestuário e discurso.
            </p>
            {combo && (
              <div className="rounded-[24px] border border-gold/35 bg-gold/5 p-5 shadow-xs">
                <p className="eyebrow !text-gold-bright !text-[8.5px] font-bold tracking-widest">Combination Engine</p>
                <p className="mt-1 font-display text-[14px] font-bold text-[#1c0d2b]">{combo.title}</p>
                <p className="mt-2 text-[11.5px] leading-relaxed text-muted-foreground">{combo.action}</p>
                <div className="mt-3 space-y-2">
                  <div className="rounded-xl border border-purple-200/15 bg-secondary/30 p-3">
                    <p className="eyebrow !text-muted-foreground !text-[8px] font-bold tracking-widest">Look sugerido</p>
                    <p className="mt-0.5 text-[11.5px] leading-relaxed text-foreground">{combo.look}</p>
                  </div>
                  <div className="rounded-xl border border-purple-200/15 bg-secondary/30 p-3">
                    <p className="eyebrow !text-muted-foreground !text-[8px] font-bold tracking-widest">Voz</p>
                    <p className="mt-0.5 text-[11.5px] leading-relaxed text-foreground">{combo.voiceTip}</p>
                  </div>
                </div>
              </div>
            )}
            <RelationCard
              icon={<Link2 className="size-3.5 text-gold-bright" />}
              title="Afinidades — combinam bem"
              tone="good"
              relations={affinities}
            />
            <RelationCard
              icon={<Unlink className="size-3.5 text-destructive" />}
              title="Distanciamentos — geram tensão"
              tone="bad"
              relations={tensions}
            />
          </TabsContent>

          <TabsContent value="inspiracoes" className="mt-4 space-y-4">
            <div className="rounded-[24px] border border-purple-200/25 bg-card/65 backdrop-blur-md p-5 shadow-xs">
              <p className="eyebrow !text-[8px] !text-muted-foreground font-bold tracking-widest">Personagens que encarnam {a.name}</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {a.characters.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-purple-200/20 bg-secondary px-3 py-1 text-[11px] font-semibold text-secondary-foreground"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] border border-gold/30 bg-gold/5 p-5 shadow-xs">
              <p className="eyebrow !text-gold-bright !text-[8px] font-bold tracking-widest">Marcas do Arquétipo</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {a.brands.map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-gold/35 bg-card px-3 py-1 text-[11px] font-bold text-gold-bright"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </ScrollReveal>
    </div>
  );
}

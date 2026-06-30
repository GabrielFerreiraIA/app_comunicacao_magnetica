"use client";

import { useState } from "react";
import { colorWheelData } from "@/lib/content/colors-metadata";
import { motion } from "framer-motion";
import { Copy, Check, Info, Award, HelpCircle, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { withAlpha, getReadableTextColor } from "@/lib/color-utils";

type HarmonyType = "complementary" | "analogous" | "triad" | "monochromatic";

const harmonyLabel: Record<HarmonyType, string> = {
  complementary: "Compl.",
  analogous: "Anál.",
  triad: "Tríade",
  monochromatic: "Mono",
};

const harmonyFullLabel: Record<HarmonyType, string> = {
  complementary: "Complementar",
  analogous: "Análoga",
  triad: "Tríade",
  monochromatic: "Monocromática",
};

const harmonyExplanation: Record<HarmonyType, string> = {
  complementary: "Combinação oposta na roda. Oferece o máximo contraste visual e energia de destaque instantâneo. Ideal para acessórios ou pontos focais em looks corporativos.",
  analogous: "Cores vizinhas na roda cromática. Passa uma imagem altamente harmônica, fluida, pacífica e elegante. Excelente para passar sofisticação refinada.",
  triad: "Três cores igualmente espaçadas. Transmite uma imagem dinâmica, criativa e expressiva, ideal para ambientes de trabalho modernos ou início de projetos inovadores.",
  monochromatic: "Variações de tom e saturação de uma mesma cor. Comunica alongamento de silhueta, alta sofisticação executiva e uma imagem de luxo silencioso autoritário.",
};

const WHEEL_CORE = "#130720";

export function ColorWheelTool() {
  const [selectedId, setSelectedId] = useState<string>("vermelho");
  const [harmony, setHarmony] = useState<HarmonyType>("complementary");
  const [copied, setCopied] = useState(false);

  const activeColor = colorWheelData.find((c) => c.id === selectedId) || colorWheelData[0];
  const activeIndex = colorWheelData.findIndex((c) => c.id === selectedId);
  const palette = activeColor.harmonies[harmony];

  // Coordenadas no círculo (centro em 100,100, raio 70). 0deg = topo, sentido horário —
  // mesma convenção do conic-gradient CSS, para os nós caírem exatamente sobre as cores da roda.
  const getCoords = (angle: number, radius = 70) => {
    const angleRad = ((angle - 90) * Math.PI) / 180;
    return {
      x: 100 + radius * Math.cos(angleRad),
      y: 100 + radius * Math.sin(angleRad),
    };
  };

  const wheelGradient = `conic-gradient(${colorWheelData
    .map((c) => `${c.hex} ${c.angle}deg`)
    .join(", ")}, ${colorWheelData[0].hex} 360deg)`;

  const renderHarmonyLines = () => {
    const center = { x: 100, y: 100 };
    const baseCoords = getCoords(activeColor.angle);
    const shadow = { filter: "url(#wheelLineShadow)" };

    if (harmony === "complementary") {
      const compCoords = getCoords(colorWheelData[(activeIndex + 6) % 12].angle);
      return (
        <motion.line
          {...shadow}
          x1={baseCoords.x}
          y1={baseCoords.y}
          x2={compCoords.x}
          y2={compCoords.y}
          stroke="rgba(255, 255, 255, 0.85)"
          strokeWidth="2"
          strokeDasharray="4 3"
          strokeLinecap="round"
          animate={{ x1: baseCoords.x, y1: baseCoords.y, x2: compCoords.x, y2: compCoords.y }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      );
    }

    if (harmony === "analogous") {
      const prevCoords = getCoords(colorWheelData[(activeIndex - 1 + 12) % 12].angle);
      const nextCoords = getCoords(colorWheelData[(activeIndex + 1) % 12].angle);
      return (
        <motion.path
          {...shadow}
          d={`M ${prevCoords.x} ${prevCoords.y} L ${baseCoords.x} ${baseCoords.y} L ${nextCoords.x} ${nextCoords.y}`}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.85)"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{
            d: `M ${prevCoords.x} ${prevCoords.y} L ${baseCoords.x} ${baseCoords.y} L ${nextCoords.x} ${nextCoords.y}`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      );
    }

    if (harmony === "triad") {
      const t1Coords = getCoords(colorWheelData[(activeIndex + 4) % 12].angle);
      const t2Coords = getCoords(colorWheelData[(activeIndex + 8) % 12].angle);
      return (
        <motion.polygon
          {...shadow}
          points={`${baseCoords.x},${baseCoords.y} ${t1Coords.x},${t1Coords.y} ${t2Coords.x},${t2Coords.y}`}
          fill="rgba(255, 255, 255, 0.06)"
          stroke="rgba(255, 255, 255, 0.85)"
          strokeWidth="2"
          strokeLinejoin="round"
          animate={{
            points: `${baseCoords.x},${baseCoords.y} ${t1Coords.x},${t1Coords.y} ${t2Coords.x},${t2Coords.y}`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      );
    }

    return (
      <motion.line
        {...shadow}
        x1={center.x}
        y1={center.y}
        x2={baseCoords.x}
        y2={baseCoords.y}
        stroke="rgba(255, 255, 255, 0.9)"
        strokeWidth="2.5"
        strokeLinecap="round"
        animate={{ x2: baseCoords.x, y2: baseCoords.y }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    );
  };

  const handleCopy = () => {
    const codes = palette.join(" | ");
    navigator.clipboard.writeText(codes);
    setCopied(true);
    toast.success("Paleta copiada com sucesso! ✨", {
      description: `Código copiado: ${codes}`,
      duration: 3000,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySwatch = (hex: string) => {
    navigator.clipboard.writeText(hex);
    toast.success("Cor copiada!", { description: hex, duration: 2000 });
  };

  // Estilo reutilizável dos cartões do dossiê — acento e wash sutil na cor ativa
  const tintedCardStyle = {
    border: `1px solid ${withAlpha(activeColor.hex, 0.22)}`,
    backgroundImage: `radial-gradient(130% 70% at 10% -10%, ${withAlpha(activeColor.hex, 0.1)}, transparent 60%)`,
  };

  const tintedIcon = (Icon: typeof Info) => (
    <span
      className="inline-flex items-center justify-center size-7 rounded-lg shrink-0"
      style={{ background: withAlpha(activeColor.hex, 0.14) }}
    >
      <Icon className="size-4" style={{ color: activeColor.hex }} />
    </span>
  );

  return (
    <div className="space-y-6">
      {/* Círculo Cromático e Controle */}
      <div className="rounded-[24px] bg-card/85 backdrop-blur-md p-5 shadow-premium flex flex-col items-center gap-5 border border-purple-200/10">

        {/* Roda Cromática real (gradiente de matiz contínuo) + nós interativos */}
        <div className="relative w-full max-w-[280px] aspect-square">
          <div
            className="absolute inset-0 rounded-full shadow-inner border border-black/10"
            style={{ background: wheelGradient }}
            aria-hidden
          />
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${WHEEL_CORE} 0%, ${withAlpha(WHEEL_CORE, 0.55)} 38%, transparent 68%)`,
            }}
            aria-hidden
          />

          <svg className="absolute inset-0 size-full" viewBox="0 0 200 200">
            <defs>
              <filter id="wheelLineShadow" x="-60%" y="-60%" width="220%" height="220%">
                <feDropShadow dx="0" dy="0" stdDeviation="1.4" floodColor={WHEEL_CORE} floodOpacity="0.65" />
              </filter>
            </defs>

            <circle cx="100" cy="100" r="70" fill="transparent" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
            <circle cx="100" cy="100" r="45" fill="transparent" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />

            {renderHarmonyLines()}

            {colorWheelData.map((color) => {
              const { x, y } = getCoords(color.angle, 70);
              const isActive = color.id === selectedId;
              return (
                <g key={color.id}>
                  {/* área de toque ampliada, transparente — mantém o nó visual pequeno e elegante */}
                  <circle
                    cx={x}
                    cy={y}
                    r="16"
                    fill="#000"
                    fillOpacity={0}
                    style={{ pointerEvents: "all" }}
                    className="cursor-pointer touch-manipulation"
                    role="button"
                    tabIndex={0}
                    aria-label={`Selecionar ${color.name}`}
                    onClick={() => setSelectedId(color.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setSelectedId(color.id);
                    }}
                  />
                  {isActive && (
                    <motion.circle
                      cx={x}
                      cy={y}
                      r="13"
                      fill="transparent"
                      stroke="rgba(255,255,255,0.55)"
                      strokeWidth="1.5"
                      layoutId="activeWheelSelector"
                    />
                  )}
                  <circle cx={x} cy={y} r="9" fill={color.hex} stroke={WHEEL_CORE} strokeWidth="2.5" pointerEvents="none" />
                  <circle
                    cx={x}
                    cy={y}
                    r="9"
                    fill="none"
                    stroke={isActive ? "#ffffff" : "rgba(255, 255, 255, 0.6)"}
                    strokeWidth={isActive ? "2" : "1.2"}
                    pointerEvents="none"
                  />
                </g>
              );
            })}
          </svg>

          {/* Núcleo central — preview da cor ativa */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="size-12 rounded-full border-2 border-white/25 shadow-lg flex items-center justify-center font-display text-[10px] font-bold uppercase tracking-wider"
              style={{ background: activeColor.hex, color: getReadableTextColor(activeColor.hex) }}
            >
              {activeColor.name.substring(0, 3)}
            </div>
          </div>
        </div>

        {/* Seletor de regra de harmonia */}
        <div className="w-full grid grid-cols-4 gap-1 p-0.5 rounded-full bg-secondary/40 border border-purple-200/5">
          {(Object.keys(harmonyLabel) as HarmonyType[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setHarmony(mode)}
              className={cn(
                "relative rounded-full py-2 text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer select-none touch-manipulation",
                harmony === mode ? "bg-gold-gradient text-primary-foreground shadow-sm" : "text-[#7d6995]/80 hover:text-[#1c0d2b]"
              )}
            >
              {harmonyLabel[mode]}
            </button>
          ))}
        </div>

        {/* Paleta dinâmica resultante */}
        <div className="w-full space-y-3">
          <div className="grid grid-cols-4 gap-2">
            {palette.map((color, idx) => (
              <button
                key={`${harmony}-${idx}`}
                type="button"
                onClick={() => handleCopySwatch(color)}
                className="space-y-1 text-center cursor-pointer active:scale-95 transition-transform touch-manipulation"
                aria-label={`Copiar código ${color}`}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="h-12 rounded-xl border border-purple-200/10 shadow-xs relative overflow-hidden"
                  style={{ background: color }}
                />
                <span className="text-[9px] font-semibold text-muted-foreground block font-mono">{color}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gold-gradient text-primary-foreground border border-gold-champagne/30 py-3 text-xs font-bold uppercase tracking-wider hover:shadow-md hover:shadow-gold/10 active:scale-[0.98] transition-all cursor-pointer touch-manipulation"
          >
            {copied ? (
              <>
                <Check className="size-4" />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="size-4" />
                <span>Copiar Combinação de Cores</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Explicativo da Harmonia Selecionada — tons adaptados à cor ativa */}
      <div className="rounded-[20px] bg-secondary/35 p-4 space-y-1.5 shadow-sm shadow-purple-900/5" style={tintedCardStyle}>
        <h4 className="font-display text-xs font-extrabold text-[#1c0d2b] flex items-center gap-1.5">
          {tintedIcon(HelpCircle)}
          <span>Regra Cromática: {harmonyFullLabel[harmony]}</span>
        </h4>
        <p className="text-[11.5px] leading-relaxed text-muted-foreground">
          {harmonyExplanation[harmony]}
        </p>
      </div>

      {/* Dossiê Estratégico da Cor Base — todo o painel adapta acentos à cor selecionada */}
      <div className="space-y-4">
        <h3
          className="eyebrow !text-[8.5px] tracking-[0.25em] font-extrabold uppercase px-1 flex items-center gap-1.5"
          style={{ color: activeColor.hex }}
        >
          <span className="size-2 rounded-full" style={{ background: activeColor.hex }} aria-hidden />
          Dossiê Estratégico · {activeColor.name}
        </h3>

        {/* Psicologia */}
        <div className="rounded-[24px] bg-card/85 backdrop-blur-md p-5 shadow-premium space-y-2" style={tintedCardStyle}>
          <h4 className="font-display text-xs font-extrabold text-[#1c0d2b] flex items-center gap-2">
            {tintedIcon(Info)}
            <span>Psicologia da Cor (Mensagem Emitida)</span>
          </h4>
          <p className="text-[12px] leading-relaxed text-muted-foreground">
            {activeColor.psychology}
          </p>
        </div>

        {/* Indicado Para */}
        <div className="rounded-[24px] bg-card/85 backdrop-blur-md p-5 shadow-premium space-y-2" style={tintedCardStyle}>
          <h4 className="font-display text-xs font-extrabold text-[#1c0d2b] flex items-center gap-2">
            {tintedIcon(Award)}
            <span>Recomendação de Posicionamento</span>
          </h4>
          <p className="text-[12px] leading-relaxed text-muted-foreground">
            {activeColor.recommendedFor}
          </p>
        </div>

        {/* Marcas de Sucesso */}
        <div className="rounded-[24px] bg-card/85 backdrop-blur-md p-5 shadow-premium space-y-3" style={tintedCardStyle}>
          <h4 className="font-display text-xs font-extrabold text-[#1c0d2b] flex items-center gap-2">
            {tintedIcon(Briefcase)}
            <span>Casos de Marcas Referência (Brand Equity)</span>
          </h4>
          <p className="text-[11.5px] leading-relaxed text-muted-foreground">
            Marcas líderes que utilizam o {activeColor.name} como âncora visual para comunicar seus valores centrais:
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            {activeColor.brands.map((b) => (
              <span
                key={b}
                className="rounded-full px-3 py-1 text-[10.5px] font-bold shadow-xs"
                style={{
                  border: `1px solid ${withAlpha(activeColor.hex, 0.35)}`,
                  background: withAlpha(activeColor.hex, 0.08),
                  color: activeColor.hex,
                }}
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

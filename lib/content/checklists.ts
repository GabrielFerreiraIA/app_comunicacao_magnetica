// Checklists interativos — extraídos de "Checklist de Presença Comunicativa" (Cont 2).
// Cada item tem um `id` ESTÁVEL: é a chave usada no localStorage e no cálculo de progresso.
// NÃO renomear ids existentes (quebraria o progresso já salvo do usuário).

export type ChecklistItem = {
  id: string;
  title: string;
  detail?: string;
};

export type ChecklistGroup = {
  id: string;
  pillar: "voz" | "lideranca";
  title: string;
  intro?: string;
  items: ChecklistItem[];
};

export const checklistGroups: ChecklistGroup[] = [
  {
    id: "preparacao",
    pillar: "voz",
    title: "Preparação imediata",
    intro: "Antes de se comunicar — 60 segundos que mudam sua presença.",
    items: [
      {
        id: "prep-respiracao",
        title: "Respiração diafragmática",
        detail: "3 respirações profundas. Inspira pelo nariz (4s) → segura (4s) → solta pela boca (6s).",
      },
      {
        id: "prep-postura",
        title: "Postura alinhada",
        detail: "Pés firmes, coluna ereta, ombros relaxados, cabeça alinhada. Nada de braços cruzados.",
      },
      {
        id: "prep-aquecimento",
        title: "Aquecimento vocal",
        detail: "Vibração labial (“hummmm” / “brrrrr”) por 30 segundos.",
      },
      {
        id: "prep-intencao",
        title: "Definição de intenção",
        detail: "Responda antes de falar: meu objetivo é informar, convencer ou motivar?",
      },
    ],
  },
  {
    id: "voz-articulacao",
    pillar: "voz",
    title: "Voz, articulação e ritmo",
    items: [
      {
        id: "voz-tom",
        title: "Tom de voz adequado",
        detail: "Tom médio e firme. Evite alto demais (agressivo) ou baixo demais (inseguro). Module a entonação.",
      },
      {
        id: "voz-ritmo",
        title: "Ritmo e pausas estratégicas",
        detail: "Fale pausado. Pequenas pausas após pontos-chave fixam a informação. Falar rápido sinaliza ansiedade.",
      },
      {
        id: "voz-dicionario",
        title: "Dicionário limpo",
        detail: "Elimine “ééé…”, “tipo assim”, “né?”, “entendeu?”. Troque o vício pelo silêncio intencional.",
      },
      {
        id: "voz-energia",
        title: "Energização da fala",
        detail: "Aumente levemente a intensidade nos termos de alta relevância. Evita a monotonia.",
      },
    ],
  },
  {
    id: "corpo",
    pillar: "lideranca",
    title: "Expressão corporal",
    intro: "Comunicação não-verbal — 55% da percepção da sua mensagem.",
    items: [
      {
        id: "corpo-contato",
        title: "Contato visual",
        detail: "Olhe o interlocutor. Em plateias, alterne o olhar entre setores para conectar com todos.",
      },
      {
        id: "corpo-gestos",
        title: "Gestualidade eficaz",
        detail: "Mãos visíveis acima da cintura. Gestos suaves, naturais e congruentes. Evite gestos sem propósito.",
      },
      {
        id: "corpo-antidotos",
        title: "Antídotos de insegurança",
        detail: "Evite mãos no bolso (despreparo), braços cruzados (bloqueio) e mexer no cabelo/roupa (nervosismo).",
      },
      {
        id: "corpo-face",
        title: "Coerência facial",
        detail: "Tema leve → sorriso natural. Tema crítico → semblante firme e focado.",
      },
    ],
  },
  {
    id: "ambientes",
    pillar: "lideranca",
    title: "Dominando ambientes",
    items: [
      {
        id: "amb-reunioes",
        title: "Reuniões e apresentações",
        detail: "Objetividade e clareza. Respire antes de responder (ganho tático). Tom firme e sem pressa.",
      },
      {
        id: "amb-video",
        title: "Vídeos e redes sociais",
        detail: "Postura ereta voltada à câmera. Micro-sorriso antes de iniciar. Grave em trechos curtos.",
      },
      {
        id: "amb-grupo",
        title: "Conversas em grupo",
        detail: "Fale com intenção, sem hesitar. Engaje com perguntas abertas. Não baixe o volume nem peça permissão excessiva.",
      },
      {
        id: "amb-profissional",
        title: "Ambientes profissionais",
        detail: "Cumprimente com firmeza. Apresente-se com uma frase de impacto. Ajuste a postura antes da primeira palavra.",
      },
    ],
  },
  {
    id: "emocional",
    pillar: "lideranca",
    title: "Gerenciamento emocional",
    items: [
      {
        id: "emo-reprogramacao",
        title: "Reprogramação cognitiva",
        detail: "Troque “E se eu errar?” por “E se eu impactar alguém positivamente com o meu conhecimento?”.",
      },
      {
        id: "emo-dessensibilizacao",
        title: "Dessensibilização",
        detail: "Treine no espelho ou gravando áudios. Comece em círculos pequenos (1–3 pessoas) e escale.",
      },
      {
        id: "emo-linguagem",
        title: "Linguagem interna",
        detail: "Evite “Desculpa, posso falar?” → entre direto, com firmeza. “Não sou boa nisso” → “Melhoro a cada dia”.",
      },
    ],
  },
];

export const allChecklistItemIds: string[] = checklistGroups.flatMap((g) =>
  g.items.map((i) => i.id),
);

export const totalChecklistItems = allChecklistItemIds.length;

export function groupsByPillar(pillar: ChecklistGroup["pillar"]): ChecklistGroup[] {
  return checklistGroups.filter((g) => g.pillar === pillar);
}

export function getChecklistItemById(id: string): { item: ChecklistItem; group: ChecklistGroup } | null {
  for (const group of checklistGroups) {
    const item = group.items.find((i) => i.id === id);
    if (item) return { item, group };
  }
  return null;
}

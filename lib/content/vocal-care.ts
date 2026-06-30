// Guia de Cuidados Vocais (Cont 3) — Pilar 1 (Voz). Renderizado em accordions.

export type VocalSection = {
  id: string;
  title: string;
  points: string[];
};

export const vocalPrinciple =
  "Uma voz bem cuidada não apenas comunica — ela posiciona.";

export const vocalSections: VocalSection[] = [
  {
    id: "hidratacao",
    title: "Hidratação e hábitos diários",
    points: [
      "Mínimo de 2 litros de água por dia, preferencialmente em temperatura ambiente.",
      "Evite excesso de cafeína (desidrata o trato vocal).",
      "Evite álcool e tabaco (irritantes diretos das mucosas).",
      "Evite bebidas muito geladas ou muito quentes (choque térmico nas pregas vocais).",
    ],
  },
  {
    id: "comportamento",
    title: "Comportamento vocal e prevenção",
    points: [
      "Não fale por longos períodos sem pausas para descanso.",
      "Evite falar ou cantar durante esforço físico intenso.",
      "Não compita com ruído ambiente elevado.",
      "Evite gritar (alto risco de lesão aguda).",
      "Não pigarreie nem tussa por hábito — troque por pequenos goles de água.",
    ],
  },
  {
    id: "articulacao",
    title: "Articulação e postura física",
    points: [
      "Articule as palavras com precisão para reduzir a fadiga laríngea.",
      "Abra bem a boca ao falar, permitindo a projeção natural do som.",
      "Mantenha a postura ereta, porém relaxada, para o livre fluxo da respiração.",
    ],
  },
  {
    id: "alimentacao",
    title: "Alimentação e impacto na voz",
    points: [
      "Evite leite, chocolate e gorduras antes de usar a voz (aumentam a viscosidade da saliva).",
      "Prefira alimentos leves e adstringentes — a maçã limpa a boca e a faringe.",
      "Cuidado com pastilhas, balas de menta e sprays: o efeito anestésico mascara a fadiga e facilita lesões.",
    ],
  },
  {
    id: "ambiente",
    title: "Ambiente e rotina",
    points: [
      "Reduza a exposição prolongada ao ar-condicionado (resseca as mucosas).",
      "Evite mudanças bruscas de temperatura.",
      "Use roupas confortáveis que não apertem o pescoço nem restrinjam a respiração.",
    ],
  },
];

// --- Rastreador de Hidratação (WPA_WIDGET: HYDRATION_TRACKER) ---
// 8 copos de 250ml ≈ a meta diária de 2 litros.
export const hydrationGoalGlasses = 8;
export const hydrationGlassMl = 250;

// --- Checklist Nutricional Pré-Palestra (WPA_WIDGET: PRE_EVENT_MEAL_CHECK) ---
export type MealCheckItem = {
  id: string;
  label: string;
  type: "alert" | "success";
  note: string;
};

export const preEventMealItems: MealCheckItem[] = [
  {
    id: "leite",
    label: "Leite, chocolate ou derivados",
    type: "alert",
    note: "Gera muco e saliva espessa — evite nas 2h antes de falar.",
  },
  {
    id: "gelado",
    label: "Bebidas muito geladas ou muito quentes",
    type: "alert",
    note: "Choque térmico nas pregas vocais.",
  },
  {
    id: "pastilha",
    label: "Pastilhas ou sprays anestésicos",
    type: "alert",
    note: "O efeito anestésico mascara a fadiga e facilita lesões por esforço.",
  },
  {
    id: "maca",
    label: "Maçã ou alimentos fibrosos",
    type: "success",
    note: "Ação adstringente, limpa a boca e a faringe. Recomendado.",
  },
];

// --- Temporizador de Repouso Vocal (WPA_WIDGET: VOCAL_REST_TIMER) ---
export const vocalRestTrigger = {
  minutesThreshold: 50,
  restMinMinutes: 15,
  restMaxMinutes: 30,
};

// --- Pacer de Respiração (citado nos checklists como 4s-4s-6s) ---
export const breathingPacer = { inhaleSec: 4, holdSec: 4, exhaleSec: 6 };

// --- Triagem de Sinais de Alerta (WPA_DIAGNOSTIC: VOCAL_RED_FLAGS) ---
export type RedFlag = { id: string; label: string };

export const vocalRedFlags: RedFlag[] = [
  { id: "alerta-rouquidao", label: "Rouquidão contínua ou flutuante" },
  { id: "alerta-falhas", label: "Falhas na emissão (perda de agudos ou soprosidade)" },
  { id: "alerta-pigarro", label: "Pigarro persistente ou dor ao falar" },
];

export const vocalRedFlagThreshold = "10–14 dias";
export const vocalRedFlagRecommendation =
  "Procure um otorrinolaringologista ou fonoaudiólogo. Evite a automedicação.";

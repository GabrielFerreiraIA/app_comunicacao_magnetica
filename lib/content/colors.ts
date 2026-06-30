// Dicionário de cores estratégicas — "Cores com Intencionalidade" (Cont 1).
// Pilar 3 (Imagem com IA). Paleta interativa: clica na cor → significado e uso.

export type StrategicColor = {
  id: string;
  name: string;
  swatch: string; // cor de exibição do círculo (aproximação visual)
  contrast?: "light" | "dark"; // cor do texto sobre o swatch
  headline: string; // efeito-chave
  communication: string;
  tags: string[];
  usage: string; // sugestão de uso
};

export type ColorGroup = {
  id: string;
  title: string;
  description: string;
  colors: StrategicColor[];
};

export const goldenRule =
  "Você não se veste para combinar. Você se veste para comunicar.";
export const positioningRule = "Roupa não é estética. É estratégia.";

export const colorGroups: ColorGroup[] = [
  {
    id: "impacto",
    title: "Impacto e Dinamismo",
    description: "Energia, atenção imediata, inovação e proatividade.",
    colors: [
      {
        id: "amarelo",
        name: "Amarelo",
        swatch: "#E6C24A",
        contrast: "dark",
        headline: "Ativa e expande",
        communication: "Energia mental, clareza e criatividade.",
        tags: ["Criatividade", "Energia", "Clareza", "Expansão"],
        usage: "Reuniões de brainstorming ou início de projetos.",
      },
      {
        id: "vermelho",
        name: "Vermelho",
        swatch: "#C0392B",
        contrast: "light",
        headline: "Presença e impacto",
        communication: "Poder, ação, coragem e magnetismo.",
        tags: ["Presença", "Ação", "Coragem", "Magnetismo"],
        usage: "Apresentações de destaque ou liderança ativa.",
      },
      {
        id: "laranja",
        name: "Laranja",
        swatch: "#D98032",
        contrast: "dark",
        headline: "Engajamento",
        communication: "Entusiasmo, energia vibrante e expansão.",
        tags: ["Entusiasmo", "Engajamento", "Vibrante", "Acessibilidade"],
        usage: "Dinâmicas de grupo, vendas e comunicação direta.",
      },
      {
        id: "estampas",
        name: "Estampas",
        swatch: "linear-gradient(135deg,#D98032,#C0392B,#E6C24A)",
        contrast: "light",
        headline: "Dinamismo e personalidade",
        communication: "Movimento, acessibilidade e criatividade.",
        tags: ["Movimento", "Personalidade", "Dinamismo"],
        usage: "Quebrar a rigidez em ambientes corporativos formais.",
      },
    ],
  },
  {
    id: "autoridade",
    title: "Autoridade e Poder",
    description: "Negociações de alto nível, palestras e respeito profissional.",
    colors: [
      {
        id: "vinho",
        name: "Vinho",
        swatch: "#5E2233",
        contrast: "light",
        headline: "Elegância e poder discreto",
        communication: "Maturidade, sofisticação e autoridade refinada.",
        tags: ["Maturidade", "Sofisticação", "Poder discreto", "Elegância"],
        usage: "Reuniões com investidores ou liderança sênior.",
      },
      {
        id: "roxo",
        name: "Roxo",
        swatch: "#5B3A8C",
        contrast: "light",
        headline: "Autoridade sensível",
        communication: "Profundidade, valor premium e espiritualidade.",
        tags: ["Profundidade", "Valor premium", "Sensibilidade"],
        usage: "Profissionais liberais, terapeutas e marcas de alto padrão.",
      },
      {
        id: "azul",
        name: "Azul",
        swatch: "#2C5F8A",
        contrast: "light",
        headline: "Autoridade técnica",
        communication: "Segurança, conhecimento e estabilidade.",
        tags: ["Segurança", "Conhecimento", "Estabilidade", "Confiança"],
        usage: "Auditorias, apresentações técnicas, saúde ou finanças.",
      },
      {
        id: "preto",
        name: "Preto",
        swatch: "#1A1A1A",
        contrast: "light",
        headline: "Poder e mistério",
        communication: "Elegância extrema, autoridade e distanciamento.",
        tags: ["Elegância extrema", "Autoridade", "Respeito"],
        usage: "Eventos formais ou quando é preciso impor limites.",
      },
    ],
  },
  {
    id: "conexao",
    title: "Conexão e Estabilidade",
    description: "Atendimentos, gestão de pessoas e vínculo de confiança.",
    colors: [
      {
        id: "verde",
        name: "Verde",
        swatch: "#3E7A52",
        contrast: "light",
        headline: "Conexão e equilíbrio",
        communication: "Saúde, acolhimento e harmonia.",
        tags: ["Saúde", "Acolhimento", "Harmonia", "Equilíbrio"],
        usage: "Profissionais da saúde, pedagogos e mediação de conflitos.",
      },
      {
        id: "marrom",
        name: "Marrom",
        swatch: "#6B4A2E",
        contrast: "light",
        headline: "Segurança e estabilidade",
        communication: "Confiabilidade, simplicidade e “pé no chão”.",
        tags: ["Confiabilidade", "Simplicidade", "Estabilidade"],
        usage: "Transmitir solidez, tradição e pragmatismo.",
      },
      {
        id: "lilas",
        name: "Lilás",
        swatch: "#B49AD6",
        contrast: "dark",
        headline: "Criatividade e intuição",
        communication: "Doçura, espiritualidade leve e originalidade.",
        tags: ["Doçura", "Originalidade", "Intuição"],
        usage: "Processos criativos leves e terapias integrativas.",
      },
    ],
  },
  {
    id: "neutros",
    title: "Neutros Estratégicos",
    description: "Base para equilibrar as cores de impacto, mantendo a sofisticação.",
    colors: [
      {
        id: "bege",
        name: "Bege",
        swatch: "#D8C7A8",
        contrast: "dark",
        headline: "Luxo silencioso",
        communication: "Calma, sofisticação discreta e conforto.",
        tags: ["Calma", "Conforto", "Luxo silencioso"],
        usage: "Cor base para suavizar mensagens de poder excessivo.",
      },
      {
        id: "branco",
        name: "Branco",
        swatch: "#F4F1EA",
        contrast: "dark",
        headline: "Transparência",
        communication: "Organização, clareza e limpeza mental.",
        tags: ["Organização", "Clareza", "Transparência"],
        usage: "Novos começos, feedbacks estruturados, apresentações limpas.",
      },
      {
        id: "cinza",
        name: "Cinza",
        swatch: "#8A8A92",
        contrast: "light",
        headline: "Neutralidade e sofisticação",
        communication: "Equilíbrio, racionalidade e controle emocional.",
        tags: ["Equilíbrio", "Racionalidade", "Imparcialidade"],
        usage: "Negociações neutras e situações de alta pressão.",
      },
    ],
  },
];

export function getColorById(id: string): StrategicColor | undefined {
  for (const group of colorGroups) {
    const color = group.colors.find((c) => c.id === id);
    if (color) return color;
  }
  return undefined;
}

// Kit IA — Biblioteca de Prompts (v1 autorada, derivada de Arquétipos + Cores).
// Revisão de conteúdo pela Hélia pendente. Use com ChatGPT (4/4o) anexando uma foto.

export type PromptCategory = "imagem" | "comunicacao" | "voz";

export type AiPrompt = {
  id: string;
  category: PromptCategory;
  title: string;
  description: string;
  instruction: string; // como usar
  prompt: string; // texto copiável
};

export const categoryLabels: Record<PromptCategory, string> = {
  imagem: "Imagem & Estilo",
  comunicacao: "Comunicação",
  voz: "Voz & Discurso",
};

export const aiPrompts: AiPrompt[] = [
  {
    id: "look-objetivo",
    category: "imagem",
    title: "Look estratégico para o objetivo do dia",
    description: "Recebe sugestões de paleta e peças com base na intenção da sua reunião.",
    instruction:
      "Cole no ChatGPT (4/4o) e anexe uma foto sua de corpo inteiro com a roupa que pretende usar.",
    prompt:
      "Aja como consultor(a) de imagem estratégica especialista em psicologia das cores e comunicação não-verbal. Analise a foto anexada (minha aparência e a roupa atual). Meu objetivo de comunicação hoje é: [DESCREVA — ex.: negociar um aumento / palestrar / atendimento clínico]. A emoção que quero despertar é: [ex.: confiança, autoridade, acolhimento]. Diga: 1) se a roupa atual comunica esse objetivo; 2) ajustes de cor e peça com justificativa estratégica; 3) uma paleta de 3 cores ideal e o que cada uma transmite. Seja objetivo e prático.",
  },
  {
    id: "look-arquetipo",
    category: "imagem",
    title: "Vestir o seu arquétipo",
    description: "Traduz o seu arquétipo predominante em um guarda-roupa coerente.",
    instruction:
      "Cole no ChatGPT e, se quiser, anexe uma foto. Substitua o arquétipo pelo seu resultado.",
    prompt:
      "Aja como estrategista de branding pessoal e imagem. Meu arquétipo predominante é [ARQUÉTIPO — ex.: Governante, Mago, Amante] e o secundário é [ARQUÉTIPO]. Monte um guia de guarda-roupa para o meu dia a dia profissional: peças-chave, paleta de cores estratégicas, tipos de linhas/acessórios e 3 looks completos para contextos diferentes (reunião de autoridade, conexão com a equipe, apresentação pública). Explique brevemente como cada escolha reforça a percepção do meu arquétipo.",
  },
  {
    id: "cor-significado",
    category: "imagem",
    title: "Combinar cores com intenção",
    description: "Descubra que mensagem uma combinação de cores transmite.",
    instruction: "Cole no ChatGPT e descreva ou anexe a combinação que está pensando em usar.",
    prompt:
      "Aja como especialista em psicologia das cores aplicada à imagem profissional. Pretendo usar as cores [LISTE AS CORES]. Explique, de forma estratégica: que mensagem essa combinação comunica, em quais contextos ela funciona melhor, em quais pode prejudicar, e como equilibrá-la com um neutro estratégico para sofisticação. Considere a regra: ‘você não se veste para combinar, você se veste para comunicar’.",
  },
  {
    id: "reuniao-dificil",
    category: "comunicacao",
    title: "Planejar uma conversa difícil (Tríade Assertiva)",
    description: "Estrutura Clareza + Empatia + Direção antes de uma negociação.",
    instruction: "Cole no ChatGPT e preencha os colchetes com a sua situação real.",
    prompt:
      "Aja como mentor(a) de comunicação assertiva. Vou ter esta conversa difícil: [DESCREVA A SITUAÇÃO E COM QUEM]. Me ajude a estruturar pela Tríade Assertiva: 1) CLAREZA — o que eu quero comunicar, sem rodeios; 2) EMPATIA — como ajustar o tom para que o outro receba bem; 3) DIREÇÃO — o resultado prático que desejo. Entregue uma fala de abertura pronta (2–3 frases), 2 respostas para possíveis objeções e uma frase de fechamento.",
  },
  {
    id: "roteiro-apresentacao",
    category: "comunicacao",
    title: "Roteiro de apresentação de impacto",
    description: "Transforma um tema em uma estrutura clara e magnética.",
    instruction: "Cole no ChatGPT e informe o tema, o público e o tempo disponível.",
    prompt:
      "Aja como especialista em oratória e storytelling. Preciso apresentar sobre [TEMA] para [PÚBLICO] em [TEMPO]. Crie um roteiro com: abertura de impacto (gancho em 1 frase), 3 blocos principais com a ideia-chave de cada um, uma pausa estratégica sugerida por bloco, e um encerramento memorável com chamada à ação. Sinalize onde aumentar a intensidade da voz e onde fazer pausas.",
  },
  {
    id: "vicios-linguagem",
    category: "voz",
    title: "Eliminar vícios de linguagem",
    description: "Reescreve um texto seu removendo muletas e deixando a fala firme.",
    instruction: "Cole no ChatGPT junto com a transcrição da sua fala.",
    prompt:
      "Aja como fonoaudióloga e coach de comunicação. Aqui está a transcrição da minha fala: [COLE A TRANSCRIÇÃO]. Identifique vícios de linguagem (‘né’, ‘tipo’, ‘ééé’, ‘entendeu’), repetições e hesitações. Reescreva a fala de forma firme, clara e com pausas intencionais no lugar das muletas. Liste os 3 vícios que mais usei para eu praticar a substituição por silêncio estratégico.",
  },
];

export function promptsByCategory(category: PromptCategory): AiPrompt[] {
  return aiPrompts.filter((p) => p.category === category);
}

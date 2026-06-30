// Diretrizes de Assertividade e Inteligência Conversacional (Cont 4) — Pilar 5 (Carisma).

export type TriadElement = {
  id: string;
  element: string;
  question: string;
  effect: string;
};

export const assertiveTriad: TriadElement[] = [
  {
    id: "clareza",
    element: "Clareza",
    question: "O que eu quero comunicar?",
    effect: "Elimina rodeios, reduz ruídos e reforça o foco no tema central.",
  },
  {
    id: "empatia",
    element: "Empatia",
    question: "Como o outro pode receber isso?",
    effect: "Ajusta a entrega, reduzindo barreiras e agressividade.",
  },
  {
    id: "direcao",
    element: "Direção",
    question: "Qual resultado eu desejo com essa conversa?",
    effect: "Define o propósito da interação e orienta a conclusão.",
  },
];

export type CharismaTactic = {
  id: string;
  title: string;
  detail: string;
};

export const charismaTactics: CharismaTactic[] = [
  {
    id: "olhar",
    title: "Contato visual estratégico",
    detail:
      "Manter o olhar 60–70% do tempo de fala cria credibilidade sem intimidar. Alterne suavemente entre 3 pontos focais.",
  },
  {
    id: "sorriso",
    title: "Sorriso consciente",
    detail:
      "Reduz tensões faciais e resistências inconscientes no interlocutor, abrindo o canal de escuta.",
  },
  {
    id: "escuta",
    title: "Escutar com os olhos",
    detail:
      "55% da percepção da mensagem é não-verbal (Mehrabian). Monitore braços cruzados, desvio de olhar e mudança de tom.",
  },
  {
    id: "pausa",
    title: "Não preparar a resposta enquanto o outro fala",
    detail:
      "Foque 100% na fala do outro. Faça uma pausa consciente de 1–2s antes de responder — comunica autocontrole e autoridade.",
  },
  {
    id: "validar",
    title: "Validar o que ouviu",
    detail:
      "“Então, o que você quis dizer foi…” alinha expectativas e evita mal-entendidos.",
  },
];

export type ConversationScript = {
  id: string;
  scenario: string;
  script: string;
  goal: string;
};

// Scripts copiáveis (Simulador de Espelhamento e Validação)
export const conversationScripts: ConversationScript[] = [
  {
    id: "alinhamento",
    scenario: "Alinhamento de expectativas",
    script: "Então, o que você quis dizer foi… [complete com as palavras do outro]. Correto?",
    goal: "Evitar mal-entendidos e alinhar os pontos.",
  },
  {
    id: "valor",
    scenario: "Empatia e foco no valor",
    script: "Entendi que o ponto mais importante para você nesta questão é… [indique o ponto principal].",
    goal: "Demonstrar respeito pelo foco do interlocutor.",
  },
  {
    id: "silencio",
    scenario: "Investigação de silêncios",
    script: "Percebi que você ficou em silêncio nesse ponto. Quer me contar mais sobre o que está pensando?",
    goal: "Revelar necessidades ou objeções não ditas.",
  },
];

export const assertiveAnchors = [
  "Clareza",
  "Propósito",
  "Respeito",
  "Presença",
  "Escuta",
  "Intenção",
];

export type CharismaScenario = {
  id: string;
  scope: string; // e.g., "Gravação de Vídeo"
  title: string;
  commonMistake: string;
  whyMistake: string;
  alternative: string;
  benefit: string;
};

export const charismaScenarios: CharismaScenario[] = [
  {
    id: "gravacao-video",
    scope: "Gravação de Vídeo",
    title: "Introdução de Conteúdo",
    commonMistake: "Oi gente, desculpa sumir daqui, hoje eu vim falar de um assunto super chato mas que vocês precisam saber...",
    whyMistake: "Começar com pedidos de desculpas desnecessários enfraquece sua autoridade. Chamar seu próprio conteúdo de 'chato' cria uma barreira de tédio imediata e afasta o espectador.",
    alternative: "Hoje eu vou compartilhar com você o atalho exato para [inserir grande benefício], algo que mudou meu jogo nesta semana e vai economizar muito do seu tempo.",
    benefit: "Captura a atenção nos primeiros 3 segundos, gera expectativa de alto valor e posiciona você como um solucionador ágil."
  },
  {
    id: "conhecendo-pessoa",
    scope: "Networking & Conexão",
    title: "Primeiro Contato",
    commonMistake: "Oi, tudo bem? Eu sou o [Nome], trabalho com marketing e você, faz o quê?",
    whyMistake: "Essa é a pergunta burocrática padrão. Transforma o início de uma conexão em um interrogatório robótico de preenchimento de ficha, sem impacto emocional ou originalidade.",
    alternative: "Oi! Eu sou o [Nome]. Além do crachá da empresa, o que tem te empolgado mais ultimamente na sua área de atuação?",
    benefit: "Desarma o roteiro automático do outro, convida à paixão genuína e cria uma conexão pessoal memorável instantaneamente."
  },
  {
    id: "apresentando-relatorio",
    scope: "Reuniões & Relatórios",
    title: "Apresentação de Métricas",
    commonMistake: "Bom, eu tentei montar esse slide meio correndo, mas basicamente esses números mostram que a gente não atingiu a meta por causa da oscilação do mercado...",
    whyMistake: "Diminuir o próprio esforço ('tentei', 'meio correndo') gera desconfiança sobre a qualidade dos dados. Apontar o mercado como culpado direto denota falta de responsabilidade e liderança ativa.",
    alternative: "Estes dados nos revelam o cenário real. Embora o mercado tenha oscilado, as três ações prioritárias que já estamos liderando para contornar essa métrica são...",
    benefit: "Comunica controle absoluto da situação, maturidade executiva (C-level posture) e foco em soluções em vez de justificativas."
  },
  {
    id: "fazendo-discurso",
    scope: "Palco & Discursos",
    title: "Abertura de Apresentação",
    commonMistake: "Oi pessoal, boa noite. Queria agradecer. Eu confesso que estou um pouco nervoso por estar aqui, mas vou tentar dar o meu melhor...",
    whyMistake: "Anunciar nervosismo faz o público procurar sinais de instabilidade na sua voz e postura. Pedir indulgência mina a credibilidade antes mesmo do conteúdo começar.",
    alternative: "Boa noite. O maior ativo que temos hoje é o tempo. E o meu compromisso com vocês é fazer com que cada minuto desta apresentação traga valor prático.",
    benefit: "Demonstra profundo respeito pela audiência, gera engajamento focado e projeta segurança imediata."
  }
];

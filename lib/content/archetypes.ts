// Core Database dos 12 Arquétipos (Cont 6) + diagnóstico (Const 5) — Pilar 2.

export type Quadrant =
  | "Controle e Estabilidade"
  | "Comunidade e Diversão"
  | "Independência e Realização"
  | "Risco e Excelência";

export type Archetype = {
  id: string;
  name: string; // forma usada na grade
  alias: string; // nomes alternativos
  quadrant: Quadrant;
  // Hoje um emoji-placeholder. Quando a Hélia enviar a arte do personagem, troque
  // por um caminho de imagem (ex.: "/archetypes/inocente.png") — ArchetypeIcon
  // detecta o formato automaticamente.
  icon: string;
  desire: string;
  goal: string;
  fear: string;
  strength: string;
  shadow: string;
  innerPhrase: string;
  voice: string;
  language: string;
  communication: string;
  sales: string;
  leadership: string;
  wardrobe: {
    pieces: string;
    colors: string; // cores estratégicas (texto)
    lines: string; // acessórios & linhas
  };
  paletteColorIds: string[]; // ids de lib/content/colors.ts
  characters: string[]; // personagens (ficção/mitologia) que encarnam o arquétipo
  brands: string[]; // marcas globalmente associadas ao arquétipo
  positioningTips: string[]; // dicas práticas de posicionamento de marca
  matchingPhrases: string[]; // frases que combinam com o tom do arquétipo
  avoidPhrases: string[]; // frases que destoam / quebram o arquétipo
  pros: string[]; // vantagens de liderar a comunicação com este arquétipo
  cons: string[]; // riscos e cuidados ao liderar com este arquétipo
  affinities: { id: string; why: string }[]; // arquétipos afins (combinam bem)
  tensions: { id: string; why: string }[]; // arquétipos de tensão (distanciamento)
};

export const quadrants: { id: string; title: string; focus: string; members: string[] }[] = [
  {
    id: "controle",
    title: "Controle e Estabilidade",
    focus: "Sentir-se seguro — dar estrutura ao mundo.",
    members: ["Criador", "Cuidador", "Governante"],
  },
  {
    id: "comunidade",
    title: "Comunidade e Diversão",
    focus: "Amor, pertencimento e conexão.",
    members: ["Pessoa Comum", "Amante", "Bobo da Corte"],
  },
  {
    id: "independencia",
    title: "Independência e Realização",
    focus: "Encontrar a felicidade e a verdade.",
    members: ["Inocente", "Explorador", "Sábio"],
  },
  {
    id: "risco",
    title: "Risco e Excelência",
    focus: "Deixar sua marca no mundo.",
    members: ["Herói", "Fora da Lei", "Mago"],
  },
];

export const archetypes: Archetype[] = [
  {
    id: "inocente",
    name: "Inocente",
    alias: "O Idealista · utópico, sonhador, místico",
    quadrant: "Independência e Realização",
    icon: "/archetypes/inocente.png",
    desire: "Vivenciar o paraíso, a pureza e o melhor de dois mundos.",
    goal: "Ser feliz, livre de preconceitos, experimentar a simplicidade.",
    fear: "Fazer algo errado que provoque punição.",
    strength: "Fé, otimismo inabalável, espontaneidade e honestidade.",
    shadow: "Negar a realidade, ingenuidade excessiva, ignorar problemas.",
    innerPhrase: "Tudo pode dar certo.",
    voice: "Suave, leve, com cadência linear e tranquila.",
    language: "Altamente positiva, encorajadora, focada no bem comum.",
    communication: "Simples, leve e otimista.",
    sales: "Vende confiança, paz de espírito, bem-estar e simplicidade.",
    leadership: "Inspira segurança emocional e ambientes de confiança e harmonia.",
    wardrobe: {
      pieces: "Vestidos fluidos, camisas simples em tecidos naturais, alfaiataria desestruturada.",
      colors: "Branco, lilás e tons pastel.",
      lines: "Acessórios minimalistas, linhas curvas e arredondadas.",
    },
    paletteColorIds: ["branco", "lilas"],
    characters: ["Forrest Gump", "Cinderela", "Bambi"],
    brands: ["Coca-Cola", "Disney", "Dove"],
    positioningTips: [
      "Lidere com transparência radical: diga o que faz e faça o que diz, sem letras pequenas.",
      "Use depoimentos e provas simples — não dados complexos — para gerar confiança.",
      "Mantenha a comunicação visual limpa, com bastante espaço em branco e poucas promessas.",
    ],
    matchingPhrases: [
      "Aqui, o que você vê é o que você recebe.",
      "Vamos manter isso simples.",
      "Acreditamos no caminho mais honesto.",
      "Você pode confiar no processo.",
    ],
    avoidPhrases: [
      "Garantia absoluta de resultado em 7 dias.",
      "Ironia pesada ou sarcasmo cortante.",
      "Jargão técnico denso e impessoal.",
      "Últimas vagas, corra antes que acabe!",
    ],
    pros: [
      "Gera confiança quase instantânea — o público baixa a guarda.",
      "Comunicação simples reduz fricção e objeções.",
      "Cria uma marca calorosa e fácil de recomendar.",
      "Forte em nichos de bem-estar, família e começo de jornada.",
    ],
    cons: [
      "Pode parecer ingênuo diante de decisões complexas.",
      "Risco de evitar conflitos necessários para crescer.",
      "Dificuldade em comunicar autoridade técnica ou preço premium.",
      "Tende a minimizar problemas reais para preservar a harmonia.",
    ],
    affinities: [
      { id: "cuidador", why: "Ambos comunicam segurança emocional; juntos criam um refúgio de confiança." },
      { id: "amante", why: "A pureza do Inocente suaviza, e o Amante adiciona calor e desejo de proximidade." },
    ],
    tensions: [
      { id: "foradalei", why: "O ceticismo provocador do Fora da Lei colide com o otimismo do Inocente." },
      { id: "governante", why: "O controle rígido do Governante sufoca a leveza espontânea do Inocente." },
    ],
  },
  {
    id: "sabio",
    name: "Sábio",
    alias: "O Especialista · professor, mentor, pesquisador",
    quadrant: "Independência e Realização",
    icon: "/archetypes/sabio.png",
    desire: "Descoberta da verdade e clareza de pensamento.",
    goal: "Usar inteligência e análise para compreender o mundo.",
    fear: "Ser enganado, iludido ou cair na ignorância.",
    strength: "Sabedoria, prudência, análise objetiva e pensamento lógico.",
    shadow: "Excesso de racionalidade, paralisia por análise, frieza.",
    innerPhrase: "Preciso entender antes de agir.",
    voice: "Controlada, pausada, com articulação precisa (dicção clara).",
    language: "Didática, estruturada, fundamentada em dados.",
    communication: "Lógica, limpa e esclarecedora.",
    sales: "Vende conhecimento estruturado, perícia e autoridade técnica.",
    leadership: "Lidera pela competência intelectual e planejamento estratégico.",
    wardrobe: {
      pieces: "Blazer estruturado, óculos clássicos, camisas alinhadas, trench coats.",
      colors: "Azul (autoridade técnica), cinza (racionalidade).",
      lines: "Linhas retas e angulares, relógios discretos, sem estampas chamativas.",
    },
    paletteColorIds: ["azul", "cinza"],
    characters: ["Sherlock Holmes", "Mestre Yoda", "Hermione Granger"],
    brands: ["Google", "BBC", "Discovery Channel"],
    positioningTips: [
      "Construa autoridade com conteúdo educativo — artigos, dados, comparativos.",
      "Mostre o raciocínio por trás da recomendação, não só a conclusão.",
      "Evite hype: deixe a precisão falar mais alto que o entusiasmo.",
    ],
    matchingPhrases: [
      "Os dados mostram que...",
      "Vamos entender o porquê antes do como.",
      "Aqui está a lógica por trás da recomendação.",
      "Conhecimento é a base de toda boa decisão.",
    ],
    avoidPhrases: [
      "Confia, só confia, dá certo!",
      "Linguagem emocional exagerada sem embasamento.",
      "Promessas sem nenhuma evidência por trás.",
      "Decide rápido, não precisa pensar muito.",
    ],
    pros: [
      "Posiciona a marca como referência técnica no nicho.",
      "Atrai público disposto a pagar por expertise real.",
      "Fideliza por educação, não por hype passageiro.",
      "Resistente a modismos e tendências vazias.",
    ],
    cons: [
      "Pode soar frio, distante ou condescendente.",
      "Excesso de detalhes cansa quem só quer uma resposta rápida.",
      "Risco de paralisar decisões em busca de 'mais uma pesquisa'.",
      "Dificuldade em vender pelo emocional quando o produto exige desejo.",
    ],
    affinities: [
      { id: "governante", why: "A clareza analítica do Sábio sustenta a autoridade estrutural do Governante." },
      { id: "criador", why: "O raciocínio do Sábio dá fundamento à inovação visionária do Criador." },
    ],
    tensions: [
      { id: "bobo", why: "A leveza despreocupada do Bobo da Corte tensiona com o rigor buscado pelo Sábio." },
      { id: "mago", why: "A intuição mística do Mago pode parecer pouco fundamentada para o racionalismo do Sábio." },
    ],
  },
  {
    id: "heroi",
    name: "Herói",
    alias: "O Guerreiro · atleta, competidor, libertador",
    quadrant: "Risco e Excelência",
    icon: "/archetypes/heroi.png",
    desire: "Provar o próprio valor por ações corajosas e difíceis.",
    goal: "Melhorar o mundo através da excelência e maestria.",
    fear: "Fraqueza, vulnerabilidade e medo de “amarelar”.",
    strength: "Determinação, coragem, competência e energia.",
    shadow: "Autocobrança excessiva, agressividade, ver a vida como batalha.",
    innerPhrase: "Onde há vontade, há um caminho. Eu consigo.",
    voice: "Firme, enérgica, bem projetada e com boa sustentação.",
    language: "Direta, motivadora, focada em metas e superação.",
    communication: "Assertiva, estimulante e focada na ação.",
    sales: "Vende transformação acelerada e superação de crises.",
    leadership: "Lidera pelo exemplo de esforço e resiliência.",
    wardrobe: {
      pieces: "Ombros marcados, jaquetas de couro, alfaiataria “armadura”.",
      colors: "Vermelho (impacto), preto (poder) e alto contraste.",
      lines: "Linhas verticais e diagonais, joias geométricas pesadas.",
    },
    paletteColorIds: ["vermelho", "preto"],
    characters: ["Hércules", "Capitã Marvel", "Rocky Balboa"],
    brands: ["Nike", "Adidas", "FedEx"],
    positioningTips: [
      "Mostre transformação com números e antes/depois concretos.",
      "Fale em verbos de ação: conquistar, superar, vencer.",
      "Posicione-se ao lado do cliente na batalha, não apenas como instrutor.",
    ],
    matchingPhrases: [
      "Vamos virar esse jogo.",
      "Você é mais forte do que imagina — eu te mostro o caminho.",
      "Resultado vem de ação, não de desculpa.",
      "Aqui não tem zona de conforto.",
    ],
    avoidPhrases: [
      "Tudo bem se não der certo, relaxa.",
      "Linguagem passiva ou hesitante.",
      "Excesso de cautela nas promessas de resultado.",
      "Tom vitimista diante dos desafios.",
    ],
    pros: [
      "Mobiliza e energiza o público para agir agora.",
      "Cria senso de superação que fideliza em transformação.",
      "Forte em nichos de performance, saúde e carreira.",
      "Constrói reputação de quem entrega resultado, não só teoria.",
    ],
    cons: [
      "Pode pressionar demais quem precisa de ritmo mais leve.",
      "Risco de parecer arrogante ou competitivo em excesso.",
      "Tende a desvalorizar pausas, autocuidado e processos lentos.",
      "Comunicação cansa se for sempre em 'modo batalha'.",
    ],
    affinities: [
      { id: "cuidador", why: "O Cuidador equilibra a intensidade do Herói com acolhimento, evitando o esgotamento." },
      { id: "mago", why: "O Mago transforma a força do Herói em visão estratégica de longo prazo." },
    ],
    tensions: [
      { id: "inocente", why: "A ingenuidade do Inocente contrasta com a urgência combativa do Herói." },
      { id: "pessoacomum", why: "O desejo de pertencer do Pessoa Comum tensiona com a necessidade de se destacar do Herói." },
    ],
  },
  {
    id: "foradalei",
    name: "Fora da Lei",
    alias: "O Rebelde · revolucionário, desajustado",
    quadrant: "Risco e Excelência",
    icon: "/archetypes/foradalei.png",
    desire: "Liberdade radical, quebra de regras e revolução.",
    goal: "Destruir o que não funciona na sociedade ou na própria vida.",
    fear: "Não ter poder, ser controlado ou considerado comum.",
    strength: "Quebrar padrões, inovação radical e independência.",
    shadow: "Rebeldia improdutiva, comportamento destrutivo, isolamento.",
    innerPhrase: "As regras foram feitas para serem quebradas.",
    voice: "Intensa, por vezes rouca, com variações bruscas de tom.",
    language: "Provocativa, questionadora, irônica, avessa a clichês.",
    communication: "Disruptiva, desafiadora e de forte magnetismo.",
    sales: "Vende ruptura com o convencional e exclusividade radical.",
    leadership: "Transforma sistemas e estimula o pensamento autônomo.",
    wardrobe: {
      pieces: "Couro, cortes assimétricos, botas pesadas, estampas conceituais.",
      colors: "Preto, cinza escuro e detalhes metálicos / vinho profundo.",
      lines: "Linhas quebradas, acessórios com metal e design não convencional.",
    },
    paletteColorIds: ["preto", "vinho"],
    characters: ["Lisbeth Salander", "Tank Girl", "Capitão Jack Sparrow"],
    brands: ["Harley-Davidson", "Diesel", "Virgin"],
    positioningTips: [
      "Quebre uma convenção do seu mercado publicamente — e explique por quê.",
      "Use linguagem direta e sem filtros corporativos.",
      "Assuma posições polarizadoras com argumento, não só provocação vazia.",
    ],
    matchingPhrases: [
      "Esquece a regra: faz diferente.",
      "Isso que todo mundo faz? Não é o nosso caminho.",
      "Prefiro incomodar do que ser irrelevante.",
      "Vamos contra a corrente — de propósito.",
    ],
    avoidPhrases: [
      "Conforme as melhores práticas do mercado...",
      "Tom excessivamente formal e cauteloso.",
      "Pedidos de desculpa por opinar.",
      "Linguagem que busca agradar todo mundo.",
    ],
    pros: [
      "Gera identificação forte com quem também se sente fora do padrão.",
      "Diferenciação imediata em mercados saturados de discurso igual.",
      "Comunicação memorável e altamente compartilhável.",
      "Atrai early adopters dispostos a experimentar o não convencional.",
    ],
    cons: [
      "Pode afastar públicos mais conservadores ou institucionais.",
      "Risco de provocação sem propósito, vista como birra.",
      "Difícil sustentar parcerias que exigem alinhamento e consenso.",
      "Pode minar a confiança em contextos que exigem estabilidade.",
    ],
    affinities: [
      { id: "mago", why: "A ruptura do Fora da Lei ganha direção com a visão transformadora do Mago." },
      { id: "criador", why: "A quebra de regras se torna inovação concreta ao lado da originalidade do Criador." },
    ],
    tensions: [
      { id: "governante", why: "A ordem e o controle do Governante são justamente o que o Fora da Lei quer derrubar." },
      { id: "cuidador", why: "O cuidado protetor do Cuidador entra em atrito com o risco assumido pelo Fora da Lei." },
    ],
  },
  {
    id: "explorador",
    name: "Explorador",
    alias: "O Buscador · aventureiro, peregrino, andarilho",
    quadrant: "Independência e Realização",
    icon: "/archetypes/explorador.png",
    desire: "Liberdade para descobrir quem é explorando o mundo.",
    goal: "Experimentar uma vida autêntica e mais gratificante.",
    fear: "Sentir-se preso, conformar-se, cair na rotina.",
    strength: "Autonomia, ambição de crescimento, adaptabilidade.",
    shadow: "Falta de consistência, inquietude, fugir de compromissos.",
    innerPhrase: "Não levante cercas à minha volta.",
    voice: "Natural, dinâmica, com bom fluxo de ar e ritmo estimulante.",
    language: "Inspiradora, focada em horizontes, autonomia e descobertas.",
    communication: "Reflexiva, mas impulsionadora de novas perspectivas.",
    sales: "Vende liberdade de escolha e jornadas de autodescoberta.",
    leadership: "Expande limites, incentiva autonomia e busca novos nichos.",
    wardrobe: {
      pieces: "Calças cargo modernas, camisas utilitárias, corta-vento, botas de qualidade.",
      colors: "Marrom (pé no chão), verde militar, cáqui, bege safari.",
      lines: "Bolsas transversais, linhas orgânicas e confortáveis.",
    },
    paletteColorIds: ["marrom", "laranja"],
    characters: ["Indiana Jones", "Lara Croft", "Bilbo Bolseiro"],
    brands: ["Jeep", "The North Face", "National Geographic"],
    positioningTips: [
      "Compartilhe a jornada, não só o destino — processo, bastidores, aprendizados.",
      "Ofereça liberdade de personalização em vez de pacotes fechados.",
      "Fale para quem busca autenticidade, não status.",
    ],
    matchingPhrases: [
      "Cada caminho é seu para descobrir.",
      "Sem fórmula pronta — sem cercas.",
      "Vamos além do óbvio.",
      "A jornada importa tanto quanto o resultado.",
    ],
    avoidPhrases: [
      "Siga exatamente este passo a passo, sem desviar.",
      "Linguagem de pertencimento a grupo fechado.",
      "Promessas de estabilidade total e imutável.",
      "Tom corporativo engessado.",
    ],
    pros: [
      "Atrai público que valoriza autonomia e autenticidade.",
      "Comunicação inspiradora gera engajamento orgânico.",
      "Boa adesão em nichos de transformação pessoal e estilo de vida.",
      "Flexibilidade percebida como vantagem competitiva.",
    ],
    cons: [
      "Pode parecer inconsistente ou sem compromisso de longo prazo.",
      "Dificuldade em comunicar estrutura e previsibilidade.",
      "Risco de dispersão de mensagem por falta de foco.",
      "Pode afastar público que busca segurança e tradição.",
    ],
    affinities: [
      { id: "criador", why: "A originalidade do Criador dá forma concreta às descobertas do Explorador." },
      { id: "heroi", why: "A coragem de ação do Herói impulsiona a busca constante do Explorador." },
    ],
    tensions: [
      { id: "governante", why: "A necessidade de ordem do Governante conflita com a liberdade sem rota fixa do Explorador." },
      { id: "pessoacomum", why: "O desejo de pertencimento do Pessoa Comum tensiona com a independência do Explorador." },
    ],
  },
  {
    id: "mago",
    name: "Mago",
    alias: "O Visionário · catalisador, inovador, curandeiro",
    quadrant: "Risco e Excelência",
    icon: "/archetypes/mago.png",
    desire: "Conhecer as leis do universo para criar transformações.",
    goal: "Tornar sonhos e visões abstratas em realidade concreta.",
    fear: "Consequências negativas por falta de controle do processo.",
    strength: "Visão clarividente, carisma hipnótico e intuição.",
    shadow: "Promessas irreais ou manipular a percepção alheia.",
    innerPhrase: "Tudo pode ser transformado.",
    voice: "Hipnotizante, melodiosa, aveludada, com pausas magnéticas.",
    language: "Transformadora, metafórica, que expande a imaginação.",
    communication: "Carismática, magnética e persuasiva pelo encantamento.",
    sales: "Vende “antes e depois” radicais e metodologias proprietárias.",
    leadership: "Catalisa transformação de cultura e novas realidades.",
    wardrobe: {
      pieces: "Casacos longos, veludo, sedas escuras, cortes fluidos conceituais.",
      colors: "Roxo (premium), vinho e tons escuros e misteriosos.",
      lines: "Joias com pedras naturais, linhas fluidas e sinuosas.",
    },
    paletteColorIds: ["roxo", "lilas"],
    characters: ["Gandalf", "Doutor Estranho", "Mary Poppins"],
    brands: ["Apple", "Tesla", "Cirque du Soleil"],
    positioningTips: [
      "Construa narrativa de transformação: estado atual → ponto de virada → novo estado.",
      "Use metáforas e linguagem sensorial para tornar o abstrato tangível.",
      "Seja transparente sobre o processo por trás da 'magia' para manter a ética e a confiança.",
    ],
    matchingPhrases: [
      "Isso muda o jogo.",
      "Vamos transformar essa visão em realidade.",
      "O que parece impossível é só um processo ainda não revelado.",
      "Aqui a virada acontece.",
    ],
    avoidPhrases: [
      "Funciona para todo mundo, sempre, sem exceção.",
      "Jargão excessivamente técnico que mata o encanto.",
      "Tom hesitante ou cheio de ressalvas.",
      "Comunicação burocrática e impessoal.",
    ],
    pros: [
      "Cria desejo e encantamento — ótimo para lançamentos e transformações.",
      "Comunicação memorável, quase hipnótica, gera alto engajamento.",
      "Posiciona a marca como inovadora e visionária.",
      "Forte em metodologias proprietárias e produtos de transformação.",
    ],
    cons: [
      "Risco real de sombra: prometer mais do que pode entregar.",
      "Pode parecer manipulador se a transparência falhar.",
      "Difícil sustentar o encantamento em comunicações operacionais do dia a dia.",
      "Exige prova concreta constante para não perder credibilidade.",
    ],
    affinities: [
      { id: "criador", why: "A visão do Mago ganha forma prática com a capacidade criativa de execução." },
      { id: "heroi", why: "O Herói executa com força o que o Mago vislumbra como possível." },
    ],
    tensions: [
      { id: "sabio", why: "O racionalismo do Sábio questiona o encantamento e a intuição do Mago." },
      { id: "pessoacomum", why: "A simplicidade direta do Pessoa Comum se choca com o mistério deliberado do Mago." },
    ],
  },
  {
    id: "pessoacomum",
    name: "Pessoa Comum",
    alias: "O Cara Comum · o realista, o bom companheiro",
    quadrant: "Comunidade e Diversão",
    icon: "/archetypes/pessoacomum.png",
    desire: "Conexão autêntica e pertencimento igualitário.",
    goal: "Pertencer e ser útil sem necessidade de holofotes.",
    fear: "Ser excluído, rejeitado ou parecer arrogante.",
    strength: "Realismo, empatia prática, lealdade, ausência de vaidade.",
    shadow: "Medo de se destacar ou de mostrar o próprio brilho.",
    innerPhrase: "Sou igual a você. Todos nascem iguais.",
    voice: "Acessível, acolhedora, tom coloquial e simpático.",
    language: "Simples, direta, livre de jargões e termos pomposos.",
    communication: "Próxima, informal e de alta identificação imediata.",
    sales: "Vende identificação, comunidade e custo-benefício honesto.",
    leadership: "Constrói confiança pelo trabalho horizontal e colaboração.",
    wardrobe: {
      pieces: "Polos clássicas, camisas de algodão, jeans tradicional, calçados confortáveis.",
      colors: "Azul jeans, cinza claro, bege e tons terrosos suaves.",
      lines: "Linhas simples, acessórios discretos e funcionais.",
    },
    paletteColorIds: ["bege", "verde"],
    characters: ["Bridget Jones", "Andy (Toy Story)", "Peter Parker"],
    brands: ["IKEA", "eBay", "Levi's"],
    positioningTips: [
      "Fale a língua do seu público — sem jargão, sem pose.",
      "Mostre bastidores reais e use prova social de gente comum.",
      "Priorize custo-benefício e utilidade prática na comunicação.",
    ],
    matchingPhrases: [
      "Isso aqui é pra gente como a gente.",
      "Sem complicação, sem enrolação.",
      "Funciona no dia a dia real, não só na teoria.",
      "Estamos todos no mesmo barco.",
    ],
    avoidPhrases: [
      "Somos a elite exclusiva do segmento.",
      "Linguagem de status e luxo inacessível.",
      "Jargão técnico desnecessário.",
      "Tom de superioridade sobre o público.",
    ],
    pros: [
      "Gera identificação e confiança imediatas — 'é gente como eu'.",
      "Reduz a barreira de entrada e objeções de preço/status.",
      "Excelente para fidelização via comunidade e indicação.",
      "Comunicação honesta cria reputação duradoura.",
    ],
    cons: [
      "Pode dificultar a cobrança de preço premium.",
      "Risco de se misturar com a concorrência por falta de diferenciação.",
      "Dificuldade em comunicar exclusividade quando necessário.",
      "Pode parecer 'sem ambição' para públicos que buscam status.",
    ],
    affinities: [
      { id: "cuidador", why: "Ambos comunicam proximidade e cuidado horizontal, sem hierarquia." },
      { id: "bobo", why: "A leveza do Bobo da Corte combina com a informalidade acessível do Pessoa Comum." },
    ],
    tensions: [
      { id: "governante", why: "O status e a hierarquia do Governante se opõem à igualdade buscada pelo Pessoa Comum." },
      { id: "mago", why: "O mistério e a exclusividade do Mago contrastam com a simplicidade direta do Pessoa Comum." },
    ],
  },
  {
    id: "amante",
    name: "Amante",
    alias: "O Parceiro · o íntimo, o harmonizador, o sensualista",
    quadrant: "Comunidade e Diversão",
    icon: "/archetypes/amante.png",
    desire: "Intimidade profunda, afeição mútua e prazer estético.",
    goal: "Nutrir relacionamentos com pessoas, trabalho e experiências que ama.",
    fear: "Rejeição, solidão e sentir-se indesejável.",
    strength: "Paixão, apreço estético, gratidão e comprometimento.",
    shadow: "Busca excessiva por aprovação, perder a própria identidade.",
    innerPhrase: "Quero criar conexão verdadeira.",
    voice: "Calorosa, envolvente, modulada e intimista.",
    language: "Afetiva, empática, elogiosa, focada nas emoções.",
    communication: "Conetiva, próxima, cria vínculos emocionais instantâneos.",
    sales: "Vende experiências sensoriais exclusivas e beleza estética.",
    leadership: "Constrói lealdade pela valorização genuína de cada pessoa.",
    wardrobe: {
      pieces: "Tecidos luxuosos (seda, cetim, cashmere), slim fit elegante, drapeados sutis.",
      colors: "Vinho (elegância), vermelho (magnetismo), nude e blush.",
      lines: "Linhas curvas e orgânicas, acessórios delicados, metais brilhantes.",
    },
    paletteColorIds: ["vinho", "vermelho"],
    characters: ["Romeu e Julieta", "Cleópatra", "Jack & Rose (Titanic)"],
    brands: ["Chanel", "Victoria's Secret", "Häagen-Dazs"],
    positioningTips: [
      "Invista em estética: imagem, som e texto devem 'tocar' antes de explicar.",
      "Use linguagem sensorial e elogie genuinamente a experiência do cliente.",
      "Construa rituais de proximidade — recados pessoais, pós-venda afetivo.",
    ],
    matchingPhrases: [
      "Feito com (e para) quem você ama.",
      "Você merece se sentir assim.",
      "Cada detalhe foi pensado para te encantar.",
      "Essa conexão é o que nos move.",
    ],
    avoidPhrases: [
      "Processo padrão, sem personalização.",
      "Linguagem puramente técnica e funcional.",
      "Tom apressado ou transacional.",
      "Comunicação genérica em massa.",
    ],
    pros: [
      "Gera vínculo emocional forte e fidelidade de longo prazo.",
      "Excelente em nichos de beleza, experiência e relacionamento.",
      "Comunicação calorosa converte por desejo, não só por necessidade.",
      "Cria embaixadores de marca apaixonados.",
    ],
    cons: [
      "Risco de buscar aprovação a ponto de perder identidade própria.",
      "Pode parecer raso se a estética não for sustentada por substância.",
      "Difícil comunicar urgência ou autoridade dura quando preciso.",
      "Sensível a comparação — exige atenção redobrada à exclusividade percebida.",
    ],
    affinities: [
      { id: "inocente", why: "A pureza do Inocente soma à sedução do Amante, criando um calor genuíno e confiável." },
      { id: "criador", why: "O apuro estético do Criador potencializa a experiência sensorial que o Amante busca entregar." },
    ],
    tensions: [
      { id: "foradalei", why: "O distanciamento provocador do Fora da Lei conflita com a busca de intimidade do Amante." },
      { id: "sabio", why: "A frieza analítica do Sábio pode sufocar o calor emocional que o Amante precisa expressar." },
    ],
  },
  {
    id: "bobo",
    name: "Bobo da Corte",
    alias: "A Arlequina · o comediante, o animador",
    quadrant: "Comunidade e Diversão",
    icon: "/archetypes/bobo.png",
    desire: "Viver o presente com alegria total e divertimento.",
    goal: "Divertir, quebrar o tédio e alegrar o ambiente.",
    fear: "Tédio, parecer maçante, chato ou formal demais.",
    strength: "Espontaneidade, bom humor e alta inteligência social.",
    shadow: "Falta de profundidade ou usar o humor para evitar conversas difíceis.",
    innerPhrase: "A vida pode ser mais leve.",
    voice: "Expressiva, dinâmica, com variações rápidas de tom e ritmo.",
    language: "Espontânea, com metáforas divertidas e piadas inteligentes.",
    communication: "Leve, divertida e avessa a rituais corporativos.",
    sales: "Vende entretenimento, quebra de rotina e descomplicação.",
    leadership: "Humaniza ambientes pesados e quebra tensões em crises.",
    wardrobe: {
      pieces: "Toques divertidos (meias coloridas, estampas), alfaiataria descontraída.",
      colors: "Amarelo (energia), laranja (entusiasmo) e mix de cores quentes.",
      lines: "Estampas ousadas, linhas dinâmicas e assimétricas.",
    },
    paletteColorIds: ["amarelo", "laranja"],
    characters: ["Deadpool", "Burro (Shrek)", "Bob Esponja"],
    brands: ["M&M's", "Old Spice", "Fanta"],
    positioningTips: [
      "Use humor inteligente para destravar temas difíceis, não para evitar profundidade.",
      "Quebre a quarta parede: mostre bastidores divertidos e reais.",
      "Equilibre leveza com competência — humor não é desculpa para falta de qualidade.",
    ],
    matchingPhrases: [
      "Sério, mas sem ser sisudo.",
      "Quem disse que isso precisa ser chato?",
      "Vamos rir um pouco no caminho.",
      "Leve na entrega, séria no resultado.",
    ],
    avoidPhrases: [
      "Conforme protocolo estabelecido em norma vigente...",
      "Piadas em momentos de crise real do cliente.",
      "Tom de deboche que desrespeita a dor do outro.",
      "Linguagem excessivamente solene.",
    ],
    pros: [
      "Quebra tensão e humaniza marcas em setores pesados.",
      "Conteúdo divertido tem alto potencial de compartilhamento.",
      "Cria proximidade rápida e simpatia imediata.",
      "Bom contraponto em comunicações de crise, com o cuidado certo.",
    ],
    cons: [
      "Pode ser visto como raso ou pouco confiável para decisões sérias.",
      "Risco de usar humor para evitar conversas difíceis necessárias.",
      "Difícil comunicar autoridade técnica ou premium.",
      "Humor mal calibrado pode magoar ou ofender.",
    ],
    affinities: [
      { id: "explorador", why: "A espontaneidade do Bobo da Corte combina com o espírito aventureiro do Explorador." },
      { id: "amante", why: "A leveza divertida cria momentos de conexão que aprofundam o vínculo afetivo do Amante." },
    ],
    tensions: [
      { id: "governante", why: "A seriedade e o controle do Governante reprimem a espontaneidade do Bobo da Corte." },
      { id: "sabio", why: "O rigor analítico do Sábio entra em choque com a leveza despreocupada do Bobo da Corte." },
    ],
  },
  {
    id: "cuidador",
    name: "Cuidador",
    alias: "O Prestativo · o altruísta, o ajudante",
    quadrant: "Controle e Estabilidade",
    icon: "/archetypes/cuidador.png",
    desire: "Proteger os outros de danos e sofrimento.",
    goal: "Ajudar o próximo e garantir o bem-estar de quem está ao redor.",
    fear: "Egoísmo, ingratidão ou ser incapaz de dar suporte.",
    strength: "Generosidade, compaixão, paciência e empatia ativa.",
    shadow: "Esquecer de si, sobrecarga, assumir responsabilidades alheias.",
    innerPhrase: "Como posso ajudar você hoje?",
    voice: "Protetora, suave, com ressonância que transmite aconchego.",
    language: "Empática, acolhedora, com termos de apoio emocional.",
    communication: "Acolhedora, focada nas necessidades do outro.",
    sales: "Vende suporte contínuo, segurança e redução de estresse.",
    leadership: "Cuida da carreira da equipe e cria ambiente acolhedor.",
    wardrobe: {
      pieces: "Cardigans, malhas suaves, caimento solto, casacos envolventes.",
      colors: "Verde (acolhimento), bege (conforto e calma).",
      lines: "Linhas arredondadas, tecidos macios, joias afetivas.",
    },
    paletteColorIds: ["verde", "bege"],
    characters: ["Carl & Ellie (Up)", "Baymax", "Hagrid"],
    brands: ["Johnson & Johnson", "Volvo", "UNICEF"],
    positioningTips: [
      "Mostre o cuidado em ações concretas — suporte, follow-up, escuta ativa.",
      "Use linguagem que acolhe antes de vender.",
      "Construa prova social em torno do cuidado e suporte recebido, não só do resultado.",
    ],
    matchingPhrases: [
      "Estamos aqui com você, em cada passo.",
      "Conte comigo para isso.",
      "Cuidar de você é prioridade, não detalhe.",
      "Você não precisa passar por isso sozinho(a).",
    ],
    avoidPhrases: [
      "Resolva isso por conta própria.",
      "Linguagem fria e transacional.",
      "Tom apressado que ignora a dor do cliente.",
      "Promessas vazias de suporte que não se cumprem.",
    ],
    pros: [
      "Constrói lealdade profunda e recomendação espontânea.",
      "Excelente em nichos de saúde, educação e serviços contínuos.",
      "Reduz churn ao priorizar suporte e acompanhamento real.",
      "Cria ambiente de equipe engajado e cuidado de verdade.",
    ],
    cons: [
      "Risco de esgotamento por priorizar o outro acima de si.",
      "Pode parecer piegas se o cuidado não for genuíno.",
      "Dificuldade em estabelecer limites e dizer não.",
      "Pode atrair clientes excessivamente dependentes do suporte.",
    ],
    affinities: [
      { id: "inocente", why: "Ambos constroem segurança emocional — um pela pureza, outro pelo acolhimento." },
      { id: "governante", why: "O Governante dá estrutura ao cuidado contínuo que o Cuidador oferece, evitando o esgotamento." },
    ],
    tensions: [
      { id: "foradalei", why: "O risco assumido pelo Fora da Lei é visto como ameaça pela proteção que o Cuidador busca oferecer." },
      { id: "heroi", why: "A intensidade competitiva do Herói pode ignorar o ritmo de cuidado que o Cuidador defende." },
    ],
  },
  {
    id: "criador",
    name: "Criador",
    alias: "O Artista · o inventor, o sonhador",
    quadrant: "Controle e Estabilidade",
    icon: "/archetypes/criador.png",
    desire: "Criar algo de valor duradouro, inovador e belo.",
    goal: "Dar forma física ou conceitual a ideias e visões.",
    fear: "Mediocridade e visão medíocre na execução.",
    strength: "Imaginação fértil, aptidão artística, pensamento não linear.",
    shadow: "Perfeccionismo paralisante, insatisfação crônica.",
    innerPhrase: "Se pode ser imaginado, pode ser criado.",
    voice: "Expressiva, com ritmo dinâmico e entusiasmo.",
    language: "Criativa, inventiva, com analogias artísticas.",
    communication: "Original, entusiasmada, focada na inovação.",
    sales: "Vende inovação, customização autoral e design exclusivo.",
    leadership: "Estimula a criatividade e elimina a burocracia.",
    wardrobe: {
      pieces: "Cortes arquitetônicos, golas esculturais, óculos de design autoral.",
      colors: "Roxo (premium), amarelo (expande) e grafismo sofisticado.",
      lines: "Peças de design autoral, linhas retas com curvas ousadas.",
    },
    paletteColorIds: ["roxo", "amarelo"],
    characters: ["Geppetto", "Willy Wonka", "Doc Brown"],
    brands: ["LEGO", "Adobe", "Pixar"],
    positioningTips: [
      "Mostre o processo criativo, não só o resultado final — esboços, versões, bastidores.",
      "Invista em design autoral consistente como assinatura de marca.",
      "Comunique exclusividade e originalidade, evitando fórmulas genéricas.",
    ],
    matchingPhrases: [
      "Se pode ser imaginado, criamos juntos.",
      "Original, do conceito à entrega.",
      "Aqui não existe fórmula — existe autoria.",
      "Cada detalhe carrega uma intenção de design.",
    ],
    avoidPhrases: [
      "Usamos o mesmo modelo padrão do mercado.",
      "Linguagem que valoriza cópia ou tendência sem autoria.",
      "Tom apressado que ignora o processo criativo.",
      "Promessas de perfeição instantânea.",
    ],
    pros: [
      "Diferenciação estética forte — a marca se torna reconhecível visualmente.",
      "Atrai público que valoriza originalidade e exclusividade.",
      "Estimula inovação contínua e evolução de produto.",
      "Boa narrativa de marca em torno de processo e autoria.",
    ],
    cons: [
      "Perfeccionismo pode atrasar entregas e lançamentos.",
      "Risco de priorizar estética sobre funcionalidade comercial.",
      "Comunicação pode parecer rebuscada ou inacessível.",
      "Insatisfação crônica com resultados pode minar a confiança da equipe.",
    ],
    affinities: [
      { id: "mago", why: "A visão transformadora do Mago se materializa na execução original do Criador." },
      { id: "explorador", why: "O Explorador traz matéria-prima de experiências que o Criador transforma em algo novo." },
    ],
    tensions: [
      { id: "pessoacomum", why: "A busca por originalidade do Criador pode parecer distante da simplicidade que o Pessoa Comum valoriza." },
      { id: "governante", why: "A estrutura rígida do Governante pode sufocar a experimentação livre que o Criador precisa." },
    ],
  },
  {
    id: "governante",
    name: "Governante",
    alias: "A Soberana · o líder, o administrador",
    quadrant: "Controle e Estabilidade",
    icon: "/archetypes/governante.png",
    desire: "Exercer controle e liderança para organizar e evitar a decadência.",
    goal: "Criar empresa, família ou comunidade próspera e estável.",
    fear: "Caos, desordem e perda de controle ou autoridade.",
    strength: "Responsabilidade, liderança estratégica e organização.",
    shadow: "Rigidez, autoritarismo, dificuldade de delegar, arrogância.",
    innerPhrase: "Preciso criar ordem para que todos prosperem.",
    voice: "Segura, com boa projeção e colocação vocal firme.",
    language: "Objetiva, focada em metas de legado e governança.",
    communication: "Estratégica, clara e imponente.",
    sales: "Vende segurança de longo prazo, status, durabilidade.",
    leadership: "Cria ordem, regras claras e direciona metas de longo prazo.",
    wardrobe: {
      pieces: "Ternos sob medida, blazers com ombreiras, relógios de prestígio.",
      colors: "Vinho (sofisticação), preto (autoridade), marinho ou carvão.",
      lines: "Linhas verticais de corte limpo, joias em ouro de design tradicional.",
    },
    paletteColorIds: ["vinho", "preto"],
    characters: ["Rei Arthur", "Mufasa", "Miranda Priestly (O Diabo Veste Prada)"],
    brands: ["Mercedes-Benz", "Rolex", "American Express"],
    positioningTips: [
      "Comunique padrões claros, garantias e processos estruturados de longo prazo.",
      "Use estética de prestígio — qualidade, acabamento e consistência visual impecável.",
      "Lidere com decisões claras e poucas (mas firmes) palavras.",
    ],
    matchingPhrases: [
      "Aqui, a estrutura sustenta o crescimento.",
      "Construímos para durar.",
      "Ordem gera liberdade — e resultado.",
      "Assumo a responsabilidade por esse padrão.",
    ],
    avoidPhrases: [
      "Vamos ver como dá, sem compromisso.",
      "Linguagem informal em excesso.",
      "Tom hesitante ou de desculpas constantes.",
      "Promessas vagas sem estrutura por trás.",
    ],
    pros: [
      "Transmite segurança e solidez — ótimo para decisões de alto investimento.",
      "Constrói legado e consistência de marca no longo prazo.",
      "Atrai parcerias institucionais e clientes que buscam estabilidade.",
      "Boa liderança em momentos de crise, por trazer ordem.",
    ],
    cons: [
      "Pode parecer rígido, autoritário ou pouco acessível.",
      "Dificuldade em delegar e abrir espaço para o inesperado.",
      "Risco de resistência à mudança necessária.",
      "Comunicação pode soar distante de quem busca proximidade afetiva.",
    ],
    affinities: [
      { id: "sabio", why: "O raciocínio do Sábio sustenta com dados a autoridade estrutural do Governante." },
      { id: "cuidador", why: "O Cuidador humaniza a estrutura criada pelo Governante, evitando frieza." },
    ],
    tensions: [
      { id: "foradalei", why: "A ruptura de regras do Fora da Lei é a antítese da ordem que o Governante defende." },
      { id: "explorador", why: "A liberdade sem rota fixa do Explorador conflita com o controle do Governante." },
    ],
  },
];

// --- The Combination Engine (Cont 6) — quando 2 arquétipos aparecem em destaque juntos ---
export type CombinationRule = {
  id: string;
  archetypeIds: [string, string];
  title: string;
  action: string;
  look: string;
  voiceTip: string;
};

export const combinationRules: CombinationRule[] = [
  {
    id: "governante-amante",
    archetypeIds: ["governante", "amante"],
    title: "Governante + Amante — Autoridade com Conexão",
    action: "Suaviza a rigidez do Governante através do apelo tátil e sensorial do Amante.",
    look: "Blazer estruturado preto (Governante) combinado com uma blusa de seda fluida em tom vinho profundo (Amante).",
    voiceTip: "Firmeza no conteúdo (Soberano) com modulação de tom calorosa (Amante).",
  },
  {
    id: "sabio-governante",
    archetypeIds: ["sabio", "governante"],
    title: "Sábio + Governante — Especialista Estratégico",
    action: "Maximiza o pilar de autoridade intelectual e técnica.",
    look: "Camisa social branca (Sábio/clareza) com terno sob medida cinza-chumbo (Governante) e linhas limpas.",
    voiceTip: "Dicção perfeitamente clara, ritmo lento com pausas de autoridade.",
  },
  {
    id: "criador-explorador",
    archetypeIds: ["criador", "explorador"],
    title: "Criador + Explorador — Inovador Nato",
    action: "Une a originalidade estética com o pragmatismo utilitário de movimento.",
    look: "Peças utilitárias com cortes assimétricos em tons terrosos, combinadas com acessórios de design autoral.",
    voiceTip: "Expressiva e entusiasta, focada em expandir os limites conhecidos.",
  },
  {
    id: "heroi-cuidador",
    archetypeIds: ["heroi", "cuidador"],
    title: "Herói + Cuidador — Guerreiro Generoso",
    action: "Equilibra a intensidade de ação do Herói com o acolhimento do Cuidador, evitando o esgotamento.",
    look: "Jaqueta estruturada de ombros marcados (Herói) sobre uma malha macia em tom verde (Cuidador).",
    voiceTip: "Energia assertiva e motivadora, com toques de acolhimento na escuta.",
  },
  {
    id: "amante-bobo",
    archetypeIds: ["amante", "bobo"],
    title: "Amante + Bobo da Corte — Sedutor Descontraído",
    action: "Suaviza a intensidade afetiva do Amante com a leveza e o humor do Bobo da Corte.",
    look: "Tecido de seda ou cetim (Amante) com um detalhe de estampa divertida ou cor vibrante (Bobo da Corte).",
    voiceTip: "Tom caloroso e envolvente, com toques de humor leve para aliviar a intensidade.",
  },
  {
    id: "pessoacomum-cuidador",
    archetypeIds: ["pessoacomum", "cuidador"],
    title: "Pessoa Comum + Cuidador — Vizinho Solícito",
    action: "Equilibra a simplicidade acessível do Pessoa Comum com o cuidado genuíno do Cuidador.",
    look: "Camisa de algodão simples (Pessoa Comum) com um cardigan envolvente por cima (Cuidador).",
    voiceTip: "Tom coloquial e acolhedor, sem formalidades, mas atento às necessidades do outro.",
  },
];

export function findCombinationRule(idA: string, idB: string): CombinationRule | undefined {
  return combinationRules.find(
    (r) =>
      (r.archetypeIds[0] === idA && r.archetypeIds[1] === idB) ||
      (r.archetypeIds[0] === idB && r.archetypeIds[1] === idA),
  );
}

// Quiz de diagnóstico (Const 5): para cada arquétipo, 0–3 em 4 pilares.
export const diagnosticPillars = ["Desejo", "Meta", "Medo", "Dons"] as const;
export const diagnosticScale = [
  { value: 0, label: "Não me identifico" },
  { value: 1, label: "Identificação leve" },
  { value: 2, label: "Forte identificação" },
  { value: 3, label: "Identificação absoluta" },
];
export const diagnosticMaxPerArchetype = 12;

// As 4 afirmações do quiz por arquétipo, na ordem de diagnosticPillars (Desejo, Meta, Medo, Dons).
export function diagnosticStatements(a: Archetype): [string, string, string, string] {
  return [a.desire, a.goal, a.fear, a.strength];
}

export type ArchetypeQuizScores = Record<string, [number, number, number, number]>;

export type ArchetypeResult = { archetype: Archetype; total: number; percent: number };

// Soma as 4 pontuações (0–3 cada) por arquétipo e ordena do maior para o menor.
export function computeArchetypeResults(scores: ArchetypeQuizScores): ArchetypeResult[] {
  return archetypes
    .map((archetype) => {
      const s = scores[archetype.id] ?? [0, 0, 0, 0];
      const total = s.reduce((acc, v) => acc + v, 0);
      return { archetype, total, percent: Math.round((total / diagnosticMaxPerArchetype) * 100) };
    })
    .sort((a, b) => b.total - a.total);
}

export function getArchetype(id: string): Archetype | undefined {
  return archetypes.find((a) => a.id === id);
}

// Resolve { id, why } em { archetype, why } para uso direto na UI (chips com link).
export function resolveRelations(
  relations: { id: string; why: string }[],
): { archetype: Archetype; why: string }[] {
  return relations
    .map((r) => {
      const archetype = getArchetype(r.id);
      return archetype ? { archetype, why: r.why } : undefined;
    })
    .filter((r): r is { archetype: Archetype; why: string } => r !== undefined);
}

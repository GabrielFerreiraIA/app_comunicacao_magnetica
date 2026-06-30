export interface ColorWheelEntry {
  id: string;
  name: string;
  hex: string;
  angle: number; // position on 360deg circle
  psychology: string; // o que a cor passa
  brands: string[]; // empresas que usam
  recommendedFor: string; // para quem é indicado
  harmonies: {
    complementary: string[];
    analogous: string[];
    triad: string[];
    monochromatic: string[];
  };
}

export const colorWheelData: ColorWheelEntry[] = [
  {
    id: "vermelho",
    name: "Vermelho",
    hex: "#E74C3C",
    angle: 0,
    psychology: "Transmite poder, paixão, urgência, liderança ativa e atrai atenção imediata de forma magnética. Estimula a ação e o dinamismo.",
    brands: ["Coca-Cola", "Netflix", "Red Bull", "Ferrari", "Nintendo"],
    recommendedFor: "Líderes seniores em momentos de destaque, palestrantes principais e profissionais de áreas competitivas que precisam se impor.",
    harmonies: {
      complementary: ["#E74C3C", "#2ECC71"],
      analogous: ["#C0392B", "#E74C3C", "#E67E22"],
      triad: ["#E74C3C", "#3498DB", "#F1C40F"],
      monochromatic: ["#FDEDEC", "#F9D5D2", "#E74C3C", "#C0392B"]
    }
  },
  {
    id: "laranja",
    name: "Laranja",
    hex: "#E67E22",
    angle: 30,
    psychology: "Expressa entusiasmo, criatividade abundante, acessibilidade social, jovialidade, otimismo e espírito de colaboração.",
    brands: ["Orange", "Nickelodeon", "Fanta", "Amazon (detalhes)", "Itaú"],
    recommendedFor: "Profissionais de vendas, facilitadores de dinâmicas, treinadores corporativos e palestrantes que visam conexões horizontais.",
    harmonies: {
      complementary: ["#E67E22", "#3498DB"],
      analogous: ["#E74C3C", "#E67E22", "#F1C40F"],
      triad: ["#E67E22", "#9B59B6", "#2ECC71"],
      monochromatic: ["#FDF2E9", "#FBDECA", "#E67E22", "#A04000"]
    }
  },
  {
    id: "amarelo",
    name: "Amarelo",
    hex: "#F1C40F",
    angle: 60,
    psychology: "Irradia clareza mental, otimismo intelectual, foco no futuro, agilidade cognitiva e desperta o estado de alerta e criatividade.",
    brands: ["McDonald's", "Shell", "DHL", "National Geographic", "Nikon"],
    recommendedFor: "Educadores, estrategistas de inovação, líderes de brainstorming e pioneiros de tecnologia disruptiva.",
    harmonies: {
      complementary: ["#F1C40F", "#9B59B6"],
      analogous: ["#E67E22", "#F1C40F", "#27AE60"],
      triad: ["#F1C40F", "#E91E63", "#1ABC9C"],
      monochromatic: ["#FEF9E7", "#FCF3CF", "#F1C40F", "#B7950B"]
    }
  },
  {
    id: "verde-lima",
    name: "Verde Lima",
    hex: "#27AE60",
    angle: 90,
    psychology: "Simboliza originalidade disruptiva, frescor inovador, crescimento acelerado, energia ecológica e jovialidade ousada.",
    brands: ["Spotify", "Subway", "Sprite", "Xbox (detalhes)", "Android"],
    recommendedFor: "Empreendedores de startups sustentáveis, designers visuais, criadores de conteúdo inovadores e agentes de mudança disruptiva.",
    harmonies: {
      complementary: ["#27AE60", "#9B59B6"],
      analogous: ["#F1C40F", "#27AE60", "#2ECC71"],
      triad: ["#27AE60", "#E67E22", "#3498DB"],
      monochromatic: ["#E8F8F5", "#A3E4D7", "#27AE60", "#117864"]
    }
  },
  {
    id: "verde",
    name: "Verde",
    hex: "#2ECC71",
    angle: 120,
    psychology: "Comunica saúde integral, equilíbrio, acolhimento seguro, cura, estabilidade orgânica e diplomacia de alta confiabilidade.",
    brands: ["Starbucks", "Heineken", "Land Rover", "Whole Foods", "Lacoste"],
    recommendedFor: "Médicos, psicólogos, gestores de RH, mediadores de conflito e profissionais de sustentabilidade ambiental.",
    harmonies: {
      complementary: ["#2ECC71", "#E74C3C"],
      analogous: ["#27AE60", "#2ECC71", "#1ABC9C"],
      triad: ["#2ECC71", "#E67E22", "#9B59B6"],
      monochromatic: ["#EAFAF1", "#A9DFBF", "#2ECC71", "#1E8449"]
    }
  },
  {
    id: "turquesa",
    name: "Turquesa",
    hex: "#1ABC9C",
    angle: 150,
    psychology: "Passa sensação de clareza cristalina, comunicação aberta, modernidade digital, leveza refrescante e alta sofisticação estética.",
    brands: ["Tiffany & Co", "Siemens", "Intel (detalhes)", "Slack (detalhes)", "Medium"],
    recommendedFor: "Designers de UI/UX, terapeutas integrativos, fonoaudiólogos e marcas que atuam em experiências de alto padrão.",
    harmonies: {
      complementary: ["#1ABC9C", "#E67E22"],
      analogous: ["#2ECC71", "#1ABC9C", "#3498DB"],
      triad: ["#1ABC9C", "#9B59B6", "#F1C40F"],
      monochromatic: ["#E0F7FA", "#80DEEA", "#1ABC9C", "#006064"]
    }
  },
  {
    id: "azul",
    name: "Azul",
    hex: "#3498DB",
    angle: 180,
    psychology: "Representa confiança corporativa inabalável, autoridade técnica reconhecida, estabilidade financeira, lógica e calma focada.",
    brands: ["Facebook", "IBM", "Ford", "Samsung", "PayPal", "Visa", "Intel"],
    recommendedFor: "Executivos financeiros, analistas de riscos, engenheiros, advogados societários e porta-vozes governamentais.",
    harmonies: {
      complementary: ["#3498DB", "#D35400"],
      analogous: ["#1ABC9C", "#3498DB", "#2980B9"],
      triad: ["#3498DB", "#E74C3C", "#F1C40F"],
      monochromatic: ["#EBF5FB", "#AED6F1", "#3498DB", "#1A5276"]
    }
  },
  {
    id: "azul-escuro",
    name: "Azul Escuro",
    hex: "#2980B9",
    angle: 210,
    psychology: "Impele maturidade intelectual, alta liderança formal, seriedade analítica, ética absoluta, rigor executivo e foco implacável.",
    brands: ["General Electric", "HP", "LinkedIn", "Boeing", "Debevoise"],
    recommendedFor: "Diretores C-Level, assessores executivos seniores, diplomatas e gestores de fundos de investimento em reuniões cruciais.",
    harmonies: {
      complementary: ["#2980B9", "#F39C12"],
      analogous: ["#3498DB", "#2980B9", "#8E44AD"],
      triad: ["#2980B9", "#27AE60", "#C0392B"],
      monochromatic: ["#EAECEE", "#AEB6BF", "#2980B9", "#1F618D"]
    }
  },
  {
    id: "violeta",
    name: "Violeta",
    hex: "#8E44AD",
    angle: 240,
    psychology: "Evoca sabedoria profunda, espiritualidade refinada, luxo intangível, autoridade sensível e criatividade artística sofisticada.",
    brands: ["Twitch", "Nubank", "Yahoo", "Cadbury", "Hallmark"],
    recommendedFor: "Mentores de liderança, palestrantes motivacionais inspiradores, estilistas e marcas de luxo premium e cosméticos.",
    harmonies: {
      complementary: ["#8E44AD", "#F1C40F"],
      analogous: ["#2980B9", "#8E44AD", "#9B59B6"],
      triad: ["#8E44AD", "#D35400", "#27AE60"],
      monochromatic: ["#F5EEF8", "#D7BDE2", "#8E44AD", "#5B2C6F"]
    }
  },
  {
    id: "roxo",
    name: "Roxo",
    hex: "#9B59B6",
    angle: 270,
    psychology: "Combina a energia vital do vermelho com a estabilidade racional do azul. Representa nobreza criativa, distinção e empoderamento.",
    brands: ["Milka", "Taco Bell", "Instagram (detalhe)", "FedEx (detalhe)"],
    recommendedFor: "Consultores de branding, psicoterapeutas, líderes de iniciativas de empoderamento e criativos focados em transformação.",
    harmonies: {
      complementary: ["#9B59B6", "#F1C40F"],
      analogous: ["#8E44AD", "#9B59B6", "#E91E63"],
      triad: ["#9B59B6", "#E67E22", "#2ECC71"],
      monochromatic: ["#F4ECF7", "#D2B4DE", "#9B59B6", "#6C3483"]
    }
  },
  {
    id: "rosa",
    name: "Rosa",
    hex: "#E91E63",
    angle: 300,
    psychology: "Transmite audácia moderna, magnetismo jovem, afeto empático caloroso, descontração inovadora e posicionamento enérgico.",
    brands: ["T-Mobile", "Barbie", "Cosmopolitan", "Airbnb (detalhes)", "Lyft"],
    recommendedFor: "Líderes de marketing inovadores, marcas voltadas ao público jovem corporativo e oradores que buscam alta simpatia imediata.",
    harmonies: {
      complementary: ["#E91E63", "#2ECC71"],
      analogous: ["#9B59B6", "#E91E63", "#E74C3C"],
      triad: ["#E91E63", "#3498DB", "#F1C40F"],
      monochromatic: ["#FCE4EC", "#F8BBD0", "#E91E63", "#880E4F"]
    }
  },
  {
    id: "marrom",
    name: "Marrom",
    hex: "#A04000",
    angle: 330,
    psychology: "Conecta-se a valores sólidos como estabilidade pétrea, tradição duradoura, honestidade pragmática, acolhimento físico e pé no chão.",
    brands: ["UPS", "Louis Vuitton", "Hershey's", "Nespresso", "Timberland"],
    recommendedFor: "Conselheiros seniores de carreira, arquitetos, diretores de empresas tradicionais e profissionais de hospitalidade executiva.",
    harmonies: {
      complementary: ["#A04000", "#1ABC9C"],
      analogous: ["#E67E22", "#A04000", "#E74C3C"],
      triad: ["#A04000", "#2E4053", "#27AE60"],
      monochromatic: ["#F9EBEA", "#F2D7D5", "#A04000", "#641E16"]
    }
  }
];

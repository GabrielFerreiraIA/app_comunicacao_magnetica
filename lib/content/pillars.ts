// Metadados dos 5 Pilares. `icon` é o nome do ícone Lucide (mapeado na UI).

export type Pillar = {
  slug: string;
  num: string; // numeral romano
  title: string;
  eyebrow: string;
  subtitle: string;
  icon: string; // chave Lucide
};

export const pillars: Pillar[] = [
  {
    slug: "voz",
    num: "I",
    title: "Voz e Mensagem Não-Verbal",
    eyebrow: "Pilar I",
    subtitle: "Cuidados vocais e preparação para falar com presença.",
    icon: "AudioLines",
  },
  {
    slug: "arquetipos",
    num: "II",
    title: "Guia de Arquétipos",
    eyebrow: "Pilar II",
    subtitle: "Descubra e aplique a sua identidade de comunicação.",
    icon: "Drama",
  },
  {
    slug: "imagem",
    num: "III",
    title: "Imagem com Inteligência",
    eyebrow: "Pilar III",
    subtitle: "Psicologia das cores: vista-se para comunicar.",
    icon: "Palette",
  },
  {
    slug: "lideranca",
    num: "IV",
    title: "Liderança e Presença Executiva",
    eyebrow: "Pilar IV",
    subtitle: "Corpo, ambientes e gestão emocional sob pressão.",
    icon: "Crown",
  },
  {
    slug: "carisma",
    num: "V",
    title: "O Código do Carisma",
    eyebrow: "Pilar V",
    subtitle: "Assertividade, escuta ativa e conexão imediata.",
    icon: "Handshake",
  },
];

export function getPillar(slug: string): Pillar | undefined {
  return pillars.find((p) => p.slug === slug);
}

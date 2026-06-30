// Configuração da marca e links externos.

export const siteConfig = {
  name: "Comunicação Magnética",
  shortName: "Magnética",
  tagline: "Sua presença, comunicada com intenção.",
  author: "Hélia Gonçalves",
};

// Número do WhatsApp da mentoria (definir em .env.local: NEXT_PUBLIC_WHATSAPP).
// Formato internacional só com dígitos, ex.: 5511999999999.
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "5500000000000";

// Telefone oficial da mentoria da Hélia
export const MENTORIA_PHONE = "553197975322";

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export function mentoriaWhatsappLink(message: string): string {
  return `https://wa.me/${MENTORIA_PHONE}?text=${encodeURIComponent(message)}`;
}

export const mentoriaMessage =
  "Olá, Hélia! Vim pelo app Comunicação Magnética e quero saber mais sobre a Mentoria.";

export const mentoriaCustomMessage =
  "Olá Hélia! Quero acelerar meus resultados com a Comunicação Magnética e saber mais sobre a sua mentoria personalizada.";

export const arquetipoMessage =
  "Olá, Hélia! Quero descobrir meu arquétipo exato e como aplicá-lo na minha comunicação.";

export const suporteMessage =
  "Olá! Preciso de suporte com o app Comunicação Magnética.";


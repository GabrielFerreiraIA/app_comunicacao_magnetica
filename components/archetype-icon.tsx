import Image from "next/image";
import type { Archetype } from "@/lib/content/archetypes";
import { cn } from "@/lib/utils";

// `archetype.icon` é hoje um emoji-placeholder. Quando a Hélia enviar a arte do
// personagem de cada arquétipo, basta trocar o valor por um caminho de imagem
// (ex.: "/archetypes/inocente.png") — este componente detecta o formato e troca
// automaticamente de emoji para <Image>, sem precisar tocar em nenhum outro lugar.
const sizeMap = {
  sm: "size-10 text-base border",
  md: "size-14 text-xl border-[1.5px]",
  lg: "size-20 text-3xl border-2",
} as const;

export function ArchetypeIcon({
  archetype,
  size = "md",
  className,
}: {
  archetype: Archetype;
  size?: keyof typeof sizeMap;
  className?: string;
}) {
  const isImage = archetype.icon.startsWith("/");

  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border-gold/35 bg-secondary shadow-xs",
        sizeMap[size],
        className,
      )}
    >
      {isImage ? (
        <Image
          src={archetype.icon}
          alt={archetype.name}
          fill
          className="object-cover object-top origin-top scale-[1.55] translate-y-[6%] transition-transform duration-300"
        />
      ) : (
        <span aria-hidden>{archetype.icon}</span>
      )}
    </span>
  );
}


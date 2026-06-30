import {
  AudioLines,
  Crown,
  Drama,
  Handshake,
  Palette,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  AudioLines,
  Drama,
  Palette,
  Crown,
  Handshake,
  Sparkles,
};

export function PillarIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = map[name] ?? Sparkles;
  return <Icon className={className} />;
}

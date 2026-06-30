"use client";

import { Home, LayoutGrid, Sparkles, User } from "lucide-react";
import { MenuBar } from "@/components/ui/glow-menu";

const menuItems = [
  {
    icon: Home,
    label: "Início",
    href: "/",
    gradient:
      "radial-gradient(circle, rgba(201,162,39,0.15) 0%, rgba(201,162,39,0.06) 50%, rgba(201,162,39,0) 100%)",
    iconColor: "text-gold-bright",
  },
  {
    icon: LayoutGrid,
    label: "Pilares",
    href: "/pilares",
    gradient:
      "radial-gradient(circle, rgba(137,84,194,0.15) 0%, rgba(92,45,145,0.06) 50%, rgba(92,45,145,0) 100%)",
    iconColor: "text-orchid",
  },
  {
    icon: Sparkles,
    label: "Kit IA",
    href: "/kit-ia",
    gradient:
      "radial-gradient(circle, rgba(236,211,122,0.15) 0%, rgba(201,162,39,0.06) 50%, rgba(201,162,39,0) 100%)",
    iconColor: "text-gold-bright",
  },
  {
    icon: User,
    label: "Perfil",
    href: "/perfil",
    gradient:
      "radial-gradient(circle, rgba(199,85,107,0.15) 0%, rgba(199,85,107,0.06) 50%, rgba(199,85,107,0) 100%)",
    iconColor: "text-[#c7556b]",
  },
];

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto max-w-md px-4 pb-[env(safe-area-inset-bottom)]">
        <div className="mb-3">
          <MenuBar items={menuItems} />
        </div>
      </div>
    </nav>
  );
}

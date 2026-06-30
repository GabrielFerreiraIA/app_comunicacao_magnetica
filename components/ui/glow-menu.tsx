"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface MenuItem {
  icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>
  label: string
  href: string
  gradient: string
  iconColor: string
}

interface MenuBarProps {
  items: MenuItem[]
  className?: string
}

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
}

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
}

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
      scale: { duration: 0.5, type: "spring" as const, stiffness: 300, damping: 25 },
    },
  },
}

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
}

const sharedTransition = {
  type: "spring" as const,
  stiffness: 120,
  damping: 18,
  duration: 0.4,
}

export const MenuBar = React.forwardRef<HTMLElement, MenuBarProps>(
  ({ className, items }, ref) => {
    const pathname = usePathname()
    const { theme } = useTheme()
    const isDarkTheme = theme === "dark" || true // Default to premium dark/purple style

    return (
      <motion.nav
        ref={ref}
        className={cn(
          "p-1.5 rounded-[22px] bg-card/85 backdrop-blur-xl border border-border/80 shadow-lg relative overflow-hidden w-full",
          className,
        )}
        initial="initial"
        whileHover="hover"
      >
        {/* Glow de Fundo do Menu */}
        <motion.div
          className={`absolute -inset-4 bg-gradient-radial from-transparent ${
            isDarkTheme
              ? "via-gold-champagne/10 via-30% via-orchid/15 via-60% via-[#c7556b]/10 via-90%"
              : "via-gold/5 via-30% via-orchid/10 via-60% via-[#c7556b]/5 via-90%"
          } to-transparent rounded-[32px] z-0 pointer-events-none`}
          variants={navGlowVariants}
        />
        
        <ul className="flex items-center justify-around gap-1 relative z-10 w-full">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = item.href === "/" 
              ? pathname === "/" 
              : pathname.startsWith(item.href)

            return (
              <li key={item.label} className="relative flex-1 max-w-[110px]">
                <Link href={item.href} className="block w-full">
                  <motion.div
                    className="block rounded-2xl overflow-visible group relative py-1"
                    style={{ perspective: "600px" }}
                    whileHover="hover"
                    initial="initial"
                  >
                    {/* Brilho específico do item ativo / hover */}
                    <motion.div
                      className="absolute inset-0 z-0 pointer-events-none"
                      variants={glowVariants}
                      animate={isActive ? "hover" : "initial"}
                      style={{
                        background: item.gradient,
                        opacity: isActive ? 1 : 0,
                        borderRadius: "14px",
                      }}
                    />

                    {/* Lado A da animação 3D (Frente) */}
                    <motion.div
                      className={cn(
                        "flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 px-1 py-1.5 relative z-10 bg-transparent transition-colors rounded-xl text-center",
                        isActive
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                      variants={itemVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center bottom",
                      }}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-300 shrink-0",
                          isActive ? item.iconColor : "text-muted-foreground group-hover:text-foreground",
                        )}
                      >
                        <Icon className="size-4.5" />
                      </span>
                      <span className="text-[10px] sm:text-[11px] tracking-tight truncate max-[360px]:hidden">
                        {item.label}
                      </span>
                    </motion.div>

                    {/* Lado B da animação 3D (Trás) */}
                    <motion.div
                      className={cn(
                        "flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 px-1 py-1.5 absolute inset-0 z-10 bg-transparent transition-colors rounded-xl text-center",
                        isActive
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                      variants={backVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center top",
                        rotateX: 90,
                      }}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-300 shrink-0",
                          isActive ? item.iconColor : "text-muted-foreground group-hover:text-foreground",
                        )}
                      >
                        <Icon className="size-4.5" />
                      </span>
                      <span className="text-[10px] sm:text-[11px] tracking-tight truncate max-[360px]:hidden">
                        {item.label}
                      </span>
                    </motion.div>

                  </motion.div>
                </Link>
              </li>
            )
          })}
        </ul>
      </motion.nav>
    )
  },
)

MenuBar.displayName = "MenuBar"

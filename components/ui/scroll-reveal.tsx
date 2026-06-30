"use client";

import { motion } from "framer-motion";
import React from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
}

export function ScrollReveal({ children, delay = 0, className, yOffset = 18 }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        type: "spring" as const,
        stiffness: 110,
        damping: 18,
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

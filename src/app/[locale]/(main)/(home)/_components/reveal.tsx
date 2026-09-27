"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

export function Reveal({ children,
  className,
  delay = 0 }: { children: ReactNode;
  className?: string;
  delay?: number; }) { return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  ); }

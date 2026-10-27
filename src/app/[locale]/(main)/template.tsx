"use client";

import type { ReactNode } from "react";
import { MotionConfig, motion } from "motion/react";

// template.tsx remounts on every navigation, giving each page an entrance
// transition. Keep transforms at their defaults when settled so sticky/fixed
// children are never trapped in a containing block.
export default function Template({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}

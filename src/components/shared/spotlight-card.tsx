"use client";

import { useRef, type CSSProperties, type HTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  /** Glow color used for the cursor spotlight, e.g. "rgba(0,240,255,0.12)" */
  glow?: string;
};

/**
 * Card wrapper with a cursor-tracked radial spotlight (hover interactive
 * lighting). The highlight follows `--mx` / `--my` custom properties set on
 * mouse move; no re-render is triggered.
 */
export function SpotlightCard({ children, className, glow = "rgba(0,240,255,0.1)", onMouseMove, ...props }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      el.style.setProperty("--my", `${event.clientY - rect.top}px`);
    }
    onMouseMove?.(event);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn("group/spotlight relative", className)}
      style={{ "--glow": glow } as CSSProperties}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100 motion-reduce:transition-none"
        style={{
          background: `radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), var(--glow), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}

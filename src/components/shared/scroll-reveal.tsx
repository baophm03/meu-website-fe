"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /**
   * CSS selector for descendants that should animate individually with a
   * stagger (e.g. "[data-reveal-item]"). When omitted the wrapper itself
   * animates as a single block.
   */
  itemSelector?: string;
  y?: number;
  stagger?: number;
  duration?: number;
  delay?: number;
  start?: string;
};

/**
 * GSAP + ScrollTrigger reveal.
 * Elements fade in and slide up once when they enter the viewport.
 * Respects prefers-reduced-motion by rendering content statically.
 */
export function ScrollReveal({
  children,
  className,
  itemSelector,
  y = 40,
  stagger = 0.15,
  duration = 0.9,
  delay = 0,
  start = "top 82%",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tween: gsap.core.Tween | undefined;
    const ctx = gsap.context(() => {
      const targets = itemSelector ? gsap.utils.toArray<HTMLElement>(itemSelector, el) : [el];
      if (!targets.length) return;

      tween = gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: "power3.out",
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        },
      );
    }, el);

    // Fail-safe: if the trigger already passed before refresh/layout settled,
    // force completion so content never stays invisible.
    const failsafe = window.setTimeout(() => {
      if (tween && tween.progress() === 0) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95) tween.progress(1);
      }
    }, 1500);

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
    };
  }, [itemSelector, y, stagger, duration, delay, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

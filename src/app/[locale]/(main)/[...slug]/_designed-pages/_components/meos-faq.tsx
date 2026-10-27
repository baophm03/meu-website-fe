"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function MeosFaq({
  items,
  tone = "light",
  accent = "#1768D6",
}: {
  items: { q: string; a: string }[];
  tone?: "light" | "dark";
  accent?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const dark = tone === "dark";

  if (items.length === 0) return null;

  return (
    <div className={cn("divide-y", dark ? "divide-white/10" : "divide-border")}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className={cn(
                "flex w-full items-center justify-between gap-6 py-5 text-left transition-colors",
                dark ? "text-white hover:text-white/80" : "text-foreground hover:text-foreground/70",
              )}
            >
              <span className="text-[15px] font-medium leading-snug sm:text-[16px]">{item.q}</span>
              <ChevronDown
                aria-hidden="true"
                className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")}
                style={{ color: accent }}
              />
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-200 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className={cn("max-w-[760px] pb-5 text-[14px] leading-[1.7]", dark ? "text-white/60" : "text-muted-foreground")}>
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

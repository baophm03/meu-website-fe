"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function MeosDiscovery({
  items,
  accent = "#1768D6",
}: {
  items: { need: string; product: string; desc: string; href: string }[];
  accent?: string;
}) {
  const [active, setActive] = useState(0);
  const current = items[active];
  if (!current) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
      <ul className="flex flex-col">
        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <li key={item.need}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={cn(
                  "group flex w-full items-center justify-between gap-4 border-b py-4 text-left transition-colors sm:py-5",
                  isActive ? "border-transparent" : "border-border",
                )}
              >
                <span className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold transition-colors",
                      isActive ? "border-transparent text-white" : "border-border text-muted-foreground",
                    )}
                    style={isActive ? { backgroundColor: accent } : undefined}
                  >
                    {`0${i + 1}`}
                  </span>
                  <span
                    className={cn(
                      "text-[15px] font-medium leading-snug transition-colors sm:text-[16px]",
                      isActive ? "text-foreground" : "text-foreground/70 group-hover:text-foreground",
                    )}
                  >
                    {item.need}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className={cn(
                    "h-4 w-4 shrink-0 transition-all",
                    isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0",
                  )}
                  style={{ color: accent }}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <div
        className="flex h-fit flex-col gap-4 rounded-2xl border border-border bg-white p-8 sm:p-10"
        style={{ boxShadow: `0 24px 60px -32px ${accent}55` }}
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: accent }}>
          {current.product}
        </span>
        <p className="text-[15px] leading-[1.7] text-muted-foreground">{current.desc}</p>
        <Link
          href={current.href}
          className="group mt-2 inline-flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.1em] text-foreground transition-colors hover:text-foreground/70"
        >
          <span
            aria-hidden="true"
            className="h-px w-8 transition-all group-hover:w-12"
            style={{ backgroundColor: accent }}
          />
          {current.product}
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

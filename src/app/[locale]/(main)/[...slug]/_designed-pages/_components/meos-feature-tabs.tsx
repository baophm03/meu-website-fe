"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function MeosFeatureTabs({
  tabs,
  accent = "#1768D6",
  idPrefix = "meos-feature",
}: {
  tabs: { title: string; desc: string; points: string[]; image?: string }[];
  accent?: string;
  idPrefix?: string;
}) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  if (!tab) return null;

  const focusTab = (i: number) => {
    setActive(i);
    document.getElementById(`${idPrefix}-tab-${i}`)?.focus();
  };

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      focusTab((i + 1) % tabs.length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      focusTab((i - 1 + tabs.length) % tabs.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusTab(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusTab(tabs.length - 1);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-12">
      <div
        role="tablist"
        aria-label="Feature tabs"
        className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {tabs.map((item, i) => {
          const isActive = i === active;
          return (
            <button
              key={item.title}
              id={`${idPrefix}-tab-${i}`}
              type="button"
              onClick={() => setActive(i)}
              onKeyDown={(e) => onTabKeyDown(e, i)}
              aria-selected={isActive}
              aria-controls={`${idPrefix}-panel-${i}`}
              tabIndex={isActive ? 0 : -1}
              role="tab"
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-[14px] font-medium transition-colors lg:w-full",
                isActive
                  ? "border-transparent text-white"
                  : "border-border bg-white text-foreground hover:border-primary/40",
              )}
              style={isActive ? { backgroundColor: accent } : undefined}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-bold",
                  isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground",
                )}
              >
                {`0${i + 1}`}
              </span>
              <span className="whitespace-nowrap lg:whitespace-normal">{item.title}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`${idPrefix}-panel-${active}`}
        role="tabpanel"
        aria-labelledby={`${idPrefix}-tab-${active}`}
        tabIndex={0}
        className="overflow-hidden rounded-2xl border border-border bg-white"
      >
        <div className="grid gap-6 p-7 sm:p-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <h3 className="text-[20px] font-semibold leading-tight text-foreground">{tab.title}</h3>
            <p className="mt-3 text-[14px] leading-[1.7] text-muted-foreground">{tab.desc}</p>
            <ul className="mt-5 space-y-2.5">
              {tab.points.filter(Boolean).map((point) => (
                <li key={point} className="flex gap-2.5 text-[13.5px] leading-[1.6] text-foreground/80">
                  <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent }} strokeWidth={2.5} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted">
            {tab.image ? (
              <Image src={tab.image} alt={tab.title} fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(15,23,42,0.02)_10px,rgba(15,23,42,0.02)_20px)]">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground/60">
                  {tab.title}
                </span>
                <span className="text-[12px] text-muted-foreground/50">Screenshot cập nhật sau</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

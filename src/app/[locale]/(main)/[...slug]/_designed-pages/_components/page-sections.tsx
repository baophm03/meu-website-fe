import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";

/**
 * Shared page chrome for every static (non-home) page — the single source of
 * truth for the page hero, section headers and section shell. Pages import
 * these instead of carrying divergent local copies, so the typography and
 * composition stay identical across the site.
 *
 * Design language: quiet luxury — one dominant lightweight display face,
 * generous whitespace, hairline rules, a single primary-blue accent. Nothing
 * else competes with the headline.
 */

export const shell = "container";

/** Display type token — light weight, tight tracking; headings only. */
export const displayHeading = "font-light tracking-[-0.035em] text-balance";

/** Micro label token — small, uppercase, wide tracking. */
export const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

/**
 * Page hero — full-bleed dark band under the fixed header. Left-aligned,
 * bottom-anchored, editorial: hairline + eyebrow, one large light-weight
 * headline, an optional short summary. Accent spans passed inside `title`
 * are given weight so the two-part headline reads as a deliberate pairing.
 */
export function PageHero({ eyebrow,
  title,
  summary,
  image = null }: {
    eyebrow: string;
    title: ReactNode;
    summary?: string;
    image?: string | null;
    children?: ReactNode;
  }) {
  return (
    <section aria-labelledby="page-hero-title" className="relative -mt-[68px] overflow-hidden border-b border-white/[0.06] bg-surface-dark text-white">
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="pointer-events-none object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,8,0.92)_0%,rgba(5,6,8,0.78)_55%,rgba(5,6,8,0.6)_100%)]"
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_75%_at_18%_100%,rgba(49,92,255,0.16),transparent_62%)]"
        />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[68px] mx-auto h-px max-w-[1320px] bg-white/[0.07]"
      />
      <Reveal className={cn(shell, "relative")}>
        <div className="flex min-h-[420px] items-end pb-14 pt-32 sm:min-h-[480px] sm:pb-16 lg:min-h-[520px]">
          <div className="max-w-[760px]">
            <div className="flex items-center gap-4">
              <p id="page-hero-eyebrow" className={cn(label, "text-primary-light")}>{eyebrow}</p>
            </div>
            <h1
              id="page-hero-title"
              className={cn(displayHeading, "font-barlow mt-6 text-[32px] font-bold leading-[0.98] sm:text-[42px] lg:text-[54px] [&_span]:font-bold")}
            >
              {title}
            </h1>
            {summary ? (
              <p className="mt-6 max-w-[560px] text-[14px] leading-[1.75] text-white/60 sm:text-[15px]">
                {summary}
              </p>
            ) : null}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/**
 * Section header — single-column, headline-first. Hairline + eyebrow on top,
 * the large light-weight title as the clear focal point, optional summary
 * constrained below, optional action aligned to the headline's baseline.
 * No multi-column split: hierarchy comes from type scale, not layout.
 */
export function SectionHead({ id,
  index,
  eyebrow,
  title,
  summary,
  tone = "light",
  action }: {
    id?: string;
    index?: string;
    eyebrow: string;
    title: ReactNode;
    summary?: string;
    tone?: "light" | "dark";
    action?: ReactNode;
  }) {
  const dark = tone === "dark";
  return (
    <div className="mb-12 sm:mb-16 lg:mb-20">
      <div className="flex items-center gap-4">
        {index ? <span className={cn(label, "tabular-nums", dark ? "text-white/40" : "text-muted-foreground")}>{index}</span> : null}
        <p className={cn(label, dark ? "text-primary-light" : "text-primary")}>{eyebrow}</p>
        {action ? <div className="ml-auto shrink-0">{action}</div> : null}
      </div>
      <h2
        id={id}
        className={cn(
          displayHeading,
          "font-barlow mt-6 text-[28px] font-bold leading-[1.1] sm:text-[38px] lg:text-[48px] [&_span]:font-bold",
          dark ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {summary ? (
        <p className={cn("mt-5 max-w-[640px] text-[15px] leading-[1.75]", dark ? "text-white/60" : "text-muted-foreground")}>
          {summary}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Section shell — transparent so the shared ambient backdrop on the (main)
 * layout carries the visual field across every page.
 */
export function Section({ id,
  variant = "white",
  className,
  children,
  labelledBy }: {
    id?: string;
    variant?: "white" | "surface" | "dark" | "light";
    className?: string;
    children: ReactNode;
    labelledBy?: string;
  }) {
  return (
    <section id={id} aria-labelledby={labelledBy} data-variant={variant} className={cn("scroll-mt-20 py-16 sm:py-24 lg:py-[128px]", variant === "light" ? "text-foreground" : "text-white", className)}>
      <Reveal className={shell}>{children}</Reveal>
    </section>
  );
}

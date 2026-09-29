import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/** Minimal centered on a blueprint grid + glow (Vercel/Linear). */
export function CtaGrid({ eyebrow, heading1, heading2, description, ...actions }: CtaProps) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-y border-white/10 bg-surface-dark py-24 text-white lg:py-[140px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_55%_65%_at_50%_50%,#000_30%,transparent_78%)]"
      />
      <ScrollReveal className={cn(shell, "relative text-center")} y={44}>
        <Eyebrow centered>{eyebrow}</Eyebrow>
        <h2 id="cta-title" className={cn(displayHeading, "mx-auto mt-9 max-w-[980px] text-[38px] leading-[1] sm:text-[54px] lg:text-[68px]")}>
          {heading1}
          {heading2 ? (
            <>
              <br />
              <Soft>{heading2}</Soft>
            </>
          ) : null}
        </h2>
        <p className="mx-auto mt-8 max-w-[600px] text-[15px] leading-[1.7] text-white/55 sm:text-[17px]">
          {description}
        </p>
        <CtaActions {...actions} className="mt-12 sm:justify-center" />
      </ScrollReveal>
    </section>
  );
}

const shell = "container";

const displayHeading = "font-medium tracking-[-0.045em] text-balance";

const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

type CtaProps = {
  eyebrow: string;
  heading1: string;
  heading2?: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  image?: string;
};

function Soft({ children }: { children: ReactNode }) { return <span className="text-white/45">{children}</span>; }

function Eyebrow({ children, centered = false }: { children: ReactNode; centered?: boolean }) {
  return (
    <span className={cn(label, "inline-flex items-center gap-3 text-[#00f0ff]")}>
      <i aria-hidden="true" className="h-px w-8 bg-[#00f0ff]/70" />
      {children}
      {centered ? <i aria-hidden="true" className="h-px w-8 bg-[#00f0ff]/70" /> : null}
    </span>
  );
}

const buttonBase =
  "group inline-flex min-h-[52px] items-center justify-between gap-8 px-6 text-[12px] font-bold uppercase tracking-[0.08em] transition duration-200 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-primary-light motion-reduce:transition-none";

function PrimaryButton({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn(buttonBase, "border border-primary bg-primary text-white hover:border-primary-hover hover:bg-primary-hover", className)}>
      {children}
      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </Link>
  );
}

function SecondaryButton({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(buttonBase, "border border-white/35 text-white hover:border-white hover:bg-white/5", className)}
    >
      {children}
      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </Link>
  );
}

function CtaActions({ primaryHref, primaryLabel, secondaryHref, secondaryLabel, className }: Pick<CtaProps, "primaryHref" | "primaryLabel" | "secondaryHref" | "secondaryLabel"> & { className?: string }) {
  return (
    <div className={cn("mt-10 flex flex-col gap-3 sm:flex-row", className)}>
      <PrimaryButton href={primaryHref}>{primaryLabel}</PrimaryButton>
      {secondaryHref && secondaryLabel ? (
        <SecondaryButton href={secondaryHref}>{secondaryLabel}</SecondaryButton>
      ) : null}
    </div>
  );
}

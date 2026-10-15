import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/** Centered statement on a deep glow backdrop (original design, photo-free). */
export function CtaCinematic({ heading1, heading2, description, ...actions }: CtaProps) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-y border-white/10 bg-surface-dark py-24 text-white lg:py-[140px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_62%_70%_at_50%_108%,rgba(6,62,142,0.45),transparent_72%)]"
      />
      <ScrollReveal className={cn(shell, "relative text-center")} y={44}>
        <h2 id="cta-title" className={cn(displayHeading, "mx-auto max-w-[1040px] text-[40px] leading-[0.98] sm:text-[58px] lg:text-[72px]")}>
          {heading1}
          {heading2 ? (
            <>
              <br />
              <Soft>{heading2}</Soft>
            </>
          ) : null}
        </h2>
        <p className="mx-auto mt-8 max-w-[620px] text-[16px] leading-[1.65] text-white/60 sm:text-[18px]">
          {description}
        </p>
        <CtaActions {...actions} className="sm:justify-center" />
      </ScrollReveal>
    </section>
  );
}

const shell = "container";

const displayHeading = "font-medium tracking-[-0.045em] text-balance";

type CtaProps = {
  heading1: string;
  heading2?: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

function Soft({ children }: { children: ReactNode }) { return <span className="text-white/45">{children}</span>; }

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

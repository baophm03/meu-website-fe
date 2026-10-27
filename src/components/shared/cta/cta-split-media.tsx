import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/** Content left, soft glow bleeding in from the right edge (OpenAI-style). */
export function CtaSplitMedia({ heading1, heading2, description, ...actions }: CtaProps) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-y border-white/10 bg-surface-dark text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_85%_at_100%_50%,rgba(6,62,142,0.4),transparent_70%)]"
      />
      <ScrollReveal className={cn(shell, "relative")} y={44}>
        <div className="max-w-[640px] py-20 sm:py-24 lg:py-[128px]">
          <h2 id="cta-title" className={cn(displayHeading, "text-[34px] leading-[1] sm:text-[48px] lg:text-[60px]")}>
            {heading1}
            {heading2 ? (
              <>
                <br />
                <Soft>{heading2}</Soft>
              </>
            ) : null}
          </h2>
          <p className="mt-7 max-w-[480px] text-[15px] leading-[1.65] text-white/60 sm:text-[16px]">
            {description}
          </p>
          <CtaActions {...actions} />
        </div>
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

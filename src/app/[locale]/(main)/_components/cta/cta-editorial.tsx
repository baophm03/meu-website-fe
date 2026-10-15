import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";

/** Editorial band: oversized heading left, accent-quoted copy + actions right (IBM/Accenture). */
export function CtaEditorial({ heading1, heading2, description, ...actions }: CtaProps) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-y border-white/10 bg-surface-dark text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_70%_at_88%_10%,rgba(6,62,142,0.35),transparent_70%)]"
      />
      <ScrollReveal className={cn(shell, "relative")} y={44}>
        <div className="grid items-end gap-10 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-20 lg:py-[104px]">
          <h2 id="cta-title" className={cn(displayHeading, "text-[38px] leading-[0.98] sm:text-[54px] lg:text-[76px]")}>
            {heading1}
            {heading2 ? (
              <>
                {" "}
                <Soft>{heading2}</Soft>
              </>
            ) : null}
          </h2>
          <div className="flex flex-col gap-8 lg:pb-2">
            <p className="border-l-2 border-primary pl-6 text-[15px] leading-[1.75] text-white/60 sm:text-[16px]">
              {description}
            </p>
            <CtaActions {...actions} className="mt-0 sm:flex-col" />
          </div>
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

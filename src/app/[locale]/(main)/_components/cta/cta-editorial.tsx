import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";

/** Editorial band: eyebrow rail + oversized heading left, accent-quoted copy + actions right (IBM/Accenture). */
export function CtaEditorial({ eyebrow, heading1, heading2, description, hideEyebrowRail = false, ...actions }: CtaProps) {
  return (
    <section aria-labelledby="cta-title" className="border-y border-white/10 bg-surface-dark text-white">
      <ScrollReveal className={shell} y={44}>
        {/* Top rail — eyebrow + rule + oversized arrow */}
        {hideEyebrowRail ? null : (
          <div className="flex items-center gap-6 border-b border-white/10 py-7 sm:py-9">
            <span className={cn(label, "flex items-center gap-3 text-[#00f0ff]")}>
              <i aria-hidden="true" className="h-px w-8 shrink-0 bg-[#00f0ff]/70" />
              {eyebrow}
            </span>
            <i aria-hidden="true" className="h-px flex-1 bg-white/10" />
            <ArrowUpRight aria-hidden="true" className="h-8 w-8 shrink-0 text-primary sm:h-10 sm:w-10" strokeWidth={1.5} />
          </div>
        )}

        {/* Body — display heading left, quoted copy + actions right */}
        <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-20 lg:py-[110px]">
          <h2 id="cta-title" className={cn(displayHeading, "text-[42px] leading-[0.95] sm:text-[60px] lg:text-[84px]")}>
            {heading1}
            {heading2 ? (
              <>
                {" "}
                <Soft>{heading2}</Soft>
              </>
            ) : null}
          </h2>
          <div className="flex flex-col justify-end gap-10 lg:pb-3">
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
  hideEyebrowRail?: boolean;
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

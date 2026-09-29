import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/** Content left, edge-to-edge image right (OpenAI-style). */
export function CtaSplitMedia({ eyebrow, heading1, heading2, description, image = DEFAULT_IMAGE, ...actions }: CtaProps) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-surface-dark text-white">
      <ScrollReveal className={cn(shell, "relative z-10")} y={44}>
        <div className="max-w-[600px] py-20 lg:py-[150px]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="cta-title" className={cn(displayHeading, "mt-8 text-[34px] leading-[1] sm:text-[48px] lg:text-[60px]")}>
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
      <div aria-hidden="true" className="relative h-[300px] sm:h-[380px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[48%]">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="pointer-events-none object-cover"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,6,8,0.9)_0%,rgba(5,6,8,0.35)_45%,rgba(5,6,8,0.05)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,6,8,0.7)_0%,transparent_40%)] lg:hidden"
        />
      </div>
    </section>
  );
}

const shell = "container";

const displayHeading = "font-medium tracking-[-0.045em] text-balance";

const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

const DEFAULT_IMAGE = "/images/cta-bg.jpg";

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

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/** Rounded card split, content left / image right (Stripe). */
export function CtaPanel({ eyebrow, heading1, heading2, description, image = DEFAULT_IMAGE, ...actions }: CtaProps) {
  return (
    <section aria-labelledby="cta-title" className="py-16 text-white sm:py-24 lg:py-[128px]">
      <ScrollReveal className={shell} y={44}>
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface-dark">
          <div className="relative grid lg:grid-cols-[1.15fr_1fr]">
            <div className="p-8 sm:p-12 lg:p-16">
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2 id="cta-title" className={cn(displayHeading, "mt-8 text-[34px] leading-[1] sm:text-[46px] lg:text-[56px]")}>
                {heading1}
                {heading2 ? (
                  <>
                    {" "}
                    <Soft>{heading2}</Soft>
                  </>
                ) : null}
              </h2>
              <p className="mt-7 max-w-[520px] text-[15px] leading-[1.65] text-white/60 sm:text-[16px]">
                {description}
              </p>
              <CtaActions {...actions} />
            </div>
            <div className="relative min-h-[260px] border-t border-white/10 lg:min-h-0 lg:border-l lg:border-t-0">
              <Image
                src={image}
                alt=""
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="pointer-events-none object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(5,6,8,0.55)_0%,rgba(5,6,8,0.15)_55%,transparent_100%)]"
              />
            </div>
          </div>
        </div>
      </ScrollReveal>
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

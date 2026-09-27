import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const shell = "container";
const displayHeading = "font-medium tracking-[-0.045em] text-balance";
const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

export { shell, displayHeading, label };

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
  }) { // All variants render transparent dark — the shared ambient backdrop
  // on the (main) layout carries the visual field across every page.
  return (
    <section id={id} aria-labelledby={labelledBy} data-variant={variant} className={cn("scroll-mt-20 py-16 sm:py-24 lg:py-[128px]", variant === "light" ? "text-foreground" : "text-white", className)}>
      <Reveal className={shell}>{children}</Reveal>
    </section>
  );
}

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
    <div className="mb-12 grid gap-6 sm:mb-16 lg:mb-20 lg:grid-cols-[minmax(0,1fr)_2.15fr] lg:gap-12">
      <div className={cn("flex items-start gap-5 lg:pt-3", label)}>
        {index ? <span className={dark ? "text-primary-light" : "text-primary"}>{index}</span> : null}
        <span className={dark ? "text-white/50" : "text-muted-foreground"}>{eyebrow}</span>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
        <h2 id={id} className={cn(displayHeading, "text-[34px] leading-[1.04] sm:text-[46px] lg:text-[62px]", dark ? "text-white" : "text-foreground")}>{title}</h2>
        <div className="flex flex-col items-start gap-6 lg:pt-2">
          {summary ? <p className={cn("max-w-md text-[15px] leading-[1.7]", dark ? "text-white/60" : "text-muted-foreground")}>{summary}</p> : null}
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      </div>
    </div>
  );
}

export function Soft({ children, dark = false }: { children: ReactNode; dark?: boolean }) { return <span className={dark ? "text-white/45" : "text-muted-foreground/70"}>{children}</span>; }

export function ArrowLink({ href, children, tone = "light", className }: { href: string; children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-4 pb-2 text-[11px] font-bold uppercase tracking-[0.1em] transition focus-visible:outline-2 focus-visible:outline-offset-4",
        tone === "dark" ? "border-white/35 text-white hover:border-primary-light focus-visible:outline-primary-light" : "border-border text-foreground hover:border-primary hover:text-primary focus-visible:outline-primary",
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </Link>
  );
}

const buttonBase =
  "group inline-flex min-h-[52px] items-center justify-between gap-8 px-6 text-[12px] font-bold uppercase tracking-[0.08em] transition duration-200 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-primary-light motion-reduce:transition-none";

export function PrimaryButton({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn(buttonBase, "border border-primary bg-primary text-white shadow-[0_0_44px_rgba(51,92,255,0.45)] hover:border-primary-hover hover:bg-primary-hover hover:shadow-[0_0_60px_rgba(0,240,255,0.4)]", className)}>
      {children}
      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </Link>
  );
}

export function SecondaryButton({ href, children, tone = "light", className }: { href: string; children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        buttonBase,
        tone === "dark" ? "border border-white/35 text-white hover:border-white hover:bg-white/5" : "border border-border text-foreground hover:border-primary hover:text-primary",
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </Link>
  );
}

export function PageHero({ eyebrow,
  title,
  summary,
  image = "/images/contact-hero.jpg" }: {
    eyebrow: string;
    title: ReactNode;
    summary?: string;
    image?: string | null;
    children?: ReactNode;
  }) {
  return (
    <section aria-labelledby="page-hero-title" className="relative overflow-hidden bg-surface-dark text-white">
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
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(5,6,8,0.9)_0%,rgba(5,6,8,0.7)_50%,rgba(5,6,8,0.4)_100%)]"
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_90%_at_20%_100%,rgba(51,92,255,0.28),transparent_60%),radial-gradient(ellipse_50%_70%_at_85%_10%,rgba(0,240,255,0.14),transparent_60%)]"
        />
      )}
      <Reveal className={cn(shell, "relative")}>
        <div className="flex min-h-[300px] items-end pb-12 pt-28 sm:min-h-[340px] sm:pb-14">
          <div>
            <p className={cn(label, "text-primary-light")}>{eyebrow}</p>
            <h1
              id="page-hero-title"
              className={cn(displayHeading, "mt-4 max-w-[640px] text-[30px] uppercase leading-[1.05] sm:text-[38px] lg:text-[44px]")}
            >
              {title}
            </h1>
            {summary ? (
              <p className="mt-4 max-w-[520px] text-[14px] leading-[1.65] text-white/65 sm:text-[15px]">
                {summary}
              </p>
            ) : null}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function CtaSection({ eyebrow,
  heading1,
  heading2,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  image = "/images/cta-bg.jpg" }: {
    eyebrow: string;
    heading1: string;
    heading2?: string;
    description: string;
    primaryHref: string;
    primaryLabel: string;
    secondaryHref?: string;
    secondaryLabel?: string;
    image?: string;
  }) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-surface-dark py-24 text-white lg:py-[150px]">
      {/* Photo backdrop with dark overlay — same treatment as the home final CTA */}
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(5,6,8,0.92)_0%,rgba(5,6,8,0.62)_55%,rgba(5,6,8,0.75)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_50%_100%,rgba(51,92,255,0.25),transparent_65%)]"
      />
      <ScrollReveal className={cn(shell, "relative text-center")} y={44}>
        <span className={cn(label, "inline-flex items-center gap-3 text-[#00f0ff]")}>
          <i aria-hidden="true" className="h-px w-8 bg-[#00f0ff]/70" />
          {eyebrow}
          <i aria-hidden="true" className="h-px w-8 bg-[#00f0ff]/70" />
        </span>
        <h2 id="cta-title" className={cn(displayHeading, "mx-auto mt-9 max-w-[1040px] text-[40px] leading-[0.98] sm:text-[58px] lg:text-[72px]")}>
          {heading1}
          {heading2 ? (
            <>
              <br />
              <Soft dark>{heading2}</Soft>
            </>
          ) : null}
        </h2>
        <p className="mx-auto mt-8 max-w-[620px] text-[16px] leading-[1.65] text-white/60 sm:text-[18px]">
          {description}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <PrimaryButton href={primaryHref}>{primaryLabel}</PrimaryButton>
          {secondaryHref && secondaryLabel ? (
            <SecondaryButton href={secondaryHref} tone="dark">
              {secondaryLabel}
            </SecondaryButton>
          ) : null}
        </div>
      </ScrollReveal>
    </section>
  );
}

import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Ecosystem } from "./ecosystem";

const shell = "container";
const displayHeading = "font-medium tracking-[-0.045em] text-balance";
const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

const buttonBase =
  "group inline-flex min-h-[52px] items-center justify-between gap-8 px-6 text-[12px] font-bold uppercase tracking-[0.08em] transition duration-200 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-primary-light motion-reduce:transition-none";

function PrimaryButton({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        buttonBase,
        "border border-primary bg-primary text-white shadow-[0_0_36px_rgba(51,92,255,0.35)] hover:border-primary-hover hover:bg-primary-hover hover:shadow-[0_0_48px_rgba(51,92,255,0.5)]",
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </Link>
  );
}

function SecondaryButton({ href, children, tone = "light", className }: { href: string; children: ReactNode; tone?: "light" | "dark"; className?: string }) {
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

export function Hero() {
  const t = useTranslations("home.hero");
  const proofStrip = [t("proof1"), t("proof2"), t("proof3")];

  return (
    <section aria-labelledby="hero-title" className="relative -mt-[68px] overflow-hidden bg-surface-dark text-white">
      {/* Ambient background wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_75%_40%,rgba(51,92,255,0.16),transparent_65%),radial-gradient(ellipse_45%_40%_at_15%_85%,rgba(0,240,255,0.06),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:72px_72px] opacity-40 [mask-image:radial-gradient(ellipse_75%_70%_at_50%_40%,#000_20%,transparent_75%)]"
      />

      <div className={cn(shell, "relative")}>
        <div className="grid min-h-[560px] gap-10 pb-16 pt-32 sm:pt-36 lg:min-h-svh lg:grid-cols-2 lg:items-center lg:gap-6 lg:pb-0 lg:pt-[68px]">
          {/* Left: typography & CTA */}
          <ScrollReveal itemSelector="[data-hero-item]" y={32} stagger={0.12} className="relative z-10">
            <span data-hero-item className={cn(label, "inline-flex items-center gap-3 text-primary-light")}>
              <i aria-hidden="true" className="h-px w-8 bg-primary-light/70" />
              MeU — Software Outsourcing Studio
            </span>
            <h1
              id="hero-title"
              data-hero-item
              className={cn(displayHeading, "mt-6 text-[42px] font-semibold uppercase leading-[1.02] sm:text-[56px] lg:text-[64px] xl:text-[72px]")}
            >
              {t("title1")}
              <br />
              <span className="bg-[linear-gradient(100deg,#4d6bfe,#00f0ff)] bg-clip-text text-transparent">{t("title2")}</span>
            </h1>
            <p data-hero-item className="mt-6 max-w-[540px] text-[16px] leading-[1.65] text-white/70 sm:text-[18px]">
              {t("description")}
            </p>
            <div data-hero-item className="mt-9 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href="/contact">{t("primaryButton")}</PrimaryButton>
              <SecondaryButton href="/solutions" tone="dark">
                {t("secondaryButton")}
              </SecondaryButton>
            </div>
            <ul data-hero-item className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
              {proofStrip.map((item) => (
                <li key={item} className={cn(label, "flex items-center gap-2.5 text-white/45 normal-case tracking-[0.1em]")}>
                  <i aria-hidden="true" className="size-1 rounded-full bg-[#00f0ff]" />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Right: interactive 3D digital ecosystem */}
          <div className="relative h-[380px] sm:h-[460px] lg:h-[78vh] lg:max-h-[780px]">
            <Ecosystem />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#050608_82%)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

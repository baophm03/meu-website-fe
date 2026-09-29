import { useTranslations } from "next-intl";

import Image from "next/image";

import { cn } from "@/lib/utils";

import ClientsWall from "./_components/clients-wall";

import { Reveal } from "@/components/shared/reveal";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";


export default function Page() {

  const t = useTranslations("pages.about.partnersClients");

  return (

    <>

      <Section variant="light" className="pt-28 sm:pt-36 lg:pt-40 lg:pb-20">

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">

          <div>

            <p className={cn(label, "text-primary")}>{t("clients.eyebrow")}</p>

            <h1 className={cn(displayHeading, "mt-4 max-w-[720px] text-[38px] leading-[1.04] sm:text-[52px] lg:text-[64px]")}>

              {t("clients.heading")}

            </h1>

          </div>

          <p className="max-w-md text-[15px] leading-[1.7] text-muted-foreground lg:justify-self-end lg:pb-3">

            {t("clients.summary")} {t("clients.note")}

          </p>

        </div>

        <ClientsWall />

      </Section>

      <section aria-labelledby="partner-cta-title" className="container pb-20 lg:pb-28">

        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-dark text-white shadow-[0_32px_90px_-32px_rgba(15,23,42,0.45)]">

          <div className="grid lg:grid-cols-[1.15fr_1fr]">

            <div className="relative p-8 sm:p-12 lg:p-16">

              <div className="relative">

                <p className={cn(label, "text-[#00f0ff]")}>{t("cta.eyebrow")}</p>

                <h2 id="partner-cta-title" className={cn(displayHeading, "mt-5 max-w-[460px] text-[32px] leading-[1.05] sm:text-[42px] lg:text-[50px]")}>

                  {t("cta.heading1")}

                  <br />

                  <span className="text-primary-light">{t("cta.heading2")}</span>

                </h2>

                <p className="mt-6 max-w-[440px] text-[15px] leading-[1.7] text-white/65 sm:text-[16px]">

                  {t("cta.description")}

                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                  <PrimaryButton href="/contact">{t("cta.primaryButton")}</PrimaryButton>

                  <SecondaryButton href="/about" tone="dark">{t("cta.secondaryButton")}</SecondaryButton>

                </div>

              </div>

            </div>

            <div className="relative min-h-[260px] lg:min-h-[420px]">

              <Image

                src="/images/hero/hero-3.jpg"

                alt=""

                fill

                sizes="(min-width: 1024px) 50vw, 100vw"

                className="object-cover"

              />

              <div

                aria-hidden

                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,6,8,0.85)_0%,rgba(5,6,8,0.2)_45%,transparent_100%)] lg:bg-[linear-gradient(to_right,rgba(8,9,15,1)_0%,rgba(8,9,15,0.55)_30%,rgba(8,9,15,0.05)_100%)]"

              />

            </div>

          </div>

        </div>

      </section>

    </>

  );

}

const shell = "container";

const displayHeading = "font-medium tracking-[-0.045em] text-balance";

const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

const buttonBase =
  "group inline-flex min-h-[52px] items-center justify-between gap-8 px-6 text-[12px] font-bold uppercase tracking-[0.08em] transition duration-200 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-primary-light motion-reduce:transition-none";

function Section({ id,
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

function PrimaryButton({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn(buttonBase, "border border-primary bg-primary text-white hover:border-primary-hover hover:bg-primary-hover", className)}>
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
      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </Link>
  );
}

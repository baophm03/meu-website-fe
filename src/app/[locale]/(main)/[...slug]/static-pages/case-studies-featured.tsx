import { useTranslations } from "next-intl";
import { CtaGrid } from "@/app/[locale]/(main)/_components/cta/cta-grid";
import PagePostsSection from "./_components/page-posts-section";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";
import Image from "next/image";
import type { ReactNode } from "react";

export default function Page({ slug }: { slug?: string[] }) {
  const t = useTranslations("pages.caseStudies.featured_sub");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.heading")} summary={t("hero.summary")} />
      {slug ? <PagePostsSection slug={slug} tone="light" linkSuffix="?type=case-studies" /> : null}
      <CtaGrid eyebrow={t("cta.eyebrow")} heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=consultation" primaryLabel={t("cta.primaryButton")} secondaryHref="/case-studies" secondaryLabel={t("cta.secondaryButton")} />
    </>
  );
}

const shell = "container";

const displayHeading = "font-medium tracking-[-0.045em] text-balance";

const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

function PageHero({ eyebrow,
  title,
  summary,
  image = "/images/solutions/meos-ecosystem.jpg" }: {
    eyebrow: string;
    title: ReactNode;
    summary?: string;
    image?: string | null;
    children?: ReactNode;
  }) {
  return (
    <section aria-labelledby="page-hero-title" className="relative -mt-[68px] overflow-hidden bg-surface-dark text-white">
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
        <div className="flex min-h-[420px] items-end pb-12 pt-28 sm:min-h-[460px] sm:pb-14">
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

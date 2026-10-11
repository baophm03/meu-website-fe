import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Check, ClipboardList, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/shared/safe-image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Section, SectionHead, displayHeading, label } from "./page-sections";

/**
 * Shared industry-page sections extracted from the six /industries/* pages so
 * the deploy grid, case-study cards and stat strip stay identical everywhere.
 * Content comes from each page's own `useTranslations` scope.
 */


const DEPLOYS = ["dep1", "dep2", "dep3", "dep4", "dep5", "dep6"] as const;
const CASE_STUDIES = ["case1", "case2"] as const;
const CASE_FEATURES = [1, 2, 3, 4, 5, 6, 7] as const;

type T = ReturnType<typeof useTranslations>;

export function IndustryDeploySection({ t, images, icon }: { t: T; images?: { src: string; alt?: string } | null; icon?: ReactNode }) {
  if (!t.has("deployTitle")) return null;
  return (
    <Section variant="light" className="bg-transparent">
      <SectionHead tone="light" eyebrow={t("deployEyebrow")} title={t("deployTitle")} summary={t("deploySummary")} />
      <ScrollReveal itemSelector="[data-deploy]" y={32} stagger={0.08}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {DEPLOYS.map((prefix, i) => (
            <div key={prefix} data-deploy className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-primary/10 bg-[#f4f7ff] p-7 text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_18px_40px_rgba(49,92,255,0.12)]">
              {icon ? <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">{icon}</span> : null}
              <span className={cn(displayHeading, "text-[26px] leading-none text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "text-[18px] leading-[1.2] text-foreground sm:text-[19px]")}>{t(`${prefix}Title`)}</h3>
              <p className="text-[13px] leading-[1.65] text-muted-foreground">{t(`${prefix}Desc`)}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
      {images ? (
        <div className="relative mt-10 aspect-[21/8] overflow-hidden rounded-2xl border border-border bg-muted shadow-[0_24px_70px_-32px_rgba(15,23,42,0.35)]">
          <SafeImage src={images.src} alt={images.alt ?? ""} fill sizes="100vw" className="object-cover" />
        </div>
      ) : null}
    </Section>
  );
}

export function IndustryCaseStudies({ t, images }: { t: T; images: [string, string] }) {
  if (!t.has("casesTitle")) return null;
  return (
    <Section variant="light" className="bg-transparent">
      <SectionHead tone="light" eyebrow={t("casesEyebrow")} title={t("casesTitle")} />
      <ScrollReveal itemSelector="[data-case]" y={36} stagger={0.15}>
        <div className="grid gap-5 lg:grid-cols-2">
          {CASE_STUDIES.map((prefix, caseIndex) => {
            const features = CASE_FEATURES.map((n) => (t.has(`${prefix}Feat${n}`) ? t(`${prefix}Feat${n}`) : null)).filter(Boolean) as string[];
            return (
              <article key={prefix} data-case className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white/80 backdrop-blur-sm transition duration-300 hover:border-primary/40">
                <div className="relative aspect-[16/7] w-full shrink-0">
                  <SafeImage src={images[caseIndex]} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-7 sm:p-9">
                  <h3 className={cn(displayHeading, "text-[22px] uppercase leading-[1.15] tracking-wide text-foreground sm:text-[26px]")}>{t(`${prefix}Name`)}</h3>
                  <div className="mt-7 grid gap-6 sm:grid-cols-2">
                    <div>
                      <span className={cn(label, "flex items-center gap-2 text-primary")}><ClipboardList aria-hidden="true" className="h-4 w-4" />{t("problemLabel")}</span>
                      <p className="mt-3 text-[13.5px] leading-[1.65] text-muted-foreground">{t(`${prefix}Problem`)}</p>
                    </div>
                    <div>
                      <span className={cn(label, "flex items-center gap-2 text-primary")}><Wrench aria-hidden="true" className="h-4 w-4" />{t("solutionLabel")}</span>
                      <p className="mt-3 text-[13.5px] leading-[1.65] text-muted-foreground">{t(`${prefix}Solution`)}</p>
                    </div>
                  </div>
                  <div className="mt-7 border-t border-border pt-6">
                    <span className={cn(label, "text-muted-foreground")}>{t(`${prefix}FeaturesLabel`)}</span>
                    <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                      {features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-[13px] leading-[1.5] text-muted-foreground">
                          <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2.5} />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </ScrollReveal>
    </Section>
  );
}

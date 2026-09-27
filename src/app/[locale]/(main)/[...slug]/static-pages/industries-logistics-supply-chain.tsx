import { useTranslations } from "next-intl";
import { Check, ClipboardList, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/shared/safe-image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { PageHero, Section, SectionHead, CtaSection, label, displayHeading } from "@/app/[locale]/(main)/_components/section-primitives";
import PagePostsSection from "./_components/page-posts-section";

/**
 * IndustriesLogisticsSupplyChainPage — "dark ops" layout: bento challenge
 * cards on a dark band, zigzag image/text deliverables, capability strip.
 * Content lives in `pages.industries.logistics`.
 */

const IMAGES = {
  hero: "/images/industries/logistics/logistics-1.jpg",
  challenges: "/images/industries/logistics/logistics-2.jpg",
  solutions: "/images/industries/logistics/logistics-3.jpg",
  bridge: "/images/industries/logistics/logistics-4.jpg",
  case1: "/images/industries/logistics/logistics-5.jpg",
  case2: "/images/industries/logistics/logistics-6.jpg",
};

const CHALLENGES = ["ch1", "ch2", "ch3", "ch4", "ch5", "ch6"] as const;
const SOLUTIONS = ["sol1", "sol2", "sol3", "sol4", "sol5", "sol6"] as const;
const CAPABILITIES = ["cap1", "cap2", "cap3", "cap4", "cap5", "cap6"] as const;
const DEPLOYS = ["dep1", "dep2", "dep3", "dep4", "dep5", "dep6"] as const;
const CASE_STUDIES = ["case1", "case2"] as const;
const CASE_FEATURES = [1, 2, 3, 4, 5, 6, 7] as const;

function HeroSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return <PageHero eyebrow={t("eyebrow")} title={t("heading")} summary={t("summary")} image={IMAGES.hero} />;
}

function ChallengesSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <Section variant="dark" className="bg-surface-dark">
      <SectionHead tone="dark" eyebrow={t("challengesEyebrow")} title={t("challengesTitle")} summary={t("challengesSummary")} />
      <ScrollReveal itemSelector="[data-challenge]" y={28} stagger={0.08}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHALLENGES.map((prefix, i) => (
            <article key={prefix} data-challenge className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-[#00f0ff]/40">
              <span className={cn(label, "text-primary-light")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "mt-4 text-[18px] leading-[1.25] text-white sm:text-[20px]")}>{t(`${prefix}Title`)}</h3>
              <p className="mt-2.5 text-[13.5px] leading-[1.65] text-white/60">{t(`${prefix}Desc`)}</p>
            </article>
          ))}
        </div>
      </ScrollReveal>
    </Section>
  );
}

function SolutionsSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <Section variant="light" className="bg-transparent">
      <SectionHead tone="light" eyebrow={t("solutionsEyebrow")} title={t("solutionsTitle")} summary={t("solutionsSummary")} />
      <ScrollReveal itemSelector="[data-solution]" y={32} stagger={0.1}>
        <div className="space-y-6">
          {SOLUTIONS.map((prefix, i) => {
            const reversed = i % 2 === 1;
            const image = IMAGES[["solutions", "bridge", "case1", "case2", "hero", "challenges"][i % 6] as keyof typeof IMAGES];
            return (
              <div key={prefix} data-solution className={cn("grid items-center gap-8 overflow-hidden rounded-2xl border border-border bg-white/70 backdrop-blur-sm lg:grid-cols-2", reversed && "lg:[&>*:first-child]:order-2")}>
                <div className="relative aspect-[16/9] w-full lg:aspect-auto lg:h-full lg:min-h-[240px]">
                  <SafeImage src={image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-col gap-3 p-7 sm:p-9">
                  <span className={cn(label, "flex items-center gap-2 text-primary")}>
                    <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2.5} />
                    {`0${i + 1}`}
                  </span>
                  <h3 className={cn(displayHeading, "text-[20px] leading-[1.2] text-foreground sm:text-[23px]")}>{t(`${prefix}Title`)}</h3>
                  <p className="text-[14px] leading-[1.7] text-muted-foreground">{t(`${prefix}Desc`)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollReveal>
    </Section>
  );
}

function DeploySection({ t }: { t: ReturnType<typeof useTranslations> }) {
  if (!t.has("deployTitle")) return null;
  return (
    <Section variant="light" className="bg-transparent">
      <SectionHead tone="light" eyebrow={t("deployEyebrow")} title={t("deployTitle")} summary={t("deploySummary")} />
      <ScrollReveal itemSelector="[data-deploy]" y={32} stagger={0.08}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {DEPLOYS.map((prefix, i) => (
            <div key={prefix} data-deploy className="flex flex-col gap-4 rounded-2xl border border-border bg-white/70 p-7 backdrop-blur-sm transition duration-300 hover:border-primary/40">
              <span className={cn(displayHeading, "text-[26px] leading-none text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "text-[18px] leading-[1.2] text-foreground sm:text-[19px]")}>{t(`${prefix}Title`)}</h3>
              <p className="text-[13px] leading-[1.65] text-muted-foreground">{t(`${prefix}Desc`)}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </Section>
  );
}

function CapabilitiesSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <Section variant="dark" className="bg-surface-dark">
      <SectionHead tone="dark" eyebrow={t("capabilitiesEyebrow")} title={t("capabilitiesTitle")} summary={t("capabilitiesSummary")} />
      <ScrollReveal itemSelector="[data-capability]" y={24} stagger={0.06}>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((prefix, i) => (
            <div key={prefix} data-capability className="flex flex-col gap-3 bg-surface-dark-soft p-7 transition-colors duration-300 hover:bg-surface-dark-raised">
              <span className={cn(displayHeading, "text-[26px] leading-none text-primary-light")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "text-[18px] leading-[1.2] text-white sm:text-[19px]")}>{t(`${prefix}Title`)}</h3>
              <p className="text-[13px] leading-[1.65] text-white/60">{t(`${prefix}Desc`)}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </Section>
  );
}

function BridgeSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  if (!t.has("bridgeHeading")) return null;
  return (
    <Section variant="dark" className="bg-surface-dark-soft">
      <div className="mx-auto max-w-[860px] text-center">
        <h2 className={cn(displayHeading, "text-[28px] uppercase leading-[1.1] text-white sm:text-[38px] lg:text-[46px]")}>{t("bridgeHeading")}</h2>
        <p className="mx-auto mt-6 max-w-[620px] text-[15px] leading-[1.75] text-white/60">{t("bridgeText")}</p>
      </div>
    </Section>
  );
}

function CaseStudiesSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  if (!t.has("casesTitle")) return null;
  return (
    <Section variant="light" className="bg-transparent">
      <SectionHead tone="light" eyebrow={t("casesEyebrow")} title={t("casesTitle")} />
      <ScrollReveal itemSelector="[data-case]" y={36} stagger={0.15}>
        <div className="grid gap-5 lg:grid-cols-2">
          {CASE_STUDIES.map((prefix, caseIndex) => {
            const features = CASE_FEATURES.map((n) => (t.has(`${prefix}Feat${n}`) ? t(`${prefix}Feat${n}`) : null)).filter(Boolean) as string[];
            const caseImage = caseIndex === 0 ? IMAGES.case1 : IMAGES.case2;
            return (
              <article key={prefix} data-case className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white/80 backdrop-blur-sm transition duration-300 hover:border-primary/40">
                <div className="relative aspect-[16/7] w-full shrink-0">
                  <SafeImage src={caseImage} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
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

export default function IndustriesLogisticsSupplyChainPage({ slug }: { slug: string[] }) {
  const t = useTranslations("pages.industries.logistics");
  const tActions = useTranslations("actions");
  return (
    <div>
      <HeroSection t={t} />
      <ChallengesSection t={t} />
      <SolutionsSection t={t} />
      <DeploySection t={t} />
      <CapabilitiesSection t={t} />
      <BridgeSection t={t} />
      <CaseStudiesSection t={t} />
      <PagePostsSection slug={slug} tone="light" />
      <CtaSection
        eyebrow={t("ctaEyebrow")}
        heading1={t("ctaHeading1")}
        heading2={t("ctaHeading2")}
        description={t("ctaDesc")}
        primaryHref="/contact?type=consultation"
        primaryLabel={tActions("talkToExpert")}
        secondaryHref="/industries"
        secondaryLabel={t("ctaSecondary")}
      />
    </div>
  );
}

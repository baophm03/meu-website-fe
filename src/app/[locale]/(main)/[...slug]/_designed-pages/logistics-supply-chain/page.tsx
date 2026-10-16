import { useTranslations } from "next-intl";
import { Check, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/shared/safe-image";
import { AbstractPanel } from "@/components/shared/abstract-panel";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { CtaSplitMedia } from "@/components/shared/cta/cta-split-media";
import PagePostsSection from "../_components/page-posts-section";
import { PageHero, Section, SectionHead, displayHeading, label } from "../_components/page-sections";
import { IndustryCaseStudies, IndustryDeploySection } from "../_components/industry-sections";

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

function HeroSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return <PageHero eyebrow={t("eyebrow")} title={t("heading")} summary={t("summary")} image={IMAGES.hero} />;
}

function ChallengesSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <Section variant="light" className="bg-transparent">
      <SectionHead tone="light" eyebrow={t("challengesEyebrow")} title={t("challengesTitle")} summary={t("challengesSummary")} />
      <ScrollReveal itemSelector="[data-challenge]" y={28} stagger={0.08}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHALLENGES.map((prefix, i) => (
            <article key={prefix} data-challenge className="group relative overflow-hidden rounded-2xl border border-border bg-white/70 p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)]">
              <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "mt-4 text-[18px] leading-[1.25] text-foreground sm:text-[20px]")}>{t(`${prefix}Title`)}</h3>
              <p className="mt-2.5 text-[13.5px] leading-[1.65] text-muted-foreground">{t(`${prefix}Desc`)}</p>
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
            const imageKey = ["solutions", "bridge", "case1", "case2", "hero", "challenges"][i % 6] as keyof typeof IMAGES;
            return (
              <div key={prefix} data-solution className={cn("grid items-center gap-8 overflow-hidden rounded-2xl border border-border bg-white/70 backdrop-blur-sm lg:grid-cols-2", reversed && "lg:[&>*:first-child]:order-2")}>
                <div className="relative aspect-[16/9] w-full lg:aspect-auto lg:h-full lg:min-h-[240px]">
                  {imageKey === "solutions" ? (
                    <AbstractPanel icon={Truck} />
                  ) : (
                    <SafeImage src={IMAGES[imageKey]} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                  )}
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
  return (
    <IndustryDeploySection
      t={t}
      icon={<Truck aria-hidden="true" className="h-5 w-5" />}
    />
  );
}

function CapabilitiesSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <Section variant="light" className="bg-transparent">
      <SectionHead tone="light" eyebrow={t("capabilitiesEyebrow")} title={t("capabilitiesTitle")} summary={t("capabilitiesSummary")} />
      <ScrollReveal itemSelector="[data-capability]" y={24} stagger={0.06}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((prefix, i) => (
            <div key={prefix} data-capability className="group flex flex-col gap-3 rounded-2xl border border-border bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)]">
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

function BridgeSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  if (!t.has("bridgeHeading")) return null;
  return (
    <Section variant="light" className="bg-transparent">
      <div className="mx-auto max-w-[860px] text-center">
        <h2 className={cn(displayHeading, "text-[28px] leading-[1.1] text-foreground sm:text-[38px] lg:text-[46px]")}>{t("bridgeHeading")}</h2>
        <p className="mx-auto mt-6 max-w-[620px] text-[15px] leading-[1.75] text-muted-foreground">{t("bridgeText")}</p>
      </div>
    </Section>
  );
}

function CaseStudiesSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return <IndustryCaseStudies t={t} images={[IMAGES.case1, IMAGES.case2]} />;
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
      <PagePostsSection slug={slug} tone="light" linkSuffix="?type=industries" />
      <CtaSplitMedia
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

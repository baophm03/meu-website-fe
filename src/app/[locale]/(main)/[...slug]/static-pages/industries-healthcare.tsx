import { useTranslations } from "next-intl";
import { Check, Hospital } from "lucide-react";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/shared/safe-image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { CtaSplitMedia } from "@/app/[locale]/(main)/_components/cta/cta-split-media";
import PagePostsSection from "./_components/page-posts-section";
import { PageHero, Section, SectionHead, displayHeading, label } from "./_components/page-sections";
import { IndustryCaseStudies, IndustryDeploySection } from "./_components/industry-sections";

/**
 * IndustriesHealthcarePage — "clinical split" layout: mirrored sticky image,
 * deliverables as full-width editorial rows, capabilities as a bordered grid.
 * Content lives in `pages.industries.healthcare`.
 */

const IMAGES = {
  hero: "/images/industries/healthcare/healthcare-1.jpg",
  challenges: "/images/industries/healthcare/healthcare-2.jpg",
  solutions: "/images/industries/healthcare/healthcare-7.jpg",
  bridge: "/images/industries/healthcare/healthcare-4.jpg",
  case1: "/images/industries/healthcare/healthcare-5.jpg",
  case2: "/images/industries/healthcare/healthcare-6.jpg",
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
      <div className="grid gap-10 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-muted shadow-[0_24px_70px_-32px_rgba(15,23,42,0.35)]">
              <SafeImage src={IMAGES.challenges} alt="" fill sizes="340px" className="object-cover" />
            </div>
          </div>
        </aside>
        <ScrollReveal itemSelector="[data-challenge]" y={28} stagger={0.08}>
          <div className="border-t border-border">
            {CHALLENGES.map((prefix, i) => (
              <article key={prefix} data-challenge className="group grid grid-cols-[40px_1fr] gap-4 border-b border-border py-8 transition-colors duration-300 hover:bg-muted sm:py-9">
                <span className={cn(label, "pt-1.5 text-primary")}>{`0${i + 1}`}</span>
                <div>
                  <h3 className={cn(displayHeading, "text-[20px] leading-[1.2] text-foreground sm:text-[25px]")}>{t(`${prefix}Title`)}</h3>
                  <p className="mt-2.5 max-w-[640px] text-[14px] leading-[1.65] text-muted-foreground sm:text-[15px]">{t(`${prefix}Desc`)}</p>
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}

function SolutionsSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <Section variant="light" className="bg-transparent">
      <SectionHead tone="light" eyebrow={t("solutionsEyebrow")} title={t("solutionsTitle")} summary={t("solutionsSummary")} />
      <div className="relative mb-12 aspect-[21/8] overflow-hidden rounded-2xl border border-border bg-muted shadow-[0_24px_70px_-32px_rgba(15,23,42,0.35)]">
        <SafeImage src={IMAGES.solutions} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <ScrollReveal itemSelector="[data-solution]" y={24} stagger={0.06}>
        <div className="border-t border-border">
          {SOLUTIONS.map((prefix, i) => (
            <div key={prefix} data-solution className="group grid items-start gap-3 border-b border-border py-7 transition-colors duration-300 hover:bg-muted sm:grid-cols-[56px_minmax(0,1fr)_1.2fr] sm:gap-6 sm:py-8">
              <span className={cn(displayHeading, "text-[22px] leading-none text-primary/70 transition-colors group-hover:text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "text-[18px] leading-[1.3] text-foreground sm:text-[20px]")}>
                <Check aria-hidden="true" className="mr-2 inline h-4 w-4 text-primary" strokeWidth={2.5} />
                {t(`${prefix}Title`)}
              </h3>
              <p className="text-[14px] leading-[1.65] text-muted-foreground">{t(`${prefix}Desc`)}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </Section>
  );
}

function DeploySection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <IndustryDeploySection
      t={t}
      icon={<Hospital aria-hidden="true" className="h-5 w-5" />}
      images={{ src: IMAGES.solutions, alt: t("deployTitle") }}
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
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className={cn(displayHeading, "max-w-[560px] text-[28px] leading-[1.08] text-foreground sm:text-[36px] lg:text-[42px]")}>{t("bridgeHeading")}</h2>
          <p className="mt-5 max-w-[540px] text-[15px] leading-[1.75] text-muted-foreground">{t("bridgeText")}</p>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-muted shadow-[0_24px_70px_-32px_rgba(15,23,42,0.35)]">
          <SafeImage src={IMAGES.bridge} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
      </div>
    </Section>
  );
}

function CaseStudiesSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return <IndustryCaseStudies t={t} images={[IMAGES.case1, IMAGES.case2]} />;
}

export default function IndustriesHealthcarePage({ slug }: { slug: string[] }) {
  const t = useTranslations("pages.industries.healthcare");
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

import { useTranslations } from "next-intl";
import { Pill } from "lucide-react";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/shared/safe-image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { CtaSplitMedia } from "@/app/[locale]/(main)/_components/cta/cta-split-media";
import PagePostsSection from "./_components/page-posts-section";
import { PageHero, Section, SectionHead, displayHeading, label } from "./_components/page-sections";
import { IndustryCaseStudies, IndustryDeploySection } from "./_components/industry-sections";

/**
 * IndustriesPharmaceuticalLifeSciencesPage — "lab sheet" layout: data-sheet
 * challenge rows, two-column deliverables beside a sticky image, centered
 * bridge statement. Content lives in `pages.industries.pharma`.
 */

const IMAGES = {
  hero: "/images/industries/pharma/pharma-1.jpg",
  challenges: "/images/industries/pharma/pharma-2.jpg",
  solutions: "/images/industries/pharma/pharma-3.jpg",
  bridge: "/images/industries/pharma/pharma-4.jpg",
  case1: "/images/industries/pharma/pharma-5.jpg",
  case2: "/images/industries/pharma/pharma-6.jpg",
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
      <ScrollReveal itemSelector="[data-challenge]" y={24} stagger={0.06}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHALLENGES.map((prefix, i) => (
            <article key={prefix} data-challenge className="group grid gap-4 rounded-2xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)] sm:p-8">
              <div className="flex items-baseline gap-4">
                <span className={cn(label, "shrink-0 rounded-md bg-primary/[0.07] px-2.5 py-1 text-primary")}>{`0${i + 1}`}</span>
                <h3 className={cn(displayHeading, "text-[19px] leading-[1.25] text-foreground sm:text-[22px]")}>{t(`${prefix}Title`)}</h3>
              </div>
              <p className="pl-[52px] text-[13.5px] leading-[1.65] text-muted-foreground sm:pl-[60px]">{t(`${prefix}Desc`)}</p>
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
      <div className="grid gap-10 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-muted shadow-[0_24px_70px_-32px_rgba(15,23,42,0.35)]">
              <SafeImage src={IMAGES.solutions} alt="" fill sizes="340px" className="object-cover" />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-muted">
              <SafeImage src={IMAGES.bridge} alt="" fill sizes="340px" className="object-cover" />
            </div>
          </div>
        </aside>
        <ScrollReveal itemSelector="[data-solution]" y={28} stagger={0.08}>
          <div className="grid gap-5 md:grid-cols-2">
            {SOLUTIONS.map((prefix, i) => (
              <div key={prefix} data-solution className="group relative flex flex-col gap-3 rounded-2xl border border-border bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)]">
                <span className={cn(displayHeading, "text-[24px] leading-none text-primary/50 transition-colors group-hover:text-primary")}>{`0${i + 1}`}</span>
                <h3 className={cn(displayHeading, "text-[19px] leading-[1.25] text-foreground sm:text-[20px]")}>{t(`${prefix}Title`)}</h3>
                <p className="text-[13.5px] leading-[1.65] text-muted-foreground">{t(`${prefix}Desc`)}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}

function DeploySection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <IndustryDeploySection
      t={t}
      icon={<Pill aria-hidden="true" className="h-5 w-5" />}
    />
  );
}

function CapabilitiesSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <Section variant="light" className="bg-transparent">
      <SectionHead tone="light" eyebrow={t("capabilitiesEyebrow")} title={t("capabilitiesTitle")} summary={t("capabilitiesSummary")} />
      <ScrollReveal itemSelector="[data-capability]" y={24} stagger={0.06}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {CAPABILITIES.map((prefix, i) => (
            <div key={prefix} data-capability className="group grid grid-cols-[40px_1fr] gap-4 rounded-2xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)]">
              <span className={cn(label, "pt-1 text-primary")}>{`0${i + 1}`}</span>
              <div>
                <h3 className="text-[16px] font-semibold leading-[1.3] text-foreground">{t(`${prefix}Title`)}</h3>
                <p className="mt-1.5 text-[13px] leading-[1.65] text-muted-foreground">{t(`${prefix}Desc`)}</p>
              </div>
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
      <div className="mx-auto max-w-[820px] text-center">
        <h2 className={cn(displayHeading, "text-[28px] leading-[1.12] text-foreground sm:text-[36px] lg:text-[42px]")}>{t("bridgeHeading")}</h2>
        <p className="mx-auto mt-6 max-w-[600px] text-[15px] leading-[1.8] text-muted-foreground">{t("bridgeText")}</p>
      </div>
    </Section>
  );
}

function CaseStudiesSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return <IndustryCaseStudies t={t} images={[IMAGES.case1, IMAGES.case2]} />;
}

export default function IndustriesPharmaceuticalLifeSciencesPage({ slug }: { slug: string[] }) {
  const t = useTranslations("pages.industries.pharma");
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

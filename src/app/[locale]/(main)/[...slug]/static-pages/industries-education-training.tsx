import { useTranslations } from "next-intl";
import { Check, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/shared/safe-image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { CtaSplitMedia } from "@/app/[locale]/(main)/_components/cta/cta-split-media";
import PagePostsSection from "./_components/page-posts-section";
import { PageHero, Section, SectionHead, displayHeading } from "./_components/page-sections";
import { IndustryCaseStudies, IndustryDeploySection } from "./_components/industry-sections";

/**
 * IndustriesEducationTrainingPage — "curriculum path" layout: ghost-number
 * challenge cards, timeline-style deliverables with a left rail, checklist
 * capabilities. Content lives in `pages.industries.education`.
 */

const IMAGES = {
  hero: "/images/industries/education/education-1.jpg",
  challenges: "/images/industries/education/education-2.jpg",
  solutions: "/images/industries/education/education-3.jpg",
  bridge: "/images/industries/education/education-4.jpg",
  case1: "/images/industries/education/education-5.jpg",
  case2: "/images/industries/education/education-6.jpg",
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
      <ScrollReveal itemSelector="[data-challenge]" y={32} stagger={0.08}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CHALLENGES.map((prefix, i) => (
            <article key={prefix} data-challenge className="group relative overflow-hidden rounded-2xl border border-border bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)]">
              <span aria-hidden="true" className={cn(displayHeading, "pointer-events-none absolute -right-2 -top-5 text-[72px] leading-none text-primary/[0.07] transition-colors duration-300 group-hover:text-primary/[0.14]")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "relative text-[19px] leading-[1.25] text-foreground sm:text-[21px]")}>{t(`${prefix}Title`)}</h3>
              <p className="relative mt-3 text-[13.5px] leading-[1.65] text-muted-foreground">{t(`${prefix}Desc`)}</p>
            </article>
          ))}
        </div>
      </ScrollReveal>
      <div className="relative mt-10 aspect-[21/8] overflow-hidden rounded-2xl border border-border bg-muted shadow-[0_24px_70px_-32px_rgba(15,23,42,0.35)]">
        <SafeImage src={IMAGES.challenges} alt="" fill sizes="100vw" className="object-cover" />
      </div>
    </Section>
  );
}

function SolutionsSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <Section variant="light" className="bg-transparent">
      <SectionHead tone="light" eyebrow={t("solutionsEyebrow")} title={t("solutionsTitle")} summary={t("solutionsSummary")} />
      <ScrollReveal itemSelector="[data-solution]" y={28} stagger={0.08}>
        <ol className="relative space-y-0 border-l-2 border-primary/20 pl-8">
          {SOLUTIONS.map((prefix, i) => (
            <li key={prefix} data-solution className="group relative pb-9 last:pb-0">
              <span aria-hidden="true" className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-background">
                <span className="h-1.5 w-1.5 rounded-full bg-primary transition-colors duration-300 group-hover:bg-primary-light" />
              </span>
              <div className="grid gap-2 rounded-2xl border border-transparent p-5 transition duration-300 group-hover:border-border group-hover:bg-white/70 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-6">
                <span className={cn(displayHeading, "hidden text-[26px] leading-none text-primary/60 sm:block")}>{`0${i + 1}`}</span>
                <div>
                  <h3 className={cn(displayHeading, "text-[19px] leading-[1.25] text-foreground sm:text-[20px]")}>{t(`${prefix}Title`)}</h3>
                  <p className="mt-2 text-[13.5px] leading-[1.65] text-muted-foreground">{t(`${prefix}Desc`)}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </ScrollReveal>
      <div className="relative mt-12 aspect-[21/8] overflow-hidden rounded-2xl border border-border bg-muted shadow-[0_24px_70px_-32px_rgba(15,23,42,0.35)]">
        <SafeImage src={IMAGES.solutions} alt="" fill sizes="100vw" className="object-cover" />
      </div>
    </Section>
  );
}

function DeploySection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <IndustryDeploySection
      t={t}
      icon={<GraduationCap aria-hidden="true" className="h-5 w-5" />}
      images={{ src: IMAGES.solutions, alt: t("deployTitle") }}
    />
  );
}

function CapabilitiesSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <Section variant="light" className="bg-transparent">
      <SectionHead tone="light" eyebrow={t("capabilitiesEyebrow")} title={t("capabilitiesTitle")} summary={t("capabilitiesSummary")} />
      <ScrollReveal itemSelector="[data-capability]" y={24} stagger={0.06}>
        <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {CAPABILITIES.map((prefix) => (
            <div key={prefix} data-capability className="group flex items-start gap-3.5 rounded-2xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)]">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/[0.08]">
                <Check aria-hidden="true" className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
              </span>
              <div>
                <h3 className="text-[15px] font-semibold leading-[1.3] text-foreground">{t(`${prefix}Title`)}</h3>
                <p className="mt-1 text-[12.5px] leading-[1.6] text-muted-foreground">{t(`${prefix}Desc`)}</p>
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

export default function IndustriesEducationTrainingPage({ slug }: { slug: string[] }) {
  const t = useTranslations("pages.industries.education");
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

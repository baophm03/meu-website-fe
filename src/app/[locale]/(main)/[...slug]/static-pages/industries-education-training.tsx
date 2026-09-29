import { useTranslations } from "next-intl";
import { Check, ClipboardList, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/shared/safe-image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { CtaSplitMedia } from "@/app/[locale]/(main)/_components/cta/cta-split-media";
import PagePostsSection from "./_components/page-posts-section";
import { Reveal } from "@/components/shared/reveal";
import Image from "next/image";
import type { ReactNode } from "react";

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
const DEPLOYS = ["dep1", "dep2", "dep3", "dep4", "dep5", "dep6"] as const;
const CASE_STUDIES = ["case1", "case2"] as const;
const CASE_FEATURES = [1, 2, 3, 4, 5, 6, 7] as const;

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
            <article key={prefix} data-challenge className="group relative overflow-hidden rounded-2xl border border-border bg-white/70 p-7 backdrop-blur-sm transition duration-300 hover:border-primary/40">
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
    <Section variant="light" className="bg-transparent">
      <SectionHead tone="light" eyebrow={t("capabilitiesEyebrow")} title={t("capabilitiesTitle")} summary={t("capabilitiesSummary")} />
      <ScrollReveal itemSelector="[data-capability]" y={24} stagger={0.06}>
        <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {CAPABILITIES.map((prefix) => (
            <div key={prefix} data-capability className="group flex items-start gap-3.5 rounded-xl border border-border bg-white/70 p-5 backdrop-blur-sm transition duration-300 hover:border-primary/40">
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

const shell = "container";

const displayHeading = "font-medium tracking-[-0.045em] text-balance";

const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

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

function SectionHead({ id,
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

function PageHero({ eyebrow,
  title,
  summary,
  image = "/images/industries/education/education-1.jpg" }: {
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

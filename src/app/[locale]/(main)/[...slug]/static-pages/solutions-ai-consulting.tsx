import { useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import PagePostsSection from "./_components/page-posts-section";
import { PageHero, Section, SectionHead, CtaSection, label, displayHeading } from "@/app/[locale]/(main)/_components/section-primitives";

const scopeItems = ["item1", "item2", "item3", "item4"] as const;
const steps = ["step1", "step2", "step3", "step4"] as const;
const outcomes = ["outcome1", "outcome2", "outcome3", "outcome4"] as const;

const glassCard = "relative overflow-hidden rounded-2xl border border-border bg-white/70 backdrop-blur-sm shadow-[0_1px_24px_-12px_rgba(15,23,42,0.12)] transition duration-300 hover:border-primary/40 hover:shadow-[0_12px_50px_-16px_rgba(49,92,255,0.28)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(49,92,255,0.7),transparent)] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100";

export default function Page({ slug }: { slug: string[] }) {
    const t = useTranslations("pages.solutions.aiConsulting");
    const tActions = useTranslations("actions");

    return (
        <div>
            <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.heading")} summary={t("hero.summary")} />

            {/* 01 — Scope */}
            <Section variant="light" className="bg-transparent">
                <SectionHead tone="light" eyebrow={t("whatWeDo.eyebrow")} title={t("whatWeDo.heading")} summary={t("whatWeDo.summary")} />
                <ScrollReveal itemSelector="[data-scope]" y={32} stagger={0.1}>
                    <ul className="grid gap-4 sm:grid-cols-2 lg:gap-5">
                        {scopeItems.map((item, i) => (
                            <li key={item} data-scope className={cn(glassCard, "flex gap-5 p-7")}>
                                <span className={cn(label, "shrink-0 pt-1 text-primary")}>{`0${i + 1}`}</span>
                                <div>
                                    <h3 className={cn(displayHeading, "text-[19px] leading-[1.25] text-foreground sm:text-[21px]")}>{t(`whatWeDo.${item}Title`)}</h3>
                                    <p className="mt-3 text-[14px] leading-[1.7] text-muted-foreground">{t(`whatWeDo.${item}Desc`)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </ScrollReveal>
            </Section>

            {/* 02 — Approach pipeline */}
            <Section variant="light" className="bg-transparent">
                <SectionHead tone="light" eyebrow={t("approach.eyebrow")} title={t("approach.heading")} summary={t("approach.summary")} />
                <ScrollReveal itemSelector="[data-approach-step]" y={36} stagger={0.12}>
                    <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-4">
                        {steps.map((step, i) => (
                            <div key={step} className="flex flex-1 flex-col lg:flex-row lg:items-start">
                                <div className="flex flex-1 flex-col gap-3">
                                    <span className="flex items-center justify-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                                        <span className="h-px w-8 bg-muted" />
                                        {t(`approach.${step}Label`)}
                                        <span className="h-px w-8 bg-muted" />
                                    </span>
                                    <div data-approach-step className={cn(glassCard, "flex flex-1 flex-col gap-4 p-6")}>
                                        <span className={cn(displayHeading, "text-[26px] leading-none text-primary")}>{`0${i + 1}`}</span>
                                        <p className="text-[13px] leading-[1.65] text-muted-foreground">{t(`approach.${step}Desc`)}</p>
                                    </div>
                                </div>
                                {i < steps.length - 1 ? (
                                    <div aria-hidden className="hidden w-10 shrink-0 items-start justify-center pt-[88px] lg:flex">
                                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </Section>

            {/* 03 — Outcomes */}
            <Section variant="light" className="bg-transparent">
                <SectionHead tone="light" eyebrow={t("outcomes.eyebrow")} title={t("outcomes.heading")} summary={t("outcomes.summary")} />
                <ScrollReveal itemSelector="[data-outcome]" y={32} stagger={0.1}>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                        {outcomes.map((outcome, i) => (
                            <div key={outcome} data-outcome className={cn(glassCard, "flex flex-col gap-4 border-l-2 border-l-primary p-6")}>
                                <Check aria-hidden="true" className="h-5 w-5 text-primary" strokeWidth={2.5} />
                                <h3 className={cn(displayHeading, "text-[18px] leading-[1.25] text-foreground")}>{t(`outcomes.${outcome}Title`)}</h3>
                                <p className="text-[13px] leading-[1.65] text-muted-foreground">{t(`outcomes.${outcome}Desc`)}</p>
                                <span className={cn(label, "mt-auto pt-2 text-muted-foreground")}>{`0${i + 1}`}</span>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </Section>

            {/* CMS posts attached to this page's page_config */}
      {slug ? <PagePostsSection slug={slug} tone="light" /> : null}

      <CtaSection
                eyebrow={t("cta.eyebrow")}
                heading1={t("cta.heading1")}
                heading2={t("cta.heading2")}
                description={t("cta.description")}
                primaryHref="/contact?type=consultation"
                primaryLabel={tActions("talkToExpert")}
                secondaryHref="/solutions"
                secondaryLabel={t("cta.secondaryButton")}
            />
        </div>
    );
}

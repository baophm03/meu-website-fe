import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { PageHero, Section, SectionHead, CtaSection, label, displayHeading } from "@/app/[locale]/(main)/_components/section-primitives";
import PagePostsSection from "./_components/page-posts-section";

const whatWeDo = ["item1", "item2", "item3", "item4"] as const;
const steps = ["step1", "step2", "step3", "step4"] as const;
const outcomes = ["outcome1", "outcome2", "outcome3"] as const;

export default function Page({ slug }: { slug: string[] }) { const t = useTranslations("pages.solutions.techTraining");
  const tActions = useTranslations("actions");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.heading")} summary={t("hero.summary")} />
      <Section variant="light">
        <SectionHead eyebrow={t("whatWeDo.eyebrow")} title={t("whatWeDo.heading")} summary={t("whatWeDo.summary")} />
        <ul className="grid gap-4 md:grid-cols-2">
          {whatWeDo.map((item) => (
            <li key={item} className="flex items-start gap-3 border border-border p-6">
              <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <h3 className="text-[16px] font-semibold text-foreground">{t("whatWeDo." + item + "Title")}</h3>
                <p className="mt-1 text-[14px] leading-[1.6] text-muted-foreground">{t("whatWeDo." + item + "Desc")}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
      <Section variant="light">
        <SectionHead eyebrow={t("approach.eyebrow")} title={t("approach.heading")} summary={t("approach.summary")} />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step} className="border border-border p-7">
              <span className={cn(label, "text-primary")}>{t("approach." + step + "Label")}</span>
              <h3 className={cn(displayHeading, "mt-4 text-[18px] leading-[1.2]")}>{t("approach." + step + "Title")}</h3>
              <p className="mt-3 text-[13px] leading-[1.55] text-muted-foreground">{t("approach." + step + "Desc")}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section variant="light">
        <SectionHead eyebrow={t("outcomes.eyebrow")} title={t("outcomes.heading")} summary={t("outcomes.summary")} />
        <div className="grid gap-7 md:grid-cols-3">
          {outcomes.map((outcome, i) => (
            <div key={outcome} className="border-l-2 border-primary p-7">
              <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "mt-4 text-[20px] leading-[1.2]")}>{t("outcomes." + outcome + "Title")}</h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-muted-foreground">{t("outcomes." + outcome + "Desc")}</p>
            </div>
          ))}
        </div>
      </Section>
      <PagePostsSection slug={slug} tone="light" />
      <CtaSection eyebrow={t("cta.eyebrow")} heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=consultation" primaryLabel={tActions("talkToExpert")} secondaryHref="/solutions" secondaryLabel={t("cta.secondaryButton")} />
    </>
  ); }

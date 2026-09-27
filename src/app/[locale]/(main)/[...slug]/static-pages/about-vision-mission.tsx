import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { PageHero, Section, SectionHead, CtaSection, label, displayHeading } from "@/app/[locale]/(main)/_components/section-primitives";

export default function Page() { const t = useTranslations("pages.about.visionMission");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.heading")} summary={t("hero.summary")} />
      <Section variant="light">
        <SectionHead eyebrow={t("vision.eyebrow")} title={t("vision.heading")} summary={t("vision.summary")} />
        <p className="max-w-[720px] text-[16px] leading-[1.7] text-muted-foreground">{t("vision.body")}</p>
      </Section>
      <Section variant="light">
        <SectionHead eyebrow={t("mission.eyebrow")} title={t("mission.heading")} summary={t("mission.summary")} />
        <p className="max-w-[720px] text-[16px] leading-[1.7] text-muted-foreground">{t("mission.body")}</p>
      </Section>
      <Section variant="light">
        <SectionHead eyebrow={t("values.eyebrow")} title={t("values.heading")} summary={t("values.summary")} />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          {["item1", "item2", "item3"].map((item, i) => (
            <div key={item} className="border border-border p-7">
              <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "mt-4 text-[18px] leading-[1.2]")}>{t("values." + item + "Title")}</h3>
              <p className="mt-3 text-[13px] leading-[1.55] text-muted-foreground">{t("values." + item + "Desc")}</p>
            </div>
          ))}
        </div>
      </Section>
      <CtaSection eyebrow={t("cta.eyebrow")} heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=consultation" primaryLabel={t("cta.primaryButton")} secondaryHref="/about" secondaryLabel={t("cta.secondaryButton")} />
    </>
  ); }

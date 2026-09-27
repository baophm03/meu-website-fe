import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { PageHero, Section, SectionHead, CtaSection, label, displayHeading } from "@/app/[locale]/(main)/_components/section-primitives";

const sec1Items = ["item1", "item2", "item3", "item4"] as const;
const sec2Items = ["item1", "item2", "item3"] as const;

export default function Page() { const t = useTranslations("pages.trust.security");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} summary={t("hero.summary")} />
      <Section variant="light">
        <SectionHead eyebrow={t("architecture.eyebrow")} title={t("architecture.heading")} summary={t("architecture.summary")} />
        <div className="grid gap-7 md:grid-cols-2">
          {sec1Items.map((item, i) => (
            <div key={item} className="border border-border p-7">
              <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "mt-4 text-[20px] leading-[1.2]")}>{t("architecture." + item + "Title")}</h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-muted-foreground">{t("architecture." + item + "Desc")}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section variant="light">
        <SectionHead eyebrow={t("environments.eyebrow")} title={t("environments.heading")} summary={t("environments.summary")} />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {sec2Items.map((item, i) => (
            <div key={item} className="border border-border p-7">
              <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "mt-4 text-[18px] leading-[1.2]")}>{t("environments." + item + "Title")}</h3>
              <p className="mt-3 text-[13px] leading-[1.55] text-muted-foreground">{t("environments." + item + "Desc")}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section variant="light">
        <SectionHead eyebrow={t("operations.eyebrow")} title={t("operations.heading")} summary={t("operations.summary")} />
        <p className="max-w-[640px] text-[15px] leading-[1.7] text-muted-foreground">{t("operations.summary")}</p>
      </Section>
      <CtaSection eyebrow={t("cta.eyebrow")} heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=consultation" primaryLabel={t("cta.primaryButton")} secondaryHref="/trust" secondaryLabel={t("cta.secondaryButton")} />
    </>
  ); }

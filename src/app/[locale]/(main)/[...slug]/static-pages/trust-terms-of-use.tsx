import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { PageHero, Section, SectionHead, CtaSection, label, displayHeading } from "@/app/[locale]/(main)/_components/section-primitives";

const sec1Items = ["item1", "item2", "item3", "item4"] as const;
const sec2Items = ["item1", "item2", "item3"] as const;

export default function Page() { const t = useTranslations("pages.trust.termsOfUse");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} summary={t("hero.summary")} />
      <Section variant="light">
        <SectionHead eyebrow={t("terms.eyebrow")} title={t("terms.heading")} summary={t("terms.summary")} />
        <div className="grid gap-7 md:grid-cols-2">
          {sec1Items.map((item, i) => (
            <div key={item} className="border border-border p-7">
              <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "mt-4 text-[20px] leading-[1.2]")}>{t("terms." + item + "Title")}</h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-muted-foreground">{t("terms." + item + "Desc")}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section variant="light">
        <SectionHead eyebrow={t("responsibilities.eyebrow")} title={t("responsibilities.heading")} summary={t("responsibilities.summary")} />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {sec2Items.map((item, i) => (
            <div key={item} className="border border-border p-7">
              <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "mt-4 text-[18px] leading-[1.2]")}>{t("responsibilities." + item + "Title")}</h3>
              <p className="mt-3 text-[13px] leading-[1.55] text-muted-foreground">{t("responsibilities." + item + "Desc")}</p>
            </div>
          ))}
        </div>
      </Section>
      <CtaSection eyebrow={t("cta.eyebrow")} heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=consultation" primaryLabel={t("cta.primaryButton")} secondaryHref="/trust" secondaryLabel={t("cta.secondaryButton")} />
    </>
  ); }

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { PageHero, Section, SectionHead, CtaSection, label, displayHeading } from "@/app/[locale]/(main)/_components/section-primitives";

export default function Page() { const t = useTranslations("pages.about.locations_sub");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.heading")} summary={t("hero.summary")} />
      <Section variant="light">
        <SectionHead eyebrow={t("offices.eyebrow")} title={t("offices.heading")} summary={t("offices.summary")} />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          {["item1"].map((item, i) => (
            <div key={item} className="border border-border p-7">
              <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "mt-4 text-[18px] leading-[1.2]")}>{t("offices." + item + "Title")}</h3>
              <p className="mt-3 text-[13px] leading-[1.55] text-muted-foreground">{t("offices." + item + "Desc")}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section variant="light">
        <SectionHead eyebrow={t("delivery.eyebrow")} title={t("delivery.heading")} summary={t("delivery.summary")} />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          {["item1", "item2", "item3"].map((item, i) => (
            <div key={item} className="border border-border p-7">
              <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "mt-4 text-[18px] leading-[1.2]")}>{t("delivery." + item + "Title")}</h3>
              <p className="mt-3 text-[13px] leading-[1.55] text-muted-foreground">{t("delivery." + item + "Desc")}</p>
            </div>
          ))}
        </div>
      </Section>
      <CtaSection eyebrow={t("cta.eyebrow")} heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=consultation" primaryLabel={t("cta.primaryButton")} secondaryHref="/about" secondaryLabel={t("cta.secondaryButton")} />
    </>
  ); }

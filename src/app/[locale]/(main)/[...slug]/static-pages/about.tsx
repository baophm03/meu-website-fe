import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { PageHero, Section, SectionHead, CtaSection, label, displayHeading } from "@/app/[locale]/(main)/_components/section-primitives";

const values = ["item1", "item2", "item3"] as const;

export default function AboutPage() {
  const t = useTranslations("pages.about");
  const tUs = useTranslations("pages.about.us");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={<>{t("hero.heading1")}<br /><span className="text-primary-light">{t("hero.heading2")}</span></>} summary={t("hero.summary")} />
      <Section variant="light">
        <SectionHead eyebrow={t("story.eyebrow")} title={t("story.heading")} summary={t("story.summary")} />
        <p className="max-w-[720px] text-[16px] leading-[1.7] text-muted-foreground">{t("story.body")}</p>
      </Section>
      <Section variant="light">
        <SectionHead eyebrow={tUs("approach.eyebrow")} title={tUs("approach.heading")} summary={tUs("approach.summary")} />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          {["item1", "item2", "item3", "item4"].map((item, i) => (
            <div key={item} className="border border-border p-7">
              <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "mt-4 text-[18px] leading-[1.2]")}>{tUs("approach." + item + "Title")}</h3>
              <p className="mt-3 text-[13px] leading-[1.55] text-muted-foreground">{tUs("approach." + item + "Desc")}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section variant="light">
        <SectionHead eyebrow={t("values.eyebrow")} title={t("values.heading")} summary={t("values.summary")} />
        <div className="grid border-l border-border border-t border-border lg:grid-cols-3">
          {values.map((item, i) => (
            <article key={item} className="border-b border-border border-r border-border p-7 lg:p-9">
              <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "mt-8 text-[21px] leading-[1.2] sm:text-[24px] lg:mt-16")}>{t("values." + item + "Title")}</h3>
              <p className="mt-3.5 text-[14px] leading-[1.65] text-muted-foreground">{t("values." + item + "Desc")}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section variant="light">
        <SectionHead eyebrow={t("leadership.eyebrow")} title={t("leadership.heading")} summary={t("leadership.summary")} />
        <p className={cn(label, "mt-4 normal-case tracking-[0.06em] text-muted-foreground")}>{t("leadership.note")}</p>
      </Section>
      <Section variant="light">
        <SectionHead eyebrow={t("locations.eyebrow")} title={t("locations.heading")} summary={t("locations.summary")} />
        <div className="grid gap-7 md:grid-cols-2">
          {["item1", "item2"].map((item, i) => (
            <div key={item} className="border border-border p-7">
              <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "mt-4 text-[20px] leading-[1.2]")}>{t("locations." + item + "Title")}</h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-muted-foreground">{t("locations." + item + "Desc")}</p>
            </div>
          ))}
        </div>
      </Section>
      <CtaSection eyebrow={t("cta.eyebrow")} heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=consultation" primaryLabel={t("cta.primaryButton")} secondaryHref="/case-studies" secondaryLabel={t("cta.secondaryButton")} />
    </>
  );
}

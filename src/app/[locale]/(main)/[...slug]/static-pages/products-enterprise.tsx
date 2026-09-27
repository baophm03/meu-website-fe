import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { PageHero, Section, SectionHead, CtaSection, label, displayHeading } from "@/app/[locale]/(main)/_components/section-primitives";

const items = ["mod1", "mod2", "mod3", "mod4"] as const;

export default function Page() { const t = useTranslations("pages.products.enterprise");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={<>{t("hero.heading1")}<br /><span className="text-primary-light">{t("hero.heading2")}</span></>} summary={t("hero.summary")} />
      <Section variant="light">
        <SectionHead eyebrow={t("modules.eyebrow")} title={t("modules.heading")} summary={t("modules.summary")} />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {items.map((prefix, i) => (
            <div key={prefix} className="border border-border p-7">
              <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "mt-4 text-[20px] leading-[1.2]")}>{t(prefix + ".title")}</h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-muted-foreground">{t(prefix + ".desc")}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section variant="light">
        <SectionHead eyebrow={t("architecture.eyebrow")} title={t("architecture.heading")} summary={t("architecture.summary")} />
        <p className="max-w-[640px] text-[15px] leading-[1.7] text-muted-foreground">{t("architecture.summary")}</p>
      </Section>
      <CtaSection eyebrow={t("cta.eyebrow")} heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=demo" primaryLabel={t("cta.primaryButton")} secondaryHref="/products" secondaryLabel={t("cta.secondaryButton")} />
    </>
  ); }

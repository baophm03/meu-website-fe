import { useTranslations } from "next-intl";
import { CtaCinematic } from "@/app/[locale]/(main)/_components/cta/cta-cinematic";
import { PageHero, Section, SectionHead } from "./_components/page-sections";

export default function Page() { const t = useTranslations("pages.about.story_sub");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.heading")} summary={t("hero.summary")} image="/images/hero/hero-3.jpg" />
      <Section variant="light">
        <SectionHead eyebrow={t("origin.eyebrow")} title={t("origin.heading")} summary={t("origin.summary")} />
        <p className="max-w-[720px] text-[16px] leading-[1.7] text-muted-foreground">{t("origin.body")}</p>
      </Section>
      <Section variant="light">
        <SectionHead eyebrow={t("mission.eyebrow")} title={t("mission.heading")} summary={t("mission.summary")} />
        <p className="max-w-[720px] text-[16px] leading-[1.7] text-muted-foreground">{t("mission.body")}</p>
      </Section>
      <CtaCinematic heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=consultation" primaryLabel={t("cta.primaryButton")} secondaryHref="/about" secondaryLabel={t("cta.secondaryButton")} />
    </>
  ); }

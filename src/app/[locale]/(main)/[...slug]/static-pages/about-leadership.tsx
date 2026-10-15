import { useTranslations } from "next-intl";
import { CtaCinematic } from "@/app/[locale]/(main)/_components/cta/cta-cinematic";
import { PageHero, Section, SectionHead } from "./_components/page-sections";

export default function Page() { const t = useTranslations("pages.about.leadership_sub");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.heading")} summary={t("hero.summary")} image="/images/hero/hero-5.jpg" />
      <Section variant="light">
        <SectionHead eyebrow={t("team.eyebrow")} title={t("team.heading")} summary={t("team.summary")} />
        <p className="max-w-[720px] text-[16px] leading-[1.7] text-muted-foreground">{t("team.note")}</p>
      </Section>
      <CtaCinematic heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=consultation" primaryLabel={t("cta.primaryButton")} secondaryHref="/about" secondaryLabel={t("cta.secondaryButton")} />
    </>
  ); }

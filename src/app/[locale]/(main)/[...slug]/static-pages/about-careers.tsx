import { useTranslations } from "next-intl";
import { PageHero, Section, CtaSection } from "@/app/[locale]/(main)/_components/section-primitives";
import CareersJobs from "./_components/careers-jobs";

export default function Page() {
  const t = useTranslations("pages.about.careers");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.heading")} summary={t("hero.summary")} />
      <Section variant="light" className="lg:py-24">
        <CareersJobs />
      </Section>
      <CtaSection eyebrow={t("cta.eyebrow")} heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact" primaryLabel={t("cta.primaryButton")} secondaryHref="/about" secondaryLabel={t("cta.secondaryButton")} />
    </>
  );
}

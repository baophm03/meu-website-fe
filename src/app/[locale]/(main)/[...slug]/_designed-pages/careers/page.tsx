import { useTranslations } from "next-intl";
import { CtaCinematic } from "@/components/shared/cta/cta-cinematic";
import CareersJobs from "./_components/careers-jobs";
import { PageHero, Section } from "../_components/page-sections";

export default function Page() {
  const t = useTranslations("pages.about.careers");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.heading")} summary={t("hero.summary")} image="/images/industries/associations/associations-2.jpg" />
      <Section variant="light" className="lg:py-24">
        <CareersJobs />
      </Section>
      <CtaCinematic heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact" primaryLabel={t("cta.primaryButton")} secondaryHref="/about" secondaryLabel={t("cta.secondaryButton")} />
    </>
  );
}

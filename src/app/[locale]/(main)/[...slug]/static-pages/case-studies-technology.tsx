import { useTranslations } from "next-intl";
import { CtaGrid } from "@/app/[locale]/(main)/_components/cta/cta-grid";
import PagePostsSection from "./_components/page-posts-section";
import { PageHero } from "./_components/page-sections";

export default function Page({ slug }: { slug?: string[] }) {
  const t = useTranslations("pages.caseStudies.technology_sub");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.heading")} summary={t("hero.summary")} image="/images/solutions/custom-software.jpg" />
      {slug ? <PagePostsSection slug={slug} tone="light" linkSuffix="?type=case-studies" /> : null}
      <CtaGrid heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=consultation" primaryLabel={t("cta.primaryButton")} secondaryHref="/case-studies" secondaryLabel={t("cta.secondaryButton")} />
    </>
  );
}

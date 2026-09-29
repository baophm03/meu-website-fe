import { useTranslations } from "next-intl";
import { CtaGrid } from "@/app/[locale]/(main)/_components/cta/cta-grid";
import PagePostsSection from "./_components/page-posts-section";

export default function CaseStudiesPage({ slug }: { slug?: string[] }) {
  const t = useTranslations("pages.caseStudies");
  return (
    <>
      {slug ? <PagePostsSection slug={slug} tone="light" linkSuffix="?type=case-studies" /> : null}
      <CtaGrid eyebrow={t("cta.eyebrow")} heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=consultation" primaryLabel={t("cta.primaryButton")} secondaryHref="/solutions" secondaryLabel={t("cta.secondaryButton")} />
    </>
  );
}

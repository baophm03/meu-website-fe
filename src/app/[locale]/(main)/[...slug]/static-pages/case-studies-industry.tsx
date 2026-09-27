import { useTranslations } from "next-intl";
import { PageHero, CtaSection } from "@/app/[locale]/(main)/_components/section-primitives";
import PagePostsSection from "./_components/page-posts-section";

export default function Page({ slug }: { slug?: string[] }) {
  const t = useTranslations("pages.caseStudies.industry_sub");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.heading")} summary={t("hero.summary")} />
      {slug ? <PagePostsSection slug={slug} tone="light" linkSuffix="?type=case-studies" /> : null}
      <CtaSection eyebrow={t("cta.eyebrow")} heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=consultation" primaryLabel={t("cta.primaryButton")} secondaryHref="/case-studies" secondaryLabel={t("cta.secondaryButton")} />
    </>
  );
}

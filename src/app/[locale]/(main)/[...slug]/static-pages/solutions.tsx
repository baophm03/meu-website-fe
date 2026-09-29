import { useTranslations } from "next-intl";
import { CtaEditorial } from "@/app/[locale]/(main)/_components/cta/cta-editorial";
import PagePostsSection from "./_components/page-posts-section";

export default function SolutionsPage({ slug }: { slug: string[] }) {
  const t = useTranslations("pages.solutions");
  const tActions = useTranslations("actions");
  return (
    <>
      <PagePostsSection slug={slug} tone="light" linkSuffix="?type=solutions" />

      <CtaEditorial
        eyebrow={t("cta.eyebrow")}
        heading1={t("cta.heading1")}
        heading2={t("cta.heading2")}
        description={t("cta.description")}
        primaryHref="/contact?type=consultation"
        primaryLabel={tActions("talkToExpert")}
        hideEyebrowRail
      />
    </>
  );
}

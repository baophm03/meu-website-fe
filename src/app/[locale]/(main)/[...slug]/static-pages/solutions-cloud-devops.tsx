import { useTranslations } from "next-intl";
import PagePostsSection from "./_components/page-posts-section";
import { CtaEditorial } from "@/app/[locale]/(main)/_components/cta/cta-editorial";

export default function Page({ slug }: { slug: string[] }) {
  const t = useTranslations("pages.solutions.cloudDevops");
  const tActions = useTranslations("actions");

  return (
    <>
      {slug ? <PagePostsSection slug={slug} tone="light" linkSuffix="?type=solutions" /> : null}

      <CtaEditorial eyebrow={t("cta.eyebrow")} heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=consultation" primaryLabel={tActions("talkToExpert")} secondaryHref="/solutions" secondaryLabel={t("cta.secondaryButton")} />
    </>
  );
}

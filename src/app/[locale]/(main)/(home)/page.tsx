import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "./_components/hero";
import { ProofStrip } from "./_components/proof-strip";
import { Challenges } from "./_components/challenges";
import { BusinessSolutions } from "./_components/business-solutions";
import { AiWorkflow } from "./_components/ai-workflow";
import { Industries } from "./_components/industries";
import { ClientSuccess } from "./_components/client-success";
import { WhyMeu } from "./_components/why-meu";
import { Insights } from "./_components/insights";
import { FinalCta } from "./_components/final-cta";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home.metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <ProofStrip />
      <Challenges />
      <BusinessSolutions />
      <AiWorkflow />
      <Industries />
      <ClientSuccess />
      <WhyMeu />
      <Insights />
      <FinalCta />
    </>
  );
}

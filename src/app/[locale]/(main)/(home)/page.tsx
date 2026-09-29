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
import { CtaCinematic } from "@/app/[locale]/(main)/_components/cta/cta-cinematic";

type Props = { params: Promise<{ locale: string }>; };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home.metadata" });
  return {
    title: t("title"),
    description: t("description")
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home.finalCta");
  const tActions = await getTranslations("actions");
  return (
    <div className="relative bg-surface-dark text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[14%] top-[2%] h-[760px] w-[58%] rounded-full bg-primary/[0.22] blur-[140px]" />
        <div className="absolute right-[-16%] top-[14%] h-[840px] w-[54%] rounded-full bg-cyan-400/[0.16] blur-[150px]" />
        <div className="absolute left-[-8%] top-[34%] h-[780px] w-[52%] rounded-full bg-violet-500/[0.18] blur-[150px]" />
        <div className="absolute right-[-10%] top-[52%] h-[760px] w-[50%] rounded-full bg-primary/[0.18] blur-[140px]" />
        <div className="absolute left-[10%] top-[70%] h-[700px] w-[48%] rounded-full bg-fuchsia-500/[0.12] blur-[150px]" />
        <div className="absolute right-[8%] top-[88%] h-[640px] w-[46%] rounded-full bg-cyan-400/[0.12] blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[length:26px_26px] opacity-[0.5] [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_78%,transparent)]" />
        <div className="absolute -top-1/4 left-[18%] h-[160%] w-px rotate-[24deg] bg-[linear-gradient(to_bottom,transparent,rgba(0,240,255,0.5),transparent)]" />
        <div className="absolute -top-1/4 right-[24%] h-[160%] w-px rotate-[24deg] bg-[linear-gradient(to_bottom,transparent,rgba(139,92,246,0.45),transparent)]" />
      </div>
      <div className="relative">
        <Hero />
        <ProofStrip />
        <Challenges />
        <BusinessSolutions />
        <AiWorkflow />
        <Industries />
        <ClientSuccess />
        <WhyMeu />
        <Insights />
        <CtaCinematic
          eyebrow={t("eyebrow")}
          heading1={t("heading1")}
          heading2={t("heading2")}
          description={t("description")}
          primaryHref="/contact?type=consultation"
          primaryLabel={tActions("talkToExpert")}
          secondaryHref="/case-studies"
          secondaryLabel={t("secondaryButton")}
        />
      </div>
    </div>
  );
}

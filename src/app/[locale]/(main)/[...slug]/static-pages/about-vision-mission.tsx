import { useTranslations } from "next-intl";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CtaCinematic } from "@/app/[locale]/(main)/_components/cta/cta-cinematic";
import { PageHero, Section, SectionHead, displayHeading, label } from "./_components/page-sections";

export default function Page() {
  const t = useTranslations("pages.about.visionMission");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.heading")} summary={t("hero.summary")} image="/images/hero/hero-2.jpg" />
      <Section variant="light">
        <div className="grid items-start gap-6 md:grid-cols-2 md:gap-8">
          <article className="group relative overflow-hidden rounded-2xl border border-border bg-[#F9F9FA] p-8 text-slate-900 shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition-all duration-300 hover:z-10 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_24px_50px_rgba(49,92,255,0.22)] md:translate-y-0 md:hover:-translate-y-2 sm:p-10">
            <div className="relative">
              <p className={cn(label, "text-primary")}>
                {t("vision.eyebrow")}
              </p>
              <h2 className={cn(displayHeading, "mt-4 text-[24px] leading-[1.15] text-slate-900 sm:text-[28px]")}>{t("vision.heading")}</h2>
              <p className="mt-4 text-[16px] leading-[1.7] text-muted-foreground">{t("vision.body")}</p>
              <div className="relative mt-7 aspect-[16/7] overflow-hidden rounded-xl">
                <Image src="/images/solutions/digital-transformation.jpg" alt={t("vision.heading")} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-blue-950/25 to-transparent" />
              </div>
            </div>
          </article>
          <article className="group relative overflow-hidden rounded-2xl border border-border bg-[#F9F9FA] p-8 text-slate-900 shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition-all duration-300 hover:z-10 hover:-translate-y-2 hover:border-[#F9C359] hover:shadow-[0_24px_50px_rgba(249,195,89,0.24)] md:mt-8 sm:p-10">
            <div className="relative">
              <p className={cn(label, "text-[#F9C359]")}>
                {t("mission.eyebrow")}
              </p>
              <h2 className={cn(displayHeading, "mt-4 text-[24px] leading-[1.15] text-slate-900 sm:text-[28px]")}>{t("mission.heading")}</h2>
              <p className="mt-4 text-[16px] leading-[1.7] text-muted-foreground">{t("mission.body")}</p>
              <div className="relative mt-7 aspect-[16/7] overflow-hidden rounded-xl">
                <Image src="/images/solutions/custom-software.jpg" alt={t("mission.heading")} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-amber-950/25 to-transparent" />
              </div>
            </div>
          </article>
        </div>
      </Section>
      <Section variant="light">
        <SectionHead eyebrow={t("values.eyebrow")} title={t("values.heading")} summary={t("values.summary")} />
        <div className="grid gap-7 md:grid-cols-12">
          {["item1", "item2", "item3"].map((item, i) => (
            <div key={item} className="border border-border p-7 md:col-span-4">
              <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "mt-4 text-[18px] leading-[1.2]")}>{t("values." + item + "Title")}</h3>
              <p className="mt-3 text-[13px] leading-[1.55] text-muted-foreground">{t("values." + item + "Desc")}</p>
            </div>
          ))}
        </div>
      </Section>
      <CtaCinematic heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=consultation" primaryLabel={t("cta.primaryButton")} secondaryHref="/about" secondaryLabel={t("cta.secondaryButton")} />
    </>
  );
}

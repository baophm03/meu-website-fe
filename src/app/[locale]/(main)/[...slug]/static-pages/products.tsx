import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { PageHero, Section, SectionHead, CtaSection, label, displayHeading } from "@/app/[locale]/(main)/_components/section-primitives";

const cats = ["cat1", "cat2", "cat3", "cat4"] as const;
const steps = ["step1", "step2", "step3", "step4"] as const;

export default function ProductsPage() {
  const t = useTranslations("pages.products");
  const tActions = useTranslations("actions");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={<>{t("hero.heading1")}<br /><span className="text-primary-light">{t("hero.heading2")}</span></>} summary={t("hero.summary")} />
      <Section variant="light">
        <SectionHead eyebrow={t("categories.eyebrow")} title={t("categories.heading")} summary={t("categories.summary")} />
        <div className="grid border-l border-border border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {cats.map((cat, i) => (
            <Link key={cat} href={t(cat + ".href")} className="group relative flex min-h-[280px] flex-col border-b border-border border-r border-border p-7 transition-colors hover:bg-muted lg:p-9">
              <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "mt-auto pt-20 text-[22px] leading-[1.1] transition-colors group-hover:text-foreground sm:text-[26px]")}>{t(cat + ".title")}</h3>
              <p className="mt-3 text-[13px] leading-[1.55] text-muted-foreground transition-colors group-hover:text-muted-foreground">{t(cat + ".desc")}</p>
              <ArrowUpRight aria-hidden="true" className="absolute bottom-7 right-7 h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </Section>
      <Section variant="light">
        <SectionHead eyebrow={t("approach.eyebrow")} title={t("approach.heading")} summary={t("approach.summary")} />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step} className="border border-border p-7">
              <span className={cn(label, "text-primary")}>{t("approach." + step + "Label")}</span>
              <h3 className={cn(displayHeading, "mt-4 text-[20px] leading-[1.2]")}>{t("approach." + step + "Title")}</h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-muted-foreground">{t("approach." + step + "Desc")}</p>
            </div>
          ))}
        </div>
      </Section>
      <CtaSection eyebrow={t("cta.eyebrow")} heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=demo" primaryLabel={t("cta.primaryButton")} secondaryHref="/solutions" secondaryLabel={t("cta.secondaryButton")} />
    </>
  );
}

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { PageHero, Section, SectionHead, CtaSection, label, displayHeading } from "@/app/[locale]/(main)/_components/section-primitives";

const overviewItems = ["item1", "item2", "item3", "item4"] as const;
const complianceItems = ["item1", "item2", "item3", "item4"] as const;
const exploreLinks = [
  ["link1", "link1Desc", "/trust/security"],
  ["link2", "link2Desc", "/trust/privacy"],
  ["link3", "link3Desc", "/trust/data-protection"],
  ["link4", "link4Desc", "/trust/responsible-ai"],
] as const;

export default function TrustPage() { const t = useTranslations("pages.trust");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} summary={t("hero.summary")} />
      <Section variant="light">
        <SectionHead eyebrow={t("overview.eyebrow")} title={t("overview.heading")} summary={t("overview.summary")} />
        <div className="grid gap-7 md:grid-cols-2">
          {overviewItems.map((item, i) => (
            <div key={item} className="border border-border p-7">
              <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "mt-4 text-[20px] leading-[1.2]")}>{t("overview." + item + "Title")}</h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-muted-foreground">{t("overview." + item + "Desc")}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section variant="light">
        <SectionHead eyebrow={t("compliance.eyebrow")} title={t("compliance.heading")} summary={t("compliance.summary")} />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          {complianceItems.map((item, i) => (
            <div key={item} className="border border-border p-7">
              <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "mt-4 text-[18px] leading-[1.2]")}>{t("compliance." + item + "Title")}</h3>
              <p className="mt-3 text-[13px] leading-[1.55] text-muted-foreground">{t("compliance." + item + "Desc")}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section variant="light">
        <SectionHead eyebrow={t("explore.eyebrow")} title={t("explore.heading")} summary={t("explore.summary")} />
        <div className="grid border-l border-border border-t border-border sm:grid-cols-2">
          {exploreLinks.map(([linkKey, descKey, href]) => (
            <Link key={linkKey} href={href} className="group border-b border-border border-r border-border p-7 transition-colors hover:bg-muted">
              <h3 className={cn(displayHeading, "text-[20px] transition-colors group-hover:text-foreground")}>{t("explore." + linkKey)}</h3>
              <p className="mt-2 text-[13px] leading-[1.55] text-muted-foreground transition-colors group-hover:text-muted-foreground">{t("explore." + descKey)}</p>
            </Link>
          ))}
        </div>
      </Section>
      <CtaSection eyebrow={t("cta.eyebrow")} heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=consultation" primaryLabel={t("cta.primaryButton")} secondaryHref="/solutions" secondaryLabel={t("cta.secondaryButton")} />
    </>
  ); }

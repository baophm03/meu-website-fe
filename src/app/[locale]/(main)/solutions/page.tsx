import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHero, Section, SectionHead, CtaSection, PrimaryButton, SecondaryButton, label } from "../_components/section-primitives";

const businessItems = ["item1", "item2", "item3", "item4", "item5", "item6", "item7"] as const;
const techItems = ["item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8"] as const;
const talentItems = ["item1", "item2"] as const;

function CategoryHead({ letter, title, count, dark = false }: { letter: string; title: string; count: string; dark?: boolean }) {
  return (
    <div className={cn("mb-8 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-b pb-4 sm:mb-10", dark ? "border-white/15" : "border-border")}>
      <span className="font-semibold text-primary tracking-[-0.04em] text-[40px] leading-none sm:text-[56px]">{letter}</span>
      <span className={cn("font-medium tracking-[-0.03em] uppercase text-[22px] leading-none sm:text-[30px]", dark ? "text-white" : "text-foreground")}>{title}</span>
      <span className={cn("ml-auto", label, dark ? "text-white/50" : "text-muted-foreground")}>{count}</span>
    </div>
  );
}

function ServiceCard({ index, title, copy, dark = false, ariaLabel }: { index: string; title: string; copy: string; dark?: boolean; ariaLabel?: string }) {
  return (
    <Link
      href="/contact"
      aria-label={ariaLabel ?? title}
      className={cn(
        "group relative flex min-h-[200px] flex-col gap-3.5 p-7 transition duration-200 focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-primary-light sm:p-9",
        dark ? "hover:bg-primary/10" : "hover:bg-primary/[0.06]",
      )}
    >
      <span className={cn(label, dark ? "text-white/50" : "text-muted-foreground")}>{index}</span>
      <h3 className={cn("text-[20px] font-medium leading-[1.2] tracking-[-0.02em]", dark ? "text-white" : "text-foreground")}>{title}</h3>
      <p className={cn("text-[14px] leading-[1.55]", dark ? "text-white/55" : "text-muted-foreground")}>{copy}</p>
      <ArrowUpRight
        aria-hidden="true"
        className={cn(
          "absolute right-7 top-7 h-[18px] w-[18px] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none",
          dark ? "text-white/40 group-hover:text-primary-light" : "text-muted-foreground group-hover:text-primary",
        )}
      />
    </Link>
  );
}

function ServiceGrid({ items, t, prefix, columns = 3, dark = false, ariaLabelTemplate }: { items: readonly string[]; t: (key: string) => string; prefix: string; columns?: 2 | 3; dark?: boolean; ariaLabelTemplate?: (title: string) => string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 border-l border-t sm:grid-cols-2 lg:grid-cols-3",
        columns === 2 && "lg:grid-cols-2",
        dark ? "border-white/15" : "border-border",
      )}
    >
      {items.map((item, i) => (
        <div key={item} className={cn("border-b border-r", dark ? "border-white/15" : "border-border")}>
          <ServiceCard index={`0${i + 1}`} title={t(`${prefix}.${item}Title`)} copy={t(`${prefix}.${item}Desc`)} dark={dark} ariaLabel={ariaLabelTemplate ? ariaLabelTemplate(t(`${prefix}.${item}Title`)) : undefined} />
        </div>
      ))}
    </div>
  );
}

export default function SolutionsPage() {
  const t = useTranslations("pages.solutions");
  const tActions = useTranslations("actions");
  const ariaLabelTemplate = (title: string) => tActions("serviceCardAriaLabel", { title });
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={<>{t("hero.heading1")}<br /><span className="text-primary">{t("hero.heading2")}</span></>} summary={t("hero.summary")}>
        <PrimaryButton href="/contact?type=consultation">{t("hero.primaryButton")}</PrimaryButton>
        <SecondaryButton href="#business-solutions" tone="dark">{t("hero.secondaryButton")}</SecondaryButton>
      </PageHero>

      {/* A. Business Solutions */}
      <Section id="business-solutions" variant="white">
        <SectionHead
          index={t("businessSolutions.index")}
          eyebrow={t("businessSolutions.eyebrow")}
          title={<>{t("businessSolutions.heading1")} <span className="text-muted-foreground/70">{t("businessSolutions.heading2")}</span></>}
          summary={t("businessSolutions.copy")}
        />
        <CategoryHead letter={t("businessSolutions.categoryLetter")} title={t("businessSolutions.categoryTitle")} count={t("businessSolutions.categoryCount")} />
        <ServiceGrid items={businessItems} t={t} prefix="businessSolutions" columns={3} ariaLabelTemplate={ariaLabelTemplate} />
      </Section>

      {/* B. Technology Capabilities */}
      <Section id="technology-capabilities" variant="dark">
        <SectionHead
          index={t("techCapabilities.index")}
          eyebrow={t("techCapabilities.eyebrow")}
          title={<>{t("techCapabilities.heading1")} <span className="text-white/45">{t("techCapabilities.heading2")}</span></>}
          summary={t("techCapabilities.copy")}
          tone="dark"
        />
        <CategoryHead letter={t("techCapabilities.categoryLetter")} title={t("techCapabilities.categoryTitle")} count={t("techCapabilities.categoryCount")} dark />
        <ServiceGrid items={techItems} t={t} prefix="techCapabilities" columns={3} dark ariaLabelTemplate={ariaLabelTemplate} />
      </Section>

      {/* C. Talent & Enablement */}
      <Section id="talent-enablement" variant="surface">
        <SectionHead
          index={t("talentEnablement.index")}
          eyebrow={t("talentEnablement.eyebrow")}
          title={<>{t("talentEnablement.heading1")} <span className="text-muted-foreground/70">{t("talentEnablement.heading2")}</span></>}
          summary={t("talentEnablement.copy")}
        />
        <CategoryHead letter={t("talentEnablement.categoryLetter")} title={t("talentEnablement.categoryTitle")} count={t("talentEnablement.categoryCount")} />
        <ServiceGrid items={talentItems} t={t} prefix="talentEnablement" columns={2} ariaLabelTemplate={ariaLabelTemplate} />
      </Section>

      <CtaSection
        eyebrow={t("cta.eyebrow")}
        heading1={t("cta.heading1")}
        heading2={t("cta.heading2")}
        description={t("cta.description")}
        primaryHref="/contact?type=consultation"
        primaryLabel={tActions("talkToExpert")}
      />
    </>
  );
}

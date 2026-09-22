import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";
import { MetricCounter } from "@/components/shared/metric-counter";
import { useTranslations } from "next-intl";

const shell = "container";
const displayHeading = "font-medium tracking-[-0.045em] text-balance";
const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

function Section({
  id,
  variant = "white",
  className,
  children,
  labelledBy,
}: {
  id?: string;
  variant?: "white" | "surface" | "dark";
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  const variants = {
    white: "bg-background text-foreground",
    surface: "bg-muted text-foreground",
    dark: "bg-surface-dark-soft text-white",
  } as const;
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("scroll-mt-20 py-16 sm:py-24 lg:py-[128px]", variants[variant], className)}>
      <Reveal className={shell}>{children}</Reveal>
    </section>
  );
}

function SectionHead({
  id,
  index,
  eyebrow,
  title,
  summary,
  tone = "light",
  action,
}: {
  id?: string;
  index?: string;
  eyebrow: string;
  title: ReactNode;
  summary?: string;
  tone?: "light" | "dark";
  action?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <div className="mb-12 sm:mb-16">
      <div className={cn("flex items-start gap-5", label)}>
        {index ? <span className="text-primary">{index}</span> : null}
        <span className={dark ? "text-white/50" : "text-muted-foreground"}>{eyebrow}</span>
      </div>
      <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <h2 id={id} className={cn(displayHeading, "max-w-[720px] text-[34px] leading-[1.04] sm:text-[46px] lg:text-[62px]", dark ? "text-white" : "text-foreground")}>{title}</h2>
        <div className="flex max-w-md shrink-0 flex-col items-start gap-6">
          {summary ? <p className={cn("text-[15px] leading-[1.7]", dark ? "text-white/60" : "text-muted-foreground")}>{summary}</p> : null}
          {action}
        </div>
      </div>
    </div>
  );
}

export function WhyMeu() {
  const t = useTranslations("home.whyMeu");

  const differentiators = [
    ["01", t("d1Title"), t("d1Desc")],
    ["02", t("d2Title"), t("d2Desc")],
    ["03", t("d3Title"), t("d3Desc")],
    ["04", t("d4Title"), t("d4Desc")],
    ["05", t("d5Title"), t("d5Desc")],
  ] as const;

  const stats = [
    { value: 10, suffix: "+", label: t("stat1Label") },
    { value: 20, suffix: "+", label: t("stat2Label") },
    { value: 100, suffix: "+", label: t("stat3Label") },
  ];

  return (
    <Section variant="white" id="why-meu">
      <SectionHead
        index="06"
        eyebrow={t("eyebrow")}
        title={
          <>
            {t("heading")}
          </>
        }
        summary={t("summary")}
      />

      <div className="mb-12 grid gap-8 border-y border-border py-10 sm:grid-cols-3 lg:mb-16 lg:py-12">
        {stats.map((stat, index) => (
          <div key={stat.label} className={cn("flex flex-col gap-3 sm:px-10 sm:first:pl-0 sm:last:pr-0", index > 0 ? "sm:border-l sm:border-border" : "")}>
            <MetricCounter
              value={stat.value}
              suffix={stat.suffix}
              className="text-[44px] font-medium leading-none tracking-[-0.03em] text-primary sm:text-[54px] lg:text-[60px]"
            />
            <span className={cn(label, "text-muted-foreground")}>{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-5">
        {differentiators.map(([index, title, copy]) => (
          <article key={index} className="flex flex-col border-b border-r border-border p-7 sm:min-h-[260px] lg:p-8">
            <span className={cn(label, "text-primary")}>{index}</span>
            <h3 className={cn(displayHeading, "mt-8 text-[21px] leading-[1.2] sm:text-[23px] lg:mt-auto lg:pt-14")}>{title}</h3>
            <p className="mt-3.5 text-[14px] leading-[1.65] text-muted-foreground">{copy}</p>
          </article>
        ))}
      </div>

      <div className={cn(label, "mt-8 flex flex-col justify-between gap-3 border-t border-border pt-6 normal-case tracking-[0.06em] text-muted-foreground sm:flex-row sm:items-center")}>
        <span>{t("footerNote")}</span>
        <span className="uppercase tracking-[0.14em] text-primary">{t("proofNotPromises")}</span>
      </div>
    </Section>
  );
}

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";
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

function ArrowLink({ href, children, tone = "light", className }: { href: string; children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-4 border-b pb-2 text-[11px] font-bold uppercase tracking-[0.1em] transition focus-visible:outline-2 focus-visible:outline-offset-4",
        tone === "dark" ? "border-white/35 text-white hover:border-primary-light focus-visible:outline-primary-light" : "border-border text-foreground hover:border-primary hover:text-primary focus-visible:outline-primary",
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </Link>
  );
}

export function Insights() {
  const t = useTranslations("home.insights");

  const insights = [
    [t("card1Meta"), t("card1Title"), t("card1Desc"), "/insights/ai-automation", "/images/insights/insight-1.jpg"],
    [t("card2Meta"), t("card2Title"), t("card2Desc"), "/insights/enterprise-tech", "/images/insights/insight-2.jpg"],
    [t("card3Meta"), t("card3Title"), t("card3Desc"), "/insights/digital-transformation", "/images/insights/insight-3.jpg"],
    [t("card4Meta"), t("card4Title"), t("card4Desc"), "/insights/ai-agents-operations", "/images/insights/insight-4.jpg"],
    [t("card5Meta"), t("card5Title"), t("card5Desc"), "/insights/erp-implementation", "/images/insights/insight-5.jpg"],
    [t("card6Meta"), t("card6Title"), t("card6Desc"), "/insights/website-operations-channel", "/images/insights/insight-6.jpg"],
  ] as const;

  return (
    <Section variant="surface" id="insights">
      <SectionHead
        index="07"
        eyebrow={t("eyebrow")}
        title={
          <>
            {t("heading")}
          </>
        }
        action={<ArrowLink href="/insights">{t("insightsHub")}</ArrowLink>}
      />

      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {insights.map(([meta, title, copy, href, image], index) => (
          <article key={title} className="group flex flex-col">
            <Link href={href} className="focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-primary">
              <span className="relative block h-[200px] overflow-hidden bg-surface-dark-raised sm:h-[220px]">
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,6,8,0.35),transparent_45%)]" />
                <span className={cn(label, "absolute left-6 top-6 z-10 rounded-full bg-surface-dark/70 px-3 py-1.5 text-primary-light backdrop-blur-sm")}>{`0${index + 1}`}</span>
              </span>
            </Link>
            <span className={cn(label, "mt-6 text-primary")}>{meta}</span>
            <h3 className={cn(displayHeading, "mt-3 text-[21px] leading-[1.25] sm:text-[23px]")}>
              <Link href={href} className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                {title}
              </Link>
            </h3>
            <p className="mt-3 flex-1 text-[14px] leading-[1.6] text-muted-foreground">{copy}</p>
            <div className="mt-6">
              <ArrowLink href={href}>{t("readInsight")}</ArrowLink>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { useTranslations } from "next-intl";
import { IndustriesCarousel, type IndustryItem } from "./industries-carousel";

const shell = "container";
const displayHeading = "font-medium tracking-[-0.045em] text-balance";
const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

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

export function Industries() {
  const t = useTranslations("home.industries");
  const items: IndustryItem[] = [
    { title: t("ind1Title"), href: "/industries/healthcare", desc: t("ind1Desc"), icon: "healthcare" },
    { title: t("ind2Title"), href: "/industries/logistics-supply-chain", desc: t("ind2Desc"), icon: "logistics" },
    { title: t("ind3Title"), href: "/industries/retail-commerce", desc: t("ind3Desc"), icon: "retail" },
    { title: t("ind4Title"), href: "/industries/pharmaceutical-life-sciences", desc: t("ind4Desc"), icon: "pharma" },
    { title: t("ind5Title"), href: "/industries/education-training", desc: t("ind5Desc"), icon: "education" },
    { title: t("ind6Title"), href: "/industries/associations-organizations", desc: t("ind6Desc"), icon: "associations" },
  ];

  return (
    <section id="industries" aria-labelledby="industries-title" className="scroll-mt-20 overflow-hidden bg-surface-dark py-16 text-white sm:py-20 lg:py-[80px]">
      <div className={shell}>
        <div className="mb-10 grid gap-6 sm:mb-14 lg:grid-cols-[minmax(0,1fr)_2.15fr] lg:gap-12">
          <div className={cn("flex items-start gap-5 lg:pt-3", label)}>
            <span className="text-primary-light">06</span>
            <span className="text-white/50">{t("eyebrow")}</span>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
            <h2 id="industries-title" className={cn(displayHeading, "text-[34px] leading-[1.04] text-white sm:text-[46px] lg:text-[56px]")}>{t("heading")}</h2>
            <div className="flex flex-col items-start gap-6 lg:pt-2">
              <p className="max-w-md text-[15px] leading-[1.7] text-white/60">{t("summary")}</p>
              <ArrowLink href="/industries" tone="dark">
                {t("allIndustries")}
              </ArrowLink>
            </div>
          </div>
        </div>

        <ScrollReveal y={36}>
          <IndustriesCarousel items={items} hint={t("scrollHint")} />
        </ScrollReveal>
      </div>
    </section>
  );
}

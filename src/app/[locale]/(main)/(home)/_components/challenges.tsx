import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { useTranslations } from "next-intl";

const shell = "container";
const displayHeading = "font-medium tracking-[-0.045em] text-balance";
const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

export function Challenges() {
  const t = useTranslations("home.challenges");
  const challenges = [
    ["01", t("c1Title"), t("c1Desc")],
    ["02", t("c2Title"), t("c2Desc")],
    ["03", t("c3Title"), t("c3Desc")],
    ["04", t("c4Title"), t("c4Desc")],
    ["05", t("c5Title"), t("c5Desc")],
    ["06", t("c6Title"), t("c6Desc")],
  ];

  return (
    <section id="challenges" aria-labelledby="challenges-title" className="scroll-mt-20 bg-background py-16 text-foreground sm:py-24 lg:py-[140px]">
      <div className={cn(shell, "grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16")}>
        {/* 40% — giant accent typography, sticky on desktop */}
        <ScrollReveal y={36} className="lg:sticky lg:top-28 lg:self-start">
          <span className={cn(label, "inline-flex items-center gap-5")}>
            <span className="text-primary">01</span>
            <span className="text-muted-foreground">{t("eyebrow")}</span>
          </span>
          <h2 id="challenges-title" className={cn(displayHeading, "mt-6 text-[44px] leading-[0.98] sm:text-[58px] lg:text-[76px]")}>
            {t("heading")}
          </h2>
          <p className="mt-7 max-w-[380px] text-[15px] leading-[1.7] text-muted-foreground sm:text-[16px]">{t("summary")}</p>
        </ScrollReveal>

        {/* 60% — high-contrast list rows */}
        <ScrollReveal itemSelector="[data-challenge]" y={36} stagger={0.1}>
          <div className="border-t border-border">
            {challenges.map(([index, title, copy]) => (
              <article
                key={index}
                data-challenge
                className="group grid grid-cols-[40px_1fr_44px] items-center gap-4 border-b border-border py-7 transition-[padding,background-color] duration-200 hover:bg-muted sm:grid-cols-[72px_1fr_52px] sm:py-8 lg:hover:pl-4 motion-reduce:transition-none"
              >
                <span className={cn(label, "self-start pt-1.5 text-primary sm:pt-2")}>{index}</span>
                <div>
                  <h3 className={cn(displayHeading, "text-[21px] leading-[1.15] sm:text-[26px] lg:text-[30px]")}>{title}</h3>
                  <p className="mt-2 max-w-[560px] text-[14px] leading-[1.6] text-muted-foreground">{copy}</p>
                </div>
                <Link
                  href="/solutions"
                  aria-label={t("explore", { title })}
                  className="grid size-11 place-items-center border border-border text-foreground transition group-hover:border-primary group-hover:bg-primary group-hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:size-12"
                >
                  <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
                </Link>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

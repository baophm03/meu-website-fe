import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/shared/safe-image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { useTranslations } from "next-intl";

const shell = "container";
const displayHeading = "font-medium tracking-[-0.045em] text-balance";

const CHALLENGE_IMAGES = [
  "/images/solutions/website-ops.jpg",
  "/images/industries/retail.jpg",
  "/images/industries/associations.jpg",
  "/images/industries/logistics.jpg",
  "/images/solutions/enterprise-management.jpg",
  "/images/solutions/digital-transformation.jpg",
] as const;

export function Challenges() { const t = useTranslations("home.challenges");
  const challenges = [
    ["01", t("c1Title"), t("c1Desc")],
    ["02", t("c2Title"), t("c2Desc")],
    ["03", t("c3Title"), t("c3Desc")],
    ["04", t("c4Title"), t("c4Desc")],
    ["05", t("c5Title"), t("c5Desc")],
    ["06", t("c6Title"), t("c6Desc")],
  ];

  return (
    <section id="challenges" aria-labelledby="challenges-title" className="scroll-mt-20 py-16 text-white sm:py-24 lg:py-24">
      <div className={cn(shell, "grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16")}>
        {/* 40% — sticky intro panel */}
        <ScrollReveal y={36} className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="challenges-title" className={cn(displayHeading, "text-[44px] leading-[0.98] sm:text-[58px] lg:text-[72px]")}>
            {t("heading")}
          </h2>
          <p className="mt-7 max-w-[380px] text-[15px] leading-[1.7] text-white/55 sm:text-[16px]">{t("summary")}</p>

          <Link
            href="/solutions"
            className="group/cta mt-9 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:shadow-[0_16px_40px_-12px_rgba(6,62,142,0.5)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            {t("cta")}
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
          </Link>

        </ScrollReveal>

        {/* 60% — hover-reveal cards: title always visible, description slides open */}
        <ScrollReveal itemSelector="[data-challenge]" y={36} stagger={0.1}>
          <div className="grid gap-6 sm:grid-cols-2">
            {challenges.map(([index, title, copy], i) => { return (
                <article
                  key={index}
                  data-challenge
                  className="group relative flex aspect-[16/12] flex-col justify-end overflow-hidden border border-white/10 border-white/12 bg-slate-950 transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_28px_60px_-24px_rgba(6,62,142,0.35)] sm:aspect-square"
                >
                  <SafeImage
                    src={CHALLENGE_IMAGES[i]}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-slate-950/10 transition-opacity duration-500 group-hover:via-slate-950/60" />

                  {/* sliding window: title visible, description expands on hover */}
                  <div className="relative p-6 sm:p-7">
                    <h3 className={cn(displayHeading, "text-[19px] leading-[1.25] text-white sm:text-[21px]")}>
                      {title}
                    </h3>
                    <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out sm:grid-rows-[0fr] sm:group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="pt-3.5 text-[13px] leading-[1.7] text-white/75 sm:text-[14px]">{copy}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ); })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  ); }

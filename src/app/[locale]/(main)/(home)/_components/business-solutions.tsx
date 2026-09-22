import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { ArrowRight, Check, ChevronRight, MoveDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { useTranslations } from "next-intl";

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

/** Tier-1 primary card: glass surface, gradient edge, glowing accent line on hover. */
const primaryCard =
  "relative h-full overflow-hidden border border-white/12 bg-white/[0.03] backdrop-blur-sm transition-colors duration-300 hover:border-white/25 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(0,240,255,0.7),transparent)] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100";

export function BusinessSolutions() {
  const t = useTranslations("home.businessSolutions");
  const solutions = [
    [t("sol1"), "/solutions/business-process-optimization"],
    [t("sol2"), "/solutions/enterprise-management"],
    [t("sol3"), "/solutions/customer-experience"],
    [t("sol4"), "/solutions/digital-commerce"],
    [t("sol5"), "/solutions/custom-software-solutions"],
    [t("sol6"), "/solutions/cloud-devops"],
  ] as const;
  const cardSpans = ["lg:col-span-5", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-12"];
  const featuredPoints = [t("point1"), t("point2"), t("point3")];
  const blueprint = [
    [t("bp1Top"), t("bp1Bottom")],
    [t("bp2Top"), t("bp2Bottom")],
    [t("bp3Top"), t("bp3Bottom")],
  ];

  return (
    <section id="solutions" aria-labelledby="solutions-title" className="scroll-mt-20 bg-surface-dark-soft py-16 text-white sm:py-24 lg:py-[140px]">
      <div className={shell}>
        <div className="mb-12 grid gap-6 sm:mb-16 lg:mb-20 lg:grid-cols-[minmax(0,1fr)_2.15fr] lg:gap-12">
          <div className={cn("flex items-start gap-5 lg:pt-3", label)}>
            <span className="text-primary-light">02</span>
            <span className="text-white/50">{t("eyebrow")}</span>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
            <h2 id="solutions-title" className={cn(displayHeading, "text-[34px] leading-[1.04] text-white sm:text-[46px] lg:text-[62px]")}>{t("heading")}</h2>
            <div className="flex flex-col items-start gap-6 lg:pt-2">
              <p className="max-w-md text-[15px] leading-[1.7] text-white/60">{t("summary")}</p>
              <ArrowLink href="/solutions" tone="dark">
                {t("allSolutions")}
              </ArrowLink>
            </div>
          </div>
        </div>

        <ScrollReveal itemSelector="[data-solution-card]" y={40} stagger={0.15}>
          <div className="grid gap-4 lg:grid-cols-12">
            {/* Featured primary card */}
            <SpotlightCard className="lg:col-span-7 lg:row-span-2" data-solution-card glow="rgba(51,92,255,0.16)">
              <div className={cn(primaryCard, "grid p-7 sm:p-10 lg:grid-rows-[auto_1fr] lg:p-12")}>
                <div>
                  <span className={cn(label, "text-[#00f0ff]")}>{t("featuredLabel")}</span>
                  <h3 className={cn(displayHeading, "mt-6 text-[28px] leading-[1.08] text-white sm:text-[36px] lg:text-[44px]")}>{t("cardHeading")}</h3>
                  <p className="mt-5 max-w-[540px] text-[15px] leading-[1.7] text-white/60">{t("cardDesc")}</p>
                  <ul className="mt-8 grid gap-3 text-[14px] text-white/85">
                    {featuredPoints.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-[#00f0ff]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-9">
                    <ArrowLink href="/solutions/digital-transformation" tone="dark">
                      {t("exploreSolution")}
                    </ArrowLink>
                  </div>
                </div>

                {/* Blueprint: business priorities → operating model → working system */}
                <div
                  aria-hidden="true"
                  className="mt-10 flex flex-col items-center justify-center gap-5 border-t border-white/12 pt-9 sm:flex-row sm:gap-4 lg:mt-12 lg:items-end lg:pt-0"
                >
                  {blueprint.map(([top, bottom], index, list) => (
                    <div key={top} className="flex flex-col items-center gap-5 sm:flex-row sm:gap-4">
                      <div
                        className={cn(
                          "w-[168px] border px-5 py-5 text-center text-[10px] uppercase leading-[1.7] tracking-[0.12em] sm:w-auto sm:min-w-[124px]",
                          index === list.length - 1 ? "border-[#00f0ff]/60 text-white shadow-[0_0_36px_rgba(0,240,255,0.18)]" : "border-white/25 text-white/55",
                        )}
                      >
                        {top}
                        <br />
                        {bottom}
                      </div>
                      {index < list.length - 1 ? <MoveDownRight className="h-5 w-5 shrink-0 rotate-45 text-white/35 sm:rotate-0" /> : null}
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>

            {/* Asymmetric primary solution cards */}
            {solutions.map(([title, href], index) => (
              <SpotlightCard key={title} className={cn("sm:col-span-1", cardSpans[index])} data-solution-card>
                <Link
                  href={href}
                  className={cn(primaryCard, "group flex min-h-[180px] flex-col justify-between p-7 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-light lg:p-9")}
                >
                  <div className="relative flex items-start justify-between">
                    <span className={cn(label, "text-white/35")}>{`0${index + 2}`}</span>
                    <ChevronRight aria-hidden="true" className="h-5 w-5 text-white/35 transition-all group-hover:translate-x-1 group-hover:text-[#00f0ff] motion-reduce:transform-none" />
                  </div>
                  <strong className="relative mt-10 block max-w-[380px] text-[18px] font-medium leading-[1.3] text-white sm:text-[20px]">{title}</strong>
                </Link>
              </SpotlightCard>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

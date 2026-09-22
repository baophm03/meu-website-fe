import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
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

/** Solution card shell: glass surface, gradient edge, glowing accent line on hover. */
const primaryCard =
  "relative h-full overflow-hidden border border-white/12 bg-white/[0.03] backdrop-blur-sm transition-colors duration-300 hover:border-white/25 before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(0,240,255,0.7),transparent)] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100";

export function BusinessSolutions() {
  const t = useTranslations("home.businessSolutions");
  const solutions = [
    { title: t("sol1"), desc: t("sol1Desc"), href: "/solutions/digital-transformation", image: "/images/solutions/digital-transformation.jpg" },
    { title: t("sol2"), desc: t("sol2Desc"), href: "/solutions/enterprise-management", image: "/images/solutions/enterprise-management.jpg" },
    { title: t("sol3"), desc: t("sol3Desc"), href: "/solutions/custom-software-solutions", image: "/images/solutions/custom-software.jpg" },
    { title: t("sol4"), desc: t("sol4Desc"), href: "/products/meos", image: "/images/solutions/meos-ecosystem.jpg" },
    { title: t("sol5"), desc: t("sol5Desc"), href: "/solutions/website-operations", image: "/images/solutions/website-ops.jpg" },
  ];

  return (
    <section id="solutions" aria-labelledby="solutions-title" className="scroll-mt-20 bg-surface-dark-soft py-16 text-white sm:py-24 lg:py-[140px]">
      <div className={shell}>
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className={cn("flex items-start gap-5", label)}>
            <span className="text-primary-light">02</span>
            <span className="text-white/50">{t("eyebrow")}</span>
          </div>
          <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <h2 id="solutions-title" className={cn(displayHeading, "max-w-[720px] text-[34px] leading-[1.04] text-white sm:text-[46px] lg:text-[62px]")}>{t("heading")}</h2>
            <div className="flex max-w-md shrink-0 flex-col items-start gap-6">
              <p className="text-[15px] leading-[1.7] text-white/60">{t("summary")}</p>
              <ArrowLink href="/solutions" tone="dark">
                {t("allSolutions")}
              </ArrowLink>
            </div>
          </div>
        </div>

        <ScrollReveal itemSelector="[data-solution-card]" y={40} stagger={0.15}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {solutions.map((solution, index) => (
              <SpotlightCard key={solution.title} data-solution-card>
                <Link
                  href={solution.href}
                  className={cn(primaryCard, "group flex min-h-[320px] flex-col justify-between p-7 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-light lg:min-h-[400px]")}
                >
                  {/* Image as default state; description reveals on hover */}
                  <Image
                    src={solution.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,6,8,0.9)_0%,rgba(5,6,8,0.4)_55%,rgba(5,6,8,0.3)_100%)] transition-opacity duration-500 group-hover:opacity-90 motion-reduce:transition-none"
                  />

                  <div className="relative flex items-start justify-between">
                    <span className={cn(label, "text-white/50 transition-colors duration-300 group-hover:text-white/80")}>{`0${index + 1}`}</span>
                    <ChevronRight aria-hidden="true" className="h-5 w-5 text-white/35 transition-all group-hover:translate-x-1 group-hover:text-[#00f0ff] motion-reduce:transform-none" />
                  </div>

                  <div className="relative">
                    <strong className="block text-[18px] font-medium leading-[1.3] text-white sm:text-[20px]">{solution.title}</strong>
                    <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 motion-reduce:transition-none">
                      <p className="overflow-hidden pt-3 text-[13px] leading-[1.6] text-white/70">{solution.desc}</p>
                    </div>
                  </div>
                </Link>
              </SpotlightCard>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

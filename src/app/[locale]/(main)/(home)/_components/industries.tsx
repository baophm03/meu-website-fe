import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { ArrowRight, GraduationCap, HeartPulse, Pill, ShoppingBag, Truck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { useTranslations } from "next-intl";

const shell = "container";
const displayHeading = "font-medium tracking-[-0.045em] text-balance";
const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

const ICONS: Record<string, LucideIcon> = {
  healthcare: HeartPulse,
  logistics: Truck,
  retail: ShoppingBag,
  pharma: Pill,
  education: GraduationCap,
  associations: Users,
};

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
  const items = [
    { title: t("ind1Title"), href: "/industries/healthcare", desc: t("ind1Desc"), icon: "healthcare", image: "/images/industries/healthcare.jpg" },
    { title: t("ind2Title"), href: "/industries/logistics-supply-chain", desc: t("ind2Desc"), icon: "logistics", image: "/images/industries/logistics.jpg" },
    { title: t("ind3Title"), href: "/industries/retail-commerce", desc: t("ind3Desc"), icon: "retail", image: "/images/industries/retail.jpg" },
    { title: t("ind4Title"), href: "/industries/pharmaceutical-life-sciences", desc: t("ind4Desc"), icon: "pharma", image: "/images/industries/pharma.jpg" },
    { title: t("ind5Title"), href: "/industries/education-training", desc: t("ind5Desc"), icon: "education", image: "/images/industries/education.jpg" },
    { title: t("ind6Title"), href: "/industries/associations-organizations", desc: t("ind6Desc"), icon: "associations", image: "/images/industries/associations.jpg" },
  ];

  return (
    <section id="industries" aria-labelledby="industries-title" className="scroll-mt-20 bg-surface-dark py-16 text-white sm:py-20 lg:py-[80px]">
      <div className={shell}>
        <div className="mb-10 sm:mb-14">
          <div className={cn("flex items-start gap-5", label)}>
            <span className="text-primary-light">04</span>
            <span className="text-white/50">{t("eyebrow")}</span>
          </div>
          <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <h2 id="industries-title" className={cn(displayHeading, "max-w-[720px] text-[34px] leading-[1.04] text-white sm:text-[46px] lg:text-[56px]")}>{t("heading")}</h2>
            <div className="flex max-w-md shrink-0 flex-col items-start gap-6">
              <p className="text-[15px] leading-[1.7] text-white/60">{t("summary")}</p>
              <ArrowLink href="/industries" tone="dark">
                {t("allIndustries")}
              </ArrowLink>
            </div>
          </div>
        </div>

        <ScrollReveal itemSelector="[data-industry-card]" y={36} stagger={0.12}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => {
              const Icon = ICONS[item.icon];
              return (
                <SpotlightCard key={item.title} data-industry-card>
                  <Link
                    href={item.href}
                    className="group relative flex h-full min-h-[320px] flex-col overflow-hidden border border-white/12 bg-[#0f172a] p-7 transition-colors duration-300 hover:border-[#00f0ff]/50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-light lg:p-8"
                  >
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,6,8,0.92)_0%,rgba(5,6,8,0.55)_60%,rgba(5,6,8,0.35)_100%)]"
                    />

                    <div className="relative flex items-start justify-between">
                      <Icon aria-hidden="true" className="h-6 w-6 text-white/70 transition-colors group-hover:text-[#00f0ff]" strokeWidth={1.5} />
                      <span className={cn(label, "text-white/45")}>{`0${index + 1}`}</span>
                    </div>

                    <div className="relative mt-auto pt-16">
                      <h3 className={cn(displayHeading, "text-[22px] leading-[1.15] text-white sm:text-[24px]")}>{item.title}</h3>
                      <p className="mt-3 text-[14px] leading-[1.7] text-white/65">{item.desc}</p>
                    </div>
                  </Link>
                </SpotlightCard>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

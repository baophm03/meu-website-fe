import Image from "next/image";
import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";
import { GraduationCap, HeartPulse, Pill, ShoppingBag, Truck, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { CtaSplitMedia } from "@/app/[locale]/(main)/_components/cta/cta-split-media";
import PagePostsSection from "./_components/page-posts-section";
import { Reveal } from "@/components/shared/reveal";
import type { ReactNode } from "react";

const ICONS: Record<string, LucideIcon> = {
  healthcare: HeartPulse,
  logistics: Truck,
  retail: ShoppingBag,
  pharma: Pill,
  education: GraduationCap,
  associations: Users
};

const industries = [
  ["card1Title", "card1Desc", "/industries/healthcare", "healthcare", "/images/industries/healthcare.jpg"],
  ["card2Title", "card2Desc", "/industries/logistics-supply-chain", "logistics", "/images/industries/logistics.jpg"],
  ["card3Title", "card3Desc", "/industries/retail-commerce", "retail", "/images/industries/retail.jpg"],
  ["card4Title", "card4Desc", "/industries/pharmaceutical-life-sciences", "pharma", "/images/industries/pharma.jpg"],
  ["card5Title", "card5Desc", "/industries/education-training", "education", "/images/industries/education.jpg"],
  ["card6Title", "card6Desc", "/industries/associations-organizations", "associations", "/images/industries/associations.jpg"],
] as const;

export default function IndustriesPage({ slug }: { slug: string[] }) {
  const t = useTranslations("pages.industries");
  const tActions = useTranslations("actions");
  return (
    <>
      <Section variant="light">
        <SectionHead title={t("heading")} summary={t("summary")} />
        <ScrollReveal itemSelector="[data-industry-card]" y={36} stagger={0.12}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map(([titleKey, descKey, href, icon, image]) => {
              const Icon = ICONS[icon];
              return (
                <SpotlightCard key={titleKey} data-industry-card>
                  <Link
                    href={href}
                    className="group relative flex h-full min-h-[320px] flex-col overflow-hidden border border-white/10 bg-[#0f172a] p-7 transition-colors duration-300 hover:border-[#00f0ff]/50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-light lg:p-8"
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,6,8,0.92)_0%,rgba(5,6,8,0.55)_60%,rgba(5,6,8,0.35)_100%)]"
                    />
                    <div className="relative">
                      <Icon aria-hidden="true" className="h-6 w-6 text-white/70 transition-colors group-hover:text-[#00f0ff]" strokeWidth={1.5} />
                    </div>
                    <div className="relative mt-auto pt-16">
                      <h3 className={cn(displayHeading, "text-[22px] leading-[1.15] text-white sm:text-[24px]")}>{t(titleKey)}</h3>
                      <p className="mt-3 text-[14px] leading-[1.7] text-white/65">{t(descKey)}</p>
                    </div>
                  </Link>
                </SpotlightCard>
              );
            })}
          </div>
        </ScrollReveal>
      </Section>
      <PagePostsSection slug={slug} tone="light" linkSuffix="?type=industries" />
      <CtaSplitMedia
        eyebrow={t("ctaEyebrow")}
        heading1={t("ctaHeading1")}
        heading2={t("ctaHeading2")}
        description={t("ctaDesc")}
        primaryHref="/contact?type=consultation"
        primaryLabel={tActions("talkToExpert")}
        secondaryHref="/solutions"
        secondaryLabel={t("ctaSecondary")}
      />
    </>
  );
}

const shell = "container";
const displayHeading = "font-medium tracking-[-0.045em] text-balance";

function Section({ id,
  variant = "white",
  className,
  children,
  labelledBy }: {
    id?: string;
    variant?: "white" | "surface" | "dark" | "light";
    className?: string;
    children: ReactNode;
    labelledBy?: string;
  }) { // All variants render transparent dark — the shared ambient backdrop
  // on the (main) layout carries the visual field across every page.
  return (
    <section id={id} aria-labelledby={labelledBy} data-variant={variant} className={cn("scroll-mt-20 py-16 sm:py-24 lg:py-[128px]", variant === "light" ? "text-foreground" : "text-white", className)}>
      <Reveal className={shell}>{children}</Reveal>
    </section>
  );
}

function SectionHead({ id,
  title,
  summary,
  tone = "light",
  action }: {
    id?: string;
    title: ReactNode;
    summary?: string;
    tone?: "light" | "dark";
    action?: ReactNode;
  }) {
  const dark = tone === "dark";
  return (
    <div className="mb-12 max-w-[760px] sm:mb-16 lg:mb-20">
      <h2 id={id} className={cn(displayHeading, "text-[34px] leading-[1.04] sm:text-[46px] lg:text-[62px]", dark ? "text-white" : "text-foreground")}>{title}</h2>
      {summary ? <p className={cn("mt-6 max-w-md text-[15px] leading-[1.7]", dark ? "text-white/60" : "text-muted-foreground")}>{summary}</p> : null}
      {action ? <div className="mt-8">{action}</div> : null}
    </div>
  );
}

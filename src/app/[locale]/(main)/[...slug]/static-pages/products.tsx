import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CtaPanel } from "@/app/[locale]/(main)/_components/cta/cta-panel";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";
import type { ReactNode } from "react";

const meosProducts = [
  { key: "ecommerce", nameKey: "need1Product", href: "/products/meos-ecommerce", image: "/images/meos/ecommerce-banner.png", icon: "/images/meos/ecommerce-icon.png" },
  { key: "miniapp", nameKey: "need2Product", href: "/products/meos-miniapp", image: "/images/meos/miniapp-banner.png", icon: "/images/meos/miniapp-icon.png" },
  { key: "omni", nameKey: "need3Product", href: "/products/meos-omni", image: "/images/meos/omni-banner.png", icon: "/images/meos/omni-icon.png" },
  { key: "hicare", nameKey: "need4Product", href: "/products/meos-hicare", image: "/images/meos/hicare-banner.png", icon: "/images/meos/hicare-icon.png" },
] as const;

export default function ProductsPage() {
  const t = useTranslations("pages.products");
  return (
    <>
      <Section variant="light">
        <SectionHead
          eyebrow={t("meos.products.eyebrow")}
          title={t("meos.products.heading")}
          summary={t("meos.products.summary")}
          action={<ArrowLink href="/products/meos-ecosystem">{t("meos.architecture.cta")}</ArrowLink>}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {meosProducts.map((product) => (
            <Link key={product.key} href={product.href} className="group overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-[0_16px_40px_-24px_rgba(16,39,71,0.3)]">
              <span className="relative block aspect-[16/9] overflow-hidden bg-muted">
                <Image
                  src={product.image}
                  alt={t(`meos.discovery.${product.nameKey}`)}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </span>
              <span className="block p-7 sm:p-8">
                <span className="flex items-center gap-3">
                  <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-border">
                    <Image src={product.icon} alt="" fill sizes="40px" className="object-cover" />
                  </span>
                  <span className="text-[17px] font-semibold text-foreground">{t(`meos.discovery.${product.nameKey}`)}</span>
                </span>
                <span className="mt-4 block text-[14px] leading-[1.65] text-muted-foreground">{t(`meos.products.${product.key}Desc`)}</span>
                <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.08em] text-primary">
                  {t(`meos.products.${product.key}Cta`)}
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Section>
      <CtaPanel eyebrow={t("cta.eyebrow")} heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=demo" primaryLabel={t("cta.primaryButton")} secondaryHref="/solutions" secondaryLabel={t("cta.secondaryButton")} />
    </>
  );
}

const shell = "container";

const displayHeading = "font-medium tracking-[-0.045em] text-balance";

const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

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
  index,
  eyebrow,
  title,
  summary,
  tone = "light",
  action }: {
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
    <div className="mb-12 grid gap-6 sm:mb-16 lg:mb-20 lg:grid-cols-[minmax(0,1fr)_2.15fr] lg:gap-12">
      <div className={cn("flex items-start gap-5 lg:pt-3", label)}>
        {index ? <span className={dark ? "text-primary-light" : "text-primary"}>{index}</span> : null}
        <span className={dark ? "text-white/50" : "text-muted-foreground"}>{eyebrow}</span>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
        <h2 id={id} className={cn(displayHeading, "text-[34px] leading-[1.04] sm:text-[46px] lg:text-[62px]", dark ? "text-white" : "text-foreground")}>{title}</h2>
        <div className="flex flex-col items-start gap-6 lg:pt-2">
          {summary ? <p className={cn("max-w-md text-[15px] leading-[1.7]", dark ? "text-white/60" : "text-muted-foreground")}>{summary}</p> : null}
          {action ? <div className="shrink-0">{action}</div> : null}
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
        "group inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.1em] transition focus-visible:outline-2 focus-visible:outline-offset-4",
        tone === "dark" ? "text-white hover:text-primary-light focus-visible:outline-primary-light" : "text-foreground hover:text-primary focus-visible:outline-primary",
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </Link>
  );
}

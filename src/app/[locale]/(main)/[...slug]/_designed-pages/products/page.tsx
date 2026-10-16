import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CtaPanel } from "@/components/shared/cta/cta-panel";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Section, SectionHead } from "../_components/page-sections";

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
      <CtaPanel heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=demo" primaryLabel={t("cta.primaryButton")} secondaryHref="/solutions" secondaryLabel={t("cta.secondaryButton")} />
    </>
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

import { useTranslations } from "next-intl";
import { ArrowRight, Compass, Layers, Link2, MonitorPlay, PlusCircle, Presentation, CalendarCheck } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { MeosDiscovery } from "./_components/meos-discovery";

const NAVY = "#0D2346";
const BLUE = "#1768D6";
const CYAN = "#54CCEF";

const valueItems = [
  { key: "item1", icon: Compass },
  { key: "item2", icon: Layers },
  { key: "item3", icon: Link2 },
  { key: "item4", icon: PlusCircle },
] as const;

const productCards = [
  { key: "ecommerce", href: "/products/meos-ecommerce", icon: "/images/meos/ecommerce-icon.png", accent: "#FF702A", name: "MeOS Ecommerce" },
  { key: "miniapp", href: "/products/meos-miniapp", icon: "/images/meos/miniapp-icon.png", accent: BLUE, name: "MeOS Mini App" },
  { key: "omni", href: "/products/meos-omni", icon: "/images/meos/omni-icon.png", accent: CYAN, name: "MeOS Omni" },
  { key: "hicare", href: "/products/meos-hicare", icon: "/images/meos/hicare-icon.png", accent: "#0FA8A8", name: "MeOS HiCare" },
] as const;

const experienceCards = [
  { key: "card1", icon: MonitorPlay },
  { key: "card2", icon: Presentation },
  { key: "card3", icon: CalendarCheck },
] as const;

const orbitNodes = [
  { top: "0%", left: "50%", key: "m365", monogram: "365" },
  { top: "29%", left: "93%", key: "ecommerce", href: "/products/meos-ecommerce", icon: "/images/meos/ecommerce-icon.png" },
  { top: "79%", left: "77%", key: "miniapp", href: "/products/meos-miniapp", icon: "/images/meos/miniapp-icon.png" },
  { top: "79%", left: "23%", key: "omni", href: "/products/meos-omni", icon: "/images/meos/omni-icon.png" },
  { top: "29%", left: "7%", key: "hicare", href: "/products/meos-hicare", icon: "/images/meos/hicare-icon.png" },
] as const;

const primaryButton = "inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-lg px-7 text-[14px] font-semibold text-white transition-opacity hover:opacity-90";
const secondaryButtonDark = "inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-lg border border-white/30 px-7 text-[14px] font-semibold text-white transition-colors hover:border-white/70";

export default function Page() {
  const t = useTranslations("pages.products.meos");

  return (
    <div>
      {/* 01 — Hero */}
      <section className="relative -mt-[68px] overflow-hidden pt-[68px] text-white" style={{ backgroundColor: NAVY }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 80% at 85% 15%, rgba(23,104,214,0.35), transparent 60%), radial-gradient(ellipse 40% 60% at 10% 90%, rgba(84,204,239,0.12), transparent 60%)" }}
        />
        <div className="container relative grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div>
            <p className={cn(label, "text-[13px]")} style={{ color: CYAN }}>{t("hero.eyebrow")}</p>
            <h1 className={cn(displayHeading, "mt-5 max-w-[560px] text-[34px] leading-[1.06] sm:text-[44px] lg:text-[52px]")}>
              {t("hero.heading")}
            </h1>
            <p className="mt-6 max-w-[520px] text-[15px] leading-[1.75] text-white/70">{t("hero.summary")}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="#products" className={primaryButton} style={{ backgroundColor: BLUE }}>
                {t("hero.primaryButton")}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link href="/contact?type=consultation" className={secondaryButtonDark}>
                {t("hero.secondaryButton")}
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]">
              <Image src="/images/meos/meos-cover.png" alt="MeOS" width={1672} height={941} sizes="(max-width: 1024px) 100vw, 620px" className="h-auto w-full" priority />
            </div>
          </div>
        </div>
      </section>

      {/* 02 — MeOS là gì? */}
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="container grid gap-12 lg:grid-cols-[45fr_55fr] lg:gap-20">
          <div>
            <p className={cn(label, "text-primary")}>{t("about.eyebrow")}</p>
            <h2 className={cn(displayHeading, "mt-4 text-[28px] leading-[1.1] sm:text-[36px]")}>{t("about.heading")}</h2>
            <div className="relative mt-8 hidden h-[280px] w-[280px] overflow-hidden rounded-2xl border border-border lg:block">
              <Image src="/images/meos/meos-icon.jpg" alt="MeOS" fill sizes="280px" className="object-cover" />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-5 text-[15px] leading-[1.8] text-muted-foreground lg:pt-2">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
          </div>
        </div>
      </section>

      {/* 03 — Giá trị cốt lõi */}
      <section className="py-20 sm:py-24 lg:py-28" style={{ backgroundColor: "#F2F7FE" }}>
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_2fr] lg:gap-16">
            <p className={cn(label, "text-primary")}>{t("values.eyebrow")}</p>
            <div className="max-w-[760px]">
              <h2 className={cn(displayHeading, "text-[28px] leading-[1.12] sm:text-[36px]")}>{t("values.heading")}</h2>
              <p className="mt-4 text-[15px] leading-[1.75] text-muted-foreground">{t("values.summary")}</p>
            </div>
          </div>
          <ScrollReveal itemSelector="[data-value]" y={28} stagger={0.08}>
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {valueItems.map(({ key, icon: Icon }) => (
                <div key={key} data-value className="rounded-2xl border border-border bg-white p-8 transition-shadow hover:shadow-[0_16px_40px_-24px_rgba(13,35,70,0.25)]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: "#EAF2FE" }}>
                    <Icon aria-hidden="true" className="h-5 w-5" style={{ color: BLUE }} strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 text-[18px] font-semibold text-foreground">{t(`values.${key}Title`)}</h3>
                  <p className="mt-2.5 text-[14px] leading-[1.7] text-muted-foreground">{t(`values.${key}Desc`)}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 04 — Danh mục sản phẩm */}
      <section id="products" className="scroll-mt-20 bg-white py-20 sm:py-24 lg:py-28">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_2fr] lg:gap-16">
            <p className={cn(label, "text-primary")}>{t("products.eyebrow")}</p>
            <div className="max-w-[760px]">
              <h2 className={cn(displayHeading, "text-[28px] leading-[1.12] sm:text-[36px]")}>{t("products.heading")}</h2>
              <p className="mt-4 text-[15px] leading-[1.75] text-muted-foreground">{t("products.summary")}</p>
            </div>
          </div>
          <ScrollReveal itemSelector="[data-product-card]" y={28} stagger={0.08}>
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {/* MeOS 365 — giải pháp tổng hợp, sắp ra mắt */}
              <Link
                href="/contact?type=consultation"
                data-product-card
                className="group flex flex-col gap-6 rounded-2xl border border-border bg-white p-7 transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_48px_-24px_rgba(13,35,70,0.28)] sm:col-span-2 sm:flex-row sm:items-center sm:gap-10 sm:p-10"
              >
                <span
                  aria-hidden="true"
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-[17px] font-bold tracking-tight text-white"
                  style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})` }}
                >
                  365
                </span>
                <span className="flex-1">
                  <span className="flex flex-wrap items-center gap-3">
                    <span className={cn(label, "text-primary")}>{t("products.m365Eyebrow")}</span>
                    <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white" style={{ backgroundColor: NAVY }}>
                      {t("products.m365Badge")}
                    </span>
                  </span>
                  <span className="mt-3 block text-[22px] font-semibold tracking-tight text-foreground">MeOS 365</span>
                  <span className="mt-2 block max-w-[560px] text-[14px] leading-[1.7] text-muted-foreground">{t("products.m365Desc")}</span>
                </span>
                <span className="inline-flex items-center gap-2.5 text-[13px] font-semibold" style={{ color: BLUE }}>
                  {t("products.m365Cta")}
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              {productCards.map((card) => (
                <Link
                  key={card.key}
                  href={card.href}
                  data-product-card
                  className="group flex flex-col rounded-2xl border border-border bg-white p-7 transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_48px_-24px_rgba(13,35,70,0.28)]"
                >
                  <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-border">
                    <Image src={card.icon} alt={card.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <h3 className="mt-5 text-[19px] font-semibold text-foreground">{card.name}</h3>
                  <p className="mt-2.5 flex-1 text-[14px] leading-[1.7] text-muted-foreground">{t(`products.${card.key}Desc`)}</p>
                  <span className="mt-6 inline-flex items-center gap-2.5 text-[13px] font-semibold" style={{ color: card.accent }}>
                    {t(`products.${card.key}Cta`)}
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 05 — Kiến trúc hệ sinh thái */}
      <section className="py-20 sm:py-24 lg:py-28" style={{ backgroundColor: "#F2F7FE" }}>
        <div className="container grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-20">
          <div>
            <p className={cn(label, "text-primary")}>{t("architecture.eyebrow")}</p>
            <h2 className={cn(displayHeading, "mt-4 text-[28px] leading-[1.12] sm:text-[36px]")}>{t("architecture.heading")}</h2>
            <p className="mt-5 text-[15px] leading-[1.75] text-muted-foreground">{t("architecture.summary")}</p>
            <p className="mt-4 text-[15px] leading-[1.75] text-muted-foreground">{t("architecture.summary2")}</p>
            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-3 text-[13px] font-semibold text-foreground transition-colors hover:text-foreground/70"
            >
              <span aria-hidden="true" className="h-px w-8" style={{ backgroundColor: BLUE }} />
              {t("architecture.cta")}
            </Link>
          </div>

          {/* Desktop: sơ đồ radial — MeOS ở trung tâm, 5 sản phẩm xung quanh */}
          <div className="relative mx-auto hidden aspect-square w-full max-w-[520px] lg:block">
            <div aria-hidden="true" className="absolute inset-[12%] rounded-full border border-dashed border-primary/20" />
            <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-2xl border border-border bg-white shadow-[0_20px_48px_-20px_rgba(13,35,70,0.35)]">
              <Image src="/images/meos/meos-icon.jpg" alt="MeOS" fill sizes="96px" className="object-cover" />
            </div>
            {orbitNodes.map((node) => {
              const tile = "monogram" in node ? (
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-[11px] font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})` }}
                >
                  {node.monogram}
                </span>
              ) : (
                <span className="relative h-9 w-9 overflow-hidden rounded-lg">
                  <Image src={node.icon} alt="" fill sizes="36px" className="object-cover" />
                </span>
              );
              const name = "monogram" in node ? "MeOS 365" : t(`products.${node.key}Cta`).replace("Khám phá ", "").replace("Explore ", "");
              const cls = "absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-xl border border-border bg-white py-2 pl-2 pr-4 shadow-[0_12px_32px_-16px_rgba(13,35,70,0.3)]";
              return "href" in node ? (
                <Link key={node.key} href={node.href} className={cn(cls, "transition-transform hover:scale-[1.04]")} style={{ top: node.top, left: node.left }}>
                  {tile}
                  <span className="text-[13px] font-semibold text-foreground">{name}</span>
                </Link>
              ) : (
                <span key={node.key} className={cls} style={{ top: node.top, left: node.left }}>
                  {tile}
                  <span className="text-[13px] font-semibold text-foreground">{name}</span>
                </span>
              );
            })}
          </div>

          {/* Mobile: sơ đồ dọc */}
          <div className="flex flex-col gap-3 lg:hidden">
            <div className="flex items-center gap-4 rounded-xl border border-border bg-white p-4">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[12px] font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})` }}
              >
                365
              </span>
              <span className="flex-1">
                <span className="flex items-center gap-2">
                  <span className="block text-[15px] font-semibold text-foreground">MeOS 365</span>
                  <span className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white" style={{ backgroundColor: NAVY }}>
                    {t("products.m365Badge")}
                  </span>
                </span>
                <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">{t("products.m365Desc")}</span>
              </span>
            </div>
            {productCards.map((card) => (
              <Link key={card.key} href={card.href} className="flex items-center gap-4 rounded-xl border border-border bg-white p-4">
                <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg">
                  <Image src={card.icon} alt="" fill sizes="44px" className="object-cover" />
                </span>
                <span className="flex-1">
                  <span className="block text-[15px] font-semibold text-foreground">{card.name}</span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">{t(`products.${card.key}Desc`)}</span>
                </span>
                <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — Giải pháp theo nhu cầu */}
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_2fr] lg:gap-16">
            <p className={cn(label, "text-primary")}>{t("discovery.eyebrow")}</p>
            <div className="max-w-[760px]">
              <h2 className={cn(displayHeading, "text-[28px] leading-[1.12] sm:text-[36px]")}>{t("discovery.heading")}</h2>
              <p className="mt-4 text-[15px] leading-[1.75] text-muted-foreground">{t("discovery.summary")}</p>
            </div>
          </div>
          <div className="mt-12">
            <MeosDiscovery
              accent={BLUE}
              items={[
                {
                  need: t("discovery.need365"),
                  product: t("discovery.need365Product"),
                  desc: t("discovery.need365Desc"),
                  href: "/contact?type=consultation",
                  ctaLabel: t("products.m365Cta"),
                },
                ...[1, 2, 3, 4].map((i) => ({
                  need: t(`discovery.need${i}`),
                  product: t(`discovery.need${i}Product`),
                  desc: t(`discovery.need${i}Desc`),
                  href: productCards[i - 1].href,
                })),
              ]}
            />
          </div>
        </div>
      </section>

      {/* 07 — Trải nghiệm sản phẩm */}
      <section className="py-20 sm:py-24 lg:py-28" style={{ backgroundColor: "#F2F7FE" }}>
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_2fr] lg:gap-16">
            <p className={cn(label, "text-primary")}>{t("experience.eyebrow")}</p>
            <div className="max-w-[760px]">
              <h2 className={cn(displayHeading, "text-[28px] leading-[1.12] sm:text-[36px]")}>{t("experience.heading")}</h2>
              <p className="mt-4 text-[15px] leading-[1.75] text-muted-foreground">{t("experience.summary")}</p>
            </div>
          </div>
          <ScrollReveal itemSelector="[data-exp]" y={28} stagger={0.08}>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {experienceCards.map(({ key, icon: Icon }) => (
                <div key={key} data-exp className="flex flex-col rounded-2xl border border-border bg-white p-8">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: "#EAF2FE" }}>
                    <Icon aria-hidden="true" className="h-5 w-5" style={{ color: BLUE }} strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 text-[17px] font-semibold text-foreground">{t(`experience.${key}Title`)}</h3>
                  <p className="mt-2.5 text-[14px] leading-[1.7] text-muted-foreground">{t(`experience.${key}Desc`)}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 08 — CTA cuối trang */}
      <section className="relative overflow-hidden py-24 text-white lg:py-32" style={{ backgroundColor: NAVY }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 55% 60% at 50% 110%, rgba(23,104,214,0.4), transparent 65%)" }}
        />
        <div className="container relative text-center">
          <h2 className={cn(displayHeading, "mx-auto max-w-[820px] text-[32px] leading-[1.05] sm:text-[44px] lg:text-[56px]")}>
            {t("cta.heading1")} <span style={{ color: CYAN }}>{t("cta.heading2")}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[560px] text-[15px] leading-[1.75] text-white/65">{t("cta.description")}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact?type=consultation" className={primaryButton} style={{ backgroundColor: BLUE }}>
              {t("cta.primaryButton")}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link href="/products" className={secondaryButtonDark}>
              {t("cta.secondaryButton")}
            </Link>
          </div>
          <p className={cn(label, "mt-14 text-white/35")}>{t("cta.credit")}</p>
        </div>
      </section>
    </div>
  );
}

const displayHeading = "font-medium tracking-[-0.045em] text-balance";

const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

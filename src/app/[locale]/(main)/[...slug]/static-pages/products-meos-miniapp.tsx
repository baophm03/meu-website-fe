import { useTranslations } from "next-intl";
import { ArrowRight, ArrowDown, Smartphone, HeartHandshake, Ticket } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { displayHeading, label } from "@/app/[locale]/(main)/_components/section-primitives";
import { MeosFeatureTabs } from "./_components/meos-feature-tabs";
import { MeosFaq } from "./_components/meos-faq";

const NAVY = "#0D2346";
const ACCENT = "#1768D6";
const SOFT = "#EAF2FE";
const HERO_IMAGE: string | null = "/images/meos/miniapp-banner.png";
const LINK1_HREF = "/products/meos-ecommerce";
const LINK2_HREF = "/products/meos-omni";

const valueIcons = [Smartphone, HeartHandshake, Ticket];
const valueItems = ["item1", "item2", "item3"] as const;
const tabs = [1, 2, 3, 4] as const;
const steps = [1, 2, 3] as const;

const primaryButton = "inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-lg px-7 text-[14px] font-semibold text-white transition-opacity hover:opacity-90";
const secondaryButtonDark = "inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-lg border border-white/30 px-7 text-[14px] font-semibold text-white transition-colors hover:border-white/70";

export default function Page() {
    const t = useTranslations("pages.products.meosMiniapp");

    return (
        <div>
            {/* 01 — Hero */}
            <section className="relative overflow-hidden text-white" style={{ backgroundColor: NAVY }}>
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{ background: `radial-gradient(ellipse 55% 75% at 88% 20%, ${ACCENT}38, transparent 60%)` }}
                />
                <div className="container relative grid gap-12 py-20 lg:grid-cols-[45fr_55fr] lg:items-center lg:py-24">
                    <div>
                        <p className={cn(label, "text-[12px]")} style={{ color: ACCENT }}>{t("hero.label")}</p>
                        <h1 className={cn(displayHeading, "mt-5 max-w-[520px] text-[32px] leading-[1.08] sm:text-[42px] lg:text-[48px]")}>
                            {t("hero.heading")}
                        </h1>
                        <p className="mt-6 max-w-[500px] text-[15px] leading-[1.75] text-white/70">{t("hero.summary")}</p>
                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <Link href="/contact?type=demo" className={primaryButton} style={{ backgroundColor: ACCENT }}>
                                {t("hero.primaryButton")}
                                <ArrowRight aria-hidden="true" className="h-4 w-4" />
                            </Link>
                            <Link href="#features" className={secondaryButtonDark}>
                                {t("hero.secondaryButton")}
                            </Link>
                        </div>
                    </div>
                    {HERO_IMAGE ? (
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]">
                            <Image src={HERO_IMAGE} alt="MeOS Mini App" width={1672} height={941} sizes="(max-width: 1024px) 100vw, 640px" className="h-auto w-full" priority />
                        </div>
                    ) : (
                        <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl border border-white/10" style={{ background: `linear-gradient(135deg, ${ACCENT}26, transparent 55%), rgba(255,255,255,0.04)` }}>
                            <div className="flex flex-col items-center gap-5">
                                <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-white/15 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]">
                                    <Image src="/images/meos/meos-icon.jpg" alt="MeOS Mini App" fill sizes="96px" className="object-cover" />
                                </div>
                                <p className={cn(label, "text-white/50")}>MeOS Mini App</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* 02 — Giá trị giải pháp */}
            <section className="bg-white py-20 sm:py-24 lg:py-28">
                <div className="container">
                    <div className="max-w-[720px]">
                        <p className={cn(label, "text-[13px]")} style={{ color: ACCENT }}>{t("value.eyebrow")}</p>
                        <h2 className={cn(displayHeading, "mt-4 text-[28px] leading-[1.12] sm:text-[36px]")}>{t("value.heading")}</h2>
                        <p className="mt-4 text-[15px] leading-[1.75] text-muted-foreground">{t("value.summary")}</p>
                    </div>
                    <ScrollReveal itemSelector="[data-value]" y={28} stagger={0.08}>
                        <div className="mt-12 grid gap-5 md:grid-cols-3">
                            {valueItems.map((key, i) => {
                                const Icon = valueIcons[i];
                                return (
                                    <div key={key} data-value className="flex flex-col rounded-2xl border border-border bg-white p-8 transition-shadow hover:shadow-[0_16px_40px_-24px_rgba(13,35,70,0.3)]">
                                        <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: SOFT }}>
                                            <Icon aria-hidden="true" className="h-5 w-5" style={{ color: ACCENT }} strokeWidth={1.8} />
                                        </span>
                                        <p className="mt-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{t(`value.${key}Problem`)}</p>
                                        <p className="mt-2.5 flex-1 text-[15px] font-medium leading-[1.6] text-foreground">{t(`value.${key}Value`)}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 03 — Tính năng nổi bật */}
            <section id="features" className="scroll-mt-20 py-20 sm:py-24 lg:py-28" style={{ backgroundColor: SOFT }}>
                <div className="container">
                    <div className="max-w-[720px]">
                        <p className={cn(label, "text-[13px]")} style={{ color: ACCENT }}>{t("features.eyebrow")}</p>
                        <h2 className={cn(displayHeading, "mt-4 text-[28px] leading-[1.12] sm:text-[36px]")}>{t("features.heading")}</h2>
                        <p className="mt-4 text-[15px] leading-[1.75] text-muted-foreground">{t("features.summary")}</p>
                    </div>
                    <div className="mt-12">
                        <MeosFeatureTabs
                            accent={ACCENT}
                            tabs={tabs.map((i) => ({
                                title: t(`features.tab${i}Title`),
                                desc: t(`features.tab${i}Desc`),
                                points: [t(`features.tab${i}Point1`), t(`features.tab${i}Point2`), t(`features.tab${i}Point3`)],
                            }))}
                        />
                    </div>
                </div>
            </section>

            {/* 04 — Trải nghiệm sản phẩm */}
            <section className="bg-white py-20 sm:py-24 lg:py-28">
                <div className="container">
                    <div className="max-w-[720px]">
                        <p className={cn(label, "text-[13px]")} style={{ color: ACCENT }}>{t("experience.eyebrow")}</p>
                        <h2 className={cn(displayHeading, "mt-4 text-[28px] leading-[1.12] sm:text-[36px]")}>{t("experience.heading")}</h2>
                        <p className="mt-4 text-[15px] leading-[1.75] text-muted-foreground">{t("experience.summary")}</p>
                    </div>
                    <ScrollReveal itemSelector="[data-step]" y={28} stagger={0.1}>
                        <div className="mt-12 grid gap-5 md:grid-cols-3">
                            {steps.map((i) => (
                                <div key={i} data-step className="relative flex flex-col rounded-2xl border border-border bg-white p-8">
                                    <span className="text-[13px] font-bold" style={{ color: ACCENT }}>{`0${i}`}</span>
                                    <h3 className="mt-3 text-[17px] font-semibold text-foreground">{t(`experience.step${i}Title`)}</h3>
                                    <p className="mt-2.5 text-[14px] leading-[1.7] text-muted-foreground">{t(`experience.step${i}Desc`)}</p>
                                    {i < steps.length ? (
                                        <ArrowDown aria-hidden="true" className="absolute -bottom-[26px] left-1/2 hidden h-5 w-5 -translate-x-1/2 text-muted-foreground/50 md:block" />
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                    <div className="mt-10">
                        <Link href="/contact?type=demo" className={cn(primaryButton, "text-white")} style={{ backgroundColor: ACCENT }}>
                            {t("experience.primaryButton")}
                            <ArrowRight aria-hidden="true" className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 05 — MeOS Ecosystem */}
            <section className="py-16 text-white sm:py-20" style={{ backgroundColor: NAVY }}>
                <div className="container grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-center lg:gap-16">
                    <div className="flex items-start gap-5">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/15">
                            <Image src="/images/meos/meos-icon.jpg" alt="MeOS" fill sizes="56px" className="object-cover" />
                        </div>
                        <div>
                            <h2 className="text-[22px] font-semibold leading-tight">{t("ecosystem.heading")}</h2>
                            <p className="mt-3 max-w-[480px] text-[14px] leading-[1.7] text-white/60">{t("ecosystem.summary")}</p>
                        </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {[1, 2].map((i) => (
                            <Link
                                key={i}
                                href={i === 1 ? LINK1_HREF : LINK2_HREF}
                                className="group rounded-xl border border-white/15 bg-white/5 p-5 transition-colors hover:bg-white/10"
                            >
                                <span className="block text-[15px] font-semibold text-white">{t(`ecosystem.link${i}Title`)}</span>
                                <span className="mt-1 block text-[13px] text-white/55">{t(`ecosystem.link${i}Desc`)}</span>
                                <span className="mt-3 inline-flex items-center gap-2 text-[12px] font-semibold" style={{ color: ACCENT }}>
                                    {t(`ecosystem.link${i}Title`)}
                                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="container mt-8 border-t border-white/10 pt-6">
                    <Link href="/products/meos-ecosystem" className="inline-flex items-center gap-3 text-[13px] font-semibold text-white/80 transition-colors hover:text-white">
                        {t("ecosystem.allButton")}
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                </div>
            </section>

            {/* 06 — CTA cuối trang + FAQ */}
            <section className="relative overflow-hidden py-24 text-white" style={{ backgroundColor: NAVY }}>
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{ background: `radial-gradient(ellipse 55% 60% at 50% 115%, ${ACCENT}44, transparent 65%)` }}
                />
                <div className="container relative text-center">
                    <h2 className={cn(displayHeading, "mx-auto max-w-[760px] text-[30px] leading-[1.08] sm:text-[40px] lg:text-[48px]")}>
                        {t("cta.heading1")}
                    </h2>
                    <p className="mx-auto mt-6 max-w-[560px] text-[15px] leading-[1.75] text-white/65">{t("cta.description")}</p>
                    <div className="mt-10">
                        <Link href="/contact?type=consultation" className={primaryButton} style={{ backgroundColor: ACCENT }}>
                            {t("cta.primaryButton")}
                            <ArrowRight aria-hidden="true" className="h-4 w-4" />
                        </Link>
                    </div>
                    <p className={cn(label, "mt-12 text-white/35")}>{t("cta.credit")}</p>
                </div>
            </section>

            <section className="bg-white py-16 sm:py-20">
                <div className="container max-w-[860px]">
                    <h2 className={cn(displayHeading, "text-[22px] sm:text-[26px]")}>FAQ</h2>
                    <div className="mt-6">
                        <MeosFaq accent={ACCENT} items={[1, 2, 3, 4].map((i) => ({ q: t(`faq.q${i}`), a: t(`faq.a${i}`) }))} />
                    </div>
                </div>
            </section>
        </div>
    );
}

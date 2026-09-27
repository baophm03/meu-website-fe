import { useTranslations } from "next-intl";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Section, PrimaryButton, SecondaryButton, label, displayHeading } from "@/app/[locale]/(main)/_components/section-primitives";
import ClientsWall from "./_components/clients-wall";

export default function Page() {
  const t = useTranslations("pages.about.partnersClients");
  return (
    <>
      <Section variant="light" className="pt-28 sm:pt-36 lg:pt-40 lg:pb-20">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className={cn(label, "text-primary")}>{t("clients.eyebrow")}</p>
            <h1 className={cn(displayHeading, "mt-4 max-w-[720px] text-[38px] leading-[1.04] sm:text-[52px] lg:text-[64px]")}>
              {t("clients.heading")}
            </h1>
          </div>
          <p className="max-w-md text-[15px] leading-[1.7] text-muted-foreground lg:justify-self-end lg:pb-3">
            {t("clients.summary")} {t("clients.note")}
          </p>
        </div>
        <ClientsWall />
      </Section>
      <section aria-labelledby="partner-cta-title" className="container pb-20 lg:pb-28">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-dark text-white shadow-[0_32px_90px_-32px_rgba(15,23,42,0.45)]">
          <div className="grid lg:grid-cols-[1.15fr_1fr]">
            <div className="relative p-8 sm:p-12 lg:p-16">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_90%_at_0%_100%,rgba(51,92,255,0.3),transparent_65%),radial-gradient(ellipse_50%_60%_at_100%_0%,rgba(0,240,255,0.12),transparent_60%)]"
              />
              <div className="relative">
                <p className={cn(label, "text-[#00f0ff]")}>{t("cta.eyebrow")}</p>
                <h2 id="partner-cta-title" className={cn(displayHeading, "mt-5 max-w-[460px] text-[32px] leading-[1.05] sm:text-[42px] lg:text-[50px]")}>
                  {t("cta.heading1")}
                  <br />
                  <span className="text-primary-light">{t("cta.heading2")}</span>
                </h2>
                <p className="mt-6 max-w-[440px] text-[15px] leading-[1.7] text-white/65 sm:text-[16px]">
                  {t("cta.description")}
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <PrimaryButton href="/contact">{t("cta.primaryButton")}</PrimaryButton>
                  <SecondaryButton href="/about" tone="dark">{t("cta.secondaryButton")}</SecondaryButton>
                </div>
              </div>
            </div>
            <div className="relative min-h-[260px] lg:min-h-[420px]">
              <Image
                src="/images/hero/hero-3.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,6,8,0.85)_0%,rgba(5,6,8,0.2)_45%,transparent_100%)] lg:bg-[linear-gradient(to_right,rgba(8,9,15,1)_0%,rgba(8,9,15,0.55)_30%,rgba(8,9,15,0.05)_100%)]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

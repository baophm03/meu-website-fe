import { getTranslations } from "next-intl/server";
import { MetricCounter } from "@/components/shared/metric-counter";
import { getApiV10ContactInfo } from "@/api/endpoints/contact-info";
import type { ContactInfo } from "@/api/models/contactInfo";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowRight, BrainCircuit, Cloud, Database, Globe, Mail, MapPin, Phone } from "lucide-react";
import { fetchPublicJobs } from "@/utils/public-jobs";
import { CtaCinematic } from "@/app/[locale]/(main)/_components/cta/cta-cinematic";
import ClientsWall from "./about-partners-clients/_components/clients-wall";
import { PageHero, Section, SectionHead, displayHeading, label } from "./_components/page-sections";

const TECHS = [
  { key: "ai", icon: BrainCircuit },
  { key: "cloud", icon: Cloud },
  { key: "bigdata", icon: Database },
] as const;

const CORE_VALUES = ["value1", "value2", "value3", "value4"] as const;

const STATS = ["stat1", "stat2", "stat3"] as const;

async function fetchContactInfos(): Promise<ContactInfo[]> {
  try {
    const res = await getApiV10ContactInfo({
      page: 1,
      pageSize: 50,
      sortField: "display_order",
      sortOrder: "asc",
      filters: "is_active==true",
    });
    const data = res?.responseData as { rows?: ContactInfo[] } | undefined;
    return Array.isArray(data?.rows) ? data.rows : [];
  } catch {
    return [];
  }
}

const CONTACT_ICONS: Record<string, typeof Mail> = {
  email: Mail,
  phone: Phone,
  hotline: Phone,
  address: MapPin,
};

export default async function AboutPage() {
  const t = await getTranslations("pages.about");
  const [jobsResponse, contactInfos] = await Promise.all([fetchPublicJobs(), fetchContactInfos()]);
  const jobs = jobsResponse.jobs.slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={<>{t("hero.heading1")}<br /><span className="text-primary-light">{t("hero.heading2")}</span></>}
        summary={t("hero.summary")}
      />

      {/* Stat strip — company facts at a glance */}
      <div className="border-b border-border bg-white">
        <div className="container grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {STATS.map((key) => (
            <div key={key} className="flex items-baseline justify-center gap-3 py-6 sm:flex-col sm:items-center sm:gap-1 sm:py-7">
              <MetricCounter
                value={Number(t("hero." + key + "Value").replace(/[^\d]/g, ""))}
                suffix={t("hero." + key + "Value").replace(/[\d\s]/g, "")}
                duration={2.4}
                className={cn(displayHeading, "text-[26px] font-normal text-primary sm:text-[30px]")}
              />
              <span className={cn(label, "text-muted-foreground")}>{t("hero." + key + "Label")}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 01 — Giới thiệu MeU Solutions */}
      <Section variant="light" labelledBy="about-intro-title">
        <SectionHead eyebrow={t("intro.eyebrow")} title={t("intro.heading")} />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-14">
          <div className="grid content-start gap-6">
            <p className="max-w-[680px] text-[16px] leading-[1.8] text-muted-foreground">{t("intro.body1")}</p>
            <p className="max-w-[680px] text-[16px] leading-[1.8] text-muted-foreground">{t("intro.body2")}</p>
          </div>
          <div className="relative mx-auto min-h-[360px] w-full max-w-[520px] sm:min-h-[430px] lg:min-h-[480px]">
            <div className="absolute bottom-0 right-0 top-5 w-[72%] overflow-hidden rounded-[28px] border border-white bg-slate-100 shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
              <Image
                src="/images/solutions/digital-transformation.jpg"
                alt={t("intro.heading")}
                fill
                sizes="(min-width: 1024px) 32vw, 70vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-primary/10" />
            </div>
            <div className="absolute bottom-7 left-0 z-10 h-[42%] w-[57%] overflow-hidden rounded-[22px] border-[5px] border-white bg-slate-200 shadow-[0_18px_45px_rgba(15,23,42,0.2)] sm:bottom-9">
              <Image
                src="/images/solutions/custom-software.jpg"
                alt={t("intro.heading")}
                fill
                sizes="(min-width: 1024px) 24vw, 55vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/15 mix-blend-multiply" />
            </div>
            <div aria-hidden="true" className="absolute right-[4%] top-[13%] h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
        </div>
        <div className="mt-8 grid gap-5 rounded-2xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-8 lg:mt-10 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:items-center lg:gap-8">
          <p className={cn(label, "text-primary")}>{t("intro.techLabel")}</p>
          <ul className="grid gap-3 sm:grid-cols-3">
            {TECHS.map(({ key, icon: Icon }) => (
              <li key={key} className="group flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3.5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_12px_28px_rgba(15,23,42,0.1)]">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="text-[14px] font-medium text-foreground">{t("intro." + key)}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 02 — Tầm nhìn / Sứ mệnh / Giá trị cốt lõi */}
      <Section variant="light" labelledBy="about-vision-title">
        <SectionHead eyebrow={t("vision.eyebrow")} title={t("vision.heading")} />
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="group relative overflow-hidden rounded-2xl border border-border bg-surface-dark p-8 text-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_40px_rgba(15,23,42,0.18)] sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_75%_at_100%_0%,rgba(49,92,255,0.28),transparent_68%)]"
            />
            <div className="relative flex flex-col gap-10">
              <div className="max-w-[88%] self-start">
                <p className={cn(label, "inline-flex items-center gap-2 text-primary-light")}>
                  <span aria-hidden="true" className="h-px w-6 bg-primary-light/70" />
                  {t("vision.visionLabel")}
                </p>
                <p className={cn(displayHeading, "mt-4 text-[24px] leading-[1.25] sm:text-[28px]")}>{t("vision.visionBody")}</p>
              </div>
              <div className="max-w-[88%] self-end text-right">
                <p className={cn(label, "inline-flex items-center gap-2 text-white/55")}>
                  {t("vision.missionLabel")}
                  <span aria-hidden="true" className="h-px w-6 bg-white/35" />
                </p>
                <p className={cn(displayHeading, "mt-4 text-[24px] leading-[1.25] sm:text-[28px]")}>{t("vision.missionBody")}</p>
              </div>
            </div>
          </article>
          <div className="group rounded-2xl border border-border bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)] sm:p-10">
            <p className={cn(label, "text-muted-foreground")}>{t("vision.valuesLabel")}</p>
            <ul className="mt-7 grid gap-0 divide-y divide-border">
              {CORE_VALUES.map((key, i) => (
                <li key={key} className="group/item -mx-3 flex items-baseline gap-5 rounded-lg px-3 py-5 transition-colors duration-300 hover:bg-primary/[0.04] first:pt-0 last:pb-0">
                  <span className={cn(label, "shrink-0 text-primary transition-transform duration-300 group-hover/item:translate-x-1")}>{`0${i + 1}`}</span>
                  <span className="text-[17px] font-medium leading-[1.4] text-foreground">{t("vision." + key)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 03 — Thông tin liên hệ */}
      <Section variant="light" labelledBy="about-contact-title">
        <SectionHead eyebrow={t("contact.eyebrow")} title={t("contact.heading")} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactInfos.filter((info) => info.value).map((info) => {
            const value = info.value!;
            const Icon = CONTACT_ICONS[info.key] ?? Globe;
            const href = info.key === "email" ? `mailto:${value}`
              : ["phone", "hotline"].includes(info.key) ? `tel:${value.replace(/[^+\d]/g, "")}`
                : info.key === "address" ? `https://maps.google.com/?q=${encodeURIComponent(value)}`
                  : undefined;
            const card = (
              <div className="group flex h-full items-center gap-3 rounded-xl border border-border/80 bg-white/80 p-4 transition-colors hover:border-primary/25 hover:bg-white sm:gap-4 sm:p-5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/[0.08] text-primary">
                  <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                </span>
                <div className="min-w-0">
                  <p className={cn(label, "text-muted-foreground")}>{info.key}</p>
                  <p className="mt-0.5 break-words text-[14px] font-medium leading-[1.55] text-foreground">{value}</p>
                </div>
              </div>
            );
            return href ? <a key={info.id} href={href} target={info.key === "address" ? "_blank" : undefined} rel={info.key === "address" ? "noreferrer" : undefined}>{card}</a> : <div key={info.id}>{card}</div>;
          })}
        </div>
      </Section>

      {/* 04 — Đối tác và khách hàng */}
      <Section variant="light" labelledBy="about-partners-title">
        <SectionHead eyebrow={t("partners.eyebrow")} title={t("partners.heading")} />
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <p className="text-[15px] leading-[1.8] text-muted-foreground">{t("partners.body1")}</p>
          <p className="text-[15px] leading-[1.8] text-muted-foreground">{t("partners.body2")}</p>
        </div>
        <ClientsWall />
        <blockquote className="mt-14 border-l-2 border-primary pl-6 text-[18px] font-medium leading-[1.5] text-foreground sm:text-[20px]">
          {t("partners.closing")}
        </blockquote>
      </Section>

      {/* 05 — Tuyển dụng */}
      <Section variant="light" labelledBy="about-careers-title">
        <div className="relative overflow-hidden rounded-2xl border border-primary/10 bg-[#f4f7ff] p-8 text-foreground shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-12 lg:p-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_80%_at_100%_100%,rgba(49,92,255,0.12),transparent_70%)]"
          />
          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className={cn(label, "text-primary")}>{t("join.eyebrow")}</p>
              <h2 id="about-careers-title" className={cn(displayHeading, "mt-5 max-w-[560px] text-[26px] leading-[1.15] text-foreground sm:text-[34px]")}>{t("join.heading")}</h2>
              <p className="mt-6 max-w-[560px] text-[15px] leading-[1.75] text-muted-foreground">{t("join.body")}</p>
              <Link
                href="/about/careers"
                className={cn(label, "group mt-8 inline-flex items-center gap-3 rounded-full border border-primary/30 px-7 py-3.5 text-primary transition hover:border-primary hover:bg-primary/5")}
              >
                {t("join.ctaButton")}
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            {jobs.length > 0 ? (
              <div className="flex flex-col justify-center gap-3">
                <p className={cn(label, "text-muted-foreground")}>{t("join.openRolesLabel")}</p>
                {jobs.map((job) => (
                  <Link
                    key={job.id}
                    href={`/${job.slug}?type=jobs`}
                    className="group grid gap-1 rounded-xl border border-primary/10 bg-white/80 px-5 py-4 transition hover:border-primary/30 hover:bg-white"
                  >
                    <span className="text-[15px] font-medium text-foreground transition group-hover:text-primary">{job.title}</span>
                    {job.location ? <span className="text-[13px] text-muted-foreground">{job.location}</span> : null}
                  </Link>
                ))}
              </div>
            ) : (
              <figure className="flex flex-col justify-center gap-5 rounded-2xl border border-primary/10 bg-white/80 p-8">
                <blockquote className="text-[18px] font-medium leading-[1.5] text-foreground sm:text-[20px]">{t("join.quote")}</blockquote>
              </figure>
            )}
          </div>
        </div>
      </Section>

      {/* 06 — Đội ngũ lãnh đạo */}
      <Section variant="light" labelledBy="about-leadership-title">
        <SectionHead eyebrow={t("leadership.eyebrow")} title={t("leadership.heading")} />
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="w-full max-w-[340px] text-center lg:col-span-2 lg:mx-auto">
            <span className="group relative mx-auto block h-40 w-40 overflow-hidden rounded-full border-4 border-primary/10 transition duration-300 ease-out hover:scale-105 hover:border-primary/40 hover:shadow-[0_12px_32px_rgba(49,92,255,0.2)]">
              <Image src="/ceo/tran-thanh-tuyen.png" alt={t("leadership.ceoName")} fill sizes="160px" className="object-cover transition duration-500 ease-out group-hover:scale-110" />
            </span>
            <h3 className={cn(displayHeading, "mt-6 text-[22px] leading-[1.2]")}>{t("leadership.ceoName")}</h3>
            <p className={cn(label, "mt-2 text-primary")}>{t("leadership.ceoRole")}</p>
          </div>
          <div className="grid content-start gap-6 lg:order-2">
            <div className="rounded-2xl border border-border bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
              <p className={cn(displayHeading, "font-barlow text-[22px] font-semibold leading-tight text-foreground")}>{t("leadership.bioLabel")}</p>
              <div className="mt-5 grid gap-4">
                <p className="text-[14px] leading-[1.7] text-foreground/85">{t("leadership.bio1")}</p>
                <p className="text-[14px] leading-[1.7] text-foreground/85">{t("leadership.bio2")}</p>
                <p className="text-[14px] leading-[1.7] text-foreground/85">{t("leadership.bio3")}</p>
              </div>
            </div>
          </div>
          <div className="grid content-start gap-6 lg:order-3">
            <div className="rounded-2xl border border-border bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-8">
              <div>
                <p className={cn(displayHeading, "font-barlow text-[22px] font-semibold leading-tight text-foreground")}>{t("leadership.historyLabel")}</p>
              </div>
              <ul className="mt-6 grid">
                {([
                  { key: "2006 – 2010", children: ["history1"] },
                  { key: "2011 – 2016", children: ["history2", "history3", "history4"] },
                  { key: "16/10/2023 – Now", children: ["history5", "history6"] },
                ] as const).map((entry) => (
                  <li key={entry.key} className="relative flex gap-4 pb-8 last:pb-0 last:before:hidden before:absolute before:left-[5px] before:top-3 before:bottom-[-8px] before:w-px before:bg-border sm:gap-5">
                    <span aria-hidden="true" className="relative z-10 mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-primary bg-white ring-4 ring-primary/5" />
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold leading-[1.5] text-primary">{entry.key}</p>
                      <ul className="mt-1 grid gap-1.5 text-[14px] leading-[1.6] text-foreground">
                        {entry.children.map((child) => (
                          <li key={child}>- {t("leadership." + child)}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <CtaCinematic heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=consultation" primaryLabel={t("cta.primaryButton")} secondaryHref="/case-studies" secondaryLabel={t("cta.secondaryButton")} />
    </>
  );
}

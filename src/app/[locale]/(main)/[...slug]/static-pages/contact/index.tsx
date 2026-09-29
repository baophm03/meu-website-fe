import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import ContactForm from "./_components/contact-form";
import { Reveal } from "@/components/shared/reveal";
import Image from "next/image";
import type { ReactNode } from "react";
import { AtSign, Building2, Globe, Mail, MapPin, Phone } from "lucide-react";
import { getApiV10ContactInfo } from "@/api/endpoints/contact-info";
import type { ContactInfo } from "@/api/models/contactInfo";

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

const QUICK_CONTACT_ICONS: Record<string, typeof Mail> = {
  email: Mail,
  phone: Phone,
  hotline: Phone,
  address: MapPin,
};

const OFFICE_ICONS = [Building2, Mail, Globe];

export default async function ContactPage() {
  const t = await getTranslations("pages.contact");
  const contactInfos = await fetchContactInfos();
  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={`${t("hero.heading1")} ${t("hero.heading2")}`}
        summary={t("hero.summary")}
      />

      <Section variant="light" className="lg:py-[96px]">
        {/* Quick-glance contact strip */}
        {contactInfos.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {contactInfos.map((info) => {
              const Icon = QUICK_CONTACT_ICONS[info.key] ?? AtSign;
              return (
                <div
                  key={info.id}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_16px_40px_-28px_rgba(37,99,235,0.35)]"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className={cn(label, "text-muted-foreground")}>{info.key}</p>
                    <p className="mt-0.5 truncate text-[15px] font-medium text-foreground">{info.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        {/* Two panels: form | offices */}
        <div className={cn("grid gap-6 lg:grid-cols-[3fr_2fr]", contactInfos.length > 0 && "mt-6")}>
          {/* Panel 1: contact form */}
          <div className="rounded-2xl border border-border bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-10 lg:p-12">
            <span className={cn(label, "text-primary")}>{t("form.eyebrow")}</span>
            <h2 className={cn(displayHeading, "mt-4 text-[24px] leading-[1.12] sm:text-[28px]")}>{t("form.heading")}</h2>
            <p className="mt-3 text-[14px] leading-[1.65] text-muted-foreground">{t("form.summary")}</p>
            <ContactForm />
          </div>

          {/* Panel 2: offices */}
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <div className="relative h-[180px] sm:h-[220px]">
              <Image src="/images/hero/hero-2.jpg" alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <div className="p-7 sm:p-10 lg:p-10">
              <span className={cn(label, "text-primary")}>{t("offices.eyebrow")}</span>
              <h2 className={cn(displayHeading, "mt-4 text-[24px] leading-[1.12] sm:text-[28px]")}>{t("offices.heading")}</h2>
              <p className="mt-3 text-[14px] leading-[1.65] text-muted-foreground">{t("offices.summary")}</p>

              <ul className="mt-7 divide-y divide-border">
                {["item1", "item2", "item3"].map((item, i) => {
                  const Icon = OFFICE_ICONS[i] ?? Building2;
                  return (
                    <li key={item} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                        <Icon aria-hidden="true" className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className={cn(displayHeading, "text-[15px] leading-[1.3]")}>{t("offices." + item + "Title")}</h3>
                        <p className="mt-1 text-[13px] leading-[1.6] text-muted-foreground">{t("offices." + item + "Desc")}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Section>
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

function PageHero({ eyebrow,
  title,
  summary,
  image = "/images/contact-hero.jpg" }: {
    eyebrow: string;
    title: ReactNode;
    summary?: string;
    image?: string | null;
    children?: ReactNode;
  }) {
  return (
    <section aria-labelledby="page-hero-title" className="relative -mt-[68px] overflow-hidden bg-surface-dark text-white">
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="pointer-events-none object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(5,6,8,0.9)_0%,rgba(5,6,8,0.7)_50%,rgba(5,6,8,0.4)_100%)]"
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_90%_at_20%_100%,rgba(51,92,255,0.28),transparent_60%),radial-gradient(ellipse_50%_70%_at_85%_10%,rgba(0,240,255,0.14),transparent_60%)]"
        />
      )}
      <Reveal className={cn(shell, "relative")}>
        <div className="flex min-h-[420px] items-end pb-12 pt-28 sm:min-h-[460px] sm:pb-14">
          <div>
            <p className={cn(label, "text-primary-light")}>{eyebrow}</p>
            <h1
              id="page-hero-title"
              className={cn(displayHeading, "mt-4 max-w-[640px] text-[30px] uppercase leading-[1.05] sm:text-[38px] lg:text-[44px]")}
            >
              {title}
            </h1>
            {summary ? (
              <p className="mt-4 max-w-[520px] text-[14px] leading-[1.65] text-white sm:text-[15px]">
                {summary}
              </p>
            ) : null}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

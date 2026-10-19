import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import ContactForm from "./_components/contact-form";
import Image from "next/image";
import { AtSign, Building2, Globe, Mail, MapPin, Phone } from "lucide-react";
import { getApiV10ContactInfo } from "@/api/endpoints/contact-info";
import type { ContactInfo } from "@/api/models/contactInfo";
import { PageHero, Section, displayHeading, label } from "../_components/page-sections";

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

const QUICK_CONTACT_COLORS: Record<string, { icon: string; badge: string }> = {
  email: { icon: "text-sky-600", badge: "bg-sky-500/10" },
  phone: { icon: "text-emerald-600", badge: "bg-emerald-500/10" },
  hotline: { icon: "text-amber-600", badge: "bg-amber-500/10" },
  address: { icon: "text-violet-600", badge: "bg-violet-500/10" },
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
        image="/images/contact-hero.jpg"
      />

      <Section variant="light" className="lg:py-[96px]">
        {/* Contact form with API details in the sidebar */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)]">
          <div className="rounded-2xl border border-border bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-10 lg:p-12">
            <span className={cn(label, "text-primary")}>{t("form.eyebrow")}</span>
            <h2 className={cn(displayHeading, "mt-4 text-[24px] leading-[1.12] sm:text-[28px]")}>{t("form.heading")}</h2>
            <ContactForm />
          </div>

          {contactInfos.length > 0 ? (
            <aside className="h-fit rounded-2xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:sticky sm:top-24 sm:p-8">
              <h2 className={cn(displayHeading, "text-[20px] leading-[1.2] sm:text-[22px]")}>{t("offices.heading")}</h2>
              <ul className="mt-5 space-y-2">
                {contactInfos.map((info) => {
                  const Icon = QUICK_CONTACT_ICONS[info.key] ?? AtSign;
                  const colors = QUICK_CONTACT_COLORS[info.key] ?? { icon: "text-primary", badge: "bg-primary/10" };
                  return (
                    <li key={info.id} className="flex items-start gap-3 py-3">
                      <span className={cn("mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full", colors.badge)}>
                        <Icon aria-hidden="true" className={cn("h-4 w-4", colors.icon)} />
                      </span>
                      <div className="min-w-0">
                        <p className={cn(label, "text-muted-foreground")}>{info.key}</p>
                        <p className="mt-1 break-words text-[14px] font-medium leading-[1.5] text-foreground">{info.value}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </aside>
          ) : null}
        </div>
      </Section>
    </>
  );
}

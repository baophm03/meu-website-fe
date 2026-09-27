import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { PageHero, Section, label, displayHeading } from "@/app/[locale]/(main)/_components/section-primitives";
import ContactForm from "./_components/contact-form";

export default function ContactPage() {
  const t = useTranslations("pages.contact");
  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={<>
          {t("hero.heading1")}
          <br />
          <span className="text-primary-light">{t("hero.heading2")}</span>
        </>}
        summary={t("hero.summary")}
      />

      <Section variant="light" className="lg:py-[96px]">
        {/* One frame — two panels: form | offices */}
        <div className="grid border border-border bg-white shadow-[0_16px_60px_-24px_rgba(15,23,42,0.18)] lg:grid-cols-[3fr_2fr] lg:divide-x lg:divide-border">
          {/* Panel 1: contact form */}
          <div className="p-7 sm:p-10 lg:p-12">
            <span className={cn(label, "text-primary")}>{t("form.eyebrow")}</span>
            <h2 className={cn(displayHeading, "mt-4 text-[24px] leading-[1.12] sm:text-[28px]")}>{t("form.heading")}</h2>
            <p className="mt-3 text-[14px] leading-[1.65] text-muted-foreground">{t("form.summary")}</p>

            <ContactForm />
          </div>

          {/* Panel 2: offices */}
          <div className="border-t border-border bg-muted p-7 sm:p-10 lg:border-t-0 lg:p-12">
            <span className={cn(label, "text-primary")}>{t("offices.eyebrow")}</span>
            <h2 className={cn(displayHeading, "mt-4 text-[24px] leading-[1.12] sm:text-[28px]")}>{t("offices.heading")}</h2>
            <p className="mt-3 text-[14px] leading-[1.65] text-muted-foreground">{t("offices.summary")}</p>

            <div className="mt-8 grid gap-4">
              {["item1", "item2", "item3"].map((item, i) => (
                <div key={item} className="border border-border bg-white p-6">
                  <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
                  <h3 className={cn(displayHeading, "mt-3 text-[18px] leading-[1.2]")}>{t("offices." + item + "Title")}</h3>
                  <p className="mt-2 text-[13px] leading-[1.6] text-muted-foreground">{t("offices." + item + "Desc")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

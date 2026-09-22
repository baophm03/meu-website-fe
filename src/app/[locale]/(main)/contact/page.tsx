import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";
import { Section, label, displayHeading } from "../_components/section-primitives";

export default function ContactPage() {
  const t = useTranslations("pages.contact");
  return (
    <>
      {/* Compact hero with photo backdrop */}
      <section aria-labelledby="page-hero-title" className="relative overflow-hidden bg-surface-dark text-white">
        <Image
          src="/images/contact-hero.jpg"
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
        <Reveal className="container relative">
          <div className="flex min-h-[300px] items-end pb-12 pt-28 sm:min-h-[340px] sm:pb-14">
            <div>
              <p className={cn(label, "text-primary-light")}>{t("hero.eyebrow")}</p>
              <h1
                id="page-hero-title"
                className={cn(displayHeading, "mt-4 max-w-[640px] text-[30px] uppercase leading-[1.05] sm:text-[38px] lg:text-[44px]")}
              >
                {t("hero.heading1")}
                <br />
                <span className="text-primary-light">{t("hero.heading2")}</span>
              </h1>
              <p className="mt-4 max-w-[520px] text-[14px] leading-[1.65] text-white/65 sm:text-[15px]">
                {t("hero.summary")}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <Section variant="white" className="lg:py-[96px]">
        {/* One frame — two panels: form | offices */}
        <div className="grid border border-border lg:grid-cols-[3fr_2fr] lg:divide-x lg:divide-border">
          {/* Panel 1: contact form */}
          <div className="p-7 sm:p-10 lg:p-12">
            <span className={cn(label, "text-primary")}>{t("form.eyebrow")}</span>
            <h2 className={cn(displayHeading, "mt-4 text-[24px] leading-[1.12] sm:text-[28px]")}>{t("form.heading")}</h2>
            <p className="mt-3 text-[14px] leading-[1.65] text-muted-foreground">{t("form.summary")}</p>

            <form className="mt-8 grid gap-5" action="#" method="POST">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className={cn(label, "text-muted-foreground")}>{t("form.nameLabel")}</span>
                  <input type="text" name="name" placeholder={t("form.namePlaceholder")} className="h-12 border border-border bg-background px-4 text-[15px] focus-visible:outline-2 focus-visible:outline-primary" />
                </label>
                <label className="grid gap-2">
                  <span className={cn(label, "text-muted-foreground")}>{t("form.emailLabel")}</span>
                  <input type="email" name="email" placeholder={t("form.emailPlaceholder")} className="h-12 border border-border bg-background px-4 text-[15px] focus-visible:outline-2 focus-visible:outline-primary" />
                </label>
              </div>
              <label className="grid gap-2">
                <span className={cn(label, "text-muted-foreground")}>{t("form.companyLabel")}</span>
                <input type="text" name="company" placeholder={t("form.companyPlaceholder")} className="h-12 border border-border bg-background px-4 text-[15px] focus-visible:outline-2 focus-visible:outline-primary" />
              </label>
              <label className="grid gap-2">
                <span className={cn(label, "text-muted-foreground")}>{t("form.messageLabel")}</span>
                <textarea name="message" rows={5} placeholder={t("form.messagePlaceholder")} className="border border-border bg-background p-4 text-[15px] focus-visible:outline-2 focus-visible:outline-primary" />
              </label>
              <button type="submit" className="inline-flex h-12 items-center justify-center border border-primary bg-primary px-8 text-[12px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                {t("form.submitButton")}
              </button>
              <p className="text-[13px] leading-[1.55] text-muted-foreground">{t("form.note")}</p>
            </form>
          </div>

          {/* Panel 2: offices */}
          <div className="border-t border-border bg-muted p-7 sm:p-10 lg:border-t-0 lg:p-12">
            <span className={cn(label, "text-primary")}>{t("offices.eyebrow")}</span>
            <h2 className={cn(displayHeading, "mt-4 text-[24px] leading-[1.12] sm:text-[28px]")}>{t("offices.heading")}</h2>
            <p className="mt-3 text-[14px] leading-[1.65] text-muted-foreground">{t("offices.summary")}</p>

            <div className="mt-8 grid gap-4">
              {["item1", "item2", "item3"].map((item, i) => (
                <div key={item} className="border border-border bg-background p-6">
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

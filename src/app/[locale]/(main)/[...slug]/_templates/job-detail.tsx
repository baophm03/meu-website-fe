import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Briefcase, CalendarDays, Clock3, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import type { Job } from "@/api/models/job";
import { Reveal } from "@/components/shared/reveal";
import type { ReactNode } from "react";

/**
 * Job-posting detail — jobs are their own CMS entity (`jobs` table), resolved
 * by slug in the catch-all route. Layout mirrors real careers pages:
 * department badge + meta chips, a wide JD column and a sticky apply sidebar.
 */
export default function JobDetailPage({ job,
  related,
  locale }: {
    job: Job;
    related: Job[];
    locale: string;
  }) {
  const t = useTranslations("pages.jobDetail");
  const isVi = locale === "vi";
  const deadline = job.apply_deadline
    ? new Date(job.apply_deadline).toLocaleDateString(isVi ? "vi-VN" : "en-US", { day: "2-digit", month: "2-digit", year: "numeric" })
    : null;
  const applyHref = job.apply_url || "/contact";

  return (
    <>
      <section aria-labelledby="job-title" className="container pb-10 pt-32 sm:pb-12 sm:pt-40">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div>
            {job.department ? (
              <span className={cn(label, "inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.06] px-4 py-1.5 text-primary")}>
                <Briefcase aria-hidden="true" className="h-3.5 w-3.5" />
                {job.department}
              </span>
            ) : null}
            <h1 id="job-title" className={cn(displayHeading, "mt-5 max-w-[760px] text-[32px] leading-[1.08] text-foreground sm:text-[44px] lg:text-[52px]")}>
              {job.title}
            </h1>
            {job.summary ? (
              <p className="mt-5 max-w-[640px] text-[15px] leading-[1.7] text-muted-foreground sm:text-[16px]">
                {job.summary}
              </p>
            ) : null}
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[13px] text-muted-foreground">
              {job.location ? (
                <span className="inline-flex items-center gap-2">
                  <MapPin aria-hidden="true" className="h-4 w-4 text-primary/70" />
                  {job.location}
                </span>
              ) : null}
              {job.employment_type ? (
                <span className="inline-flex items-center gap-2">
                  <Clock3 aria-hidden="true" className="h-4 w-4 text-primary/70" />
                  {job.employment_type}
                </span>
              ) : null}
              {deadline ? (
                <span className="inline-flex items-center gap-2">
                  <CalendarDays aria-hidden="true" className="h-4 w-4 text-primary/70" />
                  {t("deadline")}: {deadline}
                </span>
              ) : null}
            </div>
          </div>
          {/* Sticky apply card */}
          <aside className="rounded-2xl border border-border bg-white p-7 shadow-[0_16px_50px_-24px_rgba(15,23,42,0.2)] lg:sticky lg:top-28">
            <p className={cn(label, "text-primary")}>{t("applyNow")}</p>
            <p className="mt-3 text-[14px] leading-[1.65] text-muted-foreground">{t("applyHint")}</p>
            <Link
              href={applyHref}
              className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 border border-primary bg-primary text-[12px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-primary-hover"
            >
              {t("apply")}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            {deadline ? (
              <p className="mt-4 text-center text-[12px] text-muted-foreground">
                {t("deadline")}: {deadline}
              </p>
            ) : null}
          </aside>
        </div>
      </section>

      {/* JD body */}
      {job.description ? (
        <Section variant="light" className="bg-transparent pt-4 lg:pt-6">
          <div className="mx-auto max-w-[860px] rounded-2xl border border-border bg-white p-7 shadow-[0_16px_50px_-30px_rgba(15,23,42,0.18)] sm:p-10">
            <div
              className="text-[15.5px] leading-[1.8] text-muted-foreground sm:text-[17px] [&>h2]:mb-4 [&>h2]:mt-8 [&>h2]:text-[22px] [&>h2]:font-medium [&>h2]:leading-[1.2] [&>h2]:text-foreground [&>h3]:mb-3 [&>h3]:mt-6 [&>h3]:text-[18px] [&>h3]:font-medium [&>h3]:text-foreground [&>p]:mb-4 [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:mb-2 [&>ol]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol>li]:mb-2"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          </div>
        </Section>
      ) : null}

      {/* Other open roles */}
      {related.length > 0 ? (
        <Section variant="light" className="bg-transparent pt-0">
          <div className="border-t border-border pt-10">
            <div className="flex items-baseline justify-between gap-6">
              <h2 className={cn(displayHeading, "text-[24px] leading-tight text-foreground sm:text-[30px]")}>{t("otherRoles")}</h2>
              <Link href="/about/careers" className={cn(label, "shrink-0 text-primary transition hover:text-foreground")}>
                {t("allRoles")}
              </Link>
            </div>
            <ul className="mt-6 space-y-3">
              {related.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/${item.slug}?type=jobs`}
                    className="group grid items-center gap-2 rounded-2xl border border-border bg-white px-5 py-5 transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_16px_40px_rgb(6,62,142,0.10)] sm:grid-cols-[1fr_auto] sm:gap-6 sm:px-6"
                  >
                    <div className="min-w-0">
                      <h3 className="text-[16px] font-medium leading-snug transition-colors group-hover:text-primary sm:text-[18px]">
                        {item.title}
                      </h3>
                      <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-muted-foreground">
                        {item.department ? <span>{item.department}</span> : null}
                        {item.location ? (
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-primary/70" />
                            {item.location}
                          </span>
                        ) : null}
                      </p>
                    </div>
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-primary transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}
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

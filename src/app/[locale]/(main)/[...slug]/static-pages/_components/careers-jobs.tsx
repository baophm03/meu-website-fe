import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { label, displayHeading } from "@/app/[locale]/(main)/_components/section-primitives";
import { fetchPublicJobs } from "@/utils/public-jobs";

/**
 * Open-roles board for the careers page — jobs are their own CMS entity
 * (`jobs` table, `GET /api/v1.0/job`), grouped by department. Each row links
 * to the job detail, which carries the full description.
 */
export default async function CareersJobs() {
  const [{ jobs }, locale, t] = await Promise.all([
    fetchPublicJobs(),
    getLocale(),
    getTranslations("pages.about.careers"),
  ]);
  if (jobs.length === 0) return null;

  const isVi = locale === "vi";
  const groups = new Map<string, typeof jobs>();
  for (const job of jobs) {
    const dept = job.department || (isVi ? "Chung" : "General");
    groups.set(dept, [...(groups.get(dept) ?? []), job]);
  }
  const fmtDate = (d?: string | null) =>
    d ? new Date(d).toLocaleDateString(isVi ? "vi-VN" : "en-US", { day: "2-digit", month: "2-digit", year: "numeric" }) : null;

  return (
    <div>
      {[...groups.entries()].map(([dept, deptJobs]) => (
        <div key={dept} className="py-8 first:mt-0 sm:py-10">
          <div className="flex items-center gap-4">
            <h3 className={cn(displayHeading, "text-[22px] leading-tight sm:text-[26px]")}>{dept}</h3>
            <span className={cn(label, "rounded-full border border-border bg-muted px-3 py-1 text-primary")}>
              {deptJobs.length} {t("positions")}
            </span>
          </div>
          <ul className="mt-6 space-y-3">
            {deptJobs.map((job) => {
              const deadline = fmtDate(job.apply_deadline);
              return (
                <li key={job.id}>
                  <Link
                    href={`/${job.slug}?type=jobs`}
                    className="group grid items-center gap-3 rounded-2xl border border-border bg-white px-5 py-5 transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_16px_40px_rgb(6,62,142,0.10)] sm:grid-cols-[1fr_auto] sm:gap-6 sm:px-7"
                  >
                    <div className="min-w-0">
                      <h4 className="text-[17px] font-medium leading-snug transition-colors group-hover:text-primary sm:text-[19px]">
                        {job.title}
                      </h4>
                      <p className="mt-1.5 line-clamp-1 text-[13px] text-muted-foreground">{job.summary}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[12px] text-muted-foreground">
                        {job.location ? (
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-primary/70" />
                            {job.location}
                          </span>
                        ) : null}
                        {job.employment_type ? <span>{job.employment_type}</span> : null}
                        {deadline ? (
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays className="h-3.5 w-3.5 text-primary/70" />
                            {t("deadline")}: {deadline}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <span className={cn(label, "inline-flex items-center gap-2 rounded-full border border-primary/25 px-4 py-2 text-primary transition group-hover:border-primary group-hover:bg-primary group-hover:text-white")}>
                      {t("apply")}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

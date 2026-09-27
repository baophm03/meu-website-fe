import { getApiV10Job } from "@/api/endpoints/job";
import type { Job } from "@/api/models/job";

const rowsOf = <T>(res: { responseData?: unknown }): { rows: T[]; count: number } => {
  const data = res?.responseData as { rows?: T[]; count?: number } | undefined;
  return { rows: Array.isArray(data?.rows) ? data.rows : [], count: data?.count ?? 0 };
};

/** Public job board — active postings sorted newest first. */
export async function fetchPublicJobs(page = 1, pageSize = 60): Promise<{ jobs: Job[]; total: number }> {
  try {
    const res = await getApiV10Job({
      page,
      pageSize,
      sortField: "published_at",
      sortOrder: "desc",
      filters: "is_active==true",
    });
    const { rows, count } = rowsOf<Job>(res);
    return { jobs: rows, total: count };
  } catch {
    return { jobs: [], total: 0 };
  }
}

/** Resolve a job posting by its slug (catch-all route support). */
export async function fetchPublicJobBySlug(slug: string): Promise<{ job: Job; related: Job[] } | null> {
  try {
    const res = await getApiV10Job({
      page: 1,
      pageSize: 1,
      filters: `slug==${slug},is_active==true`,
    });
    const job = rowsOf<Job>(res).rows[0];
    if (!job?.id) return null;

    const siblings = await fetchPublicJobs(1, 8);
    const related = siblings.jobs.filter((item) => item.slug && item.slug !== job.slug).slice(0, 3);
    return { job, related };
  } catch {
    return null;
  }
}

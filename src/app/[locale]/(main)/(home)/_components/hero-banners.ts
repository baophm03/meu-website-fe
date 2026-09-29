import { getApiV10Banner } from "@/api/endpoints/banner";
import type { Banner } from "@/api/models/banner";
import { resolveCmsFileUrl } from "@/utils/file";

export interface HeroBannerSlide {
  id: string;
  title: string | null;
  description: string | null;
  image: string | null;
}

const FALLBACK_SLIDES: HeroBannerSlide[] = [
  {
    id: "fallback",
    title: null,
    description: null,
    image: null,
  },
];

/**
 * Fetch active hero banners (no-hook style — plain async function from orval).
 * Banners are ordered by display_order asc; inactive ones are filtered server-side.
 * Title/description are locale-aware: falls back to VI content when EN is empty.
 */
export async function fetchHeroBanners(locale: string): Promise<HeroBannerSlide[]> {
  try {
    const response = await getApiV10Banner({
      page: 1,
      pageSize: 50,
      sortField: "display_order",
      sortOrder: "asc",
      filters: "is_active==true",
    });

    const result = (response?.responseData ?? {}) as unknown as { rows?: Banner[] };
    const rows = result.rows ?? [];

    const slides = rows.map((row) => ({
      id: row.id,
      title: (locale === "en" ? row.title_en?.trim() || row.title?.trim() : row.title?.trim()) || null,
      description:
        (locale === "en"
          ? row.description_en?.trim() || row.description?.trim()
          : row.description?.trim()) || null,
      image: row.image?.path ? resolveCmsFileUrl(row.image.path) : null,
    }));

    return slides.length > 0 ? slides : FALLBACK_SLIDES;
  } catch {
    return FALLBACK_SLIDES;
  }
}

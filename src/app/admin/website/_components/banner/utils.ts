import { getApiV10Banner } from "@/api/endpoints/banner";
import type { GetApiV10BannerParams } from "@/api/models/getApiV10BannerParams";
import type { Banner } from "@/api/models/banner";

export interface BannerListResult {
  rows: Banner[];
  count: number;
  page: number;
  pageSize: number;
}

/**
 * Fetch banners list (no-hook style — plain async function from orval).
 */
export const fetchBanners = async (params: GetApiV10BannerParams): Promise<BannerListResult> => {
  const response = await getApiV10Banner(params);

  const responseData = (response?.responseData ?? {}) as {
    rows?: Banner[];
    count?: number;
    page?: number;
    pageSize?: number;
  };

  return {
    rows: responseData.rows ?? [],
    count: responseData.count ?? 0,
    page: responseData.page ?? 1,
    pageSize: responseData.pageSize ?? 10,
  };
};

export const buildBannerFilters = (keyword: string): string | undefined =>
  keyword ? `title@=${keyword}|title_en@=${keyword}|description@=${keyword}|description_en@=${keyword}` : undefined;

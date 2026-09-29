import type { Banner } from "@/api/models/banner";

export interface BannerFormValues {
  id?: string;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  image_id: string | null;
  display_order: string;
  is_active: boolean;
}

export const PAGE_SIZE = 10;

export const EMPTY_BANNER_FORM: BannerFormValues = {
  title: "",
  title_en: "",
  description: "",
  description_en: "",
  image_id: null,
  display_order: "0",
  is_active: true,
};

export type { Banner };

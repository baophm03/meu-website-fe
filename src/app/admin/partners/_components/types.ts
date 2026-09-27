import type { Partner } from "@/api/models/partner";

export interface PartnerFormValues {
  id?: string;
  name: string;
  slug: string;
  logo_id: string | null;
  website: string;
  phone: string;
  address: string;
  rating: string;
}

export const PAGE_SIZE = 10;

export const EMPTY_FORM: PartnerFormValues = {
  name: "",
  slug: "",
  logo_id: null,
  website: "",
  phone: "",
  address: "",
  rating: "",
};

export type { Partner };

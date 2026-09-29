import type { ContactInfo } from "@/api/models/contactInfo";

export interface ContactInfoFormValues {
  id?: string;
  key: string;
  value: string;
  display_order: string;
  is_active: boolean;
}

export const PAGE_SIZE = 10;

export const EMPTY_FORM: ContactInfoFormValues = {
  key: "",
  value: "",
  display_order: "0",
  is_active: true,
};

export type { ContactInfo };

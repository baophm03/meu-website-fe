import type { Job } from "@/api/models/job";

export interface JobFormValues {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  department: string;
  location: string;
  employment_type: string;
  apply_url: string;
  apply_deadline: string;
  published_at: string;
  is_active: boolean;
  is_featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export const PAGE_SIZE = 10;

export const EMPTY_FORM: JobFormValues = {
  title: "",
  slug: "",
  summary: "",
  description: "",
  department: "",
  location: "",
  employment_type: "",
  apply_url: "",
  apply_deadline: "",
  published_at: "",
  is_active: true,
  is_featured: false,
};

export type { Job };

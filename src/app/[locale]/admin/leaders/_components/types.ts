import type { Leader } from "@/api/models/leader";

export interface LeaderFormValues {
  id?: string;
  name: string;
  slug: string;
  position: string;
  bio: string;
  email: string;
  phone: string;
  avatar_id: string | null;
  linkedin_url: string;
  started_at: string;
  ended_at: string;
  display_order: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export const PAGE_SIZE = 10;

export const EMPTY_FORM: LeaderFormValues = {
  name: "",
  slug: "",
  position: "",
  bio: "",
  email: "",
  phone: "",
  avatar_id: null,
  linkedin_url: "",
  started_at: "",
  ended_at: "",
  display_order: "0",
  is_active: true,
};

export type { Leader };

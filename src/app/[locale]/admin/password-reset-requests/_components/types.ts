export interface PasswordResetRequest {
  id: string;
  email: string;
  note?: string | null;
  status: "PENDING" | "RESOLVED" | "REJECTED";
  resolved_by?: string | null;
  resolved_at?: string | null;
  resolve_note?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  resolved_by_user?: {
    id: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
  } | null;
}

export interface ListResponse {
  rows: PasswordResetRequest[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const PAGE_SIZE = 10;
export const DEFAULT_NEW_PASSWORD = "vcci@2026";



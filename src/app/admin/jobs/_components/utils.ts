import { toCmsSlug } from "@/utils/cms-slug";

export const fieldClassName =
  "rounded-xl border-[#063e8e]/15 bg-white text-gray-700 placeholder:text-gray-700 focus-visible:ring-[#063e8e]/30";

export const readOnlyFieldClassName =
  "rounded-xl border-[#063e8e]/10 bg-[#f8fbff] text-gray-500";

export const slugifyJob = (value: string) => toCmsSlug(value);

export const toDateTimeLocalValue = (value?: string | null) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Hybrid",
  "Remote",
  "Contract",
  "Internship",
] as const;

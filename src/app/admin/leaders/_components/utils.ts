import { toCmsSlug } from "@/utils/cms-slug";

export const fieldClassName =
  "rounded-xl border-[#063e8e]/15 bg-white text-gray-700 placeholder:text-gray-700 focus-visible:ring-[#063e8e]/30";

export const readOnlyFieldClassName =
  "rounded-xl border-[#063e8e]/10 bg-[#f8fbff] text-gray-500";

export const slugifyLeader = (value: string) => toCmsSlug(value);

export const toDateValue = (value?: string | null) => {
  if (!value) return "";
  return value.slice(0, 10);
};

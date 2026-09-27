import type { PageConfig } from "@/api/models/pageConfig";

export interface PageConfigFormValues {
	id?: string;
	name: string;
	name_en: string;
	path: string;
	description: string;
	description_en: string;
	is_active: boolean;
}

export const PAGE_SIZE = 20;

export const EMPTY_FORM: PageConfigFormValues = {
	name: "",
	name_en: "",
	path: "",
	description: "",
	description_en: "",
	is_active: true,
};

export const fieldClassName =
	"rounded-xl border-[#063e8e]/15 bg-white text-gray-700 placeholder:text-gray-700 focus-visible:ring-[#063e8e]/30";

export type { PageConfig };

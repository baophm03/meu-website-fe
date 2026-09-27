import { toCmsSlug } from "@/utils/cms-slug";
import type { CmsPageConfigSummary } from "@/api/types/cms";

export interface AdminMediaItem {
  id: string;
  name: string;
  alt: string;
  url: string;
  mime: string;
  size: number;
  created_at: string;
  updated_at: string;
  source: "seed" | "upload";
}

export interface AdminNewsImageRef {
  id: string;
  name: string;
  alt: string;
  url: string;
}

export interface AdminNewsContentImage {
  position: number;
  image: AdminNewsImageRef;
  caption: string;
}

export interface AdminNewsContentSection {
  id: string;
  type: "text" | "image";
  position: number;
  content: string;
  image_columns: number;
  image_rows: number;
  images: AdminNewsContentImage[];
}

export interface AdminNewsUser {
  id: string;
  email: string;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  full_name: string;
  avatar_url: string | null;
}

export interface AdminNewsItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  tagsearch_values: string[];
  page_config_ids: string[];
  page_configs: CmsPageConfigSummary[];
  is_featured: boolean;
  thumbnail: AdminNewsImageRef | null;
  is_hidden: boolean;
  created_at: string;
  updated_at: string;
  published_at: string;
  expired_at: string;
  post_content: AdminNewsContentSection[];
  creator?: AdminNewsUser | null;
  editor?: AdminNewsUser | null;
}

export interface AdminNewsFormValues {
  title: string;
  slug: string;
  summary: string;
  tagsearch_values: string[];
  page_config_ids: string[];
  is_featured: boolean;
  thumbnail: AdminNewsImageRef | null;
  is_hidden: boolean;
  created_at: string;
  updated_at: string;
  published_at: string;
  expired_at: string;
  post_content: AdminNewsContentSection[];
}

export const EMPTY_ADMIN_NEWS_FORM: AdminNewsFormValues = {
  title: "",
  slug: "",
  summary: "",
  tagsearch_values: [],
  page_config_ids: [],
  is_featured: false,
  thumbnail: null,
  is_hidden: false,
  created_at: "",
  updated_at: "",
  published_at: "",
  expired_at: "",
  post_content: [],
};

export function slugifyAdminNews(value: string) {
  return toCmsSlug(value);
}

export function createAdminNewsSectionId() {
  return `section-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function cloneAdminNewsFormValues(item?: AdminNewsItem | null): AdminNewsFormValues {
  if (!item) {
    return {
      ...EMPTY_ADMIN_NEWS_FORM,
      tagsearch_values: [],
      post_content: [],
    };
  }

  return {
    title: item.title,
    slug: item.slug,
    summary: item.summary,
    tagsearch_values: [...(item.tagsearch_values ?? [])],
    page_config_ids: [...(item.page_config_ids ?? [])],
    is_featured: item.is_featured ?? false,
    thumbnail: item.thumbnail ? { ...item.thumbnail } : null,
    is_hidden: item.is_hidden,
    created_at: item.created_at,
    updated_at: item.updated_at,
    published_at: item.published_at,
    expired_at: item.expired_at,
    post_content: item.post_content.map((section) => ({
      ...section,
      images: section.images.map((image) => ({
        ...image,
        caption: image.caption ?? "",
        image: { ...image.image },
      })),
    })),
  };
}

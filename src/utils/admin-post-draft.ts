import type {
  AdminNewsContentSection,
  AdminNewsFormValues,
  AdminNewsImageRef,
} from "@/utils/admin-news";

const ADMIN_POST_DRAFT_VERSION = 1;
const ADMIN_POST_DRAFT_PREFIX = "meu-admin-post-draft:create";

export interface AdminPostDraft {
  version: number;
  savedAt: string;
  form: AdminNewsFormValues;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const toStringValue = (value: unknown, fallback = "") =>
  typeof value === "string" ? value : fallback;

const toStringArray = (value: unknown) =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];

const toImageRef = (value: unknown): AdminNewsImageRef | null => {
  if (!isRecord(value)) return null;

  const id = toStringValue(value.id);
  const url = toStringValue(value.url);
  if (!id || !url) return null;

  return {
    id,
    url,
    name: toStringValue(value.name),
    alt: toStringValue(value.alt),
  };
};

const toContentSections = (value: unknown): AdminNewsContentSection[] => {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (!isRecord(item) || (item.type !== "text" && item.type !== "image")) {
      return [];
    }

    const id = toStringValue(item.id);
    if (!id) return [];

    const images = Array.isArray(item.images)
      ? item.images.flatMap((image) => {
          if (!isRecord(image)) return [];
          const imageRef = toImageRef(image.image);
          if (!imageRef) return [];

          return [{
            position: Number(image.position) || 1,
            caption: toStringValue(image.caption),
            image: imageRef,
          }];
        })
      : [];

    return [{
      id,
      type: item.type,
      position: Number(item.position) || 1,
      content: toStringValue(item.content),
      image_columns: Math.min(Math.max(Number(item.image_columns) || 1, 1), 4),
      image_rows: Math.min(Math.max(Number(item.image_rows) || 1, 1), 4),
      images,
    }];
  });
};

const normalizeDraftForm = (value: unknown): AdminNewsFormValues => {
  const form = isRecord(value) ? value : {};

  return {
    title: toStringValue(form.title),
    slug: toStringValue(form.slug),
    summary: toStringValue(form.summary),
    tagsearch_values: toStringArray(form.tagsearch_values),
    page_config_ids: toStringArray(form.page_config_ids),
    is_featured: form.is_featured === true,
    thumbnail: toImageRef(form.thumbnail),
    is_hidden: form.is_hidden === true,
    created_at: toStringValue(form.created_at),
    updated_at: toStringValue(form.updated_at),
    published_at: toStringValue(form.published_at),
    expired_at: toStringValue(form.expired_at),
    post_content: toContentSections(form.post_content),
  };
};

export function getAdminPostDraftKey(userId?: string | null) {
  return `${ADMIN_POST_DRAFT_PREFIX}:${userId || "anonymous"}`;
}

export function readAdminPostDraft(userId?: string | null): AdminPostDraft | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(getAdminPostDraftKey(userId));
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed) || parsed.version !== ADMIN_POST_DRAFT_VERSION) {
      return null;
    }

    const savedAt = toStringValue(parsed.savedAt);
    if (!savedAt || Number.isNaN(new Date(savedAt).getTime())) return null;

    return {
      version: ADMIN_POST_DRAFT_VERSION,
      savedAt,
      form: normalizeDraftForm(parsed.form),
    };
  } catch {
    return null;
  }
}

export function writeAdminPostDraft(
  form: AdminNewsFormValues,
  userId?: string | null,
) {
  if (typeof window === "undefined") return null;

  const draft: AdminPostDraft = {
    version: ADMIN_POST_DRAFT_VERSION,
    savedAt: new Date().toISOString(),
    form: normalizeDraftForm(form),
  };

  try {
    window.localStorage.setItem(
      getAdminPostDraftKey(userId),
      JSON.stringify(draft),
    );
    return draft.savedAt;
  } catch {
    return null;
  }
}

export function cloneAdminPostDraftForm(
  form: AdminNewsFormValues,
): AdminNewsFormValues {
  return {
    ...form,
    tagsearch_values: [...form.tagsearch_values],
    page_config_ids: [...form.page_config_ids],
    thumbnail: form.thumbnail ? { ...form.thumbnail } : null,
    post_content: form.post_content.map((section) => ({
      ...section,
      images: section.images.map((image) => ({
        ...image,
        image: { ...image.image },
      })),
    })),
  };
}

export function clearAdminPostDraft(userId?: string | null) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(getAdminPostDraftKey(userId));
  } catch {
    // Ignore storage cleanup failures; the next successful save can overwrite it.
  }
}

export function hasAdminPostDraftContent(form: AdminNewsFormValues) {
  return Boolean(
    form.title.trim() ||
      form.slug.trim() ||
      form.summary.trim() ||
      form.tagsearch_values.length ||
      form.page_config_ids.length ||
      form.thumbnail ||
      form.published_at ||
      form.expired_at ||
      form.post_content.some(
        (section) =>
          section.content.trim() ||
          section.images.length > 0,
      ),
  );
}

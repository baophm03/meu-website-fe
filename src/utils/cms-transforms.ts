"use client";

import { toCmsSlug } from "@/utils/cms-slug";
import links from "@/links";
import type { PostCreate } from "@/api/models/postCreate";
import type {
  CmsHeaderConfigItem,
  CmsHeaderConfigNode,
  CmsHeaderConfigDetailItem,
  CmsNewsItem,
  CmsNewsPayloadInput,
  CmsPostContentSection,
  CmsRawPostItem,
  CmsRawUser,
  CmsTagItem,
  CmsUserSummary,
} from "@/api/types/cms";

export * from "@/api/types/cms";

export const normalizeUser = (user: CmsRawUser | null | undefined): CmsUserSummary | null => {
  if (!user || typeof user !== "object" || !user.id) return null;
  const firstName = String(user.first_name ?? "").trim();
  const lastName = String(user.last_name ?? "").trim();
  const fullName =
    String(user.full_name ?? "").trim() ||
    [firstName, lastName].filter(Boolean).join(" ").trim() ||
    String(user.username ?? "").trim() ||
    String(user.email ?? "").trim();
  return {
    id: String(user.id),
    email: String(user.email ?? ""),
    username: user.username ? String(user.username) : null,
    first_name: firstName || null,
    last_name: lastName || null,
    full_name: fullName,
    avatar_url: user.avatar_url ? String(user.avatar_url) : null,
  };
};

export const normalizeDateTimeInput = (value?: string | null) => {
  if (!value) return "";
  return value.length >= 16 ? value.slice(0, 16) : value;
};

export const toSlugFromPath = (staticLink?: string | null) => {
  const normalized = (staticLink ?? "").trim();
  if (!normalized || normalized === "/") return "";
  const segments = normalized.split("/").filter(Boolean);
  return segments.at(-1) ?? "";
};


export const normalizeTagNames = (values: string[]) => {
  const seen = new Set<string>();

  return values
    .map((value) => value.trim())
    .filter((value) => {
      if (!value) return false;
      const key = value.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
};

export const parsePostContent = (contentStructure?: Record<string, unknown> | null): CmsPostContentSection[] => {
  const sections = Array.isArray(contentStructure?.post_content)
    ? (contentStructure?.post_content as Record<string, unknown>[])
    : [];

  return sections.map((section, index) => {
    const images = Array.isArray(section.images) ? (section.images as Record<string, unknown>[]) : [];

    return {
      id: typeof section.id === "string" ? section.id : `section-${index + 1}`,
      type: section.type === "image" ? "image" : "text",
      position: typeof section.position === "number" ? section.position : index + 1,
      content: typeof section.content === "string" ? section.content : "",
      image_columns:
        typeof section.image_columns === "number" ? section.image_columns : 2,
      image_rows: typeof section.image_rows === "number" ? section.image_rows : 2,
      images: images.map((image, imageIndex) => ({
        position: typeof image.position === "number" ? image.position : imageIndex + 1,
        caption: typeof image.caption === "string" ? image.caption : "",
        image: {
          id: typeof image.image === "object" && image.image && "id" in image.image
            ? String((image.image as Record<string, unknown>).id ?? "")
            : "",
          name:
            typeof image.image === "object" && image.image && "name" in image.image
              ? String((image.image as Record<string, unknown>).name ?? "")
              : "",
          alt:
            typeof image.image === "object" && image.image && "alt" in image.image
              ? String((image.image as Record<string, unknown>).alt ?? "")
              : "",
          url:
            typeof image.image === "object" && image.image && "url" in image.image
              ? String((image.image as Record<string, unknown>).url ?? "")
              : "",
        },
      })),
    };
  });
};

export const parseLegacyPostContent = (content?: string | null): CmsPostContentSection[] => {
  const normalizedContent = typeof content === "string" ? content.trim() : "";

  if (!normalizedContent) {
    return [];
  }

  return [
    {
      id: "legacy-content-section",
      type: "text",
      position: 1,
      content: normalizedContent,
      image_columns: 2,
      image_rows: 2,
      images: [],
    },
  ];
};

export const transformPost = (
  post: CmsRawPostItem,
  tagMap?: Map<string, CmsTagItem[]>,
): CmsNewsItem => {
  const tagItems = tagMap?.get(post.id ?? "") ?? [];
  const structuredContent = parsePostContent(post.content_structure);
  const fallbackContent =
    structuredContent.length > 0 ? structuredContent : parseLegacyPostContent(post.content);

  return {
    id: post.id ?? "",
    title: post.title ?? "",
    slug: post.slug ?? "",
    summary: post.summary ?? "",
    tagsearch_values: tagItems.map((item) => item.name),
    tag_ids: tagItems.map((item) => item.id),
    page_configs: Array.isArray(post.page_configs) ? post.page_configs : [],
    page_config_ids: Array.isArray(post.page_configs)
      ? post.page_configs
        .map((item) => item?.id)
        .filter((value): value is string => Boolean(value))
      : [],
    is_featured: Boolean(post.is_featured),
    thumbnail: post.thumbnail?.id
      ? {
        id: post.thumbnail.id,
        name: post.thumbnail.original ?? post.thumbnail.path ?? "thumbnail",
        alt: post.thumbnail.original ?? post.thumbnail.path ?? "thumbnail",
        url: links.resolveImageUrl(post.thumbnail.path),
      }
      : null,
    is_hidden: Boolean(post.is_hidden),
    created_at: post.created_at ?? "",
    updated_at: post.updated_at ?? "",
    published_at: normalizeDateTimeInput(post.published_at ?? post.release_at),
    expired_at: normalizeDateTimeInput(post.expired_at),
    post_content: fallbackContent,
    creator: normalizeUser(post.creator),
    editor: normalizeUser(post.editor),
  };
};

export function buildHeaderConfigTree(rows: CmsHeaderConfigItem[]) {
  const nodeMap = new Map<string, CmsHeaderConfigNode>();
  const roots: CmsHeaderConfigNode[] = [];
  const sortNodes = (nodes: CmsHeaderConfigNode[]) => {
    nodes.sort((left, right) => {
      const leftOrder = left.sort_order ?? Number.MAX_SAFE_INTEGER;
      const rightOrder = right.sort_order ?? Number.MAX_SAFE_INTEGER;

      if (leftOrder !== rightOrder) return leftOrder - rightOrder;
      return left.name.localeCompare(right.name, "vi");
    });
  };

  rows.forEach((row) => {
    nodeMap.set(row.id, { ...row, children: [] });
  });

  rows.forEach((row) => {
    const node = nodeMap.get(row.id);
    if (!node) return;

    if (row.parent_id) {
      const parent = nodeMap.get(row.parent_id);
      if (parent) {
        parent.children?.push(node);
        sortNodes(parent.children ?? []);
        return;
      }
    }

    roots.push(node);
  });

  sortNodes(roots);
  return roots;
}

export function buildHeaderItemsFromHeaderConfigs(
  nodes: CmsHeaderConfigNode[],
  parentId: string | null = null,
  depth = 0,
): CmsHeaderConfigDetailItem[] {
  return nodes.flatMap((node, index) => {
    const item: CmsHeaderConfigDetailItem = {
      id: node.id,
      code: node.id,
      name: node.name,
      name_en: node.name_en ?? null,
      static_link: node.url ?? "",
      sort_order: node.sort_order ?? index + 1,
      parent_id: parentId,
      api_parent_id: node.parent_id ?? null,
      level: depth + 1,
      description: node.description ?? "",
      description_en: node.description_en ?? null,
      created_at: node.created_at,
      updated_at: node.updated_at,
    };

    return [
      item,
      ...buildHeaderItemsFromHeaderConfigs(node.children ?? [], node.id, depth + 1),
    ];
  });
}

export const buildStaticLink = (slug: string, parentStaticLink?: string | null) => {
  const cleanSlug = slug.trim().replace(/^\/+|\/+$/g, "");
  if (!cleanSlug) {
    return parentStaticLink?.trim() || "/";
  }

  const cleanParent = (parentStaticLink ?? "").trim().replace(/\/+$/, "");
  if (!cleanParent || cleanParent === "/") {
    return `/${cleanSlug}`;
  }

  return `${cleanParent}/${cleanSlug}`;
};

export const toTagSlug = (value: string) => toCmsSlug(value);

export const buildPostPayload = (input: CmsNewsPayloadInput): PostCreate => ({
  title: input.title,
  slug: input.slug,
  summary: input.summary,
  content: input.summary || "",
  thumbnail_id: input.thumbnail_id ?? null,
  page_config_ids:
    input.page_config_ids ?? (input.page_config_id ? [input.page_config_id] : []),
  page_config_id:
    input.page_config_ids?.[0] ?? input.page_config_id ?? null,
  is_featured: input.is_featured,
  is_hidden: input.is_hidden,
  is_active: !input.is_hidden,
  published_at: input.published_at || null,
  expired_at: input.expired_at || null,
  release_mode: input.published_at ? "SCHEDULED" : "NOW",
  release_at: input.published_at || null,
  content_structure: {
    post_content: input.post_content,
  },
});

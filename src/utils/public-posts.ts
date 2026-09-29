import { getApiV10PageConfig } from "@/api/endpoints/page-config";
import { getApiV10Post, getApiV10PostByPageConfigPageConfigId } from "@/api/endpoints/post";
import type { PageConfig } from "@/api/models/pageConfig";
import type { Post } from "@/api/models/post";
import type { MockPost, MockPostSection } from "@/mockdata/posts";
import { resolveCmsFileUrl } from "@/utils/file";

/** API Post row — runtime includes the `thumbnail` relation not declared in swagger. */
export type PublicPost = Post & {
  thumbnail?: { id?: string; path?: string | null; original?: string | null; mime?: string | null } | null;
};

const rowsOf = <T>(res: { responseData?: unknown }): T[] => {
  const data = res?.responseData as { rows?: T[] } | undefined;
  return Array.isArray(data?.rows) ? data.rows : [];
};

export const pagePathCandidatesOf = (slug: string[]): string[] => {
  const leaf = slug[slug.length - 1] ?? "";
  const parent = slug[slug.length - 2] ?? "";
  return parent ? [`/${leaf}`, `/${parent}-${leaf}`] : [`/${leaf}`];
};

export async function fetchPageConfigByPath(candidates: string[]): Promise<PageConfig | null> {
  for (const path of candidates) {
    try {
      const res = await getApiV10PageConfig({ page: 1, pageSize: 1, filters: `path==${path}` });
      const row = rowsOf<PageConfig>(res)[0];
      if (row?.id) return row;
    } catch {
      // try next candidate
    }
  }
  return null;
}

export async function fetchPostsByPageConfigId(pageConfigId: string, pageSize = 60): Promise<PublicPost[]> {
  const { posts } = await fetchPostsPageByPageConfigId(pageConfigId, 1, pageSize);
  return posts;
}

export async function fetchPostsPageByPageConfigId(
  pageConfigId: string,
  page: number,
  pageSize: number,
): Promise<{ posts: PublicPost[]; total: number }> {
  try {
    const res = await getApiV10PostByPageConfigPageConfigId(pageConfigId, {
      page,
      pageSize,
      sortField: "published_at",
      sortOrder: "desc",
      filters: "is_active==true,is_hidden==false",
    });
    const data = res?.responseData as { rows?: PublicPost[]; count?: number } | undefined;
    return {
      posts: Array.isArray(data?.rows) ? data.rows : [],
      total: typeof data?.count === "number" ? data.count : 0,
    };
  } catch {
    return { posts: [], total: 0 };
  }
}

/** Resolve the current pathname segments to a page_config, then load its posts. */
export async function fetchPostsBySlugPath(
  slug: string[],
): Promise<{ pageConfig: PageConfig | null; posts: PublicPost[] }> {
  const { pageConfig, posts } = await fetchPostsPageBySlugPath(slug, 1, 60);
  return { pageConfig, posts };
}

export async function fetchPostsPageBySlugPath(
  slug: string[],
  page: number,
  pageSize: number,
): Promise<{ pageConfig: PageConfig | null; posts: PublicPost[]; total: number }> {
  const pageConfig = await fetchPageConfigByPath(pagePathCandidatesOf(slug));
  if (!pageConfig?.id) return { pageConfig, posts: [], total: 0 };
  const { posts, total } = await fetchPostsPageByPageConfigId(pageConfig.id, page, pageSize);
  return { pageConfig, posts, total };
}



const postHtmlOf = (post: PublicPost): string => {
  const items = (post.content_structure as { post_content?: Array<{ type?: string; position?: number; content?: string }> } | null)?.post_content;
  const textHtml = (Array.isArray(items) ? items : [])
    .filter((item) => item?.type === "text" && typeof item.content === "string" && item.content.trim())
    .sort((a, b) => (a?.position ?? 0) - (b?.position ?? 0))
    .map((item) => item.content as string)
    .join("");
  return textHtml || post.content || "";
};

export const apiPostToMockPost = (post: PublicPost): MockPost => {
  const html = postHtmlOf(post);
  const primaryConfig = post.page_configs?.[0];
  const sections: MockPostSection[] = html
    ? [{ heading: "", headingEn: "", body: html, bodyEn: html }]
    : [];

  return {
    slug: post.slug ?? "",
    headerConfig: primaryConfig?.name ?? "Insights",
    headerConfigEn: primaryConfig?.name_en ?? primaryConfig?.name ?? "Insights",
    title: post.title,
    titleEn: post.title,
    excerpt: post.summary ?? "",
    excerptEn: post.summary ?? "",
    image: post.thumbnail?.path ? resolveCmsFileUrl(post.thumbnail.path) : "/images/insights/insight-1.jpg",
    publishedAt: post.published_at ?? post.created_at,
    sections,
  };
};

/** Page-config paths that mark a post as a case study (`/case-studies` + sub-groups). */
const CASE_STUDY_CONFIG_PATHS = new Set([
  "/case-studies",
  "/case-studies-industry",
  "/featured",
  "/solution",
  "/technology",
]);

/**
 * Fetch a post that is attached to a case-studies page config — used for the
 * `?type=case-studies` detail route so a regular post never renders with the
 * case-study template.
 */
export async function fetchPublicCaseStudyBySlug(
  slug: string,
): Promise<{ post: MockPost; related: MockPost[] } | null> {
  try {
    const res = await getApiV10Post({
      page: 1,
      pageSize: 1,
      filters: `slug==${slug},is_active==true,is_hidden==false`,
    });
    const row = rowsOf<PublicPost>(res)[0];
    if (!row?.id) return null;

    const configs = Array.isArray(row.page_configs) ? row.page_configs : [];
    const csConfig = configs.find((pc) => pc?.path && CASE_STUDY_CONFIG_PATHS.has(pc.path));
    if (!csConfig?.id) return null;

    const siblings = await fetchPostsByPageConfigId(csConfig.id, 4);
    const related = siblings
      .filter((item) => item.slug && item.slug !== row.slug)
      .slice(0, 3)
      .map(apiPostToMockPost);

    return { post: apiPostToMockPost(row), related };
  } catch {
    return null;
  }
}

/** Fetch a public post by slug (fallback for slugs not in mockdata). */
export async function fetchPublicPostBySlug(
  slug: string,
): Promise<{ post: MockPost; related: MockPost[] } | null> {
  try {
    const res = await getApiV10Post({
      page: 1,
      pageSize: 1,
      filters: `slug==${slug},is_active==true,is_hidden==false`,
    });
    const row = rowsOf<PublicPost>(res)[0];
    if (!row?.id) return null;

    const pageConfigId = row.page_configs?.[0]?.id;
    const siblings = pageConfigId ? await fetchPostsByPageConfigId(pageConfigId, 4) : [];
    const related = siblings
      .filter((item) => item.slug && item.slug !== row.slug)
      .slice(0, 3)
      .map(apiPostToMockPost);

    return { post: apiPostToMockPost(row), related };
  } catch {
    return null;
  }
}

/**
 * Fetch a post attached to a page config inside a path group (e.g. `/solutions`
 * or `/solutions-*`) — used for the `?type=solutions`/`?type=industries` detail
 * routes so a regular post never renders with a group template.
 */
export async function fetchPublicPostInGroupBySlug(
  slug: string,
  groupPath: string,
): Promise<{ post: MockPost; related: MockPost[] } | null> {
  try {
    const res = await getApiV10Post({
      page: 1,
      pageSize: 1,
      filters: `slug==${slug},is_active==true,is_hidden==false`,
    });
    const row = rowsOf<PublicPost>(res)[0];
    if (!row?.id) return null;

    const configs = Array.isArray(row.page_configs) ? row.page_configs : [];
    const groupConfig = configs.find(
      (pc) => pc?.path === groupPath || pc?.path?.startsWith(`${groupPath}-`),
    );
    if (!groupConfig?.id) return null;

    const siblings = await fetchPostsByPageConfigId(groupConfig.id, 4);
    const related = siblings
      .filter((item) => item.slug && item.slug !== row.slug)
      .slice(0, 3)
      .map(apiPostToMockPost);

    return { post: apiPostToMockPost(row), related };
  } catch {
    return null;
  }
}

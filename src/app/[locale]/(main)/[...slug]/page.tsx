import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getStaticPageMeta } from "@/mockdata/pages";
import { getPostBySlug, getRelatedPosts } from "@/mockdata/posts";
import {
  apiPostToMockPost,
  fetchPageConfigByPath,
  fetchPostsPageByPageConfigId,
  fetchPostsPageBySlugPath,
  fetchPublicCaseStudyBySlug,
  fetchPublicPostBySlug,
  fetchPublicPostInGroupBySlug,
  pagePathCandidatesOf,
} from "@/utils/public-posts";
import { fetchPublicJobBySlug } from "@/utils/public-jobs";
import PostDetailPage from "./_templates/post-detail";
import PostDetailFullPage from "./_templates/post-detail-full";
import JobDetailPage from "./_templates/job-detail";
import CaseStudyDetailPage from "./_templates/case-study-detail";
import SolutionDetailPage from "./_templates/solution-detail";
import IndustryDetailPage from "./_templates/industry-detail";
import PagePostsSection from "./_designed-pages/_components/page-posts-section";
import { DESIGNED_PAGE_COMPONENTS } from "./_designed-pages/registry";

type Props = {
  params: Promise<{ locale: string; slug: string[] }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const contentTypeOf = (
  searchParams: Record<string, string | string[] | undefined> | undefined,
) => {
  const raw = searchParams?.type;
  return Array.isArray(raw) ? raw[0] : raw;
};

const endingSlugOf = (slug: string[] | undefined) =>
  slug && slug.length > 0 ? String(slug[slug.length - 1] ?? "") : "";

const pathKeyOf = (slug: string[]) => slug.join("-");

const contentPageMetadataOf = async (
  slug: string[],
  isVi: boolean,
): Promise<Metadata | null> => {
  const pageConfig = await fetchPageConfigByPath(pagePathCandidatesOf(slug));
  if (pageConfig?.type !== "content" || !pageConfig.id) return null;

  const { posts, total } = await fetchPostsPageByPageConfigId(pageConfig.id, 1, 1);
  if (total === 1 && posts[0]) {
    return { title: posts[0].title, description: posts[0].summary ?? undefined };
  }

  const title = isVi ? pageConfig.name : pageConfig.name_en || pageConfig.name;
  const description = isVi
    ? pageConfig.description ?? undefined
    : pageConfig.description_en ?? pageConfig.description ?? undefined;
  return title ? { title, description } : null;
};

const contentPageOf = async (slug: string[], locale: string) => {
  const { pageConfig, posts, total } = await fetchPostsPageBySlugPath(slug, 1, 13);
  if (pageConfig?.type !== "content" || posts.length === 0) return notFound();

  if (total === 1) {
    return <PostDetailFullPage post={apiPostToMockPost(posts[0])} locale={locale} />;
  }
  return <PagePostsSection slug={slug} tone="light" linkSuffix="?type=posts" />;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const endingSlug = endingSlugOf(slug);
  const isVi = locale === "vi";

  const contentMeta = await contentPageMetadataOf(slug, isVi);
  if (contentMeta) return contentMeta;

  const pageMeta = getStaticPageMeta(endingSlug);
  if (pageMeta) {
    return {
      title: isVi ? pageMeta.titleVi : pageMeta.titleEn,
      description: isVi ? pageMeta.descriptionVi : pageMeta.descriptionEn
    };
  }

  if (contentTypeOf(sp) === "jobs") {
    const apiJob = await fetchPublicJobBySlug(endingSlug);
    if (apiJob) { return { title: apiJob.job.title, description: apiJob.job.summary }; }
    return {};
  }

  if (contentTypeOf(sp) === "case-studies") {
    const apiCaseStudy = await fetchPublicCaseStudyBySlug(endingSlug);
    if (apiCaseStudy) { return { title: apiCaseStudy.post.title, description: apiCaseStudy.post.excerpt }; }
    return {};
  }

  const postType = contentTypeOf(sp);
  if (postType === "posts" || postType === "solutions" || postType === "industries") {
    const post = getPostBySlug(endingSlug);
    if (post) {
      return {
        title: isVi ? post.title : post.titleEn,
        description: isVi ? post.excerpt : post.excerptEn
      };
    }

    const apiPost = postType === "posts"
      ? await fetchPublicPostBySlug(endingSlug)
      : await fetchPublicPostInGroupBySlug(endingSlug, `/${postType}`);
    if (apiPost) { return { title: apiPost.post.title, description: apiPost.post.excerpt }; }
  }

  return {};
}

export default async function Page({ params, searchParams }: Props) {
  const { locale, slug } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const endingSlug = endingSlugOf(slug);
  if (!endingSlug) return notFound();

  const pageConfig = await fetchPageConfigByPath(pagePathCandidatesOf(slug));
  if (pageConfig?.type === "content") {
    return contentPageOf(slug, locale);
  }

  const DesignedPage =
    DESIGNED_PAGE_COMPONENTS[endingSlug] ??
    DESIGNED_PAGE_COMPONENTS[pathKeyOf(slug)];
  if (DesignedPage) {
    return <DesignedPage slug={slug} />;
  }

  if (contentTypeOf(sp) === "jobs") {
    const apiJob = await fetchPublicJobBySlug(endingSlug);
    if (apiJob) { return <JobDetailPage job={apiJob.job} related={apiJob.related} locale={locale} />; }
    return notFound();
  }

  if (contentTypeOf(sp) === "case-studies") {
    const apiCaseStudy = await fetchPublicCaseStudyBySlug(endingSlug);
    if (apiCaseStudy) { return <CaseStudyDetailPage post={apiCaseStudy.post} related={apiCaseStudy.related} locale={locale} />; }
    return notFound();
  }

  if (contentTypeOf(sp) === "solutions") {
    const post = getPostBySlug(endingSlug);
    if (post) { return <SolutionDetailPage post={post} related={getRelatedPosts(post.slug)} locale={locale} />; }

    const apiPost = await fetchPublicPostInGroupBySlug(endingSlug, "/solutions");
    if (apiPost) { return <SolutionDetailPage post={apiPost.post} related={apiPost.related} locale={locale} />; }
    return notFound();
  }

  if (contentTypeOf(sp) === "industries") {
    const post = getPostBySlug(endingSlug);
    if (post) { return <IndustryDetailPage post={post} related={getRelatedPosts(post.slug)} locale={locale} />; }

    const apiPost = await fetchPublicPostInGroupBySlug(endingSlug, "/industries");
    if (apiPost) { return <IndustryDetailPage post={apiPost.post} related={apiPost.related} locale={locale} />; }
    return notFound();
  }

  if (contentTypeOf(sp) === "posts") {
    const post = getPostBySlug(endingSlug);
    if (post) { return <PostDetailPage post={post} related={getRelatedPosts(post.slug)} locale={locale} />; }

    const apiPost = await fetchPublicPostBySlug(endingSlug);
    if (apiPost) { return <PostDetailPage post={apiPost.post} related={apiPost.related} locale={locale} />; }
  }

  return notFound();
}

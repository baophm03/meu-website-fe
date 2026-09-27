import { getLocale, getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { ArrowLink, Section } from "@/app/[locale]/(main)/_components/section-primitives";
import { fetchPageConfigByPath, fetchPostsByPageConfigId } from "@/utils/public-posts";
import type { PublicPost } from "@/utils/public-posts";
import type { PageConfig } from "@/api/models/pageConfig";
import NewsSectionHead from "./news-section-head";
import PostCard from "./post-card";

const GROUP_SIZE = 6;

/**
 * Hub listing for the `/insights` parent page — shows a few posts from every
 * child page_config (resolved by their `path`), each group linking to the
 * child page where the full list lives.
 */
export default async function PagePostsGrouped({ slug,
	childPaths,
	tone = "light" }: { slug: string[];
	childPaths: string[];
	tone?: "light" | "dark"; }) { const dark = tone === "dark";
	const [locale, t] = await Promise.all([getLocale(), getTranslations("pages.insights.posts")]);
	const isVi = locale === "vi";
	const parent = slug[0] ?? "";
	const parentPath = `/${slug.join("/")}`;
	const stripPrefix = new RegExp(`^${parent}-`);

	const groups = (
		await Promise.all(
			childPaths.map(async (path) => { const pageConfig = await fetchPageConfigByPath([path]);
				if (!pageConfig?.id) return null;
				const posts = await fetchPostsByPageConfigId(pageConfig.id, GROUP_SIZE);
				if (posts.length === 0) return null;
				return { pageConfig, posts }; }),
		)
	).filter((g): g is { pageConfig: PageConfig; posts: PublicPost[] } => g !== null);

	if (groups.length === 0) return null;

	return (
		<>
			{groups.map(({ pageConfig, posts }) => { const title = isVi ? pageConfig.name : pageConfig.name_en || pageConfig.name;
				// Public route leaf drops the "{parent}-" prefix: /insights-digital-transformation -> /insights/digital-transformation
				const leaf = (pageConfig.path ?? "").replace(/^\//, "").replace(stripPrefix, "");
				const href = `${parentPath}/${leaf}`;
				return (
					<Section key={pageConfig.id} variant={dark ? "dark" : "light"} className={cn("py-12 sm:py-16 lg:py-20", dark && "bg-transparent")}>
						<NewsSectionHead
							tone={tone}
							eyebrow={t("eyebrow")}
							title={title}
							action={<ArrowLink tone={tone} href={href}>{t("viewAll")}</ArrowLink>}
						/>
						<div className="grid gap-x-7 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
							{posts.map((post) => (
								<PostCard key={post.id} post={post} isVi={isVi} readMore={t("readMore")} tone={tone} />
							))}
						</div>
					</Section>
				); })}
		</>
	); }

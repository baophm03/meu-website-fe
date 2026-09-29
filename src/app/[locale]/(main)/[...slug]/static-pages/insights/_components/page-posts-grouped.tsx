import { getLocale, getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { fetchPageConfigByPath, fetchPostsByPageConfigId } from "@/utils/public-posts";
import type { PublicPost } from "@/utils/public-posts";
import type { PageConfig } from "@/api/models/pageConfig";
import NewsSectionHead from "../../_components/news-section-head";
import PostCard from "../../_components/post-card";
import { Reveal } from "@/components/shared/reveal";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

const GROUP_SIZE = 6;

/**
 * Hub listing for the `/insights` parent page — shows a few posts from every
 * child page_config (resolved by their `path`), each group linking to the
 * child page where the full list lives.
 */
export default async function PagePostsGrouped({ slug,
	childPaths,
	tone = "light" }: {
		slug: string[];
		childPaths: string[];
		tone?: "light" | "dark";
	}) {
		const dark = tone === "dark";
	const [locale, t] = await Promise.all([getLocale(), getTranslations("pages.insights.posts")]);
	const isVi = locale === "vi";
	const parent = slug[0] ?? "";
	const parentPath = `/${slug.join("/")}`;
	const stripPrefix = new RegExp(`^${parent}-`);

	const groups = (
		await Promise.all(
			childPaths.map(async (path) => {
				const pageConfig = await fetchPageConfigByPath([path]);
				if (!pageConfig?.id) return null;
				const posts = await fetchPostsByPageConfigId(pageConfig.id, GROUP_SIZE);
				if (posts.length === 0) return null;
				return { pageConfig, posts };
			}),
		)
	).filter((g): g is { pageConfig: PageConfig; posts: PublicPost[] } => g !== null);

	if (groups.length === 0) return null;

	return (
		<>
			{groups.map(({ pageConfig, posts }) => {
				const title = isVi ? pageConfig.name : pageConfig.name_en || pageConfig.name;
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
				);
			})}
		</>
	);
}

const shell = "container";

function Section({ id,
	variant = "white",
	className,
	children,
	labelledBy }: {
		id?: string;
		variant?: "white" | "surface" | "dark" | "light";
		className?: string;
		children: ReactNode;
		labelledBy?: string;
	}) { // All variants render transparent dark — the shared ambient backdrop
	// on the (main) layout carries the visual field across every page.
	return (
		<section id={id} aria-labelledby={labelledBy} data-variant={variant} className={cn("scroll-mt-20 py-16 sm:py-24 lg:py-[128px]", variant === "light" ? "text-foreground" : "text-white", className)}>
			<Reveal className={shell}>{children}</Reveal>
		</section>
	);
}

function ArrowLink({ href, children, tone = "light", className }: { href: string; children: ReactNode; tone?: "light" | "dark"; className?: string }) {
	return (
		<Link
			href={href}
			className={cn(
				"group inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.1em] transition focus-visible:outline-2 focus-visible:outline-offset-4",
				tone === "dark" ? "text-white hover:text-primary-light focus-visible:outline-primary-light" : "text-foreground hover:text-primary focus-visible:outline-primary",
				className,
			)}
		>
			{children}
			<ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
		</Link>
	);
}

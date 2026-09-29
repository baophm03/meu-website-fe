import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/shared/safe-image";
import { fetchPostsPageBySlugPath } from "@/utils/public-posts";
import { resolveCmsFileUrl } from "@/utils/file";
import NewsSectionHead from "./news-section-head";
import PostGridInfinite from "./post-grid-infinite";
import { Reveal } from "@/components/shared/reveal";
import type { ReactNode } from "react";

/** First page = hero + 12 grid cards; subsequent pages keep the same size. */
const PAGE_SIZE = 13;

/**
 * "All posts" listing for the current page — resolves the page_config from the
 * last pathname segment (with `parent-leaf` fallback for colliding slugs), then
 * lists every published post attached to it via the CMS. The newest post is
 * featured as a large hero card, the rest render in the grid below.
 */
export default async function PagePostsSection({ slug,
	tone = "light",
	eyebrowKey = "eyebrow",
	linkSuffix = "?type=posts" }: {
		slug: string[];
		tone?: "light" | "dark";
		eyebrowKey?: string;
		/** Appended to each post link — e.g. "?type=case-studies" for case-study detail pages. */
		linkSuffix?: string;
	}) {
	const dark = tone === "dark";
	const [{ pageConfig, posts, total }, locale, t] = await Promise.all([
		fetchPostsPageBySlugPath(slug, 1, PAGE_SIZE),
		getLocale(),
		getTranslations("pages.insights.posts"),
	]);
	if (posts.length === 0) return null;

	const isVi = locale === "vi";
	const title = isVi ? pageConfig?.name : pageConfig?.name_en || pageConfig?.name;
	const [latest, ...rest] = posts;
	const latestDate = latest.published_at || latest.created_at;
	const latestDateLabel = latestDate
		? new Date(latestDate).toLocaleDateString(isVi ? "vi-VN" : "en-US", {
			day: "2-digit",
			month: "long",
			year: "numeric"
		})
		: "";

	return (
		<Section variant={dark ? "dark" : "light"} className={cn("py-12 sm:py-16 lg:py-20", dark && "bg-transparent")}>
			<NewsSectionHead tone={tone} eyebrow={t(eyebrowKey)} title={title || t("heading")} />

			{/* Latest post — full-width hero card */}
			<article
				className={cn(
					"group mb-12 grid overflow-hidden transition duration-300 lg:grid-cols-2",
					dark
						? "rounded-2xl border border-border bg-muted backdrop-blur-sm hover:border-primary/40 hover:bg-muted"
						: "rounded-lg border border-border bg-card shadow-sm hover:shadow-md",
				)}
			>
				<Link href={`/${latest.slug}${linkSuffix}`} className="block focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-primary">
					<span aria-hidden="true" className={cn("relative block h-[260px] overflow-hidden sm:h-[320px] lg:h-full lg:min-h-[380px]", dark ? "bg-muted" : "bg-muted")}>
						{latest.thumbnail?.path ? (
							<SafeImage
								src={resolveCmsFileUrl(latest.thumbnail.path)}
								alt={latest.thumbnail.original ?? latest.title}
								fill
								className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
							/>
						) : (
							<i
								className={cn(
									"absolute -bottom-[160px] -right-[40px] size-[280px] rounded-full border transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none",
									dark
										? "border-border border-primary shadow-[0_0_55px_rgba(49,92,255,0.25)]"
										: "border-border border-primary/30 shadow-[0_0_55px_rgba(49,92,255,0.15)]",
								)}
							/>
						)}
					</span>
				</Link>
				<div className="flex flex-col justify-center p-7 sm:p-10">
					<span className={cn(label, dark ? "text-primary" : "text-primary")}>{t("latest")} · {latestDateLabel}</span>
					<h2 className={cn(displayHeading, "mt-4 text-[24px] leading-[1.25] sm:text-[30px]", dark && "text-foreground")}>
						<Link href={`/${latest.slug}${linkSuffix}`} className={cn("transition-colors", dark ? "hover:text-primary" : "hover:text-primary")}>
							{latest.title}
						</Link>
					</h2>
					<p className={cn("mt-4 text-[15px] leading-[1.7] line-clamp-4", dark ? "text-muted-foreground" : "text-muted-foreground")}>{latest.summary}</p>
					<span className={cn(label, "mt-8 inline-flex items-center gap-2 transition-colors", dark ? "text-muted-foreground group-hover:text-primary" : "text-muted-foreground group-hover:text-primary")}>
						{t("readMore")}
						<ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
					</span>
				</div>
			</article>

			{rest.length > 0 || total > posts.length ? (
				<PostGridInfinite
					pageConfigId={pageConfig!.id!}
					initialPosts={rest}
					total={Math.max(0, total - 1)}
					pageSize={PAGE_SIZE}
					isVi={isVi}
					readMore={t("readMore")}
					tone={tone}
					linkSuffix={linkSuffix}
				/>
			) : null}
		</Section>
	);
}

const shell = "container";

const displayHeading = "font-medium tracking-[-0.045em] text-balance";

const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

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

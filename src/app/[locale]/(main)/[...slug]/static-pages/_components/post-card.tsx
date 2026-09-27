import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/shared/safe-image";
import { label, displayHeading } from "@/app/[locale]/(main)/_components/section-primitives";
import { resolveCmsFileUrl } from "@/utils/file";
import type { PublicPost } from "@/utils/public-posts";

export default function PostCard({ post,
	isVi,
	readMore,
	tone = "light",
	linkSuffix = "" }: {
		post: PublicPost;
		isVi: boolean;
		readMore: string;
		tone?: "light" | "dark";
		linkSuffix?: string;
	}) {
	const dark = tone === "dark";
	const publishedAt = post.published_at || post.created_at;
	const dateLabel = publishedAt
		? new Date(publishedAt).toLocaleDateString(isVi ? "vi-VN" : "en-US", {
			day: "2-digit",
			month: "long",
			year: "numeric"
		})
		: "";

	return (
		<article
			className={cn(
				"group flex flex-col overflow-hidden transition duration-300",
				dark
					? "rounded-2xl border border-border bg-muted backdrop-blur-sm hover:border-primary/40 hover:bg-muted"
					: "rounded-lg border border-border bg-card shadow-sm hover:shadow-md",
			)}
		>
			<Link href={`/${post.slug}${linkSuffix}`} className="focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-primary">
				<span aria-hidden="true" className={cn("relative block h-[180px] overflow-hidden sm:h-[200px]", dark ? "bg-muted" : "bg-muted")}>
					{post.thumbnail?.path ? (
						<SafeImage
							src={resolveCmsFileUrl(post.thumbnail.path)}
							alt={post.thumbnail.original ?? post.title}
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
			<div className="flex flex-1 flex-col p-6">
				<span className={cn(label, dark ? "text-primary" : "text-primary")}>{dateLabel}</span>
				<h3 className={cn(displayHeading, "mt-3 text-[19px] leading-[1.3] sm:text-[20px]", dark && "text-foreground")}>
					<Link href={`/${post.slug}${linkSuffix}`} className={cn("transition-colors", dark ? "hover:text-primary" : "hover:text-primary")}>
						{post.title}
					</Link>
				</h3>
				<p className={cn("mt-3 flex-1 text-[14px] leading-[1.6] line-clamp-3", dark ? "text-muted-foreground" : "text-muted-foreground")}>{post.summary}</p>
				<span className={cn(label, "mt-6 inline-flex items-center gap-2 transition-colors", dark ? "text-muted-foreground group-hover:text-primary" : "text-muted-foreground group-hover:text-primary")}>
					{readMore}
					<ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
				</span>
			</div>
		</article>
	);
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getApiV10PostByPageConfigPageConfigId } from "@/api/endpoints/post";
import type { PublicPost } from "@/utils/public-posts";
import PostCard from "./post-card";

export default function PostGridInfinite({ pageConfigId,
	initialPosts,
	total,
	pageSize,
	isVi,
	readMore,
	tone = "light",
	linkSuffix = "" }: {
		pageConfigId: string;
		initialPosts: PublicPost[];
		total: number;
		pageSize: number;
		isVi: boolean;
		readMore: string;
		tone?: "light" | "dark";
		linkSuffix?: string;
	}) {
	const [posts, setPosts] = useState<PublicPost[]>(initialPosts);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const sentinelRef = useRef<HTMLDivElement | null>(null);
	const hasMore = posts.length < total;

	const loadMore = useCallback(async () => {
		if (loading || !hasMore) return;
		setLoading(true);
		try {
			const nextPage = page + 1;
			const res = await getApiV10PostByPageConfigPageConfigId(pageConfigId, {
				page: nextPage,
				pageSize,
				sortField: "published_at",
				sortOrder: "desc",
				filters: "is_active==true,is_hidden==false"
			});
			const rows = ((res?.responseData as { rows?: PublicPost[] } | undefined)?.rows ?? []) as PublicPost[];
			setPosts((prev) => {
				const seen = new Set(prev.map((p) => p.id));
				return [...prev, ...rows.filter((p) => p.id && !seen.has(p.id))];
			});
			setPage(nextPage);
		} catch {
			// keep existing posts; next intersection retries
		} finally { setLoading(false); }
	}, [loading, hasMore, page, pageSize, pageConfigId]);

	useEffect(() => {
		const node = sentinelRef.current;
		if (!node || !hasMore) return;
		const observer = new IntersectionObserver(
			(entries) => { if (entries[0]?.isIntersecting) void loadMore(); },
			{ rootMargin: "600px 0px" },
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, [loadMore, hasMore]);

	return (
		<>
			<div className="grid gap-x-7 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
				{posts.map((post) => (
					<PostCard key={post.id} post={post} isVi={isVi} readMore={readMore} tone={tone} linkSuffix={linkSuffix} />
				))}
			</div>
			{hasMore ? (
				<div ref={sentinelRef} aria-hidden="true" className="mt-10 flex justify-center">
					{loading ? (
						<span className="inline-block size-7 animate-spin rounded-full border-2 border-border border-t-primary" />
					) : null}
				</div>
			) : null}
		</>
	);
}

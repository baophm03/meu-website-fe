import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function NewsSectionHead({ eyebrow,
	title,
	action,
	tone = "light" }: {
		eyebrow?: string;
		title: ReactNode;
		action?: ReactNode;
		tone?: "light" | "dark";
	}) {
	const dark = tone === "dark";
	return (
		<header className={cn("mb-8 sm:mb-10", dark && "border-b border-border pb-6")}>
			{eyebrow ? (
				<p className={cn("text-[11px] font-bold uppercase tracking-[0.16em]", dark ? "text-primary" : "text-primary")}>{eyebrow}</p>
			) : null}
			<div className="mt-2 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
				<h2 className={cn(displayHeading, "font-barlow text-[26px] font-bold leading-[1.15] sm:text-[32px] [&_span]:font-bold", dark && "text-foreground")}>{title}</h2>
				{action ? <div className="shrink-0 pb-1">{action}</div> : null}
			</div>
		</header>
	);
}

const displayHeading = "font-medium tracking-[-0.045em] text-balance";

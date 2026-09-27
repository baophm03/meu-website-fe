import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { displayHeading } from "@/app/[locale]/(main)/_components/section-primitives";

/**
 * Compact news-style section header — small eyebrow + heading on the left,
 * optional action link on the right, separated from content by a rule.
 */
export default function NewsSectionHead({ eyebrow,
	title,
	action,
	tone = "light" }: { eyebrow?: string;
	title: ReactNode;
	action?: ReactNode;
	tone?: "light" | "dark"; }) { const dark = tone === "dark";
	return (
		<header className={cn("mb-8 sm:mb-10", dark && "border-b border-border pb-6")}>
			{eyebrow ? (
				<p className={cn("text-[11px] font-bold uppercase tracking-[0.16em]", dark ? "text-primary" : "text-primary")}>{eyebrow}</p>
			) : null}
			<div className="mt-2 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
				<h2 className={cn(displayHeading, "text-[26px] leading-[1.15] sm:text-[32px]", dark && "text-foreground")}>{title}</h2>
				{action ? <div className="shrink-0 pb-1">{action}</div> : null}
			</div>
		</header>
	); }

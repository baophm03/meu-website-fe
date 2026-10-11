import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import EstimatorForm from "./estimator-form";

/** Project-estimator CTA: pitch + guarantees left, lead form right (replaces the old final CTA band). */
export function CtaEstimator() {
	const t = useTranslations("home.estimator");

	return (
		<section aria-labelledby="estimator-title" className="border-y border-white/10 bg-surface-dark py-20 text-white lg:py-[112px]">
			<ScrollReveal className="container" y={44}>
				<div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] text-white shadow-[0_32px_80px_-40px_rgba(2,8,23,0.65)] backdrop-blur-xl">
					<div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14 lg:p-12">
						<div>
							<span className={cn(label, "inline-flex items-center gap-2 text-primary-light")}>
								<LayoutGridIcon />
								{t("eyebrow")}
							</span>
							<h2 id="estimator-title" className={cn(displayHeading, "mt-5 text-[30px] leading-[1.05] sm:text-[38px] lg:text-[44px]")}>
								{t("heading1")} {t("heading2")}
							</h2>
							<p className="mt-5 max-w-[420px] text-[14px] leading-[1.7] text-white/60 sm:text-[15px]">
								{t("description")}
							</p>
							<ul className="mt-8 grid gap-4">
								{(["promise1", "promise2", "promise3"] as const).map((key) => (
									<li key={key} className="flex items-start gap-3 text-[13.5px] leading-[1.6] text-white/80">
										<CircleCheck aria-hidden="true" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-primary" strokeWidth={1.8} />
										{t(key)}
									</li>
								))}
							</ul>
						</div>
						<div className="rounded-xl border border-white/10 bg-slate-950/45 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.2)] sm:p-8">
							<EstimatorForm />
						</div>
					</div>
				</div>
			</ScrollReveal>
		</section>
	);
}

const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

const displayHeading = "font-barlow font-bold tracking-[-0.035em] text-balance";

function LayoutGridIcon() {
	return (
		<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
			<rect width="18" height="18" x="3" y="3" rx="2" />
			<path d="M3 9h18" />
			<path d="M3 15h18" />
			<path d="M9 3v18" />
		</svg>
	);
}

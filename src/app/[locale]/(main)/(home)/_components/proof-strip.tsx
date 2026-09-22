import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { MetricCounter } from "@/components/shared/metric-counter";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const shell = "container";
const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

// Wordmark placeholders — replace with approved client/partner logos.
const PARTNERS = ["AWS", "Microsoft Azure", "Google Cloud", "Kubernetes", "Salesforce", "SAP", "Odoo", "Stripe"];

export function ProofStrip() {
  const t = useTranslations("home.proof");
  const metrics = [
    { value: 50, suffix: "+", label: t("m1Label") },
    { value: 95, suffix: "%", label: t("m2Label") },
    { value: 6, suffix: "+", label: t("m3Label") },
  ];

  return (
    <section aria-label={t("eyebrow")} className="border-y border-white/10 bg-surface-dark-soft text-white">
      <div className={cn(shell, "py-14 lg:py-[72px]")}>
        <ScrollReveal itemSelector="[data-metric]" y={28} stagger={0.12}>
          <div className="grid gap-10 sm:grid-cols-3 lg:gap-0">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                data-metric
                className={cn(
                  "flex flex-col gap-3 sm:px-8 sm:first:pl-0 sm:last:pr-0",
                  index > 0 ? "sm:border-l sm:border-white/12" : "",
                )}
              >
                <MetricCounter
                  value={metric.value}
                  suffix={metric.suffix}
                  className="text-[44px] font-medium leading-none tracking-[-0.03em] text-[#00f0ff] sm:text-[54px] lg:text-[62px]"
                />
                <span className={cn(label, "text-white/50")}>{metric.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Infinite logo marquee */}
      <div className="border-t border-white/10">
        <div className={cn(shell, "flex items-center gap-8 py-6")}>
          <span className={cn(label, "shrink-0 text-white/35")}>{t("partnersLabel")}</span>
          <div className="group relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <ul className="flex w-max animate-[marquee_36s_linear_infinite] items-center gap-14 pr-14 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
              {[...PARTNERS, ...PARTNERS].map((name, i) => (
                <li
                  key={`${name}-${i}`}
                  aria-hidden={i >= PARTNERS.length}
                  className="whitespace-nowrap text-[15px] font-semibold uppercase tracking-[0.18em] text-white/60 transition-colors duration-200 hover:text-white"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

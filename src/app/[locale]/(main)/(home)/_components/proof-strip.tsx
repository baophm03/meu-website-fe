import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { MetricCounter } from "@/components/shared/metric-counter";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const shell = "container";
const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

export function ProofStrip() {
  const t = useTranslations("home.proof");
  const metrics = [
    { value: 50, suffix: "+", label: t("m1Label") },
    { value: 95, suffix: "%", label: t("m2Label") },
    { value: 10, suffix: "+", label: t("m3Label") },
    { value: 20, suffix: "+", label: t("m4Label") },
    { value: 100, suffix: "+", label: t("m5Label") },
  ];

  return (
    <section aria-label={t("eyebrow")} className="border-y border-white/10 bg-surface-dark-soft text-white">
      <div className={cn(shell, "py-14 lg:py-[72px]")}>
        <ScrollReveal itemSelector="[data-metric]" y={28} stagger={0.12}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                data-metric
                className={cn(
                  "flex flex-col gap-3 lg:px-8 lg:first:pl-0 lg:last:pr-0",
                  index > 0 ? "lg:border-l lg:border-white/12" : "",
                )}
              >
                <MetricCounter
                  value={metric.value}
                  suffix={metric.suffix}
                  className="text-[44px] font-medium leading-none tracking-[-0.03em] text-[#00f0ff] sm:text-[54px] lg:text-[56px]"
                />
                <span className={cn(label, "text-white/50")}>{metric.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

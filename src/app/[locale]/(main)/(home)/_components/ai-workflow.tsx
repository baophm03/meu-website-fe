import type { ReactNode } from "react";
import { ArrowDown,
  ArrowRight,
  Bot,
  Database,
  FolderInput,
  BrainCircuit,
  UserCheck,
  Workflow,
  Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { useTranslations } from "next-intl";

const shell = "container";
const displayHeading = "font-medium tracking-[-0.045em] text-balance";
const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

function Section({ id,
  className,
  children,
  labelledBy }: { id?: string;
  className?: string;
  children: ReactNode;
  labelledBy?: string; }) { return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative scroll-mt-20 overflow-hidden py-16 text-white sm:py-20 lg:py-24", className)}>
      <Reveal className={shell}>{children}</Reveal>
    </section>
  ); }

function SectionHead({ title, summary }: { title: ReactNode; summary?: string }) { return (
    <div className="mb-12 flex flex-col gap-6 sm:mb-14 lg:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
      <h2 className={cn(displayHeading, "max-w-[680px] text-[30px] leading-[1.08] text-white sm:text-[38px] lg:text-[44px]")}>{title}</h2>
      {summary ? <p className="max-w-md shrink-0 text-[14px] leading-[1.7] text-white/55 sm:text-[15px]">{summary}</p> : null}
    </div>
  ); }

const STEP_ICONS = [FolderInput, BrainCircuit, UserCheck, Zap] as const;
const LAYER_ICONS = [Database, Bot, Workflow] as const;

// Per-step hover accents (core AI step keeps its own cyan styling)
const STEP_HOVERS = [
  { // Đầu vào — violet
    card: "hover:-translate-y-1 hover:border-violet-400/50 hover:bg-violet-400/[0.07] hover:shadow-[0_0_50px_-16px_rgba(167,139,250,0.45)]",
    icon: "group-hover:border-violet-400/40 group-hover:bg-violet-400/15 group-hover:text-violet-300" },
  null,
  { // Kiểm soát con người — amber
    card: "hover:-translate-y-1 hover:border-amber-400/50 hover:bg-amber-400/[0.07] hover:shadow-[0_0_50px_-16px_rgba(251,191,36,0.4)]",
    icon: "group-hover:border-amber-400/40 group-hover:bg-amber-400/15 group-hover:text-amber-300" },
  { // Kết quả — emerald
    card: "hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-emerald-400/[0.07] hover:shadow-[0_0_50px_-16px_rgba(52,211,153,0.4)]",
    icon: "group-hover:border-emerald-400/40 group-hover:bg-emerald-400/15 group-hover:text-emerald-300" },
] as const;

export function AiWorkflow() { const t = useTranslations("home.aiWorkflow");
  const workflow = [
    [t("step1Top"), t("step1Mid"), t("step1Bottom")],
    [t("step2Top"), t("step2Mid"), t("step2Bottom")],
    [t("step3Top"), t("step3Mid"), t("step3Bottom")],
    [t("step4Top"), t("step4Mid"), t("step4Bottom")],
  ];
  const layers = [
    [t("layer1Title"), t("layer1Desc")],
    [t("layer2Title"), t("layer2Desc")],
    [t("layer3Title"), t("layer3Desc")],
  ];

  return (
    <Section id="ai" className="relative overflow-hidden">
      {/* ambient glow behind the pipeline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00f0ff]/[0.07] blur-[120px]"
      />

      <SectionHead title={t("heading")} summary={t("summary")} />

      {/* Pipeline diagram: input → AI processing → human control → outcome */}
      <ScrollReveal itemSelector="[data-step]" y={32} stagger={0.14}>
        <div className="relative grid gap-0 lg:grid-cols-[1fr_44px_1fr_44px_1fr_44px_1fr] lg:items-stretch">
          {workflow.map(([step, title, detail], index) => { const StepIcon = STEP_ICONS[index];
            const isCore = index === 1;
            const hover = STEP_HOVERS[index];
            return (
              <div key={step} className="contents">
                <div className="flex min-w-0 flex-col gap-4">
                  <span className={cn(label, "flex items-center justify-center gap-3 font-mono tracking-[0.2em]", isCore ? "text-[#00f0ff]" : "text-white/40")}>
                    <span className="h-px w-5 bg-current opacity-60" />
                    {step}
                    <span className="h-px w-5 bg-current opacity-60" />
                  </span>
                  <div
                    data-step
                    className={cn(
                      "group relative flex flex-1 flex-col gap-5 rounded-2xl border border-white/10 p-6 backdrop-blur-sm transition duration-300",
                      isCore
                        ? "border-[#00f0ff]/40 bg-[#00f0ff]/[0.06] shadow-[0_0_60px_-18px_rgba(0,240,255,0.45)]"
                        : cn("border-white/10 bg-white/[0.04]", hover?.card),
                    )}
                  >
                    <span
                      className={cn(
                        "relative grid size-12 shrink-0 place-items-center rounded-xl",
                        isCore
                          ? "bg-gradient-to-br from-primary to-[#00f0ff] text-white"
                          : cn("border border-white/10 bg-white/[0.06] text-[#00f0ff] transition duration-300", hover?.icon),
                      )}
                    >
                      {isCore ? (
                        <span
                          aria-hidden="true"
                          className="absolute -inset-1 rounded-xl bg-[#00f0ff]/25 animate-[ai-pulse-ring_2.4s_ease-out_infinite] motion-reduce:hidden"
                        />
                      ) : null}
                      <StepIcon aria-hidden="true" className="relative h-5 w-5" />
                    </span>
                    <strong className={cn(displayHeading, "text-[17px] leading-[1.25] text-white sm:text-[19px]")}>{title}</strong>
                    <div className="mt-auto flex flex-wrap gap-1.5">
                      {detail.split("·").map((item) => (
                        <span
                          key={item}
                          className="rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium text-white/60"
                        >
                          {item.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {index < workflow.length - 1 ? (
                  <div aria-hidden="true" className="relative flex items-center justify-center py-3 lg:py-0 lg:pt-9">
                    {/* Mobile: vertical flow line */}
                    <span className="relative mx-auto block h-10 w-px bg-white/15 lg:hidden">
                      <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#00f0ff] shadow-[0_0_10px_2px_rgba(0,240,255,0.7)] animate-[ai-flow-y_1.9s_ease-in-out_infinite] motion-reduce:hidden" />
                      <ArrowDown className="absolute -bottom-1 left-1/2 h-3.5 w-3.5 -translate-x-1/2 translate-y-1/2 text-[#00f0ff]" />
                    </span>
                    {/* Desktop: horizontal flow line */}
                    <span className="relative hidden h-px w-full bg-white/15 lg:block">
                      <span className="absolute -top-[3px] left-0 h-1.5 w-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_10px_2px_rgba(0,240,255,0.7)] animate-[ai-flow-x_1.9s_ease-in-out_infinite] motion-reduce:hidden" />
                      <ArrowRight className="absolute -right-1 top-1/2 h-3.5 w-3.5 -translate-y-1/2 translate-x-1/2 text-[#00f0ff]" />
                    </span>
                  </div>
                ) : null}
              </div>
            ); })}
        </div>
      </ScrollReveal>

      {/* Application layers */}
      <ScrollReveal y={28} className="mt-14 lg:mt-16">
        <h3 className={cn(displayHeading, "text-[20px] leading-[1.2] text-white sm:text-[24px]")}>{t("layersTitle")}</h3>
      </ScrollReveal>
      <ScrollReveal itemSelector="[data-layer]" y={28} stagger={0.12}>
        <div className="mt-7 grid gap-5 sm:grid-cols-3">
          {layers.map(([layerTitle, layerDesc], index) => { const LayerIcon = LAYER_ICONS[index];
            return (
              <div
                key={layerTitle}
                data-layer
                className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition duration-300 hover:border-[#00f0ff]/35 hover:bg-[#00f0ff]/[0.05] sm:p-7"
              >
                <span className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-[#00f0ff] transition duration-300 group-hover:border-[#00f0ff]/40 group-hover:bg-[#00f0ff]/15">
                  <LayerIcon aria-hidden="true" className="h-5 w-5" />
                </span>
                <strong className="text-[16px] font-medium leading-[1.3] text-white sm:text-[17px]">{layerTitle}</strong>
                <p className="text-[13px] leading-[1.65] text-white/55 sm:text-[14px]">{layerDesc}</p>
              </div>
            ); })}
        </div>
      </ScrollReveal>
    </Section>
  ); }

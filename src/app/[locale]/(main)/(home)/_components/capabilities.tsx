import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ArrowRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { useTranslations } from "next-intl";

const shell = "container";
const displayHeading = "font-medium tracking-[-0.045em] text-balance";
const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

function ArrowLink({ href, children, tone = "light", className }: { href: string; children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-4 border-b pb-2 text-[11px] font-bold uppercase tracking-[0.1em] transition focus-visible:outline-2 focus-visible:outline-offset-4",
        tone === "dark" ? "border-white/35 text-white hover:border-primary-light focus-visible:outline-primary-light" : "border-border text-foreground hover:border-primary hover:text-primary focus-visible:outline-primary",
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </Link>
  );
}

export function Capabilities() {
  const t = useTranslations("home.capabilities");
  const capabilities = [
    ["01", t("cap1Title"), t("cap1Desc")],
    ["02", t("cap2Title"), t("cap2Desc")],
    ["03", t("cap3Title"), t("cap3Desc")],
    ["04", t("cap4Title"), t("cap4Desc")],
    ["05", t("cap5Title"), t("cap5Desc")],
  ] as const;

  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="scroll-mt-20 bg-surface-dark py-16 text-white sm:py-20 lg:py-[80px]">
      <div className={shell}>
        <div className="mb-10 grid gap-6 sm:mb-14 lg:grid-cols-[minmax(0,1fr)_2.15fr] lg:gap-12">
          <div className={cn("flex items-start gap-5 lg:pt-3", label)}>
            <span className="text-primary-light">05</span>
            <span className="text-white/50">{t("eyebrow")}</span>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
            <h2 id="capabilities-title" className={cn(displayHeading, "text-[34px] leading-[1.04] text-white sm:text-[46px] lg:text-[56px]")}>{t("heading")}</h2>
            <div className="flex flex-col items-start gap-6 lg:pt-2">
              <p className="max-w-md text-[15px] leading-[1.7] text-white/60">{t("summary")}</p>
              <ArrowLink href="/solutions/technology-capabilities" tone="dark">
                {t("exploreCapabilities")}
              </ArrowLink>
            </div>
          </div>
        </div>

        {/* Flat accordion — dividers + large typography, no cards */}
        <ScrollReveal itemSelector="[data-capability]" y={28} stagger={0.08}>
          <AccordionPrimitive.Root type="single" collapsible className="border-t border-white/15">
            {capabilities.map(([phase, name, copy]) => (
              <AccordionPrimitive.Item key={phase} value={phase} data-capability className="border-b border-white/15">
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger className="group grid flex-1 grid-cols-[56px_1fr_44px] items-center gap-4 py-7 text-left sm:grid-cols-[96px_1fr_56px] sm:py-8">
                    <span className={cn(label, "text-[#00f0ff]/80")}>{phase}</span>
                    <span className={cn(displayHeading, "text-[24px] leading-[1.1] text-white transition-colors group-hover:text-[#00f0ff] sm:text-[30px] lg:text-[36px]")}>
                      {name}
                    </span>
                    <span className="grid size-10 place-items-center justify-self-end border border-white/20 text-white/60 transition group-hover:border-[#00f0ff]/60 group-hover:text-[#00f0ff] sm:size-11">
                      <Plus aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-45 motion-reduce:transform-none" />
                    </span>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="max-w-[560px] pb-8 pl-[56px] text-[15px] leading-[1.7] text-white/60 sm:pl-[96px]">{copy}</p>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </ScrollReveal>
      </div>
    </section>
  );
}

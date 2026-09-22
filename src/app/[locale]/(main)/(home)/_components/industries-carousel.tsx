"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, GraduationCap, HeartPulse, MoveHorizontal, Pill, ShoppingBag, Truck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";
const displayHeading = "font-medium tracking-[-0.045em] text-balance";

const ICONS: Record<string, LucideIcon> = {
  healthcare: HeartPulse,
  logistics: Truck,
  retail: ShoppingBag,
  pharma: Pill,
  education: GraduationCap,
  associations: Users,
};

export type IndustryItem = {
  title: string;
  href: string;
  desc: string;
  icon: keyof typeof ICONS;
};

/**
 * Tier-2 secondary cards in a horizontal drag/scroll strip (embla dragFree).
 * Flat solid surface, 1px stroke, monochrome icon.
 */
export function IndustriesCarousel({ items, hint }: { items: IndustryItem[]; hint: string }) {
  const [emblaRef] = useEmblaCarousel({ dragFree: true, align: "start", containScroll: "trimSnaps" });

  return (
    <div>
      <div className="mb-5 flex items-center gap-2 text-white/35">
        <MoveHorizontal aria-hidden="true" className="h-4 w-4" />
        <span className={cn(label, "normal-case tracking-[0.12em]")}>{hint}</span>
      </div>
      <div ref={emblaRef} className="-mx-5 cursor-grab overflow-hidden px-5 select-none active:cursor-grabbing md:-mx-15 md:px-15 lg:-mx-25 lg:px-25">
        <div className="flex gap-4">
          {items.map((item, index) => {
            const Icon = ICONS[item.icon];
            return (
              <Link
                key={item.title}
                href={item.href}
                draggable={false}
                className="group relative flex min-h-[300px] w-[78%] shrink-0 flex-col border border-white/12 bg-[#0f172a] p-7 transition-colors duration-300 hover:border-[#00f0ff]/50 hover:bg-[#1e293b] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-light sm:w-[46%] sm:min-h-[320px] lg:w-[31%] lg:p-9"
              >
                <div className="flex items-start justify-between">
                  <Icon aria-hidden="true" className="h-6 w-6 text-white/45 transition-colors group-hover:text-[#00f0ff]" strokeWidth={1.5} />
                  <span className={cn(label, "text-white/30")}>{`0${index + 1}`}</span>
                </div>
                <h3 className={cn(displayHeading, "mt-auto pt-16 text-[24px] leading-[1.1] text-white sm:text-[27px]")}>{item.title}</h3>
                <p className="mt-3 max-w-[240px] text-[13px] leading-[1.55] text-white/50">{item.desc}</p>
                <ArrowUpRight
                  aria-hidden="true"
                  className="absolute right-7 top-7 h-5 w-5 text-white/25 transition-colors group-hover:text-[#00f0ff] lg:right-9"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

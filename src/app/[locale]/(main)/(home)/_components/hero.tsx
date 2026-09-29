"use client";

import { Link } from "@/i18n/navigation";
import { SafeImage } from "@/components/shared/safe-image";
import { useRef, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

import type { HeroBannerSlide } from "./hero-banners";

import "swiper/css";
import "swiper/css/effect-fade";

const displayHeading = "font-medium tracking-[-0.045em] text-balance";
const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

/** Items fade/slide in each time their slide becomes active. */
const revealItem =
  "translate-y-8 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [.swiper-slide-active_&]:translate-y-0 [.swiper-slide-active_&]:opacity-100 motion-reduce:transform-none motion-reduce:transition-none";

const buttonBase =
  "group inline-flex min-h-[52px] items-center justify-between gap-8 px-6 text-[12px] font-bold uppercase tracking-[0.08em] transition duration-200 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-primary-light motion-reduce:transition-none";

function PrimaryButton({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        buttonBase,
        "border border-white/10 border-primary bg-primary text-white shadow-[0_0_36px_rgba(51,92,255,0.35)] hover:border-primary-hover hover:bg-primary-hover hover:shadow-[0_0_48px_rgba(51,92,255,0.5)]",
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </Link>
  );
}

function SecondaryButton({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(buttonBase, "border border-white/10 border-white/35 text-white backdrop-blur-sm hover:border-white hover:bg-white/5", className)}
    >
      {children}
      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </Link>
  );
}

interface HeroProps {
  slides: HeroBannerSlide[];
}

export function Hero({ slides }: HeroProps) {
  const t = useTranslations("home.hero");

  const [activeIndex, setActiveIndex] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const [reduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  return (
    <section aria-label="Hero" className="relative -mt-[68px] h-svh min-h-[640px] overflow-hidden bg-surface-dark text-white">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={900}
        loop
        autoplay={reduceMotion ? false : { delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ el: ".hero-pagination", clickable: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onAutoplayTimeLeft={(_, _time, progress) => { progressRef.current?.style.setProperty("transform", `scaleX(${1 - progress})`); }}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative overflow-hidden">
            {slide.image ? (
              <SafeImage
                src={slide.image}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            ) : null}
            {/* Readability overlays: darken left side (only when slide has text) + top/bottom edges */}
            {slide.title || slide.description ? (
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(100deg,rgba(5,6,8,0.94)_0%,rgba(5,6,8,0.72)_42%,rgba(5,6,8,0.25)_75%,rgba(5,6,8,0.1)_100%)]"
              />
            ) : null}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,6,8,0.9)_0%,transparent_30%),linear-gradient(to_bottom,rgba(5,6,8,0.55)_0%,transparent_25%)]"
            />

            {/* Left content over image */}
            <div className="container relative flex h-full items-center pb-24 pt-[68px]">
              <div className="max-w-[660px]">
                {slide.title ? (
                  <h1
                    className={cn(
                      displayHeading,
                      revealItem,
                      "mt-6 text-[42px] font-semibold uppercase leading-[1.02] sm:text-[56px] lg:text-[64px] xl:text-[72px]",
                    )}
                    style={{ transitionDelay: "220ms" }}
                  >
                    {slide.title}
                  </h1>
                ) : (
                  <h1 className="sr-only">MeU</h1>
                )}
                {slide.description ? (
                  <p
                    className={cn(revealItem, "mt-6 max-w-[540px] text-[16px] leading-[1.65] text-white/75 sm:text-[18px]")}
                    style={{ transitionDelay: "340ms" }}
                  >
                    {slide.description}
                  </p>
                ) : null}
                {slide.title || slide.description ? (
                  <div className={cn(revealItem, "mt-9 flex flex-col gap-3 sm:flex-row")} style={{ transitionDelay: "460ms" }}>
                    <PrimaryButton href="/contact">{t("primaryCta")}</PrimaryButton>
                    <SecondaryButton href="/solutions">{t("secondaryCta")}</SecondaryButton>
                  </div>
                ) : null}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom bar: pagination + slide counter */}
      <div className="container pointer-events-none absolute inset-x-0 bottom-10 z-10 flex items-center justify-between gap-6">
        <div
          className={cn(
            "hero-pagination pointer-events-auto static! flex w-auto! transform-none! items-center gap-3",
            "[&_.swiper-pagination-bullet]:m-0! [&_.swiper-pagination-bullet]:block [&_.swiper-pagination-bullet]:h-[3px] [&_.swiper-pagination-bullet]:w-10 [&_.swiper-pagination-bullet]:cursor-pointer [&_.swiper-pagination-bullet]:rounded-none [&_.swiper-pagination-bullet]:bg-white/30 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet]:transition-[width,background-color] [&_.swiper-pagination-bullet]:duration-300",
            "[&_.swiper-pagination-bullet-active]:w-16 [&_.swiper-pagination-bullet-active]:bg-primary-light",
          )}
        />
        <span className={cn(label, "shrink-0 tabular-nums text-white/50")}>
          {String(activeIndex + 1).padStart(2, "0")}
          <span className="mx-2 text-white/25">/</span>
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Autoplay progress line */}
      {!reduceMotion && (
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-10 h-[2px] bg-white/10">
          <div ref={progressRef} className="h-full w-full origin-left scale-x-0 bg-[linear-gradient(90deg,#4d6bfe,#00f0ff)]" />
        </div>
      )}
    </section>
  );
}

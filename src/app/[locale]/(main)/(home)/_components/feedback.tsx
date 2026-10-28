"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard, Autoplay } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";

const FEEDBACK_ITEMS = ["feedback1", "feedback2", "feedback3", "feedback4", "feedback5"] as const;
const AVATAR_STYLES = [
  "from-cyan-300 via-sky-500 to-blue-700",
  "from-amber-200 via-orange-400 to-rose-600",
  "from-violet-300 via-fuchsia-500 to-indigo-700",
] as const;
const shell = "container";
const displayHeading = "font-barlow font-bold tracking-[-0.035em] text-balance";
const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

function FeedbackAvatar({ index, name }: { index: number; name: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(-2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div
      aria-label={name}
      role="img"
      className={cn(
        "grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full border border-white/20 bg-gradient-to-br text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] ring-2 ring-white/10",
        AVATAR_STYLES[index % AVATAR_STYLES.length],
      )}
    >
      <span className="drop-shadow-sm">{initials}</span>
    </div>
  );
}

export function Feedback() {
  const t = useTranslations("home.feedback");
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: SwiperInstance) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <section aria-labelledby="home-feedback-title" className="scroll-mt-20 w-full max-w-full overflow-hidden py-16 text-white sm:py-24 lg:py-[128px]">
      <style>{`
        .feedback-swiper .swiper-slide {
          transition: transform 0.5s ease-out, opacity 0.5s ease-out;
        }
        .feedback-swiper .swiper-slide:not(.swiper-slide-active) {
          transform: scale(0.85);
          opacity: 0.6;
        }
        .feedback-swiper .swiper-slide-active {
          transform: scale(1);
          opacity: 1;
        }
      `}</style>
      <Reveal className={cn(shell, "min-w-0 overflow-hidden")}>
        <div className="mb-12 flex flex-col gap-8 sm:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div>
            <span className={cn(label, "text-primary-light")}>{t("eyebrow")}</span>
            <h2 id="home-feedback-title" className={cn(displayHeading, "mt-4 max-w-[720px] text-[34px] leading-[1.04] sm:text-[46px] lg:text-[62px]")}>
              {t("heading")}
            </h2>
          </div>
          <div className="flex max-w-md items-end justify-between gap-6">
            <p className="text-[14px] leading-[1.7] text-white/60 sm:text-[15px]">{t("summary")}</p>
            <div className="hidden shrink-0 gap-2 sm:flex">
              <button
                type="button"
                aria-label={t("previous")}
                onClick={() => swiperRef.current?.slidePrev()}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/75 transition hover:border-primary-light/60 hover:bg-white/[0.06] hover:text-white focus-visible:outline-2 focus-visible:outline-primary-light"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label={t("next")}
                onClick={() => swiperRef.current?.slideNext()}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/75 transition hover:border-primary-light/60 hover:bg-white/[0.06] hover:text-white focus-visible:outline-2 focus-visible:outline-primary-light"
              >
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="w-full">
        <Swiper
          modules={[A11y, Keyboard, Autoplay]}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          onSlideChange={handleSlideChange}
          loop
          centeredSlides
          slidesPerView={1.15}
          spaceBetween={10}
          keyboard={{ enabled: true, onlyInViewport: true }}
          a11y={{ enabled: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2.4, spaceBetween: 14 },
            1024: { slidesPerView: 3, spaceBetween: 12 },
          }}
          className="feedback-swiper w-full max-w-full !overflow-hidden"
        >
          {[...FEEDBACK_ITEMS, ...FEEDBACK_ITEMS].map((item, index) => (
            <SwiperSlide
              key={`${item}-${index}`}
              className="!h-auto min-w-0 transition-transform duration-500 ease-out py-4"
              onClick={() => { swiperRef.current?.slideToLoop(index % FEEDBACK_ITEMS.length); }}
            >
              <article className="swiper-slide-card group relative flex h-full min-h-[340px] min-w-0 flex-col rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm transition duration-300 hover:border-primary-light/35 hover:bg-white/[0.055] sm:min-h-[370px] sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)]" style={{ boxShadow: (index % FEEDBACK_ITEMS.length) === activeIndex ? '0 0 40px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.4)' : '0 20px 60px rgba(0,0,0,0.3)' }}>
                <div className="flex items-center justify-between">
                  <Quote aria-hidden="true" className="h-6 w-6 text-primary-light/80" />
                  <div className="flex gap-1 text-primary-light" aria-label={t("ratingLabel")}>
                    {Array.from({ length: 5 }, (_, star) => <Star key={star} aria-hidden="true" className="h-3.5 w-3.5 fill-current" />)}
                  </div>
                </div>
                <p className="mt-6 flex-1 text-[15px] leading-[1.8] text-white/80">“{t(`${item}Quote`)}”</p>
                <div className="mt-8 flex min-w-0 items-center gap-4 border-t border-white/10 pt-5">
                  <FeedbackAvatar index={index} name={t(`${item}Name`)} />
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-white">{t(`${item}Name`)}</p>
                    <p className="mt-1 text-[12px] leading-[1.6] text-white/50">{t(`${item}Role`)}</p>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="container mt-5 flex justify-end sm:hidden">
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              aria-label={t("previous")}
              onClick={() => swiperRef.current?.slidePrev()}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/75 transition hover:border-primary-light/60 hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-primary-light"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label={t("next")}
              onClick={() => swiperRef.current?.slideNext()}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/75 transition hover:border-primary-light/60 hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-primary-light"
            >
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

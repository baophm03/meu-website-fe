import { Link } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/shared/safe-image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { CtaSection, Section, SectionHead, label, displayHeading } from "../../_components/section-primitives";
import { useTranslations } from "next-intl";
import type { MockPost } from "@/mockdata/posts";

/**
 * News-post detail template — an article rendered as a page of hardcoded
 * sections: hero → body sections → related news → CTA.
 */
export default function PostDetailPage({ post,
  related,
  locale }: { post: MockPost;
  related: MockPost[];
  locale: string; }) { const t = useTranslations("pages.postDetail");
  const isVi = locale === "vi";
  const title = isVi ? post.title : post.titleEn;
  const headerConfig = isVi ? post.headerConfig : post.headerConfigEn;
  const excerpt = isVi ? post.excerpt : post.excerptEn;

  return (
    <>
      {/* Article hero */}
      <section aria-labelledby="post-title" className="relative overflow-hidden text-foreground">
        <div className="container pb-12 pt-32 sm:pb-14 sm:pt-40">
          <Link
            href="/news"
            className="group inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            {t("backToNews")}
          </Link>
          <span className={cn(label, "mt-10 inline-flex items-center gap-3 text-primary")}>
            <i aria-hidden="true" className="h-px w-8 bg-primary/70" />
            {headerConfig}
          </span>
          <h1
            id="post-title"
            className={cn(displayHeading, "mt-6 max-w-[960px] text-[34px] leading-[1.05] text-foreground sm:text-[46px] lg:text-[56px]")}
          >
            {title}
          </h1>
          <p className="mt-6 max-w-[680px] text-[16px] leading-[1.65] text-muted-foreground sm:text-[18px]">
            {excerpt}
          </p>
          <div className={cn(label, "mt-8 flex flex-wrap items-center gap-6 normal-case tracking-[0.04em] text-muted-foreground")}>
            <span className="inline-flex items-center gap-2">
              <CalendarDays aria-hidden="true" className="h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString(isVi ? "vi-VN" : "en-US", { day: "2-digit",
                month: "long",
                year: "numeric" })}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock3 aria-hidden="true" className="h-4 w-4" />
              {t("readingTime", { minutes: post.readingMinutes })}
            </span>
          </div>
        </div>
        <div className="container">
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-border">
            <SafeImage src={post.image} alt={title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Body sections — the "sections" part of the page */}
      <Section variant="light" className="bg-transparent">
        <div className="mx-auto max-w-[760px] space-y-14">
          {post.sections.map((section) => (
            <article key={section.heading || section.body.slice(0, 40)}>
              {section.heading ? (
                <h2 className={cn(displayHeading, "text-[24px] leading-[1.15] text-foreground sm:text-[30px]")}>
                  {isVi ? section.heading : section.headingEn}
                </h2>
              ) : null}
              <div
                className="mt-5 text-[15.5px] leading-[1.8] text-muted-foreground sm:text-[17px] [&>p]:mb-4"
                dangerouslySetInnerHTML={{ __html: isVi ? section.body : section.bodyEn }}
              />
            </article>
          ))}
        </div>
      </Section>

      {/* Related news section */}
      {related.length > 0 ? (
        <Section variant="light" className="bg-transparent">
          <SectionHead tone="light" eyebrow={t("relatedEyebrow")} title={t("relatedTitle")} />
          <ScrollReveal itemSelector="[data-related-post]" y={28} stagger={0.1}>
            <div className="grid gap-7 md:grid-cols-3">
              {related.map((item) => { const itemTitle = isVi ? item.title : item.titleEn;
                const itemExcerpt = isVi ? item.excerpt : item.excerptEn;
                return (
                  <article key={item.slug} data-related-post className="group flex flex-col">
                    <Link href={`/news/${item.slug}`} className="focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-primary">
                      <span className="relative block h-[180px] overflow-hidden rounded-xl border border-border sm:h-[200px]">
                        <SafeImage
                          src={item.image}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                        <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,6,8,0.4),transparent_50%)]" />
                      </span>
                    </Link>
                    <span className={cn(label, "mt-5 text-primary")}>
                      {isVi ? item.headerConfig : item.headerConfigEn}
                    </span>
                    <h3 className={cn(displayHeading, "mt-3 text-[18px] leading-[1.3] text-foreground sm:text-[20px]")}>
                      <Link href={`/news/${item.slug}`} className="transition-colors hover:text-primary">
                        {itemTitle}
                      </Link>
                    </h3>
                    <p className="mt-3 flex-1 text-[13.5px] leading-[1.6] text-muted-foreground">{itemExcerpt}</p>
                    <span className={cn(label, "mt-5 inline-flex items-center gap-2 text-muted-foreground")}>
                      {t("readArticle")}
                      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </article>
                ); })}
            </div>
          </ScrollReveal>
        </Section>
      ) : null}

      <CtaSection
        eyebrow={t("ctaEyebrow")}
        heading1={t("ctaHeading1")}
        heading2={t("ctaHeading2")}
        description={t("ctaDesc")}
        primaryHref="/contact?type=consultation"
        primaryLabel={t("ctaPrimary")}
        secondaryHref="/insights"
        secondaryLabel={t("ctaSecondary")}
      />
    </>
  ); }

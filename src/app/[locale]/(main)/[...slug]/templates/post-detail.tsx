import { Link } from "@/i18n/navigation";
import { ArrowRight, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/shared/safe-image";
import { CtaGrid } from "@/app/[locale]/(main)/_components/cta/cta-grid";
import { useTranslations } from "next-intl";
import type { MockPost } from "@/mockdata/posts";

/**
 * News-post detail template — an article rendered as a page of hardcoded
 * sections: hero → body sections → related news → CTA.
 */
export default function PostDetailPage({ post,
  related,
  locale }: {
    post: MockPost;
    related: MockPost[];
    locale: string;
  }) {
  const t = useTranslations("pages.postDetail");
  const isVi = locale === "vi";
  const title = isVi ? post.title : post.titleEn;
  const headerConfig = isVi ? post.headerConfig : post.headerConfigEn;
  const excerpt = isVi ? post.excerpt : post.excerptEn;

  return (
    <>
      {/* Article — 8-col content + 4-col related sidebar */}
      <div className="container pb-16 pt-20 sm:pt-30">
        <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-12 lg:gap-10">
          <article className="lg:col-span-8">
            {headerConfig ? (
              <p className="text-[13px] font-medium text-primary">{headerConfig}</p>
            ) : null}
            <h1
              className={cn(
                displayHeading,
                "mt-3 text-[28px] leading-[1.15] tracking-[-0.02em] text-foreground sm:text-[38px] lg:text-[42px]",
              )}
            >
              {title}
            </h1>
            {excerpt ? (
              <p className="mt-5 text-[16px] leading-[1.75] text-muted-foreground sm:text-[17px]">{excerpt}</p>
            ) : null}

            <div className={cn(label, "mt-6 flex flex-wrap items-center gap-6 normal-case tracking-[0.04em] text-muted-foreground")}>
              <span className="inline-flex items-center gap-2">
                <CalendarDays aria-hidden="true" className="h-4 w-4" />
                {new Date(post.publishedAt).toLocaleDateString(isVi ? "vi-VN" : "en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric"
                })}
              </span>
            </div>

            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg border border-border bg-muted">
              <SafeImage src={post.image} alt={title} fill priority className="object-cover" />
            </div>

            <div className="mt-12">
              {post.sections.map((section, index) => (
                <section
                  key={section.heading || section.body.slice(0, 40)}
                  className={cn(index > 0 && "mt-12 border-t border-border pt-12")}
                >
                  {section.heading ? (
                    <h2 className="text-[21px] font-semibold leading-[1.3] tracking-[-0.01em] text-foreground sm:text-[23px]">
                      {isVi ? section.heading : section.headingEn}
                    </h2>
                  ) : null}
                  <div
                    className={cn(
                      "text-[16px] leading-[1.85] text-muted-foreground",
                      "[&>p]:mb-5 [&_strong]:font-semibold [&_strong]:text-foreground",
                      "[&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-[17px] [&_h3]:font-semibold [&_h3]:text-foreground",
                      "[&_h4]:mb-2 [&_h4]:mt-6 [&_h4]:text-[15.5px] [&_h4]:font-semibold [&_h4]:text-foreground",
                      "[&_ul]:mb-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5",
                      "[&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5",
                      "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4",
                      "[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-5 [&_blockquote]:text-foreground/80",
                      section.heading ? "mt-4" : "",
                    )}
                    dangerouslySetInnerHTML={{ __html: isVi ? section.body : section.bodyEn }}
                  />
                </section>
              ))}

              {/* Inline CTA — one quiet box */}
              <div className="mt-14 rounded-lg border border-border bg-muted/40 p-7 sm:p-8">
                <p className="text-[17px] font-semibold leading-[1.4] text-foreground">{t("sidebarCtaTitle")}</p>
                <Link
                  href="/contact?type=consultation"
                  className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-[14px] font-medium text-white transition hover:bg-primary/90"
                >
                  {t("sidebarCtaButton")}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>

          {/* Related — sticky sidebar */}
          {related.length > 0 ? (
            <aside className="lg:col-span-4">
              <div className="rounded-xl border border-border bg-white p-5 sm:p-6 lg:sticky lg:top-28">
                <p className={cn(label, "text-muted-foreground")}>{t("relatedEyebrow")}</p>
                <h2 className={cn(displayHeading, "mt-3 text-[24px] leading-[1.2] text-foreground sm:text-[28px]")}>
                  {t("relatedTitle")}
                </h2>
                <div className="mt-8 flex flex-col gap-5">
                  {related.map((item) => {
                    const itemTitle = isVi ? item.title : item.titleEn;
                    const href = `/news/${item.slug}?type=posts`;
                    return (
                      <article key={item.slug} className="group">
                        <Link href={href} className="flex items-start gap-4">
                          <span className="relative block w-28 shrink-0 aspect-[4/3] overflow-hidden rounded-md border border-border bg-muted">
                            <SafeImage
                              src={item.image}
                              alt=""
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                            />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[11px] text-muted-foreground">
                              {isVi ? item.headerConfig : item.headerConfigEn}
                            </span>
                            <span className="mt-1 block text-[14.5px] font-semibold leading-[1.4] text-foreground transition-colors group-hover:text-primary">
                              {itemTitle}
                            </span>
                          </span>
                        </Link>
                      </article>
                    );
                  })}
                </div>
              </div>
            </aside>
          ) : null}
        </div>
      </div>

      <CtaGrid
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
  );
}

const displayHeading = "font-medium tracking-[-0.045em] text-balance";

const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

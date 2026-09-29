import { Link } from "@/i18n/navigation";
import { ArrowRight, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/shared/safe-image";
import { CtaEditorial } from "@/app/[locale]/(main)/_components/cta/cta-editorial";
import { useTranslations } from "next-intl";
import type { MockPost } from "@/mockdata/posts";

/**
 * Solutions-post detail template — same article structure as the news post
 * detail (hero → body sections → related posts → CTA), routed via
 * ?type=solutions and linked under /solutions.
 */
export default function SolutionDetailPage({ post,
  related,
  locale }: {
    post: MockPost;
    related: MockPost[];
    locale: string;
  }) {
  const t = useTranslations("pages.postDetail");
  const tGroup = useTranslations("pages.solutions.postDetail");
  const isVi = locale === "vi";
  const title = isVi ? post.title : post.titleEn;
  const headerConfig = isVi ? post.headerConfig : post.headerConfigEn;
  const excerpt = isVi ? post.excerpt : post.excerptEn;

  return (
    <>
      {/* Header — quiet editorial, same as case-studies */}
      <header className="container pb-10 pt-20 sm:pt-30">
        <div className="mx-auto max-w-[1020px]">
          {headerConfig ? (
            <p className="mt-8 text-[13px] font-medium text-primary">{headerConfig}</p>
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
        </div>
      </header>

      {/* Cover */}
      <div className="container">
        <div className="mx-auto max-w-[1320px]">
          <div className="relative aspect-[16/8] overflow-hidden rounded-lg border border-border bg-muted">
            <SafeImage src={post.image} alt={title} fill priority className="object-cover" />
          </div>
        </div>
      </div>

      {/* Article body — single column, clean prose */}
      <article className="container pb-16 pt-14">
        <div className="mx-auto max-w-[960px]">
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

      {/* Related — minimal cards on a muted band */}
      {related.length > 0 ? (
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="container">
            <div className="mx-auto max-w-[1320px]">
              <p className={cn(label, "text-muted-foreground")}>{t("relatedEyebrow")}</p>
              <h2 className={cn(displayHeading, "mt-3 text-[24px] leading-[1.2] text-foreground sm:text-[28px]")}>
                {t("relatedTitle")}
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {related.map((item) => {
                  const itemTitle = isVi ? item.title : item.titleEn;
                  const href = `/solutions/${item.slug}?type=solutions`;
                  return (
                    <article key={item.slug} className="group flex flex-col">
                      <Link
                        href={href}
                        className="relative block aspect-[16/9] overflow-hidden rounded-lg border border-border bg-muted"
                      >
                        <SafeImage
                          src={item.image}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </Link>
                      <p className="mt-4 text-[12.5px] text-muted-foreground">
                        {isVi ? item.headerConfig : item.headerConfigEn}
                      </p>
                      <h3 className="mt-1.5 text-[16.5px] font-semibold leading-[1.4] text-foreground">
                        <Link href={href} className="transition-colors hover:text-primary">
                          {itemTitle}
                        </Link>
                      </h3>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-primary">
                        {t("readArticle")}
                        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <CtaEditorial
        eyebrow={t("ctaEyebrow")}
        heading1={t("ctaHeading1")}
        heading2={t("ctaHeading2")}
        description={t("ctaDesc")}
        primaryHref="/contact?type=consultation"
        primaryLabel={t("ctaPrimary")}
        secondaryHref="/solutions"
        secondaryLabel={tGroup("ctaSecondary")}
      />
    </>
  );
}

const displayHeading = "font-medium tracking-[-0.045em] text-balance";

const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";
import { getLocale, getTranslations } from "next-intl/server";
import { SafeImage } from "@/components/shared/safe-image";
import { fetchPageConfigByPath, fetchPostsByPageConfigId } from "@/utils/public-posts";
import { resolveCmsFileUrl } from "@/utils/file";

const shell = "container";
const displayHeading = "font-barlow font-bold tracking-[-0.035em] text-balance";
const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

function Section({ id,
  variant = "white",
  className,
  children,
  labelledBy }: {
    id?: string;
    variant?: "white" | "surface" | "dark";
    className?: string;
    children: ReactNode;
    labelledBy?: string;
  }) {
  const variants = {
    white: "bg-transparent text-white",
    surface: "bg-white/5 text-white",
    dark: "text-white"
  } as const;
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("scroll-mt-20 py-16 sm:py-24 lg:py-[128px]", variants[variant], className)}>
      <Reveal className={shell}>{children}</Reveal>
    </section>
  );
}

function ArrowLink({ href, children, tone = "light", className }: { href: string; children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.1em] transition focus-visible:outline-2 focus-visible:outline-offset-4",
        tone === "dark" ? "text-white hover:text-primary-light focus-visible:outline-primary-light" : "text-white hover:text-primary-light focus-visible:outline-primary",
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </Link>
  );
}

export async function Insights() {
  const [t, locale] = await Promise.all([getTranslations("home.insights"), getLocale()]);
  const isVi = locale === "vi";

  const dateOf = (value?: string | null) =>
    value
      ? new Date(value).toLocaleDateString(isVi ? "vi-VN" : "en-US", { day: "2-digit", month: "short", year: "numeric" })
      : "";

  const groupDefinitions = [
    {
      key: "case-studies",
      path: "/case-studies",
      fallbackTitle: t("caseStudiesTitle"),
      readLabel: t("readCaseStudy"),
      hrefOf: (slug: string) => `/${slug}?type=case-studies`,
    },
    {
      key: "news",
      path: "/news",
      fallbackTitle: t("newsTitle"),
      readLabel: t("readNews"),
      hrefOf: (slug: string) => `/insights/news/${slug}?type=posts`,
    },
  ] as const;

  const groups = await Promise.all(groupDefinitions.map(async (group) => {
    const pageConfig = await fetchPageConfigByPath([group.path]);
    const posts = pageConfig?.id ? await fetchPostsByPageConfigId(pageConfig.id, 4) : [];
    return {
      ...group,
      title: pageConfig ? (isVi ? pageConfig.name : pageConfig.name_en || pageConfig.name) : group.fallbackTitle,
      posts,
    };
  }));

  return (
    <>
      {groups.map((group) => (
        <Section key={group.key} variant="dark" labelledBy={`home-${group.key}-title`}>
          <div className={cn("mb-7 flex flex-col gap-5 sm:mb-9 sm:flex-row sm:items-end sm:justify-between", group.key === "case-studies" && "items-center sm:justify-center")}>
            <h3 id={`home-${group.key}-title`} className={cn(displayHeading, "text-[28px] leading-[1.05] text-white sm:text-[36px] lg:text-[42px]", group.key === "case-studies" && "text-center")}>
              {group.title}
            </h3>
            {group.key === "news" ? (
              <ArrowLink href="/insights/news" tone="dark" className="shrink-0 pb-1">
                {t("viewAllNews")}
              </ArrowLink>
            ) : null}
          </div>

          {group.posts.length > 0 ? (
            <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
              {group.posts.map((post) => {
                const href = group.hrefOf(post.slug ?? "");
                const image = post.thumbnail?.path ? resolveCmsFileUrl(post.thumbnail.path) : null;
                return (
                  <article key={post.id} className="group flex min-w-0 flex-col">
                    <Link href={href} className="focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-primary">
                      <span className="relative block h-[190px] overflow-hidden bg-surface-dark-raised sm:h-[200px]">
                        {image ? (
                          <SafeImage
                            src={image}
                            alt={post.thumbnail?.original ?? post.title}
                            fill
                            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
                          />
                        ) : (
                          <i className="absolute -bottom-[180px] -right-[50px] size-[310px] rounded-full border border-white/10 border-primary shadow-[0_0_55px_rgba(49,92,255,0.25)]" />
                        )}
                        <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,6,8,0.35),transparent_45%)]" />
                      </span>
                    </Link>
                    <span className={cn(label, "mt-5 text-primary-light")}>{dateOf(post.published_at || post.created_at)}</span>
                    <h4 className={cn(displayHeading, "mt-3 text-[19px] leading-[1.25] text-white sm:text-[21px]")}>
                      <Link href={href} className="transition-colors hover:text-primary-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-light">
                        {post.title}
                      </Link>
                    </h4>
                    {post.summary ? (
                      <p className="mt-3 line-clamp-3 flex-1 text-[13.5px] leading-[1.6] text-white/55">{post.summary}</p>
                    ) : null}
                    <div className="mt-5">
                      <ArrowLink href={href} tone="dark">{group.readLabel}</ArrowLink>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="border border-white/10 px-5 py-8 text-[13px] leading-[1.6] text-white/45">{t("empty")}</p>
          )}
        </Section>
      ))}
    </>
  );
}

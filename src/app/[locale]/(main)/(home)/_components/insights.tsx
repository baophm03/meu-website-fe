import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";
import { getLocale, getTranslations } from "next-intl/server";
import { SafeImage } from "@/components/shared/safe-image";
import { fetchPageConfigByPath, fetchPostsPageByPageConfigId } from "@/utils/public-posts";
import { resolveCmsFileUrl } from "@/utils/file";

const shell = "container";
const displayHeading = "font-medium tracking-[-0.045em] text-balance";
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

function SectionHead({ id,
  title,
  summary,
  tone = "light",
  action }: {
    id?: string;
    title: ReactNode;
    summary?: string;
    tone?: "light" | "dark";
    action?: ReactNode;
  }) {
  const dark = tone === "dark";
  return (
    <div className="mb-12 sm:mb-16">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <h2 id={id} className={cn(displayHeading, "max-w-[720px] text-[34px] leading-[1.04] sm:text-[46px] lg:text-[62px]", dark ? "text-white" : "text-white")}>{title}</h2>
        <div className="flex max-w-md shrink-0 flex-col items-start gap-6">
          {summary ? <p className={cn("text-[15px] leading-[1.7]", dark ? "text-white/60" : "text-white/60")}>{summary}</p> : null}
          {action}
        </div>
      </div>
    </div>
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

  const hubConfig = await fetchPageConfigByPath(["/insights"]);
  const { posts } = hubConfig?.id ? await fetchPostsPageByPageConfigId(hubConfig.id, 1, 6) : { posts: [] };

  const dateOf = (value?: string | null) =>
    value
      ? new Date(value).toLocaleDateString(isVi ? "vi-VN" : "en-US", { day: "2-digit", month: "short", year: "numeric" })
      : "";

  const insights: Array<[meta: string, title: string, copy: string, href: string, image: string | null]> =
    posts.length > 0
      ? posts.map((post) => [
        dateOf(post.published_at || post.created_at),
        post.title ?? "",
        post.summary ?? "",
        `/insights/${post.slug}?type=posts`,
        post.thumbnail?.path ? resolveCmsFileUrl(post.thumbnail.path) : null,
      ])
      : [
        [t("card1Meta"), t("card1Title"), t("card1Desc"), "/insights/ai-automation", "/images/insights/insight-1.jpg"],
        [t("card2Meta"), t("card2Title"), t("card2Desc"), "/insights/enterprise-tech", "/images/insights/insight-2.jpg"],
        [t("card3Meta"), t("card3Title"), t("card3Desc"), "/insights/digital-transformation", "/images/insights/insight-3.jpg"],
        [t("card4Meta"), t("card4Title"), t("card4Desc"), "/insights/ai-agents-operations", "/images/insights/insight-4.jpg"],
        [t("card5Meta"), t("card5Title"), t("card5Desc"), "/insights/erp-implementation", "/images/insights/insight-5.jpg"],
        [t("card6Meta"), t("card6Title"), t("card6Desc"), "/insights/website-operations-channel", "/images/insights/insight-6.jpg"],
      ];

  return (
    <Section variant="dark" id="insights">
      <SectionHead
        tone="dark"
        title={<>
          {t("heading")}
        </>}
        action={<ArrowLink href="/insights" tone="dark">{t("insightsHub")}</ArrowLink>}
      />

      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {insights.map(([meta, title, copy, href, image]) => (
          <article key={title} className="group flex flex-col">
            <Link href={href} className="focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-primary">
              <span className="relative block h-[200px] overflow-hidden bg-surface-dark-raised sm:h-[220px]">
                {image ? (
                  <SafeImage
                    src={image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
                  />
                ) : (
                  <i className="absolute -bottom-[180px] -right-[50px] size-[310px] rounded-full border border-white/10 border-primary shadow-[0_0_55px_rgba(49,92,255,0.25)]" />
                )}
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,6,8,0.35),transparent_45%)]" />
              </span>
            </Link>
            <span className={cn(label, "mt-6 text-primary-light")}>{meta}</span>
            <h3 className={cn(displayHeading, "mt-3 text-[21px] leading-[1.25] text-white sm:text-[23px]")}>
              <Link href={href} className="transition-colors hover:text-primary-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-light">
                {title}
              </Link>
            </h3>
            <p className="mt-3 flex-1 text-[14px] leading-[1.6] text-white/55">{copy}</p>
            <div className="mt-6">
              <ArrowLink href={href} tone="dark">{t("readInsight")}</ArrowLink>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

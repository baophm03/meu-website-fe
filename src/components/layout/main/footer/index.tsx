import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { footerColumns } from "./nav-data";
import links from "@/links";
import { getApiV10Footer } from "@/api/endpoints/footer";
import type { Footer } from "@/api/models/footer";
import type { FooterColumn } from "@/api/models/footerColumn";
import type { FooterElement } from "@/api/models/footerElement";
import type { FooterRow } from "@/api/models/footerRow";
import type { GetApiV10FooterLanguage } from "@/api/models/getApiV10FooterLanguage";

const bySortOrder = <T extends { sort_order?: number | null }>(a: T, b: T) =>
  (a.sort_order ?? 0) - (b.sort_order ?? 0);

const isExternal = (href: string) => /^https?:\/\//i.test(href);

function ElementLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations();

  let cmsFooter: Footer | null = null;
  try {
    const response = await getApiV10Footer({
      language: locale as GetApiV10FooterLanguage,
      pageSize: 10,
    });
    cmsFooter =
      ((response.responseData?.rows ?? []) as Footer[]).find((item) => item.is_active) ?? null;
  } catch {
    cmsFooter = null;
  }

  const columns = ([...(cmsFooter?.footer_columns ?? [])].sort(bySortOrder) ?? []) as FooterColumn[];

  return (
    <footer className="bg-surface-dark text-white">
      <div className="container w-full py-14 lg:pt-20 lg:pb-10">
        <div className="grid gap-x-8 gap-y-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" aria-label="MeU Solutions — home" className="flex items-center gap-2.5">
              <Image src="/logo-full.png" alt="" width={150} height={60} className="h-15 w-50 object-contain" />
            </Link>
            <p className="mt-4 text-[14px] leading-relaxed text-slate-400">
              {t("footer.tagline")}
            </p>
            <address className="mt-5 not-italic text-[13px] leading-relaxed text-slate-400">
              {t("footer.address")}
              <br />
              <Link href="/contact" className="text-primary-light hover:text-white">
                {t("footer.contactTeam")}
              </Link>
            </address>
          </div>

          {cmsFooter ? (
            columns.map((column, colIdx) => {
              const rows = [...(column.footer_rows ?? [])].sort(bySortOrder) as FooterRow[];
              return (
                <nav key={column.id ?? colIdx} aria-label={column.title ?? undefined}>
                  {column.title ? (
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                      {column.title}
                    </h2>
                  ) : null}
                  <ul className="mt-4 space-y-2.5">
                    {rows.map((row, rowIdx) => {
                      const elements = [...(row.footer_elements ?? [])].sort(bySortOrder) as FooterElement[];
                      return elements.map((el, elIdx) => {
                        const key = el.id ?? `${rowIdx}-${elIdx}`;
                        const href = el.link?.trim() || "";

                        if (el.type === "image") {
                          const src = links.resolveImageUrl(el.content);
                          if (!src) return null;
                          const img = (
                            <Image
                              src={src}
                              alt={column.title ?? ""}
                              width={120}
                              height={48}
                              className="h-8 w-auto object-contain opacity-80 transition hover:opacity-100"
                            />
                          );
                          return (
                            <li key={key}>
                              {href ? <ElementLink href={href} className="inline-block">{img}</ElementLink> : img}
                            </li>
                          );
                        }

                        if (!el.content?.trim()) return null;
                        return (
                          <li key={key}>
                            {href ? (
                              <ElementLink href={href} className="text-[13px] leading-snug text-slate-400 transition hover:text-white">
                                {el.content}
                              </ElementLink>
                            ) : (
                              <span className="text-[13px] leading-snug text-slate-400">{el.content}</span>
                            )}
                          </li>
                        );
                      });
                    })}
                  </ul>
                </nav>
              );
            })
          ) : (
            footerColumns.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white">{column.headingKey ? t(column.headingKey) : column.heading}</h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[13px] leading-snug text-slate-400 transition hover:text-white">
                        {link.labelKey ? t(link.labelKey) : link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))
          )}
        </div>

        <div className="flex flex-col gap-4 pt-6 text-[12px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <span>{t("footer.rights", { year: new Date().getFullYear() })}</span>
            <span className="text-slate-600">|</span>
            <span>
              Powered By{" "}
              <Link href="https://vietprodev.vn" className="text-primary-light hover:text-white" target="_blank">
                VietProDev
              </Link>
            </span>
          </div>
          <div className="flex flex-wrap gap-5">
            <Link href="/trust/privacy" className="hover:text-white">
              {t("footer.privacy")}
            </Link>
            <Link href="/trust/security" className="hover:text-white">
              {t("footer.security")}
            </Link>
            <Link href="/trust" className="hover:text-white">
              {t("footer.trustCenter")}
            </Link>
          </div>
        </div>
      </div>
    </footer >
  );
}

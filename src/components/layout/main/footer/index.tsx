import { getLocale, getTranslations } from "next-intl/server";
import { footerColumns } from "./nav-data";
import links from "@/links";
import { getApiV10Footer } from "@/api/endpoints/footer";
import type { Footer } from "@/api/models/footer";
import type { FooterColumn } from "@/api/models/footerColumn";
import type { FooterElement } from "@/api/models/footerElement";
import type { FooterRow } from "@/api/models/footerRow";
import type { GetApiV10FooterLanguage } from "@/api/models/getApiV10FooterLanguage";
import { FooterView, type FooterColumnData, type FooterLinkItem, type FooterRowData } from "./footer-view";

const bySortOrder = <T extends { sort_order?: number | null }>(a: T, b: T) =>
  (a.sort_order ?? 0) - (b.sort_order ?? 0);

const isExternal = (href: string) => /^https?:\/\//i.test(href);

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

  const footerColumnData: FooterColumnData[] = cmsFooter
    ? columns.map((column, colIdx) => {
      const rows = [...(column.footer_rows ?? [])].sort(bySortOrder) as FooterRow[];
      const rowData: FooterRowData[] = rows
        .map((row, rowIdx) => {
          const elements = [...(row.footer_elements ?? [])].sort(bySortOrder) as FooterElement[];
          const items = elements
            .map((el, elIdx): FooterLinkItem | null => {
              const key = String(el.id ?? `${rowIdx}-${elIdx}`);
              const href = el.link?.trim() || null;

              if (el.type === "image") {
                const src = links.resolveImageUrl(el.content);
                if (!src) return null;
                return { key, type: "image", content: "", href, isExternal: href ? isExternal(href) : false, imageSrc: src };
              }

              if (!el.content?.trim()) return null;
              return {
                key,
                type: "text",
                content: el.content,
                href,
                isExternal: href ? isExternal(href) : false,
              };
            })
            .filter((item): item is FooterLinkItem => item !== null);
          return { key: String(row.id ?? rowIdx), items };
        })
        .filter((row) => row.items.length > 0);
      return { key: String(column.id ?? colIdx), title: column.title ?? null, rows: rowData };
    })
    : [
      {
        key: "brand",
        title: null,
        rows: [{
          key: "brand-row",
          items: [
            {
              key: "brand-logo",
              type: "image" as const,
              content: "",
              href: "/",
              isExternal: false,
              imageSrc: "/logo-full.png",
            },
            {
              key: "brand-tagline",
              type: "text" as const,
              content: t("footer.tagline"),
              href: null,
              isExternal: false,
            },
          ],
        }],
      },
      ...footerColumns.map((column) => ({
        key: column.heading,
        title: column.headingKey ? t(column.headingKey) : column.heading,
        rows: column.links.map((link) => ({
          key: link.href,
          items: [{
            key: link.href,
            type: "text" as const,
            content: link.labelKey ? t(link.labelKey) : link.label,
            href: link.href,
            isExternal: isExternal(link.href),
          }],
        })),
      })),
    ];

  return (
    <FooterView
      columns={footerColumnData}
      rightsText={t("footer.rights", { year: new Date().getFullYear() })}
      poweredByLabel="Powered By"
      privacyLabel={t("footer.privacy")}
      securityLabel={t("footer.security")}
      trustCenterLabel={t("footer.trustCenter")}
    />
  );
}

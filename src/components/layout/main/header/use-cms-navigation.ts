"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { getApiV10Category } from "@/api/endpoints/category";
import {
  buildCategoryTree,
  type CmsCategoryItem,
  type CmsPagedResult,
} from "@/utils/cms-transforms";
import { navigation, type MegaColumn, type MegaLink, type NavItem } from "./nav-data";

type CmsCategoryTreeNode = ReturnType<typeof buildCategoryTree>[number];

function labelOf(node: CmsCategoryTreeNode, locale: string) {
  const nameEn = node.name_en?.trim();
  return locale === "en" && nameEn ? nameEn : node.name;
}

function blurbOf(node: CmsCategoryTreeNode, locale: string) {
  const descriptionEn = node.description_en?.trim();
  if (locale === "en" && descriptionEn) return descriptionEn;
  return node.description?.trim() ?? "";
}

function hrefOf(node: CmsCategoryTreeNode) {
  return node.url?.trim() || "#";
}

function toNavItems(nodes: CmsCategoryTreeNode[], locale: string): NavItem[] {
  return nodes.map((node) => {
    const item: NavItem = { label: labelOf(node, locale), href: hrefOf(node) };
    const children = node.children ?? [];
    if (children.length === 0) return item;

    const columns: MegaColumn[] = [];
    const leafLinks: MegaLink[] = children
      .filter((child) => (child.children ?? []).length === 0)
      .map((child) => ({ label: labelOf(child, locale), href: hrefOf(child) }));

    if (leafLinks.length > 0) {
      columns.push({ heading: item.label, blurb: blurbOf(node, locale), links: leafLinks });
    }

    children
      .filter((child) => (child.children ?? []).length > 0)
      .forEach((child) => {
        columns.push({
          heading: labelOf(child, locale),
          blurb: blurbOf(child, locale),
          links: (child.children ?? []).map((grandchild) => ({
            label: labelOf(grandchild, locale),
            href: hrefOf(grandchild),
          })),
        });
      });

    item.columns = columns;
    return item;
  });
}

export function useCmsNavigation(): NavItem[] {
  const locale = useLocale();
  const [nodes, setNodes] = useState<CmsCategoryTreeNode[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    getApiV10Category({
      page: 1,
      pageSize: 200,
      sortField: "sort_order",
      sortOrder: "asc",
    })
      .then((response) => {
        if (cancelled) return;
        const result = (response.responseData ?? {}) as unknown as CmsPagedResult<CmsCategoryItem>;
        setNodes(buildCategoryTree(result.rows ?? []));
      })
      .catch(() => {
        if (!cancelled) setNodes(null);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return useMemo(() => {
    if (nodes && nodes.length > 0) {
      return toNavItems(nodes, locale);
    }
    return navigation;
  }, [nodes, locale]);
}

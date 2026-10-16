import { toCmsSlug } from "@/utils/cms-slug";

export interface HeaderConfigItem {
  id: string;
  name: string;
  name_en?: string | null;
  static_link: string;
  sort_order: number;
  parent_id: string | null;
  level: number;
  description?: string;
  description_en?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface HeaderConfigTreeItem extends HeaderConfigItem {
  children: HeaderConfigTreeItem[];
}

export function toSlug(value: string) {
  return toCmsSlug(value);
}

function assignLevel(item: HeaderConfigItem, items: HeaderConfigItem[]) {
  let level = 1;
  let currentParentId = item.parent_id;

  while (currentParentId) {
    const parent = items.find((entry) => entry.id === currentParentId);
    if (!parent) break;
    level += 1;
    currentParentId = parent.parent_id;
  }

  return level;
}

export function normalizeHeaderConfigs(items: HeaderConfigItem[]) {
  return items.map((item) => ({
    ...item,
    level: assignLevel(item, items),
    static_link: item.static_link?.trim() || "/",
  }));
}

export function buildHeaderConfigItemTree(items: HeaderConfigItem[]): HeaderConfigTreeItem[] {
  const normalized = normalizeHeaderConfigs(items);
  const map = new Map<string, HeaderConfigTreeItem>();

  normalized.forEach((item) => {
    map.set(item.id, { ...item, children: [] });
  });

  const roots: HeaderConfigTreeItem[] = [];

  normalized.forEach((item) => {
    const current = map.get(item.id);
    if (!current) return;

    if (item.parent_id) {
      const parent = map.get(item.parent_id);
      if (parent) {
        parent.children.push(current);
        parent.children.sort(
          (a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name, "vi"),
        );
      } else {
        roots.push(current);
      }
    } else {
      roots.push(current);
    }
  });

  return roots.sort(
    (a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name, "vi"),
  );
}

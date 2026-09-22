"use client";

import React from "react";
import { toast } from "sonner";
import {
  HeaderCategoryDeleteDialog,
  HeaderCategoryFlatRow,
  HeaderCategoryFormDialog,
  HeaderCategoryFormValues,
  HeaderCategoryFormMode,
  HeaderCategoryStats,
  HeaderCategoryTable,
} from "./components";
import {
  deleteApiV10CategoryId,
  getApiV10Category,
  postApiV10Category,
  putApiV10CategoryId,
} from "@/api/endpoints/category";
import {
  type CmsCategoryItem,
  type CmsHeaderCategoryItem,
  type CmsPagedResult,
  buildCategoryTree,
  buildHeaderItemsFromCategories,
  buildStaticLink,
  toCategoryApiType,
} from "@/utils/cms-transforms";
import {
  buildHeaderCategoryTree,
  HeaderCategoryItem,
  HeaderCategoryTreeItem,
  toSlug,
} from "@/mockdata/header-config";

const EMPTY_HEADER_CATEGORY_FORM: HeaderCategoryFormValues = {
  name: "",
  name_en: "",
  slug: "",
  sort_order: "1",
  parent_id: "",
  type: "page",
  description: "",
  description_en: "",
};

const PROTECTED_HOME_CATEGORY_ID = "root-home";

function isProtectedHomeCategory(itemId?: string | null) {
  return itemId === PROTECTED_HOME_CATEGORY_ID;
}

function toFormValues(item?: CmsHeaderCategoryItem | null): HeaderCategoryFormValues {
  if (!item) return EMPTY_HEADER_CATEGORY_FORM;

  return {
    id: item.id,
    name: item.name,
    name_en: item.name_en ?? "",
    slug: item.slug,
    sort_order: String(item.sort_order),
    parent_id: item.parent_id ?? "",
    type: item.type,
    description: item.description ?? "",
    description_en: item.description_en ?? "",
  };
}

type ManagedHeaderCategoryItem = HeaderCategoryItem & {
  code: string;
  api_parent_id: string | null;
};

function useHeaderConfigModule() {
  const [items, setItems] = React.useState<ManagedHeaderCategoryItem[]>([]);
  const [rootStaticLink, setRootStaticLink] = React.useState("/");
  const [isReady, setIsReady] = React.useState(false);

  const load = React.useCallback(async () => {
    const response = await getApiV10Category({
      page: 1,
      pageSize: 200,
      sortField: "sort_order",
      sortOrder: "asc",
    });
    const result = (response.responseData ?? {}) as unknown as CmsPagedResult<CmsCategoryItem>;
    const roots = buildCategoryTree(result.rows ?? []);
    const items = buildHeaderItemsFromCategories(roots);

    setItems(items as ManagedHeaderCategoryItem[]);
    setRootStaticLink("/");
    setIsReady(true);
  }, []);

  React.useEffect(() => {
    void load().catch((error) => {
      toast.error(error instanceof Error ? error.message : "Không thể tải cấu hình danh mục");
      setIsReady(true);
    });
  }, [load]);

  const tree = React.useMemo(() => buildHeaderCategoryTree(items), [items]);

  return {
    items,
    tree,
    rootStaticLink,
    isReady,
    reload: load,
  };
}

export default function HeaderConfigPage() {
  const { items, tree, rootStaticLink, isReady, reload } = useHeaderConfigModule();

  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});
  const [search, setSearch] = React.useState("");
  const [formMode, setFormMode] = React.useState<HeaderCategoryFormMode>("create");
  const [formOpen, setFormOpen] = React.useState(false);
  const [formValues, setFormValues] = React.useState<HeaderCategoryFormValues>(
    EMPTY_HEADER_CATEGORY_FORM,
  );
  const [deleteTarget, setDeleteTarget] = React.useState<HeaderCategoryTreeItem | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (!isReady) return;

    setExpanded((previous) => {
      const next = { ...previous };

      const walk = (nodes: HeaderCategoryTreeItem[]) => {
        nodes.forEach((item) => {
          if (!(item.id in next)) {
            next[item.id] = true;
          }

          if (item.children.length > 0) {
            walk(item.children);
          }
        });
      };

      walk(tree);
      return next;
    });
  }, [isReady, tree]);

  const flatRows = React.useMemo(() => {
    const rows: HeaderCategoryFlatRow[] = [];

    const walk = (nodes: HeaderCategoryTreeItem[], depth = 0) => {
      nodes.forEach((item) => {
        rows.push({ ...item, depth, parentId: item.parent_id });
        if (item.children.length > 0) {
          walk(item.children, depth + 1);
        }
      });
    };

    walk(tree);
    return rows;
  }, [tree]);

  const itemMap = React.useMemo(
    () => new Map(items.map((item) => [item.id, item])),
    [items],
  );

  const visibleRows = React.useMemo(() => {
    return flatRows.filter((row) => {
      const keyword = search.trim().toLowerCase();
      const matchesSearch =
        !keyword ||
        row.name.toLowerCase().includes(keyword) ||
        row.slug.toLowerCase().includes(keyword);

      if (!matchesSearch) return false;
      if (row.depth === 0) return true;

      let parent = row.parentId;
      while (parent) {
        if (!expanded[parent]) return false;
        const parentRow = flatRows.find((entry) => entry.id === parent);
        parent = parentRow?.parentId ?? null;
      }

      return true;
    });
  }, [expanded, flatRows, search]);

  const categoryParentOptions = React.useMemo(
    () => flatRows.filter((item) => item.type === "category" && item.depth <= 1),
    [flatRows],
  );

  const depthMap = React.useMemo(
    () => new Map(flatRows.map((item) => [item.id, item.depth])),
    [flatRows],
  );

  const editingItem = React.useMemo(
    () => flatRows.find((item) => item.id === formValues.id) ?? null,
    [flatRows, formValues.id],
  );

  const parentOptionsForForm = React.useMemo(() => {
    const maxDepth = editingItem && editingItem.children.length > 0 ? 0 : 1;
    const excluded = new Set<string>();
    const walk = (node: HeaderCategoryTreeItem) => {
      excluded.add(node.id);
      node.children.forEach(walk);
    };
    if (editingItem) walk(editingItem);
    return categoryParentOptions.filter(
      (item) => item.depth <= maxDepth && !excluded.has(item.id),
    );
  }, [categoryParentOptions, editingItem]);

  const openCreateRoot = () => {
    setFormMode("create");
    setFormValues(EMPTY_HEADER_CATEGORY_FORM);
    setFormOpen(true);
  };

  const openCreateChild = (item: HeaderCategoryTreeItem) => {
    const depth = (item as HeaderCategoryFlatRow).depth ?? 0;
    if (item.type !== "category" || depth > 1) return;

    setFormMode("create");
    setFormValues({
      ...EMPTY_HEADER_CATEGORY_FORM,
      parent_id: item.id,
      sort_order: String(item.children.length + 1),
      type: "page",
    });
    setExpanded((previous) => ({ ...previous, [item.id]: true }));
    setFormOpen(true);
  };

  const openEdit = (item: HeaderCategoryTreeItem) => {
    if (isProtectedHomeCategory(item.id)) return;

    const fullItem = itemMap.get(item.id) ?? null;
    setFormMode("edit");
    setFormValues(toFormValues(fullItem));
    setFormOpen(true);
  };

  const resolveParentContext = (parentId: string) => {
    if (!parentId) {
      return {
        apiParentId: "",
        parentStaticLink: rootStaticLink,
      };
    }

    const parent = itemMap.get(parentId);
    return {
      apiParentId: parent?.id ?? "",
      parentStaticLink: parent?.static_link ?? rootStaticLink,
    };
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (isProtectedHomeCategory(formValues.id)) {
      return;
    }

    if (!formValues.name.trim()) {
      toast.error("Tên danh mục là bắt buộc");
      return;
    }

    if (!formValues.slug.trim()) {
      toast.error("Slug danh mục là bắt buộc");
      return;
    }

    const parentDepth = formValues.parent_id
      ? (depthMap.get(formValues.parent_id) ?? -1)
      : -1;

    if (formValues.parent_id) {
      const parent = itemMap.get(formValues.parent_id);
      if (!parent || parent.type !== "category" || parentDepth > 1) {
        toast.error("Danh mục cha không hợp lệ");
        return;
      }
    }

    if (formValues.type === "category" && parentDepth > 0) {
      toast.error("Danh mục cấp 3 không được có thể loại Danh mục");
      return;
    }

    if (editingItem && editingItem.children.length > 0 && parentDepth > 0) {
      toast.error(
        "Danh mục đang có danh mục con chỉ có thể đặt ở cấp gốc hoặc cấp 2",
      );
      return;
    }

    if (editingItem && editingItem.children.length > 0 && formValues.type !== "category") {
      toast.error("Danh mục đang có danh mục con phải giữ thể loại Danh mục");
      return;
    }

    const parentContext = resolveParentContext(formValues.parent_id);

    setIsSubmitting(true);

    try {
      const payload = {
        name: formValues.name.trim(),
        name_en: formValues.name_en.trim() || null,
        slug: formValues.slug.trim() || toSlug(formValues.name),
        sort_order: Number(formValues.sort_order) || 1,
        type: formValues.type,
        api_parent_id: parentContext.apiParentId,
        parent_static_link: parentContext.parentStaticLink,
        description: formValues.description.trim() || null,
        description_en: formValues.description_en.trim() || null,
      };

      if (formMode === "create") {
        await postApiV10Category({
          name: payload.name,
          name_en: payload.name_en,
          slug: payload.slug,
          url: buildStaticLink(payload.slug, parentContext.parentStaticLink),
          sort_order: payload.sort_order,
          parent_id: payload.api_parent_id || undefined,
          type: toCategoryApiType(payload.type),
          description: payload.description,
          description_en: payload.description_en,
        });
        toast.success("Tạo danh mục thành công");
      } else if (formValues.id) {
        await putApiV10CategoryId(formValues.id, {
          name: payload.name,
          name_en: payload.name_en,
          slug: payload.slug,
          url: buildStaticLink(payload.slug, parentContext.parentStaticLink),
          sort_order: payload.sort_order,
          parent_id: payload.api_parent_id || undefined,
          type: toCategoryApiType(payload.type),
          description: payload.description,
          description_en: payload.description_en,
        });
        toast.success("Cập nhật danh mục thành công");
      }

      await reload();
      setFormOpen(false);
      setFormValues(EMPTY_HEADER_CATEGORY_FORM);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể lưu danh mục");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget || isSubmitting) return;

    if (isProtectedHomeCategory(deleteTarget.id)) {
      setDeleteTarget(null);
      return;
    }

    setIsSubmitting(true);

    try {
      await deleteApiV10CategoryId(deleteTarget.id);
      toast.success("Xóa danh mục thành công");
      setDeleteTarget(null);
      await reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể xóa danh mục");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mt-0.5 h-5 w-5 shrink-0 text-amber-500"
        >
          <path
            fillRule="evenodd"
            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
            clipRule="evenodd"
          />
        </svg>
        <div className="text-sm">
          <p className="font-semibold">Lưu ý quan trọng</p>
          <p className="mt-0.5 text-amber-700">
            Việc chỉnh sửa hoặc xóa danh mục sẽ ảnh hưởng trực tiếp đến cấu trúc
            Website và có thể gây mất dữ liệu trang liên quan. Vui lòng thao tác
            cẩn thận và kiểm tra kỹ trước khi xác nhận. Nếu phát sinh lỗi, xin vui
            lòng báo ngay cho bên kỹ thuật để được hỗ trợ.
          </p>
        </div>
      </div>

      <HeaderCategoryStats
        total={flatRows.length}
        root={flatRows.filter((item) => !item.parentId).length}
        nested={flatRows.filter((item) => item.parentId).length}
      />

      <HeaderCategoryTable
        rows={visibleRows}
        expanded={expanded}
        isLoading={!isReady}
        searchValue={search}
        onSearchChange={setSearch}
        onToggle={(id) =>
          setExpanded((previous) => ({ ...previous, [id]: !(previous[id] ?? true) }))
        }
        onCreateRoot={openCreateRoot}
        onCreateChild={openCreateChild}
        onEdit={openEdit}
        onDelete={setDeleteTarget}
      />

      <HeaderCategoryFormDialog
        mode={formMode}
        open={formOpen}
        values={formValues}
        parentOptions={parentOptionsForForm}
        canChangeParent
        onOpenChange={setFormOpen}
        onValuesChange={setFormValues}
        onSubmit={() => void handleSubmit()}
      />

      <HeaderCategoryDeleteDialog
        target={deleteTarget}
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        onConfirm={() => void handleDelete()}
      />
    </div>
  );
}

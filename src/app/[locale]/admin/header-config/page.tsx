"use client";

import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  HeaderConfigDeleteDialog,
  HeaderConfigFlatRow,
  HeaderConfigFormDialog,
  HeaderConfigFormValues,
  HeaderConfigFormMode,
  HeaderConfigStats,
  HeaderConfigTable,
} from "./components";
import {
  getGetApiV10HeaderConfigQueryKey,
  useDeleteApiV10HeaderConfigId,
  useGetApiV10HeaderConfig,
  usePostApiV10HeaderConfig,
  usePutApiV10HeaderConfigId,
} from "@/api/endpoints/header-config";
import {
  type CmsHeaderConfigItem,
  type CmsHeaderConfigDetailItem,
  type CmsPagedResult,
  buildHeaderConfigTree,
  buildHeaderItemsFromHeaderConfigs,
  buildStaticLink,
} from "@/utils/cms-transforms";
import {
  buildHeaderConfigItemTree,
  HeaderConfigItem,
  HeaderConfigTreeItem,
  toSlug,
} from "./types";

const EMPTY_HEADER_CATEGORY_FORM: HeaderConfigFormValues = {
  name: "",
  name_en: "",
  url: "",
  sort_order: "1",
  parent_id: "",
  description: "",
  description_en: "",
};

function toFormValues(item?: CmsHeaderConfigDetailItem | null): HeaderConfigFormValues {
  if (!item) return EMPTY_HEADER_CATEGORY_FORM;

  return {
    id: item.id,
    name: item.name,
    name_en: item.name_en ?? "",
    url: item.static_link ?? "",
    sort_order: String(item.sort_order),
    parent_id: item.parent_id ?? "",
    description: item.description ?? "",
    description_en: item.description_en ?? "",
  };
}

type ManagedHeaderConfigItem = HeaderConfigItem & {
  code: string;
  api_parent_id: string | null;
};

function normalizeUrl(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `/${trimmed.replace(/^\/+/, "")}`;
}

function useHeaderConfigModule() {
  const queryClient = useQueryClient();
  const rootStaticLink = "/";

  const { data, isFetching } = useGetApiV10HeaderConfig({
    page: 1,
    pageSize: 200,
    sortField: "sort_order",
    sortOrder: "asc",
  });
  const createHeaderConfig = usePostApiV10HeaderConfig();
  const updateHeaderConfig = usePutApiV10HeaderConfigId();
  const deleteHeaderConfig = useDeleteApiV10HeaderConfigId();

  const result = (data?.responseData ?? {}) as unknown as CmsPagedResult<CmsHeaderConfigItem>;

  const items = useMemo(() => {
    const roots = buildHeaderConfigTree(result.rows ?? []);
    return buildHeaderItemsFromHeaderConfigs(roots) as ManagedHeaderConfigItem[];
  }, [result.rows]);

  const tree = useMemo(() => buildHeaderConfigItemTree(items), [items]);

  const reload = () =>
    queryClient.invalidateQueries({ queryKey: getGetApiV10HeaderConfigQueryKey() });

  return {
    items,
    tree,
    rootStaticLink,
    isReady: !isFetching,
    reload,
    createHeaderConfig,
    updateHeaderConfig,
    deleteHeaderConfig,
  };
}

export default function HeaderConfigPage() {
  const {
    items,
    tree,
    rootStaticLink,
    isReady,
    reload,
    createHeaderConfig,
    updateHeaderConfig,
    deleteHeaderConfig,
  } = useHeaderConfigModule();

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");
  const [formMode, setFormMode] = useState<HeaderConfigFormMode>("create");
  const [formOpen, setFormOpen] = useState(false);
  const [formValues, setFormValues] = useState<HeaderConfigFormValues>(
    EMPTY_HEADER_CATEGORY_FORM,
  );
  const [deleteTarget, setDeleteTarget] = useState<HeaderConfigTreeItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isReady) return;

    setExpanded((previous) => {
      const next = { ...previous };

      const walk = (nodes: HeaderConfigTreeItem[]) => {
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

  const flatRows = useMemo(() => {
    const rows: HeaderConfigFlatRow[] = [];

    const walk = (nodes: HeaderConfigTreeItem[], depth = 0) => {
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

  const itemMap = useMemo(
    () => new Map(items.map((item) => [item.id, item])),
    [items],
  );

  const visibleRows = useMemo(() => {
    return flatRows.filter((row) => {
      const keyword = search.trim().toLowerCase();
      const matchesSearch =
        !keyword ||
        row.name.toLowerCase().includes(keyword) ||
        row.static_link.toLowerCase().includes(keyword);

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

  const headerConfigParentOptions = useMemo(
    () => flatRows.filter((item) => item.depth <= 1),
    [flatRows],
  );

  const depthMap = useMemo(
    () => new Map(flatRows.map((item) => [item.id, item.depth])),
    [flatRows],
  );

  const editingItem = useMemo(
    () => flatRows.find((item) => item.id === formValues.id) ?? null,
    [flatRows, formValues.id],
  );

  const parentOptionsForForm = useMemo(() => {
    const maxDepth = editingItem && editingItem.children.length > 0 ? 0 : 1;
    const excluded = new Set<string>();
    const walk = (node: HeaderConfigTreeItem) => {
      excluded.add(node.id);
      node.children.forEach(walk);
    };
    if (editingItem) walk(editingItem);
    return headerConfigParentOptions.filter(
      (item) => item.depth <= maxDepth && !excluded.has(item.id),
    );
  }, [headerConfigParentOptions, editingItem]);

  const openCreateRoot = () => {
    setFormMode("create");
    setFormValues(EMPTY_HEADER_CATEGORY_FORM);
    setFormOpen(true);
  };

  const openCreateChild = (item: HeaderConfigTreeItem) => {
    const depth = (item as HeaderConfigFlatRow).depth ?? 0;
    if (depth > 1) return;

    setFormMode("create");
    setFormValues({
      ...EMPTY_HEADER_CATEGORY_FORM,
      parent_id: item.id,
      sort_order: String(item.children.length + 1),
    });
    setExpanded((previous) => ({ ...previous, [item.id]: true }));
    setFormOpen(true);
  };

  const openEdit = (item: HeaderConfigTreeItem) => {
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

    if (!formValues.name.trim()) {
      toast.error("Tên danh mục là bắt buộc");
      return;
    }

    const parentDepth = formValues.parent_id
      ? (depthMap.get(formValues.parent_id) ?? -1)
      : -1;

    if (formValues.parent_id) {
      const parent = itemMap.get(formValues.parent_id);
      if (!parent || parentDepth > 1) {
        toast.error("Danh mục cha không hợp lệ");
        return;
      }
    }

    if (editingItem && editingItem.children.length > 0 && parentDepth > 0) {
      toast.error(
        "Danh mục đang có danh mục con chỉ có thể đặt ở cấp gốc hoặc cấp 2",
      );
      return;
    }

    const parentContext = resolveParentContext(formValues.parent_id);

    setIsSubmitting(true);

    try {
      const url = normalizeUrl(formValues.url);

      const apiBody = {
        name: formValues.name.trim(),
        name_en: formValues.name_en.trim() || null,
        url: url ?? buildStaticLink(toSlug(formValues.name), parentContext.parentStaticLink),
        sort_order: Number(formValues.sort_order) || 1,
        parent_id: parentContext.apiParentId || undefined,
        description: formValues.description.trim() || null,
        description_en: formValues.description_en.trim() || null,
      };

      if (formMode === "create") {
        await createHeaderConfig.mutateAsync({ data: apiBody });
        toast.success("Tạo danh mục thành công");
      } else if (formValues.id) {
        await updateHeaderConfig.mutateAsync({ id: formValues.id, data: apiBody });
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

    setIsSubmitting(true);

    try {
      await deleteHeaderConfig.mutateAsync({ id: deleteTarget.id });
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

      <HeaderConfigStats
        total={flatRows.length}
        root={flatRows.filter((item) => !item.parentId).length}
        nested={flatRows.filter((item) => item.parentId).length}
      />

      <HeaderConfigTable
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

      <HeaderConfigFormDialog
        mode={formMode}
        open={formOpen}
        values={formValues}
        parentOptions={parentOptionsForForm}
        canChangeParent
        onOpenChange={setFormOpen}
        onValuesChange={setFormValues}
        onSubmit={() => void handleSubmit()}
      />

      <HeaderConfigDeleteDialog
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

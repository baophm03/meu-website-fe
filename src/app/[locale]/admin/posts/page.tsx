"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  EyeOff,
  Plus,
  Star,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";
import { AdminDeleteDialog } from "@/components/admin/admin-delete-dialog";
import { AdminRowActions } from "@/components/admin/admin-row-actions";
import { AdminStatsGrid } from "@/components/admin/admin-stats-grid";
import { AdminTableLayout } from "@/components/admin/admin-table-layout";
import { SafeImage } from "@/components/shared/safe-image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQueryClient } from "@tanstack/react-query";
import {
  deleteApiV10PostId,
  getGetApiV10PostQueryKey,
  useGetApiV10Post,
  usePutApiV10PostId,
  putApiV10PostId,
} from "@/api/endpoints/post";
import {
  type CmsPagedResult,
  type CmsRawPostItem,
  transformPost,
} from "@/utils/cms-transforms";
import type { AdminNewsItem } from "@/utils/admin-news";
import { AdminNewsTableLoading } from "./_components/admin-news-table-loading";
import { useDebouncedValue } from "./_components/utils";
import { formatDateTime } from "@/utils/date";

const selectTriggerClassName =
  "w-full rounded-xl border-[#063e8e]/15 bg-white text-gray-700 data-[placeholder]:text-gray-700 focus:ring-[#063e8e]/30 lg:w-[180px]";

const selectContentClassName = "border-[#063e8e]/15 bg-white text-gray-700";

const selectItemClassName =
  "text-gray-700 focus:bg-[#063e8e]/10 focus:text-[#063e8e]";

export default function AdminNewsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteTargets, setDeleteTargets] = useState<AdminNewsItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);
  const [isBulkHiding, setIsBulkHiding] = useState(false);
  const [togglingVisibilityId, setTogglingVisibilityId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const debouncedSearch = useDebouncedValue(search);

  const baseFilterParts = useMemo(() => {
    const filters: string[] = [];
    const keyword = debouncedSearch.trim();

    if (keyword) {
      filters.push(`title@=${keyword}`);
    }

    return filters;
  }, [debouncedSearch]);

  const statusFilterParts = useMemo(() => {
    if (statusFilter === "visible") {
      return ["is_hidden==false"];
    }

    if (statusFilter === "hidden") {
      return ["is_hidden==true"];
    }

    return [];
  }, [statusFilter]);

  const apiFilters = useMemo(() => {
    return [...baseFilterParts, ...statusFilterParts].join(",");
  }, [baseFilterParts, statusFilterParts]);

  const visibleStatsFilters = useMemo(() => {
    return [...baseFilterParts, ...statusFilterParts, "is_hidden==false"].join(",");
  }, [baseFilterParts, statusFilterParts]);

  const featuredStatsFilters = useMemo(() => {
    return [...baseFilterParts, ...statusFilterParts, "is_featured==true"].join(",");
  }, [baseFilterParts, statusFilterParts]);

  const { data: listData, isFetching } = useGetApiV10Post({
    page,
    pageSize,
    sortField: "created_at",
    sortOrder: "desc",
    filters: apiFilters || undefined,
  });
  const { data: visibleStatsData } = useGetApiV10Post({
    page: 1,
    pageSize: 1,
    filters: visibleStatsFilters || undefined,
  });
  const { data: featuredStatsData } = useGetApiV10Post({
    page: 1,
    pageSize: 1,
    filters: featuredStatsFilters || undefined,
  });
  const updatePost = usePutApiV10PostId();

  const result = (listData?.responseData ?? {}) as unknown as CmsPagedResult<CmsRawPostItem>;
  const items = useMemo(
    () => (result.rows ?? []).map((item) => transformPost(item)),
    [result.rows],
  );
  const total = result.count ?? 0;
  const ready = !isFetching;
  const selectedItems = useMemo(
    () => items.filter((item) => selectedIds.has(item.id)),
    [items, selectedIds],
  );
  const selectedCount = selectedItems.length;
  const allPageSelected =
    items.length > 0 && items.every((item) => selectedIds.has(item.id));
  const somePageSelected = items.some((item) => selectedIds.has(item.id));
  const publishedTotal =
    ((visibleStatsData?.responseData ?? {}) as unknown as CmsPagedResult<CmsRawPostItem>).count ?? 0;
  const featuredTotal =
    ((featuredStatsData?.responseData ?? {}) as unknown as CmsPagedResult<CmsRawPostItem>).count ?? 0;

  const reload = () =>
    queryClient.invalidateQueries({ queryKey: getGetApiV10PostQueryKey() });

  const clearSelection = () => setSelectedIds(new Set<string>());

  const handleSelectAll = (checked: boolean) => {
    if (!checked) {
      const pageIds = new Set(items.map((item) => item.id));
      setSelectedIds(
        (current) =>
          new Set(Array.from(current).filter((id) => !pageIds.has(id))),
      );
      return;
    }

    setSelectedIds((current) => {
      const next = new Set(current);
      items.forEach((item) => next.add(item.id));
      return next;
    });
  };

  const handleToggleSelect = (id: string, checked: boolean) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const stats = useMemo(() => {
    return [
      {
        label: "Tổng bài viết",
        value: total,
        icon: <Tag className="h-4 w-4 text-[#063e8e]" />,
      },
      {
        label: "Đang hiển thị",
        value: publishedTotal,
        icon: <Tag className="h-4 w-4 text-[#063e8e]" />,
      },
      {
        label: "Tin nổi bật",
        value: featuredTotal,
        icon: <Tag className="h-4 w-4 text-[#063e8e]" />,
      },
    ];
  }, [featuredTotal, publishedTotal, total]);

  const handleDelete = async () => {
    if (deleteTargets.length === 0 || isDeleting) return;

    setIsDeleting(true);
    const targetIds = deleteTargets.map((item) => item.id);

    try {
      const results = await Promise.allSettled(
        targetIds.map((id) => deleteApiV10PostId(id)),
      );
      const succeededIds = new Set(
        targetIds.filter((_, index) => results[index]?.status === "fulfilled"),
      );
      const failedCount = targetIds.length - succeededIds.size;

      setSelectedIds(
        (current) =>
          new Set(Array.from(current).filter((id) => !succeededIds.has(id))),
      );
      setDeleteTargets([]);

      if (succeededIds.size > 0) {
        toast.success(
          succeededIds.size === 1
            ? "Đã xóa bài viết"
            : `Đã xóa ${succeededIds.size} bài viết`,
        );
      }
      if (failedCount > 0) {
        toast.warning(
          `${failedCount} bài viết chưa thể xóa. Vui lòng thử lại.`,
        );
      }

      await reload();
    } catch {
      toast.error("Không thể xóa bài viết");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkHide = async () => {
    if (selectedItems.length === 0 || isBulkHiding) return;

    setIsBulkHiding(true);
    const targetIds = selectedItems.map((item) => item.id);

    try {
      const results = await Promise.allSettled(
        targetIds.map((id) =>
          putApiV10PostId(id, {
            is_hidden: true,
            is_active: false,
          }),
        ),
      );
      const succeededIds = new Set(
        targetIds.filter((_, index) => results[index]?.status === "fulfilled"),
      );
      const failedCount = targetIds.length - succeededIds.size;

      setSelectedIds(
        (current) =>
          new Set(Array.from(current).filter((id) => !succeededIds.has(id))),
      );

      if (succeededIds.size > 0) {
        toast.success(
          succeededIds.size === 1
            ? "Đã ẩn bài viết"
            : `Đã ẩn ${succeededIds.size} bài viết`,
        );
      }
      if (failedCount > 0) {
        toast.warning(
          `${failedCount} bài viết chưa thể ẩn. Vui lòng thử lại.`,
        );
      }

      await reload();
    } catch {
      toast.error("Không thể ẩn bài viết");
    } finally {
      setIsBulkHiding(false);
    }
  };

  const handleToggleVisibility = async (item: AdminNewsItem) => {
    if (togglingVisibilityId) return;

    const nextIsHidden = !item.is_hidden;
    setTogglingVisibilityId(item.id);

    try {
      await updatePost.mutateAsync({
        id: item.id,
        data: {
          is_hidden: nextIsHidden,
          is_active: !nextIsHidden,
        },
      });
      toast.success(nextIsHidden ? "Đã ẩn bài viết" : "Đã hiển thị bài viết");
      await reload();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Không thể thay đổi trạng thái hiển thị",
      );
    } finally {
      setTogglingVisibilityId(null);
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      clearSelection();
      setPage(newPage);
    }
  };

  return (
    <div className="space-y-8">
      <AdminStatsGrid items={stats} />

      <AdminTableLayout
        searchValue={search}
        searchPlaceholder="Tìm kiếm bài viết..."
        actionLabel="Thêm bài viết"
        actionIcon={<Plus className="mr-2 h-4 w-4" />}
        onSearchChange={(value) => {
          clearSelection();
          setSearch(value);
          setPage(1);
        }}
        onActionClick={() =>
          router.push(`/admin/posts/new`)
        }
        filters={
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                clearSelection();
                setStatusFilter(value);
                setPage(1);
              }}
            >
              <SelectTrigger className={selectTriggerClassName}>
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent className={selectContentClassName}>
                <SelectItem value="all" className={selectItemClassName}>
                  Tất cả trạng thái
                </SelectItem>
                <SelectItem value="visible" className={selectItemClassName}>
                  Đang hiển thị
                </SelectItem>
                <SelectItem value="hidden" className={selectItemClassName}>
                  Đang ẩn
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      >
        {selectedCount > 0 ? (
          <div className="flex flex-wrap items-center gap-3 border-b border-[#063e8e]/10 bg-[#063e8e]/[0.04] px-4 py-3">
            <p className="mr-auto text-sm text-gray-700">
              Đã chọn <strong className="text-[#063e8e]">{selectedCount}</strong>{" "}
              bài viết
            </p>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={isBulkHiding}
              onClick={() => void handleBulkHide()}
              className="border-amber-200 bg-white text-amber-700 hover:bg-amber-50 hover:text-amber-800"
            >
              <EyeOff className="mr-2 h-4 w-4" />
              {isBulkHiding ? "Đang ẩn..." : "Ẩn bài viết"}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={isDeleting}
              onClick={() => setDeleteTargets(selectedItems)}
              className="border-red-200 bg-white text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Xóa bài viết
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={clearSelection}
              title="Bỏ chọn tất cả"
              aria-label="Bỏ chọn tất cả"
              className="h-8 w-8 text-gray-500 hover:bg-white hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : null}

        <div className="scrollbar overflow-x-auto">
          <Table className="min-w-[1220px] table-fixed">
            <TableHeader>
              <TableRow className="group border-0 bg-[#063e8e] hover:bg-[#063e8e]">
                <TableHead className="w-[72px] py-4 text-center text-white">
                  <div className="relative mx-auto flex h-6 w-6 items-center justify-center">
                    <span
                      className={
                        allPageSelected || somePageSelected
                          ? "text-xs font-semibold uppercase tracking-[0.12em] text-white opacity-0"
                          : "text-xs font-semibold uppercase tracking-[0.12em] text-white transition-opacity group-hover:opacity-0 group-focus-within:opacity-0"
                      }
                    >
                      STT
                    </span>
                    <Checkbox
                      checked={
                        allPageSelected
                          ? true
                          : somePageSelected
                            ? "indeterminate"
                            : false
                      }
                      onCheckedChange={(checked) =>
                        handleSelectAll(checked === true)
                      }
                      disabled={!ready || items.length === 0}
                      aria-label="Chọn tất cả bài viết trên trang"
                      title="Chọn tất cả bài viết trên trang"
                      className={
                        allPageSelected || somePageSelected
                          ? "absolute inset-0 m-auto border-white bg-white text-[#063e8e]"
                          : "absolute inset-0 m-auto border-white/60 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 data-[state=checked]:border-white data-[state=checked]:bg-white data-[state=checked]:text-[#063e8e] data-[state=indeterminate]:border-white data-[state=indeterminate]:bg-white data-[state=indeterminate]:text-[#063e8e]"
                      }
                    />
                  </div>
                </TableHead>
                <TableHead className="w-[240px] py-4 text-center text-white">
                  Tiêu đề
                </TableHead>
                <TableHead className="w-[130px] py-4 text-center text-white">
                  Hình ảnh đại diện
                </TableHead>
                <TableHead className="w-[200px] py-4 text-center text-white">
                  Trang hiển thị
                </TableHead>
                <TableHead className="w-[160px] py-4 text-center text-white">
                  Ngày xuất bản / Hết hạn
                </TableHead>
                <TableHead className="w-[140px] py-4 text-center text-white">
                  Người tạo
                </TableHead>
                <TableHead className="w-[140px] py-4 text-center text-white">
                  Cập nhật bởi
                </TableHead>
                <TableHead className="w-[120px] py-4 text-center text-white">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {!ready ? (
                <AdminNewsTableLoading />
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="py-12 text-center text-sm text-gray-700">
                    Không có bài viết nào phù hợp.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item, index) => {

                  return (
                    <TableRow
                      key={item.id}
                      className={
                        selectedIds.has(item.id)
                          ? "group bg-[#063e8e]/[0.07] hover:bg-[#063e8e]/[0.09]"
                          : index % 2 === 0
                            ? "group bg-white"
                            : "group bg-[#063e8e]/[0.03]"
                      }
                    >
                      <TableCell className="text-center">
                        <div className="relative mx-auto flex h-6 w-6 items-center justify-center leading-none">
                          <span
                            className={
                              selectedIds.has(item.id)
                                ? "flex h-6 w-6 items-center justify-center text-sm font-semibold leading-none text-[#063e8e] opacity-0"
                                : "flex h-6 w-6 items-center justify-center text-sm font-semibold leading-none text-gray-700 transition-opacity group-hover:opacity-0 group-focus-within:opacity-0"
                            }
                          >
                            {(page - 1) * pageSize + index + 1}
                          </span>
                          <Checkbox
                            checked={selectedIds.has(item.id)}
                            onCheckedChange={(checked) =>
                              handleToggleSelect(item.id, checked === true)
                            }
                            aria-label={`Chọn bài viết ${item.title}`}
                            title={`Chọn bài viết ${item.title}`}
                            className={
                              selectedIds.has(item.id)
                                ? "absolute inset-0 m-auto border-[#063e8e] bg-[#063e8e]"
                                : "absolute inset-0 m-auto border-[#063e8e]/30 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
                            }
                          />
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="space-y-2">
                          <p className="line-clamp-2 text-sm font-semibold text-black">
                            {item.title}
                          </p>
                          {item.is_featured ? (
                            <span className="inline-flex items-center rounded-full border border-[#063e8e]/20 bg-[#063e8e]/10 px-2.5 py-1 text-xs font-medium text-[#063e8e]">
                              <Star className="mr-1.5 h-3.5 w-3.5 fill-current" />
                              Tin nổi bật
                            </span>
                          ) : null}
                        </div>
                      </TableCell>

                      <TableCell className="text-center">
                        <div className="relative mx-auto h-16 w-24 overflow-hidden rounded-xl border border-[#063e8e]/15 bg-[#063e8e]/[0.03]">
                          {item.thumbnail ? (
                            <SafeImage
                              src={item.thumbnail.url}
                              alt={item.thumbnail.alt || item.thumbnail.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-xs text-gray-700">
                              Không có ảnh
                            </div>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="text-center">
                        <span className="line-clamp-2 text-sm text-gray-700">
                          {item.page_configs.length > 0
                            ? item.page_configs.map((pageConfig) => pageConfig.name).join(", ")
                            : "—"}
                        </span>
                      </TableCell>

                      <TableCell className="text-center text-sm text-gray-700">
                        <div className="flex flex-col gap-0.5">
                          <span>{formatDateTime(item.published_at) || "—"}</span>
                          <span className="text-gray-500">{formatDateTime(item.expired_at) || "—"}</span>
                        </div>
                      </TableCell>

                      <TableCell className="text-center text-sm text-gray-700">
                        {item.creator ? (
                          <div className="flex flex-col gap-0.5">
                            <span className="font-medium text-[#1f3768]">
                              {item.creator.full_name}
                            </span>
                            <span className="text-gray-500">
                              {formatDateTime(item.created_at) || "—"}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </TableCell>

                      <TableCell className="text-center text-sm text-gray-700">
                        {item.editor && item.editor.id ? (
                          <div className="flex flex-col gap-0.5">
                            <span className="font-medium text-[#1f3768]">
                              {item.editor.full_name}
                            </span>
                            <span className="text-gray-500">
                              {formatDateTime(item.updated_at) || "—"}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </TableCell>

                      <TableCell className="text-center">
                        <AdminRowActions
                          actions={[
                            {
                              kind: item.is_hidden ? "hidden" : "visible",
                              label: item.is_hidden
                                ? "B\u00e0i vi\u1ebft \u0111ang \u1ea9n, b\u1ea5m \u0111\u1ec3 hi\u1ec3n th\u1ecb"
                                : "B\u00e0i vi\u1ebft \u0111ang hi\u1ec3n th\u1ecb, b\u1ea5m \u0111\u1ec3 \u1ea9n",
                              disabled: togglingVisibilityId === item.id,
                              onClick: () => void handleToggleVisibility(item),
                            },
                            {
                              kind: "edit",
                              label: "Chỉnh sửa bài viết",
                              onClick: () =>
                                router.push(`/admin/posts/${item.id}`),
                            },
                            {
                              kind: "delete",
                              label: "Xóa bài viết",
                              onClick: () => setDeleteTargets([item]),
                            },
                          ]}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-[#063e8e]/10 px-4 py-3">
            <div className="text-sm text-gray-700">
              Hiển thị {(page - 1) * pageSize + 1} đến{" "}
              {Math.min(page * pageSize, total)} của {total} bài viết
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-[#063e8e]/15 bg-white text-[#063e8e] hover:bg-[#063e8e]/10"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={page === pageNum ? "default" : "outline"}
                      size="icon"
                      className={
                        page === pageNum
                          ? "h-8 w-8 bg-[#063e8e] text-white hover:bg-[#063e8e]/90"
                          : "h-8 w-8 border-[#063e8e]/15 bg-white text-[#063e8e] hover:bg-[#063e8e]/10"
                      }
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-[#063e8e]/15 bg-white text-[#063e8e] hover:bg-[#063e8e]/10"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </AdminTableLayout>

      <AdminDeleteDialog
        open={deleteTargets.length > 0}
        title="Xóa bài viết"
        description={
          deleteTargets.length === 1 ? (
            <>
              Bài viết <strong>{deleteTargets[0].title}</strong> sẽ bị xóa khỏi dữ liệu quản trị.
            </>
          ) : deleteTargets.length > 1 ? (
            <>
              <strong>{deleteTargets.length} bài viết</strong> đã chọn sẽ bị xóa khỏi dữ liệu quản trị.
            </>
          ) : null
        }
        onOpenChange={(open) => {
          if (!open) setDeleteTargets([]);
        }}
        onConfirm={() => void handleDelete()}
      />
    </div>
  );
}

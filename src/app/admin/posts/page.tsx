"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Star,
  Tag,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdminDeleteDialog } from "@/components/admin/admin-delete-dialog";
import { AdminRowActions } from "@/components/admin/admin-row-actions";
import { AdminStatsGrid } from "@/components/admin/admin-stats-grid";
import { AdminTableLayout } from "@/components/admin/admin-table-layout";
import { SafeImage } from "@/components/shared/safe-image";
import { Button } from "@/components/ui/button";
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
  getGetApiV10PostQueryKey,
  useDeleteApiV10PostId,
  useGetApiV10Post,
  usePutApiV10PostId,
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
  const [deleteTarget, setDeleteTarget] = useState<AdminNewsItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
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
  const deletePost = useDeleteApiV10PostId();

  const result = (listData?.responseData ?? {}) as unknown as CmsPagedResult<CmsRawPostItem>;
  const items = useMemo(
    () => (result.rows ?? []).map((item) => transformPost(item)),
    [result.rows],
  );
  const total = result.count ?? 0;
  const ready = !isFetching;
  const publishedTotal =
    ((visibleStatsData?.responseData ?? {}) as unknown as CmsPagedResult<CmsRawPostItem>).count ?? 0;
  const featuredTotal =
    ((featuredStatsData?.responseData ?? {}) as unknown as CmsPagedResult<CmsRawPostItem>).count ?? 0;

  const reload = () =>
    queryClient.invalidateQueries({ queryKey: getGetApiV10PostQueryKey() });

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
    if (!deleteTarget || isDeleting) return;

    setIsDeleting(true);

    try {
      await deletePost.mutateAsync({ id: deleteTarget.id });
      toast.success("Đã xóa bài viết");
      setDeleteTarget(null);
      await reload();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Không thể xóa bài viết",
      );
    } finally {
      setIsDeleting(false);
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
        <div className="scrollbar overflow-x-auto">
          <Table className="min-w-[1120px] table-fixed">
            <TableHeader>
              <TableRow className="border-0 bg-[#063e8e] hover:bg-[#063e8e]">
                <TableHead className="w-[260px] py-4 text-center text-white">
                  Tiêu đề
                </TableHead>
                <TableHead className="w-[140px] py-4 text-center text-white">
                  Hình ảnh đại diện
                </TableHead>
                <TableHead className="w-[220px] py-4 text-center text-white">
                  Trang hiển thị
                </TableHead>
                <TableHead className="w-[170px] py-4 text-center text-white">
                  Ngày xuất bản / Hết hạn
                </TableHead>
                <TableHead className="w-[150px] py-4 text-center text-white">
                  Người tạo
                </TableHead>
                <TableHead className="w-[150px] py-4 text-center text-white">
                  Cập nhật bởi
                </TableHead>
                <TableHead className="w-[130px] py-4 text-center text-white">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {!ready ? (
                <AdminNewsTableLoading />
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-12 text-center text-sm text-gray-700">
                    Không có bài viết nào phù hợp.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item, index) => {

                  return (
                    <TableRow
                      key={item.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-[#063e8e]/[0.03]"}
                    >
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
                              onClick: () => setDeleteTarget(item),
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
        open={!!deleteTarget}
        title="Xóa bài viết"
        description={
          deleteTarget ? (
            <>
              Bài viết <strong>{deleteTarget.title}</strong> sẽ bị xóa khỏi dữ liệu quản trị.
            </>
          ) : null
        }
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        onConfirm={() => void handleDelete()}
      />
    </div>
  );
}

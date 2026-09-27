"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  FileText,
  Plus,
  Star,
} from "lucide-react";
import { AdminDeleteDialog } from "@/components/admin/admin-delete-dialog";
import { AdminRowActions } from "@/components/admin/admin-row-actions";
import { AdminStatsGrid } from "@/components/admin/admin-stats-grid";
import { AdminTableLayout } from "@/components/admin/admin-table-layout";
import { Pagination } from "@/components/shared/pagination";
import { SafeImage } from "@/components/shared/safe-image";
import { Button } from "@/components/ui/button";
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
} from "@/api/endpoints/post";
import { useGetApiV10HeaderConfig } from "@/api/endpoints/header-config";
import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";
import type { PageConfig } from "@/api/models/pageConfig";
import {
  type CmsNewsItem,
  type CmsPagedResult,
  type CmsRawPostItem,
  type CmsHeaderConfigItem,
  buildHeaderConfigTree,
  buildHeaderItemsFromHeaderConfigs,
  transformPost,
} from "@/utils/cms-transforms";
import { HeaderConfigPostsLoading } from "./_components/HeaderConfigPostsLoading";
import { formatDateTime } from "@/utils/date";

const PAGE_SIZE = 10;

export default function HeaderConfigPostsPage() {
  const params = useParams();
  const router = useRouter();
  const headerConfigId = String(params.headerConfigId ?? "");
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<CmsNewsItem | null>(null);
  const [page, setPage] = useState(1);

  const { data: headerConfigData, isFetching: headerConfigsFetching } = useGetApiV10HeaderConfig({
    page: 1,
    pageSize: 200,
    sortField: "sort_order",
    sortOrder: "asc",
  });
  const { data: pageConfigData } = useGetApiV10PageConfig({
    page: 1,
    pageSize: 200,
    sortField: "path",
    sortOrder: "asc",
  });
  const deletePost = useDeleteApiV10PostId();

  const headerItems = useMemo(() => {
    const headerConfigResult =
      (headerConfigData?.responseData ?? {}) as unknown as CmsPagedResult<CmsHeaderConfigItem>;
    return buildHeaderItemsFromHeaderConfigs(
      buildHeaderConfigTree(headerConfigResult.rows ?? []),
    );
  }, [headerConfigData]);

  const headerConfig = useMemo(
    () => headerItems.find((item) => item.id === headerConfigId) ?? null,
    [headerConfigId, headerItems],
  );

  const matchedPageConfig = useMemo(() => {
    if (!headerConfig) return null;
    const pageConfigs =
      ((pageConfigData?.responseData ?? {}) as { rows?: PageConfig[] }).rows ?? [];
    const leaf = `/${(headerConfig.static_link || "").split("/").filter(Boolean).pop() ?? ""}`;
    return pageConfigs.find((item) => item.path === leaf) ?? null;
  }, [headerConfig, pageConfigData]);

  const keyword = search.trim();
  const filters = [
    matchedPageConfig ? `page_config_id==${matchedPageConfig.id}` : "",
    keyword ? `title@=${keyword}|slug@=${keyword}` : "",
  ].filter(Boolean).join(",");

  const { data: newsData, isFetching: postsFetching } = useGetApiV10Post(
    {
      page,
      pageSize: PAGE_SIZE,
      sortField: "created_at",
      sortOrder: "desc",
      filters: filters || undefined,
    },
    { query: { enabled: Boolean(matchedPageConfig) } },
  );

  const newsResult = (newsData?.responseData ?? {}) as unknown as CmsPagedResult<CmsRawPostItem>;
  const items = useMemo(
    () => (newsResult.rows ?? []).map((item) => transformPost(item)),
    [newsResult.rows],
  );
  const total = newsResult.count ?? 0;

  const ready = !postsFetching && !headerConfigsFetching;

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const createHref = `/admin/posts/new`;

  useEffect(() => {
    if (!ready) return;
    if (!headerConfig) {
      router.replace("/admin/header-config");
    }
  }, [headerConfig, ready, router]);

  const stats = useMemo(() => {
    return [
      {
        label: "Tổng bài viết",
        value: total,
        icon: <FileText className="h-4 w-4 text-[#063e8e]" />,
      },
      {
        label: "Đang hiển thị",
        value: items.filter((item) => !item.is_hidden).length,
        icon: <FileText className="h-4 w-4 text-[#063e8e]" />,
      },
      {
        label: "Tin nổi bật",
        value: items.filter((item) => item.is_featured).length,
        icon: <Star className="h-4 w-4 text-[#063e8e]" />,
      },
    ];
  }, [items, total]);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deletePost.mutateAsync({ id: deleteTarget.id });
      toast.success("Đã xóa bài viết");
      setDeleteTarget(null);
      if (items.length === 1 && page > 1) setPage(page - 1);
      await queryClient.invalidateQueries({ queryKey: getGetApiV10PostQueryKey() });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể xóa bài viết");
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (!ready || !headerConfig) {
    return (
      <div className="rounded-2xl border border-[#063e8e]/15 bg-white p-8 text-center text-sm text-gray-700 shadow-sm">
        Đang tải dữ liệu danh mục...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          asChild
          className="border-[#063e8e]/15 bg-white text-gray-700 hover:bg-[#063e8e]/10 hover:text-[#063e8e]"
        >
          <Link href="/admin/header-config">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>

        <div>
          <h1 className="text-xl font-semibold text-[#063e8e]">
            Quản lý bài viết: {headerConfig.name}
          </h1>
          <p className="text-sm text-gray-700">
            Quản lý toàn bộ bài viết thuộc danh mục hiển thị tương ứng trong quản lý bài viết.
          </p>
        </div>
      </div>

      <AdminStatsGrid items={stats} />

      <AdminTableLayout
        searchValue={search}
        searchPlaceholder="Tìm kiếm bài viết thuộc danh mục..."
        actionLabel="Thêm bài viết"
        actionIcon={<Plus className="mr-2 h-4 w-4" />}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onActionClick={() =>
          router.push(createHref)
        }
      >
        <div className="scrollbar overflow-x-auto">
          <Table className="min-w-[900px] table-fixed">
            <TableHeader>
              <TableRow className="border-0 bg-[#063e8e] hover:bg-[#063e8e]">
                <TableHead className="w-[300px] py-4 text-center text-white">
                  Tiêu đề
                </TableHead>
                <TableHead className="w-[150px] py-4 text-center text-white">
                  Hình ảnh đại diện
                </TableHead>
                <TableHead className="w-[170px] py-4 text-center text-white">
                  Ngày xuất bản
                </TableHead>
                <TableHead className="w-[170px] py-4 text-center text-white">
                  Ngày hết hạn
                </TableHead>
                <TableHead className="w-[130px] py-4 text-center text-white">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!ready ? (
                <HeaderConfigPostsLoading />
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-12 text-center text-sm text-gray-700">
                    {total === 0
                      ? "Danh mục này chưa có bài viết nào."
                      : "Không có bài viết nào phù hợp."}
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item, index) => (
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

                    <TableCell className="text-center text-sm text-gray-700">
                      {formatDateTime(item.published_at)}
                    </TableCell>

                    <TableCell className="text-center text-sm text-gray-700">
                      {formatDateTime(item.expired_at)}
                    </TableCell>

                    <TableCell className="text-center">
                      <AdminRowActions
                        actions={[
                          {
                            kind: item.is_hidden ? "hidden" : "visible",
                            label: item.is_hidden
                              ? "Bài viết đang ẩn"
                              : "Bài viết đang hiển thị",
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
                ))
              )}
            </TableBody>
          </Table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-[#063e8e]/10 px-4 py-3">
            <div className="text-sm text-gray-700">
              Hiển thị {(page - 1) * PAGE_SIZE + 1} đến{" "}
              {Math.min(page * PAGE_SIZE, total)} của {total} bài viết
            </div>
            <Pagination page={page} pageCount={totalPages} onChangePage={handlePageChange} />
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
        onConfirm={handleDelete}
      />
    </div>
  );
}

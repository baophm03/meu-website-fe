"use client";

import { ImageIcon, PencilLine, Plus, Trash2 } from "lucide-react";
import { AdminTableLayout } from "@/components/admin/admin-table-layout";
import { Pagination } from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/shared/safe-image";
import { Skeleton } from "@/components/ui/skeleton";

import { resolveCmsFileUrl } from "@/utils/file";
import { PAGE_SIZE, type Banner } from "./types";

interface BannerTableProps {
  search: string;
  onSearchChange: (value: string) => void;
  isReady: boolean;
  onActionClick: () => void;
  items: Banner[];
  total: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit: (item: Banner) => void;
  onDelete: (item: Banner) => void;
}

export function BannerTable({
  search,
  onSearchChange,
  isReady,
  onActionClick,
  items,
  total,
  page,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
}: BannerTableProps) {
  return (
    <AdminTableLayout
      contentClassName=""
      searchValue={search}
      searchPlaceholder="Tìm theo tiêu đề hoặc mô tả (vi/en)..."
      actionLabel="Thêm banner"
      actionIcon={<Plus className="mr-2 h-4 w-4" />}
      actionDisabled={!isReady}
      actionMeta={
        <div className="rounded-xl border border-[#063e8e]/15 bg-[#f8fbff] px-4 py-2 text-sm font-semibold text-[#163b73]">
          Tổng số banner: {total}
        </div>
      }
      onSearchChange={onSearchChange}
      onActionClick={onActionClick}
    >
      <div className="space-y-6">
        {!isReady ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-[#063e8e]/10 bg-white shadow-sm"
              >
                <Skeleton className="aspect-[16/9] w-full rounded-none" />
                <div className="flex items-center justify-between gap-2 p-4">
                  <Skeleton className="h-6 w-12 rounded-md" />
                  <Skeleton className="h-9 w-24 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#063e8e]/20 bg-white px-6 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf2ff]">
              <ImageIcon className="h-6 w-6 text-[#063e8e]" />
            </div>
            <p className="text-sm font-semibold text-[#163b73]">Chưa có banner nào</p>
            <p className="text-sm text-gray-700">Thêm banner đầu tiên để hiển thị trên hero trang chủ.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-[#063e8e]/10 bg-white shadow-sm transition hover:border-[#063e8e]/25 hover:shadow-md"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-[#063e8e]/[0.04]">
                  {item.image?.path ? (
                    <SafeImage
                      src={resolveCmsFileUrl(item.image.path)}
                      alt={item.title ?? "Banner"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#063e8e]/40">
                      <ImageIcon className="h-8 w-8" />
                      <span className="text-xs font-semibold">Chưa có ảnh</span>
                    </div>
                  )}
                  {!item.is_active ? (
                    <div className="absolute left-3 top-3">
                      <Badge className="border border-red-200 bg-red-50 text-red-600 hover:bg-red-50">
                        Ẩn
                      </Badge>
                    </div>
                  ) : null}
                </div>

                <div className="flex items-center justify-between gap-2 px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#eaf2ff] px-2.5 py-1 text-sm font-bold tabular-nums text-[#063e8e]">
                    #{item.display_order}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="icon"
                      title="Chỉnh sửa"
                      aria-label="Chỉnh sửa banner"
                      className="h-9 w-9 border border-[#063e8e]/15 bg-white text-[#063e8e] hover:border-[#063e8e]/25 hover:bg-[#063e8e]/10"
                      onClick={() => onEdit(item)}
                    >
                      <PencilLine className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      title="Xóa"
                      aria-label="Xóa banner"
                      className="h-9 w-9 border border-red-100 bg-white text-red-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                      onClick={() => onDelete(item)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 ? (
          <div className="flex flex-col gap-3 rounded-2xl border border-[#063e8e]/10 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-700">
              Trang {page} / {totalPages} · {total} banner
            </p>
            <Pagination pageCount={totalPages} page={page} onChangePage={onPageChange} />
          </div>
        ) : null}
      </div>
    </AdminTableLayout>
  );
}

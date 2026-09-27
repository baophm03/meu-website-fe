"use client";

import { formatDate } from "@/utils/date";
import { Briefcase, MapPin, Plus, Star } from "lucide-react";
import { AdminRowActions } from "@/components/admin/admin-row-actions";
import { AdminTableLayout } from "@/components/admin/admin-table-layout";
import { Pagination } from "@/components/shared/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PAGE_SIZE, type Job } from "./types";

interface JobsTableProps {
  search: string;
  onSearchChange: (value: string) => void;
  isReady: boolean;
  onActionClick: () => void;
  items: Job[];
  total: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit: (item: Job) => void;
  onDelete: (item: Job) => void;
}

export function JobsTable({
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
}: JobsTableProps) {
  return (
    <AdminTableLayout
      searchValue={search}
      searchPlaceholder="Tìm kiếm vị trí tuyển dụng..."
      actionLabel="Thêm vị trí"
      actionIcon={<Plus className="mr-2 h-4 w-4" />}
      actionDisabled={!isReady}
      actionMeta={
        <div className="rounded-xl border border-[#063e8e]/15 bg-[#f8fbff] px-4 py-2 text-sm font-semibold text-[#163b73]">
          Tổng số: {total}
        </div>
      }
      onSearchChange={onSearchChange}
      onActionClick={onActionClick}
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-[#063e8e] hover:bg-[#063e8e]">
            <TableHead className="w-[280px] py-4 text-center text-white">
              Vị trí
            </TableHead>
            <TableHead className="py-4 text-center text-white">Phòng ban</TableHead>
            <TableHead className="py-4 text-center text-white">Địa điểm</TableHead>
            <TableHead className="w-[120px] py-4 text-center text-white">
              Hình thức
            </TableHead>
            <TableHead className="w-[120px] py-4 text-center text-white">
              Hạn nộp
            </TableHead>
            <TableHead className="w-[110px] py-4 text-center text-white">
              Trạng thái
            </TableHead>
            <TableHead className="w-[120px] py-4 text-center text-white">
              Thao tác
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isReady ? (
            Array.from({ length: 4 }).map((_, index) => (
              <TableRow key={index} className="hover:bg-transparent">
                {Array.from({ length: 7 }).map((__, cellIndex) => (
                  <TableCell key={cellIndex} className="py-4">
                    <div className="h-5 rounded-full bg-[#063e8e]/10" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="py-14 text-center text-gray-700">
                Không có vị trí tuyển dụng nào phù hợp.
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id} className="hover:bg-[#063e8e]/[0.03]">
                <TableCell className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#063e8e]/10 bg-[#063e8e]/[0.05] text-[#063e8e]">
                      <Briefcase className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 font-semibold text-[#163b73]">
                        <span className="truncate">{item.title}</span>
                        {item.is_featured ? (
                          <Star className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400" />
                        ) : null}
                      </div>
                      <div className="truncate font-mono text-xs text-gray-500">
                        {item.slug}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-4 text-sm text-gray-700">
                  {item.department ?? "-"}
                </TableCell>
                <TableCell className="px-4 py-4 text-sm text-gray-700">
                  {item.location ? (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-[#063e8e]" />
                      {item.location}
                    </span>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell className="px-4 py-4 text-center text-sm text-gray-700">
                  {item.employment_type ?? "-"}
                </TableCell>
                <TableCell className="px-4 py-4 text-center text-sm text-gray-700">
                  {item.apply_deadline ? formatDate(item.apply_deadline) : "-"}
                </TableCell>
                <TableCell className="px-4 py-4 text-center">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      item.is_active
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {item.is_active ? "Đang mở" : "Đã đóng"}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-4">
                  <AdminRowActions
                    actions={[
                      { kind: "edit", label: "Chỉnh sửa", onClick: () => onEdit(item) },
                      { kind: "delete", label: "Xóa vị trí", onClick: () => onDelete(item) },
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {totalPages > 1 ? (
        <div className="flex flex-col gap-3 border-t border-[#063e8e]/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-gray-700">
            Hiển thị {(page - 1) * PAGE_SIZE + 1} đến{" "}
            {Math.min(page * PAGE_SIZE, total)} của {total} vị trí
          </div>
          <Pagination
            page={page}
            pageCount={totalPages}
            onChangePage={onPageChange}
          />
        </div>
      ) : null}
    </AdminTableLayout>
  );
}

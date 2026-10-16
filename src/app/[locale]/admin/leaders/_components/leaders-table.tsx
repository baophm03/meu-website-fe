"use client";

import { Linkedin, Mail, Plus, UserCircle2 } from "lucide-react";
import { AdminRowActions } from "@/components/admin/admin-row-actions";
import { AdminTableLayout } from "@/components/admin/admin-table-layout";
import { Pagination } from "@/components/shared/pagination";
import { SafeImage } from "@/components/shared/safe-image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { resolveCmsFileUrl } from "@/utils/file";

import { PAGE_SIZE, type Leader } from "./types";

interface LeadersTableProps {
  search: string;
  onSearchChange: (value: string) => void;
  isReady: boolean;
  onActionClick: () => void;
  items: Leader[];
  total: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit: (item: Leader) => void;
  onDelete: (item: Leader) => void;
}

const tenureLabel = (item: Leader) => {
  if (!item.started_at && !item.ended_at) return "-";
  const start = item.started_at ? new Date(item.started_at).getFullYear() : "?";
  if (!item.ended_at) return `${start} - nay`;
  return `${start} - ${new Date(item.ended_at).getFullYear()}`;
};

export function LeadersTable({
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
}: LeadersTableProps) {
  return (
    <AdminTableLayout
      searchValue={search}
      searchPlaceholder="Tìm kiếm lãnh đạo..."
      actionLabel="Thêm lãnh đạo"
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
              Lãnh đạo
            </TableHead>
            <TableHead className="py-4 text-center text-white">Chức vụ</TableHead>
            <TableHead className="w-[140px] py-4 text-center text-white">
              Thời gian
            </TableHead>
            <TableHead className="py-4 text-center text-white">Liên hệ</TableHead>
            <TableHead className="w-[90px] py-4 text-center text-white">
              Thứ tự
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
                Không có lãnh đạo nào phù hợp.
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id} className="hover:bg-[#063e8e]/[0.03]">
                <TableCell className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#063e8e]/10 bg-[#063e8e]/[0.05] text-[#063e8e]">
                      {item.avatar?.path ? (
                        <SafeImage
                          src={resolveCmsFileUrl(item.avatar.path)}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <UserCircle2 className="h-6 w-6" />
                      )}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate font-semibold text-[#163b73]">
                        {item.name}
                      </div>
                      <div className="truncate font-mono text-xs text-gray-500">
                        {item.slug}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-4 text-sm text-gray-700">
                  {item.position ?? "-"}
                </TableCell>
                <TableCell className="px-4 py-4 text-center text-sm text-gray-700">
                  {tenureLabel(item)}
                </TableCell>
                <TableCell className="px-4 py-4 text-sm text-gray-700">
                  <div className="flex flex-col gap-1">
                    {item.email ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-[#063e8e]" />
                        {item.email}
                      </span>
                    ) : null}
                    {item.linkedin_url ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Linkedin className="h-3.5 w-3.5 text-[#063e8e]" />
                        LinkedIn
                      </span>
                    ) : null}
                    {!item.email && !item.linkedin_url ? "-" : null}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-4 text-center text-sm text-gray-700">
                  {item.display_order}
                </TableCell>
                <TableCell className="px-4 py-4 text-center">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      item.is_active
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {item.is_active ? "Hiển thị" : "Ẩn"}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-4">
                  <AdminRowActions
                    actions={[
                      { kind: "edit", label: "Chỉnh sửa", onClick: () => onEdit(item) },
                      { kind: "delete", label: "Xóa lãnh đạo", onClick: () => onDelete(item) },
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
            {Math.min(page * PAGE_SIZE, total)} của {total} lãnh đạo
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

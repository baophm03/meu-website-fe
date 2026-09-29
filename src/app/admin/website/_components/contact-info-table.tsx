"use client";

import { formatDate } from "@/utils/date";
import { Contact, Plus } from "lucide-react";
import { AdminRowActions } from "@/components/admin/admin-row-actions";
import { AdminTableLayout } from "@/components/admin/admin-table-layout";
import { Pagination } from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PAGE_SIZE, type ContactInfo } from "./types";

interface ContactInfoTableProps {
  search: string;
  onSearchChange: (value: string) => void;
  isReady: boolean;
  onActionClick: () => void;
  items: ContactInfo[];
  total: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit: (item: ContactInfo) => void;
  onDelete: (item: ContactInfo) => void;
}

export function ContactInfoTable({
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
}: ContactInfoTableProps) {
  return (
    <AdminTableLayout
      searchValue={search}
      searchPlaceholder="Tìm theo key hoặc giá trị..."
      actionLabel="Thêm thông tin"
      actionIcon={<Plus className="mr-2 h-4 w-4" />}
      actionDisabled={!isReady}
      actionMeta={
        <div className="rounded-xl border border-[#063e8e]/15 bg-[#f8fbff] px-4 py-2 text-sm font-semibold text-[#163b73]">
          Tổng số mục: {total}
        </div>
      }
      onSearchChange={onSearchChange}
      onActionClick={onActionClick}
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-[#063e8e] hover:bg-[#063e8e]">
            <TableHead className="w-[200px] py-4 text-center text-white">Key</TableHead>
            <TableHead className="py-4 text-center text-white">Giá trị</TableHead>
            <TableHead className="w-[110px] py-4 text-center text-white">Thứ tự</TableHead>
            <TableHead className="w-[130px] py-4 text-center text-white">Trạng thái</TableHead>
            <TableHead className="w-[170px] py-4 text-center text-white">Ngày cập nhật</TableHead>
            <TableHead className="w-[120px] py-4 text-center text-white">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isReady ? (
            Array.from({ length: 4 }).map((_, index) => (
              <TableRow key={index} className="hover:bg-transparent">
                {Array.from({ length: 6 }).map((__, cellIndex) => (
                  <TableCell key={cellIndex} className="py-4">
                    <div className="h-5 rounded-full bg-[#063e8e]/10" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="py-14 text-center text-gray-700">
                Không có thông tin liên hệ nào phù hợp.
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id} className="hover:bg-[#063e8e]/[0.03]">
                <TableCell className="px-4 py-4">
                  <Badge
                    variant="outline"
                    className="rounded-full border-[#063e8e]/20 bg-[#063e8e]/[0.04] px-3 py-1 font-mono text-[#063e8e]"
                  >
                    <Contact className="mr-1.5 h-3.5 w-3.5" />
                    {item.key}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[320px] truncate px-4 py-4 text-gray-700">
                  {item.value ?? "—"}
                </TableCell>
                <TableCell className="px-4 py-4 text-center text-gray-700">
                  {item.display_order}
                </TableCell>
                <TableCell className="px-4 py-4 text-center">
                  <Badge
                    variant="outline"
                    className={
                      item.is_active
                        ? "rounded-full border-emerald-600/20 bg-emerald-600/[0.06] px-3 py-1 text-emerald-700"
                        : "rounded-full border-gray-400/20 bg-gray-400/[0.06] px-3 py-1 text-gray-600"
                    }
                  >
                    {item.is_active ? "Hiển thị" : "Ẩn"}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-4 text-center text-gray-700">
                  {formatDate(item.updated_at)}
                </TableCell>
                <TableCell className="px-4 py-4">
                  <AdminRowActions
                    actions={[
                      { kind: "edit", label: "Chỉnh sửa", onClick: () => onEdit(item) },
                      { kind: "delete", label: "Xóa", onClick: () => onDelete(item) },
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
            {Math.min(page * PAGE_SIZE, total)} của {total} mục
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

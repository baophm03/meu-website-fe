"use client";

import { formatDate } from "@/utils/date";
import { Building2, Globe, Phone, Plus, Star } from "lucide-react";
import { AdminRowActions } from "@/components/admin/admin-row-actions";
import { AdminTableLayout } from "@/components/admin/admin-table-layout";
import { SafeImage } from "@/components/shared/safe-image";
import { Pagination } from "@/components/shared/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { resolveCmsFileUrl } from "@/utils/file";

import { PAGE_SIZE, type Partner } from "./types";

interface PartnersTableProps {
  search: string;
  onSearchChange: (value: string) => void;
  isReady: boolean;
  onActionClick: () => void;
  items: Partner[];
  total: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit: (item: Partner) => void;
  onDelete: (item: Partner) => void;
}

export function PartnersTable({
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
}: PartnersTableProps) {
  return (
    <AdminTableLayout
      searchValue={search}
      searchPlaceholder="Tìm kiếm đối tác..."
      actionLabel="Thêm đối tác"
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
            <TableHead className="w-[300px] py-4 text-center text-white">
              Đối tác
            </TableHead>
            <TableHead className="py-4 text-center text-white">Website</TableHead>
            <TableHead className="py-4 text-center text-white">Điện thoại</TableHead>
            <TableHead className="w-[110px] py-4 text-center text-white">
              Đánh giá
            </TableHead>
            <TableHead className="w-[150px] py-4 text-center text-white">
              Ngày tạo
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
                Không có đối tác nào phù hợp.
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id} className="hover:bg-[#063e8e]/[0.03]">
                <TableCell className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    {item.logo?.path ? (
                      <SafeImage
                        src={resolveCmsFileUrl(item.logo.path)}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-lg border border-[#063e8e]/10 bg-white object-contain"
                      />
                    ) : (
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#063e8e]/10 bg-[#063e8e]/[0.05] text-[#063e8e]">
                        <Building2 className="h-5 w-5" />
                      </span>
                    )}
                    <div>
                      <div className="font-semibold text-[#163b73]">{item.name}</div>
                      <div className="font-mono text-xs text-gray-500">{item.slug}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-4 text-sm text-gray-700">
                  {item.website ? (
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#063e8e] hover:underline"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      {item.website.replace(/^https?:\/\//, "").replace(/\/+$/, "")}
                    </a>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell className="px-4 py-4 text-sm text-gray-700">
                  {item.phone ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-[#063e8e]" />
                      {item.phone}
                    </span>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell className="px-4 py-4 text-center text-sm text-gray-700">
                  {item.rating != null ? (
                    <span className="inline-flex items-center gap-1 font-medium text-amber-500">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {item.rating.toFixed(1)}
                    </span>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell className="px-4 py-4 text-center text-gray-700">
                  {formatDate(item.created_at)}
                </TableCell>
                <TableCell className="px-4 py-4">
                  <AdminRowActions
                    actions={[
                      { kind: "edit", label: "Chỉnh sửa", onClick: () => onEdit(item) },
                      { kind: "delete", label: "Xóa đối tác", onClick: () => onDelete(item) },
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
            {Math.min(page * PAGE_SIZE, total)} của {total} đối tác
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

"use client";

import * as React from "react";

import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  getGetApiV10ContactQueryKey,
  useDeleteApiV10ContactId,
  useGetApiV10Contact,
  usePutApiV10ContactId,
} from "@/api/endpoints/contact";
import type { Contact, ContactCreate } from "@/api/models";
import { ContactStatus } from "@/api/models/contactStatus";
import { AdminDeleteDialog } from "@/components/admin/admin-delete-dialog";
import { AdminRowActions } from "@/components/admin/admin-row-actions";
import { AdminTableLayout } from "@/components/admin/admin-table-layout";
import { ContactManagementDetailDialog } from "@/components/admin/contact-management-detail-dialog";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/shared/pagination";
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
import { useMemo, useState } from "react";
import { formatDateTime } from "@/utils/date";

const PAGE_SIZE = 10;

const selectTriggerClassName =
  "w-full rounded-xl border-[#063e8e]/15 bg-white text-gray-700 data-[placeholder]:text-gray-700 focus:ring-[#063e8e]/30 lg:w-[220px]";

const selectContentClassName = "border-[#063e8e]/15 bg-white text-gray-700";
const selectItemClassName = "text-gray-700 focus:bg-[#063e8e]/10 focus:text-[#063e8e]";

const STATUS_LABELS: Record<string, string> = {
  [ContactStatus.new]: "Mới",
  [ContactStatus.seen]: "Đã xem",
  [ContactStatus.replied]: "Đã phản hồi",
};

const STATUS_BADGE_CLASSES: Record<string, string> = {
  [ContactStatus.new]: "border-amber-500/30 bg-amber-50 text-amber-700",
  [ContactStatus.seen]: "border-[#063e8e]/25 bg-[#063e8e]/[0.04] text-[#063e8e]",
  [ContactStatus.replied]: "border-emerald-500/30 bg-emerald-50 text-emerald-700",
};

export default function AdminContactRequestsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [detailTarget, setDetailTarget] = useState<Contact | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Contact | null>(null);
  const [page, setPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryParams = useMemo(() => {
    const keyword = search.trim();
    const filters = [
      keyword
        ? `fullname@=${keyword}|email@=${keyword}|phone@=${keyword}|title@=${keyword}`
        : null,
      statusFilter !== "all" ? `status=${statusFilter}` : null,
    ]
      .filter(Boolean)
      .join(";");

    return {
      page,
      pageSize: PAGE_SIZE,
      sortField: "created_at",
      sortOrder: "desc" as const,
      filters: filters || undefined,
    };
  }, [page, search, statusFilter]);

  const { data, isFetching } = useGetApiV10Contact(queryParams);
  const updateContact = usePutApiV10ContactId();
  const deleteContact = useDeleteApiV10ContactId();

  const result = (data?.responseData ?? {}) as { rows?: Contact[]; count?: number };
  const items = result.rows ?? [];
  const total = result.count ?? 0;
  const ready = !isFetching;

  const invalidateContacts = () =>
    queryClient.invalidateQueries({ queryKey: getGetApiV10ContactQueryKey() });

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const updateStatus = async (item: Contact, status: ContactStatus) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await updateContact.mutateAsync({
        id: item.id,
        data: {
          fullname: item.fullname,
          email: item.email,
          phone: item.phone,
          title: item.title,
          content: item.content,
          status,
        } as ContactCreate,
      });
      toast.success("Đã cập nhật trạng thái");
      await invalidateContacts();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Không thể cập nhật trạng thái",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDetail = async (item: Contact) => {
    setDetailTarget(item);
    if (item.status === ContactStatus.new) {
      await updateStatus(item, ContactStatus.seen);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget || isSubmitting) return;
    setIsSubmitting(true);

    try {
      await deleteContact.mutateAsync({ id: deleteTarget.id });
      toast.success("Đã xóa lead");
      setDeleteTarget(null);
      await invalidateContacts();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể xóa lead");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <AdminTableLayout
        searchValue={search}
        searchPlaceholder="Tìm kiếm liên hệ..."
        actionMeta={
          <div className="rounded-xl border border-[#063e8e]/15 bg-[#f8fbff] px-4 py-2 text-sm font-semibold text-[#163b73]">
            Tổng số liên hệ: {total}
          </div>
        }
        filters={
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
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value} className={selectItemClassName}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      >
        <div className="scrollbar overflow-x-auto">
          <Table className="min-w-[1100px]">
            <TableHeader>
              <TableRow className="border-0 bg-[#063e8e] hover:bg-[#063e8e]">
                <TableHead className="w-16 py-4 text-center text-white">STT</TableHead>
                <TableHead className="py-4 text-center text-white">Tiêu đề</TableHead>
                <TableHead className="py-4 text-center text-white">Người liên hệ</TableHead>
                <TableHead className="w-[220px] py-4 text-center text-white">Email</TableHead>
                <TableHead className="w-[130px] py-4 text-center text-white">Trạng thái</TableHead>
                <TableHead className="w-[170px] py-4 text-center text-white">Ngày gửi</TableHead>
                <TableHead className="w-[130px] py-4 text-center text-white">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!ready ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <TableRow key={`loading-${index}`}>
                    <TableCell colSpan={7} className="px-4 py-4">
                      <div className="h-10 animate-pulse rounded-xl bg-[#063e8e]/10" />
                    </TableCell>
                  </TableRow>
                ))
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-16 text-center text-gray-400">
                    Không có lead nào
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item, index) => (
                  <TableRow
                    key={item.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-[#063e8e]/3"}
                  >
                    <TableCell className="py-3 text-center text-sm text-gray-500">
                      {(page - 1) * PAGE_SIZE + index + 1}
                    </TableCell>
                    <TableCell className="py-3 text-sm text-gray-800">
                      <div className="font-medium">{item.title}</div>
                    </TableCell>
                    <TableCell className="py-3 text-sm text-gray-800">
                      <div className="space-y-1">
                        <div className="font-semibold">{item.fullname}</div>
                        <div className="text-gray-600">{item.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-sm text-gray-700">
                      {item.email}
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      <Badge
                        variant="outline"
                        className={STATUS_BADGE_CLASSES[item.status] ?? ""}
                      >
                        {STATUS_LABELS[item.status] ?? item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 text-center text-sm text-gray-700">
                      {formatDateTime(item.created_at)}
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      <AdminRowActions
                        actions={[
                          {
                            kind: "view",
                            label: "Xem chi tiết lead",
                            onClick: () => void openDetail(item),
                          },
                          ...(item.status !== ContactStatus.replied
                            ? [
                              {
                                kind: "check" as const,
                                label: "Đánh dấu đã phản hồi",
                                onClick: () =>
                                  void updateStatus(item, ContactStatus.replied),
                              },
                            ]
                            : []),
                          {
                            kind: "delete",
                            label: "Xóa lead",
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

        {totalPages > 1 ? (
          <div className="flex flex-col gap-3 border-t border-[#063e8e]/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-gray-700">
              Hiển thị {(page - 1) * PAGE_SIZE + 1} đến{" "}
              {Math.min(page * PAGE_SIZE, total)} của {total}
            </div>
            <Pagination page={page} pageCount={totalPages} onChangePage={setPage} />
          </div>
        ) : null}
      </AdminTableLayout>

      <ContactManagementDetailDialog
        open={!!detailTarget}
        title="Chi tiết lead"
        description="Thông tin đầy đủ của yêu cầu liên hệ được gửi từ website."
        badge={
          detailTarget ? (
            <Badge
              variant="outline"
              className={STATUS_BADGE_CLASSES[detailTarget.status] ?? ""}
            >
              {STATUS_LABELS[detailTarget.status] ?? detailTarget.status}
            </Badge>
          ) : null
        }
        sections={
          detailTarget
            ? [
              {
                title: "Thông tin chung",
                fields: [
                  { label: "Tiêu đề", value: detailTarget.title, fullWidth: true },
                  { label: "Ngày gửi", value: formatDateTime(detailTarget.created_at) },
                  {
                    label: "Trạng thái",
                    value:
                      STATUS_LABELS[detailTarget.status] ?? detailTarget.status,
                  },
                ],
              },
              {
                title: "Người liên hệ",
                fields: [
                  { label: "Họ tên", value: detailTarget.fullname },
                  { label: "Email", value: detailTarget.email },
                  { label: "Điện thoại", value: detailTarget.phone },
                  {
                    label: "Nội dung",
                    value: detailTarget.content,
                    fullWidth: true,
                  },
                ],
              },
            ]
            : []
        }
        onOpenChange={(open) => !open && setDetailTarget(null)}
      />

      <AdminDeleteDialog
        open={!!deleteTarget}
        title="Xóa lead"
        description={
          <>
            Bạn có chắc muốn xóa lead của{" "}
            <span className="font-semibold">{deleteTarget?.fullname}</span>? Hành động
            này không thể hoàn tác.
          </>
        }
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={() => void handleDelete()}
      />
    </div>
  );
}

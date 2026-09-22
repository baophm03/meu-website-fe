"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Columns3, Plus } from "lucide-react";
import { toast } from "sonner";
import { AdminDeleteDialog } from "@/components/admin/admin-delete-dialog";
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
import {
  deleteApiV10FooterId,
  getApiV10Footer,
} from "@/api/endpoints/footer";
import type { Footer } from "@/api/models/footer";

const PAGE_SIZE = 10;
const FOOTER_CREATE_ID = "00000000-0000-0000-0000-000000000000";

export default function AdminFooterPage() {
  const router = useRouter();
  const [items, setItems] = useState<Footer[]>([]);
  const [search, setSearch] = useState("");
  const [ready, setReady] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Footer | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const loadFooters = useCallback(async () => {
    setReady(false);

    try {
      const keyword = search.trim();
      const response = await getApiV10Footer({
        page,
        pageSize: PAGE_SIZE,
        sortField: "created_at",
        sortOrder: "desc",
        filters: keyword ? `language@=${keyword}` : undefined,
      });
      const pageData = (response as { responseData?: { rows?: Footer[]; count?: number } })
        .responseData ?? {};

      setItems(pageData.rows ?? []);
      setTotal(pageData.count ?? 0);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể tải danh sách footer");
      setItems([]);
      setTotal(0);
    } finally {
      setReady(true);
    }
  }, [page, search]);

  useEffect(() => {
    void loadFooters();
  }, [loadFooters]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;

    setDeleting(true);
    try {
      await deleteApiV10FooterId(String(deleteTarget.id));
      toast.success("Đã xóa footer");
      setDeleteTarget(null);
      await loadFooters();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể xóa footer");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      <AdminTableLayout
        searchValue={search}
        searchPlaceholder="Tìm theo ngôn ngữ (vi/en)..."
        actionLabel="Tạo footer"
        actionIcon={<Plus className="mr-2 h-4 w-4" />}
        actionMeta={
          <div className="rounded-xl border border-[#063e8e]/15 bg-[#f8fbff] px-4 py-2 text-sm font-semibold text-[#163b73]">
            Tổng số footer: {total}
          </div>
        }
        onSearchChange={setSearch}
        onActionClick={() => router.push(`/admin/footer/edit/${FOOTER_CREATE_ID}`)}
      >
        <Table>
          <TableHeader>
            <TableRow className="border-0 bg-[#063e8e] hover:bg-[#063e8e]">
              <TableHead className="w-16 py-4 text-center text-white">STT</TableHead>
              <TableHead className="py-4 text-center text-white">Ngôn ngữ</TableHead>
              <TableHead className="py-4 text-center text-white">Số cột</TableHead>
              <TableHead className="py-4 text-center text-white">Trạng thái</TableHead>
              <TableHead className="py-4 text-center text-white">Cập nhật</TableHead>
              <TableHead className="w-[120px] py-4 text-center text-white">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!ready ? (
              Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={`loading-${index}`}>
                  <TableCell colSpan={6} className="px-4 py-4">
                    <div className="h-10 animate-pulse rounded-xl bg-[#063e8e]/10" />
                  </TableCell>
                </TableRow>
              ))
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-16 text-center text-gray-400">
                  Chưa có footer nào. Tạo footer đầu tiên cho website.
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
                  <TableCell className="py-3 text-sm font-medium text-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#063e8e]/10 text-[#063e8e]">
                        <Columns3 className="h-4 w-4" />
                      </div>
                      <Badge variant="outline" className="uppercase">
                        {item.language}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-center text-sm text-gray-700">
                    {item.footer_columns?.length ?? 0} cột
                  </TableCell>
                  <TableCell className="py-3 text-center">
                    <Badge
                      className={
                        item.is_active
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-100"
                      }
                    >
                      {item.is_active ? "Đang hiển thị" : "Ẩn"}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 text-center text-sm text-gray-500">
                    {item.updated_at
                      ? new Date(item.updated_at).toLocaleDateString("vi-VN")
                      : "—"}
                  </TableCell>
                  <TableCell className="py-3 text-center">
                    <AdminRowActions
                      actions={[
                        {
                          kind: "edit",
                          label: "Chỉnh sửa footer",
                          onClick: () => router.push(`/admin/footer/edit/${item.id}`),
                        },
                        {
                          kind: "delete",
                          label: "Xóa footer",
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

        {totalPages > 1 ? (
          <div className="flex flex-col gap-3 border-t border-[#063e8e]/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-gray-700">
              Hiển thị {(page - 1) * PAGE_SIZE + 1} đến {Math.min(page * PAGE_SIZE, total)} của{" "}
              {total} footer
            </div>
            <Pagination page={page} pageCount={totalPages} onChangePage={setPage} />
          </div>
        ) : null}
      </AdminTableLayout>

      <AdminDeleteDialog
        open={!!deleteTarget}
        title="Xóa footer"
        description={
          <>
            Bạn có chắc muốn xóa footer ngôn ngữ{" "}
            <span className="font-semibold uppercase">{deleteTarget?.language}</span>? Tất cả cột,
            hàng và phần tử bên trong sẽ bị xóa vĩnh viễn.
          </>
        }
        onOpenChange={(open) => !open && !deleting && setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

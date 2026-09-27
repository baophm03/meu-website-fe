"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  getGetApiV10LeaderQueryKey,
  useDeleteApiV10LeaderId,
  useGetApiV10Leader,
} from "@/api/endpoints/leader";
import type { CmsPagedResult } from "@/utils/cms-transforms";

import { LeaderDeleteDialog } from "./_components/leader-delete-dialog";
import { LeadersTable } from "./_components/leaders-table";
import { PAGE_SIZE, type Leader } from "./_components/types";

export default function AdminLeadersPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Leader | null>(null);
  const [page, setPage] = useState(1);

  const keyword = search.trim();
  const { data, isFetching } = useGetApiV10Leader({
    page,
    pageSize: PAGE_SIZE,
    sortField: "display_order",
    sortOrder: "asc",
    filters: keyword
      ? `name@=${keyword}|slug@=${keyword}|position@=${keyword}|email@=${keyword}`
      : undefined,
  });
  const deleteLeader = useDeleteApiV10LeaderId();

  const result = (data?.responseData ?? {}) as unknown as CmsPagedResult<Leader>;
  const items = result.rows ?? [];
  const total = result.count ?? 0;
  const isReady = !isFetching;

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await deleteLeader.mutateAsync({ id: deleteTarget.id });
      toast.success("Xóa lãnh đạo thành công");
      setDeleteTarget(null);
      await queryClient.invalidateQueries({
        queryKey: getGetApiV10LeaderQueryKey(),
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể xóa lãnh đạo");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <LeadersTable
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        isReady={isReady}
        onActionClick={() => router.push("/admin/leaders/new")}
        items={items}
        total={total}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onEdit={(item) => router.push(`/admin/leaders/${item.id}`)}
        onDelete={setDeleteTarget}
      />

      <LeaderDeleteDialog
        target={deleteTarget}
        onTargetChange={setDeleteTarget}
        isSubmitting={isSubmitting}
        onConfirm={handleDelete}
      />
    </div>
  );
}

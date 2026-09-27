"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  getGetApiV10JobQueryKey,
  useDeleteApiV10JobId,
  useGetApiV10Job,
} from "@/api/endpoints/job";
import type { CmsPagedResult } from "@/utils/cms-transforms";

import { JobDeleteDialog } from "./_components/job-delete-dialog";
import { JobsTable } from "./_components/jobs-table";
import { PAGE_SIZE, type Job } from "./_components/types";

export default function AdminJobsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Job | null>(null);
  const [page, setPage] = useState(1);

  const keyword = search.trim();
  const { data, isFetching } = useGetApiV10Job({
    page,
    pageSize: PAGE_SIZE,
    sortField: "created_at",
    sortOrder: "desc",
    filters: keyword
      ? `title@=${keyword}|slug@=${keyword}|department@=${keyword}|location@=${keyword}|employment_type@=${keyword}`
      : undefined,
  });
  const deleteJob = useDeleteApiV10JobId();

  const result = (data?.responseData ?? {}) as unknown as CmsPagedResult<Job>;
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
      await deleteJob.mutateAsync({ id: deleteTarget.id });
      toast.success("Xóa vị trí thành công");
      setDeleteTarget(null);
      await queryClient.invalidateQueries({
        queryKey: getGetApiV10JobQueryKey(),
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể xóa vị trí");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <JobsTable
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        isReady={isReady}
        onActionClick={() => router.push("/admin/jobs/new")}
        items={items}
        total={total}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onEdit={(item) => router.push(`/admin/jobs/${item.id}`)}
        onDelete={setDeleteTarget}
      />

      <JobDeleteDialog
        target={deleteTarget}
        onTargetChange={setDeleteTarget}
        isSubmitting={isSubmitting}
        onConfirm={handleDelete}
      />
    </div>
  );
}

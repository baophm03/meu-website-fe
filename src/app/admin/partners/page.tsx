"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  getGetApiV10PartnerQueryKey,
  useDeleteApiV10PartnerId,
  useGetApiV10Partner,
  usePostApiV10Partner,
  usePutApiV10PartnerId,
} from "@/api/endpoints/partner";
import type { CmsPagedResult } from "@/utils/cms-transforms";

import { PartnerDeleteDialog } from "./_components/partner-delete-dialog";
import { PartnerFormDialog } from "./_components/partner-form-dialog";
import { PartnersTable } from "./_components/partners-table";
import {
  EMPTY_FORM,
  PAGE_SIZE,
  type Partner,
  type PartnerFormValues,
} from "./_components/types";
import { slugifyPartner } from "./_components/utils";

export default function AdminPartnersPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formValues, setFormValues] = useState<PartnerFormValues>(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState<Partner | null>(null);
  const [page, setPage] = useState(1);

  const keyword = search.trim();
  const { data, isFetching } = useGetApiV10Partner({
    page,
    pageSize: PAGE_SIZE,
    sortField: "name",
    sortOrder: "asc",
    filters: keyword ? `name@=${keyword}|slug@=${keyword}|website@=${keyword}` : undefined,
  });
  const createPartner = usePostApiV10Partner();
  const updatePartner = usePutApiV10PartnerId();
  const deletePartner = useDeleteApiV10PartnerId();

  const result = (data?.responseData ?? {}) as unknown as CmsPagedResult<Partner>;
  const items = result.rows ?? [];
  const total = result.count ?? 0;
  const isReady = !isFetching;

  const reload = () =>
    queryClient.invalidateQueries({ queryKey: getGetApiV10PartnerQueryKey() });

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const openCreate = () => {
    setFormValues(EMPTY_FORM);
    setFormOpen(true);
  };

  const openEdit = (item: Partner) => {
    setFormValues({
      id: item.id,
      name: item.name,
      slug: item.slug,
      logo_id: item.logo?.id ?? null,
      website: item.website ?? "",
      phone: item.phone ?? "",
      address: item.address ?? "",
      rating: item.rating != null ? String(item.rating) : "",
    });
    setFormOpen(true);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (!formValues.name.trim()) {
      toast.error("Tên đối tác là bắt buộc");
      return;
    }

    const ratingValue = formValues.rating.trim();
    const rating = ratingValue === "" ? null : Number(ratingValue);
    if (rating != null && (!Number.isFinite(rating) || rating < 0 || rating > 5)) {
      toast.error("Đánh giá phải trong khoảng 0 - 5");
      return;
    }

    const payload = {
      name: formValues.name.trim(),
      slug: formValues.slug.trim() || slugifyPartner(formValues.name),
      logo_id: formValues.logo_id || null,
      website: formValues.website.trim() || null,
      phone: formValues.phone.trim() || null,
      address: formValues.address.trim() || null,
      rating,
    };

    setIsSubmitting(true);

    try {
      if (formValues.id) {
        await updatePartner.mutateAsync({ id: formValues.id, data: payload });
        toast.success("Cập nhật đối tác thành công");
      } else {
        await createPartner.mutateAsync({ data: payload });
        toast.success("Tạo đối tác thành công");
      }

      await reload();
      setFormOpen(false);
      setFormValues(EMPTY_FORM);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể lưu đối tác");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await deletePartner.mutateAsync({ id: deleteTarget.id });
      toast.success("Xóa đối tác thành công");
      setDeleteTarget(null);
      await reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể xóa đối tác");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <PartnersTable
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        isReady={isReady}
        onActionClick={openCreate}
        items={items}
        total={total}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onEdit={openEdit}
        onDelete={setDeleteTarget}
      />

      <PartnerFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        formValues={formValues}
        onFormValuesChange={setFormValues}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />

      <PartnerDeleteDialog
        target={deleteTarget}
        onTargetChange={setDeleteTarget}
        isSubmitting={isSubmitting}
        onConfirm={handleDelete}
      />
    </div>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteApiV10BannerId,
  getGetApiV10BannerQueryKey,
  postApiV10Banner,
  putApiV10BannerId,
} from "@/api/endpoints/banner";
import type { BannerCreate } from "@/api/models/bannerCreate";
import type { GetApiV10BannerParams } from "@/api/models/getApiV10BannerParams";

import { BannerDeleteDialog } from "./banner-delete-dialog";
import { BannerFormDialog } from "./banner-form-dialog";
import { BannerTable } from "./banner-table";
import { EMPTY_BANNER_FORM, PAGE_SIZE, type Banner, type BannerFormValues } from "./types";
import { buildBannerFilters, fetchBanners } from "./utils";

export function BannerPanel() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formValues, setFormValues] = useState<BannerFormValues>(EMPTY_BANNER_FORM);
  const [deleteTarget, setDeleteTarget] = useState<Banner | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 350);

    return () => window.clearTimeout(timer);
  }, [search]);

  const queryParams = useMemo<GetApiV10BannerParams>(
    () => ({
      page,
      pageSize: PAGE_SIZE,
      sortField: "display_order",
      sortOrder: "asc",
      filters: buildBannerFilters(debouncedSearch),
    }),
    [page, debouncedSearch],
  );

  const { data, isFetching } = useQuery({
    queryKey: getGetApiV10BannerQueryKey(queryParams),
    queryFn: () => fetchBanners(queryParams),
    placeholderData: (previous) => previous,
  });

  const items = data?.rows ?? [];
  const total = data?.count ?? 0;
  const isReady = !isFetching;

  const reload = useCallback(
    () => queryClient.invalidateQueries({ queryKey: getGetApiV10BannerQueryKey() }),
    [queryClient],
  );

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const openCreate = () => {
    setFormValues(EMPTY_BANNER_FORM);
    setFormOpen(true);
  };

  const openEdit = (item: Banner) => {
    setFormValues({
      id: item.id,
      title: item.title ?? "",
      title_en: item.title_en ?? "",
      description: item.description ?? "",
      description_en: item.description_en ?? "",
      image_id: item.image?.id ?? null,
      display_order: String(item.display_order ?? 0),
      is_active: item.is_active,
    });
    setFormOpen(true);
  };

  const buildPayload = (): { payload: BannerCreate; error: string | null } => {
    const displayOrder = Number.parseInt(formValues.display_order, 10);
    if (!Number.isInteger(displayOrder) || displayOrder < 0) {
      return { payload: {}, error: "Thứ tự hiển thị phải là số nguyên không âm" };
    }

    return {
      payload: {
        title: formValues.title.trim() || null,
        title_en: formValues.title_en.trim() || null,
        description: formValues.description.trim() || null,
        description_en: formValues.description_en.trim() || null,
        image_id: formValues.image_id ?? null,
        display_order: displayOrder,
        is_active: formValues.is_active,
      },
      error: null,
    };
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const { payload, error } = buildPayload();
    if (error) {
      toast.error(error);
      return;
    }

    setIsSubmitting(true);

    try {
      if (formValues.id) {
        await putApiV10BannerId(formValues.id, payload);
        toast.success("Cập nhật banner thành công");
      } else {
        await postApiV10Banner(payload);
        toast.success("Thêm banner thành công");
      }

      await reload();
      setFormOpen(false);
      setFormValues(EMPTY_BANNER_FORM);
    } catch (submitError) {
      toast.error(submitError instanceof Error ? submitError.message : "Không thể lưu banner");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await deleteApiV10BannerId(deleteTarget.id);
      toast.success("Xóa banner thành công");
      setDeleteTarget(null);
      await reload();
    } catch (deleteError) {
      toast.error(deleteError instanceof Error ? deleteError.message : "Không thể xóa banner");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <BannerTable
        search={search}
        onSearchChange={setSearch}
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

      <BannerFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        formValues={formValues}
        onFormValuesChange={setFormValues}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />

      <BannerDeleteDialog
        target={deleteTarget}
        onTargetChange={setDeleteTarget}
        isSubmitting={isSubmitting}
        onConfirm={handleDelete}
      />
    </div>
  );
}

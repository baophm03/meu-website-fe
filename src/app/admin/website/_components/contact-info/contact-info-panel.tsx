"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  getGetApiV10ContactInfoQueryKey,
  useDeleteApiV10ContactInfoId,
  useGetApiV10ContactInfo,
  usePostApiV10ContactInfo,
  usePutApiV10ContactInfoId,
} from "@/api/endpoints/contact-info";
import type { CmsPagedResult } from "@/utils/cms-transforms";

import { ContactInfoDeleteDialog } from "./contact-info-delete-dialog";
import { ContactInfoFormDialog } from "./contact-info-form-dialog";
import { ContactInfoTable } from "./contact-info-table";
import { EMPTY_FORM, PAGE_SIZE, type ContactInfo, type ContactInfoFormValues } from "./types";
import { normalizeKey } from "./utils";

export function ContactInfoPanel() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formValues, setFormValues] = useState<ContactInfoFormValues>(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState<ContactInfo | null>(null);
  const [page, setPage] = useState(1);

  const keyword = search.trim();
  const { data, isFetching } = useGetApiV10ContactInfo({
    page,
    pageSize: PAGE_SIZE,
    sortField: "display_order",
    sortOrder: "asc",
    filters: keyword ? `key@=${keyword}|value@=${keyword}` : undefined,
  });
  const createContactInfo = usePostApiV10ContactInfo();
  const updateContactInfo = usePutApiV10ContactInfoId();
  const deleteContactInfo = useDeleteApiV10ContactInfoId();

  const result = (data?.responseData ?? {}) as unknown as CmsPagedResult<ContactInfo>;
  const items = result.rows ?? [];
  const total = result.count ?? 0;
  const isReady = !isFetching;

  const reload = () =>
    queryClient.invalidateQueries({ queryKey: getGetApiV10ContactInfoQueryKey() });

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

  const openEdit = (item: ContactInfo) => {
    setFormValues({
      id: item.id,
      key: item.key,
      value: item.value ?? "",
      display_order: String(item.display_order ?? 0),
      is_active: item.is_active,
    });
    setFormOpen(true);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const key = normalizeKey(formValues.key);
    if (!key) {
      toast.error("Key là bắt buộc");
      return;
    }

    const displayOrder = Number.parseInt(formValues.display_order, 10);

    setIsSubmitting(true);

    try {
      if (formValues.id) {
        await updateContactInfo.mutateAsync({
          id: formValues.id,
          data: {
            key,
            value: formValues.value.trim() || null,
            display_order: Number.isInteger(displayOrder) ? displayOrder : 0,
            is_active: formValues.is_active,
          },
        });
        toast.success("Cập nhật thông tin liên hệ thành công");
      } else {
        await createContactInfo.mutateAsync({
          data: {
            key,
            value: formValues.value.trim() || null,
            display_order: Number.isInteger(displayOrder) ? displayOrder : 0,
            is_active: formValues.is_active,
          },
        });
        toast.success("Thêm thông tin liên hệ thành công");
      }

      await reload();
      setFormOpen(false);
      setFormValues(EMPTY_FORM);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể lưu thông tin liên hệ");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await deleteContactInfo.mutateAsync({ id: deleteTarget.id });
      toast.success("Xóa thông tin liên hệ thành công");
      setDeleteTarget(null);
      await reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể xóa thông tin liên hệ");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <ContactInfoTable
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

      <ContactInfoFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        formValues={formValues}
        onFormValuesChange={setFormValues}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />

      <ContactInfoDeleteDialog
        target={deleteTarget}
        onTargetChange={setDeleteTarget}
        isSubmitting={isSubmitting}
        onConfirm={handleDelete}
      />
    </div>
  );
}

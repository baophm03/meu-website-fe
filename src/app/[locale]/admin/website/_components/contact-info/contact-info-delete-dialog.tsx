"use client";

import { AdminDeleteDialog } from "@/components/admin/admin-delete-dialog";

import type { ContactInfo } from "./types";

interface ContactInfoDeleteDialogProps {
  target: ContactInfo | null;
  onTargetChange: (target: ContactInfo | null) => void;
  isSubmitting: boolean;
  onConfirm: () => void;
}

export function ContactInfoDeleteDialog({
  target,
  onTargetChange,
  onConfirm,
}: ContactInfoDeleteDialogProps) {
  return (
    <AdminDeleteDialog
      open={!!target}
      title="Xóa thông tin liên hệ"
      description={
        target ? (
          <>
            Bạn có chắc chắn muốn xóa mục <strong>{target.key}</strong>?
          </>
        ) : (
          ""
        )
      }
      onOpenChange={(open) => {
        if (!open) {
          onTargetChange(null);
        }
      }}
      onConfirm={() => void onConfirm()}
    />
  );
}

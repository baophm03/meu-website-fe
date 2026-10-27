"use client";

import { AdminDeleteDialog } from "@/components/admin/admin-delete-dialog";

import type { Partner } from "./types";

interface PartnerDeleteDialogProps {
  target: Partner | null;
  onTargetChange: (target: Partner | null) => void;
  isSubmitting: boolean;
  onConfirm: () => void;
}

export function PartnerDeleteDialog({
  target,
  onTargetChange,
  onConfirm,
}: PartnerDeleteDialogProps) {
  return (
    <AdminDeleteDialog
      open={!!target}
      title="Xóa đối tác"
      description={
        target ? (
          <>
            Bạn có chắc chắn muốn xóa <strong>{target.name}</strong>?
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

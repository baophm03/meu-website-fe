"use client";

import { AdminDeleteDialog } from "@/components/admin/admin-delete-dialog";

import type { Leader } from "./types";

interface LeaderDeleteDialogProps {
  target: Leader | null;
  onTargetChange: (target: Leader | null) => void;
  isSubmitting: boolean;
  onConfirm: () => void;
}

export function LeaderDeleteDialog({
  target,
  onTargetChange,
  onConfirm,
}: LeaderDeleteDialogProps) {
  return (
    <AdminDeleteDialog
      open={!!target}
      title="Xóa lãnh đạo"
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

"use client";

import { AdminDeleteDialog } from "@/components/admin/admin-delete-dialog";

import type { Job } from "./types";

interface JobDeleteDialogProps {
  target: Job | null;
  onTargetChange: (target: Job | null) => void;
  isSubmitting: boolean;
  onConfirm: () => void;
}

export function JobDeleteDialog({
  target,
  onTargetChange,
  onConfirm,
}: JobDeleteDialogProps) {
  return (
    <AdminDeleteDialog
      open={!!target}
      title="Xóa vị trí tuyển dụng"
      description={
        target ? (
          <>
            Bạn có chắc chắn muốn xóa <strong>{target.title}</strong>?
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

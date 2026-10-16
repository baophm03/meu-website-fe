"use client";

import { AdminDeleteDialog } from "@/components/admin/admin-delete-dialog";

import type { Banner } from "./types";

interface BannerDeleteDialogProps {
  target: Banner | null;
  onTargetChange: (target: Banner | null) => void;
  isSubmitting: boolean;
  onConfirm: () => void;
}

export function BannerDeleteDialog({ target, onTargetChange, onConfirm }: BannerDeleteDialogProps) {
  return (
    <AdminDeleteDialog
      open={!!target}
      title="Xóa banner"
      description={
        target ? (
          <>
            Bạn có chắc chắn muốn xóa banner <strong>{target.title ?? "(không tiêu đề)"}</strong>?
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

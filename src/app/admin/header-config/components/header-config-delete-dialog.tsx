"use client";

import * as React from "react";
import { AdminDeleteDialog } from "@/components/admin/admin-delete-dialog";
import { HeaderConfigTreeItem } from "../types";

interface HeaderConfigDeleteDialogProps {
  target: HeaderConfigTreeItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function HeaderConfigDeleteDialog({
  target,
  open,
  onOpenChange,
  onConfirm,
}: HeaderConfigDeleteDialogProps) {
  return (
    <AdminDeleteDialog
      open={open}
      title="Xóa danh mục"
      description={
        target
          ? `Bạn có chắc chắn muốn xóa "${target.name}"? Tất cả danh mục con trực thuộc cũng sẽ bị xóa.`
          : ""
      }
      onOpenChange={onOpenChange}
      onConfirm={onConfirm}
    />
  );
}

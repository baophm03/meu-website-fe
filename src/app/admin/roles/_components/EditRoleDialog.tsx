"use client";

import type { Dispatch, SetStateAction } from "react";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  EditForm,
  Role,
  SYSTEM_ROLES,
} from "./types";

interface EditRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRole: Role | null;
  editForm: EditForm;
  setEditForm: Dispatch<SetStateAction<EditForm>>;
  onSave: () => void;
  isPending: boolean;
}

export function EditRoleDialog({
  open,
  onOpenChange,
  selectedRole,
  editForm,
  setEditForm,
  onSave,
  isPending,
}: EditRoleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl border-[#063e8e]/15">
        <DialogHeader>
          <DialogTitle className="text-xl text-[#163b73]">
            {selectedRole ? "Sửa vai trò" : "Tạo vai trò mới"}
          </DialogTitle>
          <DialogDescription>
            {selectedRole
              ? "Cập nhật thông tin cơ bản của vai trò"
              : "Tạo vai trò mới — phân quyền sau qua nút Phân quyền"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 px-1 py-2">
          <div className="space-y-2">
            <Label className="text-gray-700">Tên vai trò *</Label>
            <Input
              value={editForm.name}
              onChange={(e) =>
                setEditForm((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Nhập tên vai trò..."
              className="rounded-xl border-[#063e8e]/15"
              disabled={!!selectedRole && SYSTEM_ROLES.includes(selectedRole.name)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700">Mô tả</Label>
            <Textarea
              value={editForm.description}
              onChange={(e) =>
                setEditForm((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Nhập mô tả vai trò..."
              className="rounded-xl border-[#063e8e]/15"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border-[#063e8e]/15"
          >
            Hủy
          </Button>
          <Button
            onClick={onSave}
            disabled={!editForm.name.trim() || isPending}
            className="rounded-xl bg-[#063e8e] text-white hover:bg-[#063e8e]/90"
          >
            {isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            <Check className="mr-1 h-4 w-4" />
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  EditForm,
  PermissionModuleDef,
  Role,
} from "./types";
import { hasPermissionInSet, permKey } from "@/config/permissions";

interface EditPermissionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRole: Role | null;
  editForm: EditForm;
  setEditForm: Dispatch<SetStateAction<EditForm>>;
  onTogglePermission: (module: string, action: string) => void;
  onSave: () => void;
  isPending: boolean;
  permissionModules: PermissionModuleDef[];
  isLoadingPermissions?: boolean;
}

export function EditPermissionsDialog({
  open,
  onOpenChange,
  selectedRole,
  editForm,
  setEditForm,
  onTogglePermission,
  onSave,
  isPending,
  permissionModules,
  isLoadingPermissions,
}: EditPermissionsDialogProps) {
  const totalPermissions = permissionModules.reduce(
    (sum, group) => sum + group.actions.length,
    0,
  );
  const allChecked =
    totalPermissions > 0 &&
    permissionModules.every((group) =>
      group.actions.every((perm) =>
        hasPermissionInSet(editForm.permissions, group.module, perm.action),
      ),
    );
  const someChecked = editForm.permissions.size > 0 && !allChecked;

  const setModulePermissions = (
    group: PermissionModuleDef,
    checked: boolean,
  ) => {
    setEditForm((prev) => {
      const next = new Set(prev.permissions);
      group.actions.forEach((perm) => {
        const key = permKey(group.module, perm.action);
        if (checked) next.add(key);
        else next.delete(key);
      });
      return { ...prev, permissions: next };
    });
  };

  const setAllPermissions = (checked: boolean) => {
    setEditForm((prev) => {
      if (!checked) return { ...prev, permissions: new Set() };
      const next = new Set(prev.permissions);
      permissionModules.forEach((group) =>
        group.actions.forEach((perm) =>
          next.add(permKey(group.module, perm.action)),
        ),
      );
      return { ...prev, permissions: next };
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-hidden rounded-3xl border-[#063e8e]/15 sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-[#163b73]">
            Phân quyền{selectedRole ? ` — ${selectedRole.name}` : ""}
          </DialogTitle>
          <DialogDescription>
            Chọn các quyền hạn áp dụng cho vai trò này
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 px-1 py-2">
          <div className="flex items-center justify-between">
            <Label className="text-gray-700">Quyền hạn *</Label>
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-500">
                Đã chọn: {editForm.permissions.size}/{totalPermissions}
              </span>
              <label className="flex cursor-pointer items-center gap-2">
                <Checkbox
                  checked={someChecked ? "indeterminate" : allChecked}
                  onCheckedChange={(checked) =>
                    setAllPermissions(checked === true)
                  }
                  className="border-[#063e8e]/30 data-[state=checked]:bg-[#063e8e] data-[state=indeterminate]:bg-[#063e8e]/60 data-[state=checked]:border-[#063e8e]"
                />
                <span className="text-sm font-medium text-[#163b73]">
                  Chọn tất cả
                </span>
              </label>
            </div>
          </div>
          <div className="max-h-[56vh] space-y-4 overflow-y-auto rounded-2xl border border-[#063e8e]/10 bg-[#f8fbff] p-4">
            {isLoadingPermissions && (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-5 w-5 animate-spin text-[#063e8e]" />
              </div>
            )}
            {!isLoadingPermissions && permissionModules.length === 0 && (
              <p className="py-4 text-center text-sm text-slate-500">
                Không tải được danh sách quyền
              </p>
            )}
            {permissionModules.map((group) => {
              const groupCheckedCount = group.actions.filter((perm) =>
                hasPermissionInSet(editForm.permissions, group.module, perm.action),
              ).length;
              const groupAllChecked =
                group.actions.length > 0 && groupCheckedCount === group.actions.length;
              const groupSomeChecked = groupCheckedCount > 0 && !groupAllChecked;
              return (
                <div
                  key={group.module}
                  className="rounded-xl border border-[#063e8e]/10 bg-white p-4"
                >
                  <div className="flex items-center justify-between gap-4 border-b border-[#063e8e]/10 pb-3">
                    <label className="flex cursor-pointer items-center gap-2.5">
                      <Checkbox
                        checked={groupSomeChecked ? "indeterminate" : groupAllChecked}
                        onCheckedChange={(checked) =>
                          setModulePermissions(group, checked === true)
                        }
                        className="border-[#063e8e]/30 data-[state=checked]:bg-[#063e8e] data-[state=indeterminate]:bg-[#063e8e]/60 data-[state=checked]:border-[#063e8e]"
                      />
                      <span className="leading-tight">
                        <span className="block text-sm font-semibold text-[#163b73]">
                          {group.label}
                        </span>
                        <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-wide text-slate-400">
                          {group.module} · {groupCheckedCount}/{group.actions.length}
                        </span>
                      </span>
                    </label>
                    {group.description ? (
                      <p className="hidden text-right text-xs text-slate-500 sm:block">
                        {group.description}
                      </p>
                    ) : null}
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-3 sm:grid-cols-3 lg:grid-cols-4">
                    {group.actions.map((perm) => {
                      const isChecked = hasPermissionInSet(editForm.permissions, group.module, perm.action);
                      return (
                        <label
                          key={perm.action}
                          className="flex cursor-pointer items-start gap-2"
                        >
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={() => onTogglePermission(group.module, perm.action)}
                            className="mt-0.5 border-[#063e8e]/30 data-[state=checked]:bg-[#063e8e] data-[state=checked]:border-[#063e8e]"
                          />
                          <span className="leading-tight">
                            <span className="block text-sm text-slate-800">
                              {perm.label}
                            </span>
                            <span className="mt-0.5 block text-[10px] uppercase tracking-wide text-slate-400">
                              {perm.action}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
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
            disabled={!selectedRole || isPending || isLoadingPermissions}
            className="rounded-xl bg-[#063e8e] text-white hover:bg-[#063e8e]/90"
          >
            {isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            <Check className="mr-1 h-4 w-4" />
            Lưu quyền hạn
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

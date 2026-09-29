"use client";

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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { fieldClassName, normalizeKey } from "./utils";
import type { ContactInfoFormValues } from "./types";

interface ContactInfoFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formValues: ContactInfoFormValues;
  onFormValuesChange: React.Dispatch<React.SetStateAction<ContactInfoFormValues>>;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function ContactInfoFormDialog({
  open,
  onOpenChange,
  formValues,
  onFormValuesChange,
  isSubmitting,
  onSubmit,
}: ContactInfoFormDialogProps) {
  const normalized = normalizeKey(formValues.key);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl border-[#063e8e]/15 bg-white text-gray-700 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-[#063e8e]">
            {formValues.id ? "Chỉnh sửa thông tin liên hệ" : "Thêm thông tin liên hệ"}
          </DialogTitle>
          <DialogDescription className="text-gray-700">
            Mỗi mục là một cặp key/value hiển thị trên trang liên hệ — ví dụ key{" "}
            <code className="rounded bg-[#063e8e]/[0.06] px-1">email</code>,{" "}
            <code className="rounded bg-[#063e8e]/[0.06] px-1">phone</code> hoặc{" "}
            <code className="rounded bg-[#063e8e]/[0.06] px-1">address</code>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label className="mb-1.5 block text-gray-700">
              Key <span className="text-red-600">*</span>
            </Label>
            <Input
              value={formValues.key}
              onChange={(event) =>
                onFormValuesChange((previous) => ({ ...previous, key: event.target.value }))
              }
              placeholder="vd: email, phone, zalo"
              disabled={!!formValues.id}
              className={fieldClassName}
            />
            {normalized ? (
              <p className="mt-1.5 text-xs text-gray-500">
                Lưu dưới dạng: <code className="font-mono">{normalized}</code>
              </p>
            ) : null}
          </div>

          <div>
            <Label className="mb-1.5 block text-gray-700">Giá trị</Label>
            <Textarea
              value={formValues.value}
              onChange={(event) =>
                onFormValuesChange((previous) => ({ ...previous, value: event.target.value }))
              }
              placeholder="vd: hello@meusolutions.com"
              rows={3}
              className={fieldClassName}
            />
          </div>

          <div>
            <Label className="mb-1.5 block text-gray-700">Thứ tự hiển thị</Label>
            <Input
              type="number"
              value={formValues.display_order}
              onChange={(event) =>
                onFormValuesChange((previous) => ({ ...previous, display_order: event.target.value }))
              }
              className={fieldClassName}
            />
          </div>

          <div className="flex items-center justify-between rounded-xl border border-[#063e8e]/15 px-4 py-3">
            <Label className="text-gray-700">Hiển thị trên website</Label>
            <Switch
              checked={formValues.is_active}
              onCheckedChange={(checked) =>
                onFormValuesChange((previous) => ({ ...previous, is_active: checked }))
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className="border-[#063e8e]/15 bg-white text-gray-700 hover:bg-[#063e8e]/10 hover:text-[#063e8e]"
            onClick={() => onOpenChange(false)}
          >
            Hủy
          </Button>
          <Button
            type="button"
            disabled={isSubmitting}
            className="bg-[#063e8e] text-white hover:bg-[#063e8e]/90"
            onClick={() => void onSubmit()}
          >
            {isSubmitting ? "Đang lưu..." : formValues.id ? "Cập nhật" : "Thêm mới"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

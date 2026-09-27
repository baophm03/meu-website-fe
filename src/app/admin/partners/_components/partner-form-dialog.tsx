"use client";

import { AdminImageField } from "@/components/admin/image-field";
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

import { fieldClassName, slugifyPartner } from "./utils";
import type { PartnerFormValues } from "./types";

interface PartnerFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formValues: PartnerFormValues;
  onFormValuesChange: React.Dispatch<React.SetStateAction<PartnerFormValues>>;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function PartnerFormDialog({
  open,
  onOpenChange,
  formValues,
  onFormValuesChange,
  isSubmitting,
  onSubmit,
}: PartnerFormDialogProps) {
  const setField = <K extends keyof PartnerFormValues>(key: K, value: PartnerFormValues[K]) =>
    onFormValuesChange((previous) => ({ ...previous, [key]: value }));

  const handleNameChange = (value: string) => {
    onFormValuesChange((previous) => ({
      ...previous,
      name: value,
      slug: previous.id ? previous.slug : slugifyPartner(value),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl border-[#063e8e]/15 bg-white text-gray-700 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-[#063e8e]">
            {formValues.id ? "Chỉnh sửa đối tác" : "Thêm đối tác"}
          </DialogTitle>
          <DialogDescription className="text-gray-700">
            Đối tác hiển thị trên trang Partners &amp; Clients và các block logo trên website.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <AdminImageField
            label="Logo"
            value={formValues.logo_id}
            onChange={(id) => setField("logo_id", id)}
          />

          <div>
            <Label className="mb-1.5 block text-gray-700">
              Tên đối tác <span className="text-red-600">*</span>
            </Label>
            <Input
              value={formValues.name}
              onChange={(event) => handleNameChange(event.target.value)}
              placeholder="VD: Vingroup"
              className={fieldClassName}
            />
          </div>

          <div>
            <Label className="mb-1.5 block text-gray-700">Slug</Label>
            <Input
              value={formValues.slug}
              onChange={(event) => setField("slug", event.target.value)}
              placeholder="vingroup"
              className={fieldClassName}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-1.5 block text-gray-700">Website</Label>
              <Input
                value={formValues.website}
                onChange={(event) => setField("website", event.target.value)}
                placeholder="https://example.com"
                className={fieldClassName}
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-gray-700">Điện thoại</Label>
              <Input
                value={formValues.phone}
                onChange={(event) => setField("phone", event.target.value)}
                placeholder="028 xxxx xxxx"
                className={fieldClassName}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
            <div>
              <Label className="mb-1.5 block text-gray-700">Địa chỉ</Label>
              <Input
                value={formValues.address}
                onChange={(event) => setField("address", event.target.value)}
                placeholder="Quận 1, TP. Hồ Chí Minh"
                className={fieldClassName}
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-gray-700">Đánh giá (0-5)</Label>
              <Input
                type="number"
                min={0}
                max={5}
                step={0.1}
                value={formValues.rating}
                onChange={(event) => setField("rating", event.target.value)}
                placeholder="5.0"
                className={fieldClassName}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="rounded-xl border-[#063e8e]/20 text-[#063e8e]"
          >
            Hủy
          </Button>
          <Button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="rounded-xl bg-[#063e8e] text-white hover:bg-[#063e8e]/90"
          >
            {isSubmitting ? "Đang lưu..." : "Lưu đối tác"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

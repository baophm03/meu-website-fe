"use client";

import * as React from "react";
import { ImagePlus, X } from "lucide-react";
import { AdminImagePicker } from "@/components/admin/image-picker";
import { SafeImage } from "@/components/shared/safe-image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getApiV10FileId } from "@/api/endpoints/file";
import type { File as CmsFileItem } from "@/api/models/file";
import { resolveCmsFileUrl } from "@/utils/file";

interface AdminImageFieldProps {
  label: string;
  required?: boolean;
  value: string | null;
  onChange: (id: string | null) => void;
}

export function AdminImageField({
  label,
  required,
  value,
  onChange,
}: AdminImageFieldProps) {
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [preview, setPreview] = React.useState("");

  React.useEffect(() => {
    if (!value) {
      setPreview("");
      return;
    }

    let cancelled = false;
    getApiV10FileId(value)
      .then((response) => {
        const file = (response as { responseData?: CmsFileItem }).responseData;
        if (!cancelled && file?.path) setPreview(resolveCmsFileUrl(file.path));
      })
      .catch(() => {
        if (!cancelled) setPreview("");
      });

    return () => {
      cancelled = true;
    };
  }, [value]);

  return (
    <div>
      <Label className="mb-1.5 block text-gray-700">
        {label} {required ? <span className="text-red-600">*</span> : null}
      </Label>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#063e8e]/25 bg-[#063e8e]/[0.04] text-[#063e8e] transition hover:bg-[#063e8e]/10"
        >
          {preview ? (
            <SafeImage src={preview} alt={label} fill className="object-cover" />
          ) : (
            <ImagePlus className="h-6 w-6" />
          )}
        </button>
        <div className="flex flex-col gap-1">
          <Button
            type="button"
            variant="outline"
            className="border-[#063e8e]/15 text-gray-700 hover:bg-[#063e8e]/10 hover:text-[#063e8e]"
            onClick={() => setPickerOpen(true)}
          >
            {value ? "Đổi hình" : "Chọn hình"}
          </Button>
          {value ? (
            <button
              type="button"
              className="flex items-center gap-1 text-xs text-red-600 hover:underline"
              onClick={() => onChange(null)}
            >
              <X className="h-3 w-3" /> Xóa hình
            </button>
          ) : null}
        </div>
      </div>

      <AdminImagePicker
        open={pickerOpen}
        selectedId={value}
        onOpenChange={setPickerOpen}
        onSelect={(item) => {
          onChange(item.id);
          setPreview(item.url);
          setPickerOpen(false);
        }}
      />
    </div>
  );
}

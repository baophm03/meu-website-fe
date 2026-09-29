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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

import { fieldClassName } from "../contact-info/utils";
import type { BannerFormValues } from "./types";

interface BannerFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formValues: BannerFormValues;
  onFormValuesChange: React.Dispatch<React.SetStateAction<BannerFormValues>>;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function BannerFormDialog({
  open,
  onOpenChange,
  formValues,
  onFormValuesChange,
  isSubmitting,
  onSubmit,
}: BannerFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl border-[#063e8e]/15 bg-white text-gray-700 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-[#063e8e]">
            {formValues.id ? "Chỉnh sửa banner" : "Thêm banner"}
          </DialogTitle>
          <DialogDescription className="text-gray-700">
            Banner hiển thị ở hero trang chủ. Tiêu đề và mô tả (vi/en) đều có thể để trống khi slide
            chỉ cần hình ảnh. Hai nút CTA được dùng mặc định chung cho toàn bộ banner.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <Tabs defaultValue="vi">
            <TabsList className="mb-4 h-auto rounded-2xl bg-[#eaf2ff] p-1.5">
              <TabsTrigger
                value="vi"
                className="rounded-xl px-4 py-2 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-[#063e8e]"
              >
                Tiếng Việt
              </TabsTrigger>
              <TabsTrigger
                value="en"
                className="rounded-xl px-4 py-2 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-[#063e8e]"
              >
                English
              </TabsTrigger>
            </TabsList>

            <TabsContent value="vi" className="space-y-4">
              <div>
                <Label className="mb-1.5 block text-gray-700">Tiêu đề (Tiếng Việt)</Label>
                <Input
                  value={formValues.title}
                  onChange={(event) =>
                    onFormValuesChange((previous) => ({ ...previous, title: event.target.value }))
                  }
                  placeholder="vd: Giải pháp kinh doanh thông minh"
                  className={fieldClassName}
                />
              </div>

              <div>
                <Label className="mb-1.5 block text-gray-700">Mô tả (Tiếng Việt)</Label>
                <Textarea
                  value={formValues.description}
                  onChange={(event) =>
                    onFormValuesChange((previous) => ({ ...previous, description: event.target.value }))
                  }
                  placeholder="vd: MeU Solutions đồng hành cùng doanh nghiệp..."
                  rows={3}
                  className={fieldClassName}
                />
              </div>
            </TabsContent>

            <TabsContent value="en" className="space-y-4">
              <div>
                <Label className="mb-1.5 block text-gray-700">Title (English)</Label>
                <Input
                  value={formValues.title_en}
                  onChange={(event) =>
                    onFormValuesChange((previous) => ({ ...previous, title_en: event.target.value }))
                  }
                  placeholder="e.g. Intelligent business solutions"
                  className={fieldClassName}
                />
              </div>

              <div>
                <Label className="mb-1.5 block text-gray-700">Description (English)</Label>
                <Textarea
                  value={formValues.description_en}
                  onChange={(event) =>
                    onFormValuesChange((previous) => ({ ...previous, description_en: event.target.value }))
                  }
                  placeholder="e.g. MeU Solutions accompanies your business..."
                  rows={3}
                  className={fieldClassName}
                />
              </div>
            </TabsContent>
          </Tabs>

          <AdminImageField
            label="Ảnh banner"
            value={formValues.image_id}
            onChange={(imageId) => onFormValuesChange((previous) => ({ ...previous, image_id: imageId }))}
          />

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

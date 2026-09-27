"use client";

import { type FormEvent, useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdminRichTextEditor } from "@/components/shared/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useQueryClient } from "@tanstack/react-query";
import {
  getGetApiV10JobQueryKey,
  useGetApiV10JobId,
  usePostApiV10Job,
  usePutApiV10JobId,
} from "@/api/endpoints/job";
import type { Job } from "@/api/models/job";
import { formatDateTime } from "@/utils/date";

import { FormSection } from "./_components/form-section";
import {
  EMPLOYMENT_TYPES,
  fieldClassName,
  readOnlyFieldClassName,
  slugifyJob,
  toDateTimeLocalValue,
} from "../_components/utils";
import { EMPTY_FORM, type JobFormValues } from "../_components/types";

export default function AdminJobDetailPage() {
  const params = useParams();
  const jobId = String(params.id ?? "");
  const isCreate = !jobId || jobId === "new";
  const backPath = "/admin/jobs";

  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<JobFormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: jobData, isFetching: jobFetching } = useGetApiV10JobId(jobId, {
    query: { enabled: !isCreate },
  });

  const createJob = usePostApiV10Job();
  const updateJob = usePutApiV10JobId();

  useEffect(() => {
    if (isCreate) {
      setForm({ ...EMPTY_FORM, published_at: toDateTimeLocalValue(new Date().toISOString()) });
      return;
    }
    const job = (jobData?.responseData ?? null) as Job | null;
    if (!job) return;
    setForm({
      id: job.id,
      title: job.title,
      slug: job.slug,
      summary: job.summary ?? "",
      description: job.description ?? "",
      department: job.department ?? "",
      location: job.location ?? "",
      employment_type: job.employment_type ?? "",
      apply_url: job.apply_url ?? "",
      apply_deadline: job.apply_deadline ? job.apply_deadline.slice(0, 10) : "",
      published_at: toDateTimeLocalValue(job.published_at),
      is_active: job.is_active,
      is_featured: job.is_featured,
      created_at: job.created_at,
      updated_at: job.updated_at,
    });
  }, [isCreate, jobData]);

  const handleField = <K extends keyof JobFormValues>(key: K, value: JobFormValues[K]) =>
    setForm((previous) => (previous ? { ...previous, [key]: value } : previous));

  const handleTitleChange = (value: string) =>
    setForm((previous) =>
      previous
        ? { ...previous, title: value, slug: previous.id ? previous.slug : slugifyJob(value) }
        : previous,
    );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form || isSubmitting) return;

    if (!form.title.trim()) {
      toast.error("Tên vị trí là bắt buộc");
      return;
    }
    if (!form.slug.trim()) {
      toast.error("Slug là bắt buộc");
      return;
    }

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      summary: form.summary.trim() || null,
      description: form.description.trim() || null,
      department: form.department.trim() || null,
      location: form.location.trim() || null,
      employment_type: form.employment_type || null,
      apply_url: form.apply_url.trim() || null,
      apply_deadline: form.apply_deadline || null,
      is_active: form.is_active,
      is_featured: form.is_featured,
      published_at: form.published_at ? new Date(form.published_at).toISOString() : null,
    };

    setIsSubmitting(true);

    try {
      if (isCreate) {
        await createJob.mutateAsync({ data: payload });
        toast.success("Tạo vị trí tuyển dụng thành công");
      } else {
        await updateJob.mutateAsync({ id: jobId, data: payload });
        toast.success("Cập nhật vị trí tuyển dụng thành công");
      }
      await queryClient.invalidateQueries({ queryKey: getGetApiV10JobQueryKey() });
      router.push(backPath);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể lưu vị trí tuyển dụng");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!form || (!isCreate && jobFetching)) {
    return (
      <div className="flex items-center justify-center rounded-3xl border border-[#063e8e]/10 bg-white/70 px-6 py-16 text-sm text-gray-700">
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          asChild
          className="border-[#063e8e]/15 bg-white text-gray-700 hover:bg-[#063e8e]/10 hover:text-[#063e8e]"
        >
          <Link href={backPath}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <FormSection title={isCreate ? "Tạo vị trí tuyển dụng" : "Chỉnh sửa vị trí tuyển dụng"}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {!isCreate ? (
              <>
                <div>
                  <Label className="mb-1.5 block text-gray-700">Ngày tạo</Label>
                  <Input
                    value={form.created_at ? formatDateTime(form.created_at) : ""}
                    readOnly
                    className={readOnlyFieldClassName}
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block text-gray-700">Ngày cập nhật</Label>
                  <Input
                    value={form.updated_at ? formatDateTime(form.updated_at) : ""}
                    readOnly
                    className={readOnlyFieldClassName}
                  />
                </div>
              </>
            ) : null}

            <div className="md:col-span-2">
              <Label className="mb-1.5 block text-gray-700">
                Tên vị trí <span className="text-red-600">*</span>
              </Label>
              <Input
                value={form.title}
                onChange={(event) => handleTitleChange(event.target.value)}
                placeholder="VD: Senior Backend Engineer (Node.js)"
                className={fieldClassName}
              />
            </div>

            <div className="md:col-span-2">
              <Label className="mb-1.5 block text-gray-700">
                Slug <span className="text-red-600">*</span>
              </Label>
              <Input
                value={form.slug}
                onChange={(event) => handleField("slug", event.target.value)}
                placeholder="senior-backend-engineer-node-js"
                className={fieldClassName}
              />
            </div>
          </div>
        </FormSection>

        <FormSection title="Thông tin tuyển dụng">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label className="mb-1.5 block text-gray-700">Phòng ban</Label>
              <Input
                value={form.department}
                onChange={(event) => handleField("department", event.target.value)}
                placeholder="VD: Kỹ thuật"
                className={fieldClassName}
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-gray-700">Địa điểm</Label>
              <Input
                value={form.location}
                onChange={(event) => handleField("location", event.target.value)}
                placeholder="VD: TP. Hồ Chí Minh"
                className={fieldClassName}
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-gray-700">Hình thức làm việc</Label>
              <Select
                value={form.employment_type}
                onValueChange={(value) => handleField("employment_type", value)}
              >
                <SelectTrigger className={fieldClassName}>
                  <SelectValue placeholder="Chọn hình thức" />
                </SelectTrigger>
                <SelectContent>
                  {EMPLOYMENT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1.5 block text-gray-700">Hạn nộp hồ sơ</Label>
              <Input
                type="date"
                value={form.apply_deadline}
                onChange={(event) => handleField("apply_deadline", event.target.value)}
                className={fieldClassName}
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-gray-700">Link ứng tuyển</Label>
              <Input
                value={form.apply_url}
                onChange={(event) => handleField("apply_url", event.target.value)}
                placeholder="https://... (để trống sẽ dẫn tới trang liên hệ)"
                className={fieldClassName}
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-gray-700">Ngày đăng</Label>
              <Input
                type="datetime-local"
                value={form.published_at}
                onChange={(event) => handleField("published_at", event.target.value)}
                className={fieldClassName}
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-[#063e8e]/[0.04] px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Trạng thái tuyển</p>
                  <p className="mt-1 text-sm font-medium text-[#063e8e]">
                    {form.is_active ? "Đang mở" : "Đã đóng"}
                  </p>
                </div>
                <Switch
                  checked={form.is_active}
                  onCheckedChange={(checked) => handleField("is_active", checked)}
                />
              </div>
            </div>
            <div className="rounded-xl border border-[#063e8e]/15 bg-[#063e8e]/[0.02] px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Vị trí nổi bật</p>
                  <p className="mt-1 text-sm text-gray-700">
                    Đánh dấu để ưu tiên hiển thị trên trang Careers.
                  </p>
                </div>
                <Switch
                  checked={form.is_featured}
                  onCheckedChange={(checked) => handleField("is_featured", checked)}
                />
              </div>
            </div>
          </div>
        </FormSection>

        <FormSection title="Mô tả ngắn">
          <AdminRichTextEditor
            value={form.summary}
            onChange={(value) => handleField("summary", value)}
            placeholder="Tóm tắt vị trí hiển thị trên danh sách tuyển dụng"
            minHeight={160}
          />
        </FormSection>

        <FormSection
          title="Mô tả chi tiết (JD)"
          description="Nội dung đầy đủ: trách nhiệm, yêu cầu, phúc lợi..."
        >
          <AdminRichTextEditor
            value={form.description}
            onChange={(value) => handleField("description", value)}
            placeholder="Nhập nội dung mô tả công việc"
            minHeight={320}
          />
        </FormSection>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            asChild
            className="border-[#063e8e]/15 bg-white text-gray-700 hover:bg-[#063e8e]/10 hover:text-[#063e8e]"
          >
            <Link href={backPath}>Hủy</Link>
          </Button>
          <Button
            className="bg-[#063e8e] text-white hover:bg-[#063e8e]/90"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang lưu..." : isCreate ? "Tạo vị trí" : "Cập nhật"}
          </Button>
        </div>
      </form>
    </div>
  );
}

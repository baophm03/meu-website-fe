"use client";

import { type FormEvent, useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdminImageField } from "@/components/admin/image-field";
import { AdminRichTextEditor } from "@/components/shared/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useQueryClient } from "@tanstack/react-query";
import {
  getGetApiV10LeaderQueryKey,
  useGetApiV10LeaderId,
  usePostApiV10Leader,
  usePutApiV10LeaderId,
} from "@/api/endpoints/leader";
import type { Leader } from "@/api/models/leader";
import { formatDateTime } from "@/utils/date";

import { FormSection } from "./_components/form-section";
import {
  fieldClassName,
  readOnlyFieldClassName,
  slugifyLeader,
  toDateValue,
} from "../_components/utils";
import { EMPTY_FORM, type LeaderFormValues } from "../_components/types";

export default function AdminLeaderDetailPage() {
  const params = useParams();
  const leaderId = String(params.id ?? "");
  const isCreate = !leaderId || leaderId === "new";
  const backPath = "/admin/leaders";

  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<LeaderFormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: leaderData, isFetching: leaderFetching } = useGetApiV10LeaderId(leaderId, {
    query: { enabled: !isCreate },
  });

  const createLeader = usePostApiV10Leader();
  const updateLeader = usePutApiV10LeaderId();

  useEffect(() => {
    if (isCreate) {
      setForm({ ...EMPTY_FORM });
      return;
    }
    const leader = (leaderData?.responseData ?? null) as Leader | null;
    if (!leader) return;
    setForm({
      id: leader.id,
      name: leader.name,
      slug: leader.slug,
      position: leader.position ?? "",
      bio: leader.bio ?? "",
      email: leader.email ?? "",
      phone: leader.phone ?? "",
      avatar_id: leader.avatar?.id ?? leader.avatar_id ?? null,
      linkedin_url: leader.linkedin_url ?? "",
      started_at: toDateValue(leader.started_at),
      ended_at: toDateValue(leader.ended_at),
      display_order: String(leader.display_order ?? 0),
      is_active: leader.is_active,
      created_at: leader.created_at,
      updated_at: leader.updated_at,
    });
  }, [isCreate, leaderData]);

  const handleField = <K extends keyof LeaderFormValues>(key: K, value: LeaderFormValues[K]) =>
    setForm((previous) => (previous ? { ...previous, [key]: value } : previous));

  const handleNameChange = (value: string) =>
    setForm((previous) =>
      previous
        ? { ...previous, name: value, slug: previous.id ? previous.slug : slugifyLeader(value) }
        : previous,
    );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form || isSubmitting) return;

    if (!form.name.trim()) {
      toast.error("Tên lãnh đạo là bắt buộc");
      return;
    }
    if (!form.slug.trim()) {
      toast.error("Slug là bắt buộc");
      return;
    }

    const orderRaw = form.display_order.trim();
    const displayOrder = orderRaw === "" ? 0 : Number(orderRaw);
    if (!Number.isInteger(displayOrder) || displayOrder < 0) {
      toast.error("Thứ tự hiển thị phải là số nguyên không âm");
      return;
    }

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      position: form.position.trim() || null,
      bio: form.bio.trim() || null,
      email: form.email.trim() || null,
      phone: form.phone.trim() || null,
      avatar_id: form.avatar_id || null,
      linkedin_url: form.linkedin_url.trim() || null,
      started_at: form.started_at ? new Date(form.started_at).toISOString() : null,
      ended_at: form.ended_at ? new Date(form.ended_at).toISOString() : null,
      display_order: displayOrder,
      is_active: form.is_active,
    };

    setIsSubmitting(true);

    try {
      if (isCreate) {
        await createLeader.mutateAsync({ data: payload });
        toast.success("Tạo lãnh đạo thành công");
      } else {
        await updateLeader.mutateAsync({ id: leaderId, data: payload });
        toast.success("Cập nhật lãnh đạo thành công");
      }
      await queryClient.invalidateQueries({ queryKey: getGetApiV10LeaderQueryKey() });
      router.push(backPath);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể lưu lãnh đạo");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!form || (!isCreate && leaderFetching)) {
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
        <FormSection title={isCreate ? "Thêm lãnh đạo" : "Chỉnh sửa lãnh đạo"}>
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

            <div>
              <Label className="mb-1.5 block text-gray-700">
                Họ và tên <span className="text-red-600">*</span>
              </Label>
              <Input
                value={form.name}
                onChange={(event) => handleNameChange(event.target.value)}
                placeholder="VD: Nguyễn Văn An"
                className={fieldClassName}
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-gray-700">
                Slug <span className="text-red-600">*</span>
              </Label>
              <Input
                value={form.slug}
                onChange={(event) => handleField("slug", event.target.value)}
                placeholder="nguyen-van-an"
                className={fieldClassName}
              />
            </div>

            <div className="md:col-span-2">
              <AdminImageField
                label="Ảnh đại diện"
                value={form.avatar_id}
                onChange={(id) => handleField("avatar_id", id)}
              />
            </div>
          </div>
        </FormSection>

        <FormSection title="Thông tin lãnh đạo">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label className="mb-1.5 block text-gray-700">Chức vụ</Label>
              <Input
                value={form.position}
                onChange={(event) => handleField("position", event.target.value)}
                placeholder="VD: Giám đốc điều hành (CEO)"
                className={fieldClassName}
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-gray-700">Email cá nhân</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(event) => handleField("email", event.target.value)}
                placeholder="name@meusolutions.com"
                className={fieldClassName}
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-gray-700">Điện thoại</Label>
              <Input
                value={form.phone}
                onChange={(event) => handleField("phone", event.target.value)}
                placeholder="09xx xxx xxx"
                className={fieldClassName}
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-gray-700">LinkedIn</Label>
              <Input
                value={form.linkedin_url}
                onChange={(event) => handleField("linkedin_url", event.target.value)}
                placeholder="https://www.linkedin.com/in/..."
                className={fieldClassName}
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-gray-700">Thời gian nhậm chức</Label>
              <Input
                type="date"
                value={form.started_at}
                onChange={(event) => handleField("started_at", event.target.value)}
                className={fieldClassName}
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-gray-700">
                Thời gian kết thúc
              </Label>
              <Input
                type="date"
                value={form.ended_at}
                onChange={(event) => handleField("ended_at", event.target.value)}
                className={fieldClassName}
              />
              <p className="mt-1 text-xs text-gray-500">
                Để trống nếu đang đương nhiệm.
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-[#063e8e]/[0.04] px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Trạng thái</p>
                  <p className="mt-1 text-sm font-medium text-[#063e8e]">
                    {form.is_active ? "Hiển thị" : "Ẩn"}
                  </p>
                </div>
                <Switch
                  checked={form.is_active}
                  onCheckedChange={(checked) => handleField("is_active", checked)}
                />
              </div>
            </div>
            <div>
              <Label className="mb-1.5 block text-gray-700">Thứ tự hiển thị</Label>
              <Input
                type="number"
                min={0}
                step={1}
                value={form.display_order}
                onChange={(event) => handleField("display_order", event.target.value)}
                placeholder="0"
                className={fieldClassName}
              />
              <p className="mt-1 text-xs text-gray-500">
                Số nhỏ hiển thị trước trên trang giới thiệu.
              </p>
            </div>
          </div>
        </FormSection>

        <FormSection
          title="Tiểu sử / Giới thiệu"
          description="Đoạn giới thiệu ngắn về lãnh đạo, hỗ trợ định dạng rich text."
        >
          <AdminRichTextEditor
            value={form.bio}
            onChange={(value) => handleField("bio", value)}
            placeholder="Nhập tiểu sử lãnh đạo"
            minHeight={240}
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
            {isSubmitting ? "Đang lưu..." : isCreate ? "Thêm lãnh đạo" : "Cập nhật"}
          </Button>
        </div>
      </form>
    </div>
  );
}

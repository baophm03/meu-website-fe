"use client";

import { CalendarDays, Eye } from "lucide-react";
import { SafeImage } from "@/components/shared/safe-image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { AdminNewsFormValues } from "@/utils/admin-news";

interface PostPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: AdminNewsFormValues;
  pageConfigNames: string[];
}

const formatPreviewDate = (value: string) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const imageGridClassName = (columns: number) => {
  if (columns >= 4) return "grid-cols-2 sm:grid-cols-4";
  if (columns === 3) return "grid-cols-2 sm:grid-cols-3";
  if (columns === 2) return "grid-cols-1 sm:grid-cols-2";
  return "grid-cols-1";
};

export function PostPreviewDialog({
  open,
  onOpenChange,
  form,
  pageConfigNames,
}: PostPreviewDialogProps) {
  const title = form.title.trim() || "Tiêu đề bài viết";
  const publishedAt = form.published_at || form.created_at;
  const dateLabel = formatPreviewDate(publishedAt);
  const sections = form.post_content;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[calc(100dvh-32px)] w-[calc(100vw-32px)] max-w-[1320px] flex-col gap-0 overflow-hidden rounded-3xl border-[#063e8e]/15 bg-white p-0">
        <DialogHeader className="shrink-0 border-b border-[#063e8e]/10 bg-white px-6 py-4 pr-14 sm:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#063e8e]/10 px-3 py-1 text-xs font-semibold text-[#063e8e]">
              <Eye className="h-3.5 w-3.5" />
              Bản xem trước
            </span>
            <DialogTitle className="text-lg font-semibold text-black">
              Xem trước bài viết
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-gray-600">
            Bài viết chưa được xuất bản. Nội dung bên dưới phản ánh dữ liệu hiện
            tại trên form.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto bg-[#f8fbff]">
          <article className="mx-auto max-w-[980px] bg-white px-5 py-10 sm:px-10 sm:py-14 lg:px-16">
            <div className="flex flex-wrap items-center gap-2">
              {pageConfigNames.length > 0 ? (
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#063e8e]">
                  {pageConfigNames.join(" · ")}
                </p>
              ) : null}
              {form.is_hidden ? (
                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700">
                  Đang ẩn
                </span>
              ) : null}
            </div>

            <h1 className="mt-4 text-[32px] font-medium leading-[1.15] tracking-[-0.045em] text-slate-950 sm:text-[42px]">
              {title}
            </h1>

            {form.summary.trim() ? (
              <div
                className="mt-5 text-[16px] leading-[1.75] text-slate-600 sm:text-[17px] [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-slate-900"
                dangerouslySetInnerHTML={{ __html: form.summary }}
              />
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
              {dateLabel ? (
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {dateLabel}
                </span>
              ) : null}
              {form.tagsearch_values.length > 0 ? (
                <span>{form.tagsearch_values.join(", ")}</span>
              ) : null}
            </div>

            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              {form.thumbnail ? (
                <SafeImage
                  src={form.thumbnail.url}
                  alt={form.thumbnail.alt || form.thumbnail.name || title}
                  fill
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center text-sm text-slate-500">
                  Chưa chọn hình ảnh đại diện
                </div>
              )}
            </div>

            <div className="mt-12">
              {sections.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#063e8e]/20 bg-[#063e8e]/[0.02] px-6 py-10 text-center text-sm text-slate-500">
                  Chưa có nội dung bài viết.
                </div>
              ) : null}

              {sections.map((section, index) => (
                <section
                  key={section.id}
                  className={cn(
                    index > 0 && "mt-12 border-t border-slate-200 pt-12",
                  )}
                >
                  {section.type === "text" ? (
                    section.content.trim() ? (
                      <div
                        className="text-[16px] leading-[1.85] text-slate-600 [&>p]:mb-5 [&_strong]:font-semibold [&_strong]:text-slate-950 [&_h2]:mb-4 [&_h2]:mt-9 [&_h2]:text-[24px] [&_h2]:font-semibold [&_h2]:text-slate-950 [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-[18px] [&_h3]:font-semibold [&_h3]:text-slate-950 [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_a]:text-[#063e8e] [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-slate-300 [&_blockquote]:pl-5 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-slate-200 [&_td]:p-3 [&_th]:border [&_th]:border-slate-200 [&_th]:bg-slate-50 [&_th]:p-3"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    ) : null
                  ) : (
                    <div className="space-y-5">
                      {section.content.trim() ? (
                        <div
                          className="text-[16px] leading-[1.85] text-slate-600 [&>p]:mb-4 [&_strong]:font-semibold [&_strong]:text-slate-950"
                          dangerouslySetInnerHTML={{ __html: section.content }}
                        />
                      ) : null}

                      {section.images.length > 0 ? (
                        <div
                          className={cn(
                            "grid gap-4",
                            imageGridClassName(section.image_columns),
                          )}
                        >
                          {[...section.images]
                            .sort((left, right) => left.position - right.position)
                            .map((item) => (
                              <figure key={`${section.id}-${item.position}`}>
                                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                                  <SafeImage
                                    src={item.image.url}
                                    alt={item.image.alt || item.image.name || ""}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                {item.caption.trim() ? (
                                  <figcaption className="mt-2 text-center text-sm leading-6 text-slate-500">
                                    {item.caption}
                                  </figcaption>
                                ) : null}
                              </figure>
                            ))}
                        </div>
                      ) : (
                        <div className="rounded-xl border border-dashed border-slate-200 px-5 py-8 text-center text-sm text-slate-500">
                          Section hình ảnh chưa có ảnh.
                        </div>
                      )}
                    </div>
                  )}
                </section>
              ))}
            </div>
          </article>
        </div>
      </DialogContent>
    </Dialog>
  );
}

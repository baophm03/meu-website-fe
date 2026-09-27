"use client";

import {
  type FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdminImagePicker } from "@/components/admin/image-picker";
import { AdminPostContentEditor } from "@/components/admin/post-content-editor";
import { PostHistoryViewer } from "./_components/post-history-viewer";
import { AdminRichTextEditor } from "@/components/shared/rich-text-editor";
import { SafeImage } from "@/components/shared/safe-image";
import { Can } from "@casl/react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useQueryClient } from "@tanstack/react-query";
import {
  getGetApiV10PostQueryKey,
  getGetApiV10PostIdQueryKey,
  useGetApiV10PostId,
  usePostApiV10Post,
  usePutApiV10PostId,
} from "@/api/endpoints/post";
import {
  getGetApiV10PostTagPostIdQueryKey,
  getGetApiV10PostTagPostIdQueryOptions,
  useDeleteApiV10PostTagPostId,
  useGetApiV10PostTagPostId,
  usePostApiV10PostTagPostIdBulk,
} from "@/api/endpoints/post-tag";
import { useGetApiV10Tag } from "@/api/endpoints/tag";
import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";
import type { PageConfig } from "@/api/models";
import {
  type CmsNewsItem,
  type CmsTagItem,
  type CmsPagedResult,
  type CmsRawPostItem,
  type CmsPivotItem,
  buildPostPayload,
  transformPost,
} from "@/utils/cms-transforms";
import { formatDateTime } from "@/utils/date";
import {
  cloneAdminNewsFormValues,
  type AdminMediaItem,
  type AdminNewsFormValues,
  slugifyAdminNews,
} from "@/utils/admin-news";
import {
  fieldClassName,
  readOnlyFieldClassName,
  SEARCH_TAG_VISIBLE_LIMIT,
} from "./_components/constants";
import { PageConfigMultiPicker } from "./_components/page-config-multi-picker";
import { FormSection } from "./_components/form-section";
import { NewsFormLoadingState } from "./_components/news-form-loading-state";
import {
  isUuid,
  toImageRef,
} from "./_components/utils";

export default function AdminNewsDetailPage() {
  const params = useParams();
  const newsId = String(params.id ?? "");

  const router = useRouter();
  const queryClient = useQueryClient();
  const isCreate = !newsId || newsId === "new";
  const backPath = "/admin/posts";
  const [form, setForm] = useState<AdminNewsFormValues | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [tagSearch, setTagSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: tagsData, isFetching: tagsFetching } = useGetApiV10Tag({
    page: 1,
    pageSize: 200,
    sortField: "name",
    sortOrder: "asc",
  });
  const { data: pageConfigsData, isFetching: pageConfigsFetching } = useGetApiV10PageConfig({
    page: 1,
    pageSize: 200,
    sortField: "name",
    sortOrder: "asc",
    filters: "is_active==true",
  });
  const { data: postData, isFetching: postFetching, isError: postError } = useGetApiV10PostId(
    newsId,
    { query: { enabled: !isCreate } },
  );
  const { data: postTagsData, isFetching: postTagsFetching } = useGetApiV10PostTagPostId(
    newsId,
    undefined,
    { query: { enabled: !isCreate } },
  );

  const createPost = usePostApiV10Post();
  const updatePost = usePutApiV10PostId();
  const bulkAddPostTags = usePostApiV10PostTagPostIdBulk();
  const deletePostTag = useDeleteApiV10PostTagPostId();

  const allTags = useMemo(
    () =>
      ((tagsData?.responseData ?? {}) as unknown as CmsPagedResult<CmsTagItem>).rows ?? [],
    [tagsData],
  );
  const allPageConfigs = useMemo(
    () =>
      ((pageConfigsData?.responseData ?? {}) as unknown as CmsPagedResult<PageConfig>).rows ?? [],
    [pageConfigsData],
  );

  const rawPost = (postData?.responseData ?? null) as CmsRawPostItem | null;
  const postTagIds = useMemo(() => {
    const rows =
      ((postTagsData?.responseData ?? {}) as unknown as CmsPagedResult<CmsPivotItem>).rows ?? [];
    return rows
      .map((item) => item.tag_id)
      .filter((value): value is string => Boolean(value));
  }, [postTagsData]);

  const currentItem = useMemo<CmsNewsItem | null>(() => {
    if (!rawPost?.id) return null;
    const tagIdSet = new Set(postTagIds);
    const tagMap = new Map<string, CmsTagItem[]>([
      [rawPost.id, allTags.filter((tag) => tagIdSet.has(tag.id))],
    ]);
    return transformPost(rawPost, tagMap);
  }, [allTags, postTagIds, rawPost]);

  const isLoadingInitialData =
    tagsFetching ||
    pageConfigsFetching ||
    (!isCreate && (postFetching || postTagsFetching || !postData || !postTagsData));
  const isMissingPost = !isCreate && !isLoadingInitialData && !currentItem;

  useEffect(() => {
    if (isLoadingInitialData || form !== null) return;

    if (isCreate) {
      const now = new Date().toISOString();
      setForm({
        ...cloneAdminNewsFormValues(),
        created_at: now,
        updated_at: now,
      });
      return;
    }

    if (!currentItem) return;

    setForm(cloneAdminNewsFormValues(currentItem));
  }, [currentItem, form, isCreate, isLoadingInitialData]);

  useEffect(() => {
    if (postError) {
      toast.error("Không thể tải bài viết");
    }
  }, [postError]);

  const syncPostTags = async (postId: string, tagIds: string[]) => {
    const response = await queryClient.fetchQuery(
      getGetApiV10PostTagPostIdQueryOptions(postId),
    );
    const result = (response.responseData ?? {}) as unknown as CmsPagedResult<CmsPivotItem>;
    const currentIds = new Set(
      (result.rows ?? [])
        .map((item) => item.tag_id)
        .filter((value): value is string => Boolean(value)),
    );
    const nextIds = new Set(tagIds.filter(Boolean));

    const toCreate = Array.from(nextIds).filter((id) => !currentIds.has(id));
    const toDelete = Array.from(currentIds).filter((id) => !nextIds.has(id));

    if (toCreate.length > 0) {
      await bulkAddPostTags.mutateAsync({ postId, data: { tag_ids: toCreate } });
    }

    await Promise.all(
      toDelete.map((tagId) =>
        deletePostTag.mutateAsync({ postId, params: { tag_id: tagId } }),
      ),
    );

    await queryClient.invalidateQueries({
      queryKey: getGetApiV10PostTagPostIdQueryKey(postId),
    });
  };


  const availableSearchTags = useMemo(() => {
    return allTags.map((item) => item.name);
  }, [allTags]);

  const selectedTagIds = useMemo(() => {
    const tagMap = new Map(
      allTags.map((item) => [item.name.trim().toLowerCase(), item.id] as const),
    );

    return form?.tagsearch_values
      .map((name) => tagMap.get(name.trim().toLowerCase()))
      .filter((value): value is string => Boolean(value)) ?? [];
  }, [allTags, form?.tagsearch_values]);

  const visibleSearchTags = useMemo(() => {
    if (!form) return [];

    const normalizedKeyword = tagSearch.trim().toLowerCase();
    const selectedNames = new Set(form.tagsearch_values);
    const selectedTags = availableSearchTags.filter((item) => selectedNames.has(item));
    const availableTags = availableSearchTags.filter((item) => !selectedNames.has(item));
    const matchedTags = normalizedKeyword
      ? availableTags.filter((item) => item.toLowerCase().includes(normalizedKeyword))
      : availableTags;

    return [
      ...selectedTags,
      ...matchedTags.slice(
        0,
        Math.max(SEARCH_TAG_VISIBLE_LIMIT - selectedTags.length, 0),
      ),
    ];
  }, [availableSearchTags, form, tagSearch]);

  const matchedSearchTagTotal = useMemo(() => {
    const normalizedKeyword = tagSearch.trim().toLowerCase();
    if (!normalizedKeyword) return availableSearchTags.length;

    return availableSearchTags.filter((item) =>
      item.toLowerCase().includes(normalizedKeyword),
    ).length;
  }, [availableSearchTags, tagSearch]);


  const handleField = <K extends keyof AdminNewsFormValues>(
    key: K,
    value: AdminNewsFormValues[K],
  ) => {
    setForm((current) => {
      if (!current) return current;
      return { ...current, [key]: value };
    });
  };

  const handleTitleChange = (value: string) => {
    setForm((current) => {
      if (!current) return current;

      return {
        ...current,
        title: value,
        slug: slugifyAdminNews(value),
      };
    });
  };

  const handleToggleSearchTag = (value: string, checked: boolean) => {
    setForm((current) => {
      if (!current) return current;

      return {
        ...current,
        tagsearch_values: checked
          ? [...current.tagsearch_values, value]
          : current.tagsearch_values.filter((item) => item !== value),
      };
    });
  };

  const handleThumbnailSelect = (item: AdminMediaItem) => {
    handleField("thumbnail", toImageRef(item));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form || isSubmitting) return;

    if (!form.title.trim()) {
      toast.error("Tiêu đề bài viết là bắt buộc");
      return;
    }

    if (!form.slug.trim()) {
      toast.error("Slug bài viết là bắt buộc");
      return;
    }

    const payload = {
      title: form.title.trim(),
      slug: slugifyAdminNews(form.slug.trim()),
      summary: form.summary,
      tag_ids: selectedTagIds,
      page_config_ids: form.page_config_ids,
      is_featured: form.is_featured,
      thumbnail_id: form.thumbnail && isUuid(form.thumbnail.id) ? form.thumbnail.id : null,
      is_hidden: form.is_hidden,
      published_at: form.published_at || null,
      expired_at: form.expired_at || null,
      post_content: form.post_content.map((section, index) => ({
        ...section,
        position: index + 1,
      })),
    };

    const apiPayload = buildPostPayload(payload);

    setIsSubmitting(true);

    try {
      if (isCreate) {
        const response = await createPost.mutateAsync({ data: apiPayload });
        const created = (response.responseData ?? {}) as CmsRawPostItem;
        if (created.id) {
          await syncPostTags(created.id, payload.tag_ids);
        }
      } else if (newsId) {
        await updatePost.mutateAsync({ id: newsId, data: apiPayload });
        await syncPostTags(newsId, payload.tag_ids);
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: getGetApiV10PostQueryKey() }),
        queryClient.invalidateQueries({ queryKey: getGetApiV10PostIdQueryKey(newsId) }),
      ]);

      toast.success(isCreate ? "Đã tạo bài viết" : "Đã cập nhật bài viết");
      router.push(backPath);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể lưu bài viết");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingInitialData) {
    return <NewsFormLoadingState />;
  }

  if (isMissingPost && !isCreate) {
    return (
      <div className="rounded-2xl border border-[#063e8e]/15 bg-white px-6 py-12 text-center">
        <p className="text-lg font-semibold text-black">Không tìm thấy bài viết</p>
        <p className="mt-2 text-sm text-gray-700">
          Bài viết không tồn tại trong dữ liệu hiện tại.
        </p>
        <Button
          asChild
          className="mt-5 bg-[#063e8e] text-white hover:bg-[#063e8e]/90"
        >
          <Link href={backPath}>Quay lại danh sách</Link>
        </Button>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="rounded-2xl border border-[#063e8e]/15 bg-white px-6 py-12 text-center text-sm text-gray-700">
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
        <FormSection title={isCreate ? "Tạo bài viết" : "Chỉnh sửa bài viết"}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label className="mb-1.5 block text-gray-700">Ngày tạo</Label>
              <Input
                value={
                  form.created_at ? formatDateTime(form.created_at) : ""
                }
                readOnly
                className={readOnlyFieldClassName}
              />
            </div>

            <div>
              <Label className="mb-1.5 block text-gray-700">Ngày cập nhật</Label>
              <Input
                value={
                  form.updated_at ? formatDateTime(form.updated_at) : ""
                }
                readOnly
                className={readOnlyFieldClassName}
              />
            </div>

            <div className="md:col-span-2">
              <Label className="mb-1.5 block text-gray-700">
                Tiêu đề <span className="text-red-600">*</span>
              </Label>
              <Input
                value={form.title}
                onChange={(event) => handleTitleChange(event.target.value)}
                placeholder="Nhập tiêu đề bài viết"
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
                placeholder="slug-bai-viet"
                className={fieldClassName}
              />
            </div>
          </div>
        </FormSection>

        <FormSection title="Thể loại, hình ảnh và hiển thị">
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
            <div className="rounded-xl border border-[#063e8e]/15 bg-[#063e8e]/[0.02] p-4">
              <div className="space-y-3">
                <div>
                  <Label className="block text-gray-700">Hình ảnh đại diện</Label>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-[#063e8e]/15 bg-white">
                  <div className="relative aspect-[16/11]">
                    {form.thumbnail ? (
                      <SafeImage
                        src={form.thumbnail.url}
                        alt={form.thumbnail.alt || form.thumbnail.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-6 text-center text-sm text-gray-700">
                        Chưa chọn ảnh đại diện
                      </div>
                    )}
                  </div>

                  {form.thumbnail ? (
                    <button
                      type="button"
                      onClick={() => handleField("thumbnail", null)}
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-sm transition hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : null}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPickerOpen(true)}
                  className="w-full border-[#063e8e]/15 bg-white text-gray-700 hover:bg-[#063e8e]/10 hover:text-[#063e8e]"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {form.thumbnail ? "Đổi hình đại diện" : "Chọn hình đại diện"}
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-[#063e8e]/15 bg-white p-4">
              <div className="space-y-4">
                <PageConfigMultiPicker
                  values={form.page_config_ids}
                  options={allPageConfigs}
                  onChange={(values) => handleField("page_config_ids", values)}
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label className="mb-1.5 block text-gray-700">Ngày xuất bản</Label>
                    <Input
                      type="datetime-local"
                      value={form.published_at}
                      onChange={(event) =>
                        handleField("published_at", event.target.value)
                      }
                      className={fieldClassName}
                    />
                  </div>

                  <div>
                    <Label className="mb-1.5 block text-gray-700">Ngày hết hạn</Label>
                    <Input
                      type="datetime-local"
                      value={form.expired_at}
                      onChange={(event) =>
                        handleField("expired_at", event.target.value)
                      }
                      className={fieldClassName}
                    />
                  </div>
                </div>

                <div className="rounded-xl bg-[#063e8e]/[0.04] px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Trạng thái hiển thị
                      </p>
                      <p className="mt-1 text-sm font-medium text-[#063e8e]">
                        {form.is_hidden ? "Đang ẩn" : "Đang hiển thị"}
                      </p>
                    </div>
                    <Switch
                      checked={!form.is_hidden}
                      onCheckedChange={(checked) => handleField("is_hidden", !checked)}
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-[#063e8e]/15 bg-[#063e8e]/[0.02] px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Tin nổi bật</p>
                      <p className="mt-1 text-sm text-gray-700">
                        Đánh dấu để ưu tiên hiển thị như một tin nổi bật.
                      </p>
                    </div>
                    <Switch
                      checked={form.is_featured}
                      onCheckedChange={(checked) => handleField("is_featured", checked)}
                    />
                  </div>
                </div>

              </div>
            </div>

            <div className="rounded-xl border border-[#063e8e]/15 bg-[#063e8e]/[0.02] p-4 xl:col-span-2">
              <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div className="min-w-0 flex-1">
                  <Label className="mb-1.5 block text-gray-700">Tag tìm kiếm</Label>
                  <Input
                    value={tagSearch}
                    onChange={(event) => setTagSearch(event.target.value)}
                    placeholder="Tìm tag theo tên"
                    className={fieldClassName}
                  />
                </div>
                <div className="rounded-lg border border-[#063e8e]/10 bg-white px-3 py-2 text-sm text-gray-700">
                  Đã chọn {form.tagsearch_values.length} tag
                </div>
              </div>
              {availableSearchTags.length > 0 ? (
                <>
                  {visibleSearchTags.length > 0 ? (
                    <div className="max-h-64 overflow-y-auto rounded-xl border border-[#063e8e]/10 bg-white p-2">
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        {visibleSearchTags.map((item) => (
                          <label
                            key={item}
                            className="flex items-center gap-3 rounded-lg border border-[#063e8e]/10 bg-white px-3 py-2"
                          >
                            <Checkbox
                              checked={form.tagsearch_values.includes(item)}
                              onCheckedChange={(checked) =>
                                handleToggleSearchTag(item, checked === true)
                              }
                              className="border-[#063e8e]/30 data-[state=checked]:border-[#063e8e] data-[state=checked]:bg-[#063e8e]"
                            />
                            <span className="min-w-0 truncate text-sm text-gray-700">
                              {item}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="rounded-lg border border-dashed border-[#063e8e]/20 bg-white px-3 py-2 text-sm text-gray-700">
                      Không tìm thấy tag phù hợp.
                    </p>
                  )}
                  {matchedSearchTagTotal > visibleSearchTags.length ? (
                    <p className="mt-2 text-sm text-gray-700">
                      Đang hiển thị {visibleSearchTags.length} trong{" "}
                      {matchedSearchTagTotal} tag phù hợp. Nhập thêm từ khóa để lọc nhanh hơn.
                    </p>
                  ) : null}
                </>
              ) : (
                <p className="rounded-lg border border-dashed border-[#063e8e]/20 bg-white px-3 py-2 text-sm text-gray-700">
                  {"Ch\u01b0a c\u00f3 tag t\u00ecm ki\u1ebfm n\u00e0o. Vui l\u00f2ng t\u1ea1o tag trong m\u1ee5c qu\u1ea3n l\u00fd tag tr\u01b0\u1edbc khi g\u00e1n cho b\u00e0i vi\u1ebft."}
                </p>
              )}
            </div>
          </div>
        </FormSection>

        <FormSection title="Tóm tắt">
          <AdminRichTextEditor
            value={form.summary}
            onChange={(value) => handleField("summary", value)}
            placeholder="Nhập tóm tắt bài viết"
            minHeight={180}
          />
        </FormSection>

        <FormSection
          title="Nội dung bài viết"
          description="Thêm section văn bản và hình ảnh theo đúng cấu trúc nội dung mong muốn."
        >
          <AdminPostContentEditor
            sections={form.post_content}
            onChange={(sections) => handleField("post_content", sections)}
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
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting
              ? "Đang lưu..."
              : isCreate
                ? "Lưu bài viết"
                : "Cập nhật bài viết"}
          </Button>
        </div>
      </form>

      <AdminImagePicker
        open={pickerOpen}
        selectedId={form.thumbnail?.id}
        onOpenChange={setPickerOpen}
        onSelect={handleThumbnailSelect}
      />

      {!isCreate && newsId && (
        <Can I="READ" a="POSTS">
          <PostHistoryViewer postId={newsId} />
        </Can>
      )}
    </div>
  );
}

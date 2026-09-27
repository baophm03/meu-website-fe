"use client";

import Link from "next/link";
import dayjs from "dayjs";
import {
  ArrowRight,
  FolderTree,
  Image as ImageIcon,
  LayoutTemplate,
  Mail,
  Newspaper,
  Sparkles,
} from "lucide-react";
import { SafeImage } from "@/components/shared/safe-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetApiV10Post } from "@/api/endpoints/post";
import { useGetApiV10File } from "@/api/endpoints/file";
import { useGetApiV10Contact } from "@/api/endpoints/contact";
import { useGetApiV10NewsletterSubscription } from "@/api/endpoints/newsletter-subscription";
import { useGetApiV10HeaderConfig } from "@/api/endpoints/header-config";
import type { Contact } from "@/api/models/contact";
import {
  type CmsPagedResult,
  type CmsRawPostItem,
  transformPost,
} from "@/utils/cms-transforms";
import { type CmsFileItem, resolveCmsFileUrl } from "@/utils/file";
import { ComponentType, useMemo } from "react";
import { formatDateTime } from "@/utils/date";

type DashboardMetric = {
  title: string;
  value: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
};

type DashboardShortcut = {
  title: string;
  description: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

type ActivityItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  badge: string;
  href: string;
};

type DashboardMediaItem = {
  id: string;
  name: string;
  url: string;
  updated_at: string;
};

export default function AdminDashboardPage() {
  const { data: postRes, isLoading: postLoading } = useGetApiV10Post({
    page: 1,
    pageSize: 6,
    sortField: "updated_at",
    sortOrder: "desc",
  });
  const { data: fileRes, isLoading: fileLoading } = useGetApiV10File({
    page: 1,
    pageSize: 6,
    sortField: "created_at",
    sortOrder: "desc",
  });
  const { data: contactRes, isLoading: contactLoading } = useGetApiV10Contact({
    page: 1,
    pageSize: 6,
    sortField: "created_at",
    sortOrder: "desc",
  });
  const { data: newsletterRes, isLoading: newsletterLoading } = useGetApiV10NewsletterSubscription({
    page: 1,
    pageSize: 1,
  });
  const { data: headerConfigRes, isLoading: headerConfigLoading } = useGetApiV10HeaderConfig({
    page: 1,
    pageSize: 1,
  });

  const ready = !postLoading && !fileLoading && !contactLoading && !newsletterLoading && !headerConfigLoading;

  const postResult = (postRes?.responseData ?? {}) as unknown as CmsPagedResult<CmsRawPostItem>;
  const fileResult = (fileRes?.responseData ?? {}) as unknown as CmsPagedResult<CmsFileItem>;
  const contactResult = (contactRes?.responseData ?? {}) as unknown as CmsPagedResult<Contact>;

  const newsItems = useMemo(
    () => (postResult.rows ?? []).map((item) => transformPost(item)),
    [postResult.rows],
  );
  const postTotal = postResult.count ?? 0;
  const mediaItems = useMemo<DashboardMediaItem[]>(
    () =>
      (fileResult.rows ?? []).map((item) => ({
        id: item.id ?? "",
        name: item.original || item.path || "",
        url: resolveCmsFileUrl(item.path),
        updated_at: item.created_at ?? "",
      })),
    [fileResult.rows],
  );
  const mediaTotal = fileResult.count ?? 0;
  const contactTotal = contactResult.count ?? 0;
  const newsletterTotal =
    ((newsletterRes?.responseData ?? {}) as unknown as CmsPagedResult<unknown>).count ?? 0;
  const headerConfigTotal =
    ((headerConfigRes?.responseData ?? {}) as unknown as CmsPagedResult<unknown>).count ?? 0;

  const metrics = useMemo<DashboardMetric[]>(() => {
    const totalContactForms = newsletterTotal + contactTotal;

    return [
      {
        title: "Bài viết nội dung",
        value: String(postTotal),
        description: `${postTotal} bài đang quản lý`,
        icon: Newspaper,
        href: "/admin/posts",
      },
      {
        title: "Tài nguyên media",
        value: String(mediaTotal),
        description: `${mediaTotal} file`,
        icon: ImageIcon,
        href: "/admin/media",
      },
      {
        title: "Menu header",
        value: String(headerConfigTotal),
        description: `${headerConfigTotal} mục điều hướng`,
        icon: FolderTree,
        href: "/admin/header-config",
      },
      {
        title: "Liên hệ từ website",
        value: String(totalContactForms),
        description: `${newsletterTotal} email nhận tin, ${contactTotal} đơn liên hệ`,
        icon: Mail,
        href: "/admin/newsletter-emails",
      },
    ];
  }, [contactTotal, headerConfigTotal, mediaTotal, newsletterTotal, postTotal]);

  const shortcuts = useMemo<DashboardShortcut[]>(
    () => [
      {
        title: "Quản lý header",
        description: "Menu header và cấu trúc điều hướng",
        href: "/admin/header-config",
        icon: FolderTree,
      },
      {
        title: "Quản lý bài viết",
        description: "Tin tức, bài viết trang và nội dung xuất bản",
        href: "/admin/posts",
        icon: LayoutTemplate,
      },
      {
        title: "Quản lý liên hệ",
        description: "Email nhận tin và đơn liên hệ từ website",
        href: "/admin/newsletter-emails",
        icon: Mail,
      },
    ],
    [],
  );

  const recentActivities = useMemo<ActivityItem[]>(() => {
    const items: ActivityItem[] = [
      ...newsItems.map((item) => ({
        id: `news-${item.id}`,
        title: item.title,
        description: "Cập nhật trong Quản lý bài viết",
        time: item.updated_at || item.created_at,
        badge: "Bài viết",
        href: `/admin/posts/${item.id}`,
      })),
      ...mediaItems.map((item) => ({
        id: `media-${item.id}`,
        title: item.name,
        description: "Cập nhật trong kho ảnh website",
        time: item.updated_at,
        badge: "Ảnh",
        href: "/admin/media",
      })),
      ...(contactResult.rows ?? []).map((item) => ({
        id: `contact-${item.id}`,
        title: item.fullname,
        description: item.title || item.content || "",
        time: item.created_at,
        badge: "Liên hệ",
        href: "/admin/contact-requests",
      })),
    ];

    return items
      .sort((left, right) => dayjs(right.time).valueOf() - dayjs(left.time).valueOf())
      .slice(0, 6);
  }, [contactResult.rows, mediaItems, newsItems]);

  const spotlightNews = useMemo(() => newsItems.slice(0, 3), [newsItems]);

  if (!ready) {
    return (
      <div className="grid gap-5 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={`dashboard-loading-${index}`}
            className="h-40 animate-pulse rounded-[28px] border border-[#063e8e]/10 bg-white"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-5">
        <Card className="overflow-hidden rounded-[30px] border-[#063e8e]/10 bg-[linear-gradient(135deg,#ffffff_0%,#f5f9ff_55%,#ebf3ff_100%)] shadow-[0_18px_55px_rgba(6,62,142,0.08)]">
          <CardContent className="p-6 sm:p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#063e8e]/10 bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#063e8e]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Tổng quan hệ thống
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-[#163b73]">Dashboard quản trị</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    Theo dõi nhanh nội dung, tài nguyên media, cấu hình website và các biểu mẫu từ
                    người dùng ngay trên một màn hình tổng hợp.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href="/admin/posts"
                  className="rounded-[24px] border border-[#063e8e]/10 bg-white/90 p-4 transition hover:border-[#063e8e]/20 hover:shadow-sm"
                >
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-400">Xuất bản</div>
                  <div className="mt-2 text-2xl font-semibold text-[#163b73]">{postTotal}</div>
                  <div className="mt-1 text-sm text-slate-500">bài viết đang quản lý</div>
                </Link>
                <Link
                  href="/admin/contact-requests"
                  className="rounded-[24px] border border-[#063e8e]/10 bg-white/90 p-4 transition hover:border-[#063e8e]/20 hover:shadow-sm"
                >
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-400">Phản hồi</div>
                  <div className="mt-2 text-2xl font-semibold text-[#163b73]">
                    {contactTotal}
                  </div>
                  <div className="mt-1 text-sm text-slate-500">đơn đang cần theo dõi</div>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Link key={metric.title} href={metric.href}>
            <Card className="h-full rounded-[28px] border-[#063e8e]/10 shadow-sm transition hover:-translate-y-0.5 hover:border-[#063e8e]/20 hover:shadow-[0_16px_40px_rgba(6,62,142,0.1)]">
              <CardContent className="flex h-full flex-col justify-between gap-5 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-slate-500">{metric.title}</div>
                    <div className="mt-3 text-3xl font-semibold text-[#163b73]">{metric.value}</div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf4ff] text-[#063e8e]">
                    <metric.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="text-sm leading-6 text-slate-500">{metric.description}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[30px] border-[#063e8e]/10 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-xl text-[#163b73]">Hoạt động gần đây</CardTitle>
                <CardDescription className="text-slate-600">
                  Các cập nhật mới nhất từ bài viết, kho ảnh và biểu mẫu liên hệ.
                </CardDescription>
              </div>
              <Badge variant="outline" className="border-[#063e8e]/15 text-[#063e8e]">
                {recentActivities.length} mục
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-500">Chưa có hoạt động nào.</p>
            ) : (
              recentActivities.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-start justify-between gap-4 rounded-[24px] border border-[#063e8e]/10 bg-white p-4 transition hover:bg-[#f8fbff]"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-[#063e8e]/15 text-[#063e8e]">
                        {item.badge}
                      </Badge>
                      <span className="text-xs text-slate-400">{formatDateTime(item.time)}</span>
                    </div>
                    <div className="mt-2 line-clamp-1 text-sm font-semibold text-[#163b73]">
                      {item.title}
                    </div>
                    <div className="mt-1 line-clamp-2 text-sm text-slate-500">{item.description}</div>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
                </Link>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="rounded-[30px] border-[#063e8e]/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl text-[#163b73]">Lối tắt quản trị</CardTitle>
            <CardDescription className="text-slate-600">
              Truy cập nhanh vào các module quan trọng trong admin.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {shortcuts.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-[24px] border border-[#063e8e]/10 bg-[#f8fbff] p-4 transition hover:border-[#063e8e]/20 hover:bg-white"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#063e8e] shadow-sm">
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 text-sm font-semibold text-[#163b73]">{item.title}</div>
                <div className="mt-1 text-sm leading-6 text-slate-500">{item.description}</div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_1fr_0.9fr]">
        <Card className="rounded-[30px] border-[#063e8e]/10 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-xl text-[#163b73]">Nội dung nổi bật</CardTitle>
                <CardDescription className="text-slate-600">
                  Các bài viết mới nhất đang được quản lý trong admin.
                </CardDescription>
              </div>
              <Button asChild variant="outline" className="rounded-xl border-[#063e8e]/15 text-[#063e8e]">
                <Link href="/admin/posts">Xem tất cả</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {spotlightNews.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-500">Chưa có bài viết nào.</p>
            ) : (
              spotlightNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/admin/posts/${item.id}`}
                  className="flex gap-4 rounded-[24px] border border-[#063e8e]/10 bg-white p-4 transition hover:bg-[#f8fbff]"
                >
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl bg-[#eef4ff]">
                    {item.thumbnail ? (
                      <SafeImage
                        src={item.thumbnail.url}
                        alt={item.thumbnail.alt || item.thumbnail.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#063e8e]">
                        <Newspaper className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="line-clamp-2 text-sm font-semibold text-[#163b73]">{item.title}</div>
                    <div className="mt-2 text-xs text-slate-400">
                      {formatDateTime(item.updated_at || item.created_at)}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="rounded-[30px] border-[#063e8e]/10 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl text-[#163b73]">Danh mục & thư viện</CardTitle>
            <CardDescription className="text-slate-600">
              Tình trạng cấu trúc nội dung và dữ liệu danh mục đang dùng.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-[#063e8e]/10 bg-[#f8fbff] p-4">
                <div className="text-xs uppercase tracking-[0.14em] text-slate-400">Menu header</div>
                <div className="mt-2 text-2xl font-semibold text-[#163b73]">{headerConfigTotal}</div>
                <div className="mt-1 text-sm text-slate-500">mục điều hướng</div>
              </div>
            </div>

            <div className="rounded-[24px] border border-[#063e8e]/10 bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-[#163b73]">Kho ảnh website</div>
                <Badge variant="outline" className="border-[#063e8e]/15 text-[#063e8e]">
                  {mediaTotal} ảnh
                </Badge>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {mediaItems.length === 0 ? (
                  <p className="col-span-3 py-4 text-center text-sm text-slate-500">Chưa có ảnh nào.</p>
                ) : (
                  mediaItems.slice(0, 3).map((item) => (
                    <div key={item.id} className="relative aspect-square overflow-hidden rounded-2xl bg-[#eef4ff]">
                      <SafeImage
                        src={item.url}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

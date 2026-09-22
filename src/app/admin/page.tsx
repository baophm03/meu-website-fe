"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import useProfileStore from "@/store/useProfileStore";
import { ability, type Actions } from "@/config/casl/ability";
import type { PermissionCheck } from "@/config/permissions";
import { Loader2, ShieldX } from "lucide-react";

interface AdminLandingRoute {
  path: string;
  permission: PermissionCheck;
}

const ADMIN_LANDING_ROUTES: AdminLandingRoute[] = [
  {
    path: "/admin/dashboard",
    permission: { action: "VIEW", subject: "DASHBOARD" }
  },
  {
    path: "/admin/news",
    permission: { action: "VIEW", subject: "POSTS" }
  },
  {
    path: "/admin/users",
    permission: { action: "VIEW", subject: "USERS" }
  },
  {
    path: "/admin/password-reset-requests",
    permission: { action: "VIEW", subject: "USERS" }
  },
  {
    path: "/admin/roles",
    permission: { action: "VIEW", subject: "ROLES" }
  },
  {
    path: "/admin/advertisements",
    permission: { action: "VIEW", subject: "ADVERTISEMENTS" }
  },
  {
    path: "/admin/media",
    permission: { action: "VIEW", subject: "FILES" }
  },
  {
    path: "/admin/tags",
    permission: { action: "VIEW", subject: "TAGS" }
  },
  {
    path: "/admin/videos",
    permission: { action: "VIEW", subject: "VIDEOS" }
  },
  {
    path: "/admin/members",
    permission: { action: "VIEW", subject: "MEMBERS" }
  },
  {
    path: "/admin/contact-management",
    permission: { action: "VIEW", subject: "CONTACT" }
  },
];

export default function AdminPage() {
  const router = useRouter();
  const appUser = useProfileStore((state) => state.appUser);
  const hasHydrated = useAuthStore((state) => state._hasHydrated);
  const isLoggedIn = useAuthStore((state) => state.appIsLoggedIn);

  const canAccessRoute = (permission: PermissionCheck) =>
    ability.can(permission.action as Actions, permission.subject);

  useEffect(() => {
    if (!hasHydrated || !isLoggedIn) return;
    if (appUser?.must_change_password) return;

    // Tìm trang admin đầu tiên user có quyền
    const firstAllowed = ADMIN_LANDING_ROUTES.find(
      (route) => canAccessRoute(route.permission),
    );

    if (firstAllowed) {
      router.replace(firstAllowed.path);
    }
  }, [hasHydrated, isLoggedIn, appUser, router]);

  // Loading
  if (!hasHydrated || !isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fbff]">
        <Loader2 className="h-8 w-8 animate-spin text-[#063e8e]" />
      </div>
    );
  }

  // Nếu phải đổi mật khẩu → AuthGuard sẽ redirect, tạm render loading
  if (appUser?.must_change_password) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fbff]">
        <Loader2 className="h-8 w-8 animate-spin text-[#063e8e]" />
      </div>
    );
  }

  // Kiểm tra có quyền gì không
  const hasAnyPermission = ADMIN_LANDING_ROUTES.some(
    (route) => canAccessRoute(route.permission),
  );

  // Nếu có quyền → loading (đang redirect)
  if (hasAnyPermission) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fbff]">
        <Loader2 className="h-8 w-8 animate-spin text-[#063e8e]" />
      </div>
    );
  }

  // Không có quyền gì → hiển thị thông báo
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#f6f9ff] via-[#edf4ff] to-[#f8fbff] px-4">
      <div className="w-full max-w-2xl rounded-3xl border border-[#063e8e]/10 bg-white p-8 text-center shadow-xl md:p-12">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
          <ShieldX className="h-10 w-10 text-amber-600" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-[#163b73] md:text-3xl">
          Tài khoản chưa được cấp quyền
        </h1>

        {/* Message */}
        <p className="mx-auto mt-4 max-w-md text-sm text-slate-600 md:text-base">
          Tài khoản của bạn hiện tại chưa có quyền quản trị chức năng nào.
          Vui lòng liên hệ ban quản trị website hoặc bên kỹ thuật để được hỗ trợ.
        </p>

        {/* User info */}
        <div className="mt-6 rounded-2xl border border-[#063e8e]/10 bg-[#f8fbff] px-6 py-4 text-left">
          <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
            <div>
              <span className="text-slate-500">Email:</span>{" "}
              <span className="font-medium text-[#163b73]">{appUser?.email}</span>
            </div>
            <div>
              <span className="text-slate-500">Vai trò:</span>{" "}
              <span className="font-medium text-[#163b73]">
                {appUser?.roles?.length ? appUser.roles.join(", ") : "Chưa có"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AbilityProvider } from '@casl/react';
import { ability } from '@/config/casl/ability';
import { AdminAuthLoadingScreen, useAdminAuthStatus } from '@/components/layout/admin/admin-auth-guard';
import { AdminSidebar } from '@/components/layout/admin/admin-sidebar';
import { AdminHeader } from '@/components/layout/admin/admin-header';
import { useSidebarStore } from '@/hooks/use-admin-sidebar';
import { useGetApiV10AuthMe } from '@/api/endpoints/authentication';
import useProfileStore from '@/store/useProfileStore';
import { cn } from '@/lib/utils';

function AdminShell({ children }: { children: ReactNode }) {
  const { close, isOpen } = useSidebarStore();
  const meQuery = useGetApiV10AuthMe({ query: { enabled: false } });
  const refetchMe = meQuery.refetch;

  // Đồng bộ lại permissions (ability) mỗi lần vào admin / quay lại tab —
  // profile persist trong storage nên quyền mới cấp cần /auth/me để cập nhật.
  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await refetchMe();
        const meData = (res.data as { responseData?: Record<string, unknown> } | undefined)?.responseData;
        if (!meData?.id) return;
        const prev = useProfileStore.getState().appUser;
        useProfileStore.getState().setAppUser({
          id: String(meData.id),
          email: String(meData.email ?? prev?.email ?? ""),
          username: String(meData.username ?? prev?.username ?? ""),
          first_name: (meData.first_name as string | null) ?? null,
          last_name: (meData.last_name as string | null) ?? null,
          roles: Array.isArray(meData.roles) ? (meData.roles as string[]) : [],
          permissions: Array.isArray(meData.permissions)
            ? (meData.permissions as { module: string; action: string }[])
            : [],
          status: (meData.status as string | null) ?? null,
          last_login_at: (meData.last_login_at as string | null) ?? prev?.last_login_at ?? null,
          must_change_password: prev?.must_change_password ?? false,
        });
      } catch {
        // Giữ session hiện tại nếu /me lỗi
      }
    };
    void refresh();
    const onVisible = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [refetchMe]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const syncSidebar = () => {
      if (mediaQuery.matches) close();
    };

    syncSidebar();
    mediaQuery.addEventListener('change', syncSidebar);

    return () => mediaQuery.removeEventListener('change', syncSidebar);
  }, [close]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <AdminSidebar />
      {isOpen ? (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-slate-950/35 backdrop-blur-[1px] lg:hidden"
          onClick={close}
        />
      ) : null}
      <div
        className={cn(
          'min-w-0 transition-all duration-300',
          isOpen ? 'lg:pl-72' : 'lg:pl-24',
        )}
      >
        <AdminHeader />
        <main className="px-4 py-4 lg:px-6 lg:py-6">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isChangePasswordPage = pathname === '/admin/change-password';
  const authStatus = useAdminAuthStatus();

  let content: ReactNode;

  if (isChangePasswordPage) {
    content = <div className="min-h-screen bg-slate-50">{children}</div>;
  } else if (authStatus === 'loading') {
    content = <AdminAuthLoadingScreen />;
  } else if (authStatus === 'blocked') {
    content = null;
  } else {
    content = <AdminShell>{children}</AdminShell>;
  }

  return <AbilityProvider value={ability}>{content}</AbilityProvider>;
}

'use client';

import { useRouter } from 'next/navigation';
import { KeyRound, LogOut, Menu } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePostApiV10AuthLogout } from '@/api/endpoints/authentication';
import { redirectToLogin } from '@/utils/admin-auth';
import { useSidebarStore } from '@/hooks/use-admin-sidebar';
import useAuthStore from '@/store/useAuthStore';
import useProfileStore from '@/store/useProfileStore';

export function AdminHeader() {
  const { toggle } = useSidebarStore();
  const logoutMutation = usePostApiV10AuthLogout();
  const router = useRouter();
  const appUser = useProfileStore((state) => state.appUser);

  const displayName =
    [appUser?.first_name, appUser?.last_name].filter(Boolean).join(' ').trim() ||
    appUser?.username ||
    'User';

  const initials = displayName
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch {
      // Ignore API failure, still clear local state
    }
    useAuthStore.getState().resetStore();
    useProfileStore.getState().clearProfile();
    toast.success("Đã đăng xuất khỏi trang quản trị");
    redirectToLogin();
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#063e8e]/15 bg-background/95 shadow-sm backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="flex min-h-16 items-center justify-between gap-3 px-3 py-2 sm:px-4 lg:px-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="text-[#063e8e]"
            title="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-full p-0 outline-none transition-all duration-300 hover:bg-transparent">
              <Avatar className="size-10 overflow-hidden rounded-full">
                <AvatarFallback className="flex size-10 items-center justify-center rounded-full bg-[#edf4ff] text-xs font-semibold text-[#063e8e]">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="mt-2 min-w-[220px] rounded-2xl border border-[#063e8e]/10 bg-white p-1.5 shadow-[0_12px_40px_-12px_rgba(6,62,142,0.2)]"
            >
              <div className="px-3 py-2.5">
                <p className="truncate text-sm font-medium text-slate-800">{displayName}</p>
                <p className="truncate text-xs text-slate-500">{appUser?.email}</p>
              </div>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem
                onClick={() => router.push('/admin/change-password')}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-slate-600 outline-none transition-colors hover:bg-[#edf4ff] hover:text-[#063e8e]"
              >
                <KeyRound size={16} />
                <span>Đổi mật khẩu</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-red-600 outline-none transition-colors hover:bg-red-50"
              >
                <LogOut size={16} />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

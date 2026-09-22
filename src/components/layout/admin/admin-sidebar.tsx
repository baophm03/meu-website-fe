"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ImagePlus,
  Inbox,
  Layers,
  Mail,
  Megaphone,
  Newspaper,
  PanelBottom,
  Tags,
  UserCog,
  Shield,
  KeyRound,
  Video,
} from "lucide-react";
import { useSidebarStore } from "@/hooks/use-admin-sidebar";
import { ability, type Actions } from "@/config/casl/ability";
import { cn } from "@/lib/utils";

type NavChild = {
  name: string;
  href: string;
  permission?: { action: string; subject: string }
};

type NavItem = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: NavChild[];
  permission?: { action: string; subject: string };
};

// Navigation với permissions
const navigation: NavItem[] = [
  {
    name: "Cấu hình danh mục",
    href: "/admin/header-config",
    icon: Layers,
    permission: { action: "VIEW", subject: "CATEGORIES" },
  },
  {
    name: "Quản lý bài viết",
    href: "/admin/news",
    icon: Newspaper,
    permission: { action: "VIEW", subject: "POSTS" },
  },
  {
    name: "Quản lý leads",
    href: "/admin/contact-management/contact-requests",
    icon: Inbox,
    permission: { action: "VIEW", subject: "CONTACT" },
  },
  {
    name: "Quản lý tag tìm kiếm",
    href: "/admin/tags",
    icon: Tags,
    permission: { action: "VIEW", subject: "TAGS" },
  },
  {
    name: "Quản lý video",
    href: "/admin/videos",
    icon: Video,
    permission: { action: "VIEW", subject: "VIDEOS" },
  },
  {
    name: "Quản lý footer",
    href: "/admin/footer",
    icon: PanelBottom,
    permission: { action: "VIEW", subject: "FOOTERS" },
  },
  {
    name: "Quản lý Email đăng ký",
    href: "/admin/contact-management/newsletter-emails",
    icon: Mail,
    permission: { action: "VIEW", subject: "NEWSLETTER" },
  },
  {
    name: "Quản lý ảnh",
    href: "/admin/media",
    icon: ImagePlus,
    permission: { action: "VIEW", subject: "FILES" }
  },
  {
    name: "Quản lý quảng cáo",
    href: "/admin/advertisements",
    icon: Megaphone,
    permission: { action: "VIEW", subject: "ADVERTISEMENTS" },
  },
];

// Admin system menu - chỉ system_admin thấy
const adminSystemMenu: NavItem[] = [
  {
    name: "Quản lý vai trò",
    href: "/admin/roles",
    icon: Shield,
    permission: { action: "VIEW", subject: "ROLES" },
  },
  {
    name: "Quản lý người dùng",
    href: "/admin/users",
    icon: UserCog,
    permission: { action: "VIEW", subject: "USERS" },
  },
  {
    name: "Yêu cầu reset MK",
    href: "/admin/password-reset-requests",
    icon: KeyRound,
    permission: { action: "VIEW", subject: "USERS" },
  },
];

const membersReservedSegments = new Set(["fields", "regions"]);

export function AdminSidebar() {
  const pathname = usePathname();
  const { close, isOpen } = useSidebarStore();
  const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>({});


  const hasPermission = (permission: { action: string; subject: string } | undefined) => {
    if (!permission) return true;
    return ability.can(permission.action as Actions, permission.subject);
  };

  const isItemActive = React.useCallback(
    (href: string) => {
      if (href === "/admin/members") {
        if (pathname === href) return true;
        if (!pathname.startsWith(`${href}/`)) return false;

        const nextSegment = pathname.slice(`${href}/`.length).split("/")[0];
        return Boolean(nextSegment) && !membersReservedSegments.has(nextSegment);
      }

      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname]
  );

  const isGroupActive = (children: NavChild[]) =>
    children.some((child) => isItemActive(child.href));

  const toggleGroup = (name: string) =>
    setExpandedGroups((previous) => ({ ...previous, [name]: !previous[name] }));

  const handleMobileNavigate = () => {
    if (window.innerWidth < 1024) close();
  };

  // Filter navigation items based on permissions
  const filteredNavigation = navigation.filter((item) => hasPermission(item.permission));

  // Filter admin system menu based on permissions
  const filteredAdminMenu = adminSystemMenu.filter((item) => hasPermission(item.permission));

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-dvh border-r border-[#063e8e]/10 bg-gradient-to-b from-[#f6f9ff] via-[#edf4ff] to-[#f8fbff] shadow-[0_18px_45px_rgba(6,62,142,0.08)] transition-all duration-300",
        isOpen ? "w-72 translate-x-0 lg:w-72" : "-translate-x-full lg:w-24 lg:translate-x-0"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo Header */}
        <div className={cn("px-4 pb-4 pt-5", !isOpen && "px-3")}>
          <Link
            href="/admin"
            onClick={handleMobileNavigate}
            className={cn(
              "flex items-center backdrop-blur-sm",
              isOpen
                ? "gap-4 rounded-[28px] border border-white/80 bg-white/95 px-4 py-4 shadow-[0_14px_32px_rgba(6,62,142,0.08)]"
                : "justify-center px-0 py-4"
            )}
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#063e8e]/10 bg-[#f8fbff] shadow-sm">
              <Image
                src="/logo.png"
                alt="VCCI HCM"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
                priority
              />
            </div>

            {isOpen ? (
              <div className="min-w-0">
                <div className="truncate text-[13px] font-bold uppercase tracking-[0.22em] text-[#063e8e]">
                  VCCI News
                </div>
                <div className="mt-1 text-sm leading-5 text-slate-600">
                  Trang quản trị website
                </div>
              </div>
            ) : null}
          </Link>
        </div>
        <nav
          className={cn(
            "scrollbar flex-1 space-y-3 overflow-y-auto px-4 pb-5 pt-2",
            !isOpen && "px-3"
          )}
        >
          {filteredNavigation.map((item) => {
            if (item.children) {
              const active = isGroupActive(item.children);
              const expanded = expandedGroups[item.name] ?? false;

              return (
                <div
                  key={item.name}
                  className={cn(
                    "rounded-[26px] border border-transparent transition-all duration-200",
                    isOpen && expanded && "border-[#063e8e]/10 bg-white/70 p-2 shadow-sm"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => isOpen && toggleGroup(item.name)}
                    title={!isOpen ? item.name : undefined}
                    className={cn(
                      "flex w-full items-center rounded-2xl text-sm font-medium transition-all duration-200",
                      active
                        ? "bg-[#063e8e] text-white shadow-[0_12px_24px_rgba(6,62,142,0.18)]"
                        : "text-slate-700 hover:bg-white/85 hover:text-[#063e8e]",
                      isOpen ? "gap-3 px-4 py-3.5" : "mx-auto h-14 w-14 justify-center p-0"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {isOpen ? (
                      <>
                        <span className="min-w-0 flex-1 text-left">{item.name}</span>
                        <ChevronDown
                          className={cn("h-4 w-4 shrink-0 transition-transform", expanded && "rotate-180")}
                        />
                      </>
                    ) : null}
                  </button>

                  {isOpen && expanded ? (
                    <div className="mt-2 space-y-1.5 border-l border-[#d5e1f7] pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={handleMobileNavigate}
                          className={cn(
                            "group relative flex rounded-2xl px-4 py-3 text-sm leading-6 transition-all",
                            isItemActive(child.href)
                              ? "bg-[#dbe8ff] font-semibold text-[#063e8e]"
                              : "text-slate-600 hover:bg-[#eef4ff] hover:text-[#063e8e]"
                          )}
                        >
                          <span className="block">{child.name}</span>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            }

            const active = item.href ? isItemActive(item.href) : false;

            return (
              <Link
                key={item.name}
                href={item.href || "#"}
                onClick={handleMobileNavigate}
                title={!isOpen ? item.name : undefined}
                className={cn(
                  "flex items-center rounded-2xl text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-[#063e8e] text-white shadow-[0_12px_24px_rgba(6,62,142,0.18)]"
                    : "text-slate-700 hover:bg-white/85 hover:text-[#063e8e]",
                  isOpen ? "gap-3 px-4 py-3.5" : "mx-auto h-14 w-14 justify-center p-0"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {isOpen ? <span className="min-w-0 flex-1">{item.name}</span> : null}
              </Link>
            );
          })}

          {/* Admin System Menu - Chỉ system_admin thấy */}
          {filteredAdminMenu.length > 0 && (
            <>
              <div className="border-t border-[#063e8e]/10 pt-3" />
              {isOpen ? (
                <div className="flex items-center gap-2 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#063e8e]">
                  <Shield className="h-3.5 w-3.5" />
                  Quản trị hệ thống
                </div>
              ) : null}

              {filteredAdminMenu.map((item) => {
                const active = item.href ? isItemActive(item.href) : false;

                return (
                  <Link
                    key={item.name}
                    href={item.href || "#"}
                    onClick={handleMobileNavigate}
                    title={!isOpen ? item.name : undefined}
                    className={cn(
                      "flex items-center rounded-2xl text-sm font-medium transition-all duration-200",
                      active
                        ? "bg-[#063e8e] text-white shadow-[0_12px_24px_rgba(6,62,142,0.18)]"
                        : "text-slate-700 hover:bg-white/85 hover:text-[#063e8e]",
                      isOpen ? "gap-3 px-4 py-3.5" : "mx-auto h-14 w-14 justify-center p-0"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {isOpen ? <span className="min-w-0 flex-1">{item.name}</span> : null}
                  </Link>
                );
              })}
            </>
          )}
        </nav>
      </div>
    </aside>
  );
}

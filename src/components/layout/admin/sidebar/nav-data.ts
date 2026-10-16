import {
  Briefcase,
  Building2,
  Globe,
  ImagePlus,
  Inbox,
  KeyRound,
  Layers,
  LayoutDashboard,
  Mail,
  Newspaper,
  PanelBottom,
  Shield,
  Tags,
  UserCog,
  Users,
} from "lucide-react";

export type NavChild = {
  labelKey: string;
  href: string;
  permission?: { action: string; subject: string };
};

export type NavItem = {
  labelKey: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: NavChild[];
  permission?: { action: string; subject: string };
};

export const contentNavigation: NavItem[] = [
  {
    labelKey: "dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    permission: { action: "VIEW", subject: "DASHBOARD" },
  },
  {
    labelKey: "headerConfig",
    href: "/admin/header-config",
    icon: Layers,
    permission: { action: "VIEW", subject: "HEADER_CONFIGS" },
  },
  {
    labelKey: "footer",
    href: "/admin/footer",
    icon: PanelBottom,
    permission: { action: "VIEW", subject: "FOOTERS" },
  },
  {
    labelKey: "pageConfig",
    href: "/admin/page-config",
    icon: Globe,
    permission: { action: "VIEW", subject: "PAGE_CONFIGS" },
  },
  {
    labelKey: "posts",
    href: "/admin/posts",
    icon: Newspaper,
    permission: { action: "VIEW", subject: "POSTS" },
  },
  {
    labelKey: "partners",
    href: "/admin/partners",
    icon: Building2,
    permission: { action: "VIEW", subject: "PARTNERS" },
  },
  {
    labelKey: "jobs",
    href: "/admin/jobs",
    icon: Briefcase,
    permission: { action: "VIEW", subject: "JOBS" },
  },
  {
    labelKey: "leaders",
    href: "/admin/leaders",
    icon: Users,
    permission: { action: "VIEW", subject: "LEADERS" },
  },
  {
    labelKey: "newsletter",
    href: "/admin/newsletter-emails",
    icon: Mail,
    permission: { action: "VIEW", subject: "NEWSLETTER" },
  },
  {
    labelKey: "contactRequests",
    href: "/admin/contact-requests",
    icon: Inbox,
    permission: { action: "VIEW", subject: "CONTACT" },
  },
  {
    labelKey: "website",
    href: "/admin/website",
    icon: Globe,
    permission: { action: "VIEW", subject: "CONTACT_INFOS" },
  },
  {
    labelKey: "tags",
    href: "/admin/tags",
    icon: Tags,
    permission: { action: "VIEW", subject: "TAGS" },
  },
  {
    labelKey: "media",
    href: "/admin/media",
    icon: ImagePlus,
    permission: { action: "VIEW", subject: "FILES" }
  },
];

export const adminSystemNavigation: NavItem[] = [
  {
    labelKey: "roles",
    href: "/admin/roles",
    icon: Shield,
    permission: { action: "VIEW", subject: "ROLES" },
  },
  {
    labelKey: "users",
    href: "/admin/users",
    icon: UserCog,
    permission: { action: "VIEW", subject: "USERS" },
  },
  {
    labelKey: "passwordResetRequests",
    href: "/admin/password-reset-requests",
    icon: KeyRound,
    permission: { action: "VIEW", subject: "USERS" },
  },
];

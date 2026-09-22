import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "../nav-data";
import { cn } from "@/lib/utils";

type DesktopNavProps = {
  items: NavItem[];
  openMenu: string | null;
  setOpenMenu: (value: string | null) => void;
  hoveredLabel: string | null;
  setHoveredLabel: (value: string | null) => void;
  scheduleOpen: (label: string) => void;
  cancelHover: () => void;
  dark: boolean;
};

export function DesktopNav({
  items,
  openMenu,
  setOpenMenu,
  hoveredLabel,
  setHoveredLabel,
  scheduleOpen,
  cancelHover,
  dark,
}: DesktopNavProps) {
  const t = useTranslations();

  return (
    <nav aria-label={t("actions.mainNavigation")} className="hidden h-full items-stretch gap-0.5 lg:flex">
      {items.map((item) => {
        const expanded = openMenu === item.label;
        const hovered = hoveredLabel === item.label;
        const displayLabel = item.labelKey ? t(item.labelKey) : item.label;
        return (
          <div
            key={item.label}
            className="flex items-stretch"
            onMouseEnter={() => {
              setHoveredLabel(item.label);
              if (item.columns) scheduleOpen(item.label);
              else setOpenMenu(null);
            }}
            onMouseLeave={() => {
              setHoveredLabel(null);
              cancelHover();
            }}
          >
            {item.columns ? (
              <Link
                href={item.href}
                aria-expanded={expanded}
                className={cn(
                  "relative flex items-center gap-1.5 px-3 text-[13px] font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary",
                  hovered ? "text-primary" : dark ? "text-white/85 hover:text-white" : "text-foreground hover:text-primary",
                )}
              >
                {displayLabel}
                <ChevronDown aria-hidden="true" className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")} />
              </Link>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center px-3 text-[13px] font-semibold transition",
                  dark ? "text-white/85 hover:text-white" : "text-foreground hover:text-primary",
                )}
              >
                {displayLabel}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

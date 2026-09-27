import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { NavItem } from "../nav-data";
import { cn } from "@/lib/utils";

export function MobileDrawer({ items, onClose }: { items: NavItem[]; onClose: () => void }) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const t = useTranslations();
  return (
    <div className="fixed inset-x-0 bottom-0 top-[68px] z-50 overflow-y-auto bg-background lg:hidden">
      <nav aria-label={t("actions.mobileNavigation")} className="px-5 pb-8 pt-2">
        {items.map((item) => {
          const expanded = openGroup === item.label;
          const displayLabel = item.labelKey ? t(item.labelKey) : item.label;
          return (
            <div key={item.label} className="border-b border-border">
              <div className="flex items-center">
                <Link href={item.href} onClick={onClose} className="flex-1 py-4 text-[17px] font-semibold text-foreground">
                  {displayLabel}
                </Link>
                {item.columns ? (
                  <button
                    type="button"
                    onClick={() => setOpenGroup(expanded ? null : item.label)}
                    aria-expanded={expanded}
                    aria-label={`${expanded ? t("actions.collapse") : t("actions.expand")} ${displayLabel}`}
                    className="grid size-11 place-items-center rounded-lg text-muted-foreground hover:bg-muted"
                  >
                    <ChevronDown className={cn("h-5 w-5 transition-transform", expanded && "rotate-180 text-primary")} />
                  </button>
                ) : null}
              </div>
              {item.columns && expanded ? (
                <div className="pb-4">
                  {item.columns.map((column, index) => (
                    <div key={`${column.heading}-${index}`} className="mt-2">
                      <p className="px-1 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{column.headingKey ? t(column.headingKey) : column.heading}</p>
                      <ul>
                        {column.links.map((link) => (
                          <li key={link.href}>
                            <Link href={link.href} onClick={onClose} className="block py-2.5 pl-1 text-[15px] text-foreground">
                              {link.labelKey ? t(link.labelKey) : link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
        <Link
          href="/contact?type=consultation"
          onClick={onClose}
          className="mt-6 flex h-13 items-center justify-center gap-2 rounded-xl bg-primary py-4 text-[15px] font-semibold text-white"
        >
          {t("actions.talkToExpert")}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
        <p className="mt-4 text-center text-[12px] text-muted-foreground">{t("common.hoChiMinhCity")} · {t("common.globalDelivery")}</p>
      </nav>
    </div>
  );
}

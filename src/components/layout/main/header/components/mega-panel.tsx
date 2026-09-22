import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import type { NavItem } from "../nav-data";
import { cn } from "@/lib/utils";

export function MegaPanel({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const t = useTranslations();
  const hasFeatured = Boolean(item.featured);
  return (
    <div className="absolute inset-x-0 top-full border-b border-border bg-background shadow-[0_24px_48px_-12px_rgba(23,33,47,0.18)]">
      <div className="container grid w-full gap-8 py-8 lg:grid-cols-12">
        <div className={cn("grid gap-8", hasFeatured ? "lg:col-span-8" : "lg:col-span-12", item.columns!.length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : "")}>
          {item.columns!.map((column, index) => (
            <div key={`${column.heading}-${index}`}>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.14em] text-foreground">{column.headingKey ? t(column.headingKey) : column.heading}</h3>
              <p className="mt-1.5 min-h-[32px] text-[12px] leading-snug text-muted-foreground">{column.blurbKey ? t(column.blurbKey) : column.blurb}</p>
              <ul className="mt-3 space-y-0.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="group block rounded-lg px-3 py-2 transition hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="text-[14px] font-semibold text-foreground group-hover:text-primary">{link.labelKey ? t(link.labelKey) : link.label}</span>
                        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-border transition group-hover:translate-x-0.5 group-hover:text-primary" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {item.featured ? (
          <div className="flex flex-col justify-between rounded-2xl bg-surface-dark p-6 lg:col-span-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary-light">{item.featured.eyebrow}</span>
              <p className="mt-3 text-[19px] font-semibold leading-snug text-white">{item.featured.title}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{item.featured.body}</p>
            </div>
            <Link
              href={item.featured.href}
              onClick={onClose}
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-[14px] font-semibold text-white transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {item.featured.cta}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

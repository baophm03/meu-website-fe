"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const localeLabels: Record<string, string> = {
  vi: "Tiếng Việt",
  en: "English",
};

const localeShort: Record<string, string> = {
  vi: "VI",
  en: "EN",
};

function FlagIcon({ locale, className }: { locale: string; className?: string }) {
  return (
    <span className={cn("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[2px]", className)}>
      {locale === "vi" ? (
        <svg viewBox="0 0 30 20" className="h-full w-full" preserveAspectRatio="none">
          <rect width="30" height="20" fill="#DA251D" />
          <polygon
            points="15,4 16.35,8.15 20.71,8.15 17.18,10.71 18.53,14.85 15,12.29 11.47,14.85 12.82,10.71 9.29,8.15 13.65,8.15"
            fill="#FFFF00"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 30 20" className="h-full w-full" preserveAspectRatio="none">
          <rect width="30" height="20" fill="#012169" />
          <path d="M0,0 L30,20 M30,0 L0,20" stroke="#fff" strokeWidth="4" />
          <path d="M0,0 L30,20 M30,0 L0,20" stroke="#C8102E" strokeWidth="2" />
          <path d="M15,0 v20 M0,10 h30" stroke="#fff" strokeWidth="6" />
          <path d="M15,0 v20 M0,10 h30" stroke="#C8102E" strokeWidth="4" />
        </svg>
      )}
    </span>
  );
}

export function LanguageSwitcher({ dark }: { dark: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const switchLocale = (newLocale: string) => {
    setOpen(false);
    if (newLocale === locale) return;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div ref={ref} className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t("actions.switchLanguage", { locale: locale.toUpperCase() })}
        className={cn(
          "flex h-10 items-center gap-1.5 rounded-lg px-2.5 transition",
          dark ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        <FlagIcon locale={locale} className="h-[14px] w-[21px]" />
        <span className="text-[12px] font-bold uppercase tracking-[0.08em]">{localeShort[locale] ?? locale}</span>
        <ChevronDown aria-hidden="true" className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open ? (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-1 min-w-[170px] overflow-hidden rounded-xl border border-border bg-background py-1 shadow-[0_16px_40px_-12px_rgba(23,33,47,0.25)]"
        >
          {routing.locales.map((l) => (
            <button
              key={l}
              type="button"
              role="option"
              aria-selected={l === locale}
              onClick={() => switchLocale(l)}
              className="flex w-full items-center gap-2.5 px-3 py-2.5 text-[13px] transition hover:bg-accent"
            >
              <FlagIcon locale={l} className="h-[14px] w-[21px]" />
              <span className={cn("flex-1 text-left", l === locale ? "font-semibold text-foreground" : "text-muted-foreground")}>
                {localeLabels[l] ?? l}
              </span>
              {l === locale ? <Check aria-hidden="true" className="h-4 w-4 text-primary" /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

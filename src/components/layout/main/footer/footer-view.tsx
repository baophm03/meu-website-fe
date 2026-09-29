"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type FooterLinkItem = {
  key: string;
  type: "link" | "text" | "image";
  content: string;
  href: string | null;
  isExternal: boolean;
  imageSrc?: string | null;
};

export type FooterRowData = {
  key: string;
  items: FooterLinkItem[];
};

export type FooterColumnData = {
  key: string;
  title: string | null;
  rows: FooterRowData[];
};

type FooterViewProps = {
  columns: FooterColumnData[];
  rightsText: string;
  poweredByLabel: string;
  privacyLabel: string;
  securityLabel: string;
  trustCenterLabel: string;
};

function ElementLink({
  href,
  isExternal,
  className,
  children,
}: {
  href: string;
  isExternal: boolean;
  className: string;
  children: ReactNode;
}) {
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function FooterView({
  columns,
  rightsText,
  poweredByLabel,
  privacyLabel,
  securityLabel,
  trustCenterLabel,
}: FooterViewProps) {
  const pathname = usePathname();
  const isHome = pathname === "/en" || pathname === "/vi" || pathname === "/";

  // Home keeps the immersive dark/glow treatment; every other page (light
  // background) gets a calmer, professional blue-led palette with minimal glow.
  const theme = isHome
    ? {
      section: "bg-[linear-gradient(180deg,#070c26_0%,#05081a_55%,#04050f_100%)] text-white",
      divider: "border-white/10",
      heading: "text-white",
      tagline: "text-slate-400",
      contactBorder: "border-white/15 text-slate-400 hover:border-[#FBAE0C] hover:text-[#FBAE0C]",
      link: "text-slate-400 hover:text-[#FBAE0C]",
      image: "opacity-80 hover:opacity-100",
      bottomText: "text-slate-500",
      separator: "text-slate-600",
      poweredBy: "text-primary-light hover:text-[#FBAE0C]",
      bottomLink: "hover:text-[#FBAE0C]",
    }
    : {
      section: "bg-[#F5F5F7] text-foreground",
      divider: "border-border",
      heading: "text-foreground",
      tagline: "text-muted-foreground",
      contactBorder: "border-border text-muted-foreground hover:border-primary hover:text-primary",
      link: "text-muted-foreground hover:text-primary",
      image: "opacity-70 hover:opacity-100",
      bottomText: "text-muted-foreground",
      separator: "text-border",
      poweredBy: "text-primary hover:text-primary-hover",
      bottomLink: "hover:text-primary",
    };

  return (
    <footer className={cn("relative overflow-hidden", theme.section)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {isHome ? (
          <span className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(102,140,255,0.4),transparent)]" />
        ) : (
          <span className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(37,99,235,0.4),transparent)]" />
        )}
      </div>
      <div className="container relative w-full py-14 lg:pt-20 lg:pb-10">
        <div className={cn("grid gap-x-8 gap-y-10 border-b pb-12 sm:grid-cols-2 lg:grid-cols-4", theme.divider)}>
          {columns.map((column) => (
            <nav key={column.key} aria-label={column.title ?? undefined}>
              {column.title ? (
                <h2 className={cn("text-[11px] font-bold uppercase tracking-[0.14em]", theme.heading)}>
                  {column.title}
                </h2>
              ) : null}
              <ul className="mt-4 space-y-2.5">
                {column.rows.map((row) => {
                  // 1 element = full width, 2 = 50/50, 3 = thirds, 4+ wraps
                  // at thirds per cell.
                  const cellBasis = `${100 / Math.min(Math.max(row.items.length, 1), 3)}%`;
                  return (
                    <li key={row.key}>
                      <div className="flex flex-wrap gap-y-2.5">
                        {row.items.map((el) => {
                          if (el.type === "image") {
                            if (!el.imageSrc) return null;
                            const img = (
                              <Image
                                src={el.imageSrc}
                                alt={column.title ?? ""}
                                width={120}
                                height={48}
                                className={cn("h-8 w-auto object-contain transition", theme.image)}
                              />
                            );
                            return (
                              <div key={el.key} className="min-w-0 pr-3" style={{ flex: `0 0 ${cellBasis}` }}>
                                {el.href ? (
                                  <ElementLink href={el.href} isExternal={el.isExternal} className="inline-block">
                                    {img}
                                  </ElementLink>
                                ) : (
                                  img
                                )}
                              </div>
                            );
                          }

                          return (
                            <div key={el.key} className="min-w-0 pr-3" style={{ flex: `0 0 ${cellBasis}` }}>
                              {el.href ? (
                                <ElementLink
                                  href={el.href}
                                  isExternal={el.isExternal}
                                  className={cn("text-[13px] leading-snug transition", theme.link)}
                                >
                                  {el.content}
                                </ElementLink>
                              ) : (
                                <span className={cn("text-[13px] leading-snug", theme.tagline)}>{el.content}</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        <div
          className={cn(
            "flex flex-col gap-4 pt-6 text-[12px] sm:flex-row sm:items-center sm:justify-between",
            theme.bottomText,
          )}
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <span>{rightsText}</span>
            <span className={theme.separator}>|</span>
            <span>
              {poweredByLabel}{" "}
              <Link href="https://vietprodev.vn" className={cn("transition", theme.poweredBy)} target="_blank">
                VietProDev
              </Link>
            </span>
          </div>
          <div className="flex flex-wrap gap-5">
            <Link href="/trust/privacy" className={cn("transition", theme.bottomLink)}>
              {privacyLabel}
            </Link>
            <Link href="/trust/security" className={cn("transition", theme.bottomLink)}>
              {securityLabel}
            </Link>
            <Link href="/trust" className={cn("transition", theme.bottomLink)}>
              {trustCenterLabel}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { useCmsNavigation } from "./use-cms-navigation";
import { cn } from "@/lib/utils";
import { MegaPanel } from "./components/mega-panel";
import { MobileDrawer } from "./components/mobile-drawer";
import { DesktopNav } from "./components/desktop-nav";
import { HeaderActions } from "./components/header-actions";
import { SearchDropdown } from "./components/search-dropdown";

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const navItems = useCmsNavigation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenMenu(null);
      setMobileOpen(false);
      setSearchOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scheduleOpen = (label: string) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenMenu(label), 120);
  };

  const cancelHover = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };

  const activeItem = navItems.find((item) => item.label === openMenu && item.columns);
  const isHome = pathname === "/en" || pathname === "/vi" || pathname === "/";
  const overlay = isHome && !scrolled && !mobileOpen;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-[68px] transition-colors duration-300",
        overlay
          ? "bg-transparent text-white"
          : "bg-surface-dark text-white shadow-[0_2px_12px_rgba(0,0,0,0.3)]",
      )}
      onMouseLeave={() => {
        cancelHover();
        setOpenMenu(null);
      }}
    >
      <div className="container flex h-[68px] w-full items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="MeU Solutions — home"
          className="flex shrink-0 items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <Image src="/logo.png" alt="" width={60} height={60} priority className="h-15 w-15 object-contain" />
        </Link>
        <DesktopNav
          items={navItems}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          hoveredLabel={hoveredLabel}
          setHoveredLabel={setHoveredLabel}
          scheduleOpen={scheduleOpen}
          cancelHover={cancelHover}
          dark
        />

        <HeaderActions
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          dark
        />
      </div>

      {activeItem ? <MegaPanel item={activeItem} onClose={() => setOpenMenu(null)} /> : null}

      {searchOpen ? <SearchDropdown onClose={() => setSearchOpen(false)} /> : null}

      {mobileOpen ? <MobileDrawer items={navItems} onClose={() => setMobileOpen(false)} /> : null}
    </header>
  );
}

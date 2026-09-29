import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * AbstractPanel — a brand-consistent graphic used in place of a photo when no
 * suitable, on-brand, trademark-free image is available (e.g. mismatched
 * stock photography, third-party product screenshots/logos). Fills its
 * relative parent the same way `<SafeImage fill />` would.
 */
export function AbstractPanel({
  icon: Icon,
  className,
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-surface-dark", className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 22% 22%, rgba(0,240,255,0.28), transparent 55%), radial-gradient(circle at 82% 85%, rgba(49,92,255,0.4), transparent 55%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative flex h-full items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-sm sm:h-16 sm:w-16">
          <Icon aria-hidden="true" className="h-6 w-6 text-primary-light sm:h-7 sm:w-7" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}

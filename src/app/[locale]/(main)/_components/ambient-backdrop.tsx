/**
 * Shared ambient gradient field — layered neon washes (web3-style mesh).
 * `dark` is used on the home page (keeps the dot grid + light beams);
 * `light` everywhere else is softer and line-free.
 */
export function AmbientBackdrop({ variant = "light" }: { variant?: "light" | "dark" }) {
  const dark = variant === "dark";
  const glow = (cls: string) => cls; // readability alias
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Mesh gradient blobs — blue / cyan / violet / fuchsia sweep down the page */}
      <div className={glow(dark
        ? "absolute -left-[14%] top-[2%] h-[760px] w-[58%] rounded-full bg-primary/[0.22] blur-[140px]"
        : "absolute -left-[14%] top-[2%] h-[760px] w-[58%] rounded-full bg-primary/[0.07] blur-[140px]")} />
      <div className={glow(dark
        ? "absolute right-[-16%] top-[14%] h-[840px] w-[54%] rounded-full bg-cyan-400/[0.16] blur-[150px]"
        : "absolute right-[-16%] top-[14%] h-[840px] w-[54%] rounded-full bg-cyan-400/[0.06] blur-[150px]")} />
      <div className={glow(dark
        ? "absolute left-[-8%] top-[34%] h-[780px] w-[52%] rounded-full bg-violet-500/[0.18] blur-[150px]"
        : "absolute left-[-8%] top-[34%] h-[780px] w-[52%] rounded-full bg-violet-400/[0.06] blur-[150px]")} />
      <div className={glow(dark
        ? "absolute right-[-10%] top-[52%] h-[760px] w-[50%] rounded-full bg-primary/[0.18] blur-[140px]"
        : "absolute right-[-10%] top-[52%] h-[760px] w-[50%] rounded-full bg-primary/[0.06] blur-[140px]")} />
      <div className={glow(dark
        ? "absolute left-[10%] top-[70%] h-[700px] w-[48%] rounded-full bg-fuchsia-500/[0.12] blur-[150px]"
        : "absolute left-[10%] top-[70%] h-[700px] w-[48%] rounded-full bg-fuchsia-400/[0.05] blur-[150px]")} />
      <div className={glow(dark
        ? "absolute right-[8%] top-[88%] h-[640px] w-[46%] rounded-full bg-cyan-400/[0.12] blur-[140px]"
        : "absolute right-[8%] top-[88%] h-[640px] w-[46%] rounded-full bg-cyan-300/[0.05] blur-[140px]")} />

      {dark ? (
        <>
          {/* Dot grid — fades in and out along the page */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[length:26px_26px] opacity-[0.5] [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_78%,transparent)]" />

          {/* Diagonal light beams — the "energy" strokes typical of web3 pages */}
          <div className="absolute -top-1/4 left-[18%] h-[160%] w-px rotate-[24deg] bg-[linear-gradient(to_bottom,transparent,rgba(0,240,255,0.5),transparent)]" />
          <div className="absolute -top-1/4 right-[24%] h-[160%] w-px rotate-[24deg] bg-[linear-gradient(to_bottom,transparent,rgba(139,92,246,0.45),transparent)]" />
        </>
      ) : null}
    </div>
  );
}

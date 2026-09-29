import Header from "@/components/layout/main/header";
import Footer from "@/components/layout/main/footer";
import React from "react";

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <div className="relative flex-1 bg-background">
        {/* Soft ambient gradient field carried across every (main) page */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-[14%] top-[2%] h-[760px] w-[58%] rounded-full bg-primary/[0.07] blur-[140px]" />
          <div className="absolute right-[-16%] top-[14%] h-[840px] w-[54%] rounded-full bg-cyan-400/[0.06] blur-[150px]" />
          <div className="absolute left-[-8%] top-[34%] h-[780px] w-[52%] rounded-full bg-violet-400/[0.06] blur-[150px]" />
          <div className="absolute right-[-10%] top-[52%] h-[760px] w-[50%] rounded-full bg-primary/[0.06] blur-[140px]" />
          <div className="absolute left-[10%] top-[70%] h-[700px] w-[48%] rounded-full bg-fuchsia-400/[0.05] blur-[150px]" />
          <div className="absolute right-[8%] top-[88%] h-[640px] w-[46%] rounded-full bg-cyan-300/[0.05] blur-[140px]" />
        </div>
        <div className="relative">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

import Header from "@/components/layout/main/header";
import Footer from "@/components/layout/main/footer";
import React from "react";

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <div className="relative flex-1 bg-background">
        <div className="relative">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

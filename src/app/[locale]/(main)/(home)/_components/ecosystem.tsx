"use client";

import dynamic from "next/dynamic";

// Code-split: three.js stays out of the initial client bundle.
const EcosystemScene = dynamic(() => import("./ecosystem-scene"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(51,92,255,0.14),transparent_62%)]"
    />
  ),
});

export function Ecosystem() {
  return (
    <div className="absolute inset-0">
      <EcosystemScene />
    </div>
  );
}

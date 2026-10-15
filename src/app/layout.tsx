import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./_providers";
import React from "react";
import { links } from "@/config/links";

export const metadata: Metadata = {
  icons: { icon: '/favicon.ico', shortcut: '/favicon.ico' },
  title: 'MeU Solutions — Technology with Business Intent',
  description: 'MeU partners with organizations to design, build and operate technology solutions that move their business forward.',
  metadataBase: new URL(links.siteURL),
  alternates: { canonical: links.siteURL },
  openGraph: {
    title: 'MeU Solutions — Technology with Business Intent',
    description: 'Strategy, technology and delivery for ambitious organizations.',
    url: links.siteURL,
    siteName: 'MeU Solutions',
    images: [
      {
        url: `${links.siteURL}/thumbnail.png`,
        width: 1200,
        height: 630,
        alt: 'MeU Solutions'
      }
    ],
    locale: 'vi_VN',
    type: 'website'
  },
  twitter: { card: 'summary_large_image', title: 'MeU Solutions', description: 'Technology with business intent.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

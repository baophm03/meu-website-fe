export type MegaLink = { label: string; labelKey?: string; href: string };
export type MegaColumn = { heading: string; headingKey?: string; blurb: string; blurbKey?: string; links: MegaLink[] };
export type NavItem = {
  label: string;
  labelKey?: string;
  href: string;
  columns?: MegaColumn[];
  featured?: { eyebrow: string; title: string; body: string; href: string; cta: string };
};


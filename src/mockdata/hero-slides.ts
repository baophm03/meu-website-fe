export interface HeroSlide {
  id: string;
  image: string;
  primaryHref: string;
  secondaryHref: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "s1",
    image: "/images/hero/hero-1.jpg",
    primaryHref: "/contact",
    secondaryHref: "/solutions",
  },
  {
    id: "s2",
    image: "/images/hero/hero-2.jpg",
    primaryHref: "/contact",
    secondaryHref: "/about/us",
  },
  {
    id: "s3",
    image: "/images/hero/hero-4.jpg",
    primaryHref: "/contact",
    secondaryHref: "/solutions",
  },
  {
    id: "s4",
    image: "/images/hero/hero-3.jpg",
    primaryHref: "/contact",
    secondaryHref: "/case-studies",
  },
  {
    id: "s5",
    image: "/images/hero/hero-5.jpg",
    primaryHref: "/about/us",
    secondaryHref: "/solutions",
  },
];

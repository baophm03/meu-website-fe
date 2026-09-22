import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";
import { useTranslations } from "next-intl";

const shell = "container";
const displayHeading = "font-medium tracking-[-0.045em] text-balance";
const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

// Placeholder logos — replace with approved client names/logos.
const CLIENTS = [
  { name: "Vingroup", logo: "/images/clients/vingroup.png" },
  { name: "FPT", logo: "/images/clients/fpt.png" },
  { name: "Viettel", logo: "/images/clients/viettel.png" },
  { name: "Vinamilk", logo: "/images/clients/vinamilk.png" },
  { name: "VPBank", logo: "/images/clients/vpbank.png" },
  { name: "Techcombank", logo: "/images/clients/techcombank.png" },
  { name: "Sacombank", logo: "/images/clients/sacombank.png" },
  { name: "MoMo", logo: "/images/clients/momo.png" },
  { name: "VNPAY", logo: "/images/clients/vnpay.png" },
  { name: "Tiki", logo: "/images/clients/tiki.png" },
  { name: "PNJ", logo: "/images/clients/pnj.png" },
  { name: "TH Group", logo: "/images/clients/thgroup.png" },
  { name: "Biti's", logo: "/images/clients/bitis.png" },
  { name: "Bamboo Airways", logo: "/images/clients/bambooairways.png" },
  { name: "Sun Group", logo: "/images/clients/sungroup.png" },
  { name: "Vinasun", logo: "/images/clients/vinasun.png" },
  { name: "ACB", logo: "/images/clients/acb.png" },
  { name: "Vietcombank", logo: "/images/clients/vietcombank.png" },
  { name: "MSB", logo: "/images/clients/msb.png" },
  { name: "VNPT", logo: "/images/clients/vnpt.png" },
];

const CLIENT_ROWS = [CLIENTS.slice(0, 7), CLIENTS.slice(7, 14), CLIENTS.slice(14)];

const ROW_ANIMATION = [
  "animate-[marquee_50s_linear_infinite]",
  "animate-[marquee_65s_linear_infinite] [animation-direction:reverse]",
  "animate-[marquee_58s_linear_infinite]",
];

function Section({
  id,
  variant = "white",
  className,
  children,
  labelledBy,
}: {
  id?: string;
  variant?: "white" | "surface" | "dark";
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  const variants = {
    white: "bg-background text-foreground",
    surface: "bg-muted text-foreground",
    dark: "bg-surface-dark-soft text-white",
  } as const;
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("scroll-mt-20 py-16 sm:py-24 lg:py-[128px]", variants[variant], className)}>
      <Reveal className={shell}>{children}</Reveal>
    </section>
  );
}

function SectionHead({
  id,
  index,
  eyebrow,
  title,
  summary,
  tone = "light",
  action,
}: {
  id?: string;
  index?: string;
  eyebrow: string;
  title: ReactNode;
  summary?: string;
  tone?: "light" | "dark";
  action?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <div className="mb-12 sm:mb-16">
      <div className={cn("flex items-start gap-5", label)}>
        {index ? <span className="text-primary">{index}</span> : null}
        <span className={dark ? "text-white/50" : "text-muted-foreground"}>{eyebrow}</span>
      </div>
      <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <h2 id={id} className={cn(displayHeading, "max-w-[720px] text-[34px] leading-[1.04] sm:text-[46px] lg:text-[62px]", dark ? "text-white" : "text-foreground")}>{title}</h2>
        <div className="flex max-w-md shrink-0 flex-col items-start gap-6">
          {summary ? <p className={cn("text-[15px] leading-[1.7]", dark ? "text-white/60" : "text-muted-foreground")}>{summary}</p> : null}
          {action}
        </div>
      </div>
    </div>
  );
}

function ArrowLink({ href, children, tone = "light", className }: { href: string; children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-4 border-b pb-2 text-[11px] font-bold uppercase tracking-[0.1em] transition focus-visible:outline-2 focus-visible:outline-offset-4",
        tone === "dark" ? "border-white/35 text-white hover:border-primary-light focus-visible:outline-primary-light" : "border-border text-foreground hover:border-primary hover:text-primary focus-visible:outline-primary",
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </Link>
  );
}

export function ClientSuccess() {
  const t = useTranslations("home.clientSuccess");
  return (
    <Section variant="white" id="client-success">
      <SectionHead
        index="05"
        eyebrow={t("eyebrow")}
        title={t("heading")}
        summary={t("summary")}
        action={<ArrowLink href="/case-studies">{t("allCaseStudies")}</ArrowLink>}
      />

      {/* Auto-scrolling client logo wall — 3 rows, logo swaps to name on hover */}
      <div className="group relative space-y-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        {CLIENT_ROWS.map((row, rowIndex) => (
          <ul
            key={rowIndex}
            className={cn("flex w-max items-center gap-4 pr-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none", ROW_ANIMATION[rowIndex])}
          >
            {[...row, ...row].map((client, i) => (
              <li
                key={`${client.name}-${i}`}
                aria-hidden={i >= row.length}
                className="group/logo relative flex h-[72px] w-[168px] shrink-0 items-center justify-center border border-border bg-white transition-colors duration-200 hover:border-primary"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={96}
                  height={40}
                  className="max-h-9 w-auto object-contain opacity-80 transition-opacity duration-200 group-hover/logo:opacity-0"
                />
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center text-[13px] font-semibold uppercase leading-[1.3] tracking-[0.12em] text-foreground opacity-0 transition-opacity duration-200 group-hover/logo:opacity-100">
                  {client.name}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </Section>
  );
}

import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { ArrowRight, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";
import { SafeImage } from "@/components/shared/safe-image";
import { getTranslations } from "next-intl/server";
import { getApiV10Partner } from "@/api/endpoints/partner";
import type { Partner } from "@/api/models/partner";
import { resolveCmsFileUrl } from "@/utils/file";

const shell = "container";
const displayHeading = "font-medium tracking-[-0.045em] text-balance";

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

type ClientLogo = { name: string; logo: string | null };

const FALLBACK_CLIENTS: ClientLogo[] = CLIENTS.map((client) => ({ name: client.name, logo: client.logo }));

async function fetchClients(): Promise<ClientLogo[]> {
  try {
    const response = await getApiV10Partner({
      page: 1,
      pageSize: 50,
      sortField: "created_at",
      sortOrder: "asc"
    });
    const result = (response.responseData ?? {}) as unknown as { rows?: Partner[] };
    return (result.rows ?? [])
      .filter((item) => item.name?.trim())
      .map((item) => ({
        name: item.name.trim(),
        logo: item.logo?.path ? resolveCmsFileUrl(item.logo.path) : null
      }));
  } catch { return []; }
}

/** Fisher–Yates shuffle (server-side, once per request). */
function shuffle<T>(items: T[]): T[] {
  const arr = items.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Split clients into 3 marquee rows with random order. Each row is repeated in
 * shuffled chunks until it has at least MIN_ROW_ITEMS so the -50% marquee loop
 * always covers the viewport (~14 × 184px per cell ≈ 2.5k px).
 */
const MIN_ROW_ITEMS = 14;

function buildRows(clients: ClientLogo[]): ClientLogo[][] {
  const source = clients.length > 0 ? clients.slice(0, 21) : FALLBACK_CLIENTS;
  const rows: ClientLogo[][] = [[], [], []];
  shuffle(source).forEach((client, index) => rows[index % 3].push(client));
  return rows.map((row) => {
    const padded: ClientLogo[] = [];
    while (row.length > 0 && padded.length < MIN_ROW_ITEMS) { padded.push(...shuffle(row)); }
    return padded;
  });
}

const ROW_ANIMATION = [
  "animate-[marquee_50s_linear_infinite]",
  "animate-[marquee_65s_linear_infinite] [animation-direction:reverse]",
  "animate-[marquee_58s_linear_infinite]",
];

function Section({ id,
  variant = "white",
  className,
  children,
  labelledBy }: {
    id?: string;
    variant?: "white" | "surface" | "dark";
    className?: string;
    children: ReactNode;
    labelledBy?: string;
  }) {
    const variants = {
      white: "bg-transparent text-white",
      surface: "bg-white/5 text-white",
      dark: "text-white"
    } as const;
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("scroll-mt-20 py-16 sm:py-24 lg:py-[128px]", variants[variant], className)}>
      <Reveal className={shell}>{children}</Reveal>
    </section>
  );
}

function SectionHead({ id,
  title,
  summary,
  tone = "light",
  action }: {
    id?: string;
    title: ReactNode;
    summary?: string;
    tone?: "light" | "dark";
    action?: ReactNode;
  }) {
    const dark = tone === "dark";
  return (
    <div className="mb-12 sm:mb-16">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <h2 id={id} className={cn(displayHeading, "max-w-[720px] text-[34px] leading-[1.04] sm:text-[46px] lg:text-[62px]", dark ? "text-white" : "text-white")}>{title}</h2>
        <div className="flex max-w-md shrink-0 flex-col items-start gap-6">
          {summary ? <p className={cn("text-[15px] leading-[1.7]", dark ? "text-white/60" : "text-white/60")}>{summary}</p> : null}
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
        "group inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.1em] transition focus-visible:outline-2 focus-visible:outline-offset-4",
        tone === "dark" ? "text-white hover:text-primary-light focus-visible:outline-primary-light" : "text-white hover:text-primary-light focus-visible:outline-primary",
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </Link>
  );
}

export async function ClientSuccess() {
  const t = await getTranslations("home.clientSuccess");
  const rows = buildRows(await fetchClients());

  return (
    <Section variant="dark" id="client-success">
      <SectionHead
        title={t("heading")}
        summary={t("summary")}
        tone="dark"
        action={<ArrowLink href="/case-studies" tone="dark">{t("allCaseStudies")}</ArrowLink>}
      />

      {/* Auto-scrolling client logo wall — 3 rows, logo swaps to name on hover */}
      <div className="group relative space-y-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        {rows.map((row, rowIndex) => (
          <ul
            key={rowIndex}
            className={cn("flex w-max items-center gap-4 pr-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none", ROW_ANIMATION[rowIndex])}
          >
            {[...row, ...row].map((client, i) => (
              <li
                key={`${client.name}-${i}`}
                aria-hidden={i >= row.length}
                className="group/logo relative flex h-[72px] w-[168px] shrink-0 items-center justify-center rounded-md border border-border bg-white transition-colors duration-200 hover:border-primary"
              >
                {client.logo ? (
                  <>
                    <SafeImage
                      src={client.logo}
                      alt={client.name}
                      width={180}
                      height={70}
                      className="max-h-16 w-auto object-contain transition-opacity duration-200 group-hover/logo:opacity-0"
                    />
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center text-[13px] font-semibold uppercase leading-[1.3] tracking-[0.12em] text-foreground opacity-0 transition-opacity duration-200 group-hover/logo:opacity-100">
                      {client.name}
                    </span>
                  </>
                ) : (
                  <span className="flex items-center gap-2 px-4 text-center text-[13px] font-semibold uppercase leading-[1.3] tracking-[0.12em] text-muted-foreground">
                    <Building2 aria-hidden="true" className="h-4 w-4 shrink-0 text-primary/60" />
                    {client.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </Section>
  );
}

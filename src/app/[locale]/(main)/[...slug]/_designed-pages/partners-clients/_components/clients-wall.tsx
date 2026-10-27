import { getApiV10Partner } from "@/api/endpoints/partner";
import type { Partner } from "@/api/models/partner";
import { SafeImage } from "@/components/shared/safe-image";
import { cn } from "@/lib/utils";
import { resolveCmsFileUrl } from "@/utils/file";

async function fetchPartners(): Promise<Partner[]> {
  try {
    const response = await getApiV10Partner({
      page: 1,
      pageSize: 48,
      sortField: "created_at",
      sortOrder: "asc",
    });
    const result = (response.responseData ?? {}) as unknown as { rows?: Partner[] };
    return result.rows ?? [];
  } catch {
    return [];
  }
}

/**
 * Staggered logo wall — logos are split into full-width offset rows so the
 * marks feel abundant rather than boxed (the "trusted by" pattern used by
 * web3 / SaaS landing pages). Logos render large and in full color; on hover
 * each logo lifts and a primary underline sweeps in below it.
 */
export default async function ClientsWall() {
  const items = await fetchPartners();
  if (items.length === 0) return null;

  const rowCount = items.length >= 15 ? 3 : items.length >= 8 ? 2 : 1;
  const perRow = Math.ceil(items.length / rowCount);
  const rows = Array.from({ length: rowCount }, (_, i) => items.slice(i * perRow, (i + 1) * perRow));
  const rowOffsets = ["lg:px-0", "lg:px-24", "lg:px-12"];

  return (
    <div className="mt-14 flex flex-col gap-y-10 sm:gap-y-14">
      {rows.map((row, rowIndex) => (
        <ul
          key={rowIndex}
          className={cn(
            "flex flex-wrap items-center justify-between gap-x-8 gap-y-8",
            rowOffsets[rowIndex % rowOffsets.length]
          )}
        >
          {row.map((item) => {
            const logo = item.logo?.path ? resolveCmsFileUrl(item.logo.path) : null;
            const inner = (
              <>
                {logo ? (
                  <SafeImage
                    src={logo}
                    alt={item.name}
                    width={280}
                    height={112}
                    className="h-16 w-auto max-w-[260px] object-contain transition duration-300 group-hover:-translate-y-1.5 sm:h-20 sm:max-w-[320px] lg:h-24 lg:max-w-[360px]"
                  />
                ) : (
                  <span className="text-[17px] font-medium text-muted-foreground transition duration-300 group-hover:-translate-y-1.5 group-hover:text-foreground">
                    {item.name}
                  </span>
                )}
                <span
                  aria-hidden
                  className="absolute inset-x-4 bottom-0 h-0.5 origin-center scale-x-0 rounded-full bg-gradient-to-r from-primary via-cyan-400 to-primary transition-transform duration-300 group-hover:scale-x-100"
                />
                <span className="sr-only">{item.name}</span>
              </>
            );
            const cls = "group relative inline-flex items-center justify-center px-4 pb-3";
            return (
              <li key={item.id}>
                {item.website ? (
                  <a href={item.website} target="_blank" rel="noreferrer" className={cls} title={item.name}>
                    {inner}
                  </a>
                ) : (
                  <span className={cls} title={item.name}>
                    {inner}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      ))}
    </div>
  );
}

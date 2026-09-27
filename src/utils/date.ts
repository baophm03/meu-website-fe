import dayjs from "dayjs";

export const formatDateTime = (value?: string | null) =>
  value ? dayjs(value).format("DD/MM/YYYY HH:mm") : "—";

export const formatDate = (value?: string | null) =>
  value ? dayjs(value).format("DD/MM/YYYY") : "—";

export const formatRelativeTime = (value?: string | null) => {
  if (!value) return "Chưa có";

  const diffDays = Math.floor(
    (Date.now() - dayjs(value).valueOf()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays <= 0) return "Hôm nay";
  if (diffDays === 1) return "Hôm qua";
  if (diffDays < 7) return `${diffDays} ngày trước`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
  return `${Math.floor(diffDays / 30)} tháng trước`;
};

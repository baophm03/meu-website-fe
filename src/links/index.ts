const apiEndpoint = process.env.NEXT_PUBLIC_BACKEND_HOST || "https://gateway.dev.meu-solutions.com/meu-website-backend";
const siteURL = process.env.NEXT_PUBLIC_FRONTEND_HOST || "https://meu-website-demo.vercel.app";

export const resolveImageUrl = (path?: string | null) => {
  const trimmed = path?.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("blob:") || trimmed.startsWith("data:")) return trimmed;
  return `${apiEndpoint}/uploads/${trimmed.replace(/^\/+/, "")}`;
};

export const links = {
  resolveImageUrl,
  analyticsGoogle: "G-C9TEK9BS4C",
  siteURL,
  apiEndpoint,
};

import { redirect } from "@/i18n/navigation";

export default async function ContactManagementPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: "/admin/newsletter-emails", locale });
}

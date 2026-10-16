"use client";

import { ability } from "@/config/casl/ability";
import { NoPermissionMessage } from "@/components/shared/no-permission-message";
import useAuthStore from "@/store/useAuthStore";
import useProfileStore from "@/store/useProfileStore";

export default function RolesLayout({ children }: { children: React.ReactNode }) {
  const hasHydrated = useAuthStore((s) => s._hasHydrated);
  const user = useProfileStore((s) => s.appUser);

  if (!hasHydrated || !user) return null;

  if (!ability.can("VIEW", "ROLES")) {
    return <NoPermissionMessage />;
  }

  return <>{children}</>;
}

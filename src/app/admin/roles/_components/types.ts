export interface PermissionActionDef {
  action: string;
  label: string;
  description?: string;
}

export interface PermissionModuleDef {
  module: string;
  label: string;
  description?: string;
  actions: PermissionActionDef[];
}

export interface Role {
  id: string;
  name: string;
  description?: string | null;
  user_count?: number;
  _count?: {
    users?: number;
    permissions?: number;
  };
  created_at?: string | null;
  updated_at?: string | null;
}

import type { PermissionKey } from "@/config/permissions";

export interface EditForm {
  name: string;
  description: string;
  permissions: Set<PermissionKey>;
}

export const SYSTEM_ROLES = ["admin", "user"];

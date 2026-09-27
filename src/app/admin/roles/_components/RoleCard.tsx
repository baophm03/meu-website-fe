"use client";

import { Shield, Users, Edit, Trash2, KeyRound, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Can } from "@casl/react";
import { Role, SYSTEM_ROLES } from "./types";

interface RoleCardProps {
  role: Role;
  onEdit: (role: Role) => void;
  onEditPermissions: (role: Role) => void;
  onDelete: (role: Role) => void;
}

export function RoleCard({ role, onEdit, onEditPermissions, onDelete }: RoleCardProps) {
  return (
    <Card
      key={role.id}
      className="rounded-[20px] border-[#063e8e]/10 transition-all hover:border-[#063e8e]/30 hover:shadow-md"
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#063e8e]/10">
              <Shield className="h-6 w-6 text-[#063e8e]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[#163b73]">{role.name}</h3>
                {SYSTEM_ROLES.includes(role.name) && (
                  <Badge
                    variant="outline"
                    className="border-slate-200 bg-slate-50 text-slate-700"
                  >
                    Hệ thống
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-sm text-slate-600">
                {role.description || "Không có mô tả"}
              </p>
              <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {role._count?.users ?? 0} người dùng
                </span>
                <span className="flex items-center gap-1">
                  <KeyRound className="h-3 w-3" />
                  {role._count?.permissions ?? 0} quyền
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Can I="UPDATE" a="ROLES">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(role)}
                className="h-9 rounded-xl text-[#063e8e] hover:bg-[#063e8e]/10 hover:text-[#063e8e]"
              >
                <Edit className="mr-1 h-4 w-4" />
                Sửa
              </Button>
            </Can>
            <Can I="UPDATE" a="ROLES">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditPermissions(role)}
                className="h-9 rounded-xl text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                <ShieldCheck className="mr-1 h-4 w-4" />
                Phân quyền
              </Button>
            </Can>
            <Can I="DELETE" a="ROLES">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(role)}
                disabled={SYSTEM_ROLES.includes(role.name)}
                className="h-9 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
              >
                <Trash2 className="mr-1 h-4 w-4" />
                Xóa
              </Button>
            </Can>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

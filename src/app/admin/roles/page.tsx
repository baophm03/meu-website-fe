"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Can } from "@casl/react";
import {
  buildPermissionSet,
  permissionSetToArray,
  permKey,
  togglePermissionInSet,
} from "@/config/permissions";

import {
  getGetApiV10RoleIdPermissionQueryKey,
  getGetApiV10RoleQueryKey,
  useDeleteApiV10RoleId,
  useGetApiV10Role,
  useGetApiV10RoleIdPermission,
  usePostApiV10Role,
  usePutApiV10RoleId,
  usePutApiV10RoleIdPermission,
} from "@/api/endpoints/role";
import { useGetApiV10Permission } from "@/api/endpoints/permission";

import { Role, EditForm, PermissionModuleDef } from "./_components/types";
import { RoleCard } from "./_components/RoleCard";
import { EditRoleDialog } from "./_components/EditRoleDialog";
import { EditPermissionsDialog } from "./_components/EditPermissionsDialog";
import { DeleteRoleDialog } from "./_components/DeleteRoleDialog";
import { Pagination } from "./_components/Pagination";

export default function RolesPage() {
  const queryClient = useQueryClient();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<EditForm>({
    name: "",
    description: "",
    permissions: new Set(),
  });
  const [isPermDialogOpen, setIsPermDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const [permLoadedFor, setPermLoadedFor] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const { data: rolesData, isLoading } = useGetApiV10Role({
    page: currentPage,
    pageSize: 10,
  });

  const { data: permissionsData, isLoading: isLoadingPermissions } =
    useGetApiV10Permission({
      query: { enabled: isPermDialogOpen },
    });

  const { data: rolePermissionsData, isLoading: isLoadingRolePermissions } =
    useGetApiV10RoleIdPermission(selectedRole?.id ?? "", {
      query: { enabled: isPermDialogOpen && !!selectedRole?.id },
    });

  const createRole = usePostApiV10Role();
  const updateRole = usePutApiV10RoleId();
  const setRolePermissions = usePutApiV10RoleIdPermission();
  const deleteRole = useDeleteApiV10RoleId();
  const permissionModules =
    (((permissionsData as unknown as { responseData?: PermissionModuleDef[] })
      ?.responseData) || []) as PermissionModuleDef[];

  const roles =
    (((rolesData as unknown as { responseData?: { rows?: Role[] } })?.responseData?.rows) || []) as Role[];
  const totalRoles =
    ((rolesData as unknown as { responseData?: { count?: number } })?.responseData?.count) || 0;

  useEffect(() => {
    if (!isPermDialogOpen || !selectedRole || permLoadedFor === selectedRole.id) return;
    const rows = (rolePermissionsData as { responseData?: { module?: string; action?: string }[] })
      ?.responseData;
    if (!Array.isArray(rows)) return;
    setEditForm((prev) => ({ ...prev, permissions: buildPermissionSet(rows) }));
    setPermLoadedFor(selectedRole.id);
  }, [isPermDialogOpen, rolePermissionsData, selectedRole, permLoadedFor]);

  const invalidateRoles = () =>
    queryClient.invalidateQueries({ queryKey: getGetApiV10RoleQueryKey() });

  const handleCreateRole = () => {
    setSelectedRole(null);
    setPermLoadedFor(null);
    setEditForm({ name: "", description: "", permissions: new Set() });
    setIsEditDialogOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setEditForm({
      name: role.name,
      description: role.description || "",
      permissions: new Set(),
    });
    setIsEditDialogOpen(true);
  };

  const handleEditPermissions = (role: Role) => {
    setSelectedRole(role);
    // Nạp sẵn từ cache (đồng bộ) để mở lại dialog vẫn thấy quyền đã lưu;
    // nếu chưa có cache thì để trống và chờ effect nạp khi fetch xong.
    const cached = queryClient.getQueryData(
      getGetApiV10RoleIdPermissionQueryKey(role.id),
    ) as { responseData?: { module?: string; action?: string }[] } | undefined;
    const rows = cached?.responseData;
    setPermLoadedFor(Array.isArray(rows) ? role.id : null);
    setEditForm((prev) => ({
      ...prev,
      name: role.name,
      description: role.description || "",
      permissions: Array.isArray(rows) ? buildPermissionSet(rows) : new Set(),
    }));
    setIsPermDialogOpen(true);
  };

  const handleDeleteRole = (role: Role) => {
    setRoleToDelete(role);
    setIsDeleteDialogOpen(true);
  };

  const handleTogglePermission = (module: string, action: string) => {
    setEditForm((prev) => ({
      ...prev,
      permissions: togglePermissionInSet(prev.permissions, module, action),
    }));
  };

  const handleSaveRole = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      if (selectedRole) {
        await updateRole.mutateAsync({
          id: selectedRole.id,
          data: {
            name: editForm.name.trim(),
            description: editForm.description || undefined,
          },
        });
      } else {
        await createRole.mutateAsync({
          data: {
            name: editForm.name.trim(),
            description: editForm.description || undefined,
          },
        });
      }

      toast.success(selectedRole ? "Đã cập nhật vai trò" : "Đã tạo vai trò mới");
      setIsEditDialogOpen(false);
      await invalidateRoles();
    } catch {
      toast.error("Không thể lưu vai trò. Vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePermissions = async () => {
    if (!selectedRole || isSaving) return;
    setIsSaving(true);
    try {
      // Chỉ gửi quyền còn hợp lệ trong registry — role cũ có thể còn quyền
      // đã bị xoá (vd MEMBERS:*) nằm trong set nhưng không render trong form.
      const validKeys = new Set(
        permissionModules.flatMap((group) =>
          group.actions.map((perm) => permKey(group.module, perm.action)),
        ),
      );
      const permissions = permissionSetToArray(
        new Set([...editForm.permissions].filter((key) => validKeys.has(key))),
      );
      await setRolePermissions.mutateAsync({
        id: selectedRole.id,
        data: { permissions },
      });
      queryClient.removeQueries({
        queryKey: getGetApiV10RoleIdPermissionQueryKey(selectedRole.id),
      });
      toast.success("Đã cập nhật quyền hạn");
      setIsPermDialogOpen(false);
      await invalidateRoles();
    } catch {
      toast.error("Không thể lưu quyền hạn. Vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!roleToDelete || isSaving) return;
    setIsSaving(true);
    try {
      await deleteRole.mutateAsync({ id: roleToDelete.id });
      toast.success("Đã xóa vai trò");
      setIsDeleteDialogOpen(false);
      setRoleToDelete(null);
      await invalidateRoles();
    } catch {
      toast.error("Không thể xóa vai trò. Vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#163b73]">Quản lý Vai trò</h1>
          <p className="mt-1 text-sm text-slate-600">
            Quản lý vai trò và phân quyền cho người dùng ({totalRoles} vai trò)
          </p>
        </div>
        <Can I="CREATE" a="ROLES">
          <Button
            onClick={handleCreateRole}
            className="rounded-xl bg-[#063e8e] text-white hover:bg-[#063e8e]/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Tạo vai trò mới
          </Button>
        </Can>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-[#063e8e]" />
        </div>
      )}

      {!isLoading && (
        <div className="grid gap-4">
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              onEdit={handleEditRole}
              onEditPermissions={handleEditPermissions}
              onDelete={handleDeleteRole}
            />
          ))}
        </div>
      )}

      {roles.length === 0 && !isLoading && (
        <div className="rounded-[20px] border border-[#063e8e]/10 bg-[#f8fbff] p-10 text-center">
          <p className="text-slate-500">Chưa có vai trò nào</p>
        </div>
      )}

      {totalRoles > 10 && (
        <Pagination
          currentPage={currentPage}
          totalRoles={totalRoles}
          isLoading={isLoading}
          onPageChange={setCurrentPage}
        />
      )}

      <EditRoleDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        selectedRole={selectedRole}
        editForm={editForm}
        setEditForm={setEditForm}
        onSave={handleSaveRole}
        isPending={isSaving}
      />

      <EditPermissionsDialog
        open={isPermDialogOpen}
        onOpenChange={setIsPermDialogOpen}
        selectedRole={selectedRole}
        editForm={editForm}
        setEditForm={setEditForm}
        onTogglePermission={handleTogglePermission}
        onSave={handleSavePermissions}
        isPending={isSaving}
        permissionModules={permissionModules}
        isLoadingPermissions={isLoadingPermissions || isLoadingRolePermissions}
      />

      <DeleteRoleDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        roleToDelete={roleToDelete}
        onConfirm={handleConfirmDelete}
        isPending={isSaving}
      />
    </div>
  );
}

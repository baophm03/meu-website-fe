"use client";

import {
  CheckCircle,
  Clock,
  Key,
  Loader2,
  MoreHorizontal,
  RefreshCw,
  Shield,
  Trash2,
  UserCog,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Can } from "@casl/react";
import { formatDateTime } from "@/utils/date";
import { PAGE_SIZE, type User } from "./types";

interface UserTableProps {
  users: User[];
  usersLoading: boolean;
  currentPage: number;
  handleOpenEdit: (user: User) => void;
  handleOpenRoleDialog: (user: User) => void;
  handleResetPassword: (user: User) => void;
  handleToggleStatus: (user: User) => void;
  onRequestDelete: (user: User) => void;
}

export function UserTable({
  users,
  usersLoading,
  currentPage,
  handleOpenEdit,
  handleOpenRoleDialog,
  handleResetPassword,
  handleToggleStatus,
  onRequestDelete,
}: UserTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#063e8e]/20 bg-white shadow-sm [&_table]:min-w-[760px] [&_tbody_td:not(:last-child)]:border-r [&_tbody_td:not(:last-child)]:border-[#063e8e]/20 [&_thead_th:not(:last-child)]:border-r [&_thead_th:not(:last-child)]:border-white/15">
      <Table>
          <TableHeader>
            <TableRow className="border-0 bg-[#063e8e] hover:bg-[#063e8e]">
              <TableHead className="py-4 text-center text-white">STT</TableHead>
              <TableHead className="py-4 text-center text-white">Email</TableHead>
              <TableHead className="py-4 text-center text-white">Họ tên</TableHead>
              <TableHead className="py-4 text-center text-white">Vai trò</TableHead>
              <TableHead className="py-4 text-center text-white">Trạng thái</TableHead>
              <TableHead className="py-4 text-center text-white">Ngày tạo</TableHead>
              <TableHead className="py-4 text-center text-white">Cập nhật</TableHead>
              <TableHead className="w-24 py-4 text-center text-white">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="px-4 py-12 text-center">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#063e8e]" />
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="px-4 py-12 text-center text-slate-500">
                  Không tìm thấy người dùng nào
                </TableCell>
              </TableRow>
            ) : (
              users.map((user, index) => (
                <TableRow
                  key={user.id}
                  className="border-b border-[#063e8e]/5 hover:bg-[#063e8e]/[0.03]"
                >
                  <TableCell className="px-4 py-4 text-center text-gray-700 whitespace-nowrap">
                    {(currentPage - 1) * PAGE_SIZE + index + 1}
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <p className="text-sm text-gray-700 truncate max-w-[180px]" title={user.email}>
                      {user.email}
                    </p>
                    {user.username && (
                      <p className="text-xs text-gray-500">@{user.username}</p>
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <p className="text-sm font-medium text-[#163b73] whitespace-nowrap">
                      {user.first_name || user.last_name ? `${user.first_name || ""} ${user.last_name || ""}`.trim() : "-"}
                    </p>
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <div className="flex flex-wrap gap-1 max-w-[120px]">
                      {user.roles?.slice(0, 2).map((roleName) => (
                        <span
                          key={roleName}
                          className="inline-flex rounded-full bg-[#f8fbff] px-2 py-0.5 text-xs font-medium text-[#063e8e]"
                        >
                          {roleName}
                        </span>
                      ))}
                      {(user.roles?.length || 0) > 2 && (
                        <span className="inline-flex rounded-full bg-[#f8fbff] px-2 py-0.5 text-xs font-medium text-[#063e8e]">
                          +{user.roles!.length - 2}
                        </span>
                      )}
                      {(!user.roles || user.roles.length === 0) && (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-center">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        user.status === "active"
                          ? "bg-emerald-50 text-emerald-700"
                          : user.status === "pending_verification"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {user.status === "active" ? "Hoạt động" :
                        user.status === "pending_verification" ? "Chờ duyệt" :
                          user.status === "inactive" ? "Khóa" : user.status}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-center">
                    <p className="text-sm text-gray-700 whitespace-nowrap">
                      {formatDateTime(user.created_at)}
                    </p>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-center">
                    <p className="text-sm text-gray-700 whitespace-nowrap">
                      {formatDateTime(user.updated_at)}
                    </p>
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <Can I="UPDATE" a="USERS">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 rounded-lg"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => handleOpenEdit(user)}>
                            <UserCog className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleOpenRoleDialog(user)}>
                            <Shield className="mr-2 h-4 w-4" />
                            Gán vai trò
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleResetPassword(user)}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Reset mật khẩu
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleToggleStatus(user)}
                            className={user.status === "active" ? "text-red-600" : "text-green-600"}
                          >
                            {user.status === "active" ? (
                              <>
                                <XCircle className="mr-2 h-4 w-4" />
                                Vô hiệu hóa
                              </>
                            ) : (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Kích hoạt
                              </>
                            )}
                          </DropdownMenuItem>
                          <Can I="DELETE" a="USERS">
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => onRequestDelete(user)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Xóa
                            </DropdownMenuItem>
                          </Can>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </Can>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
    </div>
  );
}


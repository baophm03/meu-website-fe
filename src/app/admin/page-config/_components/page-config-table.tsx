"use client";

import { formatDate } from "@/utils/date";
import { AdminRowActions } from "@/components/admin/admin-row-actions";
import { AdminTableLayout } from "@/components/admin/admin-table-layout";
import { Pagination } from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { PAGE_SIZE, type PageConfig } from "./types";

interface PageConfigTableProps {
	search: string;
	onSearchChange: (value: string) => void;
	isReady: boolean;
	items: PageConfig[];
	total: number;
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	onEdit: (item: PageConfig) => void;
	onDelete: (item: PageConfig) => void;
}

export function PageConfigTable({
	search,
	onSearchChange,
	isReady,
	items,
	total,
	page,
	totalPages,
	onPageChange,
	onEdit,
	onDelete,
}: PageConfigTableProps) {
	return (
		<AdminTableLayout
			searchValue={search}
			searchPlaceholder="Tìm kiếm trang theo tên hoặc đường dẫn..."
			actionMeta={
				<div className="rounded-xl border border-[#063e8e]/15 bg-[#f8fbff] px-4 py-2 text-sm font-semibold text-[#163b73]">
					Tổng số trang: {total}
				</div>
			}
			onSearchChange={onSearchChange}
		>
			<Table>
				<TableHeader>
					<TableRow className="bg-[#063e8e] hover:bg-[#063e8e]">
						<TableHead className="w-[240px] py-4 text-center text-white">Tên trang (VI)</TableHead>
						<TableHead className="w-[240px] py-4 text-center text-white">Tên trang (EN)</TableHead>
						<TableHead className="py-4 text-center text-white">Đường dẫn</TableHead>
						<TableHead className="w-[140px] py-4 text-center text-white">Trạng thái</TableHead>
						<TableHead className="w-[170px] py-4 text-center text-white">Ngày tạo</TableHead>
						<TableHead className="w-[170px] py-4 text-center text-white">Ngày cập nhật</TableHead>
						<TableHead className="w-[120px] py-4 text-center text-white">Thao tác</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{!isReady ? (
						Array.from({ length: 4 }).map((_, index) => (
							<TableRow key={index} className="hover:bg-transparent">
								{Array.from({ length: 7 }).map((__, cellIndex) => (
									<TableCell key={cellIndex} className="py-4">
										<div className="h-5 rounded-full bg-[#063e8e]/10" />
									</TableCell>
								))}
							</TableRow>
						))
					) : items.length === 0 ? (
						<TableRow>
							<TableCell colSpan={7} className="py-14 text-center text-gray-700">
								Không có trang nào phù hợp.
							</TableCell>
						</TableRow>
					) : (
						items.map((item) => (
							<TableRow key={item.id} className="hover:bg-[#063e8e]/[0.03]">
								<TableCell className="px-4 py-4 text-sm text-gray-700">
									{item.name || "-"}
								</TableCell>
								<TableCell className="px-4 py-4 text-sm text-gray-700">
									{item.name_en || "-"}
								</TableCell>
								<TableCell className="px-4 py-4 font-mono text-sm text-gray-700">
									{item.path}
								</TableCell>
								<TableCell className="px-4 py-4 text-center">
									{item.is_active ? (
										<Badge className="border-transparent bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
											Đang hoạt động
										</Badge>
									) : (
										<Badge variant="outline" className="border-gray-300 text-gray-500">
											Ẩn
										</Badge>
									)}
								</TableCell>
								<TableCell className="px-4 py-4 text-center text-gray-700">
									{formatDate(item.created_at)}
								</TableCell>
								<TableCell className="px-4 py-4 text-center text-gray-700">
									{formatDate(item.updated_at)}
								</TableCell>
								<TableCell className="px-4 py-4">
									<AdminRowActions
										actions={[
											{ kind: "edit", label: "Chỉnh sửa", onClick: () => onEdit(item) },
											{ kind: "delete", label: "Xóa trang", onClick: () => onDelete(item) },
										]}
									/>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>

			{totalPages > 1 ? (
				<div className="flex flex-col gap-3 border-t border-[#063e8e]/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
					<div className="text-sm text-gray-700">
						Hiển thị {(page - 1) * PAGE_SIZE + 1} đến{" "}
						{Math.min(page * PAGE_SIZE, total)} của {total} trang
					</div>
					<Pagination
						page={page}
						pageCount={totalPages}
						onChangePage={onPageChange}
					/>
				</div>
			) : null}
		</AdminTableLayout>
	);
}

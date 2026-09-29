"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
	getGetApiV10PageConfigQueryKey,
	useDeleteApiV10PageConfigId,
	useGetApiV10PageConfig,
	usePutApiV10PageConfigId,
} from "@/api/endpoints/page-config";

import { PageConfigDeleteDialog } from "./_components/page-config-delete-dialog";
import { PageConfigFormDialog } from "./_components/page-config-form-dialog";
import { PageConfigTable } from "./_components/page-config-table";
import {
	EMPTY_FORM,
	PAGE_SIZE,
	type PageConfig,
	type PageConfigFormValues,
} from "./_components/types";

const PATH_PATTERN = /^\/[a-zA-Z0-9\-_.~]*$/;

// Mỗi trang độc lập — path chỉ lưu segment cuối, vị trí cấu hình ở header/footer
const toLeafPath = (value: string): string => {
	const segments = value.trim().split("/").filter(Boolean);
	return `/${segments.pop() ?? ""}`;
};

export default function AdminPageConfigPage() {
	const queryClient = useQueryClient();
	const [search, setSearch] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formOpen, setFormOpen] = useState(false);
	const [formValues, setFormValues] = useState<PageConfigFormValues>(EMPTY_FORM);
	const [deleteTarget, setDeleteTarget] = useState<PageConfig | null>(null);
	const [page, setPage] = useState(1);

	const keyword = search.trim();
	const { data, isFetching } = useGetApiV10PageConfig({
		page,
		pageSize: PAGE_SIZE,
		sortField: "path",
		sortOrder: "asc",
		filters: keyword ? `name@=${keyword}|path@=${keyword}` : undefined,
	});
	const updatePageConfig = usePutApiV10PageConfigId();
	const deletePageConfig = useDeleteApiV10PageConfigId();

	const items = data?.responseData?.rows ?? [];
	const total = data?.responseData?.count ?? 0;
	const isReady = !isFetching;

	const reload = () =>
		queryClient.invalidateQueries({ queryKey: getGetApiV10PageConfigQueryKey() });

	const handleSearchChange = (value: string) => {
		setSearch(value);
		setPage(1);
	};

	const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setPage(newPage);
		}
	};

	const openEdit = (item: PageConfig) => {
		setFormValues({
			id: item.id,
			name: item.name,
			name_en: item.name_en ?? "",
			path: item.path,
			type: item.type ?? "designed",
			description: item.description ?? "",
			description_en: item.description_en ?? "",
			is_active: item.is_active ?? true,
		});
		setFormOpen(true);
	};

	const handleSubmit = async () => {
		if (isSubmitting) return;

		if (!formValues.name.trim()) {
			toast.error("Tên trang là bắt buộc");
			return;
		}

		const path = toLeafPath(formValues.path);
		if (path === "/") {
			toast.error("Đường dẫn là bắt buộc");
			return;
		}
		if (!PATH_PATTERN.test(path)) {
			toast.error("Đường dẫn phải bắt đầu bằng / và chỉ chứa một segment (chữ, số, -, _)");
			return;
		}

		const payload = {
			name: formValues.name.trim(),
			name_en: formValues.name_en.trim() || null,
			path,
			type: formValues.type,
			description: formValues.description.trim() || null,
			description_en: formValues.description_en.trim() || null,
			is_active: formValues.is_active,
		};

		setIsSubmitting(true);

		try {
			if (formValues.id) {
				await updatePageConfig.mutateAsync({ id: formValues.id, data: payload });
				toast.success("Cập nhật trang thành công");
			}

			await reload();
			setFormOpen(false);
			setFormValues(EMPTY_FORM);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Không thể lưu trang");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDelete = async () => {
		if (!deleteTarget || isSubmitting) return;

		setIsSubmitting(true);

		try {
			await deletePageConfig.mutateAsync({ id: deleteTarget.id });
			toast.success("Xóa trang thành công");
			setDeleteTarget(null);
			await reload();
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Không thể xóa trang");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="space-y-8">
			<PageConfigTable
				search={search}
				onSearchChange={handleSearchChange}
				isReady={isReady}
				items={items}
				total={total}
				page={page}
				totalPages={totalPages}
				onPageChange={handlePageChange}
				onEdit={openEdit}
				onDelete={setDeleteTarget}
			/>

			<PageConfigFormDialog
				open={formOpen}
				onOpenChange={setFormOpen}
				formValues={formValues}
				onFormValuesChange={setFormValues}
				isSubmitting={isSubmitting}
				onSubmit={handleSubmit}
			/>

			<PageConfigDeleteDialog
				target={deleteTarget}
				onTargetChange={setDeleteTarget}
				onConfirm={handleDelete}
			/>
		</div>
	);
}

"use client";

import { AdminDeleteDialog } from "@/components/admin/admin-delete-dialog";

import type { PageConfig } from "./types";

interface PageConfigDeleteDialogProps {
	target: PageConfig | null;
	onTargetChange: (target: PageConfig | null) => void;
	onConfirm: () => void;
}

export function PageConfigDeleteDialog({
	target,
	onTargetChange,
	onConfirm,
}: PageConfigDeleteDialogProps) {
	return (
		<AdminDeleteDialog
			open={!!target}
			title="Xóa trang"
			description={
				target ? (
					<>
						Bạn có chắc chắn muốn xóa trang <strong>{target.name}</strong> (
						<span className="font-mono">{target.path}</span>)?
					</>
				) : (
					""
				)
			}
			onOpenChange={(open) => {
				if (!open) {
					onTargetChange(null);
				}
			}}
			onConfirm={() => void onConfirm()}
		/>
	);
}

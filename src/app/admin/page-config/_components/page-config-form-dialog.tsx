"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { fieldClassName, type PageConfigFormValues } from "./types";

interface PageConfigFormDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	formValues: PageConfigFormValues;
	onFormValuesChange: React.Dispatch<React.SetStateAction<PageConfigFormValues>>;
	isSubmitting: boolean;
	onSubmit: () => void;
}

export function PageConfigFormDialog({
	open,
	onOpenChange,
	formValues,
	onFormValuesChange,
	isSubmitting,
	onSubmit,
}: PageConfigFormDialogProps) {
	const setField = <K extends keyof PageConfigFormValues>(key: K, value: PageConfigFormValues[K]) =>
		onFormValuesChange((previous) => ({ ...previous, [key]: value }));

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="rounded-3xl border-[#063e8e]/15 bg-white text-gray-700 shadow-xl">
				<DialogHeader>
					<DialogTitle className="text-[#063e8e]">
						{formValues.id ? "Chỉnh sửa trang" : "Thêm trang"}
					</DialogTitle>
					<DialogDescription className="text-gray-700">
						Cấu hình trang tĩnh trên website — tên, đường dẫn và trạng thái hiển thị.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4 py-2">
					<div>
						<Label className="mb-1.5 block text-gray-700">
							Tên trang (VI) <span className="text-red-600">*</span>
						</Label>
						<Input
							value={formValues.name}
							onChange={(event) => setField("name", event.target.value)}
							placeholder="VD: Giải pháp / Chuyển đổi số"
							className={fieldClassName}
						/>
					</div>

					<div>
						<Label className="mb-1.5 block text-gray-700">Tên trang (EN)</Label>
						<Input
							value={formValues.name_en}
							onChange={(event) => setField("name_en", event.target.value)}
							placeholder="Solutions / Digital Transformation"
							className={fieldClassName}
						/>
					</div>

					<div>
						<Label className="mb-1.5 block text-gray-700">Đường dẫn</Label>
						<Input
							value={formValues.path}
							disabled
							readOnly
							placeholder="/digital-transformation"
							className={`${fieldClassName} font-mono cursor-not-allowed bg-gray-50 text-gray-500`}
						/>
					</div>

					<div>
						<Label className="mb-1.5 block text-gray-700">Mô tả (VI)</Label>
						<Textarea
							value={formValues.description}
							onChange={(event) => setField("description", event.target.value)}
							placeholder="Mô tả ngắn về trang"
							rows={2}
							className={fieldClassName}
						/>
					</div>

					<div>
						<Label className="mb-1.5 block text-gray-700">Mô tả (EN)</Label>
						<Textarea
							value={formValues.description_en}
							onChange={(event) => setField("description_en", event.target.value)}
							placeholder="Short description in English"
							rows={2}
							className={fieldClassName}
						/>
					</div>

					<div className="flex items-center justify-between rounded-2xl border border-[#063e8e]/10 bg-[#f8fbff] px-4 py-3">
						<div>
							<Label className="block text-gray-700">Đang hoạt động</Label>
							<p className="text-xs text-gray-500">Tắt để ẩn trang khỏi website</p>
						</div>
						<Switch
							checked={formValues.is_active}
							onCheckedChange={(checked) => setField("is_active", checked)}
						/>
					</div>
				</div>

				<DialogFooter>
					<Button
						type="button"
						variant="outline"
						onClick={() => onOpenChange(false)}
						disabled={isSubmitting}
						className="rounded-xl border-[#063e8e]/20 text-[#063e8e]"
					>
						Hủy
					</Button>
					<Button
						type="button"
						onClick={onSubmit}
						disabled={isSubmitting}
						className="rounded-xl bg-[#063e8e] text-white hover:bg-[#063e8e]/90"
					>
						{isSubmitting ? "Đang lưu..." : "Lưu trang"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

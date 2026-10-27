/**
 * Trích thông điệp lỗi thân thiện từ response của API CMS.
 *
 * Backend trả về dạng: { message, message_en, violations: [{ message, action }] }.
 * Trước đây các trang admin dùng trực tiếp `error.message` của Axios nên người dùng
 * chỉ thấy "Request failed with status code 409/400" thay vì lý do thật (ví dụ:
 * "Đường dẫn đã tồn tại").
 */
interface ApiViolation {
	message?: string;
	action?: { errors?: Array<{ field?: string; message?: string }> };
}

interface ApiErrorBody {
	message?: string;
	message_en?: string;
	violations?: ApiViolation[];
	responseData?: unknown;
}

const messageFromBody = (data: ApiErrorBody | undefined): string | undefined => {
	const violation = Array.isArray(data?.violations) ? data.violations[0] : undefined;
	return (
		violation?.message ||
		data?.message ||
		violation?.action?.errors?.[0]?.message ||
		undefined
	);
};

export function getApiErrorMessage(error: unknown, fallback: string): string {
	if (error && typeof error === "object" && "response" in error) {
		const response = (error as { response?: { status?: number; data?: ApiErrorBody } }).response;
		const apiMessage = messageFromBody(response?.data);

		if (apiMessage) return apiMessage;
		if (response?.status) return `${fallback} (HTTP ${response.status})`;
	}

	if (error instanceof Error && error.message) return error.message;
	return fallback;
}

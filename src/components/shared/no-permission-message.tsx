"use client";

import { Link } from "@/i18n/navigation";

export function NoPermissionMessage({
  message = "Tài khoản của bạn hiện không có quyền hạn để truy cập trang này. Vui lòng liên hệ bộ phận kỹ thuật để được hỗ trợ.",
  showContactButton = true,
}: {
  message?: string;
  showContactButton?: boolean;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 rounded-full bg-red-50 p-6">
        <svg
          className="h-16 w-16 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      </div>

      <h2 className="mb-3 text-2xl font-bold text-gray-900">Không có quyền truy cập</h2>

      <p className="mb-8 max-w-md text-gray-600">{message}</p>

      {showContactButton && (
        <div className="flex gap-4">
          <button
            onClick={() => window.history.back()}
            className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Quay lại
          </button>
          <Link
            href="/admin"
            className="rounded-xl bg-[#063e8e] px-6 py-3 font-medium text-white transition-colors hover:bg-[#063e8e]/90"
          >
            Về trang chính
          </Link>
        </div>
      )}
    </div>
  );
}

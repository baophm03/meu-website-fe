"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { postApiV10Contact } from "@/api/endpoints/contact";

const inputClass =
	"h-12 w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 text-[15px] text-white placeholder:text-white/35 transition focus:border-primary-light/60 focus:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-primary-light";

const labelClass = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

export default function EstimatorForm() {
	const t = useTranslations("pages.contact.form");
	const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
	const [values, setValues] = useState({ fullname: "", email: "", phone: "", title: "", content: "" });

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (status === "submitting") return;
		setStatus("submitting");
		try {
			await postApiV10Contact({ ...values, status: "new" });
			setStatus("success");
			setValues({ fullname: "", email: "", phone: "", title: "", content: "" });
		} catch {
			setStatus("error");
		}
	};

	const field = (key: keyof typeof values) => ({
		value: values[key],
		onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
			setValues((v) => ({ ...v, [key]: e.target.value })),
	});

	return (
		<form className="grid gap-5" onSubmit={onSubmit}>
			<div className="grid gap-5 sm:grid-cols-2">
				<label className="grid gap-2">
					<span className={cn(labelClass, "text-white/60")}>{t("nameLabel")}</span>
					<input type="text" required maxLength={255} placeholder={t("namePlaceholder")} className={inputClass} {...field("fullname")} />
				</label>
				<label className="grid gap-2">
					<span className={cn(labelClass, "text-white/60")}>{t("emailLabel")}</span>
					<input type="email" required maxLength={255} placeholder={t("emailPlaceholder")} className={inputClass} {...field("email")} />
				</label>
			</div>
			<label className="grid gap-2">
				<span className={cn(labelClass, "text-white/60")}>{t("phoneLabel")}</span>
				<input type="tel" maxLength={30} placeholder={t("phonePlaceholder")} className={inputClass} {...field("phone")} />
			</label>
			<label className="grid gap-2">
				<span className={cn(labelClass, "text-white/60")}>{t("titleLabel")}</span>
				<input type="text" required maxLength={255} placeholder={t("titlePlaceholder")} className={inputClass} {...field("title")} />
			</label>
			<label className="grid gap-2">
				<span className={cn(labelClass, "text-white/60")}>{t("contentLabel")}</span>
				<textarea required rows={5} maxLength={5000} placeholder={t("contentPlaceholder")} className={cn(inputClass, "h-auto p-4")} {...field("content")} />
			</label>
			<button
				type="submit"
				disabled={status === "submitting"}
				className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-[12px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
			>
				{status === "submitting" ? t("submitting") : t("submitButton")}
			</button>
			{status === "success" ? <p className="text-[13px] leading-[1.55] text-emerald-500">{t("success")}</p> : null}
			{status === "error" ? <p className="text-[13px] leading-[1.55] text-red-500">{t("error")}</p> : null}
			<p className="text-[13px] leading-[1.55] text-white/45">{t("note")}</p>
		</form>
	);
}

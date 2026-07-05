import type { DateObject } from "react-multi-date-picker";
import { z } from "zod";

import { normalizeToEnglish, toEnglishDigits } from "@/features/shared/utils";

export const requestDepositSchema = z.object({
	amount: z
		.number("مبلغ را وارد کنید.")
		.min(10_000, "حداقل مبلغ واریز ۱۰٬۰۰۰ تومان است.")
		.transform((value) => Number(toEnglishDigits(String(value)))),

	// payment_method: z
	// 	.enum(["card_to_card", "online_gateway"])
	// 	.default("card_to_card"),

	reference_number: z
		.string("شماره مرجع اجباری است")
		.transform((v) => normalizeToEnglish(v))
		.pipe(
			z
				.string("شماره مرجع اجباری است")
				.min(1, "شماره مرجع اجباری است")
				.max(255, "شماره مرجع  بیش از حد مجاز است"),
		),

	tracking_code: z
		.string("کد رهگیری اجباری است ")
		.transform((v) => normalizeToEnglish(v))
		.pipe(
			z
				.string("کد رهگیری اجباری است ")
				.min(1, "کد رهگیری را وارد کنید.")
				.max(255, "کد رهگیری بیش از حد مجاز است."),
		),

	sender_name: z
		.string("نام صاحب کارت را وارد کنید.")
		.trim()
		.transform((v) => v.replace(/\s+/g, " "))
		.pipe(
			z
				.string()
				.min(1, "نام صاحب کارت را وارد کنید.")
				.max(255, "نام صاحب کارت بیش از حد مجاز است."),
		),

	sender_card_number: z
		.string("شماره کارت را وارد کنید.")
		.transform((value) => toEnglishDigits(value).replace(/[\s-]/g, ""))
		.pipe(
			z
				.string()
				.length(16, "شماره کارت باید ۱۶ رقم باشد.")
				.regex(/^\d+$/, "شماره کارت فقط باید شامل اعداد باشد."),
		),

	transaction_date: z.custom<DateObject>((value) => value != null, {
		message: "تاریخ تراکنش را وارد کنید.",
	}),

	transaction_time: z
		.string("زمان تراکنش را وارد کنید.")
		.min(1, "زمان تراکنش را وارد کنید."),

	receipt_image: z.instanceof(File, {
		message: "تصویر رسید را انتخاب کنید.",
	}),

	note: z.string().trim().optional().nullable(),
});

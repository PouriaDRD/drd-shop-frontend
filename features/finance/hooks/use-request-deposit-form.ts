"use client";

import { useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { queryKeys } from "@/features/api/lib";
import { toEnglishDigits } from "@/features/shared/utils";

import { useRequestDeposit } from "../mutations";
import { requestDepositSchema } from "../schemas";
import { RequestDepositFieldValues } from "../types";

/* =========================
   DATE CONVERTER (Jalali -> Gregorian)
========================= */
function jalaliToGregorian(date: DateObject | null) {
	// react-multi-date-picker returns DateObject
	if (!date?.toDate) return null;

	return date.toDate().toISOString().slice(0, 10);
}

/* ========================= */

interface Props {
	onSuccess?: () => void;
}

export function useRequestDepositForm({ onSuccess }: Props) {
	const queryClient = useQueryClient();
	const mutation = useRequestDeposit();

	const today = useMemo(() => {
		return new DateObject({ calendar: persian });
	}, []);

	const form = useForm<RequestDepositFieldValues>({
		resolver: zodResolver(requestDepositSchema),
		defaultValues: {
			amount: 0,
			reference_number: "",
			tracking_code: "",
			sender_name: "",
			sender_card_number: "",
			transaction_date: today,
			transaction_time: "",
			receipt_image: undefined,
			note: "",
		},
	});

	const handleOnSuccess = async () => {
		await Promise.all([
			queryClient.invalidateQueries({
				queryKey: queryKeys.finance.deposits,
			}),
		]);

		toast.success("درخواست واریز ثبت شد");
		form.reset();
		onSuccess?.();
	};

	const submit = form.handleSubmit(async (values) => {
		try {
			const amount = Number(toEnglishDigits(String(values.amount)));

			const transaction_date = jalaliToGregorian(values.transaction_date);

			if (!transaction_date) {
				toast.error("تاریخ تراکنش معتبر نیست");
				return;
			}

			const formData = new FormData();

			formData.append("amount", String(amount));
			formData.append("reference_number", values.reference_number);
			formData.append("tracking_code", values.tracking_code);
			formData.append("sender_name", values.sender_name);

			formData.append(
				"sender_card_number",
				toEnglishDigits(values.sender_card_number).replace(
					/[\s-]/g,
					"",
				),
			);

			formData.append("transaction_date", transaction_date);
			formData.append("transaction_time", values.transaction_time);

			formData.append("payment_method", "card_to_card");

			if (values.receipt_image) {
				formData.append("receipt_image", values.receipt_image);
			}

			if (values.note) {
				formData.append("note", values.note);
			}

			mutation.mutate(formData, {
				onSuccess: async (res) => {
					if (!res.success) {
						toast.error(res.message || "خطا در ثبت درخواست");
						return;
					}

					if (res.success) {
						await handleOnSuccess();
					}
				},
				onError: () => {
					toast.error("خطا در ارتباط با سرور");
				},
			});
		} catch (err) {
			if (process.env.NODE_ENV === "development") {
				console.error(err);
			}
			toast.error("خطای غیرمنتظره رخ داد");
		}
	});

	return {
		form,
		submit,
		isPending: mutation.isPending,
	};
}

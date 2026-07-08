"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { queryKeys } from "@/features/api/lib";

import { useApplyCoupon } from "../mutations";
import { applyCouponSchema } from "../schemas";
import { CouponFormData } from "../types";

interface Props {
	onSuccess?: () => void;
}

export function useApplyCouponForm({ onSuccess }: Props) {
	const queryClient = useQueryClient();
	const applyCouponMutation = useApplyCoupon();

	const form = useForm<CouponFormData>({
		resolver: zodResolver(applyCouponSchema),
		defaultValues: {
			code: "",
		},
	});

	const handleOnSuccess = async () => {
		await Promise.all([
			queryClient.invalidateQueries({
				queryKey: queryKeys.billing.cart,
			}),
		]);

		toast.success("کد تخفیف با موفقیت اعمال شد");

		form.reset();
		onSuccess?.();
	};

	const submitForm = form.handleSubmit(async (values) => {
		try {
			const code = values.code;

			const res = await applyCouponMutation.mutateAsync(code);

			if (!res.success) {
				toast.error("کد تخفیف نامعتبر است!");
				return;
			}

			if (res.success) {
				await handleOnSuccess();
			}
		} catch (err) {
			console.error(err);
			toast.error("خطای غیرمنتظره رخ داد");
		}
	});

	return {
		form,
		submit: submitForm,
		isPending: applyCouponMutation.isPending,
	};
}

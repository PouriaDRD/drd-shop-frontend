"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { getErrorMessage } from "@/features/shared/utils";

import { requestOtpAction } from "../actions";
import { requestOtpSchema } from "../schemas";
import { RequestOtpData, RequestOtpFormValues } from "../types";

interface Props {
	onSuccess?: (data: RequestOtpData) => void;
}

export default function useRequestOtp({ onSuccess }: Props) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<RequestOtpFormValues>({
		resolver: zodResolver(requestOtpSchema),
		defaultValues: {
			phone_number: "",
		},
	});

	const handleOnSuccess = (data: RequestOtpData) => {
		toast.success(`کد تایید به ${data.phone_number} ارسال شد!`);
		form.reset();
		onSuccess?.(data);
	};

	const submit = async (data: RequestOtpFormValues) => {
		try {
			setIsSubmitting(true);

			const response = await requestOtpAction(data);

			if (!response.success) {
				toast.error("خطا", {
					description: getErrorMessage(response),
				});
				return;
			}

			if (response.success) {
				handleOnSuccess(response.data);
				return;
			}
		} catch (error) {
			if (process.env.NODE_ENV === "development") {
				console.error("Error[useRequestOtp]:", error);
			}

			toast.error("خطا", {
				description: "خطای ناشناخته ای رخ داده است!",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		form,
		submit,
		isSubmitting,
	};
}

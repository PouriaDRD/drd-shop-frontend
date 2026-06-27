"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { getErrorMessage } from "@/features/shared/utils";

import { createSession, verifyOtpAction } from "../actions";
import { verifyOtpSchema } from "../schemas";
import { VerifyOtpData, VerifyOtpFormValues } from "../types";

interface Props {
	otpId: string;
	phoneNumber: string;

	onSuccess?: (data: VerifyOtpData) => void;
}

export default function useVerifyOtp({ otpId, phoneNumber, onSuccess }: Props) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<VerifyOtpFormValues>({
		resolver: zodResolver(verifyOtpSchema),
		defaultValues: {
			otp_id: otpId,
			phone_number: phoneNumber,
			code: "",
		},
	});

	const handleOnSuccess = async (data: VerifyOtpData) => {
		await createSession({
			token: data.tokens.access,
			type: "acs",
			expireTimeUtc: data.tokens.access_expires_at,
		});

		await createSession({
			token: data.tokens.refresh,
			type: "rfs",
			expireTimeUtc: data.tokens.refresh_expires_at,
		});

		const txt = data.is_new
			? "حساب کاربری با موفقیت ایجاد شد!"
			: "ورود با موفقیت انجام شد!";
		toast.success(txt);

		form.reset();

		onSuccess?.(data);
	};

	const submit = async (values: VerifyOtpFormValues) => {
		try {
			setIsSubmitting(true);

			const response = await verifyOtpAction(values);

			if (!response.success) {
				toast.error("خطا", {
					description: getErrorMessage(response),
				});

				return;
			}

			if (response.success) {
				await handleOnSuccess(response.data);
				return;
			}
		} catch (error) {
			console.error("Error[useVerifyOtp]", error);

			toast.error("خطا", {
				description: "خطای ناشناخته ای رخ داده است",
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

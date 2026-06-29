"use client";

import { useEffect, useEffectEvent } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useRequestOtp } from "../mutations";
import { requestOtpSchema } from "../schemas";
import { useOtpStore } from "../stores";
import { OtpType, RequestOtpFormValues } from "../types";

interface Props {
	otpType: OtpType;
	onSuccess?: (email: string, expiresIn: number) => void;
}

export function useRequestOtpForm({ otpType, onSuccess }: Props) {
	const otpStore = useOtpStore();
	const mutation = useRequestOtp();

	const form = useForm<RequestOtpFormValues>({
		resolver: zodResolver(requestOtpSchema),
		defaultValues: {
			email: otpStore.email,
		},
	});

	/**
	 * Handle form submission.
	 *
	 * Flow:
	 * 1. Save the latest email into the store.
	 * 2. Request an OTP from the server.
	 * 3. Persist OTP metadata.
	 * 4. Move the UI to the verification step.
	 * 5. Notify the user.
	 */
	const submit = form.handleSubmit((values) => {
		// Make sure the latest value is persisted immediately.
		otpStore.setEmail(values.email);

		mutation.mutate(
			{
				...values,
				otp_type: otpType,
			},
			{
				onSuccess: (res) => {
					// Backend returned an unsuccessful response.
					if (!res.success) {
						toast.error("خطا در ارسال کد");
						return;
					}
					// Backend returned a successful response.
					if (res.success) {
						const { email: resEmail, expires_in } = res.data;

						otpStore.setExpiresIn(expires_in);
						otpStore.setStep("verify-otp");

						toast.success(`کد یکبار مصرف به ${resEmail} ارسال شد!`);

						onSuccess?.(resEmail, expires_in);
					}
				},

				onError: () => {
					toast.error("خطا در ارسال کد");
				},
			},
		);
	});

	// Sync form -> store
	useEffect(() => {
		// eslint-disable-next-line react-hooks/incompatible-library
		const subscription = form.watch(async (values) => {
			otpStore.set({
				email: values.email,
			});
		});
		return () => subscription.unsubscribe();
	}, [form, otpStore]);

	const onHasHydrated = useEffectEvent(() => {
		form.reset({
			email: otpStore.email,
		});
	});

	// Reset form from store on mount
	useEffect(() => {
		if (otpStore._hasHydrated) {
			onHasHydrated();
		}
	}, [otpStore._hasHydrated]);

	return {
		form,
		submit,
		isPending: mutation.isPending,
	};
}

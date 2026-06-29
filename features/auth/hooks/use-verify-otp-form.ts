"use client";

import { useEffect, useEffectEvent } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { getErrorMessage } from "@/features/shared/utils";

import { createSession } from "../actions";
import { useRequestOtp, useVerifyOtp } from "../mutations";
import { verifyOtpSchema } from "../schemas";
import { useOtpStore } from "../stores";
import { OtpType, VerifyOtpData, VerifyOtpFormValues } from "../types";

interface Props {
	otpType: OtpType;
	onSuccess?: () => void;
}

export default function useVerifyOtpForm({ otpType, onSuccess }: Props) {
	const otpStore = useOtpStore();
	const verifyMutation = useVerifyOtp();
	const resendMutation = useRequestOtp();

	const router = useRouter();
	const searchParams = useSearchParams();
	const next = searchParams.get("next");

	const form = useForm<VerifyOtpFormValues>({
		resolver: zodResolver(verifyOtpSchema),
		defaultValues: {
			code: "",
			email: otpStore.email,
		},
	});

	const handleOnSuccess = async (data: VerifyOtpData) => {
		/**
		 * Persist authentication tokens.
		 *
		 * Both sessions are created concurrently to reduce
		 * the overall authentication time.
		 */
		if (otpType === "login") {
			await Promise.all([
				createSession({
					token: data.access,
					expireTimeUtc: data.access_expires_at,
					type: "acs",
				}),
				createSession({
					token: data.refresh,
					expireTimeUtc: data.refresh_expires_at,
					type: "rfs",
				}),
			]);
		}

		/**
		 * Authentication is complete.
		 * Clear all persisted OTP-related data.
		 */
		otpStore.reset();

		onSuccess?.();

		if (otpType === "login") {
			toast.success("ورود موفقیت‌آمیز بود!");

			router.push((next ?? "/panel/dashboard") as "/");
		} else {
			toast.success("کد تایید شد!");
		}
	};

	/**
	 * Handle OTP verification.
	 *
	 * Flow:
	 * 1. Verify the OTP.
	 * 2. Create authentication sessions (login flow only).
	 * 3. Clear the OTP store.
	 * 4. Notify the parent component.
	 * 5. Redirect the user if necessary.
	 */
	const submit = form.handleSubmit((values) => {
		verifyMutation.mutate(values, {
			onSuccess: async (res) => {
				if (!res.success) {
					toast.error(getErrorMessage(res.errors));
					return;
				}

				if (res.success) {
					await handleOnSuccess(res.data);
				}
			},

			onError: () => {
				toast.error("خطا در تایید کد");
			},
		});
	});

	/**
	 * Request a new OTP.
	 *
	 * After a successful resend:
	 * - Restart the countdown timer.
	 * - Clear the previously entered OTP.
	 * - Notify the user.
	 */
	const handleResend = () => {
		resendMutation.mutate(
			{
				email: otpStore.email,
				otp_type: otpType,
			},
			{
				onSuccess: (res) => {
					if (!res.success) return;

					if (res.success) {
						otpStore.setExpiresIn(res.data.expires_in);
						otpStore.setEmail(res.data.email);

						form.reset({
							code: "",
							email: otpStore.email,
						});

						toast.success("کد جدید ارسال شد!");
					}
				},

				onError: () => {
					toast.error("خطا در ارسال مجدد کد");
				},
			},
		);
	};

	const handleEditEmail = () => {
		otpStore.setExpiresIn(0);
		otpStore.setStep("request-otp");
	};

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
			code: "",
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
		handleResend,
		handleEditEmail,
		isPending: verifyMutation.isPending,
		isResending: resendMutation.isPending,
	};
}

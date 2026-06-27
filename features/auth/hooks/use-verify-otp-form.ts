"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { getErrorMessage } from "@/features/shared/utils";

import { createSession } from "../actions";
import { useRequestOtp, useVerifyOtp } from "../mutations";
import { verifyOtpSchema } from "../schemas";

interface Props {
	otpId: string;
	phoneNumber: string;
	onSuccess?: () => void;
}

export default function useVerifyOtpForm(props: Props) {
	const { otpId, phoneNumber, onSuccess } = props;

	const verifyMutation = useVerifyOtp();
	const resendMutation = useRequestOtp();

	const form = useForm({
		resolver: zodResolver(verifyOtpSchema),
		defaultValues: {
			otp_id: otpId,
			phone_number: phoneNumber,
			code: "",
		},
	});

	const submit = form.handleSubmit(async (values) => {
		verifyMutation.mutate(values, {
			onSuccess: async (res) => {
				if (!res.success) {
					toast.error(getErrorMessage(res.errors));
					return;
				}

				const data = res.data;

				await createSession({
					token: data.tokens.access,
					expireTimeUtc: data.tokens.access_expires_at,
					type: "acs",
				});

				await createSession({
					token: data.tokens.refresh,
					expireTimeUtc: data.tokens.refresh_expires_at,
					type: "rfs",
				});

				form.reset();

				toast.success(
					data.is_new
						? "حساب کاربری با موفقیت ایجاد شد!"
						: "ورود با موفقیت انجام شد!",
				);

				onSuccess?.();
			},
			onError: () => {
				toast.error("خطا در تایید کد");
			},
		});
	});

	const handleResend = () => {
		resendMutation.mutate(
			{ phone_number: form.getValues("phone_number") },
			{
				onSuccess: (res) => {
					if (!res.success) return;
					form.resetField("code");
					form.resetField("otp_id");
					form.setValue("otp_id", res.data.otp_id);
					toast.success("کد جدید ارسال شد!");
				},
				onError: () => toast.error("خطا در ارسال مجدد کد"),
			},
		);
	};

	return {
		form,
		submit,
		handleResend,
		isPending: verifyMutation.isPending,
	};
}

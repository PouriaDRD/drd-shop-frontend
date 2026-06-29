"use client";

import { Button } from "@/components/ui";
import { Countdown } from "@/features/shared/components";

import useVerifyOtpForm from "../../hooks/use-verify-otp-form";
import { OtpType } from "../../types";
import { OtpFields } from "../fields";

interface Props {
	countdown?: number;
	otpType: OtpType;
}

export default function VerifyOtpForm({ countdown, otpType }: Props) {
	const { form, submit, handleResend, handleEditEmail, isPending } =
		useVerifyOtpForm({ otpType: otpType });

	return (
		<form
			onSubmit={submit}
			id="verify-otp-from"
			className="flex flex-col items-center gap-5">
			<OtpFields control={form.control} name="code" />

			{/* countdown */}
			<Countdown countdown={countdown} onResend={handleResend} />

			<div className="w-full space-y-3">
				<Button
					type="submit"
					variant="default"
					form="verify-otp-from"
					className="w-full"
					disabled={isPending}>
					{isPending ? "درحال بررسی..." : "تایید کد"}
				</Button>

				<Button
					variant="outline"
					onClick={handleEditEmail}
					className="w-full">
					ویرایش ایمیل
				</Button>
			</div>
		</form>
	);
}

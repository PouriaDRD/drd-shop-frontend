"use client";

import { Button, CardContent } from "@/components/ui";
import { Countdown } from "@/features/shared/components";

import useVerifyOtpForm from "../../hooks/use-verify-otp-form";
import { OtpFields } from "../fields";

interface Props {
	otpId: string;
	phoneNumber: string;
	onEditPhone: () => void;
	onSuccess?: () => void;
}

export default function VerifyOtpForm(props: Props) {
	const { otpId, phoneNumber, onEditPhone, onSuccess } = props;

	const { form, submit, handleResend, isPending } = useVerifyOtpForm({
		otpId,
		phoneNumber,
		onSuccess,
	});

	return (
		<form onSubmit={submit} id="verify-otp-from">
			<CardContent className="flex flex-col items-center gap-5">
				<OtpFields control={form.control} name="code" />

				{/* countdown */}
				<Countdown onResend={handleResend} />

				<div className="w-full space-y-2">
					<Button
						variant="outline"
						onClick={onEditPhone}
						className="w-full">
						ویرایش شماره
					</Button>
					<Button
						type="submit"
						variant="default"
						form="verify-otp-from"
						className="w-full"
						disabled={isPending}>
						{isPending ? "درحال بررسی..." : "تایید کد"}
					</Button>
				</div>
			</CardContent>
		</form>
	);
}

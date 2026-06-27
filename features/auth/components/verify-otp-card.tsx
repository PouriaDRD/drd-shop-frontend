"use client";

import { PdIcon } from "@/components/icons";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui";

import useVerifyOtp from "../hooks/use-verify-otp";

import { VerifyOtpForm } from "./forms";

interface Props {
	otpId: string;
	phoneNumber: string;
}

function RequestOtpCard(props: Props) {
	const { form, submit, isSubmitting } = useVerifyOtp({
		otpId: props.otpId,
		phoneNumber: props.phoneNumber,
	});

	const text = `کد ارسال شده به شماره ${props.phoneNumber} را وارد کنید`;

	return (
		<Card className="mx-auto max-w-full sm:max-w-xs w-full bg-background ring-0 border-0">
			<CardHeader className="flex flex-col items-center">
				<PdIcon className="size-11" />
				<div className="text-center">
					<CardTitle>ورود / ثبت نام</CardTitle>
					<CardDescription>{text}</CardDescription>
				</div>
			</CardHeader>

			<VerifyOtpForm
				form={form}
				isSubmitting={isSubmitting}
				onSubmit={submit}
			/>
			<CardFooter className="text-center text-xs text-muted-foreground">
				با ورود به سایت، قوانین و مقررات سامانه را می‌پذیرید.
			</CardFooter>
		</Card>
	);
}

export default RequestOtpCard;

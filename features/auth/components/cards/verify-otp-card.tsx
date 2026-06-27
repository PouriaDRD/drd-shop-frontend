"use client";

import { PdIcon } from "@/components/icons";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui";

import { VerifyOtpForm } from "../forms";

interface Props {
	otpId: string;
	phoneNumber: string;
	onEditPhone: () => void;
	onSuccess?: () => void;
}

function VerifyOtpCard(props: Props) {
	const { otpId, phoneNumber, onEditPhone, onSuccess } = props;

	return (
		<Card className="mx-auto max-w-full sm:max-w-xs w-full bg-background ring-0 border-0 gap-4">
			<CardHeader className="flex flex-col items-center">
				<PdIcon className="size-11" />
				<div className="text-center">
					<CardTitle>کد تایید</CardTitle>
					<CardDescription>
						کد 6 رقمی ارسال شده به{" "}
						<span dir="ltr" className="inline-block font-mono">
							{phoneNumber}
						</span>{" "}
						را وارد کنید
					</CardDescription>
				</div>
			</CardHeader>

			<VerifyOtpForm
				otpId={otpId}
				phoneNumber={phoneNumber}
				onSuccess={onSuccess}
				onEditPhone={onEditPhone}
			/>

			<CardFooter className="text-center text-xs text-muted-foreground">
				با ورود به سایت، قوانین و مقررات سامانه را می‌پذیرید.
			</CardFooter>
		</Card>
	);
}

export default VerifyOtpCard;

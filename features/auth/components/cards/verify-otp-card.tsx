"use client";

import { AppIcon } from "@/components/icons";
import {
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui";

import { useOtpStore } from "../../stores";
import { OtpType } from "../../types";
import { VerifyOtpForm } from "../forms";

interface Props {
	otpType: OtpType;
}

export default function VerifyOtpCard({ otpType }: Props) {
	const email = useOtpStore((s) => s.email);
	const countdown = useOtpStore((s) => s.expires_in) * 60;

	return (
		<div
			className={`flex flex-col items-center justify-between gap-4
			mx-auto w-full max-w-xs bg-transparent shadow-none border-0 p-4`}>
			<CardHeader className="flex flex-col items-center w-full">
				<AppIcon className="size-11" />

				<CardTitle>تایید کد</CardTitle>

				<CardDescription className="text-center">
					کد به{" "}
					<span dir="ltr" className="font-bold">
						{email}
					</span>{" "}
					ارسال شد!
					<p>
						اگر کد را دریافت نکردید ، دوباره تلاش کنید و یا پوشه
						اسپم را چک کنید!
					</p>
				</CardDescription>
			</CardHeader>

			<CardContent className="w-full">
				<VerifyOtpForm countdown={countdown} otpType={otpType} />
			</CardContent>
			<CardFooter className="w-full">
				<span className="text-xs text-muted-foreground text-center w-full">
					{otpType === "login"
						? "با ورود، قوانین را می‌پذیرید"
						: "با تایید ایمیل، قوانین را می‌پذیرید"}
				</span>
			</CardFooter>
		</div>
	);
}

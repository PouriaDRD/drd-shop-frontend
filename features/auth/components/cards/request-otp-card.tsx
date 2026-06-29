"use client";

import Link from "next/link";

import { AppIcon } from "@/components/icons";
import {
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui";

import { OtpType } from "../../types";
import { RequestOtpForm } from "../forms";

interface Props {
	otpType: OtpType;
}

export default function RequestOtpCard({ otpType }: Props) {
	return (
		<div
			className={`flex flex-col items-center justify-between gap-4
			mx-auto w-full max-w-xs bg-none border-0 p-4`}>
			<CardHeader className="flex flex-col items-center w-full">
				<AppIcon className="size-11" />
				<CardTitle>
					{otpType === "login" ? "ورود" : "تایید ایمیل"}
				</CardTitle>
				<CardDescription>ایمیل خود را وارد کنید</CardDescription>
			</CardHeader>

			<CardContent className="w-full">
				<RequestOtpForm otpType={otpType} />
			</CardContent>

			<CardFooter className="flex flex-col items-center text-center text-xs text-muted-foreground gap-2">
				{otpType === "login" && (
					<Link href="/auth/login">ورود با رمز عبور</Link>
				)}

				<span className="text-xs text-muted-foreground text-center w-full">
					{otpType === "login"
						? "با ورود، قوانین را می‌پذیرید"
						: "با تایید ایمیل، قوانین را می‌پذیرید"}
				</span>
			</CardFooter>
		</div>
	);
}

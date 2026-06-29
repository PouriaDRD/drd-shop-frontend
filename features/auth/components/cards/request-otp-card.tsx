"use client";

import { AppIcon } from "@/components/icons";
import {
	Card,
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
		<Card className="mx-auto w-full max-w-xs bg-background border-0">
			<CardHeader className="flex flex-col items-center">
				<AppIcon className="size-11" />
				<CardTitle>
					{otpType === "login" ? "ورود" : "تایید ایمیل"}
				</CardTitle>
				<CardDescription>ایمیل خود را وارد کنید</CardDescription>
			</CardHeader>

			<RequestOtpForm otpType={otpType} />

			<CardFooter>
				<span className="text-xs text-muted-foreground text-center w-full">
					با ورود، قوانین را می‌پذیرید
				</span>
			</CardFooter>
		</Card>
	);
}

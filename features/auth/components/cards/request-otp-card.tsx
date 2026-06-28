"use client";

import { AppIcon } from "@/components/icons";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui";

import { RequestOtpData } from "../../types";
import { RequestOtpForm } from "../forms";

interface Props {
	onSuccess: (data: RequestOtpData) => void;
}

function RequestOtpCard({ onSuccess }: Props) {
	return (
		<Card className="mx-auto max-w-full sm:max-w-xs w-full bg-background ring-0 border-0">
			<CardHeader className="flex flex-col items-center">
				<AppIcon className="size-11" />
				<div className="text-center">
					<CardTitle>ورود / ثبت نام</CardTitle>
					<CardDescription>
						شماره همراه خود را وارد کنید
					</CardDescription>
				</div>
			</CardHeader>

			<RequestOtpForm onSuccess={onSuccess} />

			<CardFooter className="text-center text-xs text-muted-foreground">
				با ورود به سایت، قوانین و مقررات سامانه را می‌پذیرید.
			</CardFooter>
		</Card>
	);
}

export default RequestOtpCard;

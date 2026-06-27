"use client";

import { PdIcon } from "@/components/icons";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui";

import { useRequestOtp } from "../hooks";
import { RequestOtpData } from "../types";

import { RequestOtpForm } from "./forms";

interface Props {
	onSuccess: (data: RequestOtpData) => void;
}

function RequestOtpCard({ onSuccess }: Props) {
	const { form, submit, isSubmitting } = useRequestOtp({
		onSuccess(data) {
			onSuccess(data);
		},
	});

	return (
		<Card className="mx-auto max-w-full sm:max-w-xs w-full bg-background ring-0 border-0">
			<CardHeader className="flex flex-col items-center">
				<PdIcon className="size-11" />
				<div className="text-center">
					<CardTitle>ورود / ثبت نام</CardTitle>
					<CardDescription>
						شماره همراه خود را وارد کنید
					</CardDescription>
				</div>
			</CardHeader>

			<RequestOtpForm
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

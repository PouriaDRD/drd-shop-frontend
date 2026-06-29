"use client";

import { Button, CardContent } from "@/components/ui";

import { useRequestOtpForm } from "../../hooks";
import { OtpType } from "../../types";
import { EmailField } from "../fields";

interface Props {
	otpType: OtpType;
}

export default function RequestOtpForm({ otpType }: Props) {
	const { form, submit, isPending } = useRequestOtpForm({
		otpType,
	});

	return (
		<form onSubmit={submit} id="request-otp-from">
			<CardContent className="flex flex-col items-center gap-4">
				<EmailField control={form.control} name="email" />

				<Button
					type="submit"
					variant={"default"}
					form="request-otp-from"
					className="w-full"
					disabled={isPending}>
					{isPending ? "درحال ارسال" : "ارسال کد"}
				</Button>
			</CardContent>
		</form>
	);
}

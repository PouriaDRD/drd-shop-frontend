"use client";

import type { UseFormReturn } from "react-hook-form";

import { Button, CardContent } from "@/components/ui";

import { RequestOtpFormValues } from "../../types";
import { PhoneNumberField } from "../fields";

type Props = {
	form: UseFormReturn<RequestOtpFormValues>;
	isSubmitting: boolean;
	onSubmit: (data: RequestOtpFormValues) => Promise<void>;
};

export default function RequestOtpForm(props: Props) {
	const { form, isSubmitting, onSubmit } = props;

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} id="request-otp-from">
			<CardContent className="flex flex-col items-center gap-4">
				<PhoneNumberField control={form.control} name="phone_number" />

				<Button
					type="submit"
					variant={"default"}
					form="request-otp-from"
					className="w-full"
					disabled={isSubmitting}>
					ارسال کد
				</Button>
			</CardContent>
		</form>
	);
}

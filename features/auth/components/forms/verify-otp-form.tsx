"use client";

import type { UseFormReturn } from "react-hook-form";

import { Button, CardContent } from "@/components/ui";

import { VerifyOtpFormValues } from "../../types";
import { OtpFields } from "../fields";

type Props = {
	form: UseFormReturn<VerifyOtpFormValues>;
	isSubmitting: boolean;
	onSubmit: (data: VerifyOtpFormValues) => Promise<void>;
};

export default function VerifyOtpForm(props: Props) {
	const { form, isSubmitting, onSubmit } = props;

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} id="verify-otp-from">
			<CardContent className="flex flex-col items-center gap-4">
				<OtpFields control={form.control} name="code" />

				<Button
					type="submit"
					variant={"default"}
					form="verify-otp-from"
					className="w-full"
					disabled={isSubmitting}>
					تایید کد
				</Button>
			</CardContent>
		</form>
	);
}

"use client";

import { Button, CardContent } from "@/components/ui";

import useRequestOtpForm from "../../hooks/use-request-otp-form";
import { RequestOtpData } from "../../types";
import { PhoneNumberField } from "../fields";

interface Props {
	onSuccess: (data: RequestOtpData) => void;
}

export default function RequestOtpForm(props: Props) {
	const { form, submit, isPending } = useRequestOtpForm({
		onSuccess(data) {
			props.onSuccess(data);
		},
	});

	return (
		<form onSubmit={submit} id="request-otp-from">
			<CardContent className="flex flex-col items-center gap-4">
				<PhoneNumberField control={form.control} name="phone_number" />

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

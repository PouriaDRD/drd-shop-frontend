"use client";

import { Button, FieldGroup, Spinner } from "@/components/ui";

import { useRegisterForm } from "../../hooks";
import {
	EmailField,
	PasswordConfirmField,
	PasswordField,
	ReferralCodeField,
} from "../fields";

interface Props {
	onSuccess?: () => void;
}

function RegisterForm({ onSuccess }: Props) {
	const { form, submit, isPending } = useRegisterForm({
		onSuccess() {
			onSuccess?.();
		},
	});

	return (
		<form id="register-form" onSubmit={submit}>
			<FieldGroup>
				{/* Email Name */}
				<EmailField control={form.control} name="email" label="ایمیل" />

				{/* Referral Code */}
				<ReferralCodeField
					control={form.control}
					name="referral_code"
					label="کد معرف"
				/>

				{/* Password */}
				<PasswordField
					control={form.control}
					name="password"
					label="رمز عبور"
				/>

				{/* Confirm Password */}
				<PasswordConfirmField
					control={form.control}
					name="password_confirm"
					label="تکرار رمز عبور"
				/>
			</FieldGroup>

			<Button
				type="submit"
				form="register-form"
				className="w-full mt-6"
				disabled={isPending}>
				{isPending ? <Spinner /> : "ثبت نام"}
			</Button>
		</form>
	);
}

export default RegisterForm;

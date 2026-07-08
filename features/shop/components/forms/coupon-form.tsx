"use client";

import { useState } from "react";

import { Button, FieldGroup, Input, Label, Spinner } from "@/components/ui";

import { useApplyCouponForm } from "../../hooks";

interface Props {
	canSubmit?: boolean;
	onSuccess?: () => void;
}

export function CouponForm({ canSubmit, onSuccess }: Props) {
	const [success, setSuccess] = useState(canSubmit);

	const { form, submit, isPending } = useApplyCouponForm({
		onSuccess() {
			onSuccess?.();
			setSuccess(true);
		},
	});

	return (
		<form
			id="apply-coupon-form"
			onSubmit={submit}
			className="flex flex-col gap-4 w-full">
			<FieldGroup>
				{/* Coupon Code */}
				<Label htmlFor="form-coupon-code">کد تخفیف</Label>
				<Input
					type="text"
					dir="ltr"
					autoComplete="off"
					className="placeholder:text-right w-fit"
					placeholder="کد تخفیف"
					aria-label="کد تخفیف"
					disabled={success}
					aria-invalid={form.formState.errors.code ? "true" : "false"}
					{...form.register("code")}
				/>

				{form.formState.errors.code && (
					<p className="text-sm text-destructive">
						{form.formState.errors.code.message}
					</p>
				)}
			</FieldGroup>

			<Button
				type="submit"
				form="apply-coupon-form"
				className="w-fit"
				disabled={isPending || success}>
				{isPending ? <Spinner /> : "اعمال کد تخفیف"}
			</Button>
		</form>
	);
}

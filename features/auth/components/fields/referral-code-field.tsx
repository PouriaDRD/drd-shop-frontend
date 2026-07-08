"use client";

import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";

import { Field, FieldError, FieldLabel, Input } from "@/components/ui";

type Props<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label?: string;
};

export default function ReferralCodeField<T extends FieldValues>(
	props: Props<T>,
) {
	const { control, name, label = "کد معرف" } = props;
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor="form-referral">{label}</FieldLabel>
					<Input
						{...field}
						autoFocus
						dir="ltr"
						type="text"
						id="form-referral"
						aria-invalid={fieldState.invalid}
						placeholder="DRD-"
					/>
					{fieldState.invalid && (
						<FieldError
							errors={[fieldState.error]}
							className="text-xs"
						/>
					)}
				</Field>
			)}
		/>
	);
}

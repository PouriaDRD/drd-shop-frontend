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

export default function PhoneNumberField<T extends FieldValues>({
	control,
	name,
	label = "شماره موبایل",
}: Props<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid} className="">
					<FieldLabel>{label}</FieldLabel>

					<Input
						{...field}
						dir="ltr"
						type="tel"
						placeholder="09121234567"
						aria-invalid={fieldState.invalid}
					/>

					{fieldState.error && (
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

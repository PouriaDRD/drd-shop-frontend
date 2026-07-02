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

export function SenderCardNumberField<T extends FieldValues>({
	control,
	name,
	label = "شماره کارت",
}: Props<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel>{label}</FieldLabel>

					<Input
						{...field}
						autoComplete="sender-card-number"
						type="text"
						dir="ltr"
						id="sender-card-number"
						aria-invalid={fieldState.invalid}
						placeholder="شماره کارت"
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

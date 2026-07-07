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

export function ReferenceNumberField<T extends FieldValues>({
	control,
	name,
	label = "شماره مرجع",
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
						autoComplete="reference-number"
						dir="ltr"
						type="text"
						id="reference-number"
						aria-invalid={fieldState.invalid}
						placeholder="شماره مرجع"
						className="placeholder:text-right"
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

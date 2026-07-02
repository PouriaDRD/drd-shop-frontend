"use client";

import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui";
import { FileUpload } from "@/features/shared/components/fields";

type Props<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label?: string;
};

export function ReceiptImageField<T extends FieldValues>({
	control,
	name,
	label = "تصویر رسید",
}: Props<T>) {
	const accept = {
		"image/jpeg": [],
		"image/png": [],
		"image/jpg": [],
	};
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel>{label}</FieldLabel>

					<FileUpload
						accept={accept}
						value={field.value}
						onChange={field.onChange}
					/>

					{fieldState.error && (
						<FieldError errors={[fieldState.error]} />
					)}
				</Field>
			)}
		/>
	);
}

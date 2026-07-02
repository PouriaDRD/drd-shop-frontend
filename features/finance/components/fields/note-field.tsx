"use client";

import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";

import { Field, FieldError, FieldLabel, Textarea } from "@/components/ui";

type Props<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label?: string;
};

export function NoteField<T extends FieldValues>({
	control,
	name,
	label = "توضیحات (اختیاری)",
}: Props<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel>{label}</FieldLabel>

					<Textarea
						{...field}
						rows={4}
						placeholder="اگر توضیحی دارید اینجا بنویسید..."
						className="resize-none"
					/>

					{fieldState.error && (
						<FieldError errors={[fieldState.error]} />
					)}
				</Field>
			)}
		/>
	);
}

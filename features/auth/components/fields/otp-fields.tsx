"use client";

import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";

import {
	Field,
	FieldError,
	FieldLabel,
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui";

type Props<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label?: string;
};

export default function OtpFields<T extends FieldValues>({
	control,
	name,
	label = "کد تایید",
}: Props<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid} className="w-full">
					<FieldLabel>{label}</FieldLabel>

					<InputOTP
						maxLength={6}
						{...field}
						dir="ltr"
						className="w-full"
						autoFocus>
						<InputOTPGroup dir="ltr" className="w-full">
							<InputOTPSlot
								index={0}
								className="flex-1 text-lg"
							/>
							<InputOTPSlot
								index={1}
								className="flex-1 text-lg"
							/>
							<InputOTPSlot
								index={2}
								className="flex-1 text-lg"
							/>
							<InputOTPSlot
								index={3}
								className="flex-1 text-lg"
							/>
							<InputOTPSlot
								index={4}
								className="flex-1 text-lg"
							/>
							<InputOTPSlot
								index={5}
								className="flex-1 text-lg"
							/>
						</InputOTPGroup>
					</InputOTP>

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

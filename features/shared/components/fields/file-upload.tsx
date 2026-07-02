"use client";

import { useCallback, useState } from "react";

import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";

type Props = {
	value?: File | null;
	onChange: (file: File | null) => void;
	accept?: Record<string, string[]>;
	maxSize?: number;
	label?: string;
};

export function FileUpload({
	value,
	onChange,
	accept = {
		"image/*": [],
	},
	maxSize = 5 * 1024 * 1024,
	label = "فایل را اینجا رها کنید یا انتخاب کنید",
}: Props) {
	const [error, setError] = useState<string | null>(null);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const file = acceptedFiles[0];

			if (!file) return;

			if (file.size > maxSize) {
				setError("حجم فایل بیش از حد مجاز است");
				return;
			}

			setError(null);
			onChange(file);
		},
		[maxSize, onChange],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept,
		multiple: false,
	});

	return (
		<div className="w-full space-y-2">
			<div
				{...getRootProps()}
				className={`
					cursor-pointer rounded-lg border border-dashed p-6 text-center transition
					${isDragActive ? "border-primary bg-muted" : "border-border"}
				`}>
				<input {...getInputProps()} />

				{value ? (
					<div className="flex flex-col items-center gap-2">
						<p className="text-sm font-medium">{value.name}</p>
						<p className="text-xs text-muted-foreground">
							{(value.size / 1024 / 1024).toFixed(2)} MB
						</p>

						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={(e) => {
								e.stopPropagation();
								onChange(null);
							}}>
							حذف فایل
						</Button>
					</div>
				) : (
					<div className="space-y-2">
						<p className="text-sm text-muted-foreground">{label}</p>
						<p className="text-xs text-muted-foreground">
							PNG • JPG • WEBP • حداکثر ۵MB
						</p>
					</div>
				)}
			</div>

			{error && <p className="text-xs text-destructive">{error}</p>}
		</div>
	);
}

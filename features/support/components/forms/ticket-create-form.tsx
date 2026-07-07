"use client";

import { Paperclip, X } from "lucide-react";
import { Controller } from "react-hook-form";

import {
	Button,
	Input,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
	Textarea,
} from "@/components/ui";

import { useTicketCreateForm } from "../../hooks";

interface Props {
	onCancel?: () => void;
	onSuccess?: () => void;
}

export function TicketCreateForm({ onCancel, onSuccess }: Props) {
	const { form, submit, files, addFiles, removeFile, isPending } =
		useTicketCreateForm({
			onSuccess,
		});

	function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
		addFiles(Array.from(e.target.files ?? []));

		e.target.value = "";
	}

	function handleOnCancel() {
		form.reset();
		onCancel?.();
	}

	return (
		<form dir="rtl" onSubmit={submit} className="space-y-6">
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2 w-full">
				{/* Title */}
				<div className="space-y-2">
					<Label>موضوع تیکت</Label>

					<Input
						placeholder="عنوان تیکت"
						disabled={isPending}
						{...form.register("title")}
					/>

					{form.formState.errors.title && (
						<p className="text-sm text-destructive">
							{form.formState.errors.title.message}
						</p>
					)}
				</div>

				{/* Category */}
				<div className="flex flex-col gap-2 items-start  md:items-center w-full">
					<Label>دسته‌بندی</Label>

					<Controller
						control={form.control}
						name="category"
						render={({ field }) => (
							<Select
								value={field.value}
								onValueChange={field.onChange}
								disabled={isPending}>
								<SelectTrigger>
									<SelectValue placeholder="انتخاب دسته‌بندی" />
								</SelectTrigger>

								<SelectContent>
									<div className="px-2 py-1 text-xs text-muted-foreground">
										نوع درخواست را انتخاب کنید
									</div>

									<SelectSeparator />

									<SelectItem value="general">
										عمومی
									</SelectItem>

									<SelectItem value="payment">
										پرداخت
									</SelectItem>

									<SelectItem value="order">سفارش</SelectItem>

									<SelectItem value="technical">
										فنی
									</SelectItem>
								</SelectContent>
							</Select>
						)}
					/>
				</div>

				{/* Message */}
				<div className="space-y-2 md:col-span-2">
					<Label>پیام</Label>

					<Textarea
						rows={6}
						placeholder="پیام خود را بنویسید..."
						disabled={isPending}
						{...form.register("message")}
					/>

					{form.formState.errors.message && (
						<p className="text-sm text-destructive">
							{form.formState.errors.message.message}
						</p>
					)}
				</div>

				{/* Attachments */}
				<div className="space-y-3 md:col-span-2">
					<Label>فایل‌های پیوست</Label>

					{files.length > 0 && (
						<div className="grid gap-2 md:grid-cols-2">
							{files.map((file, index) => (
								<div
									key={`${file.name}-${index}`}
									className="
													flex
													items-center
													justify-between
													rounded-lg
													border
													p-3
													text-sm
												">
									<span className="truncate">
										{file.name}
									</span>

									<Button
										type="button"
										size="icon"
										variant="ghost"
										onClick={() => removeFile(index)}>
										<X className="size-4" />
									</Button>
								</div>
							))}
						</div>
					)}

					<label>
						<input
							type="file"
							multiple
							className="hidden"
							onChange={onFilesChange}
							disabled={isPending}
						/>

						<Button
							type="button"
							variant="outline"
							asChild
							disabled={isPending}>
							<span>
								<Paperclip className="size-4" />
								افزودن فایل
							</span>
						</Button>
					</label>

					{/* Error */}
					{form.formState.errors.attachments && (
						<p className="text-sm text-destructive">
							{form.formState.errors.attachments.message}
						</p>
					)}
				</div>
			</div>

			{/* Actions */}
			<div className="flex justify-between border-t pt-5">
				<Button
					type="button"
					variant="outline"
					onClick={handleOnCancel}
					disabled={isPending}>
					لغو
				</Button>

				<Button type="submit" disabled={isPending} className="min-w-32">
					{isPending ? "درحال ثبت..." : "ثبت تیکت"}
				</Button>
			</div>
		</form>
	);
}

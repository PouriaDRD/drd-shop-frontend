"use client";

import { useCallback } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Paperclip, Send, X } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button, Textarea } from "@/components/ui";

import { useTicketReply } from "../../hooks";
import { ticketReplySchema } from "../../schemas";
import { TicketReplyFormData } from "../../types";

interface Props {
	ticketId: string;
	isClosed: boolean;
}

export function TicketReplyForm({ ticketId, isClosed }: Props) {
	const mutation = useTicketReply(ticketId);

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		reset,
		formState: { errors },
	} = useForm<TicketReplyFormData>({
		resolver: zodResolver(ticketReplySchema),

		defaultValues: {
			message: "",
			attachments: [],
		},
	});

	const submit = useCallback(
		(values: TicketReplyFormData) => {
			const formData = new FormData();

			formData.append("message", values.message);

			values.attachments.forEach((file) => {
				formData.append("attachments", file);
			});

			mutation.mutate(formData, {
				onSuccess() {
					reset();
				},
			});
		},
		[mutation, reset],
	);

	const onSubmit = handleSubmit(submit);

	function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
		const selected = Array.from(e.target.files ?? []);

		const current = getValues("attachments") ?? [];

		setValue("attachments", [...current, ...selected], {
			shouldValidate: true,
		});

		e.target.value = "";
	}

	function removeFile(index: number) {
		const current = getValues("attachments");

		setValue(
			"attachments",
			current.filter((_, i) => i !== index),
			{
				shouldValidate: true,
			},
		);
	}

	const files = getValues("attachments") ?? [];

	return (
		<form onSubmit={onSubmit} className="w-full space-y-4">
			<Textarea
				placeholder="پیام خود را بنویسید..."
				rows={4}
				{...register("message")}
				disabled={isClosed || mutation.isPending}
			/>

			{errors.message && (
				<p className="text-sm text-destructive">
					{errors.message.message}
				</p>
			)}

			{files.length > 0 && (
				<div className="space-y-2">
					{files.map((file, index) => (
						<div
							key={`${file.name}-${index}`}
							className="
											flex
											items-center
											justify-between
											rounded-lg
											border
											p-2
											text-sm
										">
							<span className="truncate">{file.name}</span>

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

			{errors.attachments && (
				<p className="text-sm text-destructive">
					{errors.attachments.message}
				</p>
			)}

			<div className="flex justify-between">
				<label>
					<input
						type="file"
						multiple
						className="hidden"
						onChange={onFilesChange}
						disabled={isClosed || mutation.isPending}
					/>

					<Button
						type="button"
						variant="outline"
						asChild
						disabled={isClosed || mutation.isPending}>
						<span>
							<Paperclip className="size-4" />
							فایل
						</span>
					</Button>
				</label>

				<Button type="submit" disabled={mutation.isPending || isClosed}>
					<Send className="size-4" />

					{mutation.isPending ? "درحال ارسال..." : "ارسال"}
				</Button>
			</div>
		</form>
	);
}

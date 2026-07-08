"use client";

import { Paperclip, Send, X } from "lucide-react";

import { Button, Textarea } from "@/components/ui";

import { useTicketReplyForm } from "../../hooks";

interface Props {
	ticketId: string;
	isClosed: boolean;
	onSuccess?: () => void;
}

export function TicketReplyForm({ ticketId, isClosed, onSuccess }: Props) {
	const { form, submit, files, addFiles, removeFile, isPending } =
		useTicketReplyForm({
			ticketId,
			onSuccess,
		});

	function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
		const selected = Array.from(e.target.files ?? []);

		addFiles(selected);

		e.target.value = "";
	}

	return (
		<form
			dir="rtl"
			id="reply-ticket-from"
			onSubmit={submit}
			className="space-y-4 w-full">
			<Textarea
				placeholder="پیام خود را بنویسید..."
				rows={4}
				disabled={isClosed || isPending}
				{...form.register("message")}
			/>

			{form.formState.errors.message && (
				<p className="text-sm text-destructive">
					{form.formState.errors.message.message}
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

			{form.formState.errors.attachments && (
				<p className="text-sm text-destructive">
					{form.formState.errors.attachments.message}
				</p>
			)}

			<div className="flex justify-between w-full">
				<Button
					type="submit"
					disabled={isClosed || isPending}
					form="reply-ticket-from">
					<Send className="size-4" />

					{isPending ? "درحال ارسال..." : "ارسال"}
				</Button>
				<label>
					<input
						type="file"
						multiple
						className="hidden"
						disabled={isClosed || isPending}
						onChange={onFilesChange}
					/>

					<Button
						type="button"
						variant="outline"
						asChild
						disabled={isClosed || isPending}>
						<span>
							<Paperclip className="size-4" />
							فایل
						</span>
					</Button>
				</label>
			</div>
		</form>
	);
}

"use client";

import { useCallback } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { useTicketReply } from "../mutations";
import { ticketReplySchema } from "../schemas";
import { TicketReplyFormData } from "../types";

interface Props {
	ticketId: string;
	onSuccess?: () => void;
}

export function useTicketReplyForm({ ticketId, onSuccess }: Props) {
	const mutation = useTicketReply(ticketId);

	const form = useForm<TicketReplyFormData>({
		resolver: zodResolver(ticketReplySchema),

		defaultValues: {
			message: "",
			attachments: [],
		},
	});

	const submit = form.handleSubmit((values) => {
		try {
			const formData = new FormData();

			formData.append("message", values.message);

			values.attachments?.forEach((file) => {
				formData.append("attachments", file);
			});

			mutation.mutate(formData, {
				onSuccess: (res) => {
					if (!res.success) {
						toast.error(res.message || "خطا در ارسال پیام");
						return;
					}

					toast.success("پیام ارسال شد");

					form.reset();

					onSuccess?.();
				},

				onError() {
					toast.error("خطا در ارتباط با سرور");
				},
			});
		} catch (error) {
			console.error(error);

			toast.error("خطای غیرمنتظره رخ داد");
		}
	});

	const addFiles = useCallback(
		(files: File[]) => {
			const current = form.getValues("attachments") ?? [];

			form.setValue("attachments", [...current, ...files], {
				shouldValidate: true,
			});
		},
		[form],
	);

	const removeFile = useCallback(
		(index: number) => {
			const current = form.getValues("attachments") ?? [];

			form.setValue(
				"attachments",
				current.filter((_, i) => i !== index),
				{
					shouldValidate: true,
				},
			);
		},
		[form],
	);

	const files = useWatch({
		control: form.control,
		name: "attachments",
	});

	return {
		form,
		submit,

		files,

		addFiles,
		removeFile,

		isPending: mutation.isPending,
	};
}

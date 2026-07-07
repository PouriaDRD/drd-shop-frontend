"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { useCreateTicket } from "../mutations";
import { ticketCreateSchema } from "../schemas";
import { TicketCreateFormData } from "../types";

interface Props {
	onSuccess?: () => void;
}

export function useTicketCreateForm({ onSuccess }: Props = {}) {
	const mutation = useCreateTicket();

	const form = useForm<TicketCreateFormData>({
		resolver: zodResolver(ticketCreateSchema),

		defaultValues: {
			title: "",
			message: "",
			category: "general",
			attachments: [],
		},
	});

	const submit = form.handleSubmit((values) => {
		const formData = new FormData();

		formData.append("title", values.title);

		formData.append("message", values.message);

		formData.append("category", values.category);

		values.attachments?.forEach((file) => {
			formData.append("attachments", file);
		});

		mutation.mutate(formData, {
			onSuccess: (res) => {
				if (!res.success) {
					toast.error(res.message || "خطا در ایجاد تیکت");

					return;
				}

				toast.success("تیکت ایجاد شد");

				form.reset();

				onSuccess?.();
			},

			onError() {
				toast.error("خطا در ارتباط با سرور");
			},
		});
	});

	function addFiles(files: File[]) {
		const current = form.getValues("attachments") ?? [];

		form.setValue("attachments", [...current, ...files], {
			shouldValidate: true,
		});
	}

	function removeFile(index: number) {
		const current = form.getValues("attachments") ?? [];

		form.setValue(
			"attachments",
			current.filter((_, i) => i !== index),
			{
				shouldValidate: true,
			},
		);
	}

	const files = useWatch({
		control: form.control,
		name: "attachments",
	});

	return {
		form,

		submit,

		files: files,

		addFiles,

		removeFile,

		isPending: mutation.isPending,
	};
}

"use client";

import { useState } from "react";

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui";

import { TicketCreateForm } from "../forms";

interface Props {
	onSuccess?: () => void;
}

export function TicketCreateDialog({ onSuccess }: Props) {
	const [open, setOpen] = useState(false);

	const handleOnSuccess = () => {
		setOpen(false);
		onSuccess?.();
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">ثبت تیکت</Button>
			</DialogTrigger>

			<DialogContent className="max-w-sm w-full">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						ایجاد تیکت
					</DialogTitle>

					<DialogDescription>
						اطلاعات زیر را برای ثبت تیکت کامل کنید!
					</DialogDescription>
				</DialogHeader>
				<TicketCreateForm
					onSuccess={handleOnSuccess}
					onCancel={() => {
						setOpen(false);
					}}
				/>
			</DialogContent>
		</Dialog>
	);
}

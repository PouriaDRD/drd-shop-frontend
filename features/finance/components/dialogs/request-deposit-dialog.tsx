"use client";

import { useState } from "react";

import { Wallet } from "lucide-react";

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	ScrollArea,
} from "@/components/ui";
import { CardToCardInfo } from "@/features/shared/components";

import { RequestDepositForm } from "../forms";

interface Props {
	onSuccess?: () => void;
}

export function RequestDepositDialog({ onSuccess }: Props) {
	const [open, setOpen] = useState(false);

	const handleOnSuccess = () => {
		setOpen(false);
		onSuccess?.();
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">افزایش موجودی</Button>
			</DialogTrigger>

			<DialogContent className="w-full max-w-sm">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Wallet className="size-5" />
						درخواست واریز
					</DialogTitle>

					<DialogDescription>
						ابتدا مبلغ را به شماره کارت زیر واریز کرده و سپس فرم
						درخواست را تکمیل کنید.
					</DialogDescription>
				</DialogHeader>
				<ScrollArea className="max-h-[70dvh]">
					<div className="space-y-8 p-4">
						<CardToCardInfo />

						<RequestDepositForm onSuccess={handleOnSuccess} />
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}

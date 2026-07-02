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
} from "@/components/ui";
import { CardToCardInfo } from "@/features/shared/components";

import { RequestDepositForm } from "../forms";

export function RequestDepositDialog() {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="xs">
					افزایش موجودی
				</Button>
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

				<CardToCardInfo />

				<div className="max-h-96 overflow-auto px-4">
					<RequestDepositForm onSuccess={() => setOpen(false)} />s
				</div>
			</DialogContent>
		</Dialog>
	);
}

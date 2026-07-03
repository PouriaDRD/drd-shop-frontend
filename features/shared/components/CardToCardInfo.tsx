"use client";

import { useState } from "react";

import { Check, Copy, CreditCard } from "lucide-react";
import { toast } from "sonner";

import { Button, Card, CardContent, Separator } from "@/components/ui";

const cardNumber = process.env.NEXT_PUBLIC_CARD_NUMBER ?? "6063731233224626";

const cardHolder = process.env.NEXT_PUBLIC_CARD_NUMBER_NAME ?? "پوریا دارندی";

function formatCardNumber(card: string) {
	return card
		.replace(/\D/g, "")
		.replace(/(.{4})/g, "$1 ")
		.trim();
}

export function CardToCardInfo() {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(cardNumber);

		setCopied(true);
		toast.success("شماره کارت کپی شد.");

		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Card className="p-0">
			<CardContent className="space-y-4 p-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2 text-sm font-medium">
						<CreditCard className="size-4 text-muted-foreground" />
						شماره کارت مقصد
					</div>

					<Button
						type="button"
						variant="ghost"
						size="icon"
						onClick={handleCopy}>
						{copied ? (
							<Check className="size-4 text-green-600" />
						) : (
							<Copy className="size-4" />
						)}
					</Button>
				</div>
				<p
					dir="ltr"
					className="rounded-md bg-muted px-3 py-2 text-center font-mono text-lg tracking-widest">
					{formatCardNumber(cardNumber)}
				</p>
				<Separator />
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">نام صاحب حساب</span>

					<span className="font-medium">{cardHolder}</span>
				</div>{" "}
				<p className="text-xs font-bold">
					فقط روش کارت به کارت را انجام دهید، بقیه روش ها مانند پایا و
					بقیه موارد تایید نمی شوند!
				</p>
			</CardContent>
		</Card>
	);
}

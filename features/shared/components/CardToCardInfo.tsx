"use client";

import { useMemo, useState } from "react";

import {
	Check,
	ChevronLeft,
	ChevronRight,
	Copy,
	CreditCard,
} from "lucide-react";
import { toast } from "sonner";

import { Button, Card, CardContent, Separator } from "@/components/ui";
import { useCards } from "@/features/finance/mutations";

function formatCardNumber(card: string) {
	return card
		.replace(/\D/g, "")
		.replace(/(.{4})/g, "$1 ")
		.trim();
}

export function CardToCardInfo() {
	const { data, isLoading } = useCards();

	const cards = useMemo(() => (data?.success ? data.data : []), [data]);

	const [currentIndex, setCurrentIndex] = useState(0);
	const [copied, setCopied] = useState(false);

	if (isLoading) {
		return (
			<Card>
				<CardContent className="p-4 text-sm text-muted-foreground">
					در حال بارگذاری...
				</CardContent>
			</Card>
		);
	}

	if (!cards.length) {
		return (
			<Card>
				<CardContent className="p-4 text-sm text-muted-foreground">
					هیچ کارت فعالی وجود ندارد.
				</CardContent>
			</Card>
		);
	}

	const card = cards[currentIndex];

	const handleCopy = async () => {
		await navigator.clipboard.writeText(card.owner_card_number);

		setCopied(true);
		toast.success("شماره کارت کپی شد.");

		setTimeout(() => setCopied(false), 1500);
	};

	const next = () => {
		setCurrentIndex((prev) => (prev + 1) % cards.length);
		setCopied(false);
	};

	const prev = () => {
		setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
		setCopied(false);
	};

	return (
		<Card className="p-0">
			<CardContent className="space-y-4 py-4">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<CreditCard className="size-4 text-muted-foreground" />
						<span className="text-sm font-medium">
							شماره کارت مقصد
						</span>
					</div>

					<div className="flex items-center gap-1">
						{cards.length > 1 && (
							<>
								<Button
									size="icon"
									variant="ghost"
									className="size-7"
									onClick={prev}>
									<ChevronRight className="size-4" />
								</Button>

								<div className="flex items-center gap-1 px-1">
									{cards.map((_, index) => (
										<span
											key={index}
											className={`h-1.5 rounded-full transition-all ${
												index === currentIndex
													? "w-4 bg-primary"
													: "w-1.5 bg-muted-foreground/30"
											}`}
										/>
									))}
								</div>

								<Button
									size="icon"
									variant="ghost"
									className="size-7"
									onClick={next}>
									<ChevronLeft className="size-4" />
								</Button>
							</>
						)}

						<Button
							size="icon"
							variant="ghost"
							className="size-7"
							onClick={handleCopy}>
							{copied ? (
								<Check className="size-4 text-green-600" />
							) : (
								<Copy className="size-4" />
							)}
						</Button>
					</div>
				</div>

				{/* Card Number */}
				<div
					dir="ltr"
					className="rounded-lg border bg-muted/40 px-4 py-3 text-center font-mono text-lg tracking-[0.18em]">
					{formatCardNumber(card.owner_card_number)}
				</div>

				<Separator />

				{/* Owner */}
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">نام صاحب حساب</span>

					<span className="font-medium">{card.owner_name}</span>
				</div>

				<p className="rounded-md bg-amber-500/10 p-2 text-xs leading-6 text-amber-700 dark:text-amber-400">
					فقط از روش <b>کارت به کارت</b> استفاده کنید. واریز از طریق
					پایا، ساتنا یا سایر روش‌ها تأیید نخواهد شد.
				</p>
			</CardContent>
		</Card>
	);
}

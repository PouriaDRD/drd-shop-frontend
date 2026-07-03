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

		setTimeout(() => setCopied(false), 1200);
	};

	const next = () => {
		setCurrentIndex((p) => (p + 1) % cards.length);
		setCopied(false);
	};

	const prev = () => {
		setCurrentIndex((p) => (p - 1 + cards.length) % cards.length);
		setCopied(false);
	};

	return (
		<Card className="p-0">
			<CardContent className="space-y-4 py-4">
				{/* HEADER */}
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-center gap-2">
						<CreditCard className="size-4 text-muted-foreground" />
						<span className="text-sm font-medium">
							شماره کارت مقصد
						</span>
					</div>

					<div className="flex items-center justify-between sm:justify-end gap-1">
						{/* NAV */}
						{cards.length > 1 && (
							<div className="flex items-center gap-1">
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
							</div>
						)}

						{/* COPY */}
						<Button
							size="icon"
							variant="ghost"
							className="size-7 shrink-0"
							onClick={handleCopy}>
							{copied ? (
								<Check className="size-4 text-green-600" />
							) : (
								<Copy className="size-4" />
							)}
						</Button>
					</div>
				</div>

				{/* CARD NUMBER */}
				<div
					dir="ltr"
					className="
						rounded-lg border bg-muted/40
						px-3 py-3 sm:px-4
						text-center font-mono
						text-base sm:text-lg
						tracking-[0.18em]
						break-all
					">
					{formatCardNumber(card.owner_card_number)}
				</div>

				<Separator />

				{/* OWNER */}
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">نام صاحب حساب</span>

					<span className="font-medium text-right">
						{card.owner_name}
					</span>
				</div>

				{/* WARNING */}
				<p className="rounded-md bg-amber-500/10 p-2 text-xs leading-6 text-amber-700 dark:text-amber-400">
					فقط از روش <b>کارت به کارت</b> استفاده کنید. واریز از طریق
					پایا، ساتنا یا سایر روش‌ها تأیید نخواهد شد.
				</p>
			</CardContent>
		</Card>
	);
}

"use client";

import Link from "next/link";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";

import { CartItem } from "../../types";

import { CartEmpty } from "./cart-empty";
import { CartItemCard } from "./cart-item";
import { CartSummary } from "./cart-summary";

type CartSheetProps = {
	items: CartItem[];
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export function CartSheet({ items, open, onOpenChange }: CartSheetProps) {
	const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				showCloseButton={false}
				side="right"
				className="flex w-full flex-col sm:max-w-md">
				<SheetHeader className="flex flex-row items-center justify-between">
					<SheetTitle>
						سبد خرید ({totalItems.toLocaleString("fa-IR")})
					</SheetTitle>

					<Button
						size="icon"
						variant="ghost"
						onClick={() => onOpenChange(false)}>
						<X className="size-4" />
					</Button>
				</SheetHeader>

				<Separator />

				{/* CONTENT */}
				<div className="max-h-full overflow-auto">
					<div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
						{items.length === 0 ? (
							<CartEmpty />
						) : (
							items.map((item) => (
								<CartItemCard key={item.plan_id} item={item} />
							))
						)}
					</div>
				</div>

				{/* FOOTER */}
				<SheetFooter>
					{items.length > 0 && (
						<div className="space-y-3 border-t pt-4">
							<CartSummary />

							<div className="flex flex-col gap-2">
								<Link href="/checkout">
									<Button className="w-full">
										ادامه خرید
									</Button>
								</Link>
							</div>
						</div>
					)}
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

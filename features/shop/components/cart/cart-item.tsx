"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/features/shared/utils";

import { useCartStore } from "../../stores";
import { type CartItem } from "../../types";

type CartItemProps = {
	item: CartItem;
};

export function CartItem({ item }: CartItemProps) {
	const increaseQuantity = useCartStore((state) => state.increaseQuantity);
	const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
	const removeItem = useCartStore((state) => state.removeItem);

	const totalPrice = item.price * item.quantity;

	const handleDecrease = () => {
		if (item.quantity <= 1) {
			removeItem(item.planId);
			return;
		}
		decreaseQuantity(item.planId);
	};

	return (
		<Card
			className={cn(
				"flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between",
			)}>
			{/* INFO */}
			<div className="flex flex-col gap-1">
				<p className="text-sm font-medium">{item.title}</p>

				<p className="text-xs text-muted-foreground">
					{item.price.toLocaleString("fa-IR")} تومان
				</p>

				<p className="text-xs text-primary">
					جمع: {totalPrice.toLocaleString("fa-IR")} تومان
				</p>
			</div>

			{/* CONTROLS */}
			<div className="flex items-center justify-between gap-2 sm:justify-end">
				<div className="flex items-center gap-1 rounded-lg border p-1">
					<Button
						size="icon"
						variant="ghost"
						onClick={handleDecrease}>
						<Minus className="size-4" />
					</Button>

					<span className="w-6 text-center text-sm">
						{item.quantity}
					</span>

					<Button
						size="icon"
						variant="ghost"
						onClick={() => increaseQuantity(item.planId)}>
						<Plus className="size-4" />
					</Button>
				</div>

				<Button
					size="icon"
					variant="destructive"
					onClick={() => removeItem(item.planId)}>
					<Trash2 className="size-4" />
				</Button>
			</div>
		</Card>
	);
}

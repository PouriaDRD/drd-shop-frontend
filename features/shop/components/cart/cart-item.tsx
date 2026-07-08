"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/features/shared/utils";

import { useCartActions } from "../../hooks";
import { type CartItem } from "../../types";

type CartItemProps = {
	item: CartItem;
};

export function CartItemCard({ item }: CartItemProps) {
	const {
		removeItem,
		isRemovingItem,
		decreaseQuantity,
		increaseQuantity,
		isDecreasingQuantity,
		isIncreasingQuantity,
	} = useCartActions();

	const handleDecrease = () => {
		if (item.quantity <= 1) {
			removeItem(item.plan_id);
			return;
		}
		decreaseQuantity(item.plan_id);
	};

	const isDisable =
		isDecreasingQuantity || isIncreasingQuantity || isRemovingItem;

	return (
		<Card
			className={cn(
				"flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between",
			)}>
			{/* INFO */}
			<div className="flex flex-col gap-1">
				<p className="text-sm font-medium">{item.plan_title}</p>

				<p className="text-xs text-muted-foreground">
					{item.unit_price.toLocaleString("fa-IR")} تومان
				</p>

				<p className="text-xs text-primary">
					جمع: {item.total_price.toLocaleString("fa-IR")} تومان
				</p>
			</div>

			{/* CONTROLS */}
			<div className="flex items-center justify-between gap-2 sm:justify-end">
				<div className="flex items-center gap-1 rounded-lg border p-1">
					<Button
						size="icon"
						variant="ghost"
						disabled={isDisable || item.is_renewal}
						onClick={handleDecrease}>
						<Minus className="size-4" />
					</Button>

					<span className="w-6 text-center text-sm">
						{item.quantity}
					</span>

					<Button
						size="icon"
						variant="ghost"
						disabled={isDisable || item.is_renewal}
						onClick={() => increaseQuantity(item.plan_id)}>
						<Plus className="size-4" />
					</Button>
				</div>

				<Button
					size="icon"
					variant="destructive"
					disabled={isDisable}
					onClick={() => removeItem(item.plan_id)}>
					<Trash2 className="size-4" />
				</Button>
			</div>
		</Card>
	);
}

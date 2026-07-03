"use client";

import { useMemo } from "react";

import { useCartStore } from "../../stores";

export function CartSummary() {
	const items = useCartStore((state) => state.items);

	const { totalItems, totalPrice } = useMemo(() => {
		return items.reduce(
			(acc, item) => {
				acc.totalItems += item.quantity;
				acc.totalPrice += item.price * item.quantity;
				return acc;
			},
			{ totalItems: 0, totalPrice: 0 },
		);
	}, [items]);

	return (
		<div className="space-y-2 rounded-lg border bg-muted/30 p-3">
			<div className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">تعداد آیتم‌ها</span>
				<span className="font-medium">
					{totalItems.toLocaleString("fa-IR")}
				</span>
			</div>

			<div className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">جمع کل</span>
				<span className="font-semibold text-primary">
					{totalPrice.toLocaleString("fa-IR")} تومان
				</span>
			</div>
		</div>
	);
}

"use client";

import { useState } from "react";

import { ShoppingCart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useCartStore } from "../../stores";

import { CartSheet } from "./cart-sheet";

export function CartButton() {
	const items = useCartStore((state) => state.items);

	const count = items.reduce((sum, item) => sum + item.quantity, 0);

	const [open, setOpen] = useState(false);

	const onClick = () => setOpen(true);

	return (
		<>
			<Button
				variant="outline"
				size="icon"
				className="relative"
				onClick={onClick}>
				<ShoppingCart className="size-5" />

				{count > 0 && (
					<Badge
						className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px]"
						variant="default">
						{count.toLocaleString("fa-IR")}
					</Badge>
				)}
			</Button>

			<CartSheet open={open} onOpenChange={setOpen} />
		</>
	);
}

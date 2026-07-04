"use client";

import { Fragment, useState } from "react";

import { ShoppingCart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useCart } from "../../hooks";

import { CartSheet } from "./cart-sheet";

export function CartButton() {
	const { cartItems, isLoading } = useCart();

	const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

	const [open, setOpen] = useState(false);

	const onClick = () => setOpen(true);

	return (
		<Fragment>
			<Button
				size="icon-sm"
				variant="outline"
				className="relative"
				disabled={isLoading}
				onClick={onClick}>
				<ShoppingCart className="size-4" />

				{totalItems > 0 && (
					<Badge
						className={`absolute -right-1 -top-1 flex h-5 min-w-5
						items-center justify-center rounded-full px-1 text-[10px]`}
						variant="default">
						{totalItems.toLocaleString("fa-IR")}
					</Badge>
				)}
			</Button>

			<CartSheet items={cartItems} open={open} onOpenChange={setOpen} />
		</Fragment>
	);
}

"use client";

import { Fragment, useState } from "react";

import { VariantProps } from "class-variance-authority";
import { ShoppingCart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/features/shared/utils";

import { useCart } from "../../hooks";

import { CartSheet } from "./cart-sheet";

interface BaseSwitcherProps {
	className?: string;
	align?: "start" | "center" | "end";
	size?: VariantProps<typeof buttonVariants>["size"];
	variant?: VariantProps<typeof buttonVariants>["variant"];
}

export function CartButton(props: BaseSwitcherProps) {
	const { cartItems, isLoading } = useCart();

	const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

	const [open, setOpen] = useState(false);

	const onClick = () => setOpen(true);

	return (
		<Fragment>
			<Button
				size={props.size ?? "icon-sm"}
				variant={props.variant ?? "outline"}
				className={cn("relative", props.className)}
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

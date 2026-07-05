"use client";

import { CircleDollarSign, Eye, Info, Package } from "lucide-react";

import {
	Badge,
	Button,
	Card,
	CardContent,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	ScrollArea,
	Separator,
} from "@/components/ui";

import { OrderItem } from "../../types";

interface Props {
	orderItem: OrderItem[];
}

export function OrderDetailDialog({ orderItem }: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="sm" variant="outline">
					<Eye className="size-4" />
					جزئیات
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Info className="size-5" />
						جزئیات سفارش
					</DialogTitle>

					<DialogDescription>
						لیست محصولات موجود در این سفارش
					</DialogDescription>
				</DialogHeader>

				<ScrollArea className="max-h-[70vh] pr-1">
					<div className="space-y-4 p-4">
						{orderItem.map((item) => (
							<OrderItemCard key={item.id} item={item} />
						))}
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}

interface OrderItemCardProps {
	item: OrderItem;
}

function OrderItemCard({ item }: OrderItemCardProps) {
	return (
		<Card>
			<CardContent className="space-y-4 p-5">
				<div className="flex items-start justify-between gap-3">
					<div className="space-y-1">
						<div className="flex items-center gap-2">
							<Package className="size-4 text-primary" />

							<h3 className="font-semibold">
								{item.product_title}
							</h3>
						</div>

						<p className="text-sm text-muted-foreground">
							{item.plan.title}
						</p>
					</div>

					<Badge variant="secondary">
						× {item.quantity.toLocaleString("fa-IR")}
					</Badge>
				</div>

				<Separator />

				<div className="grid grid-cols-2 gap-4 text-sm">
					<div className="space-y-1">
						<p className="text-muted-foreground">قیمت هر عدد</p>

						<p className="font-medium">
							{item.price.toLocaleString("fa-IR")} تومان
						</p>
					</div>

					<div className="space-y-1 text-left">
						<p className="text-muted-foreground text-right">
							مبلغ کل
						</p>

						<p className="font-semibold flex items-center justify-end gap-1">
							<CircleDollarSign className="size-4" />
							{(item.price * item.quantity).toLocaleString(
								"fa-IR",
							)}{" "}
							تومان
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

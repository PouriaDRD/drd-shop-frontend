"use client";

import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
	onAction?: () => void;
};

export function CartEmpty({ onAction }: Props) {
	return (
		<Card className="border-dashed">
			<CardContent className="flex flex-col items-center justify-center gap-3 py-10 text-center">
				<div className="flex size-12 items-center justify-center rounded-full bg-muted">
					<ShoppingCart className="size-5 text-muted-foreground" />
				</div>

				<div className="space-y-1">
					<p className="text-sm font-medium">سبد خرید خالی است</p>
					<p className="text-xs text-muted-foreground">
						هنوز هیچ محصولی اضافه نکردی
					</p>
				</div>

				{onAction && (
					<Button size="sm" onClick={onAction}>
						مشاهده محصولات
					</Button>
				)}
			</CardContent>
		</Card>
	);
}

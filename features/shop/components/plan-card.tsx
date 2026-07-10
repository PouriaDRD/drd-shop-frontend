"use client";

import { Calendar, MapPin, Minus, Monitor, Plus, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/features/shared/utils";
import { useUser } from "@/features/user/context";

import { useCartActions } from "../hooks";
import { useCartStore } from "../stores";
import { Plan } from "../types";
import { deviceLabel, getFeature } from "../utils";

type PlanCardProps = {
	plan: Plan;
	productId: string;
	featured?: boolean;
};

export function PlanCard({ plan, featured, productId }: PlanCardProps) {
	const { isAuthenticated } = useUser();
	const {
		addItem,
		isAddingItem,
		decreaseQuantity,
		increaseQuantity,
		isDecreasingQuantity,
		isIncreasingQuantity,
	} = useCartActions();

	const item = useCartStore((state) =>
		state.items.find((i) => i.plan_id === plan.id),
	);

	const traffic = getFeature(plan, "ترافیک");
	const days = getFeature(plan, "روز");
	const location = getFeature(plan, "لوکیشن");

	const features = [
		{
			icon: Zap,
			label: traffic ? `${traffic} گیگابایت ترافیک` : "ترافیک نامحدود",
		},
		{ icon: Calendar, label: days ? `${days} روزه` : "بدون محدودیت زمانی" },
		{ icon: MapPin, label: location ?? "همه سرورها" },
		{ icon: Monitor, label: deviceLabel(plan) },
	];

	const isDisabled =
		isDecreasingQuantity ||
		isIncreasingQuantity ||
		isAddingItem ||
		!isAuthenticated ||
		item?.is_renewal;

	const buttonText = !isAuthenticated
		? "ابتدا وارد شوید"
		: !plan.is_available
			? "ناموجود"
			: "افزودن به سبد خرید";

	const handleAdd = () =>
		addItem({
			plan_title: plan.title,
			plan_id: plan.id,
			product_id: productId,
			quantity: 1,
			unit_price: plan.price,
			total_price: plan.price,
			is_renewal: false,
			service_id: null,
		});

	return (
		<Card
			dir="rtl"
			className={cn(
				"relative flex flex-col shadow-none transition-colors",
				featured && "border-foreground/20",
				!plan.is_available && "opacity-50",
			)}>
			{featured && (
				<Badge className="absolute left-4 top-4" variant="info">
					پیشنهاد ویژه
				</Badge>
			)}

			<CardHeader className="pb-4">
				<CardTitle className="text-sm font-medium">
					{plan.title}
				</CardTitle>

				<div className="pt-2">
					<div className="flex items-baseline gap-1.5">
						<span className="text-2xl font-medium">
							{plan.price.toLocaleString("fa-IR")}
						</span>
						<span className="text-xs text-muted-foreground">
							تومان
						</span>
					</div>

					<p className="mt-1 text-xs text-muted-foreground">
						{days ? `برای ${days} روز` : "اشتراک نامحدود"}
					</p>
				</div>
			</CardHeader>

			<CardContent className="flex-1">
				<ul className="flex flex-col gap-2.5">
					{features.map(({ icon: Icon, label }) => (
						<li key={label} className="flex items-center gap-2.5">
							<Icon
								className="h-4 w-4 shrink-0 text-muted-foreground"
								strokeWidth={1.75}
							/>
							<span className="text-sm text-muted-foreground">
								{label}
							</span>
						</li>
					))}
				</ul>

				{plan.description && (
					<p className="mt-4 text-xs text-muted-foreground">
						{plan.description}
					</p>
				)}
			</CardContent>

			<CardFooter>
				{!item || item.quantity === 0 ? (
					<Button
						className="w-full"
						variant={featured ? "default" : "outline"}
						disabled={!plan.is_available || isDisabled}
						onClick={handleAdd}>
						{buttonText}
					</Button>
				) : (
					<div className="flex w-full items-center justify-between rounded-lg border p-1">
						<Button
							size="icon"
							variant="outline"
							disabled={isDisabled}
							onClick={() => decreaseQuantity(plan.id)}>
							<Minus className="size-4" />
						</Button>

						<div className="min-w-8 text-center text-base font-semibold">
							{item.quantity}
						</div>

						<Button
							size="icon"
							variant="outline"
							disabled={isDisabled}
							onClick={() => increaseQuantity(plan.id)}>
							<Plus className="size-4" />
						</Button>
					</div>
				)}
			</CardFooter>
		</Card>
	);
}

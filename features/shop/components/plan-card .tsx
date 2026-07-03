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

import { useCartStore } from "../stores";
import { Plan } from "../types";
import { deviceLabel, getFeature } from "../utils";

type PlanCardProps = {
	plan: Plan;
	productId: string;
	productSlug: string;
	featured?: boolean;
};

export function PlanCard({
	plan,
	featured,
	productId,
	productSlug,
}: PlanCardProps) {
	const item = useCartStore((state) =>
		state.items.find((i) => i.planId === plan.id),
	);

	const addItem = useCartStore((state) => state.addItem);
	const increaseQuantity = useCartStore((state) => state.increaseQuantity);
	const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

	const traffic = getFeature(plan, "ترافیک");
	const days = getFeature(plan, "روز");
	const location = getFeature(plan, "لوکیشن");
	const devices = deviceLabel(plan);

	const features = [
		{
			icon: Zap,
			label: traffic ? `${traffic} گیگابایت ترافیک` : "ترافیک نامحدود",
		},
		{
			icon: Calendar,
			label: days ? `${days} روز` : "بدون محدودیت زمانی",
		},
		{
			icon: MapPin,
			label: location ?? "همه سرورها",
		},
		{
			icon: Monitor,
			label: devices,
		},
	];

	const handleSelect = () => {
		addItem({
			planId: plan.id,
			productId,
			productSlug,
			title: plan.title,
			description: plan.description,
			price: plan.price,
			features: plan.features,
			quantity: 1,
		});
	};

	return (
		<Card
			className={cn(
				"relative flex flex-col shadow-none transition-colors",
				!plan.is_available && "opacity-50",
			)}>
			{featured && (
				<Badge className="absolute left-4 top-4">پیشنهاد ویژه</Badge>
			)}

			<CardHeader className="pb-4">
				<div className="flex items-start justify-between gap-2">
					<CardTitle className="text-sm font-medium">
						{plan.title}
					</CardTitle>
				</div>

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
							<span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted">
								<Icon className="h-3 w-3" />
							</span>

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
				{!item || (item && item.quantity === 0) ? (
					<Button
						className="w-full"
						variant={featured ? "default" : "outline"}
						disabled={!plan.is_available}
						onClick={handleSelect}>
						{plan.is_available ? "افزودن به سبد خرید" : "ناموجود"}
					</Button>
				) : (
					<div className="flex w-full items-center justify-between rounded-lg border p-1">
						<Button
							size="icon"
							variant="outline"
							onClick={() => decreaseQuantity(plan.id)}>
							<Minus className="size-4" />
						</Button>

						<div className="min-w-8 text-center text-base font-semibold">
							{item.quantity}
						</div>

						<Button
							size="icon"
							variant="outline"
							onClick={() => increaseQuantity(plan.id)}>
							<Plus className="size-4" />
						</Button>
					</div>
				)}
			</CardFooter>
		</Card>
	);
}

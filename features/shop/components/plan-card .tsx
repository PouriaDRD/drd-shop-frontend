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
	const devices = deviceLabel(plan);

	const features = [
		{
			icon: Zap,
			label: traffic ? `${traffic} گیگابایت ترافیک` : "ترافیک نامحدود",
		},
		{
			icon: Calendar,
			label: days ? `${days} روزه` : "بدون محدودیت زمانی",
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

	const handleOnAddItem = () => {
		addItem({
			plan_title: plan.title,
			plan_id: plan.id,
			product_id: productId,
			quantity: 1,
			unit_price: plan.price,
			total_price: plan.price * 1,
		});
	};

	const handleIncreaseQuantity = () => {
		increaseQuantity(plan.id);
	};

	const handleDecreaseQuantity = () => {
		decreaseQuantity(plan.id);
	};

	const isDisable =
		isDecreasingQuantity ||
		isIncreasingQuantity ||
		isAddingItem ||
		!isAuthenticated;

	const buttonText = !isAuthenticated
		? "ابتدا وارد شوید"
		: !plan.is_available
			? "ناموجود"
			: "افزودن به سبد خرید";

	return (
		<Card
			className={cn(
				"relative flex flex-col shadow-none transition-colors",
				!plan.is_available && "opacity-50",
			)}>
			{featured && (
				<Badge className="absolute left-4 top-4" variant={"info"}>
					پیشنهاد ویژه
				</Badge>
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
						disabled={!plan.is_available || isDisable}
						onClick={handleOnAddItem}>
						{buttonText}
					</Button>
				) : (
					<div className="flex w-full items-center justify-between rounded-lg border p-1">
						<Button
							size="icon"
							variant="outline"
							disabled={isDisable}
							onClick={handleDecreaseQuantity}>
							<Minus className="size-4" />
						</Button>

						<div className="min-w-8 text-center text-base font-semibold">
							{item.quantity}
						</div>

						<Button
							size="icon"
							variant="outline"
							disabled={isDisable}
							onClick={handleIncreaseQuantity}>
							<Plus className="size-4" />
						</Button>
					</div>
				)}
			</CardFooter>
		</Card>
	);
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ShoppingCart } from "lucide-react";

import { PageHeader, PageLayout } from "@/components/pages";
import { BalanceCard } from "@/components/pages/finance/balance-card";
import { StatBaseCard } from "@/components/pages/finance/stat-base-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartEmpty, CartItem } from "@/features/shop/components/cart";
import { useCartStore } from "@/features/shop/stores";
import { useUser } from "@/features/user/context";

export default function CheckoutPage() {
	const router = useRouter();

	const { user, isAuthenticated, isLoading } = useUser();

	const items = useCartStore((s) => s.items);
	const clear = useCartStore((s) => s.clear);

	const totalPrice = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	if (!items.length || !user || !isAuthenticated || isLoading) {
		return (
			<PageLayout className="flex flex-col gap-8">
				<CartEmpty />
			</PageLayout>
		);
	}

	const lowBalance = user.wallet.balance < totalPrice;

	const handleOnSuccess = () => {
		router.replace("/panel/finance");
	};

	return (
		<PageLayout className="flex flex-col gap-8">
			<PageHeader
				title="تسویه سفارش"
				description="تسویه سفارش با مالیات و پلن‌ها"
			/>
			<div className="grid grid-cols-1 d:grid-cols-2 md:grid-cols-3 gap-4">
				<BalanceCard onSuccess={handleOnSuccess} />
				<StatBaseCard
					label="دسترسی سریع"
					value={"بازگشت به داشبورد"}
					small>
					<Link href="/panel/dashboard">
						<Button variant="ghost" size={"sm"}>
							برو به داشبورد
						</Button>
					</Link>
				</StatBaseCard>

				<StatBaseCard
					label="دسترسی سریع"
					value={"بازگشت به بازارچه"}
					small>
					<Link href="/panel/bazaar">
						<Button variant="ghost" size={"sm"}>
							برو به بازارچه
						</Button>
					</Link>
				</StatBaseCard>
			</div>

			<Separator />

			<div className="mx-auto flex w-full max-w-xl flex-col gap-4">
				{/* HEADER */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<ShoppingCart className="size-5" />
						<p className="text-sm font-medium">سبد خرید</p>
					</div>

					<Button
						variant="ghost"
						size="sm"
						onClick={() => clear()}
						className="text-red-500 hover:text-red-600">
						پاک کردن
					</Button>
				</div>

				{/* ITEMS */}
				<div className="flex flex-col gap-3">
					{items.map((item) => (
						<CartItem key={item.planId} item={item} />
					))}
				</div>

				<Separator />

				{/* SUMMARY */}
				<div className="flex items-center justify-between">
					<p className="text-sm text-muted-foreground">جمع کل</p>
					<p className="text-lg font-semibold">
						{totalPrice.toLocaleString("fa-IR")} تومان
					</p>
				</div>

				{/* CHECKOUT */}
				<Button className="w-full" disabled={lowBalance}>
					{lowBalance ? "موجودی کافی نیست" : `پرداخت`}
				</Button>
			</div>
		</PageLayout>
	);
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ShoppingCart } from "lucide-react";

import { PageHeader, PageLayout } from "@/components/pages";
import { BalanceCard } from "@/components/pages/finance/balance-card";
import { StatBaseCard } from "@/components/pages/finance/stat-base-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartEmpty, CartItemCard } from "@/features/shop/components/cart";
import { useCart } from "@/features/shop/hooks";
import { useUser } from "@/features/user/context";

export default function CheckoutPage() {
	const router = useRouter();
	const { user } = useUser();
	const { cart, cartItems, isLoading } = useCart();

	const cartSuccess = cart && cartItems.length > 0;

	const handleOnRequestDepositSuccess = () => {
		router.replace("/panel/finance");
	};

	if (!user || !cartSuccess) {
		return (
			<PageLayout className="flex flex-col gap-8">
				<PageNav onSuccess={handleOnRequestDepositSuccess} />
				<CartEmpty />
			</PageLayout>
		);
	}

	const totalCartPrice = cart.total_price;
	const lowBalance = user.wallet.balance < totalCartPrice;

	return (
		<PageLayout className="flex flex-col gap-8">
			<PageHeader
				title="تسویه سفارش"
				description="تسویه سفارش با مالیات و پلن‌ها"
			/>

			<PageNav onSuccess={handleOnRequestDepositSuccess} />

			<Separator />

			<div className="bg-card rounded-xl p-6 shadow flex flex-col gap-4">
				{/* HEADER */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<ShoppingCart className="size-5" />
						<p className="text-sm font-medium">سبد خرید</p>
					</div>
				</div>

				{/* ITEMS */}
				<div className="flex flex-col gap-3">
					{cartItems.map((item) => (
						<CartItemCard key={item.plan_id} item={item} />
					))}
				</div>

				<Separator />

				{/* SUMMARY */}
				<div className="flex items-start justify-between">
					<p className="text-sm text-muted-foreground">جمع کل</p>

					<div className="flex flex-col items-center justify-center gap-4">
						<p className="text-lg font-semibold">
							{totalCartPrice.toLocaleString("fa-IR")} تومان
						</p>
						{/* CHECKOUT */}
						<Button
							className="w-full"
							disabled={
								lowBalance || isLoading || totalCartPrice <= 0
							}>
							{lowBalance ? "موجودی کافی نیست" : `پرداخت`}
						</Button>
					</div>
				</div>
			</div>
		</PageLayout>
	);
}

interface PageNavProps {
	onSuccess?: () => void;
}

function PageNav({ onSuccess }: PageNavProps) {
	return (
		<div className="grid grid-cols-1 d:grid-cols-2 md:grid-cols-3 gap-4">
			<BalanceCard onSuccess={onSuccess} />
			<StatBaseCard label="دسترسی سریع" value={"داشبورد"} small>
				<Link href="/panel/dashboard">
					<Button variant="ghost" size={"sm"}>
						برو به داشبورد
					</Button>
				</Link>
			</StatBaseCard>

			<StatBaseCard label="دسترسی سریع" value={"بازارچه"} small>
				<Link href="/panel/bazaar">
					<Button variant="ghost" size={"sm"}>
						برو به بازارچه
					</Button>
				</Link>
			</StatBaseCard>
		</div>
	);
}

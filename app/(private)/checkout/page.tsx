"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ShoppingCart } from "lucide-react";

import { PageHeader, PageLayout } from "@/components/pages";
import { BalanceCard } from "@/components/pages/finance/balance-card";
import { StatBaseCard } from "@/components/pages/stat-base-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartEmpty, CartItemCard } from "@/features/shop/components/cart";
import { CouponForm } from "@/features/shop/components/forms";
import { useCart, useHandleCheckout } from "@/features/shop/hooks";
import { useUser } from "@/features/user/context";

export default function CheckoutPage() {
	const router = useRouter();
	const { user } = useUser();
	const { cart, cartItems, isLoading } = useCart();
	const { handleOnCheckout, isPending: isCheckoutPending } =
		useHandleCheckout({});

	const cartSuccess = cart && cartItems.length > 0;

	const handleOnRequestDepositSuccess = () => {
		router.replace("/panel/finance");
	};

	if (!user || !cartSuccess) {
		return (
			<PageLayout className="flex flex-col gap-4">
				<PageHeader
					title="تسویه سفارش"
					description="تسویه سفارش با مالیات و پلن‌ها"
				/>

				<PageNav onSuccess={handleOnRequestDepositSuccess} />

				<CartEmpty />
			</PageLayout>
		);
	}

	const totalCartPrice = cart.total_price;
	const lowBalance = user.wallet.balance < totalCartPrice;

	return (
		<PageLayout className="flex flex-col gap-4">
			<PageHeader
				title="تسویه سفارش"
				description="تسویه سفارش با مالیات و پلن‌ها"
			/>

			<PageNav onSuccess={handleOnRequestDepositSuccess} />

			<div className="bg-card rounded-xl p-6 shadow flex flex-col gap-4">
				{/* HEADER */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<ShoppingCart className="size-5" />
						<p className="text-sm font-medium">سبد خرید</p>
					</div>
				</div>

				{/* ITEMS */}
				<div className="overflow-auto max-h-96">
					<div className="flex flex-col gap-4 p-4">
						{cartItems.map((item) => (
							<CartItemCard key={item.plan_id} item={item} />
						))}
					</div>
				</div>

				<Separator />

				<CouponForm canSubmit={cart.discount > 0} />

				<Separator />

				{/* SUMMARY */}
				<div className="flex items-start justify-between">
					<p
						suppressHydrationWarning
						className="text-sm text-muted-foreground">
						جمع کل
					</p>

					<div className="flex flex-col items-center justify-center gap-4">
						<p className="text-lg font-semibold">
							{cart.subtotal.toLocaleString("fa-IR")} تومان
						</p>
					</div>
				</div>
				<div className="flex items-start justify-between">
					<p
						suppressHydrationWarning
						className="text-sm text-muted-foreground">
						مقدار تخفیف
					</p>

					<div className="flex flex-col items-center justify-center gap-4">
						<p className="text-lg font-semibold">
							{cart.discount.toLocaleString("fa-IR")} تومان
						</p>
					</div>
				</div>
				<div className="flex items-start justify-between">
					<p
						suppressHydrationWarning
						className="text-sm text-muted-foreground">
						مقدار قابل پرداخت
					</p>

					<div className="flex flex-col items-center justify-center gap-4">
						<p className="text-lg font-semibold text-left w-full">
							{totalCartPrice.toLocaleString("fa-IR")} تومان
						</p>
						{/* CHECKOUT */}
						<Button
							className="w-full"
							onClick={handleOnCheckout}
							disabled={
								lowBalance ||
								isLoading ||
								totalCartPrice <= 0 ||
								isCheckoutPending
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
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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

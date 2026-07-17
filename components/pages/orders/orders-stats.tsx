"use client";

import { Last30PurchasesCard, TotalPurchasesCard } from "../finance";

import { AllOrdersCountCard } from "./all-orders-count-card";

export function OrdersStats({ totalCount }: { totalCount: number }) {
	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
			<AllOrdersCountCard totalCount={totalCount} />

			<Last30PurchasesCard />

			<TotalPurchasesCard />
		</div>
	);
}

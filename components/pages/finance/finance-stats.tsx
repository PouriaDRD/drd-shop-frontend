"use client";

import { BalanceCard } from "./balance-card";
import { Last30PurchasesCard } from "./last-30-purchases";
import { TotalPurchasesCard } from "./total-purchases";

export function FinanceStats() {
	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
			<BalanceCard />

			<Last30PurchasesCard />

			<TotalPurchasesCard />
		</div>
	);
}

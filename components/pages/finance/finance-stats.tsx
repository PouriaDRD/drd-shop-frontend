"use client";

import { BalanceCard } from "./balance-card";

export function FinanceStats() {
	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
			<BalanceCard />
		</div>
	);
}

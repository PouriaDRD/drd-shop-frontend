"use client";

import { BalanceCard } from "./balance-card";

// const stats = [
// 	{
// 		label: "موجودی کیف پول",
// 		value: walletSummary.balance.toLocaleString("fa-IR"),
// 		unit: "تومان",
// 	},
// 	{
// 		label: "در انتظار بررسی",
// 		value: walletSummary.pending_count.toLocaleString("fa-IR"),
// 		unit: "تراکنش",
// 	},
// 	{
// 		label: "روزهای باقی‌مانده",
// 		value: walletSummary.days_remaining.toLocaleString("fa-IR"),
// 		unit: "تا انقضای پلن",
// 	},
// ];

export function FinanceStats() {
	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
			<BalanceCard />
		</div>
	);
}

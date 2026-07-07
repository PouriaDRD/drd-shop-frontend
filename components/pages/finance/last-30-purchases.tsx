"use client";

import { usePurchaseStatistics } from "@/features/finance/mutations";

import { StatBaseCard } from "./stat-base-card";

export function Last30PurchasesCard() {
	const { data, isLoading } = usePurchaseStatistics();

	if (isLoading) {
		return (
			<StatBaseCard
				label="هزینه 30 روز گذشته"
				value="در حال بارگذاری..."
				small
			/>
		);
	}

	if (!data?.success || !data.data) {
		return (
			<StatBaseCard
				label="هزینه 30 روز گذشته"
				value="خطا در دریافت موجودی"
				small
			/>
		);
	}

	const wallet = data.data;

	return (
		<StatBaseCard
			label="هزینه 30 روز گذشته"
			value={wallet.last_30_days_purchase_amount.toLocaleString("fa-IR")}
			small>
			تومان
		</StatBaseCard>
	);
}

"use client";

import { usePurchaseStatistics } from "@/features/finance/mutations";

import { StatBaseCard } from "./stat-base-card";

export function TotalPurchasesCard() {
	const { data, isLoading } = usePurchaseStatistics();

	if (isLoading) {
		return (
			<StatBaseCard label="هزینه کل" value="در حال بارگذاری..." small />
		);
	}

	if (!data?.success || !data.data) {
		return (
			<StatBaseCard label="هزینه کل" value="خطا در دریافت موجودی" small />
		);
	}

	const wallet = data.data;

	return (
		<StatBaseCard
			label="هزینه کل"
			value={wallet.total_purchase_amount.toLocaleString("fa-IR")}
			small>
			تومان
		</StatBaseCard>
	);
}

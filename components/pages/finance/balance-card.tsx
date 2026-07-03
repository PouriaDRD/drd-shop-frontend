"use client";

import { RequestDepositDialog } from "@/features/finance/components/dialogs";
import { useMyWallet } from "@/features/finance/mutations";

import { StatBaseCard } from "./stat-base-card";

interface Props {
	onSuccess?: () => void;
}

export function BalanceCard({ onSuccess }: Props) {
	const { data, isLoading } = useMyWallet();

	if (isLoading) {
		return (
			<StatBaseCard
				label="موجودی کیف پول"
				value="در حال بارگذاری..."
				small
			/>
		);
	}

	if (!data?.success || !data.data) {
		return (
			<StatBaseCard
				label="موجودی کیف پول"
				value="خطا در دریافت موجودی"
				small
			/>
		);
	}

	const wallet = data.data;

	return (
		<StatBaseCard
			label="موجودی کیف پول"
			value={wallet.balance.toLocaleString("fa-IR") + " تومان"}
			small>
			<RequestDepositDialog onSuccess={onSuccess} />
		</StatBaseCard>
	);
}

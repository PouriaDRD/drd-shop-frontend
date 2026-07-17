"use client";

import { StatBaseCard } from "../stat-base-card";

export function AllOrdersCountCard({ totalCount }: { totalCount: number }) {
	return (
		<StatBaseCard label="کل سفارشات" value={totalCount.toString()} small>
			سفارش
		</StatBaseCard>
	);
}

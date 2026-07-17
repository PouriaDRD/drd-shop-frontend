"use client";

import { StatBaseCard } from "../stat-base-card";

interface Stats {
	total: number;
	active: number;
	expired: number;
}

export function ServicersStats({ stats }: { stats?: Stats }) {
	const total = stats?.total ?? 0;
	const active = stats?.active ?? 0;
	const expired = stats?.expired ?? 0;

	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
			<StatBaseCard value={total.toString()} label="کل سرویس‌ها" />

			<StatBaseCard value={active.toString()} label="سرویس‌های فعال" />

			<StatBaseCard
				value={expired.toString()}
				label="سرویس‌های منقضی شده"
			/>
		</div>
	);
}

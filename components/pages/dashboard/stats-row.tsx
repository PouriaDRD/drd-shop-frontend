import { toIranDateTime } from "@/features/shared/utils";
import { User } from "@/features/user/types";

import { BalanceCard } from "../finance/balance-card";

import { StatCard } from "./stat-card";

interface Props {
	user: User;
}

export function StatsRow({ user }: Props) {
	const lastLogin = toIranDateTime(user.last_login);
	const createdAt = toIranDateTime(user.created_at);

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
			<BalanceCard />

			<StatCard
				label="آخرین ورود"
				value={lastLogin.dateWithMonthName}
				value2={lastLogin.time}
				small
			/>
			<StatCard
				label="تاریخ عضویت"
				value={createdAt.dateWithMonthName}
				value2={createdAt.time}
				small
			/>
		</div>
	);
}

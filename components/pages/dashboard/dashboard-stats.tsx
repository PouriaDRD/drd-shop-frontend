import { toIranDateTime } from "@/features/shared/utils";
import { User } from "@/features/user/types";

import { BalanceCard } from "../finance/balance-card";
import { StatBaseCard } from "../stat-base-card";

interface Props {
	user: User;
}

export function DashboardStats({ user }: Props) {
	const lastLogin = toIranDateTime(user.last_login);
	const createdAt = toIranDateTime(user.created_at);

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
			<BalanceCard />

			<StatBaseCard
				label="آخرین ورود"
				value={lastLogin.dateWithMonthName}
				small>
				{lastLogin.time}
			</StatBaseCard>
			<StatBaseCard
				label="تاریخ عضویت"
				value={createdAt.dateWithMonthName}
				small>
				{createdAt.time}
			</StatBaseCard>
		</div>
	);
}

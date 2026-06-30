"use client";

import { ErrorState, PageHeader, PageLayout } from "@/components/pages";
import {
	DashLoading,
	DetailsCard,
	StatsRow,
} from "@/components/pages/dashboard";
import { useUser } from "@/features/user/context";

export default function PanelDashboardPage() {
	const { user, isAuthenticated, isLoading } = useUser();

	if (isLoading) {
		return (
			<PageLayout className="flex flex-col gap-4">
				<DashLoading />
				<DashLoading />
			</PageLayout>
		);
	}
	if (!isAuthenticated || !user) {
		return (
			<PageLayout className="flex flex-col gap-4">
				<ErrorState />
			</PageLayout>
		);
	}
	return (
		<PageLayout className="flex flex-col gap-4">
			<PageHeader
				title="داشبورد"
				description="خلاصه اطلاعات و وضعیت حساب شما"
			/>
			<StatsRow user={user} />
			<div className="grid grid-cols-1 gap-4">
				<DetailsCard user={user} />
			</div>
		</PageLayout>
	);
}

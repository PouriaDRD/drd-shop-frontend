"use client";

import { ErrorState, PageHeader, PageLayout } from "@/components/pages";
import {
	DashboardStats,
	DashLoading,
	DetailsCard,
} from "@/components/pages/dashboard";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginHistoryTable } from "@/features/auth/components/tables";
import { AnnouncementsAlert } from "@/features/notifications/components/alerts";
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

			<AnnouncementsAlert />

			<DashboardStats user={user} />

			<div className="grid grid-cols-1 gap-4">
				<DetailsCard user={user} />
			</div>

			<Card className="overflow-hidden">
				<CardHeader className="space-y-4 border-b">
					<CardTitle className="text-base">تاریخچه ورود</CardTitle>
				</CardHeader>
				<LoginHistoryTable />
			</Card>
		</PageLayout>
	);
}

"use client";

import { RefreshCw, TriangleAlert } from "lucide-react";

import { PageLayout } from "@/components/layouts";
import {
	DashboardHeader,
	DetailsCard,
	StatsRow,
} from "@/components/pages/dashboard";
import { Button, Card, CardContent } from "@/components/ui";
import { useUser } from "@/features/user/context";

function PanelDashboardPage() {
	const { user, isAuthenticated, isLoading } = useUser();

	if (isLoading) {
		return (
			<PageLayout className="flex flex-col gap-4">
				<LoadingState />
			</PageLayout>
		);
	}
	if (!isAuthenticated || !user) {
		return (
			<PageLayout className="flex items-center justify-center">
				<ErrorState />
			</PageLayout>
		);
	}
	return (
		<PageLayout className="flex flex-col gap-4">
			<DashboardHeader />
			<StatsRow user={user} />
			<div className="grid grid-cols-1 gap-4">
				<DetailsCard user={user} />
			</div>
		</PageLayout>
	);
}

export default PanelDashboardPage;

function LoadingState() {
	return (
		<div className="flex flex-col gap-4 mx-auto animate-pulse w-full">
			<div className="h-10 bg-muted rounded-lg w-48" />
			<div className="grid grid-cols-3 gap-3">
				{[...Array(3)].map((_, i) => (
					<div key={i} className="h-16 bg-muted rounded-lg" />
				))}
			</div>
			<div className="grid grid-cols-[1fr_1.6fr] gap-4">
				<div className="h-64 bg-muted rounded-xl" />
				<div className="h-64 bg-muted rounded-xl" />
			</div>
		</div>
	);
}

function ErrorState() {
	return (
		<Card className="mx-auto w-full max-w-md border-dashed">
			<CardContent className="flex min-h-80 flex-col items-center justify-center px-6 py-10 text-center">
				<div className="mb-6 flex size-16 items-center justify-center rounded-full bg-destructive/10">
					<TriangleAlert className="size-8 text-destructive" />
				</div>

				<h3 className="text-lg font-semibold">خطا در دریافت اطلاعات</h3>

				<p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
					متأسفانه اطلاعات حساب کاربری قابل دریافت نیست. لطفاً چند
					لحظه دیگر دوباره تلاش کنید.
				</p>

				<Button
					variant="outline"
					className="mt-6 gap-2"
					onClick={() => window.location.reload()}>
					<RefreshCw className="size-4" />
					تلاش مجدد
				</Button>
			</CardContent>
		</Card>
	);
}

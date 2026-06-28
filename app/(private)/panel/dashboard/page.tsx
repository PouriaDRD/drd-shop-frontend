"use client";

import { RefreshCw, TriangleAlert } from "lucide-react";

import { PageLayout } from "@/components/layouts";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Card,
	CardContent,
	CardHeader,
} from "@/components/ui";
import { toIranDateTime } from "@/features/shared/utils";
import { useUser } from "@/features/user/context";
import { User } from "@/features/user/types";

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

// ─── Sub-components ────────────────────────────────────────────────────────────

type Props = { user: User };

function DashboardHeader() {
	return (
		<div className="flex items-center justify-between">
			<div>
				<h2 className="text-xl font-medium text-foreground">
					داشبورد کاربری
				</h2>
				<p className="text-sm text-muted-foreground mt-0.5">
					خلاصه اطلاعات و وضعیت حساب شما
				</p>
			</div>
		</div>
	);
}

function StatsRow({ user }: Props) {
	const lastLogin = toIranDateTime(user.last_login);
	const createdAt = toIranDateTime(user.created_at);

	return (
		<div className="grid grid-cols-2 gap-4">
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

interface StatCardProps {
	label: string;
	value: string;
	value2?: string;
	accent?: boolean;
	small?: boolean;
}

function StatCard(props: StatCardProps) {
	const { label, value, value2, accent, small } = props;

	return (
		<Card className="px-2 py-4">
			<CardHeader>
				<p className="text-xs text-muted-foreground mb-1.5">{label}</p>
				<p
					className={[
						"font-medium",
						accent ? "text-primary text-2xl" : "text-foreground",
						small ? "text-sm" : "text-2xl",
					].join(" ")}>
					{value}
				</p>
				{value2 && (
					<span className="text-muted-foreground text-sm">
						{value2}
					</span>
				)}
			</CardHeader>
		</Card>
	);
}

function DetailsCard({ user }: Props) {
	const lastLogin = toIranDateTime(user.last_login);
	const createdAt = toIranDateTime(user.created_at);

	const rows: Array<{ label: string; value: React.ReactNode }> = [
		{
			label: "وضعیت ایمیل",
			value: (
				<span
					className={
						user.email_verified
							? "text-primary text-sm"
							: "text-destructive text-sm"
					}>
					{user.email_verified ? "تأیید شده" : "تأیید نشده"}
				</span>
			),
		},
		{ label: "آخرین ورود", value: lastLogin.dateWithMonthName },
		{ label: "تاریخ عضویت", value: createdAt.dateWithMonthName },
	];
	const initials = user.email.slice(0, 2).toUpperCase();

	return (
		<Card>
			<CardHeader>
				{/* Avatar */}
				<Avatar size="lg">
					<AvatarImage
						src="/images/avatar-fallback.png"
						className="p-2 bg-muted"
					/>
					<AvatarFallback>{initials}</AvatarFallback>
				</Avatar>

				<div className="text-start">
					<p className="font-medium text-sm text-foreground">
						{user.email}
					</p>
				</div>
			</CardHeader>
			<CardContent>
				<div className="divide-y divide-border">
					{rows.map(({ label, value }) => (
						<div
							key={label}
							className="flex justify-between items-center py-2.5">
							<span className="text-sm text-muted-foreground">
								{label}
							</span>
							<span className="text-sm font-medium text-foreground">
								{value}
							</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

// ─── Fallback states ────────────────────────────────────────────────────────────

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

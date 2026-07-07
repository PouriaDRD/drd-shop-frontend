"use client";

import { Bell, CheckCheck } from "lucide-react";
import { toast } from "sonner";

import { PageHeader, PageLayout } from "@/components/pages";
// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useMarkAllNotificationsAsReadMutation } from "@/features/notifications/hooks";
import { useMyNotificationsQuery } from "@/features/notifications/mutations";
import {
	Notification,
	// NotificationType
} from "@/features/notifications/types";
import { toIranDateTime } from "@/features/shared/utils";

export default function NotificationsPage() {
	const { data, isLoading, isError } = useMyNotificationsQuery();

	const notifications = data?.success ? data.data.notifications : [];
	const unreadCount = data?.success ? data.data.unread_count : 0;

	return (
		<PageLayout className="space-y-6">
			<NotificationHeader
				unreadCount={unreadCount}
				isLoading={isLoading}
				isError={isError}
			/>

			<Card className="overflow-hidden">
				<ScrollArea className="h-162.5" dir="rtl">
					<NotificationList
						notifications={notifications}
						isLoading={isLoading}
						isError={isError}
					/>
				</ScrollArea>
			</Card>
		</PageLayout>
	);
}

/* ---------------- HEADER ---------------- */

type NotificationHeaderProps = {
	unreadCount: number;
	isLoading: boolean;
	isError: boolean;
};

function NotificationHeader(props: NotificationHeaderProps) {
	const { unreadCount, isLoading, isError } = props;
	const isDisabled = isLoading || isError || unreadCount === 0;

	const markAllAsRead = useMarkAllNotificationsAsReadMutation();

	const handleAllRead = () => {
		markAllAsRead.mutate(undefined, {
			onSuccess: async (data) => {
				if (data.success) {
					toast.success("همه اعلان‌ها خوانده شده‌اند");
				}
			},
		});
	};

	return (
		<>
			<PageHeader
				title="اعلانات"
				description="آخرین اعلان‌های حساب کاربری شما"
			/>

			<div className="flex items-center justify-between">
				<p
					suppressHydrationWarning
					className="text-sm text-muted-foreground">
					{unreadCount > 0
						? `${unreadCount} اعلان خوانده نشده`
						: "همه اعلان‌ها خوانده شده‌اند"}
				</p>

				<Button
					size="sm"
					variant="outline"
					disabled={isDisabled}
					onClick={handleAllRead}>
					<CheckCheck className="size-4" />
					همه را خواندم
				</Button>
			</div>
		</>
	);
}

/* ---------------- LIST ---------------- */

type NotificationListProps = {
	notifications: Notification[];
	isLoading: boolean;
	isError: boolean;
};

function NotificationList({
	notifications,
	isLoading,
	isError,
}: NotificationListProps) {
	if (isLoading) return <NotificationLoading />;
	if (isError) return <NotificationError />;
	if (notifications.length === 0) return <NotificationEmpty />;

	return (
		<div className="divide-y space-y-4">
			{notifications.map((notification) => (
				<NotificationItem
					key={notification.id}
					notification={notification}
				/>
			))}
		</div>
	);
}

/* ---------------- ITEM ---------------- */

type NotificationItemProps = {
	notification: Notification;
};

function NotificationItem({ notification }: NotificationItemProps) {
	const dateTime = toIranDateTime(notification.created_at);

	return (
		<div
			className={`
				group relative flex gap-4 px-5 py-4
				transition-colors
				hover:bg-muted/40
				${!notification.is_read ? "bg-muted/20" : ""}
			`}>
			{/* Left accent bar */}
			{/* <div
				className={`
					absolute left-0 top-0 h-full w-0.75
					rounded-r-full
					transition-colors
					${notification.is_read ? "bg-transparent" : "bg-primary"}
				`}
			/> */}

			{/* Status dot */}
			<div className="mt-1 flex flex-col items-center">
				<div
					className={`
						size-2 rounded-full transition-colors
						${notification.is_read ? "bg-muted" : "bg-primary"}
					`}
				/>
			</div>

			{/* Content */}
			<div className="min-w-0 flex-1 space-y-1">
				<div className="flex items-start justify-between gap-3">
					<h3 className="truncate text-sm font-semibold text-foreground">
						{notification.title}
					</h3>

					<div className="flex items-center gap-2">
						{/* <NotificationTypeBadge type={notification.type} /> */}
						<span className="shrink-0 text-xs text-muted-foreground">
							{dateTime.datetimeWithMonthName}
						</span>
					</div>
				</div>

				<p className="text-sm leading-relaxed text-muted-foreground">
					{notification.message}
				</p>
			</div>
		</div>
	);
}

/* ---------------- BADGE ---------------- */

// type NotificationTypeBadgeProps = {
// 	type: NotificationType;
// };

// function NotificationTypeBadge({ type }: NotificationTypeBadgeProps) {
// 	switch (type) {
// 		case "success":
// 			return (
// 				<Badge className="border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10">
// 					موفق
// 				</Badge>
// 			);

// 		case "warning":
// 			return (
// 				<Badge className="border border-yellow-500/20 bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/10">
// 					هشدار
// 				</Badge>
// 			);

// 		case "error":
// 			return (
// 				<Badge className="border border-red-500/20 bg-red-500/10 text-red-600 hover:bg-red-500/10">
// 					خطا
// 				</Badge>
// 			);

// 		default:
// 			return <Badge variant="secondary">اطلاع رسانی</Badge>;
// 	}
// }

/* ---------------- EMPTY ---------------- */

function NotificationEmpty() {
	return (
		<div className="flex flex-col items-center justify-center py-20 text-center">
			<div className="mb-4 rounded-full bg-muted p-4">
				<Bell className="size-6 text-muted-foreground" />
			</div>

			<p className="text-sm font-medium">اعلانی وجود ندارد</p>
			<p className="text-sm text-muted-foreground">
				هنوز چیزی برای نمایش نیست
			</p>
		</div>
	);
}

/* ---------------- ERROR ---------------- */

function NotificationError() {
	return (
		<div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
			<Bell className="size-10 text-destructive" />

			<div>
				<p className="font-medium">خطا در دریافت اعلان‌ها</p>
				<p className="text-sm text-muted-foreground">
					دوباره تلاش کنید.
				</p>
			</div>
		</div>
	);
}

/* ---------------- LOADING ---------------- */

function NotificationLoading() {
	return (
		<div className="divide-y">
			{Array.from({ length: 4 }).map((_, i) => (
				<div key={i} className="flex gap-4 px-5 py-4">
					<Skeleton className="mt-1 size-2 rounded-full" />

					<div className="flex-1 space-y-3">
						<div className="flex items-center justify-between">
							<Skeleton className="h-4 w-48" />
							<Skeleton className="h-6 w-20 rounded-full" />
						</div>

						<Skeleton className="h-3 w-full" />
						<Skeleton className="h-3 w-2/3" />
					</div>
				</div>
			))}
		</div>
	);
}

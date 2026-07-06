"use client";

import {
	Badge,
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui";
import { toIranDateTime } from "@/features/shared/utils";

import { useMyVpnServices } from "../../mutations";
import { VpnService } from "../../types";
import { V2rayVPNDialog } from "../dialogs";

/* -----------------------------
   MAIN TABLE
----------------------------- */

export function MyVPNServicesTable() {
	const { data, isLoading, isError } = useMyVpnServices();

	if (isLoading) return <TableState type="loading" />;
	if (isError || !data?.success) return <TableState type="error" />;

	const services = data.data ?? [];

	if (services.length === 0) return <TableState type="empty" />;

	return (
		<div className="flex max-h-96 overflow-auto">
			<Table>
				<TableHeader className="sticky top-0 bg-card/85 backdrop-blur-2xl">
					<TableRow>
						<TableHead className="text-center">#</TableHead>
						<TableHead className="text-center">محصول</TableHead>
						<TableHead className="text-center">پلن</TableHead>
						<TableHead className="text-center">ایجاد</TableHead>
						<TableHead className="text-center">انقضا</TableHead>
						<TableHead className="text-center">
							باقی‌مانده
						</TableHead>
						<TableHead className="text-center">وضعیت</TableHead>
						<TableHead className="text-center">عملیات</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{services.map((item, index) => (
						<ServiceRow key={item.id} item={item} index={index} />
					))}
				</TableBody>
			</Table>
		</div>
	);
}

/* -----------------------------
   ROW
----------------------------- */

function ServiceRow({ item, index }: { item: VpnService; index: number }) {
	const expiresAt = toIranDateTime(item.expires_at);
	const created = toIranDateTime(item.created_at);

	const remaining = item.stats?.remaining_volume;

	const statusMap: Record<string, string> = {
		active: "فعال",
		expired: "منقضی شده",
		unknown: "نامشخص",
	};

	return (
		<TableRow className="text-muted-foreground">
			<TableCell className="text-center">{index + 1}</TableCell>

			<TableCell className="text-center">{item.product_title}</TableCell>

			<TableCell className="text-center">{item.plan_title}</TableCell>

			<TableCell className="text-center">
				<div>{created.dateWithMonthName}</div>
				<div className="text-xs">{created.time}</div>
			</TableCell>

			<TableCell className="text-center">
				<div>{expiresAt.dateWithMonthName}</div>
				<div className="text-xs">{expiresAt.time}</div>
			</TableCell>

			{/* REMAINING VOLUME */}
			<TableCell className="text-center">
				{remaining ? (
					<Badge variant="outline">
						{remaining.value} {remaining.unit}
					</Badge>
				) : (
					<Badge variant="outline">نامشخص</Badge>
				)}
			</TableCell>

			{/* STATUS (ONLY FROM API) */}
			<TableCell className="text-center">
				<Badge
					variant={
						item.stats?.status === "expired"
							? "destructive"
							: "success"
					}>
					{statusMap[item.stats?.status ?? "unknown"]}
				</Badge>
			</TableCell>

			<TableCell className="text-center">
				<V2rayVPNDialog service={item} />
			</TableCell>
		</TableRow>
	);
}

/* -----------------------------
   STATE
----------------------------- */

function TableState({ type }: { type: "loading" | "error" | "empty" }) {
	const captionMap = {
		loading: "در حال بارگذاری...",
		empty: "هیچ سرویسی یافت نشد.",
		error: "خطا در دریافت اطلاعات.",
	};

	return (
		<Table>
			<TableCaption>{captionMap[type]}</TableCaption>

			<TableHeader>
				<TableRow>
					<TableHead className="text-center">#</TableHead>
					<TableHead className="text-center">محصول</TableHead>
					<TableHead className="text-center">پلن</TableHead>
					<TableHead className="text-center">ایجاد</TableHead>
					<TableHead className="text-center">انقضا</TableHead>
					<TableHead className="text-center">باقی‌مانده</TableHead>
					<TableHead className="text-center">وضعیت</TableHead>
					<TableHead className="text-center">عملیات</TableHead>
				</TableRow>
			</TableHeader>
		</Table>
	);
}

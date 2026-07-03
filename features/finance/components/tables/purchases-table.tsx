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

import { useMyPurchases } from "../../mutations";
import { Purchases, PurchasesStatus } from "../../types";

/* -----------------------------
   MAIN TABLE
----------------------------- */

export function PurchasesTable() {
	const { data, isLoading, isError } = useMyPurchases();

	if (isLoading) return <TableState type="loading" />;
	if (isError || !data?.success) return <TableState type="error" />;

	const PurchasesList = data.data ?? [];

	if (PurchasesList.length === 0) return <TableState type="empty" />;

	return (
		<Table>
			<TableHeader className="sticky top-0 bg-card/85 backdrop-blur-2xl">
				<TableRow>
					<TableHead className="text-center">#</TableHead>

					<TableHead className="text-center">تاریخ</TableHead>

					<TableHead className="text-center">مبلغ (تومان)</TableHead>

					<TableHead className="text-center">وضعیت</TableHead>

					<TableHead className="text-center">توضیحات</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{PurchasesList.map((item, index) => (
					<PurchasesRow key={item.id} item={item} index={index} />
				))}
			</TableBody>
		</Table>
	);
}

/* -----------------------------
   ROW
----------------------------- */

function PurchasesRow({ item, index }: { item: Purchases; index: number }) {
	const date = toIranDateTime(item.created_at);

	return (
		<TableRow className="text-muted-foreground">
			<TableCell className="text-center">{index + 1}#</TableCell>

			<TableCell className="text-center">
				<div>{date.dateWithMonthName}</div>
				<div className="text-xs">{date.time}</div>
			</TableCell>

			<TableCell className="text-center">
				{item.amount.toLocaleString("fa-IR")}
			</TableCell>

			<TableCell className="text-center">
				<Badge variant={statusMap[item.status].variant}>
					{statusMap[item.status].label}
				</Badge>
			</TableCell>

			<TableCell className="text-center">{item.reason}</TableCell>
		</TableRow>
	);
}

/* -----------------------------
   STATUS MAP
----------------------------- */

const statusMap: Record<
	PurchasesStatus,
	{
		label: string;
		variant: "success" | "warning" | "destructive" | "outline";
	}
> = {
	pending: {
		label: "در انتظار",
		variant: "warning",
	},
	approved: {
		label: "تایید شده",
		variant: "success",
	},
	rejected: {
		label: "رد شده",
		variant: "destructive",
	},
	canceled: {
		label: "لغو شده",
		variant: "outline",
	},
};

/* -----------------------------
   STATE
----------------------------- */

function TableState({ type }: { type: "loading" | "error" | "empty" }) {
	const captionMap = {
		loading: "در حال بارگذاری...",
		empty: "هیچ تراکنشی وجود ندارد",
		error: "خطا در بارگذاری اطلاعات",
	};

	return (
		<Table>
			<TableCaption>{captionMap[type]}</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="text-center">#</TableHead>

					<TableHead className="text-center">تاریخ</TableHead>

					<TableHead className="text-center">مبلغ (تومان)</TableHead>

					<TableHead className="text-center">وضعیت</TableHead>

					<TableHead className="text-center">توضیحات</TableHead>
				</TableRow>
			</TableHeader>
		</Table>
	);
}

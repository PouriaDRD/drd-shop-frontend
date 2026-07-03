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

import { useMyRefundToWallet } from "../../mutations";
import { RefundToWallet, RefundToWalletStatus } from "../../types";

/* -----------------------------
   MAIN TABLE
----------------------------- */

export function RefundToWalletTable() {
	const { data, isLoading, isError } = useMyRefundToWallet();

	if (isLoading) return <TableState type="loading" />;
	if (isError || !data?.success) return <TableState type="error" />;

	const refundList = data.data ?? [];

	if (refundList.length === 0) return <TableState type="empty" />;

	return (
		<div className="max-h-96 overflow-auto flex">
			<Table>
				<TableHeader className="sticky top-0 bg-card/85 backdrop-blur-2xl">
					<TableRow>
						<TableHead className="text-center">#</TableHead>

						<TableHead className="text-center">تاریخ</TableHead>

						<TableHead className="text-center">
							مبلغ (تومان)
						</TableHead>

						<TableHead className="text-center">وضعیت</TableHead>

						<TableHead className="text-center">توضیحات</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{refundList.map((item, index) => (
						<RefundRow key={item.id} item={item} index={index} />
					))}
				</TableBody>
			</Table>
		</div>
	);
}

/* -----------------------------
   ROW
----------------------------- */

function RefundRow({ item, index }: { item: RefundToWallet; index: number }) {
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
	RefundToWalletStatus,
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

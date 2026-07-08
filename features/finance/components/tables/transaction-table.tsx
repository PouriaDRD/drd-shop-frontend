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

import { useMyTransactions } from "../../mutations";
import { Transaction, TransactionStatus, TransactionType } from "../../types";

/* =========================
   MAIN COMPONENT
========================= */

export function TransactionTable() {
	const { data, isLoading, isError } = useMyTransactions();

	if (isLoading) return <TableState type="loading" />;

	if (isError || !data?.success) return <TableState type="error" />;

	const transactions = data.data ?? [];

	if (transactions.length === 0) return <TableState type="empty" />;

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
						<TableHead className="text-center">نوع</TableHead>
						<TableHead className="text-center">توضیحات</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{transactions.map((tx, i) => (
						<TransactionRow key={tx.id} tx={tx} index={i} />
					))}
				</TableBody>
			</Table>
		</div>
	);
}

/* =========================
   ROW COMPONENT
========================= */

function TransactionRow({ tx, index }: { tx: Transaction; index: number }) {
	const date = toIranDateTime(tx.created_at);

	const type = TX_TYPE_MAP[tx.type];
	const status = TX_STATUS_MAP[tx.status];

	return (
		<TableRow className="text-muted-foreground">
			<TableCell className="text-center">{index + 1}#</TableCell>

			<TableCell className="text-center">
				<div>{date.dateWithMonthName}</div>
				<div className="text-xs">{date.time}</div>
			</TableCell>

			<TableCell className="text-center">
				{tx.amount.toLocaleString("fa-IR")}
			</TableCell>

			<TableCell className="text-center">
				<Badge variant={status.color}>{status.label}</Badge>
			</TableCell>

			<TableCell className="text-center">
				<Badge variant={type.color}>{type.label}</Badge>
			</TableCell>

			<TableCell className="text-center whitespace-normal wrap-break-word max-w-24">
				{tx.description}
			</TableCell>
		</TableRow>
	);
}

/* =========================
   MAPPINGS (clean & scalable)
========================= */

const TX_TYPE_MAP: Record<
	TransactionType,
	{
		label: string;
		color: "success" | "destructive" | "info" | "warning" | "outline";
	}
> = {
	deposit: {
		label: "واریز",
		color: "success",
	},

	purchase: {
		label: "خرید",
		color: "info",
	},

	refund_to_wallet: {
		label: "استرداد به کیف پول",
		color: "outline",
	},

	refund_to_user: {
		label: "استرداد به کاربر",
		color: "destructive",
	},

	withdraw: {
		label: "برداشت",
		color: "destructive",
	},

	adjustment: {
		label: "اصلاحیه",
		color: "info",
	},

	referral_reward: {
		label: "واریز پاداش",
		color: "success",
	},
};

const TX_STATUS_MAP: Record<
	TransactionStatus,
	{
		label: string;
		color: "outline" | "success" | "destructive" | "warning";
	}
> = {
	pending: {
		label: "در حال بررسی",
		color: "outline",
	},

	approved: {
		label: "تایید شده",
		color: "success",
	},

	rejected: {
		label: "رد شده",
		color: "destructive",
	},

	canceled: {
		label: "لغو شده",
		color: "warning",
	},
};

/* =========================
   STATE COMPONENT
========================= */

function TableState({ type }: { type: "loading" | "empty" | "error" }) {
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
					<TableHead className="text-center">نوع</TableHead>
					<TableHead className="text-center">توضیحات</TableHead>
				</TableRow>
			</TableHeader>
		</Table>
	);
}

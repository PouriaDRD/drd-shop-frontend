"use client";

import {
	Badge,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui";
import { toIranDateTime } from "@/features/shared/utils";

import { useMyDeposits } from "../../mutations";
import { Deposit, DepositPaymentMethod, DepositStatus } from "../../types";

/* -----------------------------
   MAIN TABLE
----------------------------- */

export function DepositRequestsTable() {
	const { data, isLoading, isError } = useMyDeposits();

	if (isLoading) return <TableState type="loading" />;
	if (isError || !data?.success) return <TableState type="error" />;

	const depositRequests = data.data ?? [];

	if (depositRequests.length === 0) return <TableState type="empty" />;

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="text-center">#</TableHead>

					<TableHead className="text-center">تاریخ</TableHead>

					<TableHead className="text-center">مبلغ (تومان)</TableHead>

					<TableHead className="text-center">روش پرداخت</TableHead>

					<TableHead className="text-center">کارت کاربر</TableHead>

					<TableHead className="text-center">کد پیگیری</TableHead>

					<TableHead className="text-center">وضعیت</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{depositRequests.map((item, index) => (
					<DepositRow key={item.id} item={item} index={index} />
				))}
			</TableBody>
		</Table>
	);
}

/* -----------------------------
   ROW
----------------------------- */

function DepositRow({ item, index }: { item: Deposit; index: number }) {
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
				<Badge variant={paymentMethodMap[item.payment_method].variant}>
					{paymentMethodMap[item.payment_method].label}
				</Badge>
			</TableCell>

			<TableCell className="text-center">
				<div className="flex flex-col items-center gap-1">
					<span className="text-sm font-medium text-foreground">
						{item.sender_name}
					</span>

					<span className="text-xs">
						{formatCardNumber(item.sender_card_number)}
					</span>
				</div>
			</TableCell>

			<TableCell className="text-center">{item.tracking_code}</TableCell>

			<TableCell className="text-center">
				<Badge variant={statusMap[item.status].variant}>
					{statusMap[item.status].label}
				</Badge>
			</TableCell>
		</TableRow>
	);
}

/* -----------------------------
   STATUS MAP
----------------------------- */

const statusMap: Record<
	DepositStatus,
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

const paymentMethodMap: Record<
	DepositPaymentMethod,
	{
		label: string;
		variant: "success" | "warning" | "destructive" | "outline";
	}
> = {
	card_to_card: {
		label: "کارت به کارت",
		variant: "outline",
	},
	online_gateway: {
		label: "درگاه آنلاین",
		variant: "outline",
	},
};

export function formatCardNumber(card: string) {
	// remove all non digits
	const cleaned = card.replace(/\D/g, "");

	// split every 4 digits
	return cleaned.replace(/(.{4})/g, "$1-").replace(/-$/, "");
}

/* -----------------------------
   STATE
----------------------------- */

function TableState({ type }: { type: "loading" | "error" | "empty" }) {
	const text = {
		loading: "در حال بارگذاری...",
		error: "خطا در دریافت اطلاعات",
		empty: "هیچ درخواستی وجود ندارد",
	};

	return (
		<div className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground">
			{text[type]}
		</div>
	);
}

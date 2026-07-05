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
import { formatCardNumber, toIranDateTime } from "@/features/shared/utils";

import { useMyRefundToUser } from "../../mutations";
import {
	RefundToUser,
	RefundToUserPaymentMethod,
	RefundToUserStatus,
} from "../../types";

/* -----------------------------
   MAIN TABLE
----------------------------- */

export function RefundToUserTable() {
	const { data, isLoading, isError } = useMyRefundToUser();

	if (isLoading) return <TableState type="loading" />;
	if (isError || !data?.success) return <TableState type="error" />;

	const refundToUserList = data.data ?? [];

	if (refundToUserList.length === 0) return <TableState type="empty" />;

	return (
		<Table>
			<TableHeader className="sticky top-0 bg-card/85 backdrop-blur-2xl">
				<TableRow>
					<TableHead className="text-center">#</TableHead>

					<TableHead className="text-center">تاریخ</TableHead>

					<TableHead className="text-center">مبلغ (تومان)</TableHead>

					<TableHead className="text-center">روش پرداخت</TableHead>

					<TableHead className="text-center">وضعیت</TableHead>

					<TableHead className="text-center">کارت مبدا</TableHead>

					<TableHead className="text-center">پیگیری</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{refundToUserList.map((item, index) => (
					<RefundRow key={item.id} item={item} index={index} />
				))}
			</TableBody>
		</Table>
	);
}

/* -----------------------------
   ROW
----------------------------- */

function RefundRow({ item, index }: { item: RefundToUser; index: number }) {
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
				<Badge variant={statusMap[item.status].variant}>
					{statusMap[item.status].label}
				</Badge>
			</TableCell>

			<TableCell className="text-center">
				<div className="flex flex-col items-center gap-1">
					<span className="text-sm font-medium text-foreground">
						{item.receiver_name}
					</span>

					<span className="text-sm">
						{formatCardNumber(item.receiver_card_number)}
					</span>
				</div>
			</TableCell>

			<TableCell className="text-center flex flex-col gap-2">
				<span>مرجع: {item.reference_number}</span>
				<span>رهگیری: {item.tracking_code}</span>
			</TableCell>
		</TableRow>
	);
}

/* -----------------------------
   STATUS MAP
----------------------------- */

const statusMap: Record<
	RefundToUserStatus,
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
	RefundToUserPaymentMethod,
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

					<TableHead className="text-center">روش پرداخت</TableHead>

					<TableHead className="text-center">وضعیت</TableHead>

					<TableHead className="text-center">کارت مبدا</TableHead>

					<TableHead className="text-center">پیگیری</TableHead>
				</TableRow>
			</TableHeader>
		</Table>
	);
}

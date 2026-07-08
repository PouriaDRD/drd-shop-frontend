"use client";

import { useEffect, useEffectEvent } from "react";

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

import { useMyTickets } from "../../mutations";
import { Ticket, TicketCategory, TicketStatus } from "../../types";
import { TicketDetailsDialog } from "../dialogs";

/* =========================
   MAIN COMPONENT
========================= */

interface Props {
	onSuccess?: (tickets?: Ticket[]) => void;
}

export function TicketTable({ onSuccess }: Props) {
	const { data, isLoading, isError } = useMyTickets();

	const onSuccessCallback = useEffectEvent((data?: Ticket[]) => {
		onSuccess?.(data);
	});

	useEffect(() => {
		if (data?.success) {
			onSuccessCallback(data.data);
		}
	}, [data]);

	if (isLoading) return <TableState type="loading" />;

	if (isError || !data?.success) return <TableState type="error" />;

	const tickets = data.data ?? [];

	if (tickets.length === 0) return <TableState type="empty" />;

	return (
		<div className="max-h-96 overflow-auto flex">
			<Table>
				<TableHeader className="sticky top-0 bg-card/85 backdrop-blur-2xl">
					<TableRow>
						<TableHead className="text-center">#</TableHead>

						<TableHead className="text-center">موضوع</TableHead>

						<TableHead className="text-center">دسته بندی</TableHead>

						<TableHead className="text-center">وضعیت</TableHead>

						<TableHead className="text-center">
							آخرین بروزرسانی
						</TableHead>

						<TableHead className="text-center">
							تاریخ ایجاد
						</TableHead>

						<TableHead className="text-center">عملیات</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{tickets.map((ticket, index) => (
						<TicketRow
							key={ticket.id}
							ticket={ticket}
							index={index}
						/>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

/* =========================
   ROW
========================= */

function TicketRow({ ticket, index }: { ticket: Ticket; index: number }) {
	const created = toIranDateTime(ticket.created_at);
	const updated = toIranDateTime(ticket.updated_at);

	const status = TICKET_STATUS_MAP[ticket.status];
	const category = TICKET_Category_MAP[ticket.category];

	return (
		<TableRow className="text-muted-foreground">
			<TableCell className="text-center">{index + 1}#</TableCell>

			<TableCell className="max-w-56 text-center whitespace-normal wrap-break-word">
				{ticket.title}
			</TableCell>

			<TableCell className="text-center">
				<Badge variant={category.color}>{category.label}</Badge>
			</TableCell>

			<TableCell className="text-center">
				<Badge variant={status.color}>{status.label}</Badge>
			</TableCell>

			<TableCell className="text-center">
				<div>{updated.dateWithMonthName}</div>

				<div className="text-xs">{updated.time}</div>
			</TableCell>

			<TableCell className="text-center">
				<div>{created.dateWithMonthName}</div>

				<div className="text-xs">{created.time}</div>
			</TableCell>

			<TableCell className="text-center">
				<TicketDetailsDialog ticket={ticket} />
			</TableCell>
		</TableRow>
	);
}

/* =========================
   STATUS MAP
========================= */

const TICKET_STATUS_MAP: Record<
	TicketStatus,
	{
		label: string;
		color: "success" | "info" | "destructive" | "outline";
	}
> = {
	open: {
		label: "باز",
		color: "success",
	},

	answered: {
		label: "پاسخ داده شده",
		color: "info",
	},

	closed: {
		label: "بسته شده",
		color: "destructive",
	},
};

/* =========================
   STATUS MAP
========================= */

const TICKET_Category_MAP: Record<
	TicketCategory,
	{
		label: string;
		color: "success" | "info" | "outline" | "warning" | "destructive";
	}
> = {
	general: {
		label: "عمومی",
		color: "outline",
	},

	order: {
		label: "سفارشات",
		color: "info",
	},

	payment: {
		label: "مالی",
		color: "success",
	},

	technical: {
		label: "فنی",
		color: "warning",
	},
};

/* =========================
   STATE
========================= */

function TableState({ type }: { type: "loading" | "empty" | "error" }) {
	const captionMap = {
		loading: "در حال بارگذاری...",

		empty: "هیچ تیکتی وجود ندارد",

		error: "خطا در بارگذاری اطلاعات",
	};

	return (
		<Table>
			<TableCaption>{captionMap[type]}</TableCaption>

			<TableHeader>
				<TableRow>
					<TableHead className="text-center">#</TableHead>

					<TableHead className="text-center">موضوع</TableHead>

					<TableHead className="text-center">دسته بندی</TableHead>

					<TableHead className="text-center">وضعیت</TableHead>

					<TableHead className="text-center">
						آخرین بروزرسانی
					</TableHead>

					<TableHead className="text-center">تاریخ ایجاد</TableHead>

					<TableHead className="text-center">عملیات</TableHead>
				</TableRow>
			</TableHeader>
		</Table>
	);
}

"use client";

import { Ticket } from "@/features/support/types";

import { StatBaseCard } from "../stat-base-card";

interface Props {
	tickets?: Ticket[];
}

export function SupportStats({ tickets }: Props) {
	const allTickets = tickets?.length ?? 0;

	const openTickets = tickets?.filter((ticket) => ticket.status === "open");

	const closedTickets = tickets?.filter(
		(ticket) => ticket.status === "closed",
	);

	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
			<StatBaseCard
				label="کل تیکت‌ها"
				value={allTickets.toString()}
				small>
				تیکت
			</StatBaseCard>

			<StatBaseCard
				label="تیکت‌های باز"
				value={openTickets?.length.toString() ?? "0"}
				small>
				تیکت
			</StatBaseCard>

			<StatBaseCard
				label="تیکت‌های پاسخ داده شده"
				value={closedTickets?.length.toString() ?? "0"}
				small>
				تیکت
			</StatBaseCard>
		</div>
	);
}

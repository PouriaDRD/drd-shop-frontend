"use client";

import { useState } from "react";

import { PageHeader, PageLayout } from "@/components/pages";
import { SupportStats } from "@/components/pages/support";
import { Card, CardHeader, CardTitle } from "@/components/ui";
import { TicketCreateDialog } from "@/features/support/components/dialogs/ticket-create-dialog";
import { TicketTable } from "@/features/support/components/tables";
import { Ticket } from "@/features/support/types";

function SupportPage() {
	const [tickets, setTickets] = useState<Ticket[] | undefined>(undefined);

	const handleOnTicketSuccess = (tickets?: Ticket[]) => {
		setTickets(tickets);
	};

	return (
		<PageLayout className="flex flex-col gap-4">
			<PageHeader
				title="پشتیبانی"
				description="ارسال تیکت و ارتباط با پشتیبانی"
			/>

			<SupportStats tickets={tickets} />

			<Card className="overflow-hidden">
				<CardHeader className="flex flex-row justify-between gap-4 border-b">
					<CardTitle className="text-base">تیکت ها</CardTitle>

					<TicketCreateDialog />
				</CardHeader>

				<TicketTable onSuccess={handleOnTicketSuccess} />
			</Card>
		</PageLayout>
	);
}

export default SupportPage;

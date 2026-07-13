"use client";

import { Activity, useState } from "react";

import { PageHeader, PageLayout } from "@/components/pages";
import { SupportStats } from "@/components/pages/support";
import { Card, CardHeader, CardTitle } from "@/components/ui";
import { AnnouncementsAlert } from "@/features/notifications/components/alerts";
import { TicketCreateDialog } from "@/features/support/components/dialogs/ticket-create-dialog";
import {
	AminTicketTable,
	TicketTable,
} from "@/features/support/components/tables";
import { Ticket } from "@/features/support/types";
import { useUser } from "@/features/user/context";

function SupportPage() {
	const { user } = useUser();

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

			<div className="w-full">
				<AnnouncementsAlert />
			</div>

			<Activity
				mode={user && user.role === "user" ? "visible" : "hidden"}>
				<SupportStats tickets={tickets} />

				<Card className="overflow-hidden">
					<CardHeader className="flex flex-row justify-between gap-4 border-b">
						<CardTitle className="text-base">تیکت‌های من</CardTitle>

						<TicketCreateDialog />
					</CardHeader>

					<TicketTable onSuccess={handleOnTicketSuccess} />
				</Card>
			</Activity>

			<Activity mode={user && user.role != "user" ? "visible" : "hidden"}>
				<Card className="overflow-hidden">
					<CardHeader className="flex flex-row justify-between gap-4 border-b">
						<CardTitle className="text-base">
							تیکت‌های کاربران
						</CardTitle>
					</CardHeader>

					<AminTicketTable />
				</Card>
			</Activity>
		</PageLayout>
	);
}

export default SupportPage;

"use client";

import { PageHeader, PageLayout } from "@/components/pages";
import { Card, CardHeader, CardTitle } from "@/components/ui";
import { TicketCreateDialog } from "@/features/support/components/dialogs/ticket-create-dialog";
import { TicketTable } from "@/features/support/components/tables";

function SupportPage() {
	return (
		<PageLayout className="flex flex-col gap-4">
			<PageHeader
				title="پشتیبانی"
				description="ارسال تیکت و ارتباط با پشتیبانی"
			/>

			<Card className="overflow-hidden">
				<CardHeader className="flex flex-row justify-between gap-4 border-b">
					<CardTitle className="text-base">تیکت ها</CardTitle>

					<TicketCreateDialog />
				</CardHeader>
				<TicketTable />
			</Card>
		</PageLayout>
	);
}

export default SupportPage;

"use client";

import { PageHeader, PageLayout } from "@/components/pages";
import { Card, CardHeader, CardTitle } from "@/components/ui";
import { MyVPNServicesTable } from "@/features/shop/components/tables";

export default function ServicesPage() {
	return (
		<PageLayout className="flex flex-col gap-4">
			<PageHeader
				title="سرویس‌های‌من"
				description="لیست سرویسسرویس‌های‌ خریداری شده"
			/>

			<Card>
				<CardHeader className="space-y-4 border-b">
					<CardTitle>لیست سرویس‌های V2ray</CardTitle>
				</CardHeader>

				<MyVPNServicesTable />
			</Card>
		</PageLayout>
	);
}

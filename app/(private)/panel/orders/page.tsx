"use client";

import { PageHeader, PageLayout } from "@/components/pages";
import { Card, CardHeader, CardTitle } from "@/components/ui";
import { AppAlert } from "@/features/notifications/components/alerts";
import {
	MyOrdersTable,
	MyVPNServicesTable,
} from "@/features/shop/components/tables";

export default function OrdersPage() {
	return (
		<PageLayout className="flex flex-col gap-4">
			<PageHeader
				title="سفارشات"
				description="لیست سفارشات و پلن های خریداری شده"
			/>

			<AppAlert
				variant="warning"
				title="توجه"
				description="پس از تأیید سفارش، اشتراک شما به صورت خودکار ایجاد شده و در بخش «سرویس‌های من» نمایش داده خواهد شد."
			/>
			<Card>
				<CardHeader className="space-y-4 border-b">
					<CardTitle>لیست سرویس‌های V2ray</CardTitle>
				</CardHeader>

				<MyVPNServicesTable />
			</Card>

			<Card className="overflow-hidden">
				<CardHeader className="space-y-4 border-b">
					<CardTitle className="text-base">لیست سفارشات</CardTitle>
				</CardHeader>
				<MyOrdersTable />
			</Card>
		</PageLayout>
	);
}

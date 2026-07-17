"use client";

import { useState } from "react";

import { PageHeader, PageLayout } from "@/components/pages";
import { ServicersStats } from "@/components/pages/services";
import { Card, CardHeader, CardTitle } from "@/components/ui";
import { MyVPNServicesTable } from "@/features/shop/components/tables";

interface Stats {
	total: number;
	active: number;
	expired: number;
}

export default function ServicesPage() {
	const [stats, setStats] = useState<Stats>();

	return (
		<PageLayout className="flex flex-col gap-4">
			<PageHeader
				title="سرویس‌های‌من"
				description="لیست سرویسسرویس‌های‌ خریداری شده"
			/>

			<ServicersStats stats={stats} />

			<Card>
				<CardHeader className="space-y-4 border-b">
					<CardTitle>لیست سرویس‌های V2ray</CardTitle>
				</CardHeader>

				<MyVPNServicesTable onSuccess={setStats} />
			</Card>
		</PageLayout>
	);
}

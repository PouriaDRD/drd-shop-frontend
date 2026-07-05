"use client";

import { PageHeader, PageLayout } from "@/components/pages";

function SupportPage() {
	return (
		<PageLayout className="flex flex-col gap-4">
			<PageHeader
				title="پشتیبانی"
				description="ارسال تیکت و ارتباط با پشتیبانی"
			/>
		</PageLayout>
	);
}

export default SupportPage;

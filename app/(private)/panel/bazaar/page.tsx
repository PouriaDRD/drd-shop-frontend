"use client";

import { PageHeader, PageLayout } from "@/components/pages";
import { DownloadSection } from "@/components/pages/landing";
import { Products } from "@/features/shop/components";

function BazaarPage() {
	return (
		<PageLayout className="flex flex-col gap-4">
			<PageHeader title="بازارچه" description="آخرین محصولات موجود" />

			<Products className="py-0 md:py-0" />

			<DownloadSection className="py-0" />
		</PageLayout>
	);
}

export default BazaarPage;

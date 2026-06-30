import { PageHeader, PageLayout } from "@/components/pages";

function FinancePage() {
	return (
		<PageLayout className="flex flex-col gap-4">
			<PageHeader
				title="مالی"
				description="آخرین تراکنش ها و مدیریت کیف پول"
			/>
		</PageLayout>
	);
}

export default FinancePage;

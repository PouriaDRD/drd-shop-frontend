import { PageHeader, PageLayout } from "@/components/pages";

function BazaarPage() {
	return (
		<PageLayout className="flex flex-col gap-4">
			<PageHeader title="بازارچه" description="آخرین محصولات موجود" />
		</PageLayout>
	);
}

export default BazaarPage;

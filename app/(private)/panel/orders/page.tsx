import { PageHeader, PageLayout } from "@/components/pages";

export default function OrdersPage() {
	return (
		<PageLayout className="flex flex-col gap-4">
			<PageHeader
				title="سفارشات"
				description="لیست سفارشات و پلن های خریداری شده"
			/>
		</PageLayout>
	);
}

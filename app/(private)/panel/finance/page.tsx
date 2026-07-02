import { PageHeader, PageLayout } from "@/components/pages";
import { FinanceStats } from "@/components/pages/finance";
import {
	Button,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui";
import {
	DepositRequestsTable,
	TransactionTable,
} from "@/features/finance/components/tables";

function FinancePage() {
	return (
		<PageLayout className="flex flex-col gap-4">
			<PageHeader
				title="مالی"
				description="موجودی، مدیریت مالی و آخرین تراکش ها"
			/>

			<FinanceStats />

			<div className="bg-card rounded-2xl border space-y-4 mt-8">
				<Tabs dir="rtl" defaultValue="transactions" className="pt-4">
					<div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
						{/* Tabs Header */}
						<TabsList
							className="grid w-fit grid-cols-2"
							variant={"line"}>
							<TabsTrigger value="transactions">
								تراکنش‌ها
							</TabsTrigger>

							<TabsTrigger value="deposit-requests">
								درخواست‌های واریز
							</TabsTrigger>
						</TabsList>
						<div className="px-4">
							<Button variant={"outline"} size={"xs"}>
								افزایش موجودی
							</Button>
						</div>
					</div>
					{/* TAB 1 */}
					<TabsContent value="transactions" className="mt-6">
						<TransactionTable />
					</TabsContent>
					{/* TAB 2 (placeholder for now) */}
					<TabsContent value="deposit-requests" className="mt-6">
						<DepositRequestsTable />
					</TabsContent>
				</Tabs>
			</div>
		</PageLayout>
	);
}

export default FinancePage;

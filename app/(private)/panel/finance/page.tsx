import { PageHeader, PageLayout } from "@/components/pages";
import { FinanceStats } from "@/components/pages/finance";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
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

			<div className="bg-card rounded-2xl border space-y-4">
				<Tabs dir="rtl" defaultValue="transactions" className="pt-4">
					<div className="flex items-center justify-between gap-4">
						{/* Tabs Header */}
						<TabsList
							className="grid grid-cols-4 w-full"
							variant={"line"}>
							<TabsTrigger value="transactions">
								تراکنش‌ها
							</TabsTrigger>

							<TabsTrigger value="deposit-requests">
								واریزی‌ها
							</TabsTrigger>

							<TabsTrigger value="purchases">
								پرداخت‌ها
							</TabsTrigger>
						</TabsList>
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

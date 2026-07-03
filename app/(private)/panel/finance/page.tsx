import {
	ArrowLeftRight,
	BanknoteArrowDown,
	CreditCard,
	User,
	Wallet,
} from "lucide-react";

import { PageHeader, PageLayout } from "@/components/pages";
import { FinanceStats } from "@/components/pages/finance";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui";
import {
	DepositRequestsTable,
	RefundToUserTable,
	RefundToWalletTable,
	TransactionTable,
} from "@/features/finance/components/tables";

export default function FinancePage() {
	return (
		<PageLayout className="space-y-6">
			<PageHeader
				title="مالی"
				description="مدیریت کیف پول، تراکنش‌ها و درخواست‌های مالی"
			/>

			<FinanceStats />

			<Card className="overflow-hidden">
				<Tabs defaultValue="transactions" dir="rtl">
					<CardHeader className="space-y-4 border-b">
						<CardTitle className="text-base">سوابق مالی</CardTitle>

						<div className="-mx-6 overflow-x-auto px-6 overflow-y-hidden">
							<TabsList
								variant="line"
								className={`inline-flex
									w-max
									min-w-max
									whitespace-nowrap
									bg-transparent
									p-0
									gap-1`}>
								<TabsTrigger
									value="transactions"
									className="shrink-0 gap-2 px-4">
									<ArrowLeftRight className="size-4" />
									تراکنش‌ها
								</TabsTrigger>

								<TabsTrigger
									value="deposit-requests"
									className="shrink-0 gap-2 px-4">
									<BanknoteArrowDown className="size-4" />
									درخواست واریز
								</TabsTrigger>

								<TabsTrigger
									value="payments"
									className="shrink-0 gap-2 px-4">
									<CreditCard className="size-4" />
									پرداخت‌ها
								</TabsTrigger>

								<TabsTrigger
									value="refund-to-wallet"
									className="shrink-0 gap-2 px-4">
									<Wallet className="size-4" />
									استرداد به کیف پول
								</TabsTrigger>

								<TabsTrigger
									value="refund-to-user"
									className="shrink-0 gap-2 px-4">
									<User className="size-4" />
									استرداد به کاربر
								</TabsTrigger>
							</TabsList>
						</div>
					</CardHeader>

					<CardContent className="p-0">
						<TabsContent value="transactions" className="m-0">
							<TransactionTable />
						</TabsContent>

						<TabsContent value="deposit-requests" className="m-0">
							<DepositRequestsTable />
						</TabsContent>

						<TabsContent value="refund-to-wallet" className="m-0">
							<RefundToWalletTable />
						</TabsContent>

						<TabsContent value="refund-to-user" className="m-0">
							<RefundToUserTable />
						</TabsContent>
					</CardContent>
				</Tabs>
			</Card>
		</PageLayout>
	);
}

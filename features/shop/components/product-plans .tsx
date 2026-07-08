"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useProductDetail } from "../mutations";
import { groupPlansByType, isFeatured } from "../utils";

import { PlanCard } from "./plan-card ";

type ProductPlansProps = {
	id: string;
	productId: string;
};

export function ProductPlans({ id, productId }: ProductPlansProps) {
	const { data, isLoading, isError } = useProductDetail(id);

	if (isLoading) return <ProductPlansSkeleton />;

	if (isError || !data?.success) {
		return (
			<p className="py-10 text-center text-sm text-muted-foreground">
				خطا در دریافت پلن‌ها. لطفاً دوباره تلاش کنید.
			</p>
		);
	}

	const { plans } = data.data;
	const groups = groupPlansByType(plans);
	const groupKeys = Array.from(groups.keys());

	if (groupKeys.length === 0) {
		return (
			<p className="py-10 text-center text-sm text-muted-foreground">
				پلنی برای این محصول وجود ندارد.
			</p>
		);
	}

	return (
		<Tabs defaultValue={groupKeys[0]} dir="rtl">
			{/* Sub-tabs: مستقیم / تونل شده / ... */}
			{groupKeys.length > 1 && (
				<TabsList className="mb-8 h-auto gap-1 bg-transparent p-0">
					{groupKeys.map((group) => (
						<TabsTrigger
							key={group}
							value={group}
							className="rounded-lg border px-4 py-2 text-sm data-[state=active]:border-foreground data-[state=active]:bg-foreground data-[state=active]:text-background">
							{group}
						</TabsTrigger>
					))}
				</TabsList>
			)}

			{/* Plan cards per group */}
			{groupKeys.map((group) => {
				const groupPlans = groups.get(group)!;
				return (
					<TabsContent key={group} value={group} className="mt-0">
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{groupPlans.map((plan) => (
								<PlanCard
									key={plan.id}
									plan={plan}
									productId={productId}
									featured={isFeatured(plan, groupPlans)}
								/>
							))}
						</div>
					</TabsContent>
				);
			})}

			<p className="mt-8 text-center text-xs text-muted-foreground">
				تا <strong className="text-foreground">3 روز</strong> پس از
				خرید، امکان بازگشت وجه وجود دارد.
			</p>
		</Tabs>
	);
}

function ProductPlansSkeleton() {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{Array.from({ length: 3 }).map((_, i) => (
				<Skeleton key={i} className="h-64 rounded-xl" />
			))}
		</div>
	);
}

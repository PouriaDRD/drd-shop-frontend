"use client";

import { Skeleton } from "@/components/ui/skeleton";

import { useProductDetail } from "../mutations";

import { PlanCard } from "./plan-card";

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

	if (plans.length === 0) {
		return (
			<p className="py-10 text-center text-sm text-muted-foreground">
				پلنی برای این محصول وجود ندارد.
			</p>
		);
	}

	return (
		<div className="space-y-6">
			<div
				dir="ltr"
				className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
				{plans.map((plan, i) => (
					<PlanCard
						key={plan.id}
						plan={plan}
						productId={productId}
						featured={i === 1 && plans.length > 2}
					/>
				))}
			</div>

			<p className="text-center text-xs text-muted-foreground">
				تا <strong className="text-foreground">3 روز</strong> پس از
				خرید، امکان بازگشت وجه وجود دارد.
			</p>
		</div>
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

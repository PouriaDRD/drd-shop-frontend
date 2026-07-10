"use client";

import { SectionHeader } from "@/components/pages/landing/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/features/shared/utils";
import { useProducts } from "@/features/shop/mutations";

import { ProductPlans } from "./product-plans";

interface Props {
	className?: string;
}

export function Products({ className }: Props) {
	const { data, isLoading } = useProducts();

	if (isLoading) return <ProductsSkeleton />;

	if (!data || !data.success) {
		return (
			<ProductsMessage text="خطا در دریافت محصولات. لطفاً صفحه را رفرش کنید." />
		);
	}

	const products = data.data;

	if (products.length === 0) {
		return <ProductsMessage text="محصولی یافت نشد." />;
	}

	return (
		<section id="products" className={cn("py-16 md:py-20", className)}>
			<SectionHeader
				eyebrow="محصولات"
				title="پلن مناسب خود را انتخاب کنید"
			/>

			<div className="flex flex-col gap-14">
				{products.map((product) => (
					<div key={product.slug} className="space-y-6">
						<div className="flex items-baseline justify-between border-b pb-3">
							<h3 className="text-lg font-medium text-foreground">
								{product.title}
							</h3>
						</div>

						{product.description && (
							<p className="-mt-2 text-sm text-muted-foreground">
								{product.description}
							</p>
						)}

						<ProductPlans id={product.id} productId={product.id} />
					</div>
				))}
			</div>
		</section>
	);
}

function ProductsMessage({ text }: { text: string }) {
	return (
		<section className="py-20">
			<p className="text-center text-sm text-muted-foreground">{text}</p>
		</section>
	);
}

function ProductsSkeleton() {
	return (
		<section className="py-16 md:py-20">
			<Skeleton className="mb-4 h-4 w-24" />
			<Skeleton className="mb-12 h-8 w-72" />
			<div className="space-y-14">
				{Array.from({ length: 2 }).map((_, i) => (
					<div key={i} className="space-y-6">
						<Skeleton className="h-6 w-32" />
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{Array.from({ length: 3 }).map((_, j) => (
								<Skeleton key={j} className="h-64 rounded-xl" />
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

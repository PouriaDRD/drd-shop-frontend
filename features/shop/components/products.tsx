"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/features/shared/utils";
import { useProducts } from "@/features/shop/mutations";

import { ProductPlans } from "./product-plans ";

interface Props {
	className?: string;
}

export function Products({ className }: Props) {
	const { data, isLoading } = useProducts();

	if (isLoading) return <ProductsSkeleton />;

	if (!data || !data.success) {
		return (
			<section className="bg-background px-5 py-20">
				<p className="text-center text-sm text-muted-foreground">
					خطا در دریافت محصولات. لطفاً صفحه را رفرش کنید.
				</p>
			</section>
		);
	}

	const products = data.data;

	if (products.length === 0) {
		return (
			<section className="bg-background px-5 py-20">
				<p className="text-center text-sm text-muted-foreground">
					محصولی یافت نشد.
				</p>
			</section>
		);
	}

	return (
		<section id="products" className="bg-background px-5">
			<div className={cn("mx-auto max-w-6xl py-20", className)}>
				<div className="mb-12 max-w-lg">
					<p className="mb-2 text-xs text-muted-foreground">
						محصولات
					</p>
					<h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-[28px]">
						پلن مناسب خود را انتخاب کنید
					</h2>
				</div>

				<Tabs defaultValue={products[0].slug} dir="rtl">
					{/* One tab per product */}
					<TabsList
						className="mb-10 h-auto gap-1 p-1"
						variant={"line"}>
						{products.map((product) => (
							<TabsTrigger
								key={product.slug}
								value={product.slug}
								className="px-5 py-2 text-sm">
								{product.title}
							</TabsTrigger>
						))}
					</TabsList>

					{/* Plans for each product */}
					{products.map((product) => (
						<TabsContent
							key={product.slug}
							value={product.slug}
							className="mt-0">
							{product.description && (
								<p className="mb-8 text-sm text-muted-foreground">
									{product.description}
								</p>
							)}
							<ProductPlans
								id={product.id}
								productId={product.id}
							/>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
	);
}

function ProductsSkeleton() {
	return (
		<section className="bg-background px-5">
			<div className="mx-auto max-w-6xl py-20">
				<Skeleton className="mb-4 h-4 w-24" />
				<Skeleton className="mb-12 h-8 w-72" />
				<div className="mb-10 flex gap-2">
					<Skeleton className="h-9 w-24 rounded-lg" />
					<Skeleton className="h-9 w-24 rounded-lg" />
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 3 }).map((_, i) => (
						<Skeleton key={i} className="h-64 rounded-xl" />
					))}
				</div>
			</div>
		</section>
	);
}

"use client";

import Link from "next/link";

import { Check, Sparkles } from "lucide-react";

import {
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui";

import { plans } from "./landing.data";

export function Pricing() {
	return (
		<section id="pricing" className="border-t bg-background">
			<div className="container mx-auto py-20">
				<div className="mx-auto mb-12 max-w-2xl text-center">
					<Badge variant="secondary" className="mb-4">
						پلن‌ها
					</Badge>

					<h2 className="text-3xl font-bold tracking-tight">
						یک پلن، بدون شرط مخفی
					</h2>

					<p className="mt-3 text-muted-foreground">
						تمام امکانات مورد نیاز برای اتصال سریع و پایدار، با قیمت
						شفاف و بدون هزینه پنهان.
					</p>
				</div>

				<div className="grid gap-6 lg:grid-cols-3">
					{plans.map((plan) => (
						<Card
							key={plan.id}
							className={`relative flex h-full flex-col transition-all duration-300 ${
								plan.featured
									? "border-primary shadow-lg shadow-primary/10"
									: "hover:border-primary/40 hover:shadow-md"
							}`}>
							{plan.featured && (
								<Badge className="absolute top-3 left-4">
									<Sparkles className="mr-1 size-3" />
									پیشنهاد ویژه
								</Badge>
							)}

							<CardHeader>
								<CardTitle>{plan.name}</CardTitle>

								<CardDescription>
									{plan.tagline}
								</CardDescription>

								<div className="pt-4">
									<div className="flex items-end gap-2">
										<span className="text-4xl font-bold">
											{plan.price}
										</span>

										<span className="pb-1 text-sm text-muted-foreground">
											{plan.pricePeriod}
										</span>
									</div>

									{plan.monthlyEquivalent && (
										<p className="mt-2 text-sm text-primary">
											{plan.monthlyEquivalent}
										</p>
									)}
								</div>
							</CardHeader>

							<CardContent className="flex-1">
								<ul className="space-y-3">
									{plan.perks.map((perk) => (
										<li
											key={perk}
											className="flex items-start gap-3">
											<div className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-primary/10">
												<Check className="size-3 text-primary" />
											</div>

											<span className="text-sm text-muted-foreground">
												{perk}
											</span>
										</li>
									))}
								</ul>
							</CardContent>

							<CardFooter>
								<Button
									asChild
									className="w-full"
									variant={
										plan.featured ? "default" : "outline"
									}>
									<Link href="/">انتخاب پلن</Link>
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>

				<p className="mt-10 text-center text-sm text-muted-foreground">
					تا <strong>۷ روز</strong> پس از خرید، امکان بازگشت وجه وجود
					دارد.
				</p>
			</div>
		</section>
	);
}

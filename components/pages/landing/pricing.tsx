import Link from "next/link";

import { Check } from "lucide-react";

import { plans } from "./landing.data";

export function Pricing() {
	return (
		<section id="pricing" className="border-t bg-background">
			<div className="mx-auto max-w-6xl px-5 py-20">
				<div className="mb-12 max-w-lg">
					<p className="mb-2 text-xs text-muted-foreground">پلن‌ها</p>
					<h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-[28px]">
						یک پلن، بدون شرط مخفی
					</h2>
				</div>

				<div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
					{plans.map((plan) => (
						<div
							key={plan.id}
							className={`relative rounded-2xl p-6 ${
								plan.featured
									? "border-2 border-foreground bg-white dark:bg-card"
									: "border border-card/8 bg-white dark:bg-card"
							}`}>
							{plan.featured && (
								<span className="absolute -top-3 right-6 rounded-full bg-foreground px-3 py-1 text-[11px] text-background">
									پیشنهاد ویژه
								</span>
							)}

							<p className="text-[15px] font-medium text-foreground">
								{plan.name}
							</p>
							<p className="mt-0.5 text-xs text-muted-foreground">
								{plan.tagline}
							</p>

							<div className="mt-5 flex items-baseline gap-1.5">
								<span className="text-[26px] font-medium tracking-tight text-foreground">
									{plan.price}
								</span>
								<span className="text-xs text-muted-foreground">
									{plan.pricePeriod}
								</span>
							</div>
							{plan.monthlyEquivalent && (
								<p className="mt-1 text-xs text-green-700 dark:text-green-400">
									{plan.monthlyEquivalent}
								</p>
							)}

							<ul className="mt-6 flex flex-col gap-2.5">
								{plan.perks.map((perk) => (
									<li
										key={perk}
										className="flex items-center gap-2 text-sm text-muted-foreground">
										<Check
											className="h-4 w-4 shrink-0 text-green-700 dark:text-green-400"
											strokeWidth={2.25}
										/>
										{perk}
									</li>
								))}
							</ul>

							<Link
								// href={`/checkout?plan=${plan.id}`}
								href={`/`}
								className={`mt-7 block rounded-lg py-2.5 text-center text-sm transition-opacity hover:opacity-90 ${
									plan.featured
										? "bg-foreground text-background"
										: "border border-foreground/10 text-foreground"
								}`}>
								انتخاب پلن
							</Link>
						</div>
					))}
				</div>

				<p className="mt-8 text-center text-xs text-[#9A9C9F]">
					تا ۷ روز پس از خرید، امکان بازگشت وجه وجود دارد.
				</p>
			</div>
		</section>
	);
}

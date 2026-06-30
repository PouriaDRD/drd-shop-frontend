import { EyeOff, Globe2, Headset, Laptop, Lock, Zap } from "lucide-react";

import { type Feature, features } from "./landing.data";

const iconMap: Record<Feature["icon"], typeof Zap> = {
	bolt: Zap,
	lock: Lock,
	world: Globe2,
	"eye-off": EyeOff,
	device: Laptop,
	headset: Headset,
};

export function Features() {
	return (
		<section id="features" className="border-t bg-background">
			<div className="mx-auto max-w-6xl px-5 py-20">
				<div className="mb-12 max-w-lg">
					<p className="mb-2 text-xs text-muted-foreground">
						چرا دی‌آردی وی‌پی‌ان
					</p>
					<h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-[28px]">
						هرچیزی که از یک وی‌پی‌ان واقعی انتظار داری
					</h2>
				</div>

				<div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-3">
					{features.map((feature) => {
						const Icon = iconMap[feature.icon];
						return (
							<div key={feature.id} className="bg-card p-6">
								<Icon
									className="h-5 w-5 text-foreground"
									strokeWidth={1.75}
								/>
								<h3 className="mt-4 text-[15px] font-medium text-foreground">
									{feature.title}
								</h3>
								<p className="mt-1.5 text-sm leading-6 text-muted-foreground">
									{feature.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

import { EyeOff, Globe2, Headset, Laptop, Lock, Zap } from "lucide-react";

import { type Feature, features } from "./landing.data";
import { SectionHeader } from "./section-header";

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
		<section id="features" className="py-16 md:py-20">
			<SectionHeader
				eyebrow="چرا دی‌آردی وی‌پی‌ان"
				title="هرچیزی که از یک وی‌پی‌ان واقعی انتظار داری"
			/>

			<div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-3">
				{features.map((feature) => (
					<FeatureCard feature={feature} key={feature.id} />
				))}
			</div>
		</section>
	);
}

function FeatureCard({ feature }: { feature: Feature }) {
	const Icon = iconMap[feature.icon];
	return (
		<div className="group bg-card p-6 transition-colors hover:bg-muted/40">
			<Icon className="h-5 w-5 text-foreground" strokeWidth={1.75} />
			<h3 className="mt-4 text-[15px] font-medium text-foreground">
				{feature.title}
			</h3>
			<p className="mt-1.5 text-sm leading-6 text-muted-foreground">
				{feature.description}
			</p>
		</div>
	);
}

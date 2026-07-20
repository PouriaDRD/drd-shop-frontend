import { EyeOff, Globe2, Headset, Laptop, Lock, Zap } from "lucide-react";

import { FEATURES } from "@/features/shared/constants";
import { Feature } from "@/features/shared/types";

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
		<section id="features" className="py-16 md:py-24">
			<SectionHeader
				eyebrow="چرا دی‌آردی وی‌پی‌ان"
				title="هرچیزی که از یک وی‌پی‌ان واقعی انتظار داری"
			/>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{FEATURES.map((feature) => (
					<FeatureCard feature={feature} key={feature.id} />
				))}
			</div>
		</section>
	);
}

function FeatureCard({ feature }: { feature: Feature }) {
	const Icon = iconMap[feature.icon];
	return (
		<div className="group relative overflow-hidden rounded-2xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
			<div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
				<Icon className="h-5 w-5" strokeWidth={1.75} />
			</div>
			<h3 className="mt-5 text-[15px] font-medium text-foreground">
				{feature.title}
			</h3>
			<p className="mt-1.5 text-sm leading-6 text-muted-foreground">
				{feature.description}
			</p>
		</div>
	);
}

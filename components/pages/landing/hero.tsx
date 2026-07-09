import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Badge, Button } from "@/components/ui";

import { liveServers } from "./landing.data";
import { NetworkReadout } from "./network-readout";

export function Hero() {
	return (
		<section className="relative overflow-hidden">
			<div className="flex flex-col md:flex-row items-center justify-between gap-8 py-20">
				<HeroContent />

				<HeroPreview />
			</div>
		</section>
	);
}

export function HeroContent() {
	return (
		<div className="space-y-8 w-full">
			<HeroBadge />

			<div className="space-y-5">
				<h1
					suppressHydrationWarning
					className="font-bold leading-tight tracking-tight text-4xl md:text-4xl lg:text-5xl">
					وی پی انی که هرجا باشی،
					<br />
					<span>قطع نمی‌شه!</span>
				</h1>

				<p className="max-w-md text-base leading-8 text-muted-foreground">
					بدون افت سرعت، بدون ثبت لاگ، با زیرساختی که وضعیتش را هر
					لحظه می‌توانی ببینی، نه فقط حرفش را بشنوی.
				</p>
			</div>

			<HeroActions />
		</div>
	);
}

export function HeroBadge() {
	return (
		<Badge variant="secondary" className="gap-2 rounded-full px-4 py-1.5">
			<span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
			+{liveServers.length} سرور آنلاین در همین لحظه
		</Badge>
	);
}

export function HeroActions() {
	return (
		<div className="flex flex-wrap gap-3">
			<Button size="lg" asChild>
				<Link href="/auth/register">
					شروع ثبت نام
					<ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
				</Link>
			</Button>

			<Button size="lg" variant="outline" asChild>
				<Link href="#products">مشاهده پلن‌ها</Link>
			</Button>
		</div>
	);
}

export function HeroPreview() {
	return (
		<div className="flex justify-center lg:justify-end w-full p-2">
			<NetworkReadout />
		</div>
	);
}

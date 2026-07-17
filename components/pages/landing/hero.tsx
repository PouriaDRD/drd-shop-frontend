import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Badge, Button } from "@/components/ui";
import { SERVERS } from "@/features/shared/constants";

import { NetworkReadout } from "./network-readout";

export function Hero() {
	return (
		<section className="relative overflow-hidden py-16">
			<div className="flex flex-col items-center justify-between gap-12 md:flex-row">
				<HeroContent />
				<HeroPreview />
			</div>
		</section>
	);
}

function HeroContent() {
	return (
		<div className="w-full space-y-8 text-center md:text-right">
			<Badge
				variant="secondary"
				className="gap-2 rounded-full px-4 py-1.5">
				<span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
				+{SERVERS.length} سرور آنلاین در همین لحظه
			</Badge>

			<div className="space-y-5">
				<h1
					suppressHydrationWarning
					className="text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
					وی پی انی که هرجا باشی،
					<br />
					<span suppressHydrationWarning>قطع نمی‌شه!</span>
				</h1>

				<p
					suppressHydrationWarning
					className="mx-auto max-w-md text-base leading-8 text-muted-foreground md:mx-0">
					بدون افت سرعت، بدون ثبت لاگ، با زیرساختی که وضعیتش را هر
					لحظه می‌توانی ببینی، نه فقط حرفش را بشنوی.
				</p>
			</div>

			<div className="flex flex-wrap justify-center gap-3 md:justify-start">
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
		</div>
	);
}

function HeroPreview() {
	return (
		<div className="flex w-full justify-center p-2 md:justify-end">
			<NetworkReadout />
		</div>
	);
}

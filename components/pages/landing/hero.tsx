import Link from "next/link";

import { ArrowLeft, Award, Shield, Zap } from "lucide-react";

import { Button } from "@/components/ui";

import { HeroVisual } from "./hero-visual";

export function Hero() {
	return (
		<section className="relative overflow-hidden py-16 md:py-24">
			<div className="container relative z-10 mx-auto px-4">
				<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
					<HeroContent />
					<HeroVisual />
				</div>
			</div>
		</section>
	);
}

function HeroContent() {
	return (
		<div className="flex flex-col space-y-8">
			<div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm">
				<span className="relative flex size-2">
					<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50" />
					<span className="relative inline-flex size-2 rounded-full bg-primary" />
				</span>

				<span className="font-medium text-primary">
					همه سرورها آنلاین
				</span>
			</div>

			<div className="space-y-4">
				<h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
					VPN که هرجا باشی،
					<br />
					<span className="text-primary">قطع نمی‌شه</span>
				</h1>

				<p className="max-w-md text-lg leading-relaxed text-muted-foreground">
					بدون افت سرعت، بدون ثبت لاگ. زیرساختی که وضعیتش را هر لحظه
					می‌بینی، نه فقط حرفش را می‌شنوی.
				</p>
			</div>

			<div className="flex flex-wrap gap-x-10 gap-y-4">
				<StatWithIcon icon={Shield} value="٪۹۹.۹" label="آپتایم" />

				<StatWithIcon icon={Zap} value="68ms" label="میانگین تاخیر" />

				<StatWithIcon icon={Award} value="+1" label="سرور فعال" />
			</div>

			<div className="flex flex-wrap items-center gap-3 pt-2">
				<Button
					size="lg"
					className="group bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 dark:shadow-primary/30"
					asChild>
					<Link href="/auth/register">
						<span className="flex items-center">
							شروع کنید
							<ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
						</span>
					</Link>
				</Button>

				<Button
					size="lg"
					variant="outline"
					className="border-border hover:border-primary hover:bg-primary/5"
					asChild>
					<Link href="#products">مشاهده پلن‌ها</Link>
				</Button>
			</div>
		</div>
	);
}

function StatWithIcon({
	icon: Icon,
	value,
	label,
}: {
	icon: typeof Shield;
	value: string;
	label: string;
}) {
	return (
		<div className="flex items-center gap-3">
			<div className="rounded-full bg-primary/10 p-2 text-primary">
				<Icon className="size-4" />
			</div>

			<div>
				<div className="text-lg font-bold leading-none">{value}</div>

				<div className="text-xs text-muted-foreground">{label}</div>
			</div>
		</div>
	);
}

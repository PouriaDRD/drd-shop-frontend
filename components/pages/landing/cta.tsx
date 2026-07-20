import Link from "next/link";

import { ArrowLeft, ShieldCheck, Zap } from "lucide-react";

import { Badge, Button } from "@/components/ui";

export function CTA() {
	return (
		<section className="py-28">
			<div
				className={`
				relative
				overflow-hidden
				rounded-[2.5rem]
				border
				bg-muted/30
				px-6
				py-20
				text-center
				sm:px-12`}>
				{/* background */}
				<div
					className={`
					pointer-events-none
					absolute
					left-1/2
					top-0
					-translate-x-1/2
					size-80
					rounded-full
					bg-primary/10
					blur-3xl`}
				/>

				<div className="relative mx-auto flex max-w-3xl flex-col items-center">
					<Badge
						variant="secondary"
						className="gap-2 rounded-full px-4 py-2">
						<ShieldCheck className="size-4" />
						امن، سریع، بدون محدودیت
					</Badge>

					<h2 className="mt-8 text-4xl font-black tracking-tight sm:text-5xl">
						آزادانه وصل شو،
						<br />
						بدون نگرانی
					</h2>

					<p
						className={`
						mt-6
						max-w-xl
						text-base
						leading-8
						text-muted-foreground
						`}>
						در چند دقیقه ثبت‌نام کن و به شبکه‌ای سریع، پایدار و امن
						متصل شو.
					</p>

					<div className="mt-10 flex flex-wrap justify-center gap-3">
						<Button size="lg" className="h-12 rounded-xl" asChild>
							<Link href="/auth/register">
								شروع استفاده
								<ArrowLeft className="mr-2 size-4" />
							</Link>
						</Button>

						<Button
							size="lg"
							variant="outline"
							className="h-12 rounded-xl"
							asChild>
							<Link href="#products">مشاهده پلن‌ها</Link>
						</Button>
					</div>

					<div
						className={`
						mt-10
						flex
						flex-wrap
						justify-center
						gap-6
						text-sm
						text-muted-foreground
						`}>
						<span className="flex items-center gap-2">
							<Zap
								className="
								size-4
								"
							/>
							فعال‌سازی فوری
						</span>

						<span
							className="
							flex
							items-center
							gap-2
							">
							<ShieldCheck
								className="
								size-4
								"
							/>
							پرداخت امن
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}

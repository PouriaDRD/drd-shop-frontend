import Link from "next/link";

import { ArrowLeft, ShieldCheck } from "lucide-react";

import { Badge, Button } from "@/components/ui";

export function CTA() {
	return (
		<section className="py-16 md:py-20">
			<div className="flex flex-col items-center rounded-3xl px-8 py-16 text-center">
				<Badge
					variant="secondary"
					className="mb-6 gap-2 rounded-full px-4 py-1.5">
					<ShieldCheck className="size-3.5" />
					بدون لاگ • بدون محدودیت
				</Badge>

				<h2 className="max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
					اینترنت آزاد،
					<br />
					بدون دردسر.
				</h2>

				<p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
					در کمتر از چند دقیقه ثبت‌نام کن و به سریع‌ترین سرورهای ما
					متصل شو. بدون تنظیمات پیچیده، بدون محدودیت.
				</p>

				<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
					<Button size="lg" asChild>
						<Link href="/auth/register">
							شروع رایگان
							<ArrowLeft className="mr-2 size-4" />
						</Link>
					</Button>

					<Button variant="ghost" size="lg" asChild>
						<Link href="#pricing">مشاهده پلن‌ها</Link>
					</Button>
				</div>

				<p className="mt-8 text-sm text-muted-foreground">
					فعال‌سازی آنی • پشتیبانی ۲۴ ساعته • پرداخت امن
				</p>
			</div>
		</section>
	);
}

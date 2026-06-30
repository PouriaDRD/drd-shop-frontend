import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { liveServers } from "./landing.data";
import { NetworkReadout } from "./network-readout";

export function Hero() {
	const serverNum = liveServers.length;

	return (
		<section className="relative overflow-hidden bg-background">
			<div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
				<div>
					<div
						className={`mb-5 inline-flex items-center gap-2 rounded-full border
						bg-white dark:bg-card px-3 py-1 text-[11px] text-muted-foreground`}>
						<span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
						+{serverNum} سرور آنلاین در همین لحظه
					</div>

					<h1 className="text-[34px] font-medium leading-[1.35] tracking-tight text-foreground sm:text-[44px]">
						وی پی انی که هرجا باشی،
						<br />
						<span className="text-foreground">قطع نمی‌شود.</span>
					</h1>

					<p className="mt-5 max-w-md text-[15px] leading-7 text-muted-foreground">
						بدون افت سرعت، بدون ثبت لاگ، با زیرساختی که وضعیتش را هر
						لحظه می‌توانی ببینی، نه فقط حرفش را بشنوی.
					</p>

					<div className="mt-8 flex flex-wrap items-center gap-3">
						<Link
							href="/auth/register"
							className={`group inline-flex items-center gap-2
							rounded-lg bg-foreground
							px-5 py-3 text-sm text-background
							transition-opacity hover:opacity-90`}>
							شروع ثبت نام
							<ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
						</Link>
						<Link
							href="#pricing"
							className={`inline-flex items-center rounded-lg
							border px-5 py-3 text-sm text-foreground
							transition-colors hover:bg-foreground/3`}>
							مشاهده پلن‌ها
						</Link>
					</div>

					{/* <p className="mt-4 text-xs text-[#9A9C9F]">
						بدون نیاز به کارت بانکی برای شروع آزمایشی
					</p> */}
				</div>

				<div>
					<NetworkReadout />
				</div>
			</div>
		</section>
	);
}

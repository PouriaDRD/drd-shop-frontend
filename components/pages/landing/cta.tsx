import Link from "next/link";

import { ArrowLeft } from "lucide-react";

export function CTA() {
	return (
		<section className="border-t bg-[#15171A]">
			<div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-16 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h2 className="text-2xl font-medium tracking-tight text-[#FAFAF8] sm:text-[28px]">
						همین حالا متصل شو
					</h2>
					<p className="mt-2 max-w-sm text-sm leading-7 text-[#9CA0A6]">
						به دنیای آزاد و بدون محدودیت
					</p>
				</div>
				<Link
					href="/auth/register"
					className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#FAFAF8] px-6 py-3 text-sm text-[#15171A] transition-opacity hover:opacity-90">
					شروع رایگان
					<ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
				</Link>
			</div>
		</section>
	);
}

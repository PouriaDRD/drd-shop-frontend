import Link from "next/link";

import {
	BALE_LINK,
	INSTAGRAM_LINK,
	TELEGRAM_LINK,
} from "@/features/shared/constants";

import { AppIcon } from "../icons";
import { navLinks } from "../pages/landing/landing.data";

export function Footer() {
	return (
		<footer className="bg-[#15171A]">
			<div className="mx-auto max-w-6xl px-5 py-12">
				<div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
					<div>
						<Link href="/" className="flex items-center gap-2">
							<span className="flex h-7 w-7 items-center justify-center rounded-lg">
								<AppIcon />
							</span>
							<span className="text-sm font-medium text-[#FAFAF8]">
								دی‌آردی وی‌پی‌ان
							</span>
						</Link>
						<p className="mt-3 max-w-xs text-xs leading-6 text-[#7A7D82]">
							اینترنت آزاد و امن، با زیرساختی که وضعیتش شفاف است.
						</p>
					</div>

					<div className="flex gap-12">
						<div>
							<p className="mb-3 text-xs text-[#7A7D82]">محصول</p>
							<ul className="flex flex-col gap-2">
								{navLinks.map((link) => (
									<li key={link.href}>
										<a
											href={link.href}
											className="text-xs text-[#9CA0A6] hover:text-[#FAFAF8]">
											{link.label}
										</a>
									</li>
								))}
							</ul>
						</div>
						<div>
							<p className="mb-3 text-xs text-[#7A7D82]">
								پشتیبانی
							</p>
							<ul className="flex flex-col gap-2">
								<li>
									<Link
										href={TELEGRAM_LINK}
										target="_blank"
										className="text-xs text-[#9CA0A6] hover:text-[#FAFAF8]">
										تلگرام
									</Link>
								</li>
								<li>
									<Link
										href={BALE_LINK}
										target="_blank"
										className="text-xs text-[#9CA0A6] hover:text-[#FAFAF8]">
										بله
									</Link>
								</li>
								<li>
									<Link
										href={INSTAGRAM_LINK}
										target="_blank"
										className="text-xs text-[#9CA0A6] hover:text-[#FAFAF8]">
										اینستاگرام
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="mt-10 border-t border-white/8 pt-6 text-center text-xs text-[#7A7D82]">
					© {new Date().getFullYear()} دی‌آردی وی‌پی‌ان. تمامی حقوق
					محفوظ است.
				</div>
			</div>
		</footer>
	);
}

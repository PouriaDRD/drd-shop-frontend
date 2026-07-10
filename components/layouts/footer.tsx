import Link from "next/link";

import { ArrowUpLeft, MessageCircle, Send } from "lucide-react";

import {
	BALE_LINK,
	INSTAGRAM_LINK,
	TELEGRAM_LINK,
} from "@/features/shared/constants";

import { InstagramIcon } from "../icons";
import AppLogo from "../icons/app-logo";
import { navLinks } from "../pages/landing/landing.data";
import { Button, Card, CardContent, Separator } from "../ui";

export function Footer() {
	return (
		<footer className="border-t bg-background">
			<Card className="rounded-none border-0 bg-transparent shadow-none">
				<CardContent className="container mx-auto space-y-12 px-6 py-14">
					<div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
						{/* Brand */}
						<div className="space-y-6">
							<Link href="/" className="inline-flex">
								<AppLogo className="flex-row-reverse" />
							</Link>

							<p className="max-w-md leading-8 text-muted-foreground">
								اینترنت آزاد، سریع و امن با زیرساختی پایدار و
								سرورهای پرسرعت در نقاط مختلف جهان. همیشه متصل
								بمانید، بدون محدودیت.
							</p>

							<div className="flex flex-wrap gap-3">
								<div className="rounded-full border bg-muted/40 px-4 py-2 text-sm">
									⚡ اتصال پایدار
								</div>

								<div className="rounded-full border bg-muted/40 px-4 py-2 text-sm">
									🛡 امنیت بالا
								</div>

								<div className="rounded-full border bg-muted/40 px-4 py-2 text-sm">
									🌍 سرورهای جهانی
								</div>
							</div>
						</div>

						{/* Navigation */}
						<div>
							<h3 className="mb-5 font-semibold">دسترسی سریع</h3>

							<nav className="space-y-2">
								{navLinks.map((link) => (
									<Link
										key={link.href}
										href={link.href as "/"}
										className="group flex items-center justify-between rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground">
										<span>{link.label}</span>

										<ArrowUpLeft className="size-4 opacity-0 transition-all group-hover:opacity-100" />
									</Link>
								))}
							</nav>
						</div>

						{/* Social */}
						<div className="space-y-5">
							<div>
								<h3 className="font-semibold">ارتباط با ما</h3>

								<p className="mt-2 text-sm leading-6 text-muted-foreground">
									از طریق شبکه‌های اجتماعی با ما در ارتباط
									باشید و آخرین اخبار و بروزرسانی‌ها را دنبال
									کنید.
								</p>
							</div>

							<div className="flex gap-3">
								<Button
									variant="outline"
									size="icon"
									className="size-11 rounded-xl"
									asChild>
									<Link href={TELEGRAM_LINK} target="_blank">
										<Send className="size-5" />
									</Link>
								</Button>

								<Button
									variant="outline"
									size="icon"
									className="size-11 rounded-xl"
									asChild>
									<Link href={BALE_LINK} target="_blank">
										<MessageCircle className="size-5" />
									</Link>
								</Button>

								<Button
									variant="outline"
									size="icon"
									className="size-11 rounded-xl"
									asChild>
									<Link href={INSTAGRAM_LINK} target="_blank">
										<InstagramIcon className="size-5" />
									</Link>
								</Button>
							</div>
						</div>
					</div>

					<Separator />

					<div className="flex flex-col-reverse items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
						<p>
							© {new Date().getFullYear()} DRD Shop — تمامی حقوق
							این وب‌سایت محفوظ است.
						</p>

						<div className="flex items-center gap-2">
							<span className="size-2 rounded-full bg-emerald-500" />

							<span>ساخته شده با ❤️ برای اینترنت آزاد</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</footer>
	);
}

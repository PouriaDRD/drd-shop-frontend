import { Route } from "next";
import Link from "next/link";

import {
	ArrowUpLeft,
	LucideIcon,
	MessageCircle,
	Send,
	ShieldCheck,
	Zap,
} from "lucide-react";

import { InstagramIcon } from "@/components/icons";
import { Button, Separator } from "@/components/ui";
import {
	BALE_LINK,
	INSTAGRAM_LINK,
	TELEGRAM_LINK,
} from "@/features/shared/constants";

import AppLogo from "../icons/app-logo";

import { LANDING_LINKS } from "./navigation/links.nav";

export function Footer() {
	return (
		<footer className="border-t">
			<div className="mx-auto max-w-7xl px-4 py-16">
				<div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
					{/* Brand */}

					<div className="space-y-6">
						<Link href="/" className="inline-flex">
							<AppLogo />
						</Link>

						<p className="max-w-md text-sm leading-8 text-muted-foreground">
							اتصال سریع، امن و پایدار با سرورهای جهانی. همیشه
							آنلاین بمانید.
						</p>

						<div className="flex flex-wrap gap-3">
							<StatusBadge icon={Zap} text="اتصال پایدار" />

							<StatusBadge icon={ShieldCheck} text="امنیت بالا" />
						</div>
					</div>

					{/* Links */}

					<div>
						<h3 className="font-semibold">دسترسی سریع</h3>

						<nav className="mt-5 space-y-2">
							{LANDING_LINKS.map((link) => (
								<Link
									key={link.href}
									href={link.href as "/"}
									className={`
										group
										flex
										items-center
										justify-between
										rounded-xl
										px-3
										py-2
										text-sm
										text-muted-foreground
										transition-colors
										hover:bg-muted
										hover:text-foreground`}>
									<span>{link.label}</span>

									<ArrowUpLeft className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
								</Link>
							))}
						</nav>
					</div>

					{/* Social */}

					<div>
						<h3 className="font-semibold">ارتباط با ما</h3>

						<p className="mt-4 text-sm leading-7 text-muted-foreground">
							اخبار و وضعیت سرویس را از شبکه‌های اجتماعی دنبال
							کنید.
						</p>

						<div className=" mt-6 flex gap-3">
							<SocialButton href={TELEGRAM_LINK}>
								<Send />
							</SocialButton>

							<SocialButton href={BALE_LINK}>
								<MessageCircle />
							</SocialButton>

							<SocialButton href={INSTAGRAM_LINK}>
								<InstagramIcon />
							</SocialButton>
						</div>
					</div>
				</div>

				<Separator className="my-10" />

				<div
					className={`
					flex
					flex-col-reverse
					gap-4
					text-sm
					text-muted-foreground
					md:flex-row
					md:items-center
					md:justify-between`}>
					<p>
						© {new Date().getFullYear()} DRD Shop تمامی حقوق محفوظ
						است.
					</p>

					<div className="flex items-center gap-2">
						<span className=" size-2 rounded-full bg-emerald-500 animate-pulse" />
						سرویس‌ها فعال هستند
					</div>
				</div>
			</div>
		</footer>
	);
}

function StatusBadge({
	icon: Icon,

	text,
}: {
	icon: LucideIcon;

	text: string;
}) {
	return (
		<div
			className={`
			flex
			items-center
			gap-2
			rounded-full
			border
			bg-muted/40
			px-4
			py-2
			text-xs`}>
			<Icon className="size-3.5" />

			{text}
		</div>
	);
}

function SocialButton({
	href,

	children,
}: {
	href: Route;

	children: React.ReactNode;
}) {
	return (
		<Button
			size="icon"
			variant="outline"
			className="size-11 rounded-xl"
			asChild>
			<Link href={href} target="_blank">
				{children}
			</Link>
		</Button>
	);
}

import Link from "next/link";

import { MessageCircle, Send } from "lucide-react";

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
		<footer>
			<Card className="rounded-none ring-0 border-0">
				<CardContent className="space-y-10 p-8">
					<div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
						{/* Brand */}
						<div className="space-y-4">
							<Link href="/" className="inline-flex">
								<AppLogo
									text="DRD Shop"
									className="flex-row-reverse"
								/>
							</Link>

							<p className="max-w-sm text-sm leading-7 text-muted-foreground">
								اینترنت آزاد، سریع و امن با زیرساختی شفاف و
								پایدار. متصل بمانید، بدون محدودیت.
							</p>
						</div>

						{/* Navigation */}
						<div>
							<h3 className="mb-4 text-sm font-semibold">
								دسترسی سریع
							</h3>

							<nav className="flex flex-col gap-3">
								{navLinks.map((link) => (
									<Link
										key={link.href}
										href={link.href as "/"}
										className="text-sm text-muted-foreground transition-colors hover:text-foreground">
										{link.label}
									</Link>
								))}
							</nav>
						</div>

						{/* Social */}
						<div>
							<h3 className="mb-4 text-sm font-semibold">
								ارتباط با ما
							</h3>

							<div className="flex gap-2">
								<Button variant="outline" size="icon" asChild>
									<Link href={TELEGRAM_LINK} target="_blank">
										<Send className="size-4" />
									</Link>
								</Button>

								<Button variant="outline" size="icon" asChild>
									<Link href={BALE_LINK} target="_blank">
										<MessageCircle className="size-4" />
									</Link>
								</Button>

								<Button variant="outline" size="icon" asChild>
									<Link href={INSTAGRAM_LINK} target="_blank">
										<InstagramIcon className="size-4" />
									</Link>
								</Button>
							</div>
						</div>
					</div>

					<Separator />

					<div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
						<p>
							© {new Date().getFullYear()} DRD Shop. تمامی حقوق
							محفوظ است.
						</p>

						<p dir="ltr">Made with ❤️ for a free internet.</p>
					</div>
				</CardContent>
			</Card>
		</footer>
	);
}

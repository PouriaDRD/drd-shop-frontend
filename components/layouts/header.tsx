"use client";

import { useState } from "react";

import Link from "next/link";

import { Menu, X } from "lucide-react";

import { ThemeSwitcher } from "@/features/preferences/components";

import AppLogo from "../icons/app-logo";
import { navLinks } from "../pages/landing/landing.data";
import { Button } from "../ui";

export function Header() {
	const [open, setOpen] = useState(false);

	return (
		<header
			className={`sticky top-0 z-50 border-b 
			border-b/6 bg-background/95 backdrop-blur-2xl 
			supports-backdrop-filter:bg-background/95`}>
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-2">
				<Link href="/" className="flex items-center gap-2">
					<AppLogo
						text="دی‌آردی وی‌پی‌ان"
						className="flex-row-reverse"
					/>
				</Link>

				<nav className="hidden items-center gap-8 md:flex">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href as "/"}
							className="text-sm text-muted-foreground transition-colors hover:text-foreground">
							{link.label}
						</Link>
					))}
				</nav>

				<div className="hidden items-center gap-3 md:flex">
					<ThemeSwitcher />

					<Link
						href="/auth/login"
						className="rounded-lg px-4 py-2 text-sm text-foreground transition-colors hover:bg-foreground/5">
						ورود
					</Link>
					<Link
						href="/auth/register"
						className="rounded-lg bg-foreground px-4 py-2 text-sm text-background transition-opacity hover:opacity-90">
						ثبت نام
					</Link>
				</div>

				<div className="md:hidden flex items-center gap-2">
					<ThemeSwitcher size={"icon-sm"} variant={"outline"} />

					<Button
						variant={"ghost"}
						size={"icon-xs"}
						onClick={() => setOpen((v) => !v)}
						aria-label={open ? "بستن منو" : "باز کردن منو"}>
						{open ? (
							<X className="size-full" />
						) : (
							<Menu className="size-full" />
						)}
					</Button>
				</div>
			</div>

			{open && (
				<div className="border-t bg-background px-5 py-4 md:hidden">
					<nav className="flex flex-col gap-1">
						{navLinks.map((link) => (
							<a
								key={link.href}
								href={link.href}
								onClick={() => setOpen(false)}
								className="rounded-lg px-3 py-2.5 text-sm text-foreground hover:bg-foreground/5">
								{link.label}
							</a>
						))}
					</nav>
					<div className="mt-3 flex flex-col gap-2 border-t pt-3">
						<Link
							href="/auth/login"
							className="rounded-lg px-3 py-2.5 text-center text-sm text-foreground hover:bg-foreground/5">
							ورود
						</Link>
						<Link
							href="/auth/register"
							className="rounded-lg bg-foreground px-3 py-2.5 text-center text-sm text-background hover:opacity-90">
							ثبت نام
						</Link>
					</div>
				</div>
			)}
		</header>
	);
}

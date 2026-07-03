"use client";

import Link from "next/link";

import { Menu } from "lucide-react";

import { ThemeSwitcher } from "@/features/preferences/components";
import { AppVersion } from "@/features/shared/components";
import { CartButton } from "@/features/shop/components/cart";

import AppLogo from "../icons/app-logo";
import { navLinks } from "../pages/landing/landing.data";
import {
	Button,
	Separator,
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui";

export function Header() {
	return (
		<header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl w-full mx-auto max-w-6xl px-4">
			<div className="flex flex-row-reverse h-18 items-center justify-between w-full">
				<div className="flex items-center gap-3 md:gap-4">
					<CartButton />
					<ThemeSwitcher />
					<HeaderLogo />
				</div>
				<HeaderNav />

				<HeaderActions />

				<MobileMenu />
			</div>
		</header>
	);
}
export function HeaderLogo() {
	return (
		<div className="flex flex-row items-center justify-center gap-4">
			<Link href="/" className="shrink-0">
				<AppLogo hideLogoTextOnMobile />
			</Link>
		</div>
	);
}

export function HeaderNav() {
	return (
		<nav className="hidden items-center gap-2 md:flex">
			{navLinks.map((link) => (
				<Link
					key={link.href}
					href={link.href as "/"}
					className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
					{link.label}
				</Link>
			))}
		</nav>
	);
}

export function HeaderActions() {
	return (
		<div className="hidden items-center gap-2 md:flex flex-row-reverse">
			<Button variant="ghost" asChild>
				<Link href="/auth/login">ورود</Link>
			</Button>

			<Button asChild>
				<Link href="/auth/register">ثبت نام</Link>
			</Button>
		</div>
	);
}

export function MobileMenu() {
	return (
		<div className="flex items-center gap-2 md:hidden">
			<Sheet>
				<SheetTrigger asChild>
					<Button size="icon" variant="ghost">
						<Menu className="size-5" />
					</Button>
				</SheetTrigger>

				<SheetContent side="right" className="flex w-75 flex-col">
					<SheetHeader className="px-4 py-3.5">
						<SheetTitle className="flex flex-row items-center justify-start">
							<HeaderLogo />
						</SheetTitle>
					</SheetHeader>

					<Separator className="my-2" />

					<nav className="flex flex-1 flex-col gap-2 px-2">
						{navLinks.map((link) => (
							<Button
								key={link.href}
								variant="ghost"
								className="justify-start"
								asChild>
								<Link href={link.href as "/"}>
									{link.label}
								</Link>
							</Button>
						))}
					</nav>

					<Separator className="my-6" />

					<SheetFooter className="gap-6">
						<div className="flex flex-col gap-3">
							<Button variant="outline" asChild>
								<Link href="/auth/login">ورود</Link>
							</Button>

							<Button asChild>
								<Link href="/auth/register">ثبت نام</Link>
							</Button>
						</div>

						<AppVersion />
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	);
}

"use client";

import { Activity } from "react";

import Link from "next/link";

import { Menu, XIcon } from "lucide-react";

import { ThemeSwitcher } from "@/features/preferences/components";
import { AppVersion } from "@/features/shared/components";
import { CartButton } from "@/features/shop/components/cart";
import { useUser } from "@/features/user/context";

import AppLogo from "../icons/app-logo";
import {
	Button,
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui";

import { LANDING_LINKS } from "./navigation/links.nav";

export function Header() {
	const { isAuthenticated } = useUser();

	return (
		<div className="sticky top-5 z-50 px-4">
			<header
				className={`mx-auto flex h-16 w-full max-w-7xl
				items-center justify-between rounded-2xl border
				bg-background/85 px-4 md:px-6 backdrop-blur-2xl`}>
				<div className="hidden items-center gap-2 md:flex">
					<HeaderActions isAuthenticated={isAuthenticated} />

					<CartButton />

					<ThemeSwitcher />
				</div>

				<HeaderNav />

				<div className="flex items-center gap-0.5 md:hidden">
					<MobileMenu isAuthenticated={isAuthenticated} />

					<ThemeSwitcher variant={"ghost"} />
				</div>

				<div className="flex items-center gap-2 md:gap-3">
					<div className="md:hidden">
						<CartButton variant={"ghost"} />
					</div>
					<HeaderLogo />
				</div>
			</header>
		</div>
	);
}

function HeaderLogo() {
	return (
		<Link href="/" className="shrink-0">
			<AppLogo hideLogoTextOnMobile />
		</Link>
	);
}

function HeaderNav() {
	return (
		<nav className="hidden items-center rounded-full border bg-muted/40 p-1 md:flex">
			{LANDING_LINKS.map((item) => (
				<Link key={item.href} href={item.href as "/"}>
					<Button variant="ghost" className="rounded-full px-5">
						{item.label}
					</Button>
				</Link>
			))}
		</nav>
	);
}

function HeaderActions({ isAuthenticated }: { isAuthenticated: boolean }) {
	return (
		<>
			<Activity mode={isAuthenticated ? "visible" : "hidden"}>
				<Link href="/panel/dashboard">
					<Button>ورود به پنل</Button>
				</Link>
			</Activity>

			<Activity mode={isAuthenticated ? "hidden" : "visible"}>
				<Link href="/auth/login">
					<Button>ورود | ثبت‌نام</Button>
				</Link>
			</Activity>
		</>
	);
}

function MobileMenu({ isAuthenticated }: { isAuthenticated: boolean }) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="icon" variant="ghost" className="rounded-xl">
					<Menu className="size-5" />
				</Button>
			</SheetTrigger>

			<SheetContent showCloseButton={false} className="w-80">
				<SheetHeader className="w-full px-4">
					<SheetTitle className="flex items-center justify-between">
						<HeaderLogo />

						<SheetTrigger asChild>
							<Button size={"icon-sm"} variant={"ghost"}>
								<XIcon />
							</Button>
						</SheetTrigger>
					</SheetTitle>
				</SheetHeader>

				<nav className="flex flex-col gap-2 py-4 px-1">
					{LANDING_LINKS.map((item) => (
						<SheetTrigger key={item.href} asChild>
							<Link href={item.href as "/"}>
								<Button
									variant="ghost"
									className="w-full justify-start rounded-xl">
									{item.label}
								</Button>
							</Link>
						</SheetTrigger>
					))}
				</nav>

				<SheetFooter className="mt-auto w-full">
					<div className="flex flex-col items-center gap-3 w-full">
						<Activity mode={isAuthenticated ? "hidden" : "visible"}>
							<Link href="/auth/login" className="w-full">
								<Button variant="outline" className="w-full">
									ورود
								</Button>
							</Link>

							<Link href="/auth/register" className="w-full">
								<Button className="w-full">ثبت نام</Button>
							</Link>
						</Activity>

						<Activity mode={isAuthenticated ? "visible" : "hidden"}>
							<Link href="/panel/dashboard" className="w-full">
								<Button className="w-full" variant={"outline"}>
									ورود به پنل
								</Button>
							</Link>
						</Activity>

						<AppVersion />
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

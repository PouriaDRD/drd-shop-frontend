"use client";

import Link from "next/link";

import { HeadsetIcon } from "lucide-react";

import { MyNotificationsButton } from "@/features/notifications/components/my-notifications-button";
import { ThemeSwitcher } from "@/features/preferences/components";
import { CartButton } from "@/features/shop/components/cart";

import AppLogo from "../icons/app-logo";
import { Button } from "../ui";

export function PanelHeader() {
	return (
		<header
			className={`bg-background md:bg-sidebar sticky top-0 z-50 
        	flex items-center justify-between gap-4
			border-b backdrop-blur-2xl px-4 py-2.5`}>
			<div className="flex items-center gap-4">
				<ThemeSwitcher />
				<CartButton />
				<MyNotificationsButton />
				<Link href={"/panel/support"}>
					<Button variant={"outline"} size={"icon-sm"}>
						<HeadsetIcon />
					</Button>
				</Link>
			</div>
			<Link href={"/"}>
				<AppLogo />
			</Link>
		</header>
	);
}

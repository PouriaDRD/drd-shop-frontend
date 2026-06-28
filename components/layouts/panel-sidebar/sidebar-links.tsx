"use client";

import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
	HeadsetIcon,
	LayoutDashboard,
	LucideIcon,
	ShoppingBagIcon,
	WalletIcon,
} from "lucide-react";

import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui";
import { isLinkActive } from "@/features/shared/utils";
import { User, UserRole } from "@/features/user/types";

export default function SidebarLinks({ user }: NavGroupProps) {
	const allowedItems = SIDEBAR_NAV_ITEMS.filter((item) => {
		// No allowedRoles = accessible to all
		if (!item.allowedRoles) return true;

		return item.allowedRoles.includes(user.role);
	});

	return (
		<SidebarMenu>
			{allowedItems.map((item) => (
				<SidebarLink item={item} key={item.href} />
			))}
		</SidebarMenu>
	);
}

type SidebarItem = {
	name: string;
	href: Route;
	Icon?: LucideIcon;
	allowedRoles?: UserRole[];
};

const SIDEBAR_NAV_ITEMS: SidebarItem[] = [
	{
		name: "داشبورد",
		href: "/panel/dashboard",
		Icon: LayoutDashboard,
		allowedRoles: ["admin", "superuser", "user"],
	},
	{
		name: "بازارچه",
		href: "/panel/bazaar",
		Icon: ShoppingBagIcon,
		allowedRoles: ["admin", "superuser", "user"],
	},
	{
		name: "مالی",
		href: "/panel/finance",
		Icon: WalletIcon,
		allowedRoles: ["admin", "superuser", "user"],
	},
	{
		name: "پشتیبانی",
		href: "/panel/support",
		Icon: HeadsetIcon,
		allowedRoles: ["admin", "superuser", "user"],
	},
];

interface NavGroupProps {
	user: User;
}

interface SidebarLinkProps {
	item: SidebarItem;
}

function SidebarLink({ item }: SidebarLinkProps) {
	const pathname = usePathname();

	const active = isLinkActive(pathname, item.href);

	const Icon = item.Icon;

	return (
		<SidebarMenuItem>
			<SidebarMenuButton
				asChild
				isActive={active}
				className={`h-11 rounded-xl
					transition-all
					data-[active=true]:bg-primary/5
                    dark:data-[active=true]:bg-accent
					data-[active=true]:text-primary
                    dark:data-[active=true]:text-foreground
					hover:bg-accent`}>
				<Link href={item.href}>
					{Icon && <Icon className="size-4 shrink-0" />}
					<span>{item.name}</span>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}

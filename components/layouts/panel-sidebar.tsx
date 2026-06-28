"use client";

import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
	HeadsetIcon,
	LayoutDashboard,
	LucideIcon,
	PanelRightOpen,
	ShoppingBagIcon,
	WalletIcon,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
	useSidebar,
} from "@/components/ui";
import { AppVersion } from "@/features/shared/components";
import { isLinkActive } from "@/features/shared/utils";
import { useUser } from "@/features/user/context";
import { User, UserRole } from "@/features/user/types";

export default function PanelSidebar() {
	const { user } = useUser();

	return (
		<Sidebar side="right" collapsible="icon" className="border-l">
			<PanelSidebarHeader email={user?.email} />
			<SidebarContent>
				{/* User Panel */}
				<SidebarGroup>
					<SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
						منو
					</SidebarGroupLabel>

					<SidebarGroupContent className="mt-2">
						{user && <SidebarLinks user={user} />}
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="border-t p-4">
				<AppVersion />
			</SidebarFooter>
		</Sidebar>
	);
}

function PanelSidebarHeader({ email }: { email?: string }) {
	const { state } = useSidebar();

	return (
		<SidebarHeader
			className={`border-b 
            ${state == "expanded" ? "px-4" : "px-0"}`}>
			<div
				className={`flex items-center w-full 
                ${state == "expanded" ? "justify-between" : "justify-center"}`}>
				<div className="min-w-0">
					{state === "expanded" && (
						<>
							<h2 className="truncate font-bold">پنل کاربری</h2>

							<p className="truncate text-xs text-muted-foreground">
								{email}
							</p>
						</>
					)}
				</div>

				<SidebarTrigger>
					<PanelRightOpen />
				</SidebarTrigger>
			</div>
		</SidebarHeader>
	);
}
type SidebarItem = {
	name: string;
	href: Route;
	Icon?: LucideIcon;
	allowedRoles?: UserRole[];
};

export const SIDEBAR_NAV_ITEMS: SidebarItem[] = [
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

function SidebarLinks({ user }: NavGroupProps) {
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

import { Route } from "next";

import {
	LayoutDashboard,
	LucideIcon,
	ShoppingBag,
	ShoppingCart,
	WalletIcon,
} from "lucide-react";

import { UserRole } from "@/features/user/types";

export type NavigationLink = {
	name: string;
	href: Route;
	Icon?: LucideIcon;
	allowedRoles?: UserRole[];
};

export const SIDEBAR_LINKS: NavigationLink[] = [
	{
		name: "داشبورد",
		href: "/panel/dashboard",
		Icon: LayoutDashboard,
		allowedRoles: ["admin", "superuser", "user"],
	},
	{
		name: "مالی",
		href: "/panel/finance",
		Icon: WalletIcon,
		allowedRoles: ["admin", "superuser", "user"],
	},
	{
		name: "بازارچه",
		href: "/panel/bazaar",
		Icon: ShoppingCart,
		allowedRoles: ["admin", "superuser", "user"],
	},
	{
		name: "سفارشات",
		href: "/panel/orders",
		Icon: ShoppingBag,
		allowedRoles: ["admin", "superuser", "user"],
	},
];

export const MOBILE_LINKS: NavigationLink[] = [
	{
		name: "داشبورد",
		href: "/panel/dashboard",
		Icon: LayoutDashboard,
		allowedRoles: ["admin", "superuser", "user"],
	},
	{
		name: "مالی",
		href: "/panel/finance",
		Icon: WalletIcon,
		allowedRoles: ["admin", "superuser", "user"],
	},
	{
		name: "بازارچه",
		href: "/panel/bazaar",
		Icon: ShoppingCart,
		allowedRoles: ["admin", "superuser", "user"],
	},
	{
		name: "سفارشات",
		href: "/panel/orders",
		Icon: ShoppingBag,
		allowedRoles: ["admin", "superuser", "user"],
	},
];

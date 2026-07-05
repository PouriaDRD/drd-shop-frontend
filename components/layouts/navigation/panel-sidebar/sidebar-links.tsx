"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui";
import { isLinkActive } from "@/features/shared/utils";
import { User } from "@/features/user/types";

import { NavigationLink, SIDEBAR_LINKS } from "../links.nav";

interface Props {
	user: User;
}

export default function SidebarLinks({ user }: Props) {
	const allowedItems = SIDEBAR_LINKS.filter((item) => {
		// No allowedRoles = accessible to all
		if (!item.allowedRoles) return true;

		return item.allowedRoles.includes(user.role);
	});

	return (
		<SidebarMenu>
			{allowedItems.map((navigation) => (
				<SidebarLink
					key={navigation.href}
					href={navigation.href}
					Icon={navigation.Icon}
					name={navigation.name}
				/>
			))}
		</SidebarMenu>
	);
}

function SidebarLink({ href, Icon, name }: NavigationLink) {
	const pathname = usePathname();

	const isActive = isLinkActive(pathname, href);

	return (
		<SidebarMenuItem>
			<SidebarMenuButton
				asChild
				isActive={isActive}
				className={`h-11 rounded-xl
					transition-all
					data-[active=true]:bg-primary/5
                    dark:data-[active=true]:bg-accent
					data-[active=true]:text-primary
                    dark:data-[active=true]:text-foreground
					hover:bg-accent`}>
				<Link href={href}>
					{Icon && <Icon className="size-4 shrink-0" />}
					<span>{name}</span>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}

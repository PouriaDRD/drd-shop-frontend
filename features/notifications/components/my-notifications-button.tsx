"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { Bell, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/features/shared/utils";

import { useMyNotificationsQuery } from "../mutations/notifications.mutate";

export function MyNotificationsButton() {
	const { data, isLoading, isError } = useMyNotificationsQuery();

	const unreadCount = data?.success ? data.data.unread_count : 0;
	const hasUnread = unreadCount > 0;

	const disabled = isLoading || isError;

	return (
		<Link
			href={disabled ? "#" : "/panel/notifications"}
			onClick={(e) => disabled && e.preventDefault()}
			aria-disabled={disabled}
			tabIndex={disabled ? -1 : 0}>
			<Button
				variant="outline"
				size="icon-sm"
				disabled={disabled}
				className="relative">
				{isLoading ? (
					<LoaderCircle className="size-5 animate-spin" />
				) : (
					<motion.div
						animate={
							hasUnread
								? {
										rotate: [0, -18, 18, -14, 14, -8, 8, 0],
									}
								: {}
						}
						transition={{
							duration: 0.8,
							repeat: hasUnread ? Infinity : 0,
							repeatDelay: 2.5,
							ease: "easeInOut",
						}}>
						<Bell
							className={cn(
								"size-5",
								isError && "text-muted-foreground",
							)}
						/>
					</motion.div>
				)}

				{!disabled && hasUnread && (
					<>
						<span className="absolute right-1 top-1 flex size-2.5">
							<span
								className={`absolute inline-flex size-full animate-ping
                                rounded-full bg-primary opacity-75`}
							/>
							<span
								className={`relative inline-flex size-2.5
                                rounded-full bg-primary`}
							/>
						</span>

						<span
							className={`absolute -right-1 -top-1 flex min-h-5 min-w-5
                            items-center justify-center rounded-full bg-primary
                            px-1 text-[10px] font-semibold text-primary-foreground`}>
							{unreadCount > 99 ? "99+" : unreadCount}
						</span>
					</>
				)}
			</Button>
		</Link>
	);
}

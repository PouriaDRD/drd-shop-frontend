"use client";

import { useState } from "react";

import { cn } from "@/features/shared/utils";

import { useAnnouncementsQuery } from "../../mutations";

import { AnnouncementAlert } from "./announcement-alert";

export function AnnouncementsAlert({ className }: { className?: string }) {
	const { data, isLoading } = useAnnouncementsQuery();

	const [dismissed, setDismissed] = useState<string[]>([]);

	if (isLoading) {
		return null;
	}

	const announcements = data?.success ? data.data : [];

	const visibleAnnouncements = announcements.filter(
		(item) => !dismissed.includes(item.id),
	);

	if (!visibleAnnouncements.length) {
		return null;
	}

	return (
		<section className={cn("flex flex-col gap-2 w-full", className)}>
			{visibleAnnouncements.map((announcement) => (
				<AnnouncementAlert
					key={announcement.id}
					announcement={announcement}
					onDismiss={(id) => setDismissed((prev) => [...prev, id])}
				/>
			))}
		</section>
	);
}

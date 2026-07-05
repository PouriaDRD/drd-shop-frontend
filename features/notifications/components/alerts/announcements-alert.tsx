"use client";

import { useState } from "react";

import { useAnnouncementsQuery } from "../../mutations";

import { AnnouncementAlert } from "./announcement-alert";

export function AnnouncementsAlert() {
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
		<section className="flex flex-col gap-2">
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

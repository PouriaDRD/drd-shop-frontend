"use client";

import { useState } from "react";

import Link from "next/link";

import { CheckCircle2, Info, TriangleAlert, X, XCircle } from "lucide-react";

import {
	Alert,
	AlertAction,
	AlertDescription,
	AlertTitle,
	Button,
} from "@/components/ui";

import { useAnnouncementsQuery } from "../mutations";

const icons = {
	info: Info,
	success: CheckCircle2,
	warning: TriangleAlert,
	error: XCircle,
} as const;

const variants = {
	info: "default",
	success: "success",
	warning: "warning",
	error: "destructive",
} as const;

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

	if (visibleAnnouncements.length === 0) {
		return null;
	}

	return (
		<section className="flex flex-col gap-2 w-full">
			{visibleAnnouncements.map((announcement) => {
				const Icon = icons[announcement.type];

				return (
					<Alert
						key={announcement.id}
						variant={variants[announcement.type]}>
						<Icon className="size-4" />

						<div className="flex-1">
							<AlertTitle>{announcement.title}</AlertTitle>

							<AlertDescription>
								{announcement.description}
							</AlertDescription>

							{announcement.button_url && (
								<Link
									href={announcement.button_url as "/"}
									className="mt-3 inline-block text-sm font-medium underline underline-offset-4">
									{announcement.button_text}
								</Link>
							)}
						</div>

						<AlertAction>
							<Button
								size="icon"
								variant="ghost"
								onClick={() =>
									setDismissed((prev) => [
										...prev,
										announcement.id,
									])
								}>
								<X className="size-4" />
							</Button>
						</AlertAction>
					</Alert>
				);
			})}
		</section>
	);
}

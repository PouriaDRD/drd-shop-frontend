"use client";

import { X } from "lucide-react";

import { AlertAction, Button } from "@/components/ui";

import { Announcement } from "../../types";

import { AppAlert } from "./app-alert";

interface Props {
	announcement: Announcement;
	onDismiss?: (id: string) => void;
}

export function AnnouncementAlert({ announcement, onDismiss }: Props) {
	return (
		<AppAlert
			title={announcement.title}
			description={announcement.description}
			variant={announcement.type}
			action={
				announcement.button_url
					? {
							label: announcement.button_text ?? "مشاهده",
							href: announcement.button_url,
						}
					: undefined
			}
			endContent={
				<AlertAction>
					<Button
						size="icon"
						variant="ghost"
						onClick={() => onDismiss?.(announcement.id)}>
						<X className="size-4" />
					</Button>
				</AlertAction>
			}
		/>
	);
}

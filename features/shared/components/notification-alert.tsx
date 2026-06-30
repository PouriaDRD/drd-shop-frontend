"use client";

import { useState } from "react";

import { InfoIcon, XIcon } from "lucide-react";

import {
	Alert,
	AlertAction,
	AlertDescription,
	AlertTitle,
	Button,
} from "@/components/ui";

export function NotificationAlert() {
	const [dismissed, setDismissed] = useState<boolean>(false);

	const handleDismiss = () => {
		setDismissed(!dismissed);
	};

	return (
		<section
			id="notification-alert"
			className={`mx-auto max-w-6xl px-5 pt-16 
			${dismissed ? "hidden" : ""}`}>
			<Alert variant={"warning"}>
				<InfoIcon />
				<AlertTitle>توجه!</AlertTitle>
				<AlertDescription>
					سرور های مخصوص اینترنت ملی موجود شد! همین الان ثبت نام کنید
					و به جهان آزاد وصل شوید.
				</AlertDescription>
				<AlertAction
					className="flex items-center"
					onClick={handleDismiss}>
					<Button variant="ghost" size={"icon"}>
						<XIcon className="h-4 w-4" />
					</Button>
				</AlertAction>
			</Alert>
		</section>
	);
}

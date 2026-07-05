"use client";

import Link from "next/link";

import {
	CheckCircle2,
	Info,
	type LucideIcon,
	TriangleAlert,
	XCircle,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle, Button } from "@/components/ui";

export type AppAlertVariant = "info" | "success" | "warning" | "error";

const icons: Record<AppAlertVariant, LucideIcon> = {
	info: Info,
	success: CheckCircle2,
	warning: TriangleAlert,
	error: XCircle,
};

const variants = {
	info: "default",
	success: "success",
	warning: "warning",
	error: "destructive",
} as const;

interface Props {
	title: string;
	description: React.ReactNode;
	variant?: AppAlertVariant;

	action?: {
		label: string;
		href: string;
	};

	endContent?: React.ReactNode;

	className?: string;
}

export function AppAlert({
	title,
	description,
	variant = "info",
	action,
	endContent,
	className,
}: Props) {
	const Icon = icons[variant];

	return (
		<Alert variant={variants[variant]} className={className}>
			<Icon className="size-4 shrink-0" />

			<div className="flex-1">
				<AlertTitle>{title}</AlertTitle>

				<AlertDescription>{description}</AlertDescription>

				{action && (
					<Button asChild variant="link" className="mt-2 h-auto p-0">
						<Link href={action.href as "/"}>{action.label}</Link>
					</Button>
				)}
			</div>

			{endContent}
		</Alert>
	);
}

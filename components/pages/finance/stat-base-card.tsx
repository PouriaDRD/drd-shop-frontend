"use client";

import { Card, CardHeader } from "@/components/ui";

interface StatCardProps {
	label: string;
	value: string;
	value2?: string;
	accent?: boolean;
	small?: boolean;
}

export function StatBaseCard(props: StatCardProps) {
	const { label, value, value2, accent, small } = props;

	return (
		<Card className="px-2 py-4">
			<CardHeader>
				<p className="text-xs text-muted-foreground mb-1.5">{label}</p>
				<p
					className={[
						"font-medium",
						accent ? "text-primary text-2xl" : "text-foreground",
						small ? "text-sm" : "text-2xl",
					].join(" ")}>
					{value}
				</p>
				{value2 && (
					<span className="text-muted-foreground text-sm">
						{value2}
					</span>
				)}
			</CardHeader>
		</Card>
	);
}

import { cn } from "@/features/shared/utils";

interface SectionHeaderProps {
	eyebrow: string;
	title: string;
	description?: string;
	className?: string;
}

export function SectionHeader({
	eyebrow,
	title,
	description,
	className,
}: SectionHeaderProps) {
	return (
		<div className={cn("mb-12 max-w-lg", className)}>
			<p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground">
				{eyebrow}
			</p>
			<h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-[28px]">
				{title}
			</h2>
			{description && (
				<p className="mt-2 text-sm leading-6 text-muted-foreground">
					{description}
				</p>
			)}
		</div>
	);
}

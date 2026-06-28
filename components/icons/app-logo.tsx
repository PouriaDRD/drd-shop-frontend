import { cn } from "@/features/shared/utils";

import { AppIcon } from "./app-icon";

interface Props {
	className?: string;
}

function AppLogo({ className }: Props) {
	return (
		<div
			className={cn(
				"flex items-center justify-center text-center gap-2",
				className,
			)}>
			<span className="text-2xl font-bold text-center font-mono leading-relaxed">
				DRD Shop
			</span>
			<div className="size-8">
				<AppIcon className="size-full" />
			</div>
		</div>
	);
}

export default AppLogo;

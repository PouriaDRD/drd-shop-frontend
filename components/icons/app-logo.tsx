import { cn } from "@/features/shared/utils";

import { AppIcon } from "./app-icon";

interface Props {
	text?: string;
	className?: string;
}

function AppLogo({ className, text }: Props) {
	return (
		<div
			className={cn(
				"flex items-center justify-center text-center gap-2",
				className,
			)}>
			<span className="text-xl md:text-2xl font-bold text-center pt-1">
				{text || "DRD VPN"}
			</span>
			<div className="size-7 md:size-8">
				<AppIcon className="size-full" />
			</div>
		</div>
	);
}

export default AppLogo;

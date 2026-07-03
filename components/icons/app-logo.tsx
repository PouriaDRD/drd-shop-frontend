import { cn } from "@/features/shared/utils";

import { AppIcon } from "./app-icon";

interface Props {
	text?: string;
	className?: string;
	hideLogoText?: boolean;
	hideLogoTextOnMobile?: boolean;
}

function AppLogo({
	className,
	text,
	hideLogoText,
	hideLogoTextOnMobile,
}: Props) {
	return (
		<div
			className={cn(
				"flex items-center justify-center text-center gap-2",
				className,
			)}>
			{!hideLogoText && (
				<span
					className={`text-xl md:text-2xl font-bold text-center pt-1 
					${hideLogoTextOnMobile ? "hidden md:block" : ""}`}>
					{text || "DRD Shop"}
				</span>
			)}
			<div className="size-8 md:size-8">
				<AppIcon className="size-full" />
			</div>
		</div>
	);
}

export default AppLogo;

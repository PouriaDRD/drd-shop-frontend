"use client";

import { Activity } from "react";

import { cn } from "@/features/shared/utils";

import { AppIcon } from "./app-icon";

interface Props {
	text?: string;
	className?: string;
	hideLogoText?: boolean;
	hideLogoTextOnMobile?: boolean;
}

function AppLogo(props: Props) {
	const {
		className,
		text,
		hideLogoText,
		hideLogoTextOnMobile = true,
	} = props;
	return (
		<div
			className={cn(
				"flex items-center justify-center text-center gap-2",
				className,
			)}>
			<Activity mode={hideLogoText ? "hidden" : "visible"}>
				<span
					className={cn(
						"text-xl md:text-2xl text-center pt-1 font-bold",
						`${hideLogoTextOnMobile && "hidden md:block"}`,
					)}>
					{text || "DRD Shop"}
				</span>
			</Activity>
			<div className="size-8 md:size-8">
				<AppIcon className="size-full" />
			</div>
		</div>
	);
}

export default AppLogo;

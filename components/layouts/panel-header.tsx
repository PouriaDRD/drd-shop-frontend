import { ThemeSwitcher } from "@/features/preferences/components";

import AppLogo from "../icons/app-logo";

export function PanelHeader() {
	return (
		<header
			className={`bg-sidebar sticky top-0 z-50 
        	flex items-center justify-between gap-4
			border-b backdrop-blur-2xl px-4 py-2.5`}>
			<div className="flex items-center gap-4">
				<ThemeSwitcher />
			</div>
			<AppLogo />
		</header>
	);
}

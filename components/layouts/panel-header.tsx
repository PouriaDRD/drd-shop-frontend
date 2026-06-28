import { ThemeSwitcher } from "@/features/preferences/components";

import AppLogo from "../icons/app-logo";

export default function PanelHeader() {
	return (
		<header
			className={`bg-sidebar/95 sticky top-0 z-10 
        	flex items-center justify-between gap-4
			shadow backdrop-blur-2xl px-4 py-2.5`}>
			<div className="flex items-center gap-4">
				<ThemeSwitcher />
				{/* <LogoutAction /> */}
			</div>
			<AppLogo />
		</header>
	);
}

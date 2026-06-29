import { PropsWithChildren } from "react";

import {
	MobileNavigation,
	PanelHeader,
	PanelSidebar,
} from "@/components/layouts";
import { SidebarProvider } from "@/components/ui";

export default function PanelLayout({ children }: Readonly<PropsWithChildren>) {
	return (
		<SidebarProvider defaultOpen>
			<PanelSidebar />
			<div className="flex flex-col h-full w-full flex-1">
				<PanelHeader />

				<div className="flex-1 overflow-auto h-full">{children}</div>

				<MobileNavigation />
			</div>
		</SidebarProvider>
	);
}

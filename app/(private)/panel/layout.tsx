import { PropsWithChildren } from "react";

import { PanelHeader, PanelSidebar } from "@/components/layouts";
import { SidebarProvider } from "@/components/ui";
import { UserProvider } from "@/features/user/context";

function PanelLayout({ children }: Readonly<PropsWithChildren>) {
	return (
		<UserProvider>
			<SidebarProvider defaultOpen>
				<PanelSidebar />
				<div className="flex flex-col w-full h-dvh">
					<PanelHeader />
					<div className="flex-1 p-4 max-h-dvh overflow-y-auto">
						{children}
					</div>
				</div>
			</SidebarProvider>
		</UserProvider>
	);
}

export default PanelLayout;

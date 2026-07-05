import { PropsWithChildren } from "react";

import { Metadata } from "next";

import {
	MobileNavigation,
	PanelHeader,
	PanelSidebar,
} from "@/components/layouts";
import { SidebarProvider } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "تسویه سفارش",
		description: "تسویه سفارش با مالیات و پلن‌ها",
	};
}

export default function PanelLayout({ children }: Readonly<PropsWithChildren>) {
	return (
		<SidebarProvider defaultOpen>
			<PanelSidebar />
			<div className="flex flex-col w-full">
				<PanelHeader />

				<div className="overflow-auto flex-1">{children}</div>

				<MobileNavigation />
			</div>
		</SidebarProvider>
	);
}

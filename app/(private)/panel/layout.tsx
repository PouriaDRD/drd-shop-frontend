import { PropsWithChildren } from "react";

import { DashboardHeader } from "@/components/layouts";
import { UserProvider } from "@/features/user/context";

function PanelLayout({ children }: Readonly<PropsWithChildren>) {
	return (
		<UserProvider>
			<DashboardHeader />
			{children}
		</UserProvider>
	);
}

export default PanelLayout;

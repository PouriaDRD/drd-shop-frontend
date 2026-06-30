import { PropsWithChildren } from "react";

import { TooltipProvider } from "@/components/ui";
import { QCProvider } from "@/features/api/contexts";
import { UserProvider } from "@/features/user/context";

import AppToaster from "./app-toaster";

export function PanelProviders({ children }: PropsWithChildren) {
	return (
		<QCProvider>
			<AppToaster />
			<TooltipProvider>
				<UserProvider>{children}</UserProvider>
			</TooltipProvider>
		</QCProvider>
	);
}

import { PropsWithChildren } from "react";

import { ThemeProvider } from "next-themes";

import { TooltipProvider } from "@/components/ui";
import { QCProvider } from "@/features/api/contexts";
import { UserProvider } from "@/features/user/context";

import AppToaster from "./app-toaster";

function Providers({ children }: PropsWithChildren) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange>
			<AppToaster />
			<QCProvider>
				<TooltipProvider>
					<UserProvider>{children}</UserProvider>
				</TooltipProvider>
			</QCProvider>
		</ThemeProvider>
	);
}

export default Providers;

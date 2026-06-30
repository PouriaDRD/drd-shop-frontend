import { PropsWithChildren } from "react";

import { UserProvider } from "@/features/user/context";

export function PanelProviders({ children }: PropsWithChildren) {
	return <UserProvider>{children}</UserProvider>;
}

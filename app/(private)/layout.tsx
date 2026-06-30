import { PropsWithChildren } from "react";

import { PanelProviders } from "@/features/shared/contexts";

export default function Layout({ children }: Readonly<PropsWithChildren>) {
	return <PanelProviders>{children} </PanelProviders>;
}

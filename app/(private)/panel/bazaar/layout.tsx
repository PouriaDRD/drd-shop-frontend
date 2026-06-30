import { Fragment, PropsWithChildren } from "react";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "بازارچه",
		description: "بازارچه در دی‌آردی وی‌پی‌ان",
	};
}

function BazaarLayout({ children }: Readonly<PropsWithChildren>) {
	return <Fragment>{children}</Fragment>;
}

export default BazaarLayout;

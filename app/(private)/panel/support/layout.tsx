import { Fragment, PropsWithChildren } from "react";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "پشتیبانی",
		description: "پشتیبانی ویژه دی‌آردی وی‌پی‌ان",
	};
}

function SupportLayout({ children }: Readonly<PropsWithChildren>) {
	return <Fragment>{children}</Fragment>;
}

export default SupportLayout;

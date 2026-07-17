import { Fragment, PropsWithChildren } from "react";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "سرویس‌های‌من",
		description: "سرویس‌های‌من در دی‌آردی شاپ",
	};
}

function ServicesLayout({ children }: Readonly<PropsWithChildren>) {
	return <Fragment>{children}</Fragment>;
}

export default ServicesLayout;

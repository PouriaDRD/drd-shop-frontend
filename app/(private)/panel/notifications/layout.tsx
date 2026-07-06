import { Fragment, PropsWithChildren } from "react";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "اعلانات",
		description: "اعلانات در دی‌آردی شاپ",
	};
}

export default function NotificationsLayout({
	children,
}: Readonly<PropsWithChildren>) {
	return <Fragment>{children}</Fragment>;
}

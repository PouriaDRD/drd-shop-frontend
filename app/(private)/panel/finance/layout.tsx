import { Fragment, PropsWithChildren } from "react";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "مالی",
		description: "مدیریت مالی در دی‌آردی شاپ",
	};
}

function FinanceLayout({ children }: Readonly<PropsWithChildren>) {
	return <Fragment>{children}</Fragment>;
}

export default FinanceLayout;

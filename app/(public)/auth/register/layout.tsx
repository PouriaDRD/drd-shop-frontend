import { Fragment, PropsWithChildren } from "react";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "قبت نام",
		description: "ثبت نام در دی‌آردی شاپ",
	};
}

function RegisterLayout({ children }: Readonly<PropsWithChildren>) {
	return <Fragment>{children}</Fragment>;
}

export default RegisterLayout;

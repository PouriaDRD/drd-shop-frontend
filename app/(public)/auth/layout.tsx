import { Fragment, PropsWithChildren } from "react";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "ورود",
		description: "ورود به حساب کاربری",
	};
}

function AuthLayout({ children }: Readonly<PropsWithChildren>) {
	return <Fragment>{children}</Fragment>;
}

export default AuthLayout;

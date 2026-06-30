import { Fragment, PropsWithChildren } from "react";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "ورود با کد",
		description: "ورود به حساب کابری با کد یک بار مصرف",
	};
}

function OtpLayout({ children }: Readonly<PropsWithChildren>) {
	return <Fragment>{children}</Fragment>;
}

export default OtpLayout;

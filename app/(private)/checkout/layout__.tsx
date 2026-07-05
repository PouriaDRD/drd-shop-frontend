import { Fragment, PropsWithChildren } from "react";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "تسویه سفارش",
		description: "تسویه سفارش با مالیات و پلن‌ها",
	};
}

export default function CheckoutLayout({
	children,
}: Readonly<PropsWithChildren>) {
	return <Fragment>{children} </Fragment>;
}

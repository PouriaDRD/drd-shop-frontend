import { PropsWithChildren } from "react";

import { Metadata } from "next";

import { UserProvider } from "@/features/user/context";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "داشبورد",
		description: "داشبورد در دی‌آردی شاپ",
	};
}

function DashboardLayout({ children }: Readonly<PropsWithChildren>) {
	return <UserProvider>{children}</UserProvider>;
}

export default DashboardLayout;

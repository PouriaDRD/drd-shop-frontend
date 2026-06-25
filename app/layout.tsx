import { PropsWithChildren } from "react";

import type { Metadata } from "next";
import localFont from "next/font/local";

import { ThemeProvider } from "@/features/preferences/contexts";

import "./globals.css";

export const metadata: Metadata = {
	title: {
		default: "دی‌آردی شاپ",
		template: "دی‌آردی شاپ | %s",
	},
	description: "Created by Pouria DRD",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
	return (
		<html
			dir="rtl"
			lang="fa-IR"
			suppressHydrationWarning
			data-scroll-behavior="smooth"
			className={`h-full antialiased font-iran-yekan-x ss02
			${peyda.variable} ${iranYekanX.variable}`}>
			<body className="flex flex-col h-dvh">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}

const peyda = localFont({
	src: [
		{
			weight: "100",
			style: "normal",
			path: "./assets/fonts/Peyda/woff2/PeydaWebFaNum-Thin.woff2",
		},
		{
			weight: "200",
			style: "normal",
			path: "./assets/fonts/Peyda/woff2/PeydaWebFaNum-ExtraLight.woff2",
		},
		{
			weight: "300",
			style: "normal",
			path: "./assets/fonts/Peyda/woff2/PeydaWebFaNum-Light.woff2",
		},
		{
			weight: "400",
			style: "normal",
			path: "./assets/fonts/Peyda/woff2/PeydaWebFaNum-Regular.woff2",
		},
		{
			weight: "500",
			style: "normal",
			path: "./assets/fonts/Peyda/woff2/PeydaWebFaNum-Medium.woff2",
		},
		{
			weight: "600",
			style: "normal",
			path: "./assets/fonts/Peyda/woff2/PeydaWebFaNum-SemiBold.woff2",
		},
		{
			weight: "700",
			style: "normal",
			path: "./assets/fonts/Peyda/woff2/PeydaWebFaNum-Bold.woff2",
		},
		{
			weight: "800",
			style: "normal",
			path: "./assets/fonts/Peyda/woff2/PeydaWebFaNum-ExtraBold.woff2",
		},
		{
			weight: "900",
			style: "normal",
			path: "./assets/fonts/Peyda/woff2/PeydaWebFaNum-Black.woff2",
		},
	],
	variable: "--font-peyda",
});

const iranYekanX = localFont({
	src: [
		{
			weight: "normal",
			style: "normal",
			path: "./assets/fonts/IRANYekanX/IRANYekanX-Regular.woff",
		},
		{
			weight: "bold",
			style: "normal",
			path: "./assets/fonts/IRANYekanX/IRANYekanX-Bold.woff",
		},
	],
	variable: "--font-iran-yekan-x",
});

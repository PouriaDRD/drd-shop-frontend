import { PropsWithChildren } from "react";

import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import { TooltipProvider } from "@/components/ui";
import { QCProvider } from "@/features/api/contexts";
import { ThemeProvider } from "@/features/preferences/contexts";
import { AppToaster } from "@/features/shared/contexts";
import { cn } from "@/features/shared/utils";
import { UserProvider } from "@/features/user/context";

import "./globals.css";

const keywords = [
	"دی‌آردی وی‌ پی‌ ان",
	"دی‌آردی",
	"وی‌ پی‌ ان",
	"ایران",
	"وی پی ان",
	"اینترنت ملی",
	"وی پی ان مخصوص اینترنت ملی",
	"وی پی ان ارزان",
	"وی پی ان پر سرعت",
	"پوریا دارندی",
	"دارندی",
	"پوریا",
];

export const metadata: Metadata = {
	title: {
		default: "دی‌آردی شاپ",
		template: "دی‌آردی شاپ | %s",
	},
	description: "ساخته شده توسط پوریا دارندی",

	keywords: keywords,
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
	return (
		<html
			dir="rtl"
			lang="fa-IR"
			suppressHydrationWarning
			data-scroll-behavior="smooth"
			className={cn(
				`${peyda.variable}`,
				//  ${iranYekanX.variable}}`,
				// `${geistSans.variable} ${geistMono.variable}`,
				`h-full antialiased`,
			)}>
			<body className="font-peyda" suppressHydrationWarning>
				<QCProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange>
						<AppToaster />
						<TooltipProvider>
							<UserProvider>{children}</UserProvider>
						</TooltipProvider>
					</ThemeProvider>
				</QCProvider>
			</body>
		</html>
	);
}

// const geistSans = Geist({
// 	variable: "--font-geist-sans",
// 	subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
// 	variable: "--font-geist-mono",
// 	subsets: ["latin"],
// });

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

// const iranYekanX = localFont({
// 	src: [
// 		{
// 			weight: "normal",
// 			style: "normal",
// 			path: "./assets/fonts/IRANYekanX/IRANYekanX-Regular.woff",
// 		},
// 		{
// 			weight: "bold",
// 			style: "normal",
// 			path: "./assets/fonts/IRANYekanX/IRANYekanX-Bold.woff",
// 		},
// 	],
// 	variable: "--font-iran-yekan-x",
// });

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
	"دی‌آردی شاپ",
	"DRD Shop",
	"VPN",
	"وی پی ان",
	"وی پی ان ایران",
	"VPN پرسرعت",
	"VPN ارزان",
	"فیلترشکن پرسرعت",
	"اینترنت آزاد",
	"پوریا دارندی",
];

export const metadata: Metadata = {
	title: {
		default: "دی‌آردی شاپ",
		template: "%s | دی‌آردی شاپ",
	},

	description:
		"دی‌آردی شاپ ارائه‌دهنده سرویس‌های VPN پرسرعت، پایدار و اقتصادی برای کاربران ایران با پشتیبانی حرفه‌ای و تجربه اینترنت بهتر.",

	keywords: keywords,

	applicationName: "DRD Shop",

	metadataBase: new URL("https://shop2.pouria-drd.ir"),

	creator: "Pouria Darandi",
	publisher: "DRD Shop",

	authors: [
		{
			name: "Pouria Darandi",
			url: "https://pouria-drd.ir",
		},
	],

	openGraph: {
		type: "website",
		locale: "fa_IR",
		url: "https://shop2.pouria-drd.ir",
		siteName: "DRD Shop",
		title: "دی‌آردی شاپ",
		description:
			"دی‌آردی شاپ ارائه‌دهنده سرویس‌های VPN پرسرعت، پایدار و اقتصادی برای کاربران ایران با پشتیبانی حرفه‌ای.",
		images: [
			// {
			// 	url: "https://shop.pouria-drd.ir/images/og/opengraph-image.png",
			// 	width: 600,
			// 	height: 315,
			// 	alt: "دی‌آردی شاپ",
			// },
			{
				url: "https://shop2.pouria-drd.ir/images/twitter-card.png",
				width: 600,
				height: 315,
				alt: "دی‌آردی شاپ",
			},
		],
	},

	twitter: {
		card: "summary_large_image",
		site: "@pouriaDRD",
		creator: "@pouriaDRD",
		title: "دی‌آردی شاپ | خرید VPN پرسرعت و ارزان",
		description:
			"سرویس VPN پرسرعت، پایدار و اقتصادی دی‌آردی شاپ برای کاربران ایران.",
		images: [
			// {
			// 	url: "https://shop.pouria-drd.ir/images/twitter-card.png",
			// 	width: 600,
			// 	height: 315,
			// 	alt: "دی‌آردی شاپ",
			// },
			{
				url: "https://shop2.pouria-drd.ir/images/twitter-card.png",
				width: 600,
				height: 315,
				alt: "دی‌آردی شاپ",
			},
		],
	},

	alternates: {
		canonical: "https://shop2.pouria-drd.ir",
	},

	robots: {
		index: true,
		follow: true,

		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},

	category: "technology",

	// Structured Data (JSON-LD) for SEO
	other: {
		"ld+json": JSON.stringify({
			"@context": "https://schema.org",
			"@type": "OnlineStore",

			name: "DRD Shop",
			alternateName: "دی‌آردی شاپ",

			url: "https://shop2.pouria-drd.ir",

			description:
				"دی‌آردی شاپ ارائه‌دهنده سرویس‌های VPN پرسرعت، پایدار و اقتصادی برای کاربران ایران با پشتیبانی حرفه‌ای.",

			founder: {
				"@type": "Person",
				name: "Pouria Darandi",
				url: "https://pouria-drd.ir",
			},

			brand: {
				"@type": "Brand",
				name: "DRD Shop",
			},

			sameAs: [
				"https://github.com/PouriaDRD/",
				"https://twitter.com/pouria_drd/",
				"https://t.me/pouria_drd/",
				"https://www.instagram.com/pouria.drd/",
			],

			areaServed: {
				"@type": "Country",
				name: "Iran",
			},

			availableLanguage: ["Persian", "English"],
		}),
	},
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
				`${iranYekanX.variable}}`,
				// `${geistSans.variable} ${geistMono.variable}`,
				`h-full antialiased`,
			)}>
			<body className="font-iran-yekan-x! ss02!" suppressHydrationWarning>
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

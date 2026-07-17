import {
	Apple,
	BadgeCheck,
	Download,
	Monitor,
	Play,
	Smartphone,
} from "lucide-react";

import { GithubIcon } from "@/components/icons";

import { DownloadClient } from "../types";

export const downloadPlatformMap = {
	windows: {
		label: "Windows",
		icon: Monitor,
	},

	android: {
		label: "Android",
		icon: Smartphone,
	},

	ios: {
		label: "iOS",
		icon: Smartphone,
	},

	macos: {
		label: "macOS",
		icon: Apple,
	},

	linux: {
		label: "Linux",
		icon: Monitor,
	},

	github: {
		label: "GitHub",
		icon: GithubIcon,
	},

	"google-play": {
		label: "Google Play",
		icon: Play,
	},

	"app-store": {
		label: "App Store",
		icon: Apple,
	},

	"microsoft-store": {
		label: "Microsoft Store",
		icon: BadgeCheck,
	},

	direct: {
		label: "دانلود مستقیم",
		icon: Download,
	},
};

export const badgeMap = {
	recommended: {
		label: "پیشنهادی",
	},

	popular: {
		label: "محبوب",
	},

	opensource: {
		label: "متن‌باز",
	},

	new: {
		label: "جدید",
	},
};

export const downloadClients: DownloadClient[] = [
	{
		id: "v2rayng",

		title: "V2rayNG",

		logo: "/images/V2rayNG.png",

		description: "کلاینت اندروید",

		badge: "opensource",

		platforms: ["android"],

		downloads: [
			// {
			// 	platform: "direct",
			// 	href: "/downloads/v2rayNG_2.2.5_universal.zip",
			// },
			{
				platform: "github",
				href: "https://github.com/2dust/v2rayNG/releases",
			},
		],
	},

	{
		id: "v2rayn",

		title: "V2rayN",

		logo: "/images/V2rayN.png",

		description: "کلاینت ویندوز",

		badge: "opensource",

		platforms: ["windows"],

		downloads: [
			// {
			// 	platform: "direct",
			// 	href: "/downloads/v2rayN-windows-64.rar",
			// },
			{
				platform: "github",
				href: "https://github.com/2dust/v2rayN/releases",
			},
		],
	},
	{
		id: "v2raytun",

		title: "V2RayTun",

		logo: "/images/v2RayTun.webp",

		description: "کلاینت قدرتمند برای تمامی سیستم عامل ها",

		badge: "recommended",

		platforms: ["ios", "android", "windows"],

		downloads: [
			{
				platform: "app-store",
				href: "https://apps.apple.com/pl/app/v2raytun/id6476628951",
			},
			{
				platform: "google-play",
				href: "https://play.google.com/store/apps/details?id=com.v2raytun.android&hl=en&pli=1",
			},
			{
				platform: "windows",
				href: "https://v2raytun.com/",
			},
		],
	},

	{
		id: "streisand",

		title: "Streisand",

		logo: "/images/streisand.svg",

		description: "کلاینت ساده و سریع برای iOS",

		badge: "opensource",

		platforms: ["ios"],

		downloads: [
			{
				platform: "app-store",
				href: "https://apps.apple.com/app/streisand/id6450534064",
			},
		],
	},
	// {
	// 	id: "hiddify",

	// 	title: "Hiddify Next",

	// 	description: "بهترین انتخاب برای اکثر کاربران",

	// 	badge: "recommended",

	// 	platforms: ["windows", "android", "ios", "macos", "linux"],

	// 	downloads: [
	// 		{
	// 			platform: "direct",
	// 			href: "/downloads/hiddify-next.exe",
	// 		},
	// 		{
	// 			platform: "github",
	// 			href: "#",
	// 		},
	// 		{
	// 			platform: "google-play",
	// 			href: "#",
	// 		},
	// 		{
	// 			platform: "app-store",
	// 			href: "#",
	// 		},
	// 	],
	// },
];

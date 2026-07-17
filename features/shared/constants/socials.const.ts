import { SocialChannel } from "../types";

export const TELEGRAM_LINK =
	(process.env.TELEGRAM_LINK! as "/") ||
	(process.env.NEXT_PUBLIC_TELEGRAM_LINK! as "/");

export const BALE_LINK =
	(process.env.BALE_LINK! as "/") ||
	(process.env.NEXT_PUBLIC_BALE_LINK! as "/");

export const INSTAGRAM_LINK =
	(process.env.INSTAGRAM_LINK! as "/") ||
	(process.env.NEXT_PUBLIC_INSTAGRAM_LINK! as "/");

export const SOCIAL_CHANNELS: SocialChannel[] = [
	{
		id: "telegram",
		platform: "telegram",
		label: "تلگرام",
		followers: "۱۲ هزار عضو",
		href: TELEGRAM_LINK,
		bg: "#229ED9",
	},
	{
		id: "bale",
		platform: "bale",
		label: "بله",
		followers: "۴ هزار عضو",
		href: BALE_LINK,
		bg: "#2AB26B",
	},
	{
		id: "instagram",
		platform: "instagram",
		label: "اینستاگرام",
		followers: "۸ هزار دنبال‌کننده",
		href: INSTAGRAM_LINK,
		bg: "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)",
	},
];

import {
	BALE_LINK,
	INSTAGRAM_LINK,
	TELEGRAM_LINK,
} from "@/features/shared/constants";

export type ServerStat = {
	id: string;
	country: string;
	city: string;
	ping: number;
	load: number; // percentage
};

export const liveServers: ServerStat[] = [
	{ id: "de-fra", country: "آلمان", city: "فرانکفورت", ping: 68, load: 73 },
	// { id: "nl-ams", country: "هلند", city: "آمستردام", ping: 80, load: 28 },
	// { id: "tr-ist", country: "ترکیه", city: "استانبول", ping: 42, load: 12 },
	// { id: "us-nyc", country: "آمریکا", city: "نیویورک", ping: 142, load: 9 },
];

export type Feature = {
	id: string;
	icon: "bolt" | "lock" | "world" | "eye-off" | "device" | "headset";
	title: string;
	description: string;
};

export const features: Feature[] = [
	{
		id: "speed",
		icon: "bolt",
		title: "بدون افت سرعت",
		description:
			"زیرساخت چندگیگابیتی روی هر سرور یعنی استریم و دانلود بدون بافر.",
	},
	{
		id: "encryption",
		icon: "lock",
		title: "رمزنگاری AES-256",
		description:
			"همان استاندارد امنیتی که بانک‌ها و نهادهای دولتی استفاده می‌کنند.",
	},
	{
		id: "no-logs",
		icon: "eye-off",
		title: "بدون ثبت لاگ",
		description:
			"هیچ ترافیک، آی‌پی یا فعالیتی ذخیره نمی‌شود؛ قابل تایید و شفاف.",
	},
	{
		id: "servers",
		icon: "world",
		title: "سرور های بروز و با کیفیت",
		description:
			"در لوکیشن های مختلف، با مانیتورینگ زنده وضعیت و بار هر سرور.",
	},
	{
		id: "devices",
		icon: "device",
		title: "بدون محدودیت اتصال",
		description: "موبایل، دسکتاپ و روتر، همه با یک اشتراک.",
	},
	{
		id: "support",
		icon: "headset",
		title: "پشتیبانی ۲۴/۷",
		description:
			"پاسخ‌گویی انسانی، نه فقط چت‌بات، در هر ساعت از شبانه‌روز.",
	},
];

export type Plan = {
	id: string;
	name: string;
	tagline: string;
	price: string;
	pricePeriod: string;
	monthlyEquivalent?: string;
	featured?: boolean;
	perks: string[];
};

export const plans: Plan[] = [
	{
		id: "monthly",
		name: "یک‌ماهه",
		tagline: "مناسب شروع",
		price: "۶۹,۰۰۰",
		pricePeriod: "تومان / ماه",
		perks: ["۳۰ گیگ ترافیک", "۱ دستگاه همزمان", "دسترسی به همه سرورها"],
	},
	{
		id: "quarterly",
		name: "سه‌ماهه",
		tagline: "بهترین ارزش",
		price: "۱۷۹,۰۰۰",
		pricePeriod: "تومان / سه ماه",
		monthlyEquivalent: "معادل ۵۹,۷۰۰ تومان در ماه",
		featured: true,
		perks: [
			"۱۰۰ گیگ ترافیک",
			"۲ دستگاه همزمان",
			"دسترسی به همه سرورها",
			"اولویت پشتیبانی",
		],
	},
	{
		id: "yearly",
		name: "یک‌ساله",
		tagline: "برای کاربران حرفه‌ای",
		price: "۴۹۰,۰۰۰",
		pricePeriod: "تومان / سال",
		monthlyEquivalent: "معادل ۴۰,۸۰۰ تومان در ماه",
		perks: [
			"ترافیک نامحدود",
			"۵ دستگاه همزمان",
			"دسترسی به همه سرورها",
			"اولویت پشتیبانی",
		],
	},
];

export const navLinks = [
	{ label: "ویژگی‌ها", href: "#features" },
	{ label: "سرورها", href: "#servers" },
	{ label: "پلن‌ها", href: "#pricing" },
	{ label: "پشتیبانی", href: "#info" },
];

export const faqs = [
	{
		question: "آیا واقعا هیچ لاگی ذخیره نمی‌شود؟",
		answer: "خیر. هیچ آی‌پی، زمان اتصال یا ترافیک کاربران در هیچ سروری ذخیره نمی‌شود. این موضوع به‌صورت دوره‌ای قابل ممیزی است.",
	},
	{
		question: "روی چند دستگاه می‌توانم همزمان استفاده کنم؟",
		answer: "بدون محدودیت اتصال، روی هر دستگاه و یا حتی با بقیه اعضای خانواده می توانید وصل شوید و استفاده کنید!",
	},
	{
		question: "اگر راضی نبودم می‌توانم پول را پس بگیرم؟",
		answer: "تا ۷ روز پس از خرید، در صورت عدم رضایت، مبلغ با توجه به میزان مصرفی که داشتید بازگردانده می‌شود.",
	},
];

export type SocialChannel = {
	id: string;
	platform: "telegram" | "bale" | "instagram";
	label: string;
	followers: string;
	href: string;
	bg: string; // brand background color, used only for the small icon chip
};

export const socialChannels: SocialChannel[] = [
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

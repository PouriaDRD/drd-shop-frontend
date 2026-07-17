import { Feature } from "../types";

export const FEATURES: Feature[] = [
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
